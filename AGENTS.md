# AGENTS.md — Repository Rules, Trust Boundaries & Verification Gates

> **Project:** Personal Autobiography Website (KBTU Software Engineering TSIS Project, `CSCI 202609`, Fall 2026)  
> **Owner:** Kalenuly Bekzat (`24B031047`)  
> **Workflow:** RePPIT (*Research → Propose → Plan → Implement → Test*) + Spec-Driven Development

---

## 1. Repository Map (Source of Truth)
- `docs/SPEC.md` — Authoritative SRS (FR-01..FR-08, NFR-01..NFR-07, AC-01..AC-08, Threat Model).
- `docs/REPO_PLAN.md` — Implementation roadmap, TDD test matrix, Git milestones, and CI/CD plan.
- `docs/diagrams/*.puml` — PlantUML Context, Component, Class, and Q&A Sequence diagrams.
- `src/data/biography.ts` — **Single authoritative biography dataset** (deep-frozen `readonly`).
- `src/utils/timelineFilter.ts` — Pure deterministic timeline category filter & chronological sort.
- `src/utils/biographySearch.ts` — Deterministic fact-retrieval engine over `BIOGRAPHY_DATA`.
- `src/utils/inputGuard.ts` — Untrusted input validation (`<= 200` chars, control-char strip, prompt-injection guard).
- `src/utils/bioAssistant.ts` — Clearly labeled Mock Advisory Adapter (`normal`, `timeout`, `error`, `hallucinate` modes).
- `src/utils/outputGuard.ts` — Output contract validator (`<= 320` chars, `<= 3` sentences, grounding/XSS check) + deterministic fallback.
- `src/components/` — Presentation components (`ErrorBoundary`, `Header`, `HeroBio`, `TimelineSection`, `AskBekzatWidget`).

---

## 2. Hard Invariants & Trust Boundaries (DO NOT VIOLATE)
1. **Immutable Biography Data (`AC-01`):** `BIOGRAPHY_DATA` in `src/data/biography.ts` MUST stay deep-frozen (`Object.freeze`) and strictly `readonly`. No component or Q&A function may mutate it.
2. **Zero Fabricated Bio Facts:** Do NOT invent unverified jobs, GPA numbers, awards, phone numbers, or addresses. Keep unconfirmed personal slots explicitly flagged with `isEditablePlaceholder: true` and an `editHint`.
3. **Strict Advisory Separation (`AC-08`):** The "Ask About Bekzat" widget is strictly advisory. Every output must render a provenance badge (`Advisory — Mock Grounded` or `Safe Deterministic Fallback`) and cite `citedFactIds`.
4. **No Unsafe HTML / Secrets (`NFR-05`):**
   - Never use `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or `new Function`.
   - Never commit API keys, `.env` files, or private PII (home address, phone number, IIN).
5. **Spec Before Code:** Any new feature or contract change must update `docs/SPEC.md` and tests before changing implementation code.

---

## 3. Mandatory Verification Gate (Run Before Every Commit / PR)
Every implementation change must pass all four checks with **0 errors and 0 warnings**:
```bash
npm run test          # Vitest unit + component tests (AC-01..AC-08)
npm run typecheck     # tsc --noEmit (strict TypeScript check)
npm run lint          # eslint . (0 errors, 0 warnings)
npm run build         # vite build (production bundle check)
```
Combined single-command gate:
```bash
npm run verify
```
Security/SCA check (run before release and in CI):
```bash
npm audit --omit=dev --audit-level=high
```

---

## 4. Agentic Code Review & AI Disclosure Protocol (Weeks 11 & 14)
- **Read-Only Review Pass:** Before tagging `v1.0.0`, run a read-only code review auditing TypeScript strictness, trust boundaries, prompt-injection edge cases, and accessibility; log both **confirmed fixes** and **rejected/unsupported hypotheses** in `docs/SECURITY_REVIEW.md`.
- **Level D AI Disclosure:** Record every AI-assisted step in `docs/AI_Evidence.md` with:
  1. What AI generated
  2. What Bekzat personally verified (exact commands & outputs)
  3. What Bekzat modified or rejected
