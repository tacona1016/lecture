# Codex 실행 프롬프트 — Logic Design Seminar 초기 구축

현재 작업 디렉터리에서 **Slidev + GitHub Pages 기반 디지털 논리설계 교육용 웹 프레젠테이션**을 직접 구현해 주세요. 계획 수립만 하지 말고 실제 파일 작성, 빌드, 확인 가능한 테스트까지 수행하세요.

## 0. 작업 환경과 우선순위

- 환경: Windows 11, PowerShell, VS Code, Git, GitHub, Node.js 22.12 이상, npm.
- 스택: **Slidev + Vue 3 + Markdown + KaTeX + Mermaid + 자체 SVG + GitHub Pages**.
- **사용하지 않을 것:** Next.js, React, Supabase, Vercel, DB, 로그인, 별도 API 서버, 무거운 UI/상태 라이브러리.
- 기존에 설치된 Codex Skills: `$playwright`, `$gh-fix-ci`.
- 프로젝트 루트의 `AGENTS.md` 및 `.agents/skills/slidev-seminar/SKILL.md`를 우선 읽고, 교육 콘텐츠 작성·검증에는 `$slidev-seminar` 워크플로를 적용하세요. 두 파일이 없으면 먼저 누락을 알리고, 파일이 제공되었는지 확인하세요. 기존 파일을 무조건 덮어쓰지 마세요.
- 교육 대상: 전자공학 학부 고학년~주니어 반도체/디지털 설계 엔지니어. 제목·핵심 용어는 영어, 설명은 한국어 존댓말.
- 결과물은 **공개 교육용**입니다. 사내 기밀, PDK, 비공개 회로/치수/측정 데이터, 민감정보는 사용하지 마세요. GitHub Pages는 저장소가 비공개라도 공개될 수 있음을 고려하세요.
- 불명확한 선택 중 정확성·기밀·파괴적 변경에 영향이 큰 것은 작업 전에 질문하세요. 그 외에는 가장 단순한 합리적인 기본값을 채택하고 보고하세요.

## 1. 초기 점검 및 구현 원칙

1. 현재 폴더가 새 프로젝트인지 기존 프로젝트인지 확인하고, Git 상태·원격 저장소·Node/npm 버전을 조사합니다.
2. 기존 프로젝트라면 파일과 설계를 보존하면서 최소 변경으로 개선합니다. 새 프로젝트라면 공식 Slidev 설치 방식으로 초기화합니다.
3. 의존성을 최소화하고 `package-lock.json`을 커밋 가능한 상태로 유지합니다. `npm run dev`, `npm run build`, `npm run preview`를 제공하세요(필요한 스크립트만).
4. 교육자료와 UI는 완성된 상태여야 하며, TODO/placeholder/Lorem Ipsum, 의미 없는 예시, 미구현 버튼으로 채우지 마세요.
5. **단일 Slidev 데크**로 구현합니다. `slides.md`는 표지·목차·챕터 import만 관리하고, 실제 교육 슬라이드는 `chapters/*.md`로 나눕니다.
6. 긴 작업이라면 `docs/implementation-status.md`에 12개 챕터와 기능의 완료/미완료 상태, 통과한 테스트, 바로 다음에 수행할 명령을 기록하세요. **각 3~4개 챕터 완성 시마다 체크포인트를 갱신**하여 Codex 세션이 중단되어도 진행 상황을 복원할 수 있게 합니다.
7. 전체 12개 챕터와 배포 가능한 MVP 완성을 우선하고 이후 시각적 고도화를 진행하세요.

## 2. 확정 교육 커리큘럼 (12 Chapters)

다음 순서를 기준으로 각각 **6~8장의 실질적인 강의 슬라이드**를 제작하세요. 모든 챕터에 학습 목표, 핵심 개념, 실제 풀이/계산/파형/회로 예제, 핵심 요약 또는 확인문제가 들어가야 합니다. 기술적 밀도가 필요한 주제는 슬라이드를 늘릴 수 있지만 슬라이드에 긴 문단을 몰아넣지 마세요.

