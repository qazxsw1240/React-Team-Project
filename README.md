# React Team Project - Youtube Bookmark

웹프레임워크1 수업 리액트 프로젝트입니다.

> **한성대학교 컴퓨터공학과 <br> 개발기간: 2023.10 ~ 2022.11**

---

## 팀원 소개

| 김태명 | 김용민 | 손지호 | 김승준 |                                         
| :---------------: | :---------------: | :---------------: | :---------------: |  
| <img width="160px" src="https://avatars.githubusercontent.com/u/30478728?s=60&v=4"> | <img width="160px" src="https://avatars.githubusercontent.com/u/54831833?s=60&v=4"> | <img width="160px" src="https://avatars.githubusercontent.com/u/92436202?s=60&v=4"> | <img width="160px" src="https://avatars.githubusercontent.com/u/115531146?s=60&v=4"> |
| [@qazxsw1240](https://github.com/qazxsw1240) | [@whereful](https://github.com/whereful) | [@1871134son](https://github.com/1871134son) | [@Kimseungzzang](https://github.com/Kimseungzzang) |

---

### 설치 & 실행
``` bash
$ npm install
$ npm start
```
---

## 기술 스택

### 개발 환경
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)             

### 실행 환경
![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)        

### 개발 언어 및 라이브러리
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Css](https://img.shields.io/badge/Css-7952B3?style=for-the-badge&logo=css&logoColor=white)

---

## 화면 구성

| 메인 화면  |  추가 화면   |
| :-------------------------------------------: | :------------: |
| <img width="329" alt="Screenshot 0005-11-22 at 3 39 50 PM" src="https://github.com/whereful/image_source_store_repository/assets/54831833/ba03b396-4442-42e6-8e01-368cc6068e39"> | <img width="329" alt="Screenshot 0005-11-22 at 3 40 15 PM" src="https://github.com/whereful/image_source_store_repository/assets/54831833/04a39306-083a-4d55-b3b3-3b7a047e3704"> |  
| 알림창   |  상세 화면   |  
| <img width="329" alt="Screenshot 0005-11-22 at 3 41 25 PM" src="https://github.com/whereful/image_source_store_repository/assets/54831833/c2c28b47-cf1e-4e93-a025-0aa7a5727e9b"> | <img width="329" alt="Screenshot 0005-11-22 at 3 40 43 PM" src="https://github.com/whereful/image_source_store_repository/assets/54831833/74939ce8-98a0-4389-bbbb-1723bf809230"> |

---

## 주요 기능 

### ⭐️ 영상 제목, 링크, 설명 추가 및 수정

- 원하는 영상을 추가 시 제목, 설명을 임의로 입력 
- 추가한 제목, 설명 등 수정 

### ⭐️ 시간 링크 추가 및 수정

- 시간을 저장하면 해당 시간부터 영상이 재생되도록 설정

### ⭐️ 검색 기능

- 원하는 키워드를 검색하면 해당 키워드를 포함한 영상 선별

---

## 아키텍쳐

- 디렉토리 구조

```bash
.
├── src
│   ├── util
│   │   └── error.js
│   ├── test
│   │   └── setupTests.js
│   ├── reportWebVitals.js
│   ├── modal
│   │   ├── modal.css
│   │   └── Modal.js
│   ├── main
│   │   ├── main.css
│   │   ├── main-index.css
│   │   └── Main.js
│   ├── input
│   │   ├── input.css
│   │   ├── ModifiableTextArea.js
│   │   └── ModifiableInput.js
│   ├── info
│   │   ├── timeline.css
│   │   ├── bookmark-info.css
│   │   ├── TimeLines.js
│   │   ├── TimeLine.js
│   │   ├── Iframe.js
│   │   ├── Description.js
│   │   └── BookmarkInfo.js
│   ├── index.js
│   ├── index.css
│   ├── img
│   │   ├── youtube_bookmark_thumbnail.png
│   │   ├── img.css
│   │   └── Img.js
│   ├── db
│   │   ├── localStorage.js
│   │   └── bookmark.js
│   ├── button
│   │   ├── CrossButton.js
│   │   ├── CompleteButton.js
│   │   ├── CancelButton.js
│   │   └── Button.css
│   ├── bookmarkItem
│   │   ├── bookmark-item.css
│   │   └── BookmarkItem.js
│   ├── alert
│   │   └── executeSwal.js
│   ├── add
│   │   ├── bookmark-add.css
│   │   └── AddBookmark.js
│   └── App.js
├── public
│   ├── robots.txt
│   ├── index.html
│   └── favicon_32x32.png
├── package.json
├── package-lock.json
├── jsconfig.json
└── README.md
```

## 코딩 스타일

### 1. 작명

이름은 기본적으로 **camelCase** 방식과 **PascalCase** 방식을 기본으로 합니다.

| 종류 | 대소문자 방식 | 예시 
|------|---------------|------
| 변수 | camelCase     | `const x = 10;` 
| 상수 | PascalCase    | `const BaseUrl  = "https://www.google.com/`
| 클래스 | PascalCase  | `class ComponentBuilder {}`
| 함수 | camelCase     | `function createComponent() {}`
| 리액트 컴포넌트 | PascalCase | `function App() {}`

HTML이나 URL 같은 약어는 JavaScript 기본 구현 명명 방식을 따라 첫 단어만 전체의 대소문자를 유지합니다.

```js
// 기본 내장 클래스
new XMLHttpRequest();
new URL("https://www.google.com/");

function createNewURL() {} // URL이 첫 단어가 아님
function createNewUrl() {} // 권장
class HTMLBuilder {}       // 권장
```

임시로 생성한 변수가 아니면 `i`, `j` 등의 이름으로 역할을 추론할 수 없는 약어는 최대한 쓰지 않습니다.

```js
const a = "Hello, World!"; // 변수 이름으로 역할을 추론할 수 없음
const str = "Hello, World!"; // 문자열 타입과 str 이름으로 추론할 만함
const content = "Hello, World!"; // 권장

for (let i = 0; i < 100; i++) { // 임시 변수는 허용
  console.log(content[i]);
}
```

### 2. 코드

기본 들여쓰기는 띄어쓰기 공백 문자(`' '`) 두 칸으로 합니다.

```js
// Case 1
if (condition) {
    console.log(condition); // 들여쓰기가 네 칸임
}

// Case 2
if (condition) {
	console.log(condition); // 들여쓰기가 탭(\t) 문자임
}

if (condition) {
  console.log(condition); // 권장
}
```

기본 이항 연산자는 양 옆에 공백 하나를 채웁니다. 증감 연산자는(`++`, `--`)는 붙여 씁니다.

```js
const x=10; // 공백이 없음
const y  =  10; // 공백이 두 칸임
const z = 10; // 권장

console.log(i ++); // 공백이 있음
console.log(j--); // 권장
```

배열 리터럴은 대괄호(`[]`) 내부에 공백이 없고, 객체 리터럴의 중괄호(`{}`)는 내부에 공백을 채웁니다.

```js
const xs = [1, 2, 3, 4, 5];
const obj = { a: "asdf", b: 3.14, c: true };
```

문장 끝 세미콜론(`;`)은 반드시 붙여줍니다. 특수한 경우가 아닌 이상 한 줄에는 한 문장만 존재합니다.

```js
let k = -1.4 // 세미콜론이 없음
let l = -32; // 권장
t = 2; u = "asdf"; // 한 줄에 두 문장이 있음
```

`if`, `for`, `while` 등의 문법에서 중괄호(`{}`)는 같은 줄에서 시작합니다.

```js
// Case 1
if (x > 4) {
  console.log(x - 4); // 권장
}

// Case 2
if (x > 4)
{
  console.log(x - 4); // 여는 중괄호가 다음 줄에 있음
}
```

중괄호는 생략하지 않습니다.

```js
// Case 1
for (let i = 0; i < 100; i++)
  console.log(i % 4); // 중괄호가 생략돼 있음

// Case 2
for (let i = 0; i < 100; i++) {
  console.log(i % 4); // 권장
}
```

문자열은 템플릿 문자열(``` `` ```)을 제외하면 모두 쌍따옴표(`""`)를 씁니다.

```js
import * as Foo from './foo'; // 쌍따옴표가 아님
import * as Bar from "./bar"; // 권장

const str = "Hello, World!"; // 권장
const combined = `${str.toUpperCase()}: ${str}`; // 템플릿 문자열은 제외
const str2 = "\"Double Quotation Mark\""; // 쌍따옴표를 입력해야 하면 이스케이프 문자를 활용
```

콜백 함수는 일회성인 경우 최대한 익명 함수를 활용합니다. 기존에 정의된 함수를 인자로 넘기는 것은 허용합니다.

```js
const onFulfilled = res => console.log(res);

// Case 1
fetch("https://www.google.com/")
  .then(onFulfilled); // 일회성의 콜백

// Case 2
fetch("https://www.google.com/")
  .then(res => console.log(res)); // 권장

// Case 3
fetch("https://www.google.com/")
  .then(console.log); // 허용하지만, this 바인딩을 확인할 것
```

일반 함수는 함수 선언문(`function` 키워드)으로 정의합니다.

```js
// Case 1
const onFulfilled = res => console.log(res); // 익명 함수

// Case 2
function onFulfilled(res) {  // 권장
  console.log(res);
}
```
