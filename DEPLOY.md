# 깃허브 배포 가이드 🚀

이 문서는 구구단 산성비 게임을 GitHub Pages에 배포하는 방법을 설명합니다.

## 방법 1: GitHub Actions를 통한 자동 배포 (권장) ⭐

### 1단계: GitHub 저장소 생성

1. GitHub(https://github.com)에 로그인
2. 우측 상단 `+` 버튼 클릭 → `New repository` 선택
3. Repository 정보 입력:
   - Repository name: `multiplication-rain`
   - Description: 초등학교 2학년을 위한 구구단 학습 게임
   - Public 선택
4. `Create repository` 클릭

### 2단계: 로컬 Git 초기화 및 푸시

프로젝트 폴더(`c:\test`)에서 다음 명령어 실행:

```bash
# Git 초기화
git init

# 모든 파일 추가
git add .

# 첫 커밋
git commit -m "Initial commit: 구구단 산성비 게임"

# 원격 저장소 연결 (YOUR_USERNAME을 본인 GitHub 아이디로 변경)
git remote add origin https://github.com/YOUR_USERNAME/multiplication-rain.git

# main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3단계: GitHub Pages 설정

1. GitHub 저장소 페이지에서 `Settings` 탭 클릭
2. 왼쪽 메뉴에서 `Pages` 선택
3. **Source** 섹션에서:
   - Source: `GitHub Actions` 선택
4. 자동으로 배포가 시작됩니다!

### 4단계: 배포 확인

1. `Actions` 탭에서 배포 진행 상황 확인
2. 배포 완료 후 다음 주소로 접속:
   ```
   https://YOUR_USERNAME.github.io/multiplication-rain/
   ```

### 자동 배포 작동 방식

- `main` 브랜치에 코드를 푸시할 때마다 자동으로 빌드 및 배포됩니다
- `.github/workflows/deploy.yml` 파일이 배포 프로세스를 관리합니다

---

## 방법 2: 수동 배포 (gh-pages 패키지 사용)

### 1단계: Node.js 설치 확인

```bash
node --version
npm --version
```

### 2단계: 의존성 설치

```bash
npm install
```

### 3단계: GitHub 저장소 생성 및 연결

위의 "방법 1"의 1-2단계와 동일하게 진행합니다.

### 4단계: 배포 실행

```bash
npm run deploy
```

이 명령어는:
1. 프로젝트를 빌드합니다 (`npm run build`)
2. `dist` 폴더를 `gh-pages` 브랜치에 배포합니다

### 5단계: GitHub Pages 설정

1. GitHub 저장소 → `Settings` → `Pages`
2. **Source** 섹션에서:
   - Source: `Deploy from a branch`
   - Branch: `gh-pages` / `/ (root)` 선택
3. `Save` 클릭

### 6단계: 배포 확인

몇 분 후 다음 주소로 접속:
```
https://YOUR_USERNAME.github.io/multiplication-rain/
```

---

## 저장소 이름 변경 시 설정 수정

만약 저장소 이름을 `multiplication-rain`이 아닌 다른 이름으로 생성했다면:

### `vite.config.ts` 파일 수정:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/저장소이름/',  // 여기를 변경
})
```

예: 저장소 이름이 `math-game`이라면 → `base: '/math-game/',`

---

## 배포 후 업데이트 방법

### GitHub Actions 사용 시:

```bash
# 코드 수정 후
git add .
git commit -m "업데이트 내용 설명"
git push
# 자동으로 배포됩니다!
```

### 수동 배포 사용 시:

```bash
# 코드 수정 후
npm run deploy
```

---

## 문제 해결

### 1. 페이지가 비어있거나 404 오류

**원인**: `base` 경로가 잘못 설정됨

**해결**:
- `vite.config.ts`의 `base` 값이 저장소 이름과 일치하는지 확인
- 저장소 이름: `multiplication-rain` → `base: '/multiplication-rain/'`

### 2. CSS나 이미지가 로드되지 않음

**원인**: 정적 자산 경로 문제

**해결**:
- 브라우저 콘솔(F12)에서 오류 확인
- `base` 경로 재확인

### 3. Actions 배포가 실패함

**원인**: GitHub Pages 권한 설정 문제

**해결**:
1. Settings → Actions → General
2. "Workflow permissions" 섹션에서:
   - `Read and write permissions` 선택
3. Settings → Pages
4. Source를 `GitHub Actions`로 설정

### 4. Git이 설치되어 있지 않음

**해결**:
1. Git 다운로드: https://git-scm.com/download/win
2. 설치 후 PowerShell 재시작
3. `git --version`으로 확인

---

## 유용한 명령어

```bash
# 로컬에서 빌드 테스트
npm run build
npm run preview

# Git 상태 확인
git status

# 변경사항 확인
git diff

# 커밋 히스토리 확인
git log --oneline

# 원격 저장소 확인
git remote -v
```

---

## 추가 정보

### GitHub Pages 제한사항
- 저장소 크기: 1GB 이하
- 월 대역폭: 100GB
- 시간당 빌드: 10회

### 커스텀 도메인 설정
GitHub Pages는 커스텀 도메인도 지원합니다:
1. Settings → Pages → Custom domain
2. 도메인 입력 및 DNS 설정

---

**문제가 발생하면 GitHub Actions 탭에서 로그를 확인하세요!** 📝

