# Session Handoff

최종 정리일: 2026-11-08 (Asia/Seoul). 강의 기능 구현과 GitHub Pages 배포는 완료됐습니다. 공개 사이트의 실제 브라우저 UI 확인만 환경 제한으로 남아 있습니다. 새로운 기능 개발은 시작하지 않고 세션을 종료합니다.

## 프로젝트와 브랜치

- 프로젝트: Logic Design Fundamentals / Logic Design Seminar.
- 위치: `C:\lecture`, 저장소: [tacona1016/lecture](https://github.com/tacona1016/lecture), 작업·기본 브랜치: `main`.
- 정적 Slidev + Vue 3 + Markdown, SVG, Mermaid, KaTeX. Dark Navy + Cyan, 강의자 발표 중심입니다.
- 공개 주소: https://tacona1016.github.io/lecture/ , Pages base: `/lecture/`.
- 실제 확인한 환경: Node 24.20.0, npm 11.19.0, Slidev 53.1.0, Vue 3.5.22. package.json의 Node 최소 버전은 22.22.0입니다.
- 배포: `.github/workflows/deploy.yml`. main push와 workflow_dispatch, 공식 GitHub Pages Actions, `--without-notes` 정책입니다.
- 12개 챕터의 순서와 `ch01`…`ch12` alias를 보존했습니다. 총 93장(교육 91장 + Cover/Contents 2장), alias 37개입니다. Chapter 09는 9장, Chapter 12는 10장, 나머지 장수는 `npm run check:content`에서 확인합니다.

## 이번 작업의 목표와 완료 사항

이전 개발 목표는 강의자가 설명하는 순서에 맞게 회로·파형·정답을 공개하고, 발표 화면과 조작을 개선하는 것이었습니다. 이번 마감 작업은 검증된 상태를 보존하고 미반영 문서만 저장해 다음 세션에 인계하는 것입니다.

- 12개 Quiz: 문제는 처음부터 표시하고, 첫 클릭에 정답, 둘째 클릭에 해설을 공개합니다. 역방향 이동과 aria-hidden을 지원합니다.
- Adder: HA→FA 직관/블록/수식 2단계, CLA carry 식 전개 3단계, 4-bit Ripple Carry 6단계입니다. Carry와 signed overflow를 구분합니다.
- Latch/FF: transparency window, latch 추종, FF 상승 에지 sampling, 이상 Tcq와 실제 지연 구분의 4단계 파형입니다.
- Timing: Setup 7단계 시간축과 별도의 Hold min 경로 4단계입니다. `skew = capture − launch`입니다.
- SRAM: 검증된 기존 6T SVG 위 Hold 2단계, Read/Write 각 4단계 경로 강조입니다. Q=0 read에서 BL이 내려가며, Q←1 write는 BL=1/BLB=0입니다. 교육용 모델이며 SPICE 해석이 아닙니다.
- 기존 Lab 3개: gate 기호/수식/현재 truth row, FA block/carry, 실시간 setup timeline을 추가했습니다. Reset과 마우스/키보드 조작을 유지했습니다.
- Cover 축소와 본문 대비, Footer 여백을 수정했습니다. 기본 Slidev 도구막대가 Contents 클릭을 가로막던 문제는 Footer 중앙 배치로 해결했습니다.
- Source 계산 함수, 의존성/lockfile, 배포 Workflow, 기존 SRAM SVG를 보존했습니다. Backend나 새 대형 simulator를 추가하지 않았습니다.

## 주요 파일과 이번 마감 Commit의 범위

이미 배포된 기능 파일은 다시 Commit할 대상이 아닙니다.

| 역할 | 주요 파일 |
| --- | --- |
| 진입·목차·강의 | `slides.md`, `chapters/01-*.md`…`chapters/12-*.md` |
| 공통 화면 | `styles/index.css`, `global-bottom.vue`, `components/QuizReveal.vue`, `components/StageCaption.vue` |
| 설명 시각화 | `RippleCarryDemo.vue`, `LatchWaveformDemo.vue`, `SetupWalkthrough.vue`, `HoldWalkthrough.vue`, `SramOperation.vue` |
| Lab 시각화 | `LogicGateSimulator.vue`, `FullAdderSimulator.vue`, `SetupTimingSimulator.vue`, `GateSymbol.vue`, `FullAdderDiagram.vue`, `SetupTimeline.vue` (`components/`) |
| 계산·검증 | 기존 `lib/logic.mjs`, 새 `lib/presentation.mjs`, `tests/presentation.test.mjs`, `scripts/check-content.mjs`, `scripts/check-build.mjs` |
| 기록 | `docs/presenter-review.md`, `docs/browser-qa.md`, `docs/implementation-status.md` |

이번 마감에서 원격과 비교한 실제 미반영 차이는 배포 결과를 추가한 `docs/implementation-status.md`, `docs/presenter-review.md` 두 개였습니다. 여기에 새 `docs/SESSION_HANDOFF.md`를 더한 **문서 3개만** 정리 Commit 대상으로 지정했습니다. 애플리케이션 소스는 수정하지 않았습니다.

## 테스트와 빌드 결과

| 검사 | 이번 마감 결과 |
| --- | --- |
| `npm test` | PASS, 12/12 |
| `npm run check:content` | PASS, 12 chapters / 93 slides / 37 aliases |
| `npm run build -- --base /lecture/` | PASS, `--without-notes`, 4.77초 |
| `npm run check:build -- /lecture/` | PASS, index.html / SPA fallback / 17개 script·style·image 참조 |
| `git diff --check` | PASS, 문서 작성 후에도 재확인 |
| lint | 미실행: package.json에 lint script가 없습니다. 새 lint 도구를 추가하지 않았습니다. |
| `npm ci` | 이번 문서 마감에서는 미재실행. 이전 로컬/기능 CI에서 710 packages 설치 PASS. 의존성 변경 없음. |
| Playwright | 이전 기능 검증 PASS, 이번 문서 마감에서는 미재실행. 아래 범위를 보존합니다. |

이전 Playwright 검증: 1920×1080 / 1366×768 / 1280×720, 전체 93장의 초기·최종 상태 342개 촬영, 여백 수정 9개 재검사, 최종 대표 화면 45개와 마지막 신호 표기 3개 검사입니다. Quiz 12개, 설명 동작 9개, Gate 24조합, FA 8조합, Timing 64개 corner와 0 ns 경계, 음수 skew/slack, Reset/Tab/Space/마우스, 목차/alias/역방향/전체 화면/Overview/Presenter가 통과했습니다. 로컬 console/404/KaTeX/Mermaid/SVG 오류는 0입니다.

검사·이미지·도구 기록은 ignored `output/`에 있습니다. 새 checkout에는 없을 수 있습니다. 기록 유무를 확인하고, 없으면 [browser-qa.md](browser-qa.md)의 절차로 재현하세요. [presenter-review.md](presenter-review.md)의 Before/After 링크도 로컬 output 전용입니다.

## Commit, Push, Git 상태

- 기능 Commit: [`b73e882b148d65881a1f9ae1c809609f34245c43`](https://github.com/tacona1016/lecture/commit/b73e882b148d65881a1f9ae1c809609f34245c43), 기능 파일 35개, main 반영 확인 완료.
- 이전 CI 복구 Commit: `9984d36bc07aff78ef47a842981fcc8e5e7c158b`입니다. 둘을 새 변경으로 다시 반영하지 마세요.
- 이번 문서 Commit의 원고 작성 시점 SHA/Push 최종 결과는 **미확인**이며, 반영 후 최종 작업 보고에 실제 SHA를 남깁니다. [이 파일의 원격 이력](https://github.com/tacona1016/lecture/commits/main/docs/SESSION_HANDOFF.md)에서 정리 Commit을 찾을 수 있습니다. 원격 main에 이 문서와 문서 3개 변경이 존재하면 다시 Commit/Push하지 마세요.
- 문서만 변경하므로 정리 Commit은 `[skip ci]`를 사용해 기능 사이트를 재배포하지 않습니다. Workflow 자체는 변경하지 않습니다. [GitHub 공식 동작](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs)을 기준으로 합니다.
- 로컬 `.git`은 쓰기 제한으로 HEAD가 initial `1d4cf1be13912196bdc56d78e62c7385e9849797`에 남아 있습니다. 따라서 이미 원격 반영된 파일도 `M`/`??`로 표시됩니다. 원격과 비교 전에는 모두 새 변경으로 취급하지 마세요.
- 마감 시작 시 `git status`의 40개 파일 중 38개는 원격 main과 Git blob SHA가 같았습니다. 나머지는 위 배포 결과 문서 2개였습니다.
- 이 환경의 GitHub 반영은 연결된 GitHub 도구로 tree/commit을 만들고, 예상 main SHA를 지정해 **force=false**로 fast-forward합니다. 로컬 `.git` 쓰기 제한을 바꾸거나 우회하지 않습니다. 기존 기록을 reset/rebase/force-push하지 않습니다.
- 이전 `gh auth status`는 인증 실패, 직접 네트워크 조회는 차단됐습니다. 이번 마감에서 gh 인증을 다시 변경하지 않았으며 현재 CLI 인증 상태는 미확인입니다. 연결 도구로는 원격 main 읽기가 성공했습니다.

## 배포 상태와 남은 작업

- GitHub Pages 기능 배포: [Actions Run 42378565373](https://github.com/tacona1016/lecture/actions/runs/42378565373), Build `128421148091` / Deploy `128421246024` 모두 success입니다.
- Deploy 로그: `2026-11-07T13:49:45.7441569Z Reported success!`. 대상 URL은 https://tacona1016.github.io/lecture/ 입니다.
- 공개 URL의 실제 UI는 **미확인**입니다. 마지막 Playwright 접속은 `net::ERR_NETWORK_ACCESS_DENIED`, 별도 web 도구도 접근 불가였습니다. 배포 실패로 해석하거나 근거 없이 코드를 고치지 마세요.
- 알려진 미완료 기능은 없습니다. 남은 확인은 네트워크가 허용된 브라우저에서 Footer 총 93장, 목차 12개, chapter alias 직접 접속/새로고침, 퀴즈/실습 동작을 확인하는 것입니다.
- 실제 교실 프로젝터의 대비·한글 글꼴·발표 키보드 검증은 미확인입니다.
- Supabase: 프로젝트에서 사용하지 않으며 관련 코드/설정 변경과 migration 적용은 없습니다. 외부 계정·리소스 상태는 미확인입니다.
- Vercel: 이 프로젝트의 배포 대상이 아니며 관련 설정/배포 변경은 없습니다. 외부 Vercel 계정·프로젝트 상태는 미확인입니다.

## 다음 세션의 첫 작업과 재개 순서

1. 이 문서와 `AGENTS.md`를 읽고 현재 cwd/브랜치/Git 상태를 확인합니다. `CODEX_PROMPT.md`는 원래 요구사항, 현재 고도화 결과는 이 문서와 presenter-review를 함께 봅니다.
2. **원격 main과 이 문서의 파일 이력부터 조회**합니다. 일반 gh가 가능하면 아래 GET 명령을 사용하고, 차단되면 연결 GitHub 도구의 동일 API를 사용합니다. 로컬 initial HEAD만 보고 새 작업 여부를 판단하지 마세요.

   ```powershell
   git status --short
   git diff --stat
   gh api repos/tacona1016/lecture/git/ref/heads/main
   gh api 'repos/tacona1016/lecture/commits?path=docs/SESSION_HANDOFF.md&per_page=1'
   ```

3. 네트워크가 허용되면 공개 URL을 검증하고 결과를 기록합니다. 동일한 환경 차단이 반복되면 미확인으로 남깁니다. 이미 성공한 기능 Commit/CI를 반복 Push하지 마세요.
4. 로컬 재현이 필요할 때만 아래 명령을 사용합니다. 새 checkout/의존성 변경 시 `npm ci`를 먼저 실행합니다.

   ```powershell
   npm test
   npm run check:content
   npm run build -- --base /lecture/
   npm run check:build -- /lecture/
   npm run preview -- --base /lecture/ --port 4180
   ```

5. 이후 개발은 사용자가 새로 지정한 범위에서 시작합니다. 교육 슬라이드/수식/시뮬레이션을 바꾸면 `.agents/skills/slidev-seminar/SKILL.md`와 설치된 Playwright workflow를 따릅니다. 실제 Actions 실패 시 `gh-fix-ci`와 실제 로그를 사용합니다.

## 재개 시 주의 사항

- `git clean`, reset, 파일 삭제로 dirty 상태를 정리하지 마세요. 다른 변경은 보존하고 원격 tree와 파일별로 비교합니다. 로컬 Git 동기화가 필요하면 쓰기 가능한 일반 환경에서 기존 변경을 먼저 백업·비교해야 합니다.
- `output/`, `dist/`, `node_modules/`, 로컬 발표 메모와 환경 파일은 Commit하지 않습니다. 노트가 없는 공개 build의 Presenter Mode에 비공개 메모가 있다고 가정하지 마세요.
- 기본 chapter alias와 12개 순서, 기존 `lib/logic.mjs`, SRAM 소자 연결·BL/BLB 극성, skew 부호를 함부로 바꾸지 않습니다.
- 테스트 규칙 완화, `npm audit fix --force`, 위험한 major update, 새 Backend/DB/LMS/대형 simulator를 이 정리 작업의 연장으로 시작하지 않습니다.
- 문서 3개를 원격 저장하고 결과를 확인한 뒤 이 세션은 종료합니다. 추가 기능 개발은 별도 요청을 기다립니다.
