# Presenter review — 2026-11-07

## Phase A: 기준 화면

현재 working tree를 기준으로 검사했습니다. `.git`의 HEAD는 이전 initial에 남아 있으므로 Git diff를 이번 작업의 기준으로 사용하지 않았습니다.
이전 변경사항을 포함한 40개 파일과 SHA-256은 `output/presenter-baseline/`에 보관했습니다.

- 정확한 장수: 12 chapters / 본문 88장 / 표지·목차 포함 90장.
- Playwright CLI / 실제 production build / `/lecture/` / 1920×1080, 1366×768, 1280×720.
- 270개 기준 screenshots, 전체 90장 contact sheet 3개를 시각적으로 검토했습니다.
- Console error, 실패 response, 깨진 SVG, KaTeX/Mermaid 렌더링 오류: 0.
- Footer 안전 여백을 포함한 검사에서 slide 16의 하단 설명이 침범합니다.
- 일반 설명 p 50개가 theme opacity로 흐리게 표시됩니다. Lab 3개와 SRAM 보조 설명은 13–15px canvas 글꼴을 포함합니다.

| Chapter / slide | 문제 | 우선 수정 |
| --- | --- | --- |
| Cover / 1 | theme cover와 내부 cover class가 겹쳐 회로 그림이 매우 작습니다. | 내부 cover 이름과 첫 layout 분리 |
| 공통 / 1–90 | Footer가 layout에 가려져 번호와 Contents가 보이지 않습니다. | z-index와 전용 하단 여백 |
| Quiz / 9,17,24,31,39,46,53,60,68,75,82,90 | 정답과 풀이가 질문과 동시에 표시됩니다. | 기본 0 → 정답 1 → 해설 2 |
| Ch02 / 16 | Gate 기호가 없고 하단 hint가 footer 여백을 침범합니다. | 기호+진리표 병렬 배치 |
| Ch05 / 33,36,37 | HA/FA 식과 ripple 표는 정확하지만 carry 전달 방향을 설명하기 어렵습니다. | 4-stage 신호 경로, 식 유도 단계 |
| Ch06 / 43 | 모든 파형이 동시에 보여 transparency/sampling 비교 초점이 없습니다. | window → latch → FF 단계 강조 |
| Ch09 / 62–67 | 수식이 먼저 나오며 launch/capture/arrival/required가 시간축으로 연결되지 않습니다. | 공통 setup timeline, 별도 min hold path |
| Ch12 / 84–86 | 정확한 6T 도식은 있지만 동작 단계와 활성 경로가 분리돼 있습니다. | 동일 그림 위 Hold/Read/Write 경로 표시 |
| Lab / 16,35,67 | 숫자와 식만으로 회로·carry·slack을 연결해야 합니다. | SVG 기호/블록/시간축, 큰 0/1 및 HIGH/LOW |

기준 화면: `output/playwright/presenter-before-{1920,1366,1280}-001.png`부터 각 090.png까지.
Contact sheet: `output/playwright/presenter-before-contact-{1,2,3}.png`.
상세 DOM 결과: `output/playwright/presenter-before.json`.

## 설계 선택

12개 챕터 순서와 계산 라이브러리를 유지합니다. 일반 설명은 무클릭으로 두고, quiz/식 유도/회로 동작에만 Slidev 클릭 단계를 사용합니다.
SRAM은 Hold·Read·Write의 일차 학습목표를 분리하기 위해 8장에서 10장으로 늘립니다. 다른 챕터 수를 줄이거나 내용을 제거하지 않습니다.
공개 build의 `--without-notes`와 기존 workflow/dependency는 유지합니다. 강의자 상세 메모는 Git에서 제외된 output에만 작성합니다.

## Phase B–D: 구현 결과

