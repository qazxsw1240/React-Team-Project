import React, { useState, useEffect } from 'react';
import { BookmarkStorage } from 'localStorage';  // BookmarkStorage 경로를 실제 프로젝트 경로로 수정해주세요.

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // 로컬 스토리지에서 북마크 데이터를 가져옵니다.
    BookmarkStorage.initializeData();
    const allBookmarks = BookmarkStorage.getAllBookmarks();
    setBookmarks(allBookmarks);
  }, []); // 컴포넌트가 마운트될 때 한 번만 실행

  const handleDeleteBookmark = (id) => {
    // 북마크를 삭제하고 화면 갱신
    BookmarkStorage.removeBookmark(BookmarkStorage.getBookmarkById(id));
    setBookmarks([...BookmarkStorage.getAllBookmarks()]);
  };

  return (
    <div>
      <h2>Bookmark List</h2>
      <ul>
        {bookmarks.map(bookmark => (
          <li key={bookmark.id}>
            <strong>Title:</strong> {bookmark.title}<br />
            <strong>Description:</strong> {bookmark.description}<br />
            <strong>URL:</strong> {bookmark.url}<br />
            {/* 추가 필요한 정보 표시 */}
            {/* 예: <strong>Timeline:</strong> {bookmark.timelines.map(timeline => timeline.timeline)} */}
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

export default bookmarkList;
