#!/usr/bin/env npx tsx
/**
 * One-off script: generates pre-baked demo data using the example brief.
 * Run with a free Groq key:
 *   GROQ_API_KEY=gsk_... npx tsx scripts/seed.ts
 *
 * Writes:
 *   data/sample-prd.md
 *   data/sample-critique.json
 *   data/sample-refined.md
 */

import { writeFileSync } from 'fs';
import { join } from 'path';
import { llmCall, detectProvider } from '../lib/llm';
import { buildGenerationPrompt, GENERATION_SYSTEM, buildCritiquePrompt, CRITIQUE_SYSTEM, buildRefinementPrompt, REFINEMENT_SYSTEM } from '../lib/prompts';
import type { Critique } from '../types/prd';

const KEY = process.env.GROQ_API_KEY || process.env.ANTHROPIC_API_KEY;
if (!KEY) { console.error('Provide GROQ_API_KEY (free at console.groq.com) or ANTHROPIC_API_KEY'); process.exit(1); }

const EXAMPLE_BRIEF = {
  problem: "Engineering team reports that customer-reported bugs take 8+ days on average to reach a fix in production. Customers churn after waiting that long. Proposal: a 'bug triage SLA' programme with clear severity tiers and accountability across product, engineering, and support.",
  audience: "Engineering and product leadership",
  constraints: "Must work across 3 product teams; cannot add headcount; 6-week rollout window",
  userResearch: "",
};

async function main() {
  console.log(`Provider: ${detectProvider(KEY!)}`);

  // Step 1: generate PRD
  console.log('Generating PRD...');
  const prd = await llmCall({ key: KEY!, system: GENERATION_SYSTEM, user: buildGenerationPrompt(EXAMPLE_BRIEF), maxTokens: 4096 });
  writeFileSync(join(process.cwd(), 'data', 'sample-prd.md'), prd);
  console.log('Written data/sample-prd.md');

  // Step 2: critique
  console.log('Critiquing...');
  const critiqueText = await llmCall({ key: KEY!, system: CRITIQUE_SYSTEM, user: buildCritiquePrompt(prd), maxTokens: 1024 });
  let critique: Critique;
  try {
    critique = JSON.parse(critiqueText);
  } catch {
    critique = JSON.parse(critiqueText.replace(/^```json\n?/, '').replace(/\n?```$/, ''));
  }
  writeFileSync(join(process.cwd(), 'data', 'sample-critique.json'), JSON.stringify(critique, null, 2));
  console.log('Written data/sample-critique.json');

  // Step 3: refine
  console.log('Refining...');
  const refined = await llmCall({ key: KEY!, system: REFINEMENT_SYSTEM, user: buildRefinementPrompt(prd, critique), maxTokens: 4096 });
  writeFileSync(join(process.cwd(), 'data', 'sample-refined.md'), refined);
  console.log('Written data/sample-refined.md');

  console.log('Done. Demo mode seeded.');
}

main().catch(e => { console.error(e); process.exit(1); });
