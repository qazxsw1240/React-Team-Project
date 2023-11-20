import BookmarkInfo, { BookmarkInfoModalVisibleContext } from "info/BookmarkInfo";
import { useEffect, useState } from "react";

import { BookmarkStorage } from "db/localStorage";

import AddBookmark, { AddBookmarkModalVisibleContext } from "add/AddBookmark";
import BookmarkList from "BookmarkIList";

const BookmarkInfoModalVisibleContextProvider = BookmarkInfoModalVisibleContext.Provider;

const AddBookmarkModalVisibleContextProvider = AddBookmarkModalVisibleContext.Provider;

const App = () => {
  useEffect(() => {
    BookmarkStorage.initializeData();
    BookmarkStorage.updateBookmark("https://youtu.be/5bId3N7QZec", () => { });
  }, []);


  const bookmarkInfoModalVisibleContext = useState(false);
  const [infoVisible, setInfoVisible] = bookmarkInfoModalVisibleContext;


  const addBookmarkModalVisibleContext = useState(false);
  const [addVisible, setAddVisible] = addBookmarkModalVisibleContext;

  const bookmarks = BookmarkStorage.getAllBookmarks();


  return (
    <>
      <div className="window modifiable">
        <font className="window-inner-title">Hello, World!</font>
      </div>
      <BookmarkList />

      <BookmarkInfoModalVisibleContextProvider value={bookmarkInfoModalVisibleContext}>
        {infoVisible ? <BookmarkInfo bookmark={bookmarks[0]} /> : <></>}
      </BookmarkInfoModalVisibleContextProvider>
      <button onClick={() => setInfoVisible(() => true)}>show</button>

      <AddBookmarkModalVisibleContextProvider value={addBookmarkModalVisibleContext}>
        {addVisible ? <AddBookmark /> : <></>}
      </AddBookmarkModalVisibleContextProvider>
      <button onClick={() => setAddVisible(() => true)}>추가 +</button>
    </>
  );
};

export default App;
