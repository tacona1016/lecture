# Logic Design Seminar — Repository Instructions

## Mission and scope
- Maintain a **public, static, presentation-first** course in digital logic design, implemented with **Slidev + Vue 3 + Markdown + GitHub Pages**.
- Audience: senior undergraduate students and early-career digital/semiconductor design engineers. Titles and standard technical terms in English; explanatory text in Korean polite/formal style.
- Use Node.js **22.12+**, npm, and the existing repo conventions. Prefer built-in Slidev features, KaTeX, Mermaid, local SVG, and small Vue components.
- Do **not** introduce Next.js, Nuxt, React, databases, Supabase, Vercel, authentication, server functions, heavyweight UI or state libraries without a new explicit request.
- Treat all GitHub Pages artifacts as **publicly accessible**, irrespective of source repository visibility. Do not include internal schematics, proprietary PDK/process numbers, confidential data, secrets, student information, or unlicensed assets.

## Source-of-truth structure
- `slides.md`: cover, clickable table of contents, and the ordered imports of chapter decks.
- `chapters/NN-topic.md`: one Markdown file per chapter; preserve chapter identifiers and stable routes during edits.
- `components/`: reusable Vue 3 interactive teaching demos; keep calculations in small testable functions if useful.
- `styles/index.css`: presentation-first **Warm Technical** theme on a 980px, 16:9 canvas: Warm Ivory background (#F7F5EF), Deep Teal accent (#086F69), Dark Slate text, and locally bundled Noto Sans KR Variable with fallbacks. Use Amber for active paths and labeled HIGH/LOW/PASS/VIOLATION states. Keep KaTeX math fonts intact; avoid excessive whitespace and text overflow.
- `public/`: only distributable local assets; use relative or base-aware paths for GitHub Pages.
- `.github/workflows/deploy.yml`: deterministic build and official GitHub Pages deployment.
- `.agents/skills/slidev-seminar/SKILL.md`: domain-specific authoring/review workflow. Invoke `$slidev-seminar` when writing, revising, or verifying teaching slides, equations, diagrams, or simulations.

## Canonical 12-chapter order
1. Number Systems & Data Representation
2. Boolean Algebra & Logic Gates
3. Combinational Circuits
4. Karnaugh Map & Logic Minimization
5. Adders & Arithmetic Circuits
6. Latches & Flip-Flops
7. Sequential Circuits
8. Finite State Machines (Moore & Mealy)
9. Timing Constraints & Static Timing Analysis
10. Metastability & Clock Domain Crossing
11. Control Unit & Microcode (advanced/elective)
12. SRAM Memory

Do not silently change this structure. Explain proposed topic changes first. Keep every chapter's landing route stable via `routeAlias` and use Slidev's supported `Link` navigation. Keep the main TOC navigable after slides are added or removed.

## Teaching and technical accuracy
- One primary learning objective per slide; write concise, teachable explanations rather than walls of text. First release: **6–8 substantive slides per chapter**, including learning goal, conceptual explanation, worked example/diagram, recap or check question. Do not add placeholders or fabricated measurements.
- Equations, truth tables, gate symbols, state diagrams, timing diagrams, numerical examples, and interactive outputs must agree. Clearly specify signal polarity, units, bit width, clock edges, and modeling assumptions.
- Explain signed overflow separately from unsigned carry. State setup/hold clock-skew sign conventions. Do not imply that a two-flop synchronizer makes CDC perfectly safe or synchronizes multi-bit buses automatically. Explain SRAM as a simplified educational model unless supported by validated electrical data.
- For complex/novel factual assertions, prefer trustworthy textbooks or official technical references and include a compact attribution in instructor notes or the Markdown source, not sprawling citations on presentation slides.
- No company-specific PDK/device numbers or false claims of SPICE accuracy.

## Engineering workflow
1. Inspect existing files, Git status, scripts, installed skills, and supported Slidev syntax before editing; preserve user changes.
2. For educational content tasks, load the repository `slidev-seminar` skill; use installed `$playwright` for real browser/layout interaction tests when available.
3. Keep dependencies minimal and lock versions with `package-lock.json`. Prefer Vue 3 Composition API, semantic buttons, accessible labels, and keyboard-compatible controls.
4. Run `npm ci` (if lockfile exists) and `npm run build` after functional edits. Add targeted deterministic tests for Boolean/arithmetic/timing logic. Do not claim tests ran if they did not.
5. Verify Slidev navigation, LaTeX, Mermaid, local assets, JavaScript console, and slide clipping at **1920×1080** and **1366×768** using the installed Playwright workflow where feasible.
   For theme changes also check **1280×720**, font loading without runtime CDN requests, text contrast (4.5:1 normal / 3:1 large), SVG/Mermaid colors, and every reveal state. Preserve circuit geometry, equations, calculations, routes, and interaction logic during theme-only migrations.
6. For longer multi-chapter work, maintain `docs/implementation-status.md` with per-chapter status, completed checks, blockers, and exact next steps; update it at meaningful checkpoints so interrupted Codex sessions can resume reliably.
7. When GitHub Actions is failing, use installed `$gh-fix-ci` when relevant, check `gh` availability/authentication, inspect actual workflow logs, repair root causes, then rebuild and report.
8. Do not push, create repositories, alter repository visibility, enable Pages settings, delete content, or force-reset branches unless specifically authorized. Report clearly what local changes need a user-side GitHub action.

## GitHub Pages requirements
- Build a **static SPA** with `slidev build --without-notes` and a correct `--base` beginning and ending in `/`.
- For a project repository use `/<repo>/`; for a `<owner>.github.io` user-site repository use `/`.
- Use official `actions/configure-pages`, `actions/upload-pages-artifact`, `actions/deploy-pages`, with least privilege; build on push to `main` and `workflow_dispatch`.
- Validate base-path handling of styles, scripts, images, and links. Never assume a private GitHub repository means a private GitHub Pages site.

## Response expectations
- Briefly state changes, the rationale for any curriculum trade-off, commands run and their outcomes, and remaining risks/limitations.
- Ask the user only when an unresolved choice genuinely affects accuracy, confidentiality, or destructive operations; otherwise use the documented defaults.
