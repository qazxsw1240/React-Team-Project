import Img from "img/Img";
import React, { useEffect, useState } from 'react';

import LongThumbnail from "img/youtube_bookmark_thumbnail.png";

import './main.css';

/**
 * @typedef {object} MainProps
 * @property {*} bookmarks
 */

/**
 * @param {*} props 
 * @returns {React.JSX.Element}
 */
function Main(props) {
  const dummyBookmarks = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: `북마크 제목 ${index + 1}`,
  }));

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState(dummyBookmarks);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookmarks = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 모든 북마크를 검색된 북마크로 설정
    setSearchResults(dummyBookmarks);
  }, []);

  useEffect(() => {
    if (searchKeyword.length === 0) {
      setSearchResults(dummyBookmarks);
      return;
    }
    const searchResult = dummyBookmarks.filter(b => b.title.indexOf(searchKeyword) >= 0);
    setSearchResults(searchResult);
    setCurrentPage(1);
  }, [searchKeyword]);

  return (
    <div className="main">
      <MainHeader onSearchButtonClick={setSearchKeyword} />
      <MainBody bookmarks={currentBookmarks} />
      <PageButtons
        pages={Math.ceil(searchResults.length / itemsPerPage)}
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
  return (
    <div className="bookmarks-container">
      {
        bookmarks.map(b => (
          <div key={b.id} className="bookmark">
            <h2>Bookmarks</h2>
            <p>{b.title}</p>
          </div>
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
        pages > 1 &&
        (
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
          </ul>
        )
      }
    </div>
  );
}

export default Main;
