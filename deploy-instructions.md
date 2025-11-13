# 🚀 GitHub 배포 가이드 (qo1598/251106)

이 문서는 구구단 산성비 게임을 https://github.com/qo1598/251106.git 저장소에 배포하는 방법입니다.

## ⚠️ 현재 상태

- ✅ Vite 설정 완료 (base: '/251106/')
- ✅ GitHub Actions 워크플로우 준비 완료
- ⚠️ Git 설치 필요
- ⚠️ Node.js 설치 필요

---

## 📥 1단계: Git 설치

Git이 설치되어 있지 않습니다. 다음 단계를 따라 설치하세요:

1. **Git 다운로드**: https://git-scm.com/download/win
2. **설치 파일 실행** (기본 설정으로 설치)
3. **PowerShell 재시작**
4. 설치 확인:
   ```powershell
   git --version
   ```

---

## 📥 2단계: Node.js 설치 (선택사항)

수동 배포를 원하시면 Node.js도 설치하세요:

1. **Node.js 다운로드**: https://nodejs.org/
2. **LTS 버전 설치** (왼쪽 버튼)
3. 설치 확인:
   ```powershell
   node --version
   npm --version
   ```

---

## 🚀 3단계: GitHub에 코드 푸시

### PowerShell에서 실행할 명령어:

```powershell
# 1. 프로젝트 폴더로 이동
cd c:\test

# 2. Git 초기화
git init

# 3. Git 사용자 설정
git config user.email "qo1598@dge.go.kr"
git config user.name "qo1598"

# 4. 모든 파일 추가
git add .

# 5. 첫 커밋
git commit -m "Initial commit: 구구단 산성비 게임"

# 6. 원격 저장소 연결
git remote add origin https://github.com/qo1598/251106.git

# 7. main 브랜치로 푸시
git branch -M main
git push -u origin main
```

### ⚠️ GitHub 인증

푸시할 때 GitHub 로그인이 필요합니다:

- **사용자명**: GitHub 사용자명 (qo1598)
- **비밀번호**: Personal Access Token 사용 (아래 참조)

#### Personal Access Token 생성:

1. GitHub 로그인 → Settings → Developer settings
2. Personal access tokens → Tokens (classic)
3. Generate new token (classic)
4. 권한 선택: `repo` 체크
5. 생성된 토큰을 복사 (비밀번호 대신 사용)

---

## 🌐 4단계: GitHub Pages 활성화

1. https://github.com/qo1598/251106 접속
2. **Settings** 탭 클릭
3. 왼쪽 메뉴에서 **Pages** 선택
4. **Source** 설정:
   - `GitHub Actions` 선택
5. 자동으로 배포 시작!

---

## ✅ 5단계: 배포 확인

몇 분 후 다음 주소에서 게임을 플레이할 수 있습니다:

### 🎮 https://qo1598.github.io/251106/

Actions 탭에서 배포 진행 상황을 확인할 수 있습니다.

---

## 🔄 업데이트 방법

코드 수정 후 다시 배포하려면:

```powershell
cd c:\test
git add .
git commit -m "업데이트 내용 설명"
git push
```

자동으로 다시 배포됩니다!

---

## 📋 빠른 복사용 명령어 (Git 설치 후)

```powershell
cd c:\test
git init
git config user.email "qo1598@dge.go.kr"
git config user.name "qo1598"
git add .
git commit -m "Initial commit: 구구단 산성비 게임"
git remote add origin https://github.com/qo1598/251106.git
git branch -M main
git push -u origin main
```

---

## ❓ 문제 해결

### 문제 1: "git is not recognized"
→ Git 설치 후 PowerShell 재시작

### 문제 2: 푸시 시 인증 실패
→ Personal Access Token 사용 (위의 가이드 참조)

### 문제 3: 페이지가 404 오류
→ GitHub Pages 설정에서 Source를 "GitHub Actions"로 변경

### 문제 4: 페이지가 비어있음
→ 정상입니다. vite.config.ts에 base: '/251106/' 설정 완료

---

## 📞 추가 도움

배포 중 문제가 발생하면:
1. GitHub Actions 탭에서 로그 확인
2. Settings → Pages에서 설정 재확인
3. 에러 메시지 복사하여 질문

---

**최종 배포 주소**: https://qo1598.github.io/251106/

즐거운 코딩 되세요! 🎉

