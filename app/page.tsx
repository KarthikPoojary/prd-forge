'use client';

import { useState } from 'react';
import InputPane from '@/components/InputPane';
import PrdCard from '@/components/PrdCard';
import CritiqueCard from '@/components/CritiqueCard';
import { PrdSkeleton, CritiqueSkeleton } from '@/components/Skeleton';
import type { Brief, Critique, AppPhase } from '@/types/prd';

import samplePrd from '@/data/sample-prd.md';
import sampleCritique from '@/data/sample-critique.json';
import sampleRefined from '@/data/sample-refined.md';

interface OutputState {
  prd: string;
  critique: Critique | null;
  refinedPrd: string | null;
  isRefined: boolean;
  refinedOnce: boolean;
}

export default function Home() {
  const [phase, setPhase] = useState<AppPhase>('idle');
  const [phaseMsg, setPhaseMsg] = useState('');
  const [output, setOutput] = useState<OutputState | null>(null);
  const [error, setError] = useState('');
  const [savedKey, setSavedKey] = useState<string | undefined>();

  async function handleGenerate(brief: Brief, apiKey?: string) {
    setSavedKey(apiKey);
    setError('');

    // ── Demo mode ─────────────────────────────────────────────────────────
    if (!apiKey) {
      setPhase('generating');
      setPhaseMsg('Generating PRD...');
      await new Promise(r => setTimeout(r, 800));
      setPhase('critiquing');
      setPhaseMsg('Reviewing against rubric...');
      await new Promise(r => setTimeout(r, 600));
      setPhase('ready');
      setOutput({ prd: samplePrd, critique: sampleCritique as Critique, refinedPrd: null, isRefined: false, refinedOnce: false });
      return;
    }

    // ── Real mode ──────────────────────────────────────────────────────────
    try {
      setPhase('generating');
      setPhaseMsg('Generating PRD...');
      const genRes = await fetch('/api/generate', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ brief, apiKey }),
      });
      if (!genRes.ok) throw new Error((await genRes.json()).error ?? `HTTP ${genRes.status}`);
      const { prd } = await genRes.json();

      setPhase('critiquing');
      setPhaseMsg('Reviewing against rubric...');
      const critiqueRes = await fetch('/api/critique', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prd, apiKey }),
      });
      if (!critiqueRes.ok) throw new Error((await critiqueRes.json()).error ?? `HTTP ${critiqueRes.status}`);
      const critique: Critique = await critiqueRes.json();

      setPhase('ready');
      setOutput({ prd, critique, refinedPrd: null, isRefined: false, refinedOnce: false });
    } catch (e) {
      setPhase('error');
      setError(e instanceof Error ? e.message : 'Unexpected error');
    }
  }

  async function handleRefine() {
    if (!output?.critique) return;

    // Demo mode refinement
    if (!savedKey) {
      setPhase('refining');
      await new Promise(r => setTimeout(r, 800));
      setPhase('ready');
      setOutput(o => o ? { ...o, prd: sampleRefined, isRefined: true, refinedOnce: true } : o);
      return;
    }

    // Real refinement
    try {
      setPhase('refining');
      const currentPrd = output.refinedPrd ?? output.prd;
      const refineRes = await fetch('/api/refine', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prd: currentPrd, critique: output.critique, apiKey: savedKey }),
      });
      if (!refineRes.ok) throw new Error((await refineRes.json()).error ?? `HTTP ${refineRes.status}`);
      const { prd: refined } = await refineRes.json();

      // Re-critique the refined PRD
      const critiqueRes = await fetch('/api/critique', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prd: refined, apiKey: savedKey }),
      });
      const critique: Critique = critiqueRes.ok ? await critiqueRes.json() : output.critique;

      setPhase('ready');
      setOutput(o => o ? { ...o, prd: refined, critique, refinedPrd: refined, isRefined: true, refinedOnce: true } : o);
    } catch (e) {
      setPhase('error');
      setError(e instanceof Error ? e.message : 'Refinement failed');
    }
  }

  const isLoading = phase === 'generating' || phase === 'critiquing' || phase === 'refining';

  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col gap-6 min-h-screen">
        {/* Header */}
        <header className="flex items-baseline justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-neutral-100">PRD Forge</h1>
            <p className="text-sm text-neutral-500">Turn a rough brief into a measurable PRD — with built-in peer review</p>
          </div>
        </header>

        {/* Two-pane layout */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          {/* Left pane — input */}
          <div className="lg:w-80 xl:w-96 shrink-0">
            <InputPane onGenerate={handleGenerate} loading={isLoading} />
          </div>

          {/* Right pane — output */}
          <div className="flex-1 min-w-0 flex flex-col gap-4">
            {phase === 'idle' && (
              <div className="rounded-xl border border-neutral-800 bg-neutral-900/30 px-6 py-14 text-center flex-1">
                <p className="text-sm text-neutral-600">Enter a problem brief and click "Generate PRD" to get started.</p>
                <p className="text-xs text-neutral-700 mt-2">No API key needed — click "Load example" and try demo mode first.</p>
              </div>
            )}

            {(phase === 'generating' || phase === 'critiquing') && (
              <>
                <PrdSkeleton message={phaseMsg} />
                <CritiqueSkeleton />
              </>
            )}

            {phase === 'refining' && output && (
              <>
                <PrdSkeleton message="Rewriting based on critique..." />
                <CritiqueSkeleton />
              </>
            )}

            {phase === 'error' && (
              <div className="rounded-xl border border-red-900/50 bg-red-950/20 px-5 py-5">
                <p className="text-sm font-medium text-red-400">Generation failed</p>
                <p className="text-xs text-red-400/70 mt-1">{error}</p>
                <button onClick={() => setPhase('idle')} className="mt-3 text-xs text-neutral-500 hover:text-neutral-300 transition-colors">Try again</button>
              </div>
            )}

            {phase === 'ready' && output?.critique && (
              <>
                <PrdCard prd={output.prd} isRefined={output.isRefined} />
                <CritiqueCard
                  critique={output.critique}
                  onRefine={handleRefine}
                  refining={false}
                  refinedOnce={output.refinedOnce}
                />
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-between pt-4 border-t border-neutral-900 text-xs text-neutral-700">
          <span>Built by Karthik Poojary</span>
          <div className="flex gap-4">
            <a href="https://github.com/KarthikPoojary" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-500 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/karthikpoojary" target="_blank" rel="noopener noreferrer" className="hover:text-neutral-500 transition-colors">LinkedIn</a>
          </div>
        </footer>
      </div>
    </main>
  );
}
