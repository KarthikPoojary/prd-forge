# PRD Forge — Claude Context

Read this file at the start of every session. Update it at the end of any session where features, decisions, libraries, bugs, conventions, or priorities changed.

## What this project is

Two-pane web app that turns a brief into a polished PRD in three AI passes: generate → critique → refine. Built as a portfolio piece for a Google Cloud Senior TPM job application. Deployed at https://prd-forge.vercel.app (TBD after first deploy).

## Tech stack

- Next.js 16.2.6, App Router, TypeScript
- Tailwind CSS v4 — `@import "tailwindcss"` in globals.css, **no** tailwind.config.ts
- Groq SDK (`groq-sdk`) — default provider, model `llama-3.3-70b-versatile`, key prefix `gsk_`
- Anthropic SDK (`@anthropic-ai/sdk`) — fallback, model `claude-opus-4-7`, key prefix `sk-ant-`
- `react-markdown` ^10.1.0 for rendering PRD markdown

## Key files

| Path | Purpose |
|------|---------|
| `lib/llm.ts` | Unified LLM abstraction. Auto-detects provider from key prefix. `llmCall({ key, system, user, maxTokens=4096 })` |
| `lib/prompts.ts` | GENERATION_SYSTEM, CRITIQUE_SYSTEM, REFINEMENT_SYSTEM + builder functions |
| `types/prd.ts` | Shared types: Brief, Critique, CritiqueScores, CritiqueFeedback, AppPhase |
| `types/markdown.d.ts` | Enables `import x from '*.md'` as string |
| `next.config.ts` | Webpack `asset/source` rule for .md imports |
| `app/page.tsx` | Client component, AppPhase state machine |
| `app/api/generate/route.ts` | POST — runs generation pass |
| `app/api/critique/route.ts` | POST — runs critique pass, returns JSON |
| `app/api/refine/route.ts` | POST — runs refinement pass |
| `components/InputPane.tsx` | Left pane: brief form, advanced toggle, API key panel |
| `components/PrdCard.tsx` | Right pane top: renders markdown PRD, copy button |
| `components/CritiqueCard.tsx` | Right pane bottom: score pills, refine button |
| `components/Skeleton.tsx` | PrdSkeleton + CritiqueSkeleton loading states |
| `data/sample-prd.md` | Seeded PRD (bug triage SLA) |
| `data/sample-critique.json` | Seeded critique JSON |
| `data/sample-refined.md` | Seeded refined PRD |
| `scripts/seed.ts` | Runs all 3 passes and writes data files |

## AppPhase state machine

`idle → generating → critiquing → ready → refining → error`

## Demo mode

- No API key → button shows "Generate PRD (demo)"
- Uses pre-baked files in `/data/`. Fake latency: 800ms generating + 600ms critiquing.
- Seeded with Groq on 2026-05-29 using bug-triage SLA brief.

## Admin mode

- `ADMIN_PASSWORD` env var (server-side only)
- Passing matching password in request uses server-side API key instead of visitor key
- For interview demos — never expose this key client-side

## Environment variables

```
GROQ_API_KEY=      # default provider, get free key at console.groq.com
ANTHROPIC_API_KEY= # fallback if Groq key not set
ADMIN_PASSWORD=    # unlocks server-side key for demos
```

All must be in `.env.local` locally. None committed to git.

## Security rules (never break these)

- API keys are server-side only — never in client bundle
- Visitor keys sent per-request in request body, never stored or logged server-side
- `.env*` in `.gitignore`

## Conventions

- Tailwind v4 — `@import "tailwindcss"`, no config file
- Dark theme: `bg-neutral-950` on html, body, and main
- Score pills: green ≥4, amber =3, red ≤2
- `.prd-prose` in globals.css handles all markdown typography
- No comments in code unless the WHY is non-obvious

## Session log

### 2026-05-29
- Scaffolded full app from scratch (directory pre-existed, installed deps directly)
- Built all components, API routes, lib files, types
- Seeded demo data with Groq (bug triage SLA topic)
- Pending: GitHub repo, Vercel deploy, README
