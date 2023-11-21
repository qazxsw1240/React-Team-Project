import * as Bookmark from "db/bookmark";
import Img from "img/Img";
import React, { useContext, useEffect, useState } from 'react';
import { IoIosAdd } from "react-icons/io";

import LongThumbnail from "img/youtube_bookmark_thumbnail.png";

import { BookmarkActionContext } from "App";
import { AddBookmarkModalVisibleContext } from "add/AddBookmark";
import BookmarkItem from "bookmarkItem/BookmarkItem";
import { BookmarkInfoModalVisibleContext } from "info/BookmarkInfo";
import './main.css';

const ItemsPerPage = 9;
const DefaultCurrentPage = 1;
const DefaultSearchKeyword = "";

const DummyBookmarks = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  title: `북마크 제목 ${index + 1}`,
}));

/**
 * @typedef {object} MainProps
 * @property {Array.<Bookmark.YouTubeBookmark>} bookmarks
 */

/**
 * @param {MainProps} props 
 * @returns {React.JSX.Element}
 */
function Main(props) {
  const { bookmarks = DummyBookmarks } = props;
  const [currentPage, setCurrentPage] = useState(DefaultCurrentPage);
  const [searchKeyword, setSearchKeyword] = useState(DefaultSearchKeyword);
  const [searchResults, setSearchResults] = useState(bookmarks);

  const start = (currentPage - 1) * ItemsPerPage;
  const end = Math.min(searchResults.length, currentPage * ItemsPerPage);
  const currentBookmarks = searchResults.filter((_, i) => start <= i && i < end);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 모든 북마크를 검색된 북마크로 설정
    setSearchResults(bookmarks);
  }, [bookmarks]);

  useEffect(() => {
    if (searchKeyword.length === 0) {
      setSearchResults(bookmarks);
      return;
    }
    const searchResult = bookmarks.filter(b => b.title.indexOf(searchKeyword) >= 0);
    setSearchResults(searchResult);
    setCurrentPage(DefaultCurrentPage);
  }, [searchKeyword]);

  return (
    <div className="main">
      <MainHeader onSearchButtonClick={setSearchKeyword} />
      <MainBody bookmarks={currentBookmarks} />
      <PageButtons
        pages={Math.ceil(searchResults.length / ItemsPerPage)}
        onPageButtonClick={page => setCurrentPage(page)} />
    </div>
  );
}


/**
 * @typedef {object} MainHeaderProps
 * @property {(keyword:string)=>void=} onSearchButtonClick
 */

/**
 * @param {MainHeaderProps} props
 * @returns {React.JSX.Element}
 */
function MainHeader(props) {
  const { onSearchButtonClick = _ => undefined } = props;
  const [keyword, setKeyword] = useState("");
  const [, setAddBookmarkVisible] = useContext(AddBookmarkModalVisibleContext);

  /**
   * @param {React.KeyboardEvent.<HTMLInputElement>&React.BaseSyntheticEvent.<HTMLInputElement,any,HTMLInputElement>} event 
   */
  function checkEnterInput(event) {
    const target = event.target;
    if (event.key === "Enter") {
      setKeyword(target.value);
      onSearchButtonClick(keyword);
    }
  }

  return (
    <div className="header">
      <div className="logo-header">
        <Img src={LongThumbnail} />
      </div>
      <div className="header-bookmark-add-button-field">
        <button
          className="header-bookmark-add-button"
          onClick={() => setAddBookmarkVisible(() => true)}>
          북마크 추가&nbsp;
          <IoIosAdd />
        </button>
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="원하는 북마크의 키워드를 입력해서 검색"
          value={keyword}
          onKeyDown={checkEnterInput}
          onChange={(e) => setKeyword(e.target.value)} />
        <button
          className="search-button"
          onClick={() => onSearchButtonClick(keyword)}>
          검색
        </button>
      </div>
    </div>
  );
}


/**
 * @typedef {object} MainBodyProps
 * @property {Array.<object>} bookmarks
 */

/**
 * @param {MainBodyProps} props
 * @returns {React.JSX.Element}
 */
function MainBody(props) {
  const { bookmarks } = props;
  const [, setInfoVisible] = useContext(BookmarkInfoModalVisibleContext);
  const [, setBookmarkAction] = useContext(BookmarkActionContext);
  console.log(useContext(BookmarkActionContext));
  return (
    <div className="bookmarks-container">
      {
        bookmarks.length === 0 ?
          <></> :
          bookmarks.map(b => (
            <BookmarkItem
              bookmark={b}
              onBookmarkClick={() => setInfoVisible(() => b)}
              onBookmarkDeleteClick={() => setBookmarkAction({ type: "DELETE", bookmark: b })} />
          ))
      }
    </div>
  );
}


/**
 * @typedef {object} PageButtonsProps
 * @property {number} pages
 * @property {(page:number)=>void=} onPageButtonClick
 */

/**
 * @returns {React.JSX.Element}
 */
function PageButtons(props) {
  const {
    pages,
    onPageButtonClick = _ => undefined
  } = props;
  return (
    <div className="pagination">
      {
        pages > 1 ?
          <ul>
            {
              Array.from(
                { length: pages },
                (_, i) => (
                  <li key={i}>
                    <button onClick={() => onPageButtonClick(i + 1)}>
                      {i + 1}
                    </button>
                  </li>
                )
              )
            }
          </ul> :
          <></>
      }
    </div>
  );
}

export default Main;
