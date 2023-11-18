import React, { useContext, useEffect, useState } from "react";

import Modal from "modal/Modal";
import CrossButton from "button/CrossButton";
import * as Bookmark from "db/bookmark";

import LongThumbnail from "img/youtube_bookmark_thumbnail.png";


import Img from "img/Img";
import Iframe from "info/Iframe";
import ModifiableInput from "input/ModifiableInput";
import Description from "info/Description";
import TimeLines from "info/TimeLines";
import CancelButton from "button/CancelButton";
import CompleteButton from "button/CompleteButton";

/**
 * @type {React.Context.<[boolean, React.Dispatch.<React.SetStateAction.<boolean>>]>}
 */
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
      <BookmarkInfoFooter {...props} />
    </Modal>
  );
}

/**
 * @param {BookmarkInfoProp} props
 * @returns {React.JSX.Element}
 */
function BookmarkInfoHeader(props) {
  const [, setVisible] = useContext(BookmarkInfoModalVisibleContext);
  return (
    <div className="info-header">

      <div className="info-header-side">
        <Img src={LongThumbnail} />
      </div>

      <div className="info-header-center">
        <ModifiableInput
          bookmark={props.bookmark}
          category="title"
          type="input-title-text"
          style={{ height: 36, paddingLeft: "12px" }}
          text={props.bookmark.title}
          size={47} />
      </div>

      <div className="info-header-side">
        <CrossButton onClick={() => setVisible(false)} />
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
            src={`https://www.youtube.com/embed/${bookmark.id}`}
          />
          <Description
            bookmark={props.bookmark}
            style={{
              marginTop: 12,
              height: "150px"
            }} />
        </div>
      </div>

      <div style={{
        width: "40%",
        float: "right",
      }}>
        <TimeLines style={{
          marginLeft: "calc(var(--component-margin)/2)"
        }} />
      </div>

    </div>
  );
}

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
