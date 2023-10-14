import * as Handler from "../util/error";
import * as Bookmark from "./bookmark";

/** 
 * @enum {string} 로컬 스토리지에 접근할 때 활용할 키 목록입니다.
 */
const KeyList = { Data: "youTubeBookmarkData" };

export const BookmarkStorage = {
  /** 
   * 북마크 데이터가 들어있습니다. 직접 변경하지 마세요.
   * @type {Map.<string, Bookmark.YouTubeBookmark>} 
   */
  _data: new Map(),

  /**
   * 북마크 데이터가 초기화됐는지 알려줍니다. 직접 변경하지 마세요.
   * @type {boolean}
   */
  _init: false,

  /**
   * 북마크 데이터가 초기화돼 있는지 확인합니다.
   * 
   * @returns {boolean} 데이터가 초기화돼 있으면 true, 그렇지 않으면 false.
   */
  isInitialized() {
    return this._init;
  },

  /**
   * 북마크 데이터를 로컬 스토리지에서 읽어와 초기화합니다.
   * 한 번 초기화하면 다음 새로고침 때까지 더 이상 작동하지 않습니다.
   */
  initializeData() {
    if (this._init) {
      return;
    }
    const data = localStorage.getItem(KeyList.Data);
    if (!data) {
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
  },

  /**
   * 북마크 데이터를 추가합니다. 중복된 ID의 데이터가 존재하면 추가하지 않습니다.
   * 
   * @param {Bookmark.YouTubeBookmark} bookmark 추가할 북마크 데이터.
   * @returns {Handler.ErrorHandler} 성공 여부를 알려주는 오류 핸들러.
   */
  addBookmark(bookmark) {
    if (this._data.has(bookmark.id)) {
      return ["Video ID duplicated", false];
    }
    this._data.set(bookmark.id, bookmark);
    updateLocalStorageData(this);
    return Handler.success();
  },

  /**
   * @overload
   * 북마크 데이터를 갱신합니다. 해당 북마크 데이터와 일치하는 ID가 데이터에 없으면
   * 새로 추가합니다.
   * 
   * @param {Bookmark.YouTubeBookmark} bookmark 새 북마크 데이터.
   * @returns {Handler.ErrorHandler} 성공 여부를 알려주는 오류 핸들러.
   */
  /**
   * @overload
   * 북마크 데이터를 URL 기반으로 갱신합니다. 해당 URL의 ID와 일치하는 북마크 데이터가 없으면
   * 새로 추가합니다.
   * 
   * @param {string} url 갱신할 북마크의 URL.
   * @param {(bookmark: YouTubeBookmark) => void} updater 데이터를 갱신할 콜백 함수.
   * @returns {Handler.ErrorHandler} 성공 여부를 알려주는 오류 핸들러.
   */
  /**
   * @param {string|Bookmark.YouTubeBookmark} bookmarkOrUrl
   * @param {(bookmark: Bookmark.YouTubeBookmark) => void=} updater 
   * @returns {Handler.ErrorHandler}
   */
  updateBookmark(bookmarkOrUrl, updater) {
    if (typeof bookmarkOrUrl === "string") { // url
      const url = new URL(bookmarkOrUrl);
      const id = Bookmark.extractYouTubeId(url);
      const data = this._data.get(id);
      if (!updater) {
        return Handler.fail("Updater callback must be required");
      }
      if (!data) {
        const pureUrl = Bookmark.extractPureYouTubeUrl(url);
        const newData = Bookmark.createYouTubeBookmark(id, pureUrl, "");
        updater(newData);
        return this.addBookmark(newData);
      }
      updater(data);
      return Handler.success();
    }
    if (typeof bookmarkOrUrl === "object") { // bookmark object
      /** @type {Bookmark.YouTubeBookmark} */
      const bookmark = bookmarkOrUrl;
      const id = bookmark.id;
      const data = this._data.get(id);
      if (!data) {
        return this.addBookmark(bookmark);
      }
      this._data.set(id, bookmark);
      updateLocalStorageData(this);
      return Handler.success();
    }
    return Handler.fail("Illegal type provided");
  },


  /**
   * 해당 북마크를 제거합니다.
   * 
   * @param {Bookmark.YouTubeBookmark} bookmark 제거할 북마크
   * @returns {Handler.ErrorHandler} 성공 여부를 알려주는 오류 핸들러.
   */
  removeBookmark(bookmark) {
    if (!this._data.has(bookmark.id)) {
      return Handler.fail("Cannot find any bookmark with the ID: " + bookmark.id);
    }
    this._data.delete(bookmark.id);
    updateLocalStorageData(this);
    return Handler.success();
  },

  /**
   * 모든 북마크를 반환합니다.
   * 
   * @returns {Array.<Bookmark.YouTubeBookmark>} 북마크 데이터.
   */
  getAllBookmarks() {
    return [...this._data.values()];
  },

  /**
   * @typedef {Function} BookmarkFilter
   * @param {Bookmark.YouTubeBookmark} bookmark
   * @returns {boolean}
   */
  /**
   * 콜백 함수로 조건을 제공하여 조건에 맞는 북마크를 반환합니다.
   * 
   * @param {BookmarkFilter} filter 
   * @returns {Array.<Bookmark.YouTubeBookmark>}
   */
  findBookmarks(filter) {
    /** @type {Array.<Bookmark.YouTubeBookmark>} */
    const ret = [];
    for (const bookmark of this._data.values()) {
      if (filter(bookmark)) {
        ret.push(bookmark);
      }
    }
    return ret;
  },

  /**
   * 해당 비디오 ID가 있는 북마크를 반환합니다. 일치하는 북마크가 없으면 null을 반환합니다.
   * 
   * @param {string} id 북마크를 찾을 유튜브 동영상 ID.
   * @returns {?Bookmark.YouTubeBookmark} 북마크 데이터를 반환하고, 찾지 못하면 null을 반환함.
   */
  getBookmarkById(id) {
    return this._data.get(id) ?? null;
  },

  /**
   * 해당 비디오 URL의 ID와 일치하는 북마크를 반환합니다. 일치하는 북마크가 없으면 null을 반환합니다.
   * 
   * @param {string} url 북마크를 찾을 URL 문자열.
   * @returns {?Bookmark.YouTubeBookmark} 북마크 데이터를 반환하고, 찾지 못하면 null을 반환함.
   */
  getBookmarkByUrl(url) {
    const id = Bookmark.extractYouTubeId(new URL(url));
    return this._data.get(id) ?? null;
  }
};

/**
 * 로컬 스토리지에 현재 북마크 데이터 정보를 저장합니다.
 * 
 * @param {BookmarkStorage} data 로컬 스토리지에 저장될 데이터 객체
 */
function updateLocalStorageData(data) {
  localStorage.setItem(KeyList.Data, JSON.stringify([...data._data.values()]));
}
