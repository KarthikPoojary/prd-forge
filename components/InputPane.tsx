'use client';

import { useState } from 'react';
import type { Brief } from '@/types/prd';

const EXAMPLE_BRIEF: Brief = {
  problem: "Engineering team reports that customer-reported bugs take 8+ days on average to reach a fix in production. Customers churn after waiting that long. Proposal: a 'bug triage SLA' programme with clear severity tiers and accountability across product, engineering, and support.",
  audience: "Engineering and product leadership",
  constraints: "Must work across 3 product teams; cannot add headcount; 6-week rollout window",
  userResearch: "",
};

interface Props {
  onGenerate: (brief: Brief, apiKey?: string) => void;
  loading: boolean;
}

export default function InputPane({ onGenerate, loading }: Props) {
  const [brief, setBrief] = useState<Brief>({ problem: '', userResearch: '', constraints: '', audience: '' });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showKeyPanel, setShowKeyPanel] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  function loadExample() {
    setBrief(EXAMPLE_BRIEF);
    setShowAdvanced(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!brief.problem.trim()) { setError('Problem brief is required'); return; }
    setError('');
    onGenerate(brief, apiKey.trim() || undefined);
  }

  const isDemo = !apiKey.trim();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Problem Brief</h2>
        <button
          type="button"
          onClick={loadExample}
          className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          Load example
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1 flex flex-col">
          <textarea
            value={brief.problem}
            onChange={e => { setBrief(b => ({ ...b, problem: e.target.value })); setError(''); }}
            placeholder="Describe the problem you're trying to solve. What's broken, who's affected, and why does it matter now?"
            className="flex-1 min-h-[180px] w-full px-4 py-3 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 text-sm leading-relaxed placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
          />
          {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
        </div>

        {/* Advanced section */}
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setShowAdvanced(s => !s)}
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors flex items-center gap-1"
          >
            <span className={`transition-transform ${showAdvanced ? 'rotate-90' : ''}`}>▶</span>
            Advanced context
          </button>

          {showAdvanced && (
            <div className="space-y-3 pl-3 border-l border-neutral-800">
              <div>
                <label className="text-[11px] text-neutral-500 uppercase tracking-wide block mb-1">Target audience</label>
                <input
                  type="text"
                  value={brief.audience ?? ''}
                  onChange={e => setBrief(b => ({ ...b, audience: e.target.value }))}
                  placeholder="e.g. Engineering and product leadership"
                  className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-500 uppercase tracking-wide block mb-1">Constraints</label>
                <textarea
                  value={brief.constraints ?? ''}
                  onChange={e => setBrief(b => ({ ...b, constraints: e.target.value }))}
                  placeholder="Technical, business, or timeline constraints"
                  rows={2}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-neutral-500 uppercase tracking-wide block mb-1">User research / observations</label>
                <textarea
                  value={brief.userResearch ?? ''}
                  onChange={e => setBrief(b => ({ ...b, userResearch: e.target.value }))}
                  placeholder="Relevant data, feedback, or observations"
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500 resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* API key */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowKeyPanel(k => !k)}
            className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            {showKeyPanel ? 'Hide API key' : 'Add a free Groq API key to use real AI'}
          </button>
          {showKeyPanel && (
            <div className="space-y-1">
              <input
                type="password"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
                placeholder="gsk_... (Groq, free) or sk-ant-... (Anthropic)"
                className="w-full px-3 py-2 rounded-lg border border-neutral-700 bg-neutral-900 text-neutral-100 font-mono text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-500"
              />
              <p className="text-[11px] text-neutral-600">
                Free Groq key: <a href="https://console.groq.com/keys" target="_blank" rel="noopener noreferrer" className="underline hover:text-neutral-400">console.groq.com/keys</a> — 2 min, no card. Never stored.
              </p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!brief.problem.trim() || loading}
          className="w-full px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? 'Working...' : isDemo ? 'Generate PRD (demo)' : 'Generate PRD'}
        </button>
        {isDemo && (
          <p className="text-[11px] text-neutral-600 text-center -mt-2">
            No key? Demo mode returns pre-baked output instantly.
          </p>
        )}
      </div>
    </form>
  );
}
