# Logic Design Fundamentals

Digital Logic to SRAM · 강의자가 회로 동작을 단계적으로 설명하는 Slidev + Vue 3 세미나입니다.
영문 제목과 기술 용어, 한국어 설명으로 구성합니다. 각 챕터는 학습 목표·선수 지식·풀이 예제·검산을 포함합니다.

현재 검증 상태와 제한은 [implementation-status](docs/implementation-status.md)에 기록합니다.

## Run locally

Node.js 24.20.0을 권장합니다. 선택한 Slidev 53.1.0의 engine 요구로 최소 Node 22.22.0이 필요합니다.
요청한 22.12+ 범위에서 최신 Slidev 요구를 반영했습니다. 추가 backend나 외부 서비스는 없습니다.

```powershell
npm ci
npm test
npm run check:content
npm run dev
```

`package-lock.json`을 포함하며 로컬과 CI 모두 `npm ci`로 검증했습니다.
의존성 버전을 변경하지 않는 작업에서는 lockfile을 다시 생성할 필요가 없습니다.
개발 명령은 현재 Slidev 53.1.0이 지원하는 `slidev`입니다. `--host`는 지원되지 않습니다.

```powershell
npm ci
npm test
npm run check:content
npm run build
npm run check:build
npm run preview
```

기본 preview는 `http://127.0.0.1:4173/`입니다. 개발 화면의 Slidev 도구 모음에서 전체 화면과 Presenter를 사용할 수 있습니다.
←/→로 슬라이드를 이동하고, Tab/Space로 실습 버튼을 조작하세요. Timing 슬라이더는 Tab 후 화살표로 조절합니다.
설명 순서가 있는 슬라이드는 Footer의 STEP을 확인합니다. ←는 직전 공개 상태를 복원합니다.
12개 Quiz는 문제 → 정답 → 근거 순서입니다. Footer 중앙 Contents로 목차에 복귀합니다.
공개 build의 Presenter Mode에는 노트가 없습니다. 별도 로컬 메모는 Git에서 제외된 `output/presenter-notes.md`에만 보관합니다.

## Course

표지·3×4 클릭 목차와 91장의 교육 슬라이드, 총 93장입니다. 목차는 슬라이드 번호 대신 안정적인 alias를 사용합니다.
Setup 동작/수식과 SRAM Hold/Read/Write의 학습 목표를 분리해 기존 90장에서 3장을 추가했습니다.

| Chapter | Slides | Landing alias |
| --- | ---: | --- |
| 01 Number Systems & Data Representation | 7 | ch01 |
| 02 Boolean Algebra & Logic Gates | 8 | ch02 |
| 03 Combinational Circuits | 7 | ch03 |
| 04 Karnaugh Map & Logic Minimization | 7 | ch04 |
| 05 Adders & Arithmetic Circuits | 8 | ch05 |
| 06 Latches & Flip-Flops | 7 | ch06 |
| 07 Sequential Circuits | 7 | ch07 |
| 08 Finite State Machines (Moore & Mealy) | 7 | ch08 |
| 09 Timing Constraints & Static Timing Analysis | 9 | ch09 |
| 10 Metastability & Clock Domain Crossing | 7 | ch10 |
| 11 Control Unit & Microcode — Advanced / Elective | 7 | ch11 |
| 12 SRAM Memory | 10 | ch12 |

11장은 선택 심화입니다. SRAM의 필수 선수 과정이 아닙니다.
세 실습의 alias는 `lab-gates`, `lab-adder`, `lab-timing`입니다. 모두 브라우저에서 계산하며 Reset을 제공합니다.
`lib/logic.mjs`를 Vue와 Node 테스트가 공유합니다. SRAM·CDC 파형은 개념 도식이며 SPICE/실측 데이터가 아닙니다.

## Build and GitHub Pages

```powershell
npm run build -- --base /sample-repository/
npm run check:build -- /sample-repository/
npm run preview -- --base /sample-repository/
```

Preview가 표시하는 base URL로 접속하세요. 사용자 사이트 `<owner>.github.io`는 `/`, 프로젝트 사이트는 `/<repo>/`입니다.
`scripts/pages-base.mjs`가 GitHub repository 환경변수에서 base를 계산합니다. 저장소 이름은 소스에 고정하지 않습니다.
Diagram은 `import.meta.env.BASE_URL`을 사용하며 웹폰트나 이미지 CDN에 의존하지 않습니다.