**01. Number Systems & Data Representation**
- Binary/Decimal/Hex, 진법변환, Unsigned/Signed, 1's/2's Complement, Bit Width, Sign Extension, Overflow vs Carry.
- 예제: 8-bit 2's complement 덧셈과 Overflow/Carry 구분.

**02. Boolean Algebra & Logic Gates**
- Boolean 법칙, AND/OR/NOT/NAND/NOR/XOR/XNOR, De Morgan, Truth Table, SOP/POS, 논리식 간소화.
- 예제: 논리식과 진리표 및 게이트 회로가 일치하도록 설명.

**03. Combinational Circuits**
- MUX/DEMUX, Encoder/Decoder, Priority Encoder, Comparator, Functional Equivalence, Propagation Delay.
- 예제: 4:1 MUX Truth Table과 게이트/블록 회로.

**04. Karnaugh Map & Logic Minimization**
- Minterm/Maxterm, 2~4 Variable K-map, Gray Code Ordering, Wraparound, Don't-care, SOP/POS 최소화.
- 예제: 4-variable K-map 그룹핑 전/후 논리식을 직접 검증.

**05. Adders & Arithmetic Circuits**
- Half/Full Adder, Ripple Carry, Carry Lookahead, Generate/Propagate, Delay vs Area, Overflow.
- 예제: Full Adder 8개 입력 조합, 4-bit Adder carry propagation.

**06. Latches & Flip-Flops**
- SR Latch, Gated D Latch, Edge-triggered D FF, JK/T FF 개념, Enable, Setup/Hold, Clock-to-Q.
- 예제: Latch transparency와 FF sampling 시점 파형 비교.

**07. Sequential Circuits**
- State Register, Synchronous/Asynchronous Reset, Counter, Shift Register, Sequential Circuit 설계 과정.
- 예제: 2-bit Counter 상태 전이, Reset과 Clock waveform.

**08. Finite State Machines (Moore & Mealy)**
- State Diagram/Table, Moore vs Mealy, Output Behavior, State Encoding, Glitch/Latency Trade-off.
- 예제: Sequence Detector 또는 간단한 Vending Machine의 두 가지 구현 비교.

**09. Timing Constraints & Static Timing Analysis**
- Clock Period, Propagation/Contamination Delay, Tcq, Setup/Hold, Capture/Launch Edge, Clock Skew, Uncertainty, Slack, Critical Path.
- 예제: Setup/Hold Slack 계산을 분리하고 모든 부호 규약과 단위 명시.

**10. Metastability & Clock Domain Crossing**
- 비동기 샘플링, Metastability Resolution, Synchronizer, MTBF 개념과 한계, 2-FF, Multi-bit CDC, Handshake/Gray Counter.
- 예제: 2-FF synchronizer 파형과 단일비트/멀티비트 CDC의 차이.

**11. Control Unit & Microcode — Advanced / Elective**
- Datapath/Control Unit, Hardwired vs Microprogrammed, Control Store, Microinstruction, Sequencer, Horizontal vs Vertical.
- 예제: 작은 Instruction Set의 Fetch/Decode/Execute micro-operation sequence.
- 핵심 10개 주제와 12번 SRAM에 앞서 배워야 할 필수 내용이라고 표현하지 마세요. 선택·심화로 명시하세요.

**12. SRAM Memory**
- SRAM vs DRAM, 6T Bitcell의 cross-coupled inverter와 access NMOS, Hold/Read/Write, WL/BL/BLB, Precharge, Read Disturb, Read/Write Stability, SNM, Array/Peripherals, Vmin/Yield 기초.
- 예제: 6T 연결도, read/write 동작 타이밍, 독립 bit failure 가정하의 array yield 계산.

