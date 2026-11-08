# Warm Technical Theme Migration

2026-11-08 · **로컬 검증·main 반영·GitHub Actions Build/Deploy 완료**. 12개 챕터와 93장, 계산·입력·라우팅·공개 순서를 유지했습니다.

사용자의 배포 승인 후 [Commit 9f0522d](https://github.com/tacona1016/lecture/commit/9f0522d437c4562bdb1c942b970f2592c08d7fbc)를 main에 반영했습니다. [Actions Run 42460558247](https://github.com/tacona1016/lecture/actions/runs/42460558247)의 Build와 Deploy가 모두 success입니다. 사이트는 https://tacona1016.github.io/lecture/ 입니다. 공개 URL은 실행 환경의 ERR_NETWORK_ACCESS_DENIED로 브라우저 UI 미검증이며, 배포 성공과 구분합니다.

## A. 변경 요약

- Warm Ivory `#F7F5EF` 배경, White panel, Dark Slate `#26343C` 본문, Deep Teal `#086F69` 강조입니다.
- Amber `#B45217`는 활성 경로/선에, Dark Green `#1C7346` / Dark Red `#AF3434`는 PASS/VIOLATION에 사용합니다. HIGH/LOW와 0/1, PASS/VIOLATION 라벨을 유지합니다.
- CSS 변수는 bg/surface/surface-alt/text/muted/accent/border/signal-active/signal-high/signal-low/success/danger로 정리했습니다. 기존 navy/panel/cyan/line 변수는 사용하지 않습니다.
- Noto Sans KR Variable, Cover 52px, Chapter 40px, Slide Title 36px, 기본 본문 21px입니다. Table 18px, Caption 16px, 기존 Lab/Quiz/신호 표시의 크기는 화면에 맞게 유지했습니다. 980px / 16:9 canvas는 그대로입니다.
- 한글 fallback을 제공하며, 신호·숫자·코드의 Consolas와 KaTeX 수학 폰트는 보존했습니다.

## B. 조사와 수정 파일

| 조사 대상 | 기존 상태 / 수정 |
| --- | --- |
| 공통 CSS 변수 | Navy/Cyan 변수를 의미 기반 Warm 팔레트로 교체했습니다. |
| 컴포넌트 CSS 직접 색상 | 대부분 공통 styles에 있었습니다. 상태별 fill/stroke/배경도 같은 토큰을 사용합니다. |
| Vue inline style | 별도 하드코딩된 Vue 색상 style은 없었습니다. 계산/입력/상태 함수는 수정하지 않았습니다. |
| Inline SVG | 공통 CSS의 fill/stroke를 교체했습니다. SRAM 바탕 그림의 어두운 테마용 opacity를 제거했습니다. |
| 외부 SVG | 이미지 7개와 favicon의 fill/stroke/font-family를 갱신했습니다. 모든 좌표/경로/노드/극성/라벨은 비교 검사에서 동일했습니다. |
| Mermaid | light/base + Warm themeVariables, Noto로 label 측정 후 그리도록 설정했습니다. |
| KaTeX | 수식 색상만 Teal로 지정했습니다. 실제 glyph는 KaTeX_Math를 유지합니다. |
| Slidev | colorSchema: light, fonts.provider: none, Noto sans, 기존 layout/route/animation/발표 도구를 유지합니다. |

| 파일 | 이유 |
| --- | --- |
| `styles/index.css`, `styles/fonts.css` | 팔레트, 계층·크기·상태·focus·폰트 CSS |
| `slides.md` | light schema와 Noto sans 설정만 변경 |
| `setup/mermaid.ts` | Warm Mermaid 팔레트와 정확한 font metrics |
| `components/LocalDiagram.vue`, `lib/diagram-artwork.mjs` | 저장소 SVG를 inline으로 표시해 문서의 로컬 웹폰트를 공유합니다. SVG 내부 style과 ID는 instance별로 한정합니다. |
| `components/SramOperation.vue` | 동일한 6T 그림을 inline으로 재사용, Amber 범례. 기존 Q/QB/WL 계산과 step 조건은 그대로입니다. |
| `public/images/*.svg`, `public/favicon.svg` | 밝은 배경에 맞는 색상과 Noto 일반 텍스트 |
| `scripts/draw-waveforms.py` | 재생성해도 Warm 색상/폰트를 유지하도록 변경 |
| `vendor/fontsource-variable-noto-sans-kr/` | 공식 Fontsource 5.3.1 패키지 전체와 라이선스/출처 |
| `package.json`, `package-lock.json` | 폰트 file dependency 추가, 기존 753개 dependency entry는 변경 없음 |
| `public/licenses/noto-sans-kr-OFL.txt` | 배포 artifact에 OFL 전문 포함 |
| `AGENTS.md`, `.agents/skills/slidev-seminar/SKILL.md` | Warm Technical 지침, 대비·폰트·3해상도 검증. Skill은 보호 경로여서 사용자가 제공된 변경안을 복사했고 실제 반영을 확인했습니다. |
| `README.md`, 상태·인수인계·브라우저 QA 문서 | 설치/검증/재개 정보 갱신 |

### Fontsource 설치와 출처

Registry 자동 다운로드는 EACCES로 실패했습니다. 연결된 GitHub 도구의 읽기 기능으로 공식 [Fontsource package](https://github.com/fontsource/font-files/tree/5a72889057f592bb0659629e38337359f94d53b2/fonts/variable/noto-sans-kr)를 확보했습니다.
135개 원본 파일(124 WOFF2)의 각 Git blob SHA를 검증했고 글꼴은 수정하지 않았습니다. `file:vendor/fontsource-variable-noto-sans-kr` 의존성은 cache/CDN 없이 폰트를 재현합니다.
일반 npm 설치와 같은 package import를 사용하며 `npm ci`가 성공했습니다. 기존 npm 의존성의 버전·integrity는 보존했습니다.

폰트는 [Fontsource의 variable-font 방식](https://fontsource.org/docs/getting-started/variable)에 따라 Unicode ranges, weights 100–900, font-display: swap을 사용합니다. SVG는 `<img>`의 별도 글꼴 환경 대신 같은 문서의 inline SVG로 표시해 실제 Noto를 공유합니다. 신뢰한 저장소 그림만 포함하며 임의 HTML/사용자 입력을 렌더링하지 않습니다.

## C. Before / After

이 링크는 로컬 `output/playwright/` 파일을 가리킵니다. Git/공개 artifact에 스크린샷을 추가하지 않았습니다. 모든 화면은 세 해상도로 보존했으며 아래는 1280×720입니다.

| 대표 화면 | Before | After |
| --- | --- | --- |
| Cover | [Before](../output/playwright/warm-before-1280-1-0.png) | [After](../output/playwright/warm-after-1280-001-s0.png) |
| Contents | [Before](../output/playwright/warm-before-1280-toc-0.png) | [After](../output/playwright/warm-after-1280-002-s0.png) |
| Boolean Algebra | [Before](../output/playwright/warm-before-1280-12-0.png) | [After](../output/playwright/warm-after-1280-012-s0.png) |
| Karnaugh Map | [Before](../output/playwright/warm-before-1280-27-0.png) | [After](../output/playwright/warm-after-1280-027-s0.png) |
| Adder | [Before](../output/playwright/warm-before-1280-op-ripple-6.png) | [After](../output/playwright/warm-after-1280-036-s6.png) |
| Latch/FF | [Before](../output/playwright/warm-before-1280-op-latch-4.png) | [After](../output/playwright/warm-after-1280-043-s4.png) |
| Setup Timing | [Before](../output/playwright/warm-before-1280-op-setup-7.png) | [After](../output/playwright/warm-after-1280-063-s7.png) |
| SRAM Read | [Before](../output/playwright/warm-before-1280-op-sram-read-4.png) | [After](../output/playwright/warm-after-1280-087-s4.png) |
| Quiz 초기 | [Before](../output/playwright/warm-before-1280-quiz-ch09-0.png) | [After](../output/playwright/warm-after-1280-069-s0.png) |
| Quiz 해설 | [Before](../output/playwright/warm-before-1280-quiz-ch09-2.png) | [After](../output/playwright/warm-after-1280-069-s2.png) |
| Gate Lab | [Before](../output/playwright/warm-before-1280-lab-gates-0.png) | [After](../output/playwright/warm-after-1280-016-s0.png) |
| Full Adder Lab | [Before](../output/playwright/warm-before-1280-lab-adder-0.png) | [After](../output/playwright/warm-after-1280-035-s0.png) |
| Setup Lab | [Before](../output/playwright/warm-before-1280-lab-timing-0.png) | [After](../output/playwright/warm-after-1280-068-s0.png) |

회색·Teal·Amber는 기능상 역할에 맞게 분리했고 기존 회로·표·수식을 재배치하거나 설명을 삭제하지 않았습니다. 93장 contact sheet 4개와 대표 원본을 시각적으로 검토했습니다.
SVG 경계 문제는 slide 43의 sampling 주석 2건(1920×1080, 단계 3/4)이었습니다. 주석만 17→16px로 수정하고 해당 장 15개 상태를 재검사했습니다.
Shadow DOM 내부의 실제 색상까지 확인하자 Mealy slide 56의 A/B/C가 흰색으로 표시되는 문제도 발견했습니다. 설치된 Mermaid가 stateLabelColor를 stateBkg에서 파생했기 때문입니다. stateLabelColor를 Dark Slate로 명시해 고쳤고, 모든 Mermaid 장을 세 해상도에서 30개 화면 재검사했습니다. 별도 Shadow DOM font/contrast 검사 24개도 통과했습니다. 남은 clipping/overlap/contrast 오류는 없습니다.

## D. 최종 검증

| 항목 | 결과 |
| --- | --- |
| npm ci | PASS · 711 packages · 공식 폰트 file dependency 포함 |
| npm test | PASS · 기존 12개 테스트 유지 |
| check:content | PASS · 12 chapters / 93 slides / 37 aliases |
| Build | PASS · `/lecture/` · `--without-notes` |
| Lint | script 미정의 · 미실행 |
| check:build | PASS · index.html / SPA fallback / script·style·image 17개 참조 |
| 전체 Playwright | PASS · 1920×1080 / 1366×768 / 1280×720 · 모든 공개 단계 459 frames + 수정 영향 범위 45개 재검사 |
| Font loading | PASS · 실제 custom Noto: 제목 93개, 한글 393자 전부, 표·Mermaid·버튼·SVG 일반 텍스트. OS fallback 없이 한글 393 glyph 확인. |
| Math fonts | PASS · 실제 KaTeX_Math glyph 확인, 수학 font-family 보존 |
| Font performance | Cover는 124개 중 9개 subset만 요청, swap 사용. Font provider/CDN 외부 요청 0. |
| Font assets/Base | PASS · 124 Noto WOFF2와 CSS URL 183개가 `/lecture/`에서 존재, OFL 전문 배포 포함 |
| Contrast | PASS · 실제 HTML/SVG 텍스트의 기준 미달 0. 본문 11.75:1, Muted 5.94:1, Teal 5.52:1 (Ivory 기준). Amber는 그래픽으로 사용하며 주요 배경에서 최소 4.27:1. |
| Mermaid Shadow DOM | PASS · 8개 장 × 세 해상도 · 모든 실제 text leaf의 Noto와 최소 10.84:1 대비 확인 |
| Rendering | Console/404/실패 요청/외부 요청/KaTeX/Mermaid/SVG 오류·중복 ID 0 |
| Quiz | 12개 × 세 해상도, 정답/해설/역방향/위치 유지 PASS |
| Labs | Gate 24조합, FA 8조합을 각 해상도에서 검사, Timing 64 corner와 ±skew/0 ns/Reset PASS |
| Presentation | 설명 동작 9개 전진·후진·재진입·새로고침, Start/목차12/alias/방향키/Footer/전체 화면/Overview/Presenter PASS |
| Accessibility | Tab/Space/마우스 slider/Reset/입력 중 이동 방지/초점 복귀 PASS |
| Preservation | 31개 보호 파일 SHA 동일(12개 chapter 포함), SVG 8개 모든 geometry/label/polarity 동일, 기존 의존성 entry 753개 동일 |
| Final review | 기준 대비 변경 파일 21개, 새 source/document 5개와 vendor 136개 확인. SRAM은 SVG embedding/색상 범례 외 전체 source가 동일합니다. 문서 링크·git diff --check 통과, 배포 산출물에 source/내부 문서/비공개 notes marker 없음. |
| Git / CI | 기존 작업 보존, 162개 파일 SHA 검증 후 force 없이 main 반영. CI 설치/12 tests/93장/37 alias/build 4.51초/산출물 검사/Deploy 모두 PASS |

중간 Font probe에서 KaTeX wrapper는 직접 glyph가 없어 빈 배열을 반환했습니다. 실제 glyph leaf를 검사해 KaTeX_Math가 유지됨을 확인했습니다. CSS 내부 SVG의 xmlns 문자열도 외부 요청이 아니므로 URL/@import 검사와 실제 network 기록을 기준으로 검증했습니다. 검증 규칙이나 기존 계산 테스트를 삭제하지 않았습니다.

결과 파일: 배포 전 로컬 검증은 `output/warm-validation.json`, `output/playwright/warm-audit-verified.json`, `output/warm-font-assets.json`, `output/warm-preservation.json`, `output/warm-svg-preservation.json`, `output/warm-final-review.json`입니다. 실제 배포 결과는 `output/warm-theme-deployment.json`, `output/warm-ci-build.log`, `output/warm-ci-deploy.log`입니다.
실제 CLI helper는 `output/playwright/warm-{audit,behavior,stages,navigation,access,font-coverage}.cjs`에 있습니다. 새 checkout에는 ignored output이 없을 수 있으므로 [browser-qa.md](browser-qa.md)를 참고하세요.

## E. 남은 항목과 다음 단계

- 확인된 로컬 기능·시각 오류는 없습니다. 실제 교실 프로젝터의 대비·글꼴·장비 검증은 아직 수행하지 않았습니다.
- Build의 PLUGIN_TIMINGS는 기존 플러그인 실행 시간 안내입니다. PowerShell 로그의 NativeCommandError 표기는 stderr 안내를 감싼 것이며, build는 5.47초에 성공했습니다. 의존성이나 빌드 구조는 변경하지 않았습니다.
- GitHub Pages의 **Warm 버전**은 이번 migration의 새 Run에서 배포 성공을 확인했습니다. Deploy job 128668846300의 실제 success 시각은 2026-11-08T07:53:29.3522614Z입니다.
- 남은 검증은 네트워크가 허용된 일반 브라우저에서 공개 사이트 UI/폰트/실습을 확인하는 것입니다. Playwright의 ERR_NETWORK_ACCESS_DENIED와 web 도구 접근 실패로 이 환경에서는 수행하지 못했습니다.
- deploy-pages@v4는 Node 20 대상 action을 runner가 Node 24로 실행했다는 비차단 경고를 남겼습니다. 배포는 성공했으며 이번 테마 작업에서 기존 workflow를 변경하지 않았습니다.
- `.git`은 기존 쓰기 제한 때문에 initial HEAD에 남아 있습니다. 로컬 dirty 전체를 테마 변경으로 오해해 stage/reset/Push하지 마세요. 기준 snapshot은 `output/warm-theme-baseline/manifest.json`입니다.
