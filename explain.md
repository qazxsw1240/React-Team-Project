# Youtube Bookmark


> **한성대학교 컴퓨터공학과** <br/> **개발기간: 2023.10 ~ 2022.11**


---

<br>


## 팀원 소개
---


| 김태명 | 김용민 | 손지호 | 김승준 |                                                                                                             
| :---------------: | :---------------: | :---------------: | :---------------: |  
|  <img width="160px" src="https://avatars.githubusercontent.com/u/30478728?s=60&v=4" />    |  <img width="160px" src="https://avatars.githubusercontent.com/u/54831833?s=60&v=4" />    |  <img width="160px" src="https://avatars.githubusercontent.com/u/92436202?s=60&v=4"/>   | <img width="160px" src="https://avatars.githubusercontent.com/u/115531146?s=60&v=4"/>   |
| [@qazxsw1240](https://github.com/qazxsw1240) | [@whereful](https://github.com/whereful) | [@1871134son](https://github.com/1871134son) | [@Kimseungzzang](https://github.com/Kimseungzzang) |

---


<br>

### 설치 & 실행
---
``` bash
$ npm install
$ npm start
```
---

<br>

## 기술 스택

---

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

<br>

## 화면 구성
---
| 메인 화면  |  추가 화면   |
| :-------------------------------------------: | :------------: |
| <img width="329" alt="Screenshot 0005-11-22 at 3 39 50 PM" src="https://github.com/whereful/image_source_store_repository/assets/54831833/ba03b396-4442-42e6-8e01-368cc6068e39"> | <img width="329" alt="Screenshot 0005-11-22 at 3 40 15 PM" src="https://github.com/whereful/image_source_store_repository/assets/54831833/04a39306-083a-4d55-b3b3-3b7a047e3704"> |  
| 알림창   |  상세 화면   |  
| <img width="329" alt="Screenshot 0005-11-22 at 3 41 25 PM" src="https://github.com/whereful/image_source_store_repository/assets/54831833/c2c28b47-cf1e-4e93-a025-0aa7a5727e9b"> | <img width="329" alt="Screenshot 0005-11-22 at 3 40 43 PM" src="https://github.com/whereful/image_source_store_repository/assets/54831833/74939ce8-98a0-4389-bbbb-1723bf809230"> |

---

<br>

## 주요 기능 
---
### ⭐️ 영상 제목, 링크, 설명 추가 및 수정
- 원하는 영상을 추가 시 제목, 설명을 임의로 입력 
- 추가한 제목, 설명 등 수정 

### ⭐️ 시간 링크 추가 및 수정
- 시간을 저장하면 해당 시간부터 영상이 재생되도록 설정

### ⭐️ 검색 기능
- 원하는 키워드를 검색하면 해당 키워드를 포함한 영상 선별
---

<br>

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




