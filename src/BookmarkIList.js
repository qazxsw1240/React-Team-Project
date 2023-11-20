// BookmarkList.js

import React, { useState, useEffect } from "react";
import { BookmarkStorage } from "./db/localStorage";
import { FaTrash } from "react-icons/fa";
import ReactPaginate from "react-js-pagination";
import "./BookmarkList.css";

/** 
 * @type {string} 
 * @constant
 */
const YouTubeLongUrlHost = "www.youtube.com";

/** 
 * @type {string}
 * @constant
 */
const YouTubeShortUrlHost = "youtu.be";

/**
 * URL 객체로 유튜브 비디오의 ID를 추출합니다.
 * 
 * @param {URL} url ID를 추출할 URL 데이터.
 * @returns {string} 추출된 유튜브 비디오 ID.
 */
export function extractYouTubeId(url) {
  const host = url.host;
  if (host === YouTubeLongUrlHost) { // www.youtube.com
    const searchParams = url.searchParams;
    const id = searchParams.get("v");
    if (id === null) {
      console.error("Cannot extract YouTube Video ID: " + url.toString());
      return ""; // 또는 다른 기본값으로 설정
    }
    return id;
  }
  if (host === YouTubeShortUrlHost) { // youtu.be
    const id = url.pathname.substring(1);
    if (id === "") {
      console.error("Cannot extract YouTube Video ID: " + url.toString());
      return ""; // 또는 다른 기본값으로 설정
    }
    return id;
  }
  // YouTube 동영상이 아닌 경우
  console.error("Not a valid YouTube URL: " + url.toString());
  return ""; // 또는 다른 기본값으로 설정
}

/**
 * URL 객체로 유튜브 비디오의 ID를 추출합니다.
 * 
 * @param {URL} url ID를 추출할 URL 데이터.
 * @returns {string} 추출된 유튜브 비디오 ID.
 */
export function extractYouTubeIdFromBookmark(bookmark) {
  const urlInstance = new URL(bookmark.url);
  return extractYouTubeId(urlInstance);
}

const BookmarkList = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const bookmarksPerPage = 12;

  useEffect(() => {
    BookmarkStorage.initializeData();
    const allBookmarks = BookmarkStorage.getAllBookmarks();
    setBookmarks(allBookmarks);
  }, []);

  const handleDeleteBookmark = (event, id) => {
    BookmarkStorage.removeBookmark(BookmarkStorage.getBookmarkById(id));
    setBookmarks([...BookmarkStorage.getAllBookmarks()]);
    event.stopPropagation();
  };

  const handleBookmarkClick = (url) => {
    window.location.href = url;
  };

  
  const indexOfLastBookmark = currentPage * bookmarksPerPage;
  const indexOfFirstBookmark = indexOfLastBookmark - bookmarksPerPage;
  const currentBookmarks = bookmarks.slice(
    indexOfFirstBookmark,
    indexOfLastBookmark
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>북마크 목록</h2>
      <div className="bookmark-container">
        {currentBookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bookmark"
            onClick={() => handleBookmarkClick(bookmark.url)}
          >
            <div className="thumbnail-container">
              <img
                src={`https://img.youtube.com/vi/${extractYouTubeIdFromBookmark(
                  bookmark
                )}/default.jpg`}
                alt={`Thumbnail for ${bookmark.title}`}
              />
            </div>
            <strong>제목:</strong> {bookmark.title}
            <br />
            <strong>설명:</strong> {bookmark.description}
            <br />
            <button
              className="delete-button"
              onClick={(event) => handleDeleteBookmark(event, bookmark.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>
      <div className="pagination-container">
        <ReactPaginate
          activePage={currentPage}
          itemsCountPerPage={bookmarksPerPage}
          totalItemsCount={bookmarks.length}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText=""
          nextPageText=""
          hideFirstLastPages={true}
        />
      </div>
    </div>
  );
};

export default BookmarkList;
