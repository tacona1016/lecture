# Browser QA — Playwright CLI

실제 Slidev production build를 대상으로 실행합니다. SVG 단독 렌더링은 전체 슬라이드 검증을 대신하지 않습니다.
스크린샷·JSON 결과는 `output/playwright/`에 저장하며 Git에는 포함하지 않습니다.

## 준비

1. `npm ci`, `npm test`, `npm run check:content`가 통과해야 합니다.
2. `npm run build -- --base /lecture/`를 실행합니다.
3. 별도 터미널에서 `npm run preview -- --base /lecture/`를 실행합니다.
4. 설치한 Playwright CLI를 사용합니다. Windows에서는 `playwright-cli.cmd`가 실행 정책 충돌을 피합니다.

```powershell
playwright-cli.cmd open http://127.0.0.1:4173/lecture/ --browser=chrome
playwright-cli.cmd resize 1920 1080
playwright-cli.cmd snapshot
```

Snapshot의 실제 ref로 Start와 각 chapter를 클릭합니다. 각 이동 후 snapshot을 갱신하세요.
각 chapter의 제목·목표·번호를 확인하고 Contents로 되돌아옵니다. 12개 모두 확인합니다.
←/→로 이전/다음 이동을 확인하며 lab 내부의 방향키가 Slidev로 전달되지 않는지 확인합니다.

## 전체 화면 검사

- 실제 슬라이드 container의 경계와 내부 텍스트·수식·표·SVG 경계를 비교합니다.
- 각 93장에 대해 clipping·겹침·한글 글꼴·수식·Mermaid를 확인합니다.
- 1920×1080, 1366×768, 1280×720에서 반복합니다.
- `?clicks=0`과 마지막 공개 상태를 모두 확인합니다. Footer 위 8 screen px까지 안전 여백을 확인합니다.
- Quiz는 질문만 → 정답 → 근거 → 정답 → 질문만으로 이동하며 opacity와 aria-hidden, 위치를 확인합니다.
- 회로 동작은 각 단계에서 SVG 신호·값을 확인하고, 다음 슬라이드에서 ←로 돌아와 최종 상태가 복원되는지 확인합니다.
- Gate diagram의 NOT bubble과 SRAM의 6T 연결·WL·BL/BLB를 확인합니다.
- 콘솔 오류 및 실패한 network response가 없어야 합니다.
- root `/` build와 prefix `/qa-course/` build를 모두 확인합니다.
- alias 직접 접속/새로고침, local SVG/CSS/JS 경로를 검사합니다.
- Presenter와 전체 화면·Overview도 기본 Slidev 기능으로 확인합니다. 공개 build의 Notes는 비어 있어야 합니다.
- Footer 중앙 Contents를 실제 클릭합니다. 왼쪽 아래 기본 도구막대가 클릭을 가로막지 않아야 합니다.

```powershell
playwright-cli.cmd screenshot --filename output/playwright/contents-1920.png
playwright-cli.cmd resize 1366 768
playwright-cli.cmd screenshot --filename output/playwright/contents-1366.png
playwright-cli.cmd console error
playwright-cli.cmd network
```

## 실습 검증

Gate: 각 gate에서 00, 01, 10, 11을 토글하고 Y와 표시된 진리표를 대조합니다(24조합).
Adder: A/B/Cin 8조합에서 `2*Cout+Sum=A+B+Cin`을 대조합니다.
Timing: 기본값 slack=+0.5 ns, skew=+0.5에서 +1.0 ns, skew=−0.5에서 0.0 ns PASS,
skew=−0.6에서 −0.1 ns VIOLATION을 확인합니다. 입력 slider의 step은 0.1 ns입니다.
각 실습 Reset·Tab·Space·Arrow 키 조작을 확인합니다.

Timing은 6개 slider의 min/max 64조합에서 수치·SVG 좌표·라벨 경계도 검사합니다. 음수 capture/required를 포함해야 합니다.
Gate의 논리 기호·active truth row·수식·Y, Adder의 block·Sum/Cout도 같은 입력에서 일치해야 합니다.
CLI의 `run-code`는 전체 93장 스캔과 전 조합 검사를 자동화할 때 사용할 수 있습니다.
Slidev는 방문한 슬라이드를 DOM에 보존할 수 있으므로 locator는 현재 보이는 layout 또는 정확한 lab region에 제한합니다.
일반 클릭은 먼저 최신 snapshot을 얻고 실제 ref를 사용합니다. `@playwright/test` 의존성은 추가하지 않습니다.

## 현재 결과

실행 결과와 차단 원인, 다음 재개 명령은 [implementation-status.md](implementation-status.md)에 기록합니다.
2026-11-07 presenter 고도화의 검증 범위·스크린샷·수정 이력은 [presenter-review.md](presenter-review.md)에 기록합니다.

## Warm Technical migration 검증

현재 테마는 Warm Ivory / Deep Teal / Noto Sans KR Variable입니다. [전체 결과와 Before/After](WARM_TECHNICAL_MIGRATION.md)를 참조하세요.

- 전체 93장의 모든 click 단계와 역방향을 세 해상도에서 확인합니다. 원본 장수나 기술 내용을 줄여 통과시키지 않습니다.
- document.fonts.ready 후 촬영합니다. CSS family 선언만으로 로딩 성공이라 판단하지 않습니다. Chrome CDP `CSS.getPlatformFontsForNode`로 제목/한글/표/버튼/일반 SVG/Mermaid의 실제 custom Noto와 수식의 KaTeX를 확인합니다. Wrapper 대신 실제 text leaf를 검사합니다.
- Fontsource 124개 Unicode subsets 중 사용한 범위만 요청되어야 합니다. 현재 Cover는 9개를 사용했고, 전체 강의의 한글 393자를 glyph probe로 확인했습니다.
- CSS의 non-data URL과 @import, 실제 network requests를 확인합니다. SVG data URL 안의 xmlns http 문자열은 외부 요청과 구분합니다. 폰트·KaTeX·기존 SVG preload는 모두 `/lecture/` 아래에서 성공해야 합니다.
- 일반 텍스트 4.5:1, 큰 텍스트 3:1, 중요한 경로 3:1 이상을 검사합니다. 상태는 색상과 숫자/라벨을 함께 확인합니다. Shadow DOM 안의 Mermaid node/edge label도 검사합니다. stateLabelColor의 자동 파생값이 배경색이 되지 않도록 주의합니다.
- LocalDiagram과 SRAM은 저장소 SVG를 inline으로 렌더링합니다. SVG text font 공유, instance ID/href 연결, style scope, path/좌표/트랜지스터 극성 보존을 확인합니다.
- font file dependency는 `vendor/fontsource-variable-noto-sans-kr`와 함께 보존합니다. 새 checkout에서 node_modules만 복사하거나, vendor 없이 lockfile만 반영하지 않습니다. OFL 전문은 dist/licenses에 있어야 합니다.
- 자동화 helper와 JSON/PNG는 ignored output/playwright 및 output에 있습니다. 새 checkout에서는 없는 것이 정상일 수 있습니다. 실제 테스트 결과를 재실행 여부와 구분해 기록합니다.
