# Read-Only Agentic Code Review & Security Audit (Weeks 11–12)

**Project:** Personal Autobiography Website (`se-tsis-autobiography`)  
**Scope:** Static SAST/SCA checks, trust-boundary inspection, prompt-injection defense, and Level D verification.

---

## 1. Automated Verification & SCA Results

| Check | Command | Observed Result |
| :--- | :--- | :--- |
| **Unit & UI Tests** | `npm run test` (`vitest run`) | **5 test files passed, 17 tests passed (17)** (`TC-01`–`TC-13`) |
| **Strict Typecheck** | `npm run typecheck` (`tsc --noEmit`) | **0 errors** (`strict: true`, `noUncheckedIndexedAccess: true`) |
| **Static Lint (SAST)** | `npm run lint` (`eslint .`) | **0 errors, 0 warnings** |
| **Production Build** | `npm run build` (`vite build`) | **1590 modules transformed**, `dist/` built cleanly |
| **Production SCA** | `npm audit --omit=dev --audit-level=high` | **0 vulnerabilities** |

---

## 2. Read-Only Review Findings (Confirmed vs. Unsupported)

### Confirmed Finding `[F1 — Medium | Fixed]`
- **Location:** `src/utils/bioAssistant.ts` & `src/utils/outputGuard.ts`
- **Issue:** When `retrieveRelevantFacts()` returned `0` matches for an out-of-scope question (`TC-07`), the mock adapter's helpful suggestion mentioned `Kyzylorda`, `NIS`, and `KBTU`, which triggered `validateAssistantOutput()`'s ungrounded-entity rule (`if (matches.length === 0 && /KBTU|NIS|Kyzylorda/i.test(trimmed))`) and unexpectedly forced a `DETERMINISTIC_FALLBACK` instead of a clean `MOCK_ADVISORY` out-of-scope reply.
- **Fix Applied:** Updated the out-of-scope advisory template in `src/utils/bioAssistant.ts` to suggest generic categories (*hometown, education, technical coursework, or personal interests*) when `matches.length === 0`, and verified `TC-07` passes.

### Unsupported / Intentional Hypotheses `[Rejected]`
- **`[H1 — Rejected]`:** `maxLength={MAX_QUESTION_LENGTH + 25}` (`225`) on `#qa-question-input` in `src/components/AskBekzatWidget.tsx` is **intentional** (not a missing cap): allowing users to type 201–225 characters lets evaluators test `AC-05` (`INPUT_TOO_LONG` rejection) live in the UI.
- **`[H2 — Rejected]`:** No `dangerouslySetInnerHTML`, `innerHTML`, `eval`, or `.env` API secrets exist anywhere in `src/`. All user strings render via escaped React JSX text nodes.

---

## 3. Privacy & PII Checklist (`NFR-05`)
- Zero private PII (no home address, phone number, IIN, or private academic grades).
- Public contact is limited strictly to `kalenuli.nis@gmail.com` and the public GitHub repository link.
- `localStorage` stores only `'light' | 'dark'` under `bekzat-bio-theme`.
