import React from "react";
import ReactDOM from "react-dom/client";
import App from "App";
import reportWebVitals from "reportWebVitals";

// 추가 코드
// src 폴더 내의 모든 css 파일을 import
function importAll(r) {
  r.keys().forEach(r);
}
importAll(require.context("./", true, /\.css$/));

const element = document.getElementById("root");

if (element === null) {
  throw new Error("Element not found!");
}

const root = ReactDOM.createRoot(element);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
