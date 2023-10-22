import React, { useContext, useEffect, useState } from "react";

import Modal from "./Modal";
import CrossButton from "./button/CrossButton";
import * as Bookmark from "./db/bookmark";

import "./BookmarkInfo.css";
import "./index.css";
import LongThumbnail from "./youtube_bookmark_thumbnail.png";

/** 
 * @type {React.CSSProperties} 
 */
const BookmarkInfoModalCssProperties = {
  minWidth: "var(--bookmark-info-min-width)",
  minHeight: "var(--bookmark-info-min-height)",
  width: "var(--bookmark-info-width)",
  height: "var(--bookmark-info-height)"
};

/**
 * @type {React.Context.<[boolean, React.Dispatch.<React.SetStateAction.<boolean>>]>}
 */
// @ts-ignore
export const BookmarkInfoModalVisibleContext = React.createContext(null);

const BookmarkInfoUpdateContext = React.createContext(null);

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
    <Modal
      visible={visible}
      style={BookmarkInfoModalCssProperties}>
      <BookmarkInfoHeader {...props} />
      <BookmarkInfoBody {...props} />
    </Modal>
  );
}

/**
 * @param {BookmarkInfoProp} props 
 * @returns {React.JSX.Element}
 */
function BookmarkInfoHeader(props) {
  const [, setVisible] = useContext(BookmarkInfoModalVisibleContext);
  const bookmark = props.bookmark;
  return (
    <div className="bookmark-info-header">
      <div className="bookmark-info-header-side">
        <img
          src={LongThumbnail}
          width="var(--bookmark-image-width)"
          height="36px"
          alt="thumbnail"
          style={{ float: "left" }} />
      </div>
      <ModifiableInput
        className="bookmark-info-header-center"
        text={bookmark.title} />
      <div className="bookmark-info-header-side">
        <CrossButton
          style={{
            float: "right",
            color: "white",
            backgroundColor: "red",
            fontSize: "20px"
          }}
          onClick={() => setVisible(false)} />
      </div>
    </div>
  );
}

/**
 * 
 * @param {BookmarkInfoProp} props 
 * @returns {React.JSX.Element}
 */
function BookmarkInfoBody(props) {
  const { bookmark } = props;
  return (
    <div className="bookmark-info-body" style={{ height: "100%" }}>
      <div style={{ width: "60%", float: "left" }}>
        <div style={{ marginRight: "calc(var(--component-margin)/2)", display: "flex", flexDirection: "column" }}>
          <div style={{ flexShrink: 0, flexGrow: 0 }}>
            <iframe
              title={bookmark.title}
              src={`https://www.youtube.com/embed/${bookmark.id}`}
              allowFullScreen={true}
              style={{
                width: "100%",
                height: 360,
                borderWidth: 0,
                borderRadius: 12,
              }}>
            </iframe>
          </div>
          <div className="text-window modifiable" style={{ marginTop: 12, flexShrink: 0, flexGrow: 1 }}>
            <div className="text-window-inner" style={{ height: "100%" }}>
              <div className="bookmark-title-text">
                동영상 설명
              </div>
              Descriptions
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "40%", height: "100%", float: "right", flexShrink: 0, flexGrow: 1 }}>
        <div style={{ marginLeft: "calc(var(--component-margin)/2)" }}>
          <div className="text-window">
            <div className="text-window-inner" style={{ marginTop: 0 }}>
              Timelines
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

/**
 * @typedef {object} ModifiableInputProp
 * @property {string} text
 */
/**
 *
 * @param {ModifiableInputProp&React.HTMLAttributes} props
 * @returns {React.JSX.Element}
 */
function ModifiableInput(props) {
  const [modifiable, setModifiable] = useState(false);
  const [text, setText] = useState(props.text);
  useEffect(() => { }, [text]);
  if (modifiable) {
    return (
      <div {...props}>
        <div className="bookmark-title modifiable text-window">
          <div className="text-window-inner">
            <input
              className="bookmark-title-text"
              type="text"
              defaultValue={text}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  // @ts-ignore
                  setText(() => event.target.value);
                  setModifiable(() => false);
                }
              }}
              onBlur={event => {
                setText(() => event.target.value);
                setModifiable(() => false);
              }}
              autoFocus={true}
              size={32} />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="bookmark-info-header-center"
      style={props.style}>
      <div
        className="bookmark-title modifiable text-window"
        onDoubleClick={() => setModifiable(() => true)}
        title="더블클릭해서 편집">
        <div className="text-window-inner bookmark-title-text" style={{ height: 36 }}>
          {text}
        </div>
      </div>
    </div>
  );
}

export default BookmarkInfo;
