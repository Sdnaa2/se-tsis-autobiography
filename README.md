# Kalenuly Bekzat — Personal Autobiography Website (KBTU SE TSIS)

An editorial, spec-driven **Personal Autobiography Website** built for **KBTU Software Engineering (`CSCI 202609`, Fall 2026 — TSIS Student-Made Project, 8 pts)**. Rather than a plain static HTML page, the repository demonstrates the full 14-week SE syllabus: requirements engineering, PlantUML system modeling, TDD, trust-boundary engineering, prompt-injection defense, CI/CD, and Level D AI disclosure.

---

## Live Architecture & Key Features

- **Editorial Autobiography & Timeline (`HeroBio`, `TimelineSection`):** Chronicles Bekzat’s journey from Kyzylorda (first PC at age 8) and NIS Kyzylorda to KBTU Computer Systems & Software (Year 3), with category filtering (`All`, `Education`, `Technical`, `Personal`), chronological sorting, and Light/Dark theme persistence.
- **Immutable Single-Source Data (`src/data/biography.ts`):** All personal records are recursively frozen via `deepFreeze()` (`Object.freeze`) so UI components and advisory widgets can never mutate authoritative data (`AC-01`).
- **Bounded "Ask About Bekzat" Q&A (`src/components/AskBekzatWidget.tsx`):**
  - **Input Guard (`src/utils/inputGuard.ts`):** Rejects empty/whitespace input, enforces `<= 200` characters, strips control characters, and blocks prompt-injection / XSS payloads.
  - **Deterministic Search (`src/utils/biographySearch.ts`):** Retrieves only matching frozen facts (`factIds`).
  - **Output Contract & Fallback (`src/utils/outputGuard.ts`):** Enforces `<= 320` chars, `<= 3` sentences, zero raw HTML, and grounded claims — falling back deterministically on simulated `timeout`, `error`, or `hallucinate` modes.

---

## Quick Start & Verification

```bash
npm install
npm run dev       # Local development server
npm run verify    # Runs vitest + tsc --noEmit + eslint + vite build
npm audit --omit=dev --audit-level=high
```

---

## Engineering & Syllabus Artifacts (`docs/`)

| Artifact | Syllabus Coverage | Link |
| :--- | :--- | :--- |
| **SRS & RePPIT Spec** | W1–W2, W5, W7, W12 | [`docs/SPEC.md`](docs/SPEC.md) |
| **PlantUML Models (4)** | W3, W11–W12 | [`docs/diagrams/`](docs/diagrams/) |
| **Repo Rules & Gates** | W9–W10 | [`AGENTS.md`](AGENTS.md) |
| **Repo & TDD Plan** | W4, W7, W10 | [`docs/REPO_PLAN.md`](docs/REPO_PLAN.md) |
| **Security & Review Log** | W11–W12 | [`docs/SECURITY_REVIEW.md`](docs/SECURITY_REVIEW.md) |
| **Level D AI Disclosure** | W14 / Syllabus Policy | [`docs/AI_Evidence.md`](docs/AI_Evidence.md) |
| **Oral Defense Guide** | W14 Defense | [`docs/DEFENSE_CHEATSHEET.md`](docs/DEFENSE_CHEATSHEET.md) |
