---
name: slidev-seminar
description: Create, revise, review, and test Slidev Markdown lectures, logic diagrams, mathematical explanations, and small Vue interactive demos for the Logic Design Seminar (digital logic, adders, FSM, timing, CDC, and SRAM). Use for course authoring, correctness checks, lecture navigation, and slide visual QA. Do not use for unrelated projects or GitHub Actions-only failures.
---

# Slidev Seminar — authoring and review workflow

Work within the repository's `AGENTS.md`. This skill supplies reusable **course-content and presentation QA** guidance; it does not replace the installed `$playwright` or `$gh-fix-ci` skills.

## 1. Inspect before editing
- Read `AGENTS.md`, `slides.md`, relevant `chapters/*.md`, `components/`, styles, `package.json`, and Git status. Identify existing course conventions and live route aliases.
- Check the project's actual Slidev version and official syntax before introducing a new feature. Do not overwrite uncommitted work or reinitialize an existing project.
- Clarify only decisions that would materially change course level, approved-public content, or publishing access; otherwise adopt the documented defaults.

## 2. Plan the instructional unit
For each requested chapter or enhancement, define:
1. Audience prerequisite and **2–3 measurable learning outcomes**.
2. A short conceptual sequence: intuition → representation/formula → circuit or waveform → worked example → design caveat → recap/quiz.
3. At least one **concrete, verifiable** truth table, binary example, diagram, state trace, or quantitative calculation.
4. Assumptions (supply voltage, edge relationship, bit width, polarity, timing corner, idealized model) wherever needed.

Target **6–8 substantive slides per chapter** initially. Use English headings and established terms with concise Korean explanation. Prioritize drawing, waveforms, and equations over paragraphs; avoid illegible text or densely packed slides.

## 3. Make accurate visuals
- Use Warm Technical: Warm Ivory, Deep Teal, Dark Slate, Amber active paths, and locally bundled Noto Sans KR Variable. Preserve KaTeX fonts, circuit geometry, equations, routes, and click/state logic in theme-only edits.
- Use KaTeX for math, Mermaid for block/state flow, and accurate local SVG for gates, timing diagrams, SRAM schematics; use Vue components for small adjustable demos.
- Verify actual connections and labels: bubbles for inversion, carry/borrow direction, WL/BL/BLB polarity, clock edges, timing intervals, FSM output location.
- Use a diagram label to distinguish an abstract block diagram from a transistor-level circuit. For a 6T SRAM bitcell show two cross-coupled CMOS inverters and two wordline-controlled access NMOS between Q/QB and BL/BLB.
- Do not fake a simulation with arbitrary numerical plots. Label conceptual examples as **illustrative**; only claim SPICE or silicon realism when connected to validated data and stated conditions.
- Provide sources for nontrivial external facts and reuse self-created or permissively licensed images only.

## 4. Apply domain-specific correctness checks

### Boolean and arithmetic
- Algebraic identities must hold for every input; enumerate all rows when practical (2–4 binary inputs).
- Full adder: `Sum = A XOR B XOR Cin`; `Cout = (A AND B) OR (Cin AND (A XOR B))`.
- Karnaugh maps: preserve binary/Gray ordering, wraparound adjacency, don't-care handling, and correct SOP/POS conventions.
- Distinguish **unsigned carry-out** from **signed two's-complement overflow**; specify width, sign extension, truncation, and fixed-point assumptions.

### Latches, FFs, FSM, and timing
- Distinguish level-sensitive latches from edge-triggered FFs; distinguish Moore outputs (state-dependent) from Mealy outputs (state and input-dependent).
- For a same-frequency, same-edge simplified register-to-register example define `skew = capture_clock_arrival − launch_clock_arrival`:
  - `setup_slack = Tclk + skew − (Tcq_max + Tcomb_max + Tsetup + setup_uncertainty)`.
  - `hold_slack = Tcq_min + Tcomb_min − (Thold + skew + hold_uncertainty)`.
- The above equations are **simplified pedagogical models**; define all quantities, treat max/min paths separately, and avoid generalizing to multicycle paths, generated clocks, OCV, waveform changes, or complex STA.
- CDC/metastability: distinguish probability from certainty; two-FF synchronization reduces failure likelihood for a **single-bit control**, not an arbitrary multi-bit bus. Explain recovery/resolution time and MTBF assumptions without inventing process parameters.

### SRAM
- Separate cell, peripheral circuit, and array-level concepts. Teach hold, read, write, precharge, and read disturb correctly.
- Distinguish hold/read SNM, writeability, read/write assists, and array yield vs. single-cell failure probability.
- Do not claim universal Vmin/SNM/cell-ratio numbers. When teaching array yield using `Y ≈ (1−p)^N`, state the **independent, equal bit-failure probability** assumption and discuss common-mode effects.

## 5. Implement interactive demos
- Build focused Vue 3 components with accessible buttons/sliders and visibly labeled inputs, outputs, units, assumptions, and a reset action.
- Separate pure calculations from UI where practical and test boundary cases with deterministic inputs.
- Preferred initial demos: logic gates (all inputs); half/full adder (all 8 full-adder inputs); setup timing (positive/negative skew, boundary PASS/VIOLATION). Do not mislabel setup-only verification as full timing closure.
- Use no external simulation server, personal data collection, state backend, or unnecessary framework.

## 6. Preserve navigation and deployability
- Keep the single Slidev entry `slides.md`, chapter Markdown imports via supported `src` syntax, and stable chapter landing aliases via `routeAlias`.
- Use built-in `<Link>` to navigate to TOC or chapters. Preserve 12-chapter order, even as slide counts change.
- All asset paths must remain valid under both local `/` and deployed GitHub Pages `/<repo>/` base paths.
- Public builds should exclude speaker notes (`--without-notes`). Do not introduce secrets or confidential engineering materials.

## 7. Validate and report
1. Check technical truth tables and numerical examples manually or with lightweight deterministic tests.
2. Run dependency install/build as appropriate: `npm ci`, `npm run build`.
3. If installed/available, invoke `$playwright` to inspect layout and behavior in the **rendered** Slidev site (1920×1080, 1366×768). Capture and fix overlapping elements, missing math/diagrams, console errors, broken chapter routes, and interactive control failures.
4. Check the production built site with its GitHub Pages base prefix if feasible. Use `$gh-fix-ci` for actual CI failures rather than guessing.
5. Report: changed chapters/components, what was verified and how, what remains unverified, and follow-up improvements. Do not assert a deployment succeeded without an actual GitHub Actions success signal.

Theme migrations also require 1280x720, local font/fallback checks, normal-text contrast >=4.5:1 (large >=3:1), external SVG/Mermaid review, and forward/reverse reveal validation.
