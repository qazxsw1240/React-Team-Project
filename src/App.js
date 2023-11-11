/**
 * bookmark 객체
 *
 * {"id":"5bId3N7QZec",
 * "url":"https://youtu.be/5bId3N7QZec",
 * "title":"https://youtu.be/5bId3N7QZec",
 * "description":"",
 * "timelines":[]}
 *
 */

import React, { useEffect, useState } from "react";
import BookmarkInfo, { BookmarkInfoModalVisibleContext } from "info/BookmarkInfo";

// 추가 코드
import AddBookmark, { AddBookmarkModalVisibleContext } from "add/AddBookmark";

import { BookmarkStorage } from "db/localStorage";

// 전역으로 상태 설정
const BookmarkInfoModalVisibleContextProvider = BookmarkInfoModalVisibleContext.Provider;

// 추가 코드 
const AddBookmarkModalVisibleContextProvider = AddBookmarkModalVisibleContext.Provider;


function App() {
  useEffect(() => {
    BookmarkStorage.initializeData();
    BookmarkStorage.updateBookmark("https://youtu.be/5bId3N7QZec", () => {});
  }, []);

  // 북마크 상세 정보 창이 보이는지 여부를 다루는 useState
  const bookmarkInfoModalVisibleContext = useState(false);

  // infoVisible : 북마크 상세 정보 창이 보이는지 설정하는 변수(default = false)
  // setInfoVisible : infoVisible 값 조정 함수
  const [infoVisible, setInfoVisible] = bookmarkInfoModalVisibleContext;


  // 추가 코드
  const addBookmarkModalVisibleContext = useState(false);
  const [addVisible, setAddVisible] = addBookmarkModalVisibleContext;

  // bookmarks에 bookmark 객체 배열 저장
  const bookmarks = BookmarkStorage.getAllBookmarks();

  // className 여러 개 
  return (
    <>
      <div className="window modifiable">
        
        <font className="window-inner-title">Hello, World!</font>
        
      </div>
      
      <BookmarkInfoModalVisibleContextProvider value={bookmarkInfoModalVisibleContext}>
        {infoVisible ? <BookmarkInfo bookmark={bookmarks[0]} /> : <></>}
      </BookmarkInfoModalVisibleContextProvider>
      <button onClick={() => setInfoVisible(() => true)}>show</button>

      <AddBookmarkModalVisibleContextProvider value={addBookmarkModalVisibleContext}>
        {addVisible ? <AddBookmark/> : <></>}
      </AddBookmarkModalVisibleContextProvider>
      <button onClick={() => setAddVisible(() => true)}>추가 +</button>
    </>
  );
}

export default App;