## 3. UI / Slidev 동작

- 어두운 네이비 배경, 흰색/밝은 회색 본문, Cyan/Blue 포인트. 직관적이며 과도한 공백이나 장식 없이 구성합니다.
- 16:9 발표 화면을 기본으로 하되 1920×1080 및 1366×768에서도 읽기 쉬워야 합니다.
- **첫 슬라이드:** Logic Design Fundamentals, 부제 Digital Logic to SRAM, Start.
- **두 번째 슬라이드:** 12개 챕터를 클릭 가능한 컴팩트 **3×4 목차 그리드**로 구성(화면 크기에 따라 조정 가능).
- 각 챕터 첫 슬라이드에 안정적인 `routeAlias`를 부여하고, `<Link>` 또는 공식 Slidev 라우팅을 활용해 목차 링크가 슬라이드 수 변경 후에도 유지되도록 합니다.
- 모든 챕터의 첫 슬라이드에 목차 이동 링크, 챕터 번호, 학습 목표를 보여줍니다. 슬라이드 이동·전체 화면·기본 Presenter 기능은 Slidev 기능을 최대한 사용합니다.
- 전체 슬라이드를 렌더링했을 때 텍스트·수식·표·회로도 겹침과 잘림이 없어야 합니다.
- Slidev 내장 Markdown, KaTeX, Mermaid 기능을 우선 사용하고 정확한 Gate/SRAM/Timing 회로는 직접 작성한 SVG를 사용합니다. 외부 이미지 핫링크/CDN에 의존하지 마세요.

## 4. 첫 버전 인터랙티브 실습 3개

### A. Logic Gate Simulator
- AND, OR, XOR, NAND, NOR, XNOR 선택.
- A/B 입력 0↔1 토글, Y 결과와 해당 논리식·상태 표시.
- 각 게이트와 모든 입력 조합의 출력이 진리표와 일치하도록 테스트.

### B. Full Adder Simulator
- A, B, Cin을 0/1로 바꾸면 Sum, Cout 즉시 변경.
- `Sum=A XOR B XOR Cin`, `Cout=(A AND B) OR (Cin AND (A XOR B))`.
- 8가지 조합을 전수 테스트. 필요 시 Half Adder 설명도 함께 제공.

### C. Setup Timing Simulator
- Tclk, Tcq_max, Combinational_max, Tsetup, Capture−Launch Skew, Setup Uncertainty를 조절합니다.
- 동일 주파수/동일 에지의 간단한 단일 레지스터 경로 모델에서:
  `setup_slack = Tclk + skew - (Tcq_max + Tcomb_max + Tsetup + uncertainty)`.
- Positive/Negative Skew, PASS/VIOLATION 임계 경계를 정확히 처리합니다.
- 수식의 각 변수, 단위(ns), 가정, 모델의 한계를 표시합니다.
- Hold는 별도의 Min Delay 분석임을 명시합니다. Setup PASS를 Hold PASS로 표시하지 마세요.

컴포넌트는 `components/`에서 Vue 3 Composition API로 구현하고, 별도 Backend 없이 브라우저에서 동작하게 합니다. 입력 조작은 키보드로도 가능하도록 구성하고 Reset 동작을 구현하세요.

## 5. 권장 폴더 구조

```text
logic-design-seminar/
├── AGENTS.md
├── .agents/skills/slidev-seminar/SKILL.md
├── slides.md
├── chapters/
│   ├── 01-number-systems.md
│   ├── 02-boolean-algebra.md
│   ├── 03-combinational-circuits.md
│   ├── 04-karnaugh-map.md
│   ├── 05-adders.md
│   ├── 06-latches-flipflops.md
│   ├── 07-sequential-circuits.md
│   ├── 08-fsm.md
│   ├── 09-timing-sta.md
│   ├── 10-metastability-cdc.md
│   ├── 11-microcode.md
│   └── 12-sram.md
├── components/
│   ├── LogicGateSimulator.vue
│   ├── FullAdderSimulator.vue
│   └── SetupTimingSimulator.vue
├── styles/index.css
├── public/images/
├── .github/workflows/deploy.yml
├── package.json
├── package-lock.json
└── README.md
```

