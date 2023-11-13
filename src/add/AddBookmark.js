import React, { useContext } from "react";

import Modal from "modal/Modal";
import CrossButton from "button/CrossButton";
import * as Bookmark from "db/bookmark";

import LongThumbnail from "img/youtube_bookmark_thumbnail.png";

import Img from "img/Img";
import ModifiableInput from "input/ModifiableInput";
import ModifiableTextArea from "input/ModifiableTextArea";
import CancelButton from "button/CancelButton";
import CompleteButton from "button/CompleteButton";

import { BookmarkStorage } from "db/localStorage";
import { executeSwal } from "alert/executeSwal";

/**
 * @type {React.Context.<[boolean, React.Dispatch.<React.SetStateAction.<boolean>>]>}
 */
export const AddBookmarkModalVisibleContext = React.createContext(null);

function AddBookmark() {
  const [visible] = useContext(AddBookmarkModalVisibleContext);
  const AddBookmarkObject = {
    id: "",
    url: "",
    title: "",
    description: "",
    timelines: []
  }

  return (
    <Modal visible={visible} style={{
      minWidth: "var(--bookmark-info-min-width)",
      minHeight: "var(--bookmark-info-min-height)",
      width: "820px",
      height: "510px"
    }}>
      <AddBookmarkHeader />
      <AddBookmarkBody bookmark={AddBookmarkObject} />
      <AddBookmarkFooter bookmark={AddBookmarkObject} />
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

      <div className="add-header-side">
        <CrossButton onClick={() => setVisible(false)} />
      </div>
    </div >
  );
}


function AddBookmarkBody(props) {

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
                    paddingLeft: "12px"
                  }}
                  bookmark={props.bookmark}
                  status="new"
                  category="title"
                  text="제목 입력"
                  type="input-text"
                  size={51}
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
                    paddingLeft: "12px"
                  }}
                  bookmark={props.bookmark}
                  status="new"
                  category="url"
                  text="링크 입력"
                  type="input-text"
                  size={51}
                />
              </td>
            </tr>
            <tr>
              <th>
                <font size="5">설명</font>
              </th>
              <td>
                <ModifiableTextArea
                  style={{ height: "90px" }}
                  attributes={{
                    cols: 53,
                    maxLength: 250,
                    height: "80px"
                  }}
                  bookmark={props.bookmark}
                  status="new"
                  text="description"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

function AddBookmarkFooter(props) {
  const [, setVisible] = useContext(AddBookmarkModalVisibleContext);
  return (
    <div className="add-footer">
      <div className="add-footer-side" />

      <div className="add-footer-center">
        <CompleteButton onClick={() => {
          if (Bookmark.validationLink(props.bookmark.url) === false) {
            executeSwal("잘못된 url입니다!", "error");
            return;
          }

          props.bookmark.id = Bookmark.getYoutubeLinkId(props.bookmark.url);
          if (BookmarkStorage.getBookmarkById(props.bookmark.id) !== null) {
            executeSwal("이미 링크가 저장되어 있습니다!", "error");
            return;
          }

          (async () => {
            try {
              await BookmarkStorage.updateBookmark(props.bookmark, () => { });
            }
            catch (err) {
              console.error(err.message);
            }
            finally {
              setVisible(false);
            }
          })();

        }} />
        <CancelButton onClick={() => setVisible(false)} />
      </div>

      <div className="add-footer-side" />
    </div>
  );
}

export default AddBookmark;
