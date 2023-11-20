import React, { useState, useEffect } from 'react';
import './MainP.css';

const MainP = () => {
  const dummyBookmarks = Array.from({ length: 30 }, (_, index) => ({
    id: index + 1,
    title: `북마크 제목 ${index + 1}`,
  }));

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchedBookmarks, setSearchedBookmarks] = useState([]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookmarks = searchedBookmarks.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    const filteredBookmarks = dummyBookmarks.filter((bookmark) =>
      bookmark.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setSearchedBookmarks(filteredBookmarks); // 필터링된 북마크 설정
    setCurrentPage(1); // 페이지를 처음으로 초기화
  };

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 모든 북마크를 검색된 북마크로 설정
    setSearchedBookmarks(dummyBookmarks);
  }, []);

  return (
    <div className="MainP">
      <div className="header">
        <div className="logo-header">
          YouTube Bookmark
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="원하는 북마크의 키워드를 검색"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
      </div>
      <div className="bookmarks-container">
        {currentBookmarks.map((bookmark) => (
          <div key={bookmark.id} className="bookmark">
            <h2>Bookmarks</h2>
            <p>{bookmark.title}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {searchedBookmarks.length > itemsPerPage && (
          <ul>
            {Array.from({ length: Math.ceil(searchedBookmarks.length / itemsPerPage) }, (_, index) => (
              <li key={index}>
                <button onClick={() => paginate(index + 1)}>{index + 1}</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainP;
