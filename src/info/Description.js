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
      <div className="window-inner">
        <div
          className="window-inner-title"
          style={{ marginBottom: 12 }}>
          동영상 설명
        </div>
        <ModifiableTextArea
          bookmark={bookmark}
          text={bookmark.description}
          style={{
            paddingLeft: 6,
            height: 95
          }}
          onTextChange={onTextChange}
          type="textarea-info" />
      </div>
    </div>
  );
}

export default Description;
