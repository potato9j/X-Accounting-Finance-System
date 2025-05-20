# 회계 정보 시스템 (Accounting Information System)
## WAY2 - React.js + Next.js + TaulwindCSS + Vercel or Netlify

<br>

## ✅ 프로젝트 예상 기간 : 25.05.20 ~ 25.06.27

## ✅ 목표 요약 
  - 📌사용자 입력 : 계정과목, 증감여부(+/-), 금액
  - 📌자동 분개 생성
  - 📌 분개를 바탕으로 시산표 및 재무제표 생성
  - 📌📌 이 기능을 웹 또는 안드로이드 앱으로 구현

<br>

## ✅ WAY2-A. 기술 스택 요약

### FRONT (사용자 인터페이스)
| 기술 | 선택안 | 
| :---: | :---: | 
React.js | -
Next.js | - 
Tailwind CSS | -
Vercel <br> Betlify | - 

<br>

### BACK (선택사항)
| 기술 | 선택안 |
| :---: | :---: |
Firebase | 로그인, 실시간DB, 클라우드 저장
Node.js + Express | 서버 API 필요시 사용

<br>

### 배포 플랫폼 
| 플랫폼 | 특징 |
| :---: | :---: | 
Vercel | NExt.js 최적화 / Github 1대1 배포
Betlify | React 정적 사이트 최적화

<br>

## ✅ 사용자가 접속하면 이런 화면을 볼 수 있게 (초기 모델)
```scss
▶ [계정과목 선택]      ▼
▶ [증감 여부 선택]     (+/-)
▶ [금액 입력]          ₩100,000
▶ [자동 분개 결과 보기]
▶ [시산표 생성 버튼]
▶ [재무제표 보기]
```

<br>

## ✅ 구성 구조 기초 모델 (React 기준)
```css
📁 src/
├── components/
│   ├── JournalEntryForm.tsx      ← 사용자 입력 폼
│   ├── JournalEntryList.tsx      ← 분개 결과 출력
│   ├── TrialBalance.tsx          ← 시산표 생성 컴포넌트
│   └── FinancialStatements.tsx   ← 재무제표 출력
├── models/
│   ├── AccountEntry.ts
│   └── JournalEntry.ts
├── App.tsx                        ← 앱 전체 뷰
└── index.tsx
```

<br>

## ✅ 개발 단계

| 단계  | 설명                           |
| --- | ---------------------------- |
| 1단계 | React + Vite로 프로젝트 생성        |
| 2단계 | 계정과목, 증감, 금액 입력 폼 UI 완성      |
| 3단계 | 자동 분개 로직 구현                  |
| 4단계 | 시산표 생성, 재무제표 계산 로직 추가        |
| 5단계 | Vercel에 배포해서 링크로 접근 가능하게 만들기 |

<br>

### 기초모델 시나리오
* 사용자 A가 브라우저에서 아래처럼 입력 : 
    - 계정과목 : 현금, 자본금
    - 증감 : + / +
    - 금액 : 100,000
  - 분개 자동 실행
```css
[분개]
차변: 현금 100,000
대변: 자본금 100,000

[시산표]
현금: 100,000 (차)
자본금: 100,000 (대)
```