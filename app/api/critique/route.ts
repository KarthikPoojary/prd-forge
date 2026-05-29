import { NextRequest, NextResponse } from 'next/server';
import { llmCall } from '@/lib/llm';
import { buildCritiquePrompt, CRITIQUE_SYSTEM } from '@/lib/prompts';
import type { Critique } from '@/types/prd';

export async function POST(req: NextRequest) {
  const { prd, apiKey, adminPassword } = await req.json() as {
    prd: string;
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
  if (!prd?.trim()) return NextResponse.json({ error: 'PRD content is required' }, { status: 400 });

  try {
    const text = await llmCall({ key, system: CRITIQUE_SYSTEM, user: buildCritiquePrompt(prd), maxTokens: 1024 });
    let critique: Critique;
    try {
      critique = JSON.parse(text);
    } catch {
      const stripped = text.replace(/^```json\n?/, '').replace(/\n?```$/, '');
      critique = JSON.parse(stripped);
    }
    return NextResponse.json(critique);
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'LLM error' }, { status: 502 });
  }
}
