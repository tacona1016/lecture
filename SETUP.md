# Logic Design Seminar — 설치 안내

이 파일 모음에는 다음 세 가지가 포함되어 있습니다.

- `AGENTS.md`: Codex가 이 저장소에서 항상 준수할 공통 규칙.
- `.agents/skills/slidev-seminar/SKILL.md`: 교육자료 작성 및 기술 검증 시 사용하는 프로젝트 전용 Skill.
- `CODEX_PROMPT.md`: 최초 구축 작업을 위한 Codex 실행 프롬프트.

## 1. 파일 배치

ZIP 파일을 새 Git 저장소 **루트**에 압축 해제합니다. `AGENTS.md`는 루트에, `SKILL.md`는 `.agents/skills/slidev-seminar/`에 있어야 합니다. 기존 저장소라면 같은 이름의 파일을 덮어쓰기 전에 내용 차이를 확인합니다.

## 2. PowerShell

```powershell
cd C:\Projects\logic-design-seminar
codex
```

Codex 대화창에서 `/skills`를 입력하여 `slidev-seminar`, `playwright`, `gh-fix-ci`가 인식되는지 확인합니다. 인식되지 않으면 Codex를 재시작합니다.

## 3. Codex 입력

`CODEX_PROMPT.md`의 전문을 Codex에 입력합니다. 구현 과정 중 교육자료 수정 작업은 `$slidev-seminar`, 시각 검사 작업은 `$playwright`, GitHub Actions 오류에는 `$gh-fix-ci`를 지정하여 재요청할 수 있습니다.

## 4. 주의

GitHub Pages는 정적 파일을 공개하는 서비스입니다. 회사 내부 자료·비공개 설계 데이터·비밀값을 포함해서는 안 됩니다. 최초 실제 배포 시 GitHub 저장소의 `Settings > Pages > Build and deployment > Source`를 **GitHub Actions**로 설정해야 합니다.
