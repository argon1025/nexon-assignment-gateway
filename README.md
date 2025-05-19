# 🛰️ Gateway

모든 API 요청의 인증, 라우팅을 담당하는 마이크로서비스입니다.

## 📦 프로젝트 구성

기본적인 구성은 MSA 공통 컨벤션을 준수하는 [nexon-assignment-nestjs-temp](https://github.com/argon1025/nexon-assignment-nestjs-temp)를 사용했습니다.

### 🗂 폴더 구조

```
📦src
 ┣ 📂api                                      (API 연동 모듈)
 ┃ ┣ 📂auth                                    (Auth 마이크로서비스와의 HTTP 통신 클라이언트)
 ┃ ┗ 📂event                                   (Event 마이크로서비스와의 HTTP 통신 클라이언트)
 ┣ 📂common                                   (공통 유틸, 데코레이터, 상수 등)
 ┃ ┣ 📂decorator                                (커스텀 데코레이터 모음)
 ┃ ┃ ┣ 📜public.decorator.ts                      (`@Public()` 인증 제외 처리용 데코레이터)
 ┃ ┃ ┣ 📜role.decorator.ts                        (`@Roles()` 역할 기반 접근 제어용 데코레이터)
 ┃ ┃ ┗ 📜user.decorator.ts                        (`@User()` 토큰에서 유저 정보 추출용 데코레이터)
 ┣ 📂auth                                     (인증 관련 모듈: JWT 전략, 가드)
 ┃ ┣ 📂guard                                    (인증/인가용 Passport Guard 모듈)
 ┃ ┃ ┣ 📜jwt-auth.guard.ts                        (JWT 인가 Guard)
 ┃ ┃ ┗ 📜roles.guard.ts                           (역할(Role) 기반 인가 Guard)
 ┃ ┣ 📂strategy                                 (Passport JWT 전략 모듈)
 ┃ ┃ ┗ 📜jwt.strategy.ts                          (JWT 파싱 및 검증 전략)
 ┣ 📂event                                    (이벤트 관련 라우팅/컨트롤러 레이어)
 ┃ ┣ 📂admin                                    (관리자용 API)
 ┃ ┣ 📂internal                                 (사용자용 API)
 ┣ 📂user                                     (유저 관련 라우팅/컨트롤러 레이어)
 ┃ ┣ 📂admin                                    (관리자용 API)
 ┃ ┣ 📂internal                                 (사용자용 API)
 ┗ 📜main.ts
```

### 🧠 설계 배경

#### JWT, 역할 기반 인증

- Auth 마이크로서비스에서 발급한 JWT 토큰을 Gateway에서 복호화하여 사용자 정보를 확인합니다.
- 전역 `JwtAuthGuard`를 통해 인증을 처리하며, `@Public()` 데코레이터로 인증 제외 API를 명시적으로 관리합니다.
- `@Roles()` 데코레이터를 사용해 역할(USER, OPERATOR, AUDITOR, ADMIN)에 따라 API 접근 권한을 제어합니다.
- `@User()` 데코레이터를 통해 인증된 사용자 정보를 간편하게 받을 수 있습니다.

#### API 연동 및 별도 레이어 분리

- `api/` 디렉토리에서 서비스별 외부 API 호출을 모듈화했습니다.
- 호출 실패 시 공통 예외 포맷으로 변환하여 비즈니스 로직에 전달함으로써, 일관성 있게 에러처리가 가능하도록 했습니다.

## 🚀 로컬 실행 가이드

이 프로젝트는 Docker 기반으로도 실행할 수 있지만,
Gateway는 단일 인스턴스로 동작하며, 외부 마이크로서비스(`Auth`, `Event`)에 연결해야 하므로 로컬 직접 실행을 권장합니다.

전체 MSA 환경을 통합 실행하고자 할 경우에는 [Event Reward System](https://github.com/argon1025/nexon-assignment) 저장소의 통합 실행 가이드를 참고하세요.

### 1. 노드 버전 확인 및 설치

```bash
$ cat .nvmrc
$ fnm use
```

### 2. pnpm 패키지 설치

```bash
$ corepack enable
```

> pnpm 버전의 경우 package.json > packageManager 에서 관리됩니다.

### 4. 의존성 설치

```bash
pnpm install
```

### 5. 개발 서버 실행

```bash
pnpm run start:local
```

### 6. 서비스 접근

- Gateway Swagger `http://localhost/api`
  > ⚠️ 포트정보는 `.env.local` 파일 내 선언에 따라 변경될 수 있습니다.
