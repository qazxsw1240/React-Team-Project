# React Team Project

웹프레임워크1 수업 리액트 프로젝트입니다.

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

콜백 함수는 일회성인 경우 최대한 익명 함수를 활용합니다. 기존에 정의된 함수를 인자로 넘기는 것은 허용합니다.

```js
const onFulfilled = res => console.log(res);

// Case 1
fetch("https://www.google.com/")
  .then(onFulfilled); // 일회성의 콜백

// Case 2
fetch("https://www.google.com/")
  .then(res => console.log(res)) // 권장

// Case 3
fetch("https://www.google.com/")
  .then(console.log) // 허용하지만, this 바인딩을 확인할 것
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
