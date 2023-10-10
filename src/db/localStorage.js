import { Bookmark } from "./bookmark";

/**
 * @typedef BookmarkStorageType
 * @property {Array.<Bookmark>} _data
 * @type {object}
 * 
 * @property {() => void} initializeData
 * @property {(bookmark: Bookmark) => void} addBookmark 
 * @property {(bookmark: Bookmark) => void} removeBookmark
 * @property {() => Array.<Bookmark>} getAllBookmarks
 * @property {(filter: (bookmark: Bookmark) => boolean) => Array.<Bookmark>} findBookmarks
 */

const KeyList = { Data: "youTubeBookmarkData" };

/**
 * @param {...*} args
 * @returns {*}
 */
const unimplemented = (...args) => {
    throw new Error("Function not implemented.");
};

/**
 * @param {*} bookmark 
 * @returns {boolean}
 */
const isBookmark = bookmark => {
    return bookmark instanceof Bookmark;
};

/**
 * @type {BookmarkStorageType}
 * @constant
 */
export const BookmarkStorage = {
    _data: [],
    initializeData: unimplemented,
    addBookmark: unimplemented,
    removeBookmark: unimplemented,
    getAllBookmarks: unimplemented,
    findBookmarks: unimplemented
};

/**
 * @this {BookmarkStorage}
 * 
 * @returns {void}
 */
BookmarkStorage.initializeData = function () {
    const data = localStorage.getItem(KeyList.Data);
    if (data === null) {
        localStorage.setItem(KeyList.Data, "[]");
        return;
    }
    const json = JSON.parse(data);
    if (!Array.isArray(json) || !json.every(isBookmark)) {
        throw new Error("Data corrupted!");
    }
    this._data.push(...json);
};

/**
 * @this {BookmarkStorage}
 * 
 * @param {Bookmark} bookmark
 */
BookmarkStorage.addBookmark = function (bookmark) {
    this._data.push(bookmark);
    localStorage.setItem(KeyList.Data, JSON.stringify(this._data));
};

/**
 * @this {BookmarkStorage}
 */
BookmarkStorage.removeBookmark = function (bookmark) {
    this._data = this._data.filter(b => !b.compare(bookmark));
    localStorage.setItem(KeyList.Data, JSON.stringify(this._data));
};

/**
 * @this {BookmarkStorage}
 */
BookmarkStorage.getAllBookmarks = function () {
    return this._data;
};

/**
 * @this {BookmarkStorage}
 */
BookmarkStorage.findBookmarks = function (filter) {
    return this._data.filter(filter);
};
