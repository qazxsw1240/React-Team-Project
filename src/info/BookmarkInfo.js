/**
 * bookmark는 {"id":"5bId3N7QZec",
 * "url":"https://youtu.be/5bId3N7QZec",
 * "title":"https://youtu.be/5bId3N7QZec",
 * "description":"",
 * "timelines":[]}
 */

import React, { useContext, useEffect, useState } from "react";

import Modal from "modal/Modal";
import CrossButton from "button/CrossButton";
import * as Bookmark from "db/bookmark";

import LongThumbnail from "img/youtube_bookmark_thumbnail.png";

// 추가 코드
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
// 전역으로 상태 설정
export const BookmarkInfoModalVisibleContext = React.createContext(null);

// 전역으로 상태 설정
const BookmarkInfoUpdateContext = React.createContext(null);

/**
 * @typedef {object} BookmarkInfoProp
 * @property {Bookmark.YouTubeBookmark} bookmark
 */

/**
 * @param {BookmarkInfoProp} props
 * @returns {React.JSX.Element}
 */

/**
 * props = {bookmark : bookmarks[0]} 객체
 *
 * <BookmarkInfoHeader {...props} />, <BookmarkInfoBody {...props} />에
 * {bookmark : bookmarks[0]} 데이터 전달
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
      <BookmarkInfoFooter {...props}/>
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
          str_key="title"
          type="input-title-text"
          style={{ height: 36, paddingLeft: "12px" }}
          text={props.bookmark.title}/>
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

      <div style={{ width: "60%", float: "left" }}>
        <div style={{
            marginRight: "calc(var(--component-margin)/2)",
            display: "flex",
            flexDirection: "column"}}>
          <Iframe
            title={bookmark.title}
            src={`https://www.youtube.com/embed/${bookmark.id}`}
            style={{ flexShrink: 0, flexGrow: 0 }}/>
          <Description bookmark={props.bookmark} style={{ marginTop: 12, flexShrink: 0, flexGrow: 1, height: "150px" }}/>
        </div>
      </div>

      <div style={{ width: "40%", height: "100%", float: "right", flexShrink: 0, flexGrow: 1}}>
          <TimeLines style={{ marginLeft: "calc(var(--component-margin)/2)" }}/>
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
