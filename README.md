# 스파르타 코딩클럽 Node.js 플러스주차 TypeScript 과제

## 환경변수

`.env.example` 파일 복사하여 `.env` 파일 생성 후 아래 내용 입력

```sh
cp .env.example .env
```

```
SERVER_PORT=3000

DB_HOST=DB 주소
DB_PORT=DB 포트번호
DB_USERNAME=DB 사용자명
DB_PASSWORD=DB 비밀번호
DB_NAME=DB 이름
DB_SYNC=Entity <-> DB Table 동기화 여부 (default: true)

PASSWORD_HASH_ROUNDS=로그인 비밀번호 해시 생성 강도 (default: 10)
JWT_SECRET=JWT 생성 및 검증 키
```

## 실행 방법

- yarn

```sh
yarn
yarn start:dev
```

- npm

```sh
npm install
npm run start:dev
```

## 설계 문서

- ERD: https://drawsql.app/teams/team-modolee/diagrams/sparta-node-ts

- API 명세서: https://modolee.notion.site/API-b5a7231578384dd09f335c9136e0a497

## Swagger 접속 주소

http://localhost:3000/api

## 참고 자료

- Nest.js 공식 문서: https://docs.nestjs.com
- TypeORM 공식 문서: https://typeorm.io
- Joi: https://www.npmjs.com/package/joi
- Class Validator: https://www.npmjs.com/package/class-validator
- Validator: https://www.npmjs.com/package/validator
- Passport 공식 문서: https://www.passportjs.org/docs
