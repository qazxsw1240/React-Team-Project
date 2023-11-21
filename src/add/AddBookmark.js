import React, { useContext, useState } from "react";

import CrossButton from "button/CrossButton";
import * as Bookmark from "db/bookmark";
import Modal from "modal/Modal";

import LongThumbnail from "img/youtube_bookmark_thumbnail.png";

import CancelButton from "button/CancelButton";
import CompleteButton from "button/CompleteButton";
import Img from "img/Img";
import ModifiableInput from "input/ModifiableInput";
import ModifiableTextArea from "input/ModifiableTextArea";

import { executeSwal } from "alert/executeSwal";
import { BookmarkActionContext } from "App";
import { BookmarkStorage } from "db/localStorage";

/**
 * @type {React.Context.<[boolean, React.Dispatch.<React.SetStateAction.<boolean>>]>}
 */
export const AddBookmarkModalVisibleContext = React.createContext(null);

/**
 * @type {Bookmark.YouTubeBookmark}
 */
const EmptyBookmarkData = {
  id: "",
  url: "",
  title: "",
  description: "",
  timelines: []
};

function AddBookmark() {
  const [visible] = useContext(AddBookmarkModalVisibleContext);
  const [bookmarkData, setBookmarkData] = useState(EmptyBookmarkData);

  return (
    <Modal visible={visible} style={{
      minWidth: "var(--bookmark-info-min-width)",
      minHeight: "var(--bookmark-info-min-height)",
      width: 820,
      height: 510
    }}>
      <AddBookmarkHeader />
      <AddBookmarkBody bookmarkDataState={[bookmarkData, setBookmarkData]} />
      <AddBookmarkFooter bookmarkDataState={[bookmarkData, setBookmarkData]} />
    </Modal>
  );
}

function AddBookmarkHeader() {
  const [, setVisible] = useContext(AddBookmarkModalVisibleContext);
  return (
    <div className="add-header">
      <div className="add-header-side">
        <Img src={LongThumbnail} />
      </div>
      <div className="add-header-center" />
      <div
        className="add-header-side"
        title="창 닫기">
        <CrossButton onClick={() => setVisible(false)} />
      </div>
    </div >
  );
}

/**
 * @typedef {object} AddBookmarkBodyProps
 * @property {[Bookmark.YouTubeBookmark, React.Dispatch.<React.SetStateAction.<Bookmark.YouTubeBookmark>>]} bookmarkDataState
 */
/**
 * 
 * @param {AddBookmarkBodyProps} props 
 * @returns {React.JSX.Element}
 */
function AddBookmarkBody(props) {
  const [bookmarkData, setBookmarkData] = props.bookmarkDataState;
  return (
    <div className="add-body"
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "50px"
      }}>
      <div>
        <table width="600px" height="330px">
          <tbody>
            <tr height="20%">
              <th width="27%">
                <font size="5">제목</font>
              </th>
              <td width="73%">
                <ModifiableInput
                  style={{
                    height: 36,
                    paddingLeft: "12px",
                    width: "400px"
                  }}
                  category="title"
                  text=""
                  type="input-text"
                  onTextChange={text => setBookmarkData(() => {
                    const clone = { ...bookmarkData };
                    clone.title = text;
                    return clone;
                  })}
                />
              </td>
            </tr>
            <tr height="20%">
              <th>
                <font size="5">링크</font>
              </th>
              <td width="70%">
                <ModifiableInput
                  style={{
                    height: 36,
                    paddingLeft: "12px",
                    width: "400px"
                  }}
                  category="url"
                  text=""
                  type="input-text"
                  onTextChange={text => setBookmarkData(() => {
                    const clone = { ...bookmarkData };
                    clone.url = text;
                    return clone;
                  })}
                />
              </td>
            </tr>
            <tr>
              <th>
                <font size="5">설명</font>
              </th>
              <td>
                <ModifiableTextArea
                  style={{
                    minHeight: "90px",
                    paddingLeft: "8px",
                    paddingTop: "8px"
                  }
                  text=""
                  onTextChange={text => setBookmarkData(() => {
                    const clone = { ...bookmarkData };
                    clone.description = text;
                    return clone;
                  })}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}


/**
 * @typedef {object} AddBookmarkFooterProps
 * @property {[Bookmark.YouTubeBookmark, React.Dispatch.<React.SetStateAction.<Bookmark.YouTubeBookmark>>]} bookmarkDataState
 */
/**
 * 
 * @param {AddBookmarkFooterProps} props 
 * @returns {React.JSX.Element}
 */
function AddBookmarkFooter(props) {
  const [, setVisible] = useContext(AddBookmarkModalVisibleContext);
  const [, setBookmarkAction] = useContext(BookmarkActionContext);
  const [bookmarkData] = props.bookmarkDataState;
  return (
    <div className="add-footer">
      <div className="add-footer-side" />
      <div className="add-footer-center">
        <CompleteButton onClick={() => {
          try {
            const data = Bookmark.createYouTubeBookmark(
              bookmarkData.url,
              bookmarkData.title.length === 0 ? bookmarkData.url : bookmarkData.title,
              bookmarkData.description
            );
            if (BookmarkStorage.getBookmarkById(data.id) !== null) {
              executeSwal("이미 해당 ID의 동영상이 저장되어 있습니다!", "error");
              return;
            }
            console.log(data);
            setBookmarkAction({ type: "ADD", bookmark: data });
            setVisible(false);
          } catch (e) {
            console.log(e);
            executeSwal("잘못된 URL입니다!", "error");
          }
        }} />
        <CancelButton onClick={() => setVisible(false)} />
      </div>
      <div className="add-footer-side" />
    </div>
  );
}

export default AddBookmark;
