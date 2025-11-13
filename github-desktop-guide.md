# GitHub Desktop으로 배포하기 (GUI 방식)

명령어 없이 클릭만으로 배포할 수 있습니다!

## 1. GitHub Desktop 설치

1. https://desktop.github.com/ 방문
2. "Download for Windows" 클릭
3. 설치 후 GitHub 계정으로 로그인 (qo1598@dge.go.kr)

## 2. 저장소 연결

1. GitHub Desktop 실행
2. **File** → **Add Local Repository**
3. **Choose...** 버튼 클릭 → `C:\test` 폴더 선택
4. "create a repository" 클릭

## 3. 설정

1. Name: 251106
2. Local Path: C:\test
3. **Initialize this repository with a README** 체크 해제
4. Git Ignore: None
5. License: None
6. **Create Repository** 클릭

## 4. Commit

1. 왼쪽 하단에 모든 파일이 체크되어 있는지 확인
2. Summary에 입력: "Initial commit: 구구단 산성비 게임"
3. **Commit to main** 버튼 클릭

## 5. Publish

1. 상단의 **Publish repository** 클릭
2. Name: 251106
3. Description: 초등학교 2학년을 위한 구구단 학습 게임
4. **Keep this code private** 체크 해제 (Public으로)
5. **Publish repository** 클릭

## 6. GitHub Pages 활성화

1. https://github.com/qo1598/251106 접속
2. **Settings** → **Pages**
3. Source: **GitHub Actions** 선택

## 7. 완료!

배포 주소: https://qo1598.github.io/251106/

---

## 업데이트 방법

코드 수정 후:
1. GitHub Desktop에서 변경사항 확인
2. Summary 입력
3. **Commit to main** 클릭
4. 상단의 **Push origin** 클릭

자동으로 다시 배포됩니다!

