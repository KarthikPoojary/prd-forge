# PRD Forge

Turn a rough problem brief into a structured, measurable PRD in three AI passes: **generate → critique → refine**.

**Live demo:** https://prd-forge.vercel.app

## What it does

1. **Generate** — paste a brief (problem, audience, constraints) and the LLM writes a full PRD with goals, non-goals, proposed solution, alternatives considered, risks, rollout plan, and stakeholders
2. **Critique** — a second pass scores the PRD against a TPM rubric (clarity, measurability, risk coverage, alternatives, stakeholders) and returns structured feedback
3. **Refine** — a third pass rewrites the PRD to address the critique; scores update to show the improvement

No API key needed — click "Load example" and try demo mode first.

## Tech stack

- Next.js 16 (App Router, TypeScript)
- Tailwind CSS v4
- Groq `llama-3.3-70b-versatile` as default LLM (free tier)
- Anthropic `claude-opus-4-7` as fallback

## Running locally

```bash
cp .env.local.example .env.local
# Add your GROQ_API_KEY (free at console.groq.com)
npm install
npm run dev
```

Open http://localhost:3000.

## Seeding demo data

```bash
GROQ_API_KEY=gsk_... npx tsx scripts/seed.ts
```

Writes `data/sample-prd.md`, `data/sample-critique.json`, and `data/sample-refined.md`.

## Environment variables

| Variable | Purpose |
|---|---|
| `GROQ_API_KEY` | Default LLM provider (free tier at console.groq.com) |
| `ANTHROPIC_API_KEY` | Fallback if Groq key not set |
| `ADMIN_PASSWORD` | Unlocks server-side key for interview/demo mode |

## Part of a portfolio series

| Project | What it is | Live |
|---|---|---|
| [Delivery Lens](https://github.com/KarthikPoojary/delivery-lens) | DORA metrics dashboard for GitHub & Gerrit | [delivery-lens.vercel.app](https://delivery-lens.vercel.app) |
| [Signal Sweep](https://github.com/KarthikPoojary/signal-sweep) | Incident clustering with LLM root-cause analysis | [signal-sweep.vercel.app](https://signal-sweep.vercel.app) |
| PRD Forge | Three-pass AI PRD generator with built-in review | [prd-forge.vercel.app](https://prd-forge.vercel.app) |
