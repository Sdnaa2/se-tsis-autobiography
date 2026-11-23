# Generative AI Disclosure & Verification Evidence (Level D Policy)

- **Student:** Kalenuly Bekzat (`24B031047`)
- **Course:** Software Engineering (`CSCI 202609`, Fall 2026 — KBTU)
- **Syllabus AI Policy:** **Level D — AI-Integrated** (AI used for specification, modeling, scaffolding, and test generation; student verifies, owns, and defends all engineering artifacts).

---

## 1. AI Contribution & Verification Log

| Phase | What AI Generated | What Bekzat Verified | What Bekzat Changed / Directed |
| :--- | :--- | :--- | :--- |
| **Phase 1–2 (Spec & UML)** | Drafted `docs/SPEC.md`, 4 PlantUML `.puml` diagrams, `AGENTS.md`, and `docs/REPO_PLAN.md` following RePPIT. | Checked local toolchain (`git`, `python3`), validated PlantUML syntax (`@startuml`/`@enduml`, balanced blocks), and confirmed syllabus alignment. | Chose full SE package, React+TS+Vite+Tailwind stack, bounded client-side Q&A widget, and GitHub Pages + Actions CI/CD. |
| **Phase 3–4 (Core & UI)** | Scaffolded Vite/React/TS/Tailwind app, `deepFreeze.ts`, `biography.ts`, `timelineFilter.ts`, `inputGuard.ts`, `outputGuard.ts`, `bioAssistant.ts`, and editorial UI components. | Installed Node.js (`v22.23.1`) and npm (`10.9.8`); inspected all biography text so zero unstarted projects or fabricated claims were included. | Supplied personal Kyzylorda PC-at-8 story, NIS classmate memories, anime/manga/light-novel/music interests, personal quote, and `kalenuli.nis@gmail.com`. |
| **Phase 5 (Tests & Audit)** | Generated Vitest suite (`TC-01`–`TC-13`), GitHub Actions CI/CD (`ci.yml`, `deploy.yml`), and `docs/SECURITY_REVIEW.md`. | Ran `npm run verify` (`17/17` tests, `tsc --noEmit`, `eslint .`, `vite build`) and `npm audit --omit=dev --audit-level=high` (`0` vulnerabilities). | Caught and fixed `globals` version range in `package.json` and `TC-07` out-of-scope response rule in `bioAssistant.ts`. |
| **Phase 6 (Defense Prep)** | Drafted `README.md`, `docs/AI_Evidence.md`, and `docs/DEFENSE_CHEATSHEET.md`. | Reviewed 90-second pitch, 3-click live demo script, and likely instructor Q&A. | Prepared public GitHub repo `Sdnaa2/se-tsis-autobiography` for GitHub Pages deployment. |
