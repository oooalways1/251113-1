# Vercel 배포 가이드

이 가이드는 구구단 산성비 게임을 Vercel에 배포하는 방법을 설명합니다.

## 1. 사전 준비사항

✅ **완료해야 할 항목:**
- [ ] GitHub 저장소에 코드가 푸시되어 있어야 합니다
- [ ] Supabase 프로젝트가 생성되어 있어야 합니다
- [ ] Supabase 환경 변수 값이 준비되어 있어야 합니다

## 2. Vercel 계정 생성 및 프로젝트 연결

### 2.1 Vercel 계정 생성
1. [Vercel](https://vercel.com/)에 접속
2. **Sign Up** 클릭
3. **Continue with GitHub** 선택하여 GitHub 계정으로 로그인

### 2.2 프로젝트 가져오기
1. Vercel 대시보드에서 **Add New...** → **Project** 클릭
2. GitHub 저장소 목록에서 `qo1598/251106` 선택
3. **Import** 클릭

## 3. 프로젝트 설정

### 3.1 Framework Preset
- **Framework Preset**: `Vite` 선택 (자동 감지됨)

### 3.2 Root Directory
- **Root Directory**: `./` (기본값 유지)

### 3.3 Build and Output Settings
- **Build Command**: `npm run build` (기본값)
- **Output Directory**: `dist` (기본값)
- **Install Command**: `npm install` (기본값)

## 4. 환경 변수 설정 (⚠️ 필수)

### 4.1 환경 변수 추가
1. 프로젝트 설정 화면에서 **Environment Variables** 섹션으로 스크롤
2. 다음 환경 변수를 추가:

| Name | Value | Environment |
|------|-------|-------------|
| `VITE_SUPABASE_URL` | `https://your-project.supabase.co` | Production, Preview, Development |
| `VITE_SUPABASE_ANON_KEY` | `your-anon-key-here` | Production, Preview, Development |

### 4.2 Supabase 값 확인 방법
1. Supabase 대시보드 접속
2. **Settings** → **API** 이동
3. 다음 정보 복사:
   - **Project URL** → `VITE_SUPABASE_URL`에 입력
   - **anon public** key → `VITE_SUPABASE_ANON_KEY`에 입력

### 4.3 환경 변수 적용
- 각 환경 변수 추가 후 **Save** 클릭
- **Production**, **Preview**, **Development** 모두 체크

## 5. 배포 실행

### 5.1 첫 배포
1. 환경 변수 설정 완료 후 **Deploy** 버튼 클릭
2. 빌드 진행 상황 확인 (약 1-2분 소요)
3. 배포 완료 후 **Visit** 버튼으로 사이트 접속

### 5.2 자동 배포 설정
- ✅ **기본적으로 활성화됨**: GitHub에 푸시할 때마다 자동 배포
- `main` 브랜치에 푸시 → Production 배포
- 다른 브랜치에 푸시 → Preview 배포

## 6. 배포 후 확인사항

### 6.1 기본 동작 확인
- [ ] 사이트가 정상적으로 로드되는지 확인
- [ ] 회원가입이 작동하는지 확인
- [ ] 로그인이 작동하는지 확인
- [ ] 게임이 정상적으로 실행되는지 확인

### 6.2 Supabase 연결 확인
- [ ] 브라우저 개발자 도구(F12) → Console 탭 확인
- [ ] Supabase 관련 에러가 없는지 확인
- [ ] 네트워크 탭에서 Supabase API 호출이 성공하는지 확인

### 6.3 멀티플레이어 기능 확인
- [ ] 방 생성이 작동하는지 확인
- [ ] 방 참여가 작동하는지 확인
- [ ] 실시간 동기화가 작동하는지 확인

## 7. 커스텀 도메인 설정 (선택사항)

### 7.1 도메인 추가
1. Vercel 프로젝트 설정 → **Domains** 탭
2. 원하는 도메인 입력
3. DNS 설정 안내에 따라 도메인 제공업체에서 설정

### 7.2 SSL 인증서
- Vercel이 자동으로 SSL 인증서를 발급하고 관리합니다

## 8. 문제 해결

### 8.1 빌드 실패
**증상**: 배포 시 빌드 에러 발생

**해결 방법:**
1. Vercel 대시보드 → **Deployments** → 실패한 배포 클릭
2. **Build Logs** 탭에서 에러 메시지 확인
3. 일반적인 원인:
   - 환경 변수가 설정되지 않음 → 환경 변수 확인
   - TypeScript 에러 → 로컬에서 `npm run build` 실행하여 확인
   - 의존성 문제 → `package.json` 확인

### 8.2 환경 변수 관련 에러
**증상**: "Supabase 환경 변수가 설정되지 않았습니다" 에러

**해결 방법:**
1. Vercel 프로젝트 설정 → **Environment Variables** 확인
2. `VITE_SUPABASE_URL`과 `VITE_SUPABASE_ANON_KEY`가 올바르게 설정되었는지 확인
3. 모든 환경(Production, Preview, Development)에 설정되었는지 확인
4. 환경 변수 수정 후 **Redeploy** 클릭

### 8.3 CORS 에러
**증상**: Supabase API 호출 시 CORS 에러 발생

**해결 방법:**
1. Supabase 대시보드 → **Settings** → **API**
2. **CORS** 섹션에서 Vercel 배포 URL 추가
   - 예: `https://your-project.vercel.app`
3. **Save** 클릭

### 8.4 Realtime 연결 실패
**증상**: 멀티플레이어 실시간 동기화가 작동하지 않음

**해결 방법:**
1. Supabase 대시보드 → **Database** → **Replication**
2. 다음 테이블의 Realtime이 활성화되어 있는지 확인:
   - `rooms`
   - `room_participants`
   - `game_sessions`
3. 비활성화되어 있으면 토글을 **ON**으로 변경

## 9. 배포 URL 확인

배포 완료 후 Vercel 대시보드에서 배포 URL을 확인할 수 있습니다:
- 형식: `https://your-project-name.vercel.app`
- 또는 커스텀 도메인: `https://your-domain.com`

## 10. 지속적인 배포

### 10.1 자동 배포
- `main` 브랜치에 푸시하면 자동으로 Production 배포
- Pull Request 생성 시 Preview 배포

### 10.2 수동 재배포
1. Vercel 대시보드 → **Deployments**
2. 원하는 배포 우클릭 → **Redeploy**

## 11. 체크리스트

### 배포 전 확인사항:
- [ ] GitHub에 코드가 푸시되어 있음
- [ ] Supabase 프로젝트가 생성되어 있음
- [ ] Supabase 환경 변수 값이 준비되어 있음
- [ ] 로컬에서 `npm run build`가 성공적으로 실행됨
- [ ] `.env` 파일이 `.gitignore`에 포함되어 있음 (민감 정보 보호)

### 배포 후 확인사항:
- [ ] 사이트가 정상적으로 로드됨
- [ ] 회원가입/로그인이 작동함
- [ ] 게임이 정상적으로 실행됨
- [ ] 멀티플레이어 기능이 작동함
- [ ] 브라우저 콘솔에 에러가 없음

## 12. 추가 리소스

- [Vercel 공식 문서](https://vercel.com/docs)
- [Vite 배포 가이드](https://vitejs.dev/guide/static-deploy.html)
- [Supabase 배포 가이드](https://supabase.com/docs/guides/hosting/overview)

---

**배포 완료 후**: 배포 URL을 공유하여 다른 사용자들이 접속할 수 있도록 하세요!
