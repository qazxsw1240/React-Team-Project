import React from "react";
import { VscChromeClose } from "react-icons/vsc";

import "../BookmarkInfo.css";
import "../index.css";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.JSX.Element}
 */
function CrossButton(props) {
  const style = {
    ...(props.style ?? {}),
    width: 36,
    height: 36,
    display: "flex",
    alignItems: "center"
  };
  return (
    <div
      className="button"
      style={style}
      title="닫기"
      onClick={props.onClick}>
      <VscChromeClose style={{ margin: "0 auto" }} />
    </div>
  );
}

export default CrossButton;
