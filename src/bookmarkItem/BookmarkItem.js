import * as Bookmark from "db/bookmark";

import React from "react";
import { FaTrash } from "react-icons/fa";
import "./bookmark-item.css";


/**
 * @type {Bookmark.YouTubeBookmark}
 */
const DummyBookmark = {
  id: "",
  url: "https://youtu.be/baRaISC9x6c",
  title: "Dummy Bookmark",
  description: "",
  timelines: []
};


/**
 * @typedef {object} BookmarkItemProps
 * @property {Bookmark.YouTubeBookmark} bookmark
 * @property {(bookmark:Bookmark.YouTubeBookmark)=>void=} onBookmarkClick
 * @property {(bookmark:Bookmark.YouTubeBookmark)=>void=} onBookmarkDeleteClick
 */

/**
 * @param {BookmarkItemProps} props 
 * @returns {React.JSX.Element}
 */
function BookmarkItem(props) {
  const {
    bookmark = DummyBookmark,
    onBookmarkClick = _ => undefined,
    onBookmarkDeleteClick = _ => undefined
  } = props;
  return (
    <div
      key={bookmark.id}
      className="bookmark-item">
      <div
        className="bookmark-item-container"
        onClick={() => onBookmarkClick(bookmark)}
        title={bookmark.title}>
        <div className="thumbnail-container">
          <img
            src={`https://img.youtube.com/vi/${bookmark.id}/hqdefault.jpg`}
            alt={`Thumbnail for ${bookmark.title}`}
          />
        </div>
        <div className="bookmark-item-title">
          <div className="bookmark-item-title-text">
            {bookmark.title}
          </div>
        </div>
      </div>
      <button
        className="delete-button"
        title={`북마크 ${bookmark.title} 삭제하기`}
        onClick={() => onBookmarkDeleteClick(bookmark)}>
        <FaTrash />
      </button>
    </div>
  );
}

export default BookmarkItem;
