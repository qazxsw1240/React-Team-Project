import * as Bookmark from "./bookmark";

/**
 * @typedef BookmarkStorageType
 * 
 * @property {Map.<string, Bookmark.YouTubeBookmark>} _data
 * @property {boolean} _init
 * @property {InitializeData} initializeData 
 * @property {AddBookmark} addBookmark
 * @property {UpdateBookmark} updateBookmark
 * @property {RemoveBookmark} removeBookmark
 * @property {GetAllBookmarks} getAllBookmarks
 * @property {FindBookmarks} findBookmarks
 */

/**
 * @callback InitializeData
 * @returns {void}
 */

/**
 * @callback AddBookmark
 * @param {Bookmark.YouTubeBookmark} bookmark
 * @returns {void}
 */

/**
 * @callback UpdateBookmark
 * @param {Bookmark.YouTubeBookmark} bookmark
 * @returns {void}
 */

/**
 * @callback RemoveBookmark
 * @param {Bookmark.YouTubeBookmark} bookmark
 * @returns {void}
 */

/**
 * @callback GetAllBookmarks
 * @returns {Array.<Bookmark.YouTubeBookmark>}
 */

/**
 * @callback FindBookmarks
 * @param {FindBookmarksFilter} filter
 * @returns {Array.<Bookmark.YouTubeBookmark>}
 */

/**
 * @callback FindBookmarksFilter
 * @param {Bookmark.YouTubeBookmark} bookmark
 * @returns {boolean}
 */

/** @enum {string} */
const KeyList = { Data: "youTubeBookmarkData" };

/**
 * @param  {...*} args
 * @returns {*}
 */
const throwImpl = (...args) => {
    throw new Error("Function not implemented");
};

/**
 * @type {BookmarkStorageType}
 * @constant
*/
export const BookmarkStorage = {
    _data: new Map(),
    _init: false,
    initializeData: throwImpl,
    addBookmark: throwImpl,
    updateBookmark: throwImpl,
    removeBookmark: throwImpl,
    getAllBookmarks: throwImpl,
    findBookmarks: throwImpl
};

/**
 * @this {BookmarkStorage}
*/
BookmarkStorage.initializeData = function () {
    if (this._init) {
        return;
    }
    const data = localStorage.getItem(KeyList.Data);
    if (data === null) {
        localStorage.setItem(KeyList.Data, "[]");
        return;
    }
    const json = JSON.parse(data);
    if (!Array.isArray(json)) {
        throw new Error("Data corrupted!");
    }
    for (const data of json) {
        this._data.set(data.id, data);
    }
    this._init = true;
};

/** @this {BookmarkStorage} */
BookmarkStorage.addBookmark = function (bookmark) {
    if (this._data.has(bookmark.id)) {
        throw new Error("Video ID duplicated");
    }
    this._data.set(bookmark.id, bookmark);
    localStorage.setItem(KeyList.Data, JSON.stringify(this._data.values()));
};

/** @this {BookmarkStorage} */
BookmarkStorage.updateBookmark = function (bookmark) {
    const updatedBookmarks = this.findBookmarks(b => Bookmark.compareYouTubeBookmark(b, bookmark));
    if (updatedBookmarks.length === 0) {
        return this.addBookmark(bookmark);
    }
    const [updated] = updatedBookmarks;
    // update
    updated.title = bookmark.title;
    updated.description = bookmark.description;
    updated.timelines = bookmark.timelines;
};

/** @this {BookmarkStorage} */
BookmarkStorage.removeBookmark = function (bookmark) {
    if (!this._data.has(bookmark.id)) {
        return;
    }
    this._data.delete(bookmark.id);
    updateLocalStorageData(this);
};

/** @this {BookmarkStorage} */
BookmarkStorage.getAllBookmarks = function () {
    return [...this._data.values()];
};

/** @this {BookmarkStorage} */
BookmarkStorage.findBookmarks = function (filter) {
    return this.getAllBookmarks().filter(filter);
};

/**
 * @param {BookmarkStorageType} data 
 */
function updateLocalStorageData(data) {
    localStorage.setItem(KeyList.Data, JSON.stringify([...data._data.values()]));
}
