export class Bookmark {
    /**
     * @param {string} url 
     * @param {string} title 
     * @param {string} thumbnail 
     * @param {string} description 
     * @param {Array.<BookmarkTimeline>} timelines 
     */
    constructor(url, title, thumbnail, description, timelines) {
        /**
         * @private
         */
        this._url = url;
        /**
         * @private
         */
        this._title = title;
        /**
         * @private
         */
        this._thumbnail = thumbnail;
        /**
         * @private
         */
        this._description = description;
        /**
         * @private
         */
        this._timelines = timelines;
    }

    /**
     * @returns {string}
     */
    get url() { return this._url; }

    /**
     * @returns {string}
     */
    get title() { return this._title; }

    /**
     * @returns {string}
     */
    get thumbnail() { return this._thumbnail; }

    /**
     * @returns {string}
     */
    get description() { return this._description; }

    /**
     * @returns {Array.<BookmarkTimeline>}
     */
    get startTimes() { return this._timelines; }

    /**
     * @param {*} bookmark 
     * @returns {boolean}
     */
    compare(bookmark) {
        if (!(bookmark instanceof Bookmark)) {
            return false;
        }
        return this._url === bookmark._url &&
            this._title === bookmark._title &&
            this._thumbnail === bookmark._thumbnail &&
            this._description === bookmark._description &&
            this._timelines.every((s, i) => s.compare(bookmark._timelines[i]));
    }
}

export class BookmarkTimeline {
    /**
     * @param {string} timeline 
     */
    constructor(timeline) {
        /**
         * @private
         */
        this._timeline = timeline;
    }

    /**
     * @returns {string}
     */
    get timeline() { return this._timeline; }

    /**
     * @param {*} timeline 
     * @returns {boolean}
     */
    compare(timeline) {
        return timeline instanceof BookmarkTimeline && this._timeline === timeline._timeline;
    }
}
