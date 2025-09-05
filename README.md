
---

# 🛍️ AiwearFit — AI 쇼핑몰 자동화 플랫폼

> **AI + API 기반 자동화**로 상세페이지 제작, 고객 응대, 매출 리포팅, 쇼핑몰 업로드까지 한 번에.
> **역할:** PM & Full-stack (React/Node/Supabase) · AI/LLM 설계 · 외부 API 통합

---

## ✨ 핵심 가치 제안 (Why AiwearFit?)

* **상세페이지 제작 시간 90%+ 단축**: GPT 프롬프트 + 템플릿 렌더링
* **이미지·피팅 자동화**: Leonardo/IDM-VTON으로 모델·의상 합성
* **운영 자동화**: 챗봇 응대, 정책/리뷰/FAQ 자동 작성
* **D2C/오픈마켓 연동**: Cafe24 API 업로드 파이프라인

---

## 🔧 기술 스택

* **Frontend**: React (Vite), TypeScript, TailwindCSS
* **Backend**: Node.js, Express.js
* **DB & Auth**: Supabase (PostgreSQL, Storage, Auth)
* **AI/LLM**: OpenAI GPT (설명/리뷰/정책/FAQ), Leonardo AI(이미지), **IDM-VTON**(의상 피팅)
* **Commerce API**: Cafe24 API
* **Deploy/DevOps**: Vercel(프론트), Render/Fly.io 등(백엔드), GitHub Actions

---

## 🧩 주요 기능

1. **상세페이지 자동 생성**

   * 업로드한 상품 이미지 + 모델 합성 → 4컷/다각도 생성
   * GPT 기반 상품 설명/스토리/스펙 표 자동 생성
2. **AI 챗봇 & 응답 추천**

   * 고객 감정 분석(옵션) → 답변 톤/템플릿 자동 추천
3. **정책·FAQ·리뷰 자동화**

   * 배송/교환/환불 정책 초안, FAQ, 리뷰 문구 자동 생성
4. **승인 & 배포 플로우**

   * 운영자 승인 → 템플릿 렌더링 → 이미지/PDF/PNG Export
5. **쇼핑몰 연동**

   * **Cafe24 API**로 상품 등록/수정 업로드 파이프라인
6. **대시보드(경량)**

   * 생성 이력, 업로드 상태, 간단 매출/리뷰 집계(확장 포인트)

---

## 🗂️ 폴더 구조

```
aiwearfit/
├─ client/                # React (Vite) 프론트엔드
│  ├─ src/
│  │  ├─ components/      # TemplateModern, ImageFocus 등 템플릿/컴포넌트
│  │  ├─ pages/           # PromptCreate, PromptEditor, Dashboard
│  │  ├─ lib/             # api 클라이언트, hooks, utils
│  │  └─ styles/
│  └─ index.html
├─ server/                # Express 백엔드
│  ├─ routes/
│  │  ├─ ai/
│  │  │  ├─ generate-description.js
│  │  │  ├─ generate-reviews.js
│  │  │  └─ generate-policy.js
│  │  ├─ images/
│  │  │  └─ vton-idm.js   # IDM-VTON 연동
│  │  └─ commerce/
│  │     └─ cafe24-sync.js
│  ├─ services/           # supabase, openai, leonardo, cafe24 clients
│  ├─ utils/
│  └─ index.js
├─ README.md
└─ .gitignore
```

---

## 🚀 빠른 시작 (Local)

### 1) 환경 변수

루트에 `.env`(서버), `client/.env`(프론트)를 준비합니다.

**server/.env**

```bash
OPENAI_API_KEY=...
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
LEONARDO_API_KEY=...
IDM_VTON_API_URL=https://...
CAFE24_CLIENT_ID=...
CAFE24_CLIENT_SECRET=...
CAFE24_MALL_ID=...
CAFE24_REDIRECT_URI=...
```

**client/.env**

```bash
VITE_SUPABASE_URL=...
VITE_SUPABASE_ANON_KEY=...
VITE_API_BASE=http://localhost:8080
```

### 2) 설치 & 실행

```bash
# root
cd server && npm i && npm run dev
# 새 터미널
cd client && npm i && npm run dev
```

