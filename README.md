# Logic Design Fundamentals

Digital Logic to SRAM · Slidev + Vue 3 기반 한국어 교육용 프레젠테이션입니다.
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

**최초 설치 제한:** 이 구현 환경은 npm registry 접근이 EACCES로 차단되어 lockfile을 생성하지 못했습니다.
네트워크가 허용된 환경에서 `npm install`로 실제 `package-lock.json`을 생성하고,
그 후 `npm ci`부터 검증하세요. Lockfile 생성·검증 전에는 배포 준비 완료 상태가 아닙니다.
Workflow는 재현성을 위해 `npm ci`를 사용하며 lockfile이 반드시 함께 올라가야 합니다.

```powershell
npm install
npm ci
npm test
npm run check:content
npm run build
npm run preview
```

기본 preview는 `http://127.0.0.1:4173/`입니다. 개발 화면의 Slidev 도구 모음에서 전체 화면과 Presenter를 사용할 수 있습니다.
←/→로 슬라이드를 이동하고, Tab/Space로 실습 버튼을 조작하세요. Timing 슬라이더는 Tab 후 화살표로 조절합니다.

## Course

표지·3×4 클릭 목차와 88장의 교육 슬라이드, 총 90장입니다. 목차는 슬라이드 번호 대신 안정적인 alias를 사용합니다.

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
| 09 Timing Constraints & Static Timing Analysis | 8 | ch09 |
| 10 Metastability & Clock Domain Crossing | 7 | ch10 |
| 11 Control Unit & Microcode — Advanced / Elective | 7 | ch11 |
| 12 SRAM Memory | 8 | ch12 |

11장은 선택 심화입니다. SRAM의 필수 선수 과정이 아닙니다.
세 실습의 alias는 `lab-gates`, `lab-adder`, `lab-timing`입니다. 모두 브라우저에서 계산하며 Reset을 제공합니다.
`lib/logic.mjs`를 Vue와 Node 테스트가 공유합니다. SRAM·CDC 파형은 개념 도식이며 SPICE/실측 데이터가 아닙니다.

## Build and GitHub Pages

```powershell
npm run build -- --base /sample-repository/
npm run preview -- --base /sample-repository/
```

Preview가 표시하는 base URL로 접속하세요. 사용자 사이트 `<owner>.github.io`는 `/`, 프로젝트 사이트는 `/<repo>/`입니다.
`scripts/pages-base.mjs`가 GitHub repository 환경변수에서 base를 계산합니다. 저장소 이름은 소스에 고정하지 않습니다.
Diagram은 `import.meta.env.BASE_URL`을 사용하며 웹폰트나 이미지 CDN에 의존하지 않습니다.

원격 저장소와 연결되지 않은 초기 폴더입니다. 이 작업에서는 Git 초기화·repository 생성·Push·공개 설정 변경·Pages 활성화를 수행하지 않았습니다.
사용자가 확인할 순서는 다음과 같습니다.

1. 위 최초 설치 명령으로 lockfile을 만들고 빌드·UI 검증을 완료합니다.
2. 의도한 GitHub 저장소와 remote를 확인한 후 소스와 lockfile을 main에 업로드합니다.
3. GitHub **Settings → Pages → Build and deployment → Source: GitHub Actions**를 선택합니다.
4. `Deploy Slidev to GitHub Pages` 실행 성공과 제공된 실제 Pages URL을 확인합니다.

Workflow는 main push와 수동 실행에 반응하며 `npm ci` → 검사 → `slidev build --without-notes --base ...` → 공식 Pages actions 순서입니다.
Build job에는 contents read와 Pages metadata 조회를 위한 pages read를, deploy job에는 pages write와 id-token write를 부여합니다.
Configure Pages의 자동 활성화는 꺼 두었으므로 Pages Source 설정은 사용자가 수행해야 합니다.
공개 artifact는 `dist`만 포함합니다. Source의 speaker notes는 build에서 제외합니다.
GitHub Actions가 실제 실패하면 `$gh-fix-ci`로 해당 run 로그를 조사하세요. 현재 원격 실행 결과는 없습니다.

## Verification

`npm test`는 24개 gate 조합, full adder 8조합, 8-bit 덧셈 65,536조합,
setup 경계/양·음 skew, hold 부호, K-map 16행, Gray 인접성,
10-bit 입력열 1,024개의 Moore/Mealy 검출과 Pages base를 확인합니다.
`npm run check:content`는 챕터 순서·장수·alias 고유성·목차 링크·로컬 SVG 참조를 검사합니다.

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
