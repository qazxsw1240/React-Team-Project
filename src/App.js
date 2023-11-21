import BookmarkInfo, { BookmarkInfoModalVisibleContext } from "info/BookmarkInfo";
import React, { useEffect, useReducer, useState } from "react";

import * as Bookmark from "db/bookmark";
import { BookmarkStorage } from "db/localStorage";

import AddBookmark, { AddBookmarkModalVisibleContext } from "add/AddBookmark";
import Main from "main/Main";


/**
 * @type {React.Context.<[Bookmark.YouTubeBookmark[], React.DispatchWithoutAction]>}
 */
export const BookmarkActionContext = React.createContext(null);

const BookmarkActionContextProvider = BookmarkActionContext.Provider;
const BookmarkInfoModalVisibleContextProvider = BookmarkInfoModalVisibleContext.Provider;
const AddBookmarkModalVisibleContextProvider = AddBookmarkModalVisibleContext.Provider;


function App() {
  const [bookmarks, setBookmarkAction] = useBookmarkModifyReducer();
  const [bookmark, setBookmark] = useState(null);
  const [addVisible, setAddVisible] = useState(false);

  useEffect(() => {
    BookmarkStorage.initializeData();
    BookmarkStorage.updateBookmark("https://youtu.be/5bId3N7QZec", () => { });
    BookmarkStorage.updateBookmark("https://youtu.be/baRaISC9x6c", () => { });
    BookmarkStorage.updateBookmark("https://youtu.be/65EjJ7WyiOI", () => { });
    BookmarkStorage.updateBookmark("https://youtu.be/-Hs1bm-iAYE", () => { });
    setBookmarkAction({ type: "LOAD" });
  }, []);

  return (
    <>
      <BookmarkActionContextProvider value={[bookmarks, setBookmarkAction]}>
        <BookmarkInfoModalVisibleContextProvider value={[bookmark, setBookmark]}>
          <AddBookmarkModalVisibleContextProvider value={[addVisible, setAddVisible]}>
            <Main bookmarks={bookmarks} />
            {addVisible ? <AddBookmark /> : <></>}
            {bookmark ? <BookmarkInfo bookmark={bookmark} /> : <></>}
          </AddBookmarkModalVisibleContextProvider>
        </BookmarkInfoModalVisibleContextProvider>
      </BookmarkActionContextProvider>
    </>
  );
}


/**
 * @typedef {object} BookmarkLoadAction
 * @property {"LOAD"} type
 */
/**
 * @typedef {object} BookmarkAddAction
 * @property {"ADD"} type
 * @property {Bookmark.YouTubeBookmark} bookmark
 */
/**
 * @typedef {object} BookmarkRemoveAction
 * @property {"DELETE"} type
 * @property {Bookmark.YouTubeBookmark} bookmark
 */
/**
 * @typedef {BookmarkLoadAction|BookmarkAddAction|BookmarkRemoveAction} BookmarkAction
 */

/**
 * @returns {[Bookmark.YouTubeBookmark[], React.Dispatch.<BookmarkAction>]}
 */
function useBookmarkModifyReducer() {
  /**
   * @param {Array.<Bookmark.YouTubeBookmark>} state 
   * @param {BookmarkAction} action 
   * @returns {Array.<Bookmark.YouTubeBookmark>}
   */
  function bookmarkReducer(_, action) {
    const { type } = action;
    if (type === "LOAD") {
      return BookmarkStorage.getAllBookmarks();
    }
    if (type === "ADD") {
      const [reason, success] = BookmarkStorage.addBookmark(action.bookmark);
      if (!success) {
        console.log(reason);
      }
      return BookmarkStorage.getAllBookmarks();
    }
    if (type === "DELETE") {
      const [reason, success] = BookmarkStorage.removeBookmark(action.bookmark);
      if (!success) {
        console.log(reason);
      }
      return BookmarkStorage.getAllBookmarks();
    }
    return [];
  }

  return useReducer(bookmarkReducer, BookmarkStorage.getAllBookmarks());
}


export default App;
