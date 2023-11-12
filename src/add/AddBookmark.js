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
import ModifiableInput from "input/ModifiableInput";
import ModifiableTextArea from "input/ModifiableTextArea";
import CancelButton from "button/CancelButton";
import CompleteButton from "button/CompleteButton";

import { BookmarkStorage } from "db/localStorage";
import { executeSwal } from "alert/executeSwal";

/**
 * @type {React.Context.<[boolean, React.Dispatch.<React.SetStateAction.<boolean>>]>}
 */
// 전역으로 상태 설정
export const AddBookmarkModalVisibleContext = React.createContext(null);

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
function AddBookmark() {
  const [visible] = useContext(AddBookmarkModalVisibleContext);
  const AddBookmarkObject = {
    id : "",
    url : "",
    title : "",
    description :"",
    timelines :[]
  }
  return (
    <Modal visible={visible} style={
      {
        minWidth: "var(--bookmark-info-min-width)",
        minHeight: "var(--bookmark-info-min-height)",
        width: "820px",
        height: "510px"
      }
    }>
      <AddBookmarkHeader/>
      <AddBookmarkBody bookmark={AddBookmarkObject}/>
      <AddBookmarkFooter bookmark={AddBookmarkObject}/>
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

      <div className="add-header-center">
      </div>

      <div className="add-header-side">
        <CrossButton onClick={() => setVisible(false)} />
      </div>

    </div>
  );
}


function AddBookmarkBody(props) {

  return (
    <div className="add-body" style={{display: "flex", 
    justifyContent: "center", alignItems: "center", 
    marginTop: "50px"}}>
      <div style={{textAlign: "center"}}>
      
      <table width="600px" height="330px">
        <thead></thead>
        <tbody>
        <tr height="20%">
          <th width="28%"><font size="5">제목</font></th>
          <td width="72%">
            <ModifiableInput
            bookmark={props.bookmark}
            status="new"
            str_key="title" 
            text="제목 입력"
            type="input-text"
            style={{ height: 36, paddingLeft: "12px" }}/>
          </td>
        </tr>
        <tr height="20%">
          <th><font size="5">링크</font></th>
          <td width="70%">
            <ModifiableInput
            bookmark={props.bookmark}
            status="new"
            str_key="url" 
            text="링크 입력"
            type="input-text"
            style={{ height: 36, paddingLeft: "12px" }}/>
          </td>
        </tr>
        <tr>
          <th><font size="5">설명</font></th>
          <td><ModifiableTextArea 
               bookmark={props.bookmark}
               status="new"
               str_key="description"
               text="description" style={{height: "90px"}}
               attributes={{cols: 52, maxLength: 250, height: "80px", marginTop: "5px"}}/></td>
        </tr>
        </tbody>
        <tfoot></tfoot>
      </table>
      </div>
      
    </div>
  );
}

function AddBookmarkFooter(props) {
  const [, setVisible] = useContext(AddBookmarkModalVisibleContext);
  return (
    <div className="add-footer">

      <div className="add-footer-side">
      </div>

      <div className="add-footer-center">
        <CompleteButton onClick={() => {
          if (Bookmark.validationLink(props.bookmark.url) === false) {
            executeSwal("잘못된 url입니다!", "warning");
            return;
          }
          
          props.bookmark.id = Bookmark.getYoutubeLinkId(props.bookmark.url);
          if (BookmarkStorage.getBookmarkById(props.bookmark.id) !== null) {
            executeSwal("이미 링크가 저장되어 있습니다!", "warning");
            return;
          }

          (async () => {
            try {
                await BookmarkStorage.updateBookmark(props.bookmark, ()=>{});
            }
            catch(err){
                console.error(err.message);
            }
            finally{
              setVisible(false);
            }
          })();
          
          }} /> 
        <CancelButton onClick={() => setVisible(false)} />
      </div>

      <div className="add-footer-side">
      </div>

    </div>
  );


}

export default AddBookmark;
