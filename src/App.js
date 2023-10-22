import React, { useEffect, useState } from "react";
import BookmarkInfo, { BookmarkInfoModalVisibleContext } from "./BookmarkInfo";

import { BookmarkStorage } from "./db/localStorage";

import "./index.css";

const BookmarkInfoModalVisibleContextProvider = BookmarkInfoModalVisibleContext.Provider;

function App() {
  useEffect(() => {
    BookmarkStorage.initializeData();
    BookmarkStorage.updateBookmark("https://youtu.be/5bId3N7QZec", () => { });
  }, []);
  const bookmarkInfoModalVisibleContext = useState(false);
  const [visible, setVisible] = bookmarkInfoModalVisibleContext;
  const bookmarks = BookmarkStorage.getAllBookmarks();
  return (
    <>
      <div className="text-window modifiable">
        <div className="text-title text-window-inner">Hello, World!</div>
      </div>
      <BookmarkInfoModalVisibleContextProvider value={bookmarkInfoModalVisibleContext}>
        {
          visible ?
            <BookmarkInfo bookmark={bookmarks[0]} /> :
            <></>
        }
      </BookmarkInfoModalVisibleContextProvider>
      <button onClick={() => setVisible(() => true)}>show</button>
    </>
  );
}

export default App;
