import { NextRequest, NextResponse } from 'next/server';
import { llmCall } from '@/lib/llm';
import { buildRefinementPrompt, REFINEMENT_SYSTEM } from '@/lib/prompts';
import type { Critique } from '@/types/prd';

export async function POST(req: NextRequest) {
  const { prd, critique, apiKey, adminPassword } = await req.json() as {
    prd: string;
    critique: Critique;
    apiKey?: string;
    adminPassword?: string;
  };

  let key: string | undefined;
  if (adminPassword && adminPassword === process.env.ADMIN_PASSWORD) {
    key = process.env.GROQ_API_KEY || process.env.ANTHROPIC_API_KEY;
  } else {
    key = apiKey;
  }

  if (!key) return NextResponse.json({ error: 'No API key provided' }, { status: 401 });
  if (!prd?.trim() || !critique) return NextResponse.json({ error: 'PRD and critique are required' }, { status: 400 });

  try {
    const refined = await llmCall({ key, system: REFINEMENT_SYSTEM, user: buildRefinementPrompt(prd, critique), maxTokens: 4096 });
    return NextResponse.json({ prd: refined });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'LLM error' }, { status: 502 });
  }
}