* 프론트: `http://localhost:5173` (Vite)
* 백엔드: `http://localhost:8080` (Express)

---

## 🔌 대표 API (요약)

```http
POST /api/ai/description
- body: { title, features[], tone, language }
- res: { html, plain }

POST /api/ai/reviews
- body: { productTitle, productDesc, count }
- res: { items: Review[] }

POST /api/ai/policy
- body: { brand, shipping, exchange, refund, tone, language }
- res: { sections: {...} }

POST /api/images/vton
- body: { garmentImageUrl, modelImageUrl, style }
- res: { resultImageUrl }

POST /api/commerce/cafe24/sync
- body: { product, images[], descriptionHtml }
- res: { productId, status }
```

> 상세 스키마/예시는 `server/routes/*`를 참고하세요.

---

## 🧪 템플릿 & 샘플 프롬프트

**상품 설명 (요약/스토리/스펙)**

```
기능: {기능 키워드들}
톤: 모던/친절/프리미엄
언어: ko
출력: <h2>한줄 요약</h2> ... <table>스펙</table>
제약: 과장 금지, 소재/사이즈/세탁법 포함
```

**리뷰 자동 생성**

```
스타일: 구매자 리얼 후기, 길이 150~220자, 장단점 균형
맵핑: {상품 카테고리, 핵심 특징}
금지: 허위 과장, 배송 속도 과대표현
```

**정책 초안**

```
브랜드 톤: 신뢰/간결
반환/교환: 국내 규정 준수, 처리 SLA 명시
소비자 보호 기재 필수 항목 포함
```

---

## 🧱 아키텍처 개요

* **LLM Layer**: Prompt → GPT 생성 → HTML/JSON 표준화 → 미리보기/저장
* **Image Pipeline**: 업로드 → Leonardo 생성 → IDM-VTON 피팅 → CDN 저장(Supabase)
* **Data Layer**: Supabase 테이블(상품/리뷰/정책/세션/작업로그) & Storage
* **Sync Layer**: Cafe24 상품/이미지 업로드 및 업데이트
* **Governance**: 운영자 승인 → 배포(Export PNG/PDF → 업로드)

---

## 🔐 보안/운영 안내

* API 키는 **서버 환경 변수**로만 사용 (클라이언트에 노출 금지)
* Webhook/Job 실행 로그는 작업 ID 단위로 보관
* 이미지 처리 대기열(Queue) 사용 권장 (피팅/생성 지연 대비)
* 개인 정보/민감 정보는 저장하지 않음(필요 시 익명화)

---

## 🗺️ 로드맵(요약)

* [ ] 이미지 파이프라인 큐/리트라이 도입
* [ ] 멀티 템플릿 A/B 테스트
* [ ] 다국어(ko/en/ja) 동시 생성 & 현지화
* [ ] Cafe24 외 마켓(네이버/쿠팡) 어댑터
* [ ] 운영 대시보드(지표/성능/비용) 고도화

---

## 📸 데모/스크린샷

* 상세페이지 생성 화면
* 피팅 전/후 비교
* 정책/리뷰 자동 생성 미리보기

> (이미지/영상은 `/docs` 또는 Wiki에 추가)

---

## 👤 담당 & 연락

**우도연 (PM & Full-stack Developer)**

* GitHub: [@woodoyeon](https://github.com/woodoyeon)
* Blog: [https://upwardtrend.tistory.com/](https://upwardtrend.tistory.com/)
* Email: [dydy1212qwqw@naver.com](mailto:dydy1212qwqw@naver.com)

---

## 📄 라이선스

이 저장소의 소스/모델/리소스는 별도 고지 없이는 상업적 사용을 제한할 수 있습니다.
(회사/학술 과제 등 사용 시 이슈로 문의해주세요)

---

### 사용 팁

* **포트폴리오 각 레포에서 동일한 섹션 구조**(개요→기능→스택→시작→API→스크린샷)를 유지하면 채용자가 비교/검토하기 좋습니다.
* README 상단 3줄에 \*\*“무엇을, 왜, 어떻게”\*\*를 명확히 두고, \*\*PM 기여(흐름/우선순위/승인·배포)\*\*를 한 줄로 박아두면 “경력직 톤”이 자연스럽게 전달됩니다.
