import type { Brief, Critique } from '@/types/prd';

// ── System prompts ────────────────────────────────────────────────────────────

export const GENERATION_SYSTEM = `You are a senior Technical Program Manager at a top-tier tech company. You write clear, decision-driving PRDs that follow the structure used at Google for design docs: state the problem precisely, propose a solution with rationale, consider alternatives seriously, identify risks honestly, and define measurable success criteria.

Your PRDs are notable for three things:
1. Goals with real numbers — not "improve reliability" but "reduce P1 bug MTTR from 8 days to 2 days"
2. Non-goals that are specific enough to prevent scope creep
3. Alternatives that were genuinely considered, not dismissed with one word

Return only the PRD content in markdown. No preamble, no "Here is your PRD".`;

export const CRITIQUE_SYSTEM = `You are a strict but fair senior TPM reviewing a peer's PRD. You evaluate against a standard rubric and give specific, actionable feedback. You do not inflate scores — a 5 means genuinely excellent, 3 means adequate but improvable, 1-2 means a real problem.

Return ONLY valid JSON matching the specified schema. No markdown, no explanation outside the JSON.`;

export const REFINEMENT_SYSTEM = `You are a senior TPM rewriting your own PRD based on peer review feedback. You take every piece of critique seriously and address it directly. You do not just add words — you restructure, sharpen, and improve.

Return only the improved PRD content in markdown. No preamble.`;

// ── Few-shot anchor (unrelated to demo brief) ─────────────────────────────────

const FEW_SHOT_EXAMPLE = `
## Example of a well-structured PRD section (API Rate Limiting Framework):

### Goals
- Reduce API abuse incidents from 12/month to <2/month within 90 days of launch
- Keep P99 latency impact of rate-limit checks below 5ms
- Enable per-customer tier configuration without an engineering deploy

### Non-Goals
- This PRD does not cover authentication or API key rotation
- We will not build a real-time abuse dashboard in v1 (tracked in Q3 roadmap)

### Alternatives Considered
1. **Third-party rate limiting service (e.g. Kong)**: Rejected because it adds an external dependency and our usage patterns require custom tier logic that would require significant plugin work anyway.
2. **Client-side throttling**: Rejected because we cannot trust clients to self-enforce; we need server-authoritative enforcement for SLA purposes.
`;

// ── Prompt builders ───────────────────────────────────────────────────────────

export function buildGenerationPrompt(brief: Brief): string {
  const contextParts: string[] = [];
  if (brief.audience) contextParts.push(`Target audience: ${brief.audience}`);
  if (brief.constraints) contextParts.push(`Constraints: ${brief.constraints}`);
  if (brief.userResearch) contextParts.push(`User research / observations:\n${brief.userResearch}`);

  return `Write a complete PRD for the following problem brief.

Problem brief:
${brief.problem}
${contextParts.length ? '\nAdditional context:\n' + contextParts.join('\n') : ''}

${FEW_SHOT_EXAMPLE}

Write the PRD with ALL of the following sections in this exact order:

1. **TL;DR** (3 sentences: what the problem is, what we're doing about it, how we'll know it worked)
2. **Background and Problem Statement** (context, data, why now)
3. **Goals** (measurable success criteria with specific numbers — this is the most important section)
4. **Non-Goals** (specific enough to prevent scope creep)
5. **Proposed Solution** (what we're building, how it works)
6. **Alternatives Considered** (at least 2, each with a clear reason for rejection)
7. **Risks and Open Questions** (be honest about uncertainty)
8. **Rollout Plan and Success Metrics** (phased if appropriate, with a clear go/no-go criterion)
9. **Stakeholders** (RACI-style — who is Responsible, Accountable, Consulted, Informed)

Use markdown headings (##) for each section. Be specific. Use numbers wherever possible.`;
}

export function buildCritiquePrompt(prd: string): string {
  return `Review the following PRD against this rubric. Score each criterion 1-5 and provide one-line feedback.

Scoring guide:
- 5: Excellent, specific, measurable — could not reasonably be improved
- 4: Good with minor gaps
- 3: Adequate but missing important specifics
- 2: Present but vague or incomplete
- 1: Missing or fundamentally flawed

PRD to review:
---
${prd}
---

Return this exact JSON:
{
  "scores": {
    "clarity": <1-5>,
    "measurability": <1-5>,
    "risk_coverage": <1-5>,
    "alternatives": <1-5>,
    "stakeholders": <1-5>
  },
  "feedback": {
    "clarity": "<one line: what's good or what's missing in the problem statement clarity>",
    "measurability": "<one line: are the success criteria quantified? what's missing?>",
    "risk_coverage": "<one line: are the real risks named? what's missing?>",
    "alternatives": "<one line: were alternatives genuinely considered with specific rejections?>",
    "stakeholders": "<one line: is the RACI complete and specific?>"
  },
  "overall_comment": "<one sentence: the single most important thing to improve>"
}`;
}

export function buildRefinementPrompt(prd: string, critique: Critique): string {
  const feedbackLines = Object.entries(critique.feedback)
    .map(([k, v]) => `- ${k}: ${v}`)
    .join('\n');

  return `Rewrite the following PRD to address all of this peer review feedback.

Critique summary: ${critique.overall_comment}

Specific feedback to address:
${feedbackLines}

Original PRD:
---
${prd}
---

Rewrite the full PRD addressing every piece of feedback above. Keep the same 9-section structure. Be more specific, add numbers where they were missing, and sharpen the sections that received low scores.`;
}
