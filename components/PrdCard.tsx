'use client';

import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

interface Props {
  prd: string;
  isRefined?: boolean;
}

export default function PrdCard({ prd, isRefined }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(prd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 flex flex-col">
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800">
        <div className="flex items-center gap-2">
          <h2 className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">PRD</h2>
          {isRefined && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-indigo-950 border border-indigo-800 text-indigo-400">
              Refined
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors"
        >
          {copied ? 'Copied' : 'Copy as markdown'}
        </button>
      </div>
      <div className="px-5 py-4 overflow-y-auto max-h-[70vh]">
        <div className="prd-prose">
          <ReactMarkdown>{prd}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