Slidev의 실제 최신 표준 디렉터리나 기능 제약과 충돌한다면 공식 문서를 우선하고 차이를 보고하세요.

## 6. GitHub Pages 배포

- GitHub Actions를 사용해 `main` push와 `workflow_dispatch`에서 자동 배포되도록 구성합니다.
- `npm ci` → `slidev build --without-notes --base <BASE_PATH>` → `actions/configure-pages` → `actions/upload-pages-artifact` → `actions/deploy-pages` 공식 워크플로.
- `<owner>.github.io` 사용자 사이트는 `/`, 일반 `<repo>` 프로젝트 사이트는 `/<repo>/`를 사용합니다. repo 이름을 코드에 하드코딩하지 마세요.
- `pages: write`, `id-token: write`, `contents: read` 등 필요한 최소 GitHub Actions 권한을 설정합니다.
- GitHub `Settings → Pages → Source: GitHub Actions`가 필요함을 README에 명시합니다.
- base path 하에서 JavaScript/CSS/SVG/이미지/목차 링크가 유효한지 검증합니다.
- 등록된 remote를 먼저 확인하고 승인 없이 다른 repository에 push하거나 Repo Visibility를 변경하지 마세요.

## 7. 테스트 및 품질 기준

- 프로젝트 설치: `npm ci` (또는 초기 생성 시 `npm install`).
- 빌드: `npm run build` 성공. 배포 시 `--without-notes`와 실제 base path 사용.
- 12개 실제 Markdown 챕터 및 **내용 있는 6~8장** 검증.
- 챕터 링크와 고유 alias 검증, 목차로 복귀, 키보드 다음/이전 슬라이드 동작.
- KaTeX, Mermaid, 정확한 Gate/SRAM SVG 확인.
- Logic Gate 전 조합, Full Adder 8조합, Timing Simulator 경계값 자동 테스트.
- 설치된 `$playwright`를 사용해 실제 브라우저에서 데스크톱 1920×1080 및 1366×768 스크린샷/overflow/콘솔/클릭을 검사하고, 문제를 수정하세요. 단순 소스 분석만 하고 '화면 검증 완료'라고 말하지 마세요.
- GitHub Actions 실패가 발생했을 때는 `$gh-fix-ci`로 실패한 워크플로 로그를 조사하세요. 도구/권한 문제로 실패 로그에 접근하지 못하면 그 한계를 표시하세요.
- 공개 배포가 실제로 완료되지 않았다면 '배포 준비 완료'와 '배포 성공'을 구별해 보고하세요.

## 8. 작업 순서 및 최종 보고

1. 기존 상태와 환경 점검.
2. Slidev 기본 구조, 커버/목차/라우팅/테마 구축.
3. 12개 챕터 실질적인 초안 작성 및 논리/수식 검증.
4. 3개 인터랙티브 실습 구현 및 테스트.
5. GitHub Pages Action과 README 작성.
6. 로컬 빌드, 배포 경로, Playwright 화면·기능 테스트 후 수정.
7. 결과 보고: 변경 파일, 구현 기능, 챕터별 슬라이드 수, 통과/실패한 테스트, 미검증 요소, 사용자가 GitHub에서 할 일, 다음 단계. 중단되거나 일부만 완료된 경우 `docs/implementation-status.md`를 갱신하고 정확한 재개 지점을 제시하세요.

**중요:** 실행 가능한 범위에서 실제 개발을 진행하고, 장식보다 기술 정확성과 발표 가독성을 우선하세요. 계획만 작성하거나 내용을 TODO로 남긴 상태를 완성으로 보고하지 마세요.
