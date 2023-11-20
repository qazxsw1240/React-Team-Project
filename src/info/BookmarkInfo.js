import React, { useContext, useEffect, useState } from "react";

import CrossButton from "button/CrossButton";
import * as Bookmark from "db/bookmark";
import Modal from "modal/Modal";

import LongThumbnail from "img/youtube_bookmark_thumbnail.png";


import CancelButton from "button/CancelButton";
import CompleteButton from "button/CompleteButton";
import { BookmarkStorage } from "db/localStorage";
import Img from "img/Img";
import Description from "info/Description";
import Iframe from "info/Iframe";
import TimeLines from "info/TimeLines";
import ModifiableInput from "input/ModifiableInput";

/**
 * @type {React.Context.<[boolean, React.Dispatch.<React.SetStateAction.<boolean>>]>}
 */
export const BookmarkInfoModalVisibleContext = React.createContext(null);

/**
 * @typedef {[Bookmark.YouTubeBookmark, React.Dispatch<React.SetStateAction<Bookmark.YouTubeBookmark>>]} BookmarkDispatcher
 */

/**
 * @typedef {object} BookmarkDispatcherProps
 * @property {BookmarkDispatcher} dispatcher
 */

/**
 * @typedef {object} BookmarkInfoProp
 * @property {Bookmark.YouTubeBookmark} bookmark
 */

/**
 * @param {BookmarkInfoProp} props
 * @returns {React.JSX.Element}
 */
function BookmarkInfo(props) {
  const [visible] = useContext(BookmarkInfoModalVisibleContext);
  return (
    <Modal visible={visible} style={
      {
        minWidth: "var(--info-min-width)",
        minHeight: "var(--info-min-height)",
        width: "var(--info-width)",
        height: "var(--info-height)"
      }
    }>
      <BookmarkInfoHeader {...props} />
      <BookmarkInfoBody {...props} />
      {/* <BookmarkInfoFooter {...props} /> */}
    </Modal>
  );
}

/**
 * @param {BookmarkInfoProp&BookmarkDispatcherProps} props
 * @returns {React.JSX.Element}
 */
function BookmarkInfoHeader(props) {
  const { bookmark } = props;
  const [, setVisible] = useContext(BookmarkInfoModalVisibleContext);

  /**
   * @param {string} text 
   */
  function onTextChange(text) {
    BookmarkStorage.updateBookmark(bookmark, b => b.title = text);
  }

  return (
    <div className="info-header">
      <div className="info-header-side">
        <Img src={LongThumbnail} />
      </div>
      <div className="info-header-center">
        <ModifiableInput
          bookmark={bookmark}
          category="title"
          type="input-title-text"
          style={{ height: 36, paddingLeft: "12px" }}
          text={bookmark.title}
          size={47}
          onTextChange={onTextChange} />
      </div>
      <div className="info-header-side">
        <CrossButton onClick={() => setVisible(false)} />
      </div>
    </div>
  );
}


/**
 *
 * @param {BookmarkInfoProp&BookmarkDispatcherProps} props
 * @returns {React.JSX.Element}
 */
function BookmarkInfoBody(props) {
  const { bookmark } = props;

  /**
   * @param {string} text 
   */
  function onTextChange(text) {
    BookmarkStorage.updateBookmark(bookmark, b => b.description = text);
  }

  // timeline for iframe
  const [currentTimeline, setCurrentTimeline] = useState();

  // timelines for timeline modification
  const [timelines, setTimelines] = useState(bookmark.timelines);

  useEffect(() => {
    BookmarkStorage.updateBookmark(bookmark, b => b.timelines = timelines);
  }, [timelines]);

  return (
    <div className="info-body">
      <div style={{
        width: "60%",
        float: "left"
      }}>
        <div style={{
          marginRight: "calc(var(--component-margin)/2)",
          display: "flex",
          flexDirection: "column"
        }}>
          <Iframe
            title={bookmark.title}
            src={
              !currentTimeline || currentTimeline.length === 0 ?
                `https://www.youtube.com/embed/${bookmark.id}` :
                `https://www.youtube.com/embed/${bookmark.id}?start=${currentTimeline}`
            } />
          <Description
            bookmark={bookmark}
            style={{
              marginTop: 12,
              height: "150px"
            }}
            onTextChange={onTextChange} />
        </div>
      </div>
      <div style={{
        width: "40%",
        float: "right",
      }}>
        <TimeLines
          style={{
            marginLeft: "calc(var(--component-margin)/2)",
            height: "inherit"
          }}
          bookmark={bookmark}
          timelines={timelines}
          onTimelineChange={ts => {
            setTimelines(() => ts);
          }}
          onTimelineSelected={setCurrentTimeline}
        />
      </div>
    </div>
  );
}

/**
 * @deprecated
 * @param {*} props 
 * @returns 
 */
function BookmarkInfoFooter(props) {
  const [, setVisible] = useContext(BookmarkInfoModalVisibleContext);
  return (
    <div className="info-footer">
      <div className="info-footer-side">
      </div>
      <div className="info-footer-center">
      </div>
      <div className="info-footer-side">
        <CompleteButton onClick={() => setVisible(false)} />
        <CancelButton onClick={() => setVisible(false)} />
      </div>
    </div>
  );
}

export default BookmarkInfo;
