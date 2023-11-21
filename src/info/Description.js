import * as Bookmark from "db/bookmark";
import ModifiableTextArea from "input/ModifiableTextArea";
import React from "react";

/**
 * @typedef {object} DescriptionProps
 * @property {Bookmark.YouTubeBookmark} bookmark
 * @property {(text:string)=>void=} onTextChange
 */

/**
 * @param {DescriptionProps&React.HTMLAttributes} props 
 * @returns {React.JSX.Element}
 */
function Description(props) {
  const { style, bookmark, onTextChange } = props;
  return (
    <div className="window modifiable"
      style={style}>
      <div className="window-inner"
        style={{ height: "100%" }}>
        <div
          className="window-inner-title">
          동영상 설명
        </div>
        <ModifiableTextArea
          bookmark={bookmark}
          text={bookmark.description}
          style={{
            height: "90px",
            marginTop: "12px"
          }}
          attributes={{
            rows: 5,
            cols: 66,
            height: "85px",
            marginTop: "12px"
          }}
          onTextChange={onTextChange} />
      </div>
    </div>
  );
}

export default Description;
