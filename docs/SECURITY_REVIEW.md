# Read-Only Agentic Code Review & Security Audit (Weeks 11–12)

**Project:** Personal Autobiography Website (`se-tsis-autobiography`)  
**Scope:** Static SAST/SCA checks, trust-boundary inspection, prompt-injection defense, accessibility audit, documentation traceability, and Level D verification.

---

## 1. Automated Verification & SCA Results

| Check | Command | Observed Result |
| :--- | :--- | :--- |
| **Unit & UI Tests** | `npm run test` (`vitest run`) | **7 test files passed, 30 tests passed (30)** (`TC-01`–`TC-13` + edge-case tests; exceeds `NFR-06 >= 25`) |
| **Strict Typecheck** | `npm run typecheck` (`tsc --noEmit`) | **0 errors** (`strict: true`, `noUncheckedIndexedAccess: true`) |
| **Static Lint (SAST)** | `npm run lint` (`eslint .`) | **0 errors, 0 warnings** |
| **Production Build** | `npm run build` (`vite build`) | **1590 modules transformed**, `dist/` built cleanly (`3.41s`) |
| **Production SCA** | `npm audit --omit=dev --audit-level=high` | **0 vulnerabilities** |

---

## 2. Confirmed Findings Fixed Across Review Passes

| ID | Severity | Location | Issue Found | Fix Applied & Verified |
| :--- | :---: | :--- | :--- | :--- |
| **F1** | Medium | `src/utils/bioAssistant.ts` | Out-of-scope suggestion named `Kyzylorda`/`NIS`/`KBTU`, triggering `outputGuard`'s ungrounded-entity rejection (`TC-07`). | Reworded out-of-scope response to generic categories; verified `TC-07` returns clean `MOCK_ADVISORY`. |
| **F2** | **High** | `src/utils/biographySearch.ts` | Raw `haystack.includes(token)` caused false-positive substring matches (`"car"` → `"career"`, `"art"` → `"architecture"`) and missed plural/inflected terms (`"computers"`). | Replaced substring search with tokenized word-boundary matching + safe stemming (`biographySearch.test.ts`). |
| **F3** | Medium | `src/utils/bioAssistant.ts` | Simulated `hallucinate` draft was `< 320` chars despite claiming to exceed length contract. | Expanded simulated hallucination draft to violate length (`> 320`), sentence (`> 3`), HTML (`<script>`), and factual grounding simultaneously; verified all checks trigger. |
| **F4** | Medium | `src/utils/bioAssistant.ts`, `src/utils/outputGuard.ts` | Responses displayed only `matches[0].snippet` but cited up to 2 `factIds`, weakening provenance accuracy. | Restricted `citedFactIds` strictly to `[primary.factId]` / `[top.factId]` so every citation maps 1-to-1 to the displayed answer. |
| **F5** | Medium | `src/utils/inputGuard.ts` | Missing prompt-injection/XSS variants (`forget previous instructions`, `jailbreak`, `<iframe>`, `<svg>`). | Hardened `INJECTION_PATTERNS` and added dedicated unit tests (`inputGuard.test.ts`). |
| **F6** | Low | `src/components/Footer.tsx` | Literal markdown backticks rendered around `` `CSCI 202609` `` in the UI footer. | Removed backticks and added regression assertion in `App.test.tsx`. |
| **F7** | Low | `src/components/HeroBio.tsx` | External GitHub link rendered a `<Mail>` icon instead of an external-link icon. | Conditionally render `<ExternalLink>` for `https://` links and `<Mail>` only for `mailto:`. |
| **F8** | Medium | `Header.tsx`, `TimelineSection.tsx`, `AskBekzatWidget.tsx`, `index.html` | Sticky header overlapped `#timeline`/`#ask-bekzat` anchors; missing mobile nav links, `focus-visible` rings, `aria-controls`, `aria-invalid`, over-limit char indicator, and inline SVG favicon. | Added `scroll-mt-20`, responsive nav links, explicit `focus-visible:ring-2`, `aria-controls`/`aria-invalid`, red over-limit counter, higher WCAG light-mode contrast (`stone-600`/`stone-700`), and inline SVG favicon. |
| **F9** | **High** | `docs/SPEC.md` (`NFR-06`) & `src/__tests__/` | `SPEC.md` specified `>= 25` automated tests while initial build had `17`. | Added 13 targeted edge-case tests (`biographySearch.test.ts`, `outputGuard.test.ts`, `ErrorBoundary`, DOM injection/over-limit tests) bringing suite to **30/30 passing tests**. |
| **F10** | Medium | `SPEC.md`, `AGENTS.md`, `03_domain_class_diagram.puml`, `DEFENSE_CHEATSHEET.md`, `README.md` | Spec version/filename drift (`Timeline.tsx` vs `TimelineSection.tsx`, `isEditable?` vs `isEditablePlaceholder`, missing `Footer`/`hometown`/`interests`), and live demo order trap in `DEFENSE_CHEATSHEET.md`. | Synced every doc/diagram to exact source names, added live GitHub Pages URL, and fixed the Week 14 live demo sequence. |

---

## 3. Unsupported / Intentional Hypotheses `[Rejected]`
- **`[H1 — Rejected]`:** `maxLength={MAX_QUESTION_LENGTH + 25}` (`225`) on `#qa-question-input` in `src/components/AskBekzatWidget.tsx` is **intentional** so evaluators can type 201–225 characters and verify `AC-05` (`INPUT_TOO_LONG`) live in the UI.
- **`[H2 — Rejected]`:** No `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or `.env` API secrets exist anywhere in `src/`. All user text renders via escaped React JSX nodes.
- **`[H3 — Rejected]`:** `vite.config.ts` setting `base: process.env.GITHUB_ACTIONS ? '/se-tsis-autobiography/' : '/'` is verified correct for both local `vite` (`http://localhost:5173/`) and GitHub Pages (`https://sdnaa2.github.io/se-tsis-autobiography/`).

---

## 4. Privacy & PII Checklist (`NFR-05`)
- Zero private PII (no home address, phone number, IIN, or private academic grades).
- Public contact is limited strictly to `kalenuli.nis@gmail.com` and the public GitHub repository link.
- `localStorage` stores only `'light' | 'dark'` under `bekzat-bio-theme`.
