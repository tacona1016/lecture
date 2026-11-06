# Implementation status

## 현재 체크포인트 — CI 복구 및 실제 브라우저 검증

2026-11-06 · 로컬 구현/검증 완료. 기존 원격 Run의 Build/Deploy 복구 완료. 사용자가 검증된 16개 파일의 원격 Commit·반영·재배포를 승인했습니다. 아래는 원격 반영 직전 검증 체크포인트이며, 후속 Run 결과는 배포 Workflow에서 확인합니다.

### 완료된 작업

- 저장소: `https://github.com/tacona1016/lecture.git`, 기본/작업 브랜치 main. 작업 시작 시 변경사항 없음.
- Node 24.20.0 / npm 11.19.0 / Slidev 53.1.0 / Vue 3.5.22. CI와 로컬 버전 일치.
- 실제 실패 Run: [42229136937 attempt 1](https://github.com/tacona1016/lecture/actions/runs/42229136937/attempts/1), build job의 Configure Pages 단계.
- 오류: `Get Pages site failed ... Error: Not Found` / `HttpError: Not Found`.
- npm ci, 논리/콘텐츠 검사, static build는 최초 CI에서도 성공했습니다. 설치·lockfile·Node 호환성 문제는 실패 원인이 아니었습니다.
- 사용자가 Settings → Pages → Source를 GitHub Actions로 설정했다고 확인했습니다. 실패 job을 한 번 재실행했습니다.
- [attempt 2](https://github.com/tacona1016/lecture/actions/runs/42229136937/attempts/2)에서 build/deploy 모두 success, artifact `github-pages` 업로드 성공.
- Deploy 로그: `Reported success!`, `Evaluated environment url: https://tacona1016.github.io/lecture/`.
- 실제 배포된 commit: `1d4cf1be13912196bdc56d78e62c7385e9849797` (initial). 아래 로컬 수정은 이 배포에 아직 포함되지 않았습니다.

### 로컬 수정

- LocalDiagram의 src를 `images/...`로 통일해 실제 img와 Slidev preload가 같은 base 경로를 쓰도록 수정했습니다. 실제 7건의 preload 404를 재현한 뒤 제거했습니다.
- 로컬 favicon과 지원되는 `lang: ko` 설정을 적용해 외부 favicon 요청과 잘못된 HTML 언어 설정을 수정했습니다.
- MUX/DEMUX는 좌우 배치, Mealy는 LR 방향으로 표시하고 latch/SRAM 파형 두 개의 높이를 제한했습니다. 실제 잘림이 있던 slide 20/43/56/86을 수정했습니다.
- `check:build`를 추가해 index.html의 script/CSS/preload/favicon 참조와 404.html을 검증하고 CI build 직후 실행합니다. 수정 전 dist에서 누락된 `/lecture/cover.svg`를 잡고, 수정 후 18개 참조가 통과하는 것을 확인했습니다.
- 챕터 순서·88장 교육 내용·3개 simulator 계산·의존성 버전·package-lock.json은 보존했습니다.
- `Unknown argument: host`는 재현했으나 현재 dev script는 이미 `slidev`이므로 추가 변경하지 않았습니다.

### 검증 결과

| Check | Result |
| --- | --- |
| `npm ci` | PASS, 710 packages. 오프라인 캐시 설치와 일반 명령 모두 성공 |
| `npm test` | PASS, 10 tests. Gate 24 / full adder 8 / 8-bit add 65,536 / timing / K-map / Gray / FSM / yield / Pages base |
| `npm run check:content` | PASS, 12 chapters, 88 teaching slides, 90 total, 16 aliases |
| `npm run build` | PASS, root build |
| `npm run build -- --base /lecture/` | PASS, CI와 같은 notes 제외 build |
| `npm run check:build` + prefix 검사 | PASS, 각 18개 실제 asset 참조 및 SPA fallback |
| Playwright: 90장 × 2 해상도 | PASS, 180 screenshots. clipping 0, math errors 0, broken images 0, Mermaid errors 0, console errors 0, 실패 응답 0 |
| Playwright: navigation, labs | PASS, root 및 prefix에서 각각 12개 TOC 왕복, 좌우 이동, gate 24조합, adder 8조합, timing 경계/양·음 skew, slider 6개 키보드, Reset |
| `git diff --check` | PASS |
| lockfile diff | 변경 없음 |
| 기존 GitHub Actions build/deploy | PASS, initial commit의 attempt 2 |
| 후속 로컬 수정 GitHub Actions | 이 체크포인트에서는 미검증, 승인 후 원격 반영/추적 진행 |
| 로컬 Commit | 차단, `.git/index.lock: Permission denied` (.git 쓰기 제한) |
| 공개 사이트 실제 browser 접속 | 차단, `net::ERR_NETWORK_ACCESS_DENIED` |

산출물: `output/playwright/scan-final-report.txt`, `interactions-final-report.txt`, `interactions-root-report.txt`, `repair-1920-001.png`부터 `repair-1366-090.png`까지.
Playwright CLI는 캐시/registry 경로를 output 내부로 설정하고 격리된 headless Chrome으로 실행했습니다. 환경에서 Chrome의 내부 sandbox와 GPU process 실행이 실패하여 테스트 세션에만 `chromiumSandbox: false`, `--disable-gpu`, `--in-process-gpu`를 사용했습니다. 사이트 코드나 OS 보안 설정은 변경하지 않았습니다.

### 중단 시 재개 지점

완료된 설치·논리 테스트·180장 화면 검사를 반복할 필요는 없습니다. 먼저 Git diff와 위 결과 파일이 유지되는지 확인하세요.
현재 dist가 root build이면 최종 산출물은 아래 명령으로 `/lecture/`에 맞춥니다.

```powershell
npm run build -- --base /lecture/
npm run check:build -- /lecture/
git diff --check
git status --short
```

최종 dist도 `/lecture/`로 복원하고 산출물 검사를 통과했습니다. 위 빌드는 dist가 바뀌지 않았다면 반복하지 않아도 됩니다.

이번 수정 16개 파일만 stage/Commit하려 했으나 `.git/index.lock: Permission denied`로 중단됐습니다. index와 로컬 HEAD는 변경하지 못했습니다.
이 환경의 .git 쓰기 제한을 변경하거나 우회하지 마세요. 사용자는 일반 터미널에서 Commit할 수 있으며, 원격 반영을 승인한 경우에는 연결된 GitHub 도구로 같은 수정안을 Commit할 수 있습니다.
사용자가 이번 16개 파일의 원격 main 반영을 승인했습니다. 승인은 이 수정안에 한정됩니다.
승인된 경우 대상 `tacona1016/lecture`의 main HEAD를 다시 확인하고 수정 Commit을 반영한 뒤 새 Actions Run의 build/deploy를 추적합니다.
원격 shell network가 차단되어 gh 인증/조회는 실패했지만 연결된 GitHub 도구로 로그 조회와 기존 Run 재실행은 성공했습니다.
Pages settings API는 연결 도구에서 지원하지 않아 설정 변경은 사용자가 직접 수행했습니다.

## 최초 구현 기록 — 아래 차단/미완료 표시는 당시 상태입니다

2026-11-06 · 콘텐츠/구현 코드 작성 및 의존성 없는 검증 완료. **설치·빌드·실제 Slidev UI 검증은 차단 상태입니다. 배포 준비 완료로 간주하지 마세요.**

- 입력: AGENTS.md, CODEX_PROMPT.md, slidev-seminar 및 Playwright 스킬 전체 확인.
- 기존 상태: Git 저장소가 아니며 기존 애플리케이션/lockfile이 없습니다. 원격 작업 없음.
- 환경: Node 24.20.0, npm 11.19.0, Playwright CLI 0.1.23.
- 기본 구조/테마/3개 실습/순수 계산 함수, 목차, 공식 Pages workflow와 README 작성 완료.
- 제한: npm registry 네트워크 EACCES. 기본 Playwright 캐시 폴더 EPERM. 캐시 경로 조정 후에도 browser session 시작이 실패합니다.

| Chapters | Content | Checks |
| --- | --- | --- |
| 01–04 | 7 / 8 / 7 / 7장 작성 | carry/overflow 전수, gate 24조합, K-map 16행 자동 통과 |
| 05–08 | 8 / 7 / 7 / 7장 작성 | Full adder 8행, FSM 1,024개 입력열 자동 통과; counter/shift 수동 검산 |
| 09–12 | 8 / 7 / 7 / 8장 작성 | setup 경계/양·음 skew/hold 부호, Gray 인접성, SRAM yield 자동 통과 |

체크포인트 1: 01–04 완료. 진법/overflow, 4:1 MUX, K-map 16개 행 검산 완료.

체크포인트 2: 05–08 완료. Mealy는 에지 전, Moore는 에지 후 출력으로 trace 관찰 시점을 명시했습니다.

체크포인트 3: 12개 챕터, 교육 슬라이드 88장 작성 완료(표지/목차 포함 90장 예정).

체크포인트 4: 목차·3개 실습·7개 SVG·테마·Node preview·Pages base 계산·GitHub Pages workflow 작성 완료.

## 확인한 결과

| Command / check | Result |
| --- | --- |
| `npm test` | PASS: 10 tests, 0 failures |
| Gate | 6 gates × 4 inputs = 24조합 |
| Full adder | 8조합, 정수 합과 검산 |
| 8-bit addition | 65,536조합, unsigned carry와 signed overflow 각각 확인 |
| Timing | 양/음 skew, 0 ns PASS, −0.1 ns VIOLATION, 소수 경계와 hold 부호 |
| FSM | 모든 10-bit 입력열 1,024개에서 매 bit의 101 suffix와 Moore/Mealy 비교 |
| `npm run check:content` | PASS: 12개 파일 순서, 88개 본문/90개 총 slide, 16개 alias 고유성, 목차 목적지, SVG 참조 |
| SVG XML parse | PASS: 7개 SVG. 6T는 교차 CMOS inverter 4T + WL access NMOS 2T로 작성 |
| `node --check` | PASS: lib/logic.mjs, scripts/preview.mjs, scripts/pages-base.mjs, scripts/check-content.mjs |
| `npm install` | FAIL: registry.npmjs.org 접근 EACCES |
| Offline lock generation | FAIL: ENOTCACHED, Slidev 캐시 없음 |
| `npm ci` | FAIL: 설치 실패로 package-lock.json이 없음 |
| `npm run build` | FAIL: 의존성 설치가 없어 slidev executable 없음 |
| Playwright CLI open | FAIL: 초기 EPERM, 경로 조정 후 Session closed. Edge 로그에 GPU process exit 및 GPU unusable 기록. Chrome GPU 옵션 변경 후에도 세션이 완료되지 않아 중단 |

콘텐츠 검사에서 `Design & Check a Sequence` 제목을 인식하지 못하던 검산 검사식을 수정한 후 통과했습니다.
이 검사는 Markdown 구조 검사이며, 실제로 TOC를 클릭하거나 Vue/KaTeX/Mermaid를 렌더링한 결과가 아닙니다.

## 미검증 사항

- Vue SFC/Slidev 파서·의존성 호환성 및 실제 빌드.
- 목차 클릭, alias 직접 접속/새로고침, 키보드 이동, Presenter/전체 화면.
- 실제 UI의 gate/adder 전 조합, timing 경계와 Reset/키보드 조작.
- 1920×1080 / 1366×768 전체 90장 clipping·겹침·KaTeX·Mermaid·console/network.
- root 및 GitHub Pages prefix의 production asset 경로와 preview 서버 동작.
- GitHub Actions 실제 실행 및 공개 배포. 현재 Git 저장소/remote가 없어 run 로그가 없습니다. 따라서 gh-fix-ci 적용 조건도 발생하지 않았습니다.

## 정확한 재개 지점

네트워크가 허용되고 브라우저를 실행할 수 있는 환경에서 C:\lecture를 엽니다.
원래 파일 AGENTS.md, CODEX_PROMPT.md, .agents/skills/slidev-seminar/SKILL.md는 보존했습니다.
공식 scaffold 다운로드도 차단되어 공식 디렉터리/문서에 맞춰 소스를 직접 구성했습니다.
실제 생성하지 못한 lockfile이나 screenshot, dist를 통과 산출물로 꾸미지 않았습니다.

```powershell
cd C:\lecture
npm install
npm ci
npm test
npm run check:content
npm run build
npm run preview
```

1. package-lock.json 생성 후 의존성/Slidev 컴파일 오류가 있으면 먼저 수정합니다.
2. docs/browser-qa.md를 따라 root build의 실제 90장을 두 해상도에서 확인합니다.
3. preview를 종료한 뒤 `npm run build -- --base /qa-course/`, `npm run preview -- --base /qa-course/`를 실행합니다.
4. prefix 아래 링크·SVG·CSS·JS와 모든 alias를 확인하고 3개 실습 UI를 검사합니다.
5. `output/playwright/`에 screenshots와 console/network 결과를 남기고 이 문서와 README의 최초 설치 제한 문구를 갱신합니다.
6. 사용자가 의도한 저장소와 remote를 정한 후 lockfile 포함 업로드 및 Pages Source 설정을 수행할 수 있습니다. 자동으로 Push하지 마세요.

선택한 Slidev 53.1.0은 Node ≥22.22.0을 요구하므로 package engine을 이에 맞췄습니다. 실제 Node 24.20.0 환경과 workflow의 Node 버전을 일치시켰습니다.

## 보존/원격 작업

Git 초기화·commit·push·repository 생성·visibility 변경·Pages 활성화 모두 수행하지 않았습니다.
Workflow는 npm ci, tests, notes 제외 build와 공식 configure/upload/deploy Pages actions를 사용합니다.
Build는 contents/pages read, deploy는 pages write/id-token write만 사용하며 Configure Pages의 enablement는 false입니다.
Lockfile과 로컬 빌드·UI 검증이 완료되기 전에는 현재 workflow를 배포 검증 완료로 보고하지 마세요.
