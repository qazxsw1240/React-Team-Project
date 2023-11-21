/**
 * 북마크 데이터의 타임라인입니다. 
 * 
 * @typedef {object} YouTubeBookmarkTimeline
 * @property {string} timeline 
 * 타임라인을 나타내는 문자열입니다. 초 단위로 변환된 숫자를 문자열로 저장합니다. 
 * 예를 들어, 1분 40초인 타임라인은 "100"으로 변한됩니다.
 */

/**
 * 북마크 정보를 담는 데이터입니다.
 * 
 * @typedef YouTubeBookmark
 * @type {object}
 * @property {string} id
 * 유튜브 동영상의 ID. 
 * @property {string} url
 * 유튜브 동영상의 URL.
 * @property {string} title
 * 유튜브 동영상를 설명할 제목.
 * @property {string} description
 * 유튜브 동영상의 설명.
 * @property {Array.<YouTubeBookmarkTimeline>} timelines
 * 유튜브 동영상 북마크에 저장된 타임라인.
 */


/** 
 * @type {string} 
 * @constant
 */
const YouTubeLongUrlHost = "www.youtube.com";

/** 
 * @type {string}
 * @constant
 */
const YouTubeShortUrlHost = "youtu.be";

/**
 * 유튜브 북마크 데이터를 생성합니다. URL에 타임라인이 설정돼 있으면 타임라인에 추가합니다.
 * 
 * @param {string} url 북마크에 저장될 유튜브 동영상의 URL.
 * @param {string} title 북마크 제목.
 * @param {string} description 북마크 설명.
 * @returns {YouTubeBookmark} 생성된 북마크 데이터.
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
 * 두 북마크가 동일한지(ID가 동일한지) 검사합니다. 다른 요소가 달라도 ID가 같으면 참으로 판정합니다.
 * 
 * @param {YouTubeBookmark} b1 북마크 데이터.
 * @param {YouTubeBookmark} b2 북마크 데이터.
 * @returns {boolean} 두 북마크의 ID가 같은지 반환함.
 */
export function compareYouTubeBookmark(b1, b2) {
  return b1.id === b2.id;
}

/**
 * URL 객체로 유튜브 비디오의 ID를 추출합니다.
 * 
 * @param {URL} url ID를 추출할 URL 데이터.
 * @returns {string} 추출된 유튜브 비디오 ID.
 */
export function extractYouTubeId(url) {
  const host = url.host;
  if (host === YouTubeLongUrlHost) { // www.youtube.com
    const searchParams = url.searchParams;
    const id = searchParams.get("v");
    if (id === null) {
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
 * URL에 있는 타임라인을 추출합니다. 일반적으로 유튜브 URL에 있는 타임라인은 최대 1개입니다.
 * 
 * @param {URL} url 타임라인을 추출할 URL 객체.
 * @returns {?YouTubeBookmarkTimeline} 타임라인이 URL에 있으면 객체를 반환하고, 그렇지 않으면 null 반환함.
 */
export function extractTimeline(url) {
  const host = url.host;
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
 * URL 객체로 유튜브 동영상 ID만 있는 기본 URL을 생성합니다.
 * 
 * @param {URL} url 기본 URL을 생성할 URL 객체.
 * @returns {string} 생성된 기본 URL 문자열.
 */
/**
 * @overload
 * 제공된 ID로 유튜브 동영상 URL을 생성합니다.
 * 
 * @param {URL} url 기본 URL을 생성할 URL 객체.
 * @param {string} id 유튜브 동영상의 ID.
 * @returns {string} 생성된 기본 URL 문자열.
 */
/**
 * 제공된 ID로 유튜브 동영상 URL을 생성합니다. ID가 falsy로 판정될 경우 
 * URL 객체로부터 ID를 추출합니다.
 * 
 * @param {URL} url 기본 URL을 생성할 URL 객체.
 * @param {string=} id 유튜브 동영상의 ID.
 * @returns {string} 생성된 기본 URL 문자열.
 */
export function extractPureYouTubeUrl(url, id) {
  if (id === undefined) {
    id = extractYouTubeId(url);
  }
  return `https://${YouTubeShortUrlHost}/${id}`;
}


/**
 * 
 * @param {string} str 북마크 추가 시 입력하는 url 문자열
 * @returns {boolean} 입력된 url 문자열의 접두사가 https://www.youtube.com/watch?v=인지 여부
 */
function isYoutubeLink(str) {
  const youtubeLinkPrefix = "https://www.youtube.com/watch?v=";
  return str.startsWith(youtubeLinkPrefix);
}

/**
 * 
 * @param {string} str 접두사가 https://www.youtube.com/watch?v=인 url 문자열
 * @returns {string} 비디오 영상의 id를 반환 | 해시 문자열
 * 
 * str에서 get 요청 방식에서 매개변수 제거(& 뒤의 문자열 제거)
 * 
 */
export function getYoutubeLinkId(str) {
  const splitParameterArr = str.split("&");
  str = splitParameterArr[0];

  const youtubeLinkPrefix = "https://www.youtube.com/watch?v=";
  const startIndex = str.indexOf(youtubeLinkPrefix);

  if (startIndex !== -1) {
    return str.substring(startIndex + youtubeLinkPrefix.length);
  } else {
    return "";
  }
}

/**
 * 
 * @param {string} link 유튜브 비디오의 썸네일 링크 | https://img.youtube.com/vi/${youtubeId}/0.jpg
 * @param {string} youtubeId 유튜브 비디오의 아이디 | 해시 문자열 
 * @returns {Promise} 이미지를 html에 로딩하는 함수를 실행하는 Promise 객체
 */
function loadImage(link, youtubeId) {
  return new Promise((resolve, reject) => {
    const youtubeImg = new Image();

    youtubeImg.onload = () => { resolve(); };
    youtubeImg.onerror = () => { reject(new Error('이미지 로드 실패')); };

    youtubeImg.src = link;
    youtubeImg.id = youtubeId;
    youtubeImg.style.display = "none";

    document.getElementById("root").appendChild(youtubeImg);
  });
}

/**
 * 1. 입력된 문자열이 url 형식인지 확인
 * 2. url로부터 유튜브 video id 추출
 * 3. id를 이용하여 image 객체 생성 및 html에 로드 실행
 * 4. 로드된 이미지의 width, height 측정(정상 : width = 480, height = 360)
 * 
 * @param {string} str 문자열 
 * @returns {boolean} 입력된 문자열이 유효한 url인지 여부
 */
export function validationLink(str) {
  if (isYoutubeLink(str) === false) {
    return false;
  }

  const youtubeId = getYoutubeLinkId(str);
  const link = `https://img.youtube.com/vi/${youtubeId}/0.jpg`;

  (async () => {
    try {
      await loadImage(link, youtubeId);
    }
    catch (err) {
      console.error(err.message);
    }
    finally {
      const renderedImg = document.getElementById(youtubeId);
      return renderedImg.width > 120 && renderedImg.height > 90;
    }
  })();
}
