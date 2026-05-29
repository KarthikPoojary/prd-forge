import { NextRequest, NextResponse } from 'next/server';
import { llmCall } from '@/lib/llm';
import { buildGenerationPrompt, GENERATION_SYSTEM } from '@/lib/prompts';
import type { Brief } from '@/types/prd';

export async function POST(req: NextRequest) {
  const { brief, apiKey, adminPassword } = await req.json() as {
    brief: Brief;
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
  if (!brief?.problem?.trim()) return NextResponse.json({ error: 'Problem brief is required' }, { status: 400 });

  try {
    const prd = await llmCall({ key, system: GENERATION_SYSTEM, user: buildGenerationPrompt(brief), maxTokens: 4096 });
    return NextResponse.json({ prd });
  } catch (e: unknown) {
    return NextResponse.json({ error: e instanceof Error ? e.message : 'LLM error' }, { status: 502 });
  }
}