- Cover: theme의 cover layout/class 충돌을 없애 회로 그림의 크기를 복구했습니다. 제목 아래 p에 적용되던 theme opacity도 명시적으로 해제했습니다.
- Quiz: 12개 모두 `QuizReveal`을 사용합니다. 문제는 항상 보이며 `v-click=1`에 정답, `v-click=2`에 근거가 나타납니다. 숨긴 영역은 aria-hidden이며 공간을 유지합니다.
- Navigation: 번호/STEP과 중앙 Contents를 표시합니다. 실제 클릭 검사에서 기본 도구막대가 왼쪽 Footer 링크를 가로막는 것을 발견해 중앙으로 옮겼습니다. 기본 전체 화면·Overview·Presenter 도구는 보존했습니다.
- Adder: HA의 1+1 직관 → 두 HA와 OR → 식 순서입니다. Ripple은 입력 → bit 0/1/2/3 → 최종 Sum/Cout/V의 6단계입니다. CLA는 3회에 걸쳐 carry 식을 전개합니다.
- Latch/FF: EN-high window → latch 추종 → FF sampling → 이상 Tcq와 실제 지연 구분의 4단계입니다. 입력 파형과 초기 Q=0을 유지했습니다.
- Timing: 7단계 Setup 시간축과 별도의 4단계 min Hold 경로입니다. skew=C−L을 유지하며 setup은 Required−Arrival, hold는 Arrival_min−Required_hold로 구분합니다.
- SRAM: 기존 6T SVG를 그대로 사용해 Hold 2단계, Read 4단계, Write 4단계를 표시합니다. Read Q=0에서 BL→AX1→N1→VSS, Write Q←1에서 BL=1/BLB=0입니다. 전기적 정량 시뮬레이션을 주장하지 않습니다.
- Labs: gate 기호+현재 진리표 행, FA block+carry, 실시간 setup SVG를 추가했습니다. 기존 입력/함수/Reset을 유지하고 버튼·상태·힌트 가독성을 조정했습니다.

주요 파일: `slides.md`, `global-bottom.vue`, `styles/index.css`, `chapters/*.md`, 기존 simulator 3개, 신규 표시용 Vue 컴포넌트 10개, `lib/presentation.mjs`, `tests/presentation.test.mjs`, `scripts/check-content.mjs`입니다.
`package.json`, lockfile, `lib/logic.mjs`, 기존 논리 테스트, 배포 Workflow, 검증된 SRAM SVG 두 개는 시작 시점 SHA-256과 같습니다.
콘텐츠 검사는 설치된 Slidev parser를 사용해 메타데이터 앞의 빈 줄로 생기는 잘못된 슬라이드/alias도 탐지하도록 강화했습니다.

## Phase E: 검증 결과

| 검증 | 실제 결과 |
| --- | --- |
| npm ci | PASS · 710 packages · 의존성 변경 없음 |
| npm test | PASS · 기존 10개 + 새 2개, 총 12개 |
| check:content | PASS · 12 chapters / 91 teaching / 총 93장 / 37 aliases |
| build -- --base /lecture/ | PASS · Slidev 53.1.0 · --without-notes |
| check:build -- /lecture/ | PASS · index.html, SPA fallback, 17개 script/style/image 참조 |
| 전체 렌더링 | 93장, 3해상도, 초기/최종 342 frames; 35/68/89의 Footer 여백 수정 후 9 frames 재검사 PASS |
| 최종 Footer | 대표 화면 45 frames, 실제 hit test 45회와 Contents 클릭 3해상도 PASS |
| Quiz | 12개 × 3해상도 · 0→1→2→1→0, opacity/aria-hidden/질문 위치 PASS |
| 설명 단계 | 9개 deck 동작/유도 · 0→끝→0, 다음 장에서 ← 재진입, 새로고침 PASS |
| Gate/FA | Gate 24조합, FA 8조합을 각 해상도에서 UI와 SVG/진리표 대조 PASS |
| Timing UI | 기본/양수 skew/0 ns/음수 slack, slider 6개 키보드, 64개 min/max 조합 PASS |
| 접근성과 조작 | 3해상도 Tab/Space/마우스 slider/Reset, 실습 중 이동 방지 및 배경 클릭 후 이동 복귀 PASS |
| 발표 도구 | Start, 목차 12개 왕복, chapter alias 직접/새로고침, Footer, 전체 화면, Overview, Presenter 전진/후진 PASS |
| 렌더링 오류 | Console, network 404/실패 요청, 깨진 이미지, KaTeX/Mermaid/SVG 경계 오류 0 |
| 공개 산출물 | dist 296 files · source note 12개 및 로컬 메모·Markdown·환경 파일 제외 확인; Presenter는 No notes |
| 원격 | 로컬 검증 후 사용자가 Commit/main 반영/재배포 승인 · 이 원고는 반영 직전 체크포인트이며 새 Run과 공개 URL 결과는 최종 보고에서 확인 |

