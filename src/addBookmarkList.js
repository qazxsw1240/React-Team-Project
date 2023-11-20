import React, { useState, useEffect } from "react";
import { BookmarkStorage } from "./db/localStorage";

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 북마크 데이터를 가져와 초기화합니다.
    BookmarkStorage.initializeData();
    const allBookmarks = BookmarkStorage.getAllBookmarks();
    setBookmarks(allBookmarks);
  }, []);

  const handleAddBookmark = () => {
    // 새로운 북마크를 생성하고 추가합니다.
    const newBookmark = {
      id: "new-id", // 고유한 ID를 생성하거나 서버에서 받아오는 등의 방법으로 지정하세요.
      title: "New Bookmark",
      description: "This is a new bookmark",
      url: "https://www.naver.com",
    };

    const [errorMessage, success] = BookmarkStorage.addBookmark(newBookmark);

    if (success) {
      // 추가 성공 시, 업데이트된 북마크 리스트를 가져와서 상태를 업데이트합니다.
      const updatedBookmarks = BookmarkStorage.getAllBookmarks();
      setBookmarks(updatedBookmarks);
    } else {
      // 실패 시 에러 메시지를 처리합니다.
      console.error(`Failed to add bookmark: ${errorMessage}`);
    }
  };

  // 나머지 컴포넌트 코드...

  return (
    <div>
      <h2>Bookmark List</h2>
      <button onClick={handleAddBookmark}>Add Bookmark</button>
      <ul>
        {bookmarks.map((bookmark) => (
          <li key={bookmark.id}>
            <strong>Title:</strong> {bookmark.title}
            <br />
            <strong>Description:</strong> {bookmark.description}
            <br />
            <strong>URL:</strong> {bookmark.url}
            <br />
            <button onClick={() => handleDeleteBookmark(bookmark.id)}>
              Delete
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BookmarkList;
