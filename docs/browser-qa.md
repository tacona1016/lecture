# Browser QA — Playwright CLI

실제 Slidev production build를 대상으로 실행합니다. SVG 단독 렌더링은 전체 슬라이드 검증을 대신하지 않습니다.
스크린샷·JSON 결과는 `output/playwright/`에 저장하며 Git에는 포함하지 않습니다.

## 준비

1. `npm ci`, `npm test`, `npm run check:content`가 통과해야 합니다.
2. `npm run build -- --base /qa-course/`를 실행합니다.
3. 별도 터미널에서 `npm run preview -- --base /qa-course/`를 실행합니다.
4. 설치한 Playwright CLI를 사용합니다. Windows에서는 `playwright-cli.cmd`가 실행 정책 충돌을 피합니다.

```powershell
playwright-cli.cmd open http://127.0.0.1:4173/qa-course/ --browser=chrome
playwright-cli.cmd resize 1920 1080
playwright-cli.cmd snapshot
```

Snapshot의 실제 ref로 Start와 각 chapter를 클릭합니다. 각 이동 후 snapshot을 갱신하세요.
각 chapter의 제목·목표·번호를 확인하고 Contents로 되돌아옵니다. 12개 모두 확인합니다.
←/→로 이전/다음 이동을 확인하며 lab 내부의 방향키가 Slidev로 전달되지 않는지 확인합니다.

## 전체 화면 검사

- 실제 슬라이드 container의 경계와 내부 텍스트·수식·표·SVG 경계를 비교합니다.
- 각 90장에 대해 clipping·겹침·한글 글꼴·수식·Mermaid를 확인합니다.
- 1920×1080과 1366×768에서 반복합니다.
- Gate diagram의 NOT bubble과 SRAM의 6T 연결·WL·BL/BLB를 확인합니다.
- 콘솔 오류 및 실패한 network response가 없어야 합니다.
- root `/` build와 prefix `/qa-course/` build를 모두 확인합니다.
- alias 직접 접속/새로고침, local SVG/CSS/JS 경로를 검사합니다.
- Presenter와 전체 화면도 기본 Slidev 기능으로 확인합니다.

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

CLI의 `run-code`는 전체 90장 스캔과 전 조합 검사를 자동화할 때 사용할 수 있습니다.
일반 클릭은 먼저 최신 snapshot을 얻고 실제 ref를 사용합니다. `@playwright/test` 의존성은 추가하지 않습니다.

## 현재 결과

실행 결과와 차단 원인, 다음 재개 명령은 [implementation-status.md](implementation-status.md)에 기록합니다.
