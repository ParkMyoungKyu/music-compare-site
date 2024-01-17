## 음악 차트 비교 사이트
---
캡틴판교 강사님의 Typescript 강의에서 사용하는 코로나 API(https://api.covid19api.com/summary) 서비스가 중단됨에 따라 개인적으로 만들고 싶었던 각 음원 사이트들의 음원차트를 비교하는 사이트로 커스터마이징 하며 Typescript 학습을 진행하고자 합니다.

---


### 자바스크립트 프로젝트에 타입스크립트 적용하기

1. 자바스크립트 파일에 JSDoc으로 타입 시스템 입히기
2. 타입스크립트 기본 환경 구성
    - [x] NPM 초기화 (npm init)
    - [x] 타입스크립트 및 문법 검사, 코드 정리 도구 라이브러리 설치 
    - typescript, babel, eslint, prettier
    ```sh
    npm i -D typescript @babel/core @babel/preset-env @babel/preset-typescript @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint prettier eslint-plugin-prettier
    ```

    - [x] 타입스크립트 설정 파일 생성 및 기본 값 추가 (tsconfig.json)
    - [x] ESLint 설정 파일 추가(.eslintrc.js)
    - [x] 자바스크립트 파일을 타입스크립트 파일로 변환 (app.js -> app.ts)
    - [x] `tsc` 명령어로 타입스크립트 컴파일 하기

3. 타입스크립트 명시적인 any 선언하기
    - `tsconfig.json` 파일에  `noImplicitAny` 값을 `true` 로 추가



---



#### 참고 자료
- [FLO](https://music.bugs.co.kr/chart)
- [멜론뮤직](https://www.melon.com/chart)
- [VIBE](https://vibe.naver.com/chart)
- [genie](https://genie.co.kr/chart/top200)
- [벅스뮤직](https://music.bugs.co.kr/chart)
