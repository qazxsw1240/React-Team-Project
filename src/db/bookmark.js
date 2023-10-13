/**
 * @typedef YouTubeBookmarkTimeline
 * @type {object}
 * @property {string} timeline
 */

/**
 * @typedef YouTubeBookmark
 * @type {object}
 * @property {string} id
 * @property {string} url
 * @property {string} title
 * @property {string} description
 * @property {Array.<YouTubeBookmarkTimeline>} timelines
 */


/** @constant {string} */
const YouTubeLongUrlHost = "www.youtube.com";

/** @constant {string} */
const YouTubeShortUrlHost = "youtu.be";

/**
 * @param {string} url
 * @param {string} title
 * @param {string} description
 * @returns {YouTubeBookmark}
 */
export function createYouTubeBookmark(url, title, description) {
  const urlInstance = new URL(url);
  const id = extractYouTubeId(urlInstance);
  const timeline = extractTimeline(urlInstance);
  const pureUrl = extractPureYouTubeUrl(urlInstance, id);
  return {
    id,
    url: pureUrl,
    title,
    description,
    timelines: timeline ? [timeline] : []
  };
}

/**
 * @param {YouTubeBookmark} b1
 * @param {YouTubeBookmark} b2
 * @returns {boolean}
 */
export function compareYouTubeBookmark(b1, b2) {
  return b1.id === b2.id;
}

/**
 * @param {URL} url
 * @returns {string}
 */
export function extractYouTubeId(url) {
  const host = url.host;
  if (host === YouTubeLongUrlHost) { // www.youtube.com
    const searchParams = url.searchParams;
    const id = searchParams.get("v") ?? "";
    if (id === "") {
      throw new TypeError("Cannot extract YouTube Video ID: " + url.toString());
    }
    return id;
  }
  if (host === YouTubeShortUrlHost) { // youtu.be
    const id = url.pathname.substring(1);
    if (id === "") {
      throw new TypeError("Cannot extract YoUTube Video ID: " + url.toString());
    }
    return id;
  }
  throw new TypeError("Cannot extract YoUTube Video ID: " + url.toString());
}

/**
 * @param {URL} url
 * @returns {?YouTubeBookmarkTimeline}
 */
function extractTimeline(url) {
  const host = url.href;
  if (host !== YouTubeLongUrlHost && host !== YouTubeShortUrlHost) {
    throw new TypeError("Cannot extract YouTube timeline: " + url.toString());
  }
  const searchParams = url.searchParams;
  const timeline = searchParams.get("t");
  if (!timeline) {
    return null;
  }
  if (timeline.endsWith("s")) { // format regulation
    return {
      timeline: timeline.substring(0, timeline.length - 1)
    };
  }
  return { timeline };
}

/**
 * @overload
 * @param {URL} url
 * @returns {string}
 */
/**
 * @overload
 * @param {URL} url
 * @param {string} id
 * @returns {string}
 */
/**
 * @param {URL} url
 * @param {string=} id
 * @returns {string}
 */
export function extractPureYouTubeUrl(url, id) {
  if (!id) {
    id = extractYouTubeId(url);
  }
  return `https://${YouTubeShortUrlHost}/${id}`;
}