저장소는 [tacona1016/lecture](https://github.com/tacona1016/lecture), 기본 브랜치는 main입니다.
이 저장소의 Pages base는 `/lecture/`이며, 사이트 주소는 https://tacona1016.github.io/lecture/ 입니다.
새 저장소에 복사할 때는 다음 순서로 배포합니다.

1. `npm ci`로 설치하고 빌드·산출물·UI 검증을 완료합니다.
2. 의도한 GitHub 저장소와 remote를 확인한 후 소스와 lockfile을 main에 업로드합니다.
3. GitHub **Settings → Pages → Build and deployment → Source: GitHub Actions**를 선택합니다.
4. `Deploy Slidev to GitHub Pages` 실행 성공과 제공된 실제 Pages URL을 확인합니다.

Workflow는 main push와 수동 실행에 반응하며 `npm ci` → 검사 → `slidev build --without-notes --base ...` → 공식 Pages actions 순서입니다.
Build job에는 contents read와 Pages metadata 조회를 위한 pages read를, deploy job에는 pages write와 id-token write를 부여합니다.
Configure Pages의 자동 활성화는 꺼 두었으므로 Pages Source 설정은 사용자가 수행해야 합니다.
공개 artifact는 `dist`만 포함합니다. Source의 speaker notes는 build에서 제외합니다.
최초 Run은 코드 빌드에 성공했지만 Pages 미설정으로 Configure Pages가 `Not Found`를 반환했습니다.
사용자가 Source를 GitHub Actions로 설정한 뒤 [Run #1의 attempt 2](https://github.com/tacona1016/lecture/actions/runs/42229136937/attempts/2)에서 Build와 Deploy 성공을 확인했습니다.
이 결과는 initial commit의 배포 결과입니다. 후속 로컬 수정의 원격 검증 여부는 implementation-status와 최종 작업 보고를 확인하세요.

## Verification

`npm test`는 24개 gate 조합, full adder 8조합, 8-bit 덧셈 65,536조합,
setup 경계/양·음 skew, hold 부호, K-map 16행, Gray 인접성,
10-bit 입력열 1,024개의 Moore/Mealy 검출과 Pages base를 확인합니다.
추가로 4-bit ripple의 512개 입력과 setup 타임라인의 64개 slider 끝값 조합을 검사합니다. 총 12개 테스트입니다.
`npm run check:content`는 실제 Slidev parser로 빈 슬라이드·frontmatter 경로를 확인하며 챕터 순서·장수·alias 고유성·목차 링크·로컬 SVG 참조도 검사합니다.
`npm run check:build -- /lecture/`는 실제 index.html의 preload·script·CSS·favicon 참조 파일과 SPA fallback이 존재하는지 검사합니다.
SVG의 `src`는 `images/gates.svg`처럼 public 기준 경로를 사용합니다. LocalDiagram이 base를 붙이며 Slidev preload도 같은 경로를 사용합니다.

로컬 production build를 Playwright CLI로 검증했습니다. `/lecture/`에서 93장 × 세 해상도(1920×1080, 1366×768, 1280×720)의
초기/최종 상태 342개를 검사했습니다. 발견된 Footer 여백 침범은 수정 후 재검사했으며 수식·SVG·Mermaid·console·404 오류는 없습니다.
목차 12개 왕복·alias 새로고침, 퀴즈/회로의 전진·후진 복원, 실습 전 조합·키보드·Reset·64개 timing corner를 확인했습니다.
전체 화면·Overview·Presenter Mode도 확인했습니다. Before/After와 상세 범위는 [presenter-review](docs/presenter-review.md)에 있습니다.
이 검증 기록은 원격 반영 전의 결과입니다. 배포 여부는 이 Commit의 [Actions Run](https://github.com/tacona1016/lecture/actions/workflows/deploy.yml)과 최종 작업 보고에서 별도로 확인하세요.

실제 브라우저 QA 절차는 [browser-qa.md](docs/browser-qa.md)에 있습니다.
소스 검사나 SVG 단독 검사와 실제 Slidev 렌더링 결과를 구분해 보고합니다.

## Sources and assets

각 챕터의 Markdown 주석에 기술 참고문헌을 기록했습니다. 그림과 toy ISA는 이 프로젝트에서 직접 작성했습니다.
외부 이미지·비공개 공정 수치·PDK·회사 회로·학생 정보는 포함하지 않습니다.
GitHub Pages 파일은 저장소 visibility와 별개로 공개될 수 있습니다.

- Harris & Harris, *Digital Design and Computer Architecture*, 2nd ed.
- Mano & Ciletti, *Digital Design*, 5th ed.
- Weste & Harris, *CMOS VLSI Design*, 4th ed.
- [Ginosar, Metastability and Synchronizers: A Tutorial](https://ran.net.technion.ac.il/files/2016/06/MetastabilitySynchronizersTutorialIEEEDT2011.pdf)
- [Harris, Memory lecture](https://pages.hmc.edu/harris/class/e158/01/lect11.pdf)
- [Slidev imports](https://sli.dev/features/importing-slides), [Link/routeAlias](https://sli.dev/builtin/components#link), [static hosting](https://sli.dev/guide/hosting)
