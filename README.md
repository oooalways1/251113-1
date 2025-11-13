# 구구단 산성비 게임 🌧️

초등학교 2학년 학생들을 위한 재미있는 곱셈구구 학습 게임입니다!

## 게임 소개

떨어지는 물방울에 적힌 곱셈 문제를 빠르게 풀어보세요! 연속으로 맞추면 보너스 점수를 획득할 수 있습니다.

### 주요 기능

- 🎯 **3단계 난이도**: 쉬움, 보통, 어려움
- 🎨 **커스텀 모드**: 원하는 단수를 직접 선택
- ❤️ **생명 시스템**: 3개의 하트로 긴장감 있는 게임
- ⭐ **등급 시스템**: 점수에 따라 1~5개의 별 획득
- 🔥 **콤보 보너스**: 연속 정답 시 보너스 점수
- 💾 **최고 점수 저장**: 로컬 스토리지에 자동 저장

## 기술 스택

- **React 18** - UI 프레임워크
- **TypeScript** - 타입 안정성
- **Vite** - 빠른 개발 환경
- **Canvas API** - 물방울 애니메이션

## 설치 및 실행

### 필수 요구사항

- Node.js 16.0 이상
- npm 또는 yarn

### 설치 방법

1. 저장소 클론 또는 다운로드

2. 의존성 설치:
```bash
npm install
```

3. 개발 서버 실행:
```bash
npm run dev
```

4. 브라우저에서 열기:
```
http://localhost:5173
```

### 빌드

프로덕션 빌드 생성:
```bash
npm run build
```

빌드 결과물 미리보기:
```bash
npm run preview
```

### 배포

GitHub Pages에 배포:
```bash
npm run deploy
```

자세한 배포 방법은 [DEPLOY.md](DEPLOY.md) 문서를 참고하세요.

## 게임 방법

1. **메인 화면**에서 '시작하기' 버튼 클릭
2. **난이도 선택**:
   - 쉬움: 2, 3, 5단 (느린 속도)
   - 보통: 2~5단 (보통 속도)
   - 어려움: 2~9단 (빠른 속도)
   - 커스텀: 원하는 단수 선택
3. **게임 플레이**:
   - 화면 상단에서 물방울이 떨어집니다
   - 각 물방울에는 곱셈 문제가 적혀있습니다
   - 하단의 숫자 버튼을 클릭하여 정답 입력
   - 키보드 숫자 키로도 입력 가능
4. **점수 획득**:
   - 정답: 기본 10점
   - 연속 정답: 5콤보(+50점), 10콤보(+100점), 20콤보(+200점)
   - 빠른 답변: 상단 30% 영역에서 맞추면 +5점
5. **게임 오버**:
   - 오답 또는 물방울이 바닥에 닿으면 생명 1개 감소
   - 생명이 0이 되면 게임 종료

## 프로젝트 구조

```
multiplication-rain/
├── src/
│   ├── components/          # React 컴포넌트
│   │   ├── MainScreen.tsx        # 메인 화면
│   │   ├── DifficultyScreen.tsx  # 난이도 선택
│   │   ├── GameScreen.tsx        # 게임 화면
│   │   ├── GameCanvas.tsx        # 캔버스 렌더링
│   │   └── GameOverScreen.tsx    # 게임 오버 화면
│   ├── hooks/              # 커스텀 Hooks
│   │   ├── useGame.ts           # 게임 상태 관리
│   │   └── useDroplets.ts       # 물방울 관리
│   ├── utils/              # 유틸리티 함수
│   │   ├── gameLogic.ts         # 게임 로직
│   │   └── storage.ts           # 로컬 스토리지
│   ├── types/              # TypeScript 타입
│   │   └── index.ts
│   ├── constants/          # 상수 정의
│   │   └── index.ts
│   ├── App.tsx             # 메인 App 컴포넌트
│   ├── App.css             # 스타일
│   └── main.tsx            # 엔트리 포인트
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 개발 가이드

### 난이도 추가하기

`src/constants/index.ts`에서 `DIFFICULTY_CONFIGS`를 수정:

```typescript
export const DIFFICULTY_CONFIGS = {
  // ... 기존 난이도
  veryHard: {
    name: '매우 어려움',
    description: '2~9단 | 매우 빠른 속도',
    tables: [2, 3, 4, 5, 6, 7, 8, 9],
    speed: 3,
    maxDroplets: 5,
    spawnInterval: 1500,
  },
};
```

### 점수 시스템 수정

`src/constants/index.ts`에서 `GAME_CONFIG` 수정:

```typescript
export const GAME_CONFIG = {
  BASE_SCORE: 20,  // 기본 점수 변경
  COMBO_BONUS: {
    3: 30,   // 3콤보 보너스
    5: 50,
    10: 100,
  },
  // ...
};
```

## 브라우저 호환성

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)

## 향후 개발 계획

- [ ] 사운드 효과 및 배경음악
- [ ] 특수 아이템 (폭탄, 시간 느리기 등)
- [ ] 캐릭터 선택 기능
- [ ] 일일 챌린지 모드
- [ ] 멀티플레이어 모드
- [ ] 학습 통계 대시보드
- [ ] 리더보드 (온라인 순위)
- [ ] 학부모 모니터링 기능

## 배포

이 프로젝트는 GitHub Pages를 통해 배포할 수 있습니다.

자세한 배포 방법은 [DEPLOY.md](DEPLOY.md) 문서를 참고하세요.

## 라이선스

MIT License

## 기여

버그 리포트나 기능 제안은 이슈로 등록해주세요!

---

**즐겁게 공부하세요!** 📚✨