실제 Chrome을 Playwright CLI로 구동했습니다. 세 해상도는 1920×1080, 1366×768, 1280×720입니다.
도구의 중간 선택자 오류는 보존된 숨김 슬라이드까지 찾은 것이 원인이었습니다. 현재 layout/lab으로 제한하고 미완료 corner 및 SRAM 단계 부분만 분리해 재개했습니다. 제품 오류인 Footer 클릭 방해와 여백 침범은 실제 CSS/배치 수정 후 같은 검사로 재검증했습니다.

| Chapter | 최종 범위 | 콘텐츠 검토와 근거 |
| --- | --- | --- |
| 01 | 3–9 | width/sign extension/carry/overflow · 8-bit 전 65,536쌍 검사 |
| 02 | 10–17 | Boolean 식/진리표/반전 bubble · gate 24조합 |
| 03 | 18–24 | MUX/DEMUX/decoder 구분, priority valid, comparator 식·표 검토 |
| 04 | 25–31 | Gray 순서/wrap/don't-care, SOP/POS와 16개 입력 검사 |
| 05 | 32–39 | FA 8조합, ripple 512조합, C/V 분리, CLA 식 검토 |
| 06 | 40–46 | active-high latch/상승 에지 FF, 파형의 초기 상태와 이상 Tcq 구분 |
| 07 | 47–53 | counter/reset/shift trace와 next-state 식 검토 |
| 08 | 54–60 | Mealy edge/Moore state 출력, 1,024개 10-bit 입력열 검사 |
| 09 | 61–69 | setup max/hold min 분리, skew 부호, 경계/64개 UI corner |
| 10 | 70–76 | single-bit synchronizer의 잔여 위험, bus/pulse protocol, MTBF 전제 보존 |
| 11 | 77–83 | toy ISA/control/microsequence의 edge별 상태 및 datapath 검토 |
| 12 | 84–93 | 6T 연결·극성 보존, read/write/순서/안정성, 독립 bit yield 예제 검사 |

## Before / After

다음은 로컬 작업 폴더 전용 링크입니다. 스크린샷과 자동화 도구는 ignored `output/`에 있으며 공개 artifact에 포함되지 않습니다.

| 화면 | Before | After (최종 Footer 포함) |
| --- | --- | --- |
| Cover | [001](../output/playwright/presenter-before-1280-001.png) | [Cover](../output/playwright/presenter-final-1280-1-0.png) |
| Contents | [002](../output/playwright/presenter-before-1280-002.png) | [Contents](../output/playwright/presenter-final-1280-toc-0.png) |
| Ripple | [036](../output/playwright/presenter-before-1280-036.png) | [6/6](../output/playwright/presenter-final-1280-op-ripple-6.png) |
| Latch/FF | [043](../output/playwright/presenter-before-1280-043.png) | [4/4](../output/playwright/presenter-final-1280-op-latch-4.png) |
| Setup | [063](../output/playwright/presenter-before-1280-063.png) | [7/7](../output/playwright/presenter-final-1280-op-setup-7.png) |
| SRAM | [085](../output/playwright/presenter-before-1280-085.png) | [Read 4/4](../output/playwright/presenter-final-1280-op-sram-read-4.png) |
| Gate lab | [016](../output/playwright/presenter-before-1280-016.png) | [Gate](../output/playwright/presenter-final-1280-lab-gates-0.png) |
| Adder lab | [035](../output/playwright/presenter-before-1280-035.png) | [Adder](../output/playwright/presenter-final-1280-lab-adder-0.png) |
| Timing lab | [067](../output/playwright/presenter-before-1280-067.png) | [Timing](../output/playwright/presenter-final-1280-lab-timing-0.png) |

공개 순서를 검증한 단계별 스크린샷은 `presenter-step-{alias}-{step}.png`에 있습니다.
최종 Quiz의 문제/정답/근거는 `presenter-final-1280-quiz-ch09-{0,1,2}.png`입니다.

집계 결과: `output/presenter-validation.json`, 상세 DOM: `output/playwright/presenter-after-verified.json`.
재실행용 CLI helper: `presenter-final-audit.cjs`, `presenter-behavior.cjs`, `presenter-stages.cjs`, `presenter-navigation.cjs`, `presenter-access.cjs`.

## 다음 우선순위

1. 변경된 원고·화면 검토 및 명시 승인 후 remote main에 반영하고 Actions/Pages를 확인합니다.
2. 실제 교실의 프로젝터·브라우저에서 대비·한글 글꼴·발표 키보드를 확인합니다.
3. 추가 교육 수요가 있으면 FSM/CDC trace 강조를 검토합니다. 신규 대형 simulator나 backend는 필요하지 않습니다.
