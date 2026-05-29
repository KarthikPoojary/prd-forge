'use client';

import type { Critique } from '@/types/prd';

const LABELS: Record<keyof Critique['scores'], string> = {
  clarity: 'Problem clarity',
  measurability: 'Measurable success criteria',
  risk_coverage: 'Risk coverage',
  alternatives: 'Alternatives considered',
  stakeholders: 'Stakeholder coverage',
};

function scorePill(score: number) {
  if (score >= 4) return 'bg-green-950/60 border-green-800 text-green-400';
  if (score === 3) return 'bg-amber-950/60 border-amber-800 text-amber-400';
  return 'bg-red-950/60 border-red-800 text-red-400';
}

interface Props {
  critique: Critique;
  onRefine: () => void;
  refining: boolean;
  refinedOnce: boolean;
}

export default function CritiqueCard({ critique, onRefine, refining, refinedOnce }: Props) {
  const scores = Object.values(critique.scores) as number[];
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
  const avgRounded = Math.round(avg * 10) / 10;
  const avgStyle = avg >= 4 ? 'text-green-400' : avg >= 3 ? 'text-amber-400' : 'text-red-400';

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800">
        <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">TPM Review</h2>
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-neutral-500">Overall</span>
          <span className={`font-mono text-lg font-bold ${avgStyle}`}>{avgRounded}</span>
          <span className="text-xs text-neutral-600">/5</span>
        </div>
      </div>

      <div className="px-5 py-4 space-y-3">
        <p className="text-xs text-neutral-400 italic border-l-2 border-neutral-700 pl-3">
          {critique.overall_comment}
        </p>

        <div className="space-y-2.5">
          {(Object.keys(LABELS) as Array<keyof Critique['scores']>).map(key => (
            <div key={key} className="flex items-start gap-3">
              <span className={`shrink-0 mt-0.5 w-7 h-5 rounded border font-mono text-xs font-bold flex items-center justify-center ${scorePill(critique.scores[key])}`}>
                {critique.scores[key]}
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium text-neutral-300">{LABELS[key]}</p>
                <p className="text-[11px] text-neutral-500 leading-relaxed">{critique.feedback[key]}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onRefine}
          disabled={refining}
          className="w-full mt-2 px-4 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-sm text-neutral-300 hover:bg-neutral-700 hover:border-neutral-500 transition-colors disabled:opacity-50"
        >
          {refining ? 'Refining...' : refinedOnce ? 'Refine again' : 'Refine using critique'}
        </button>
      </div>
    </div>
  );
}
