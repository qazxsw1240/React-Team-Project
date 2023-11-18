import React from "react";
import ModifiableTextArea from "input/ModifiableTextArea";

function Description(props) {
  return (
    <div className="window modifiable"
      style={props.style}>
      <div className="window-inner"
        style={{ height: "100%" }}>
        <font
          className="window-inner-title">
          동영상 설명
        </font>
        <ModifiableTextArea
          bookmark={props.bookmark}
          text={props.bookmark.description}
          style={{
            height: "90px",
            marginTop: "12px"
          }}
          attributes={{
            rows: 5,
            cols: 66,
            maxLength: 300,
            height: "85px",
            marginTop: "12px"
          }} />
      </div>
    </div>
  );
}

export default Description;
