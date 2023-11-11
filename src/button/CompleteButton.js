import React from "react";
import { VscChromeClose } from "react-icons/vsc";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.JSX.Element}
 */
function CompleteButton(props) {
  return (
    <div
      className="CompleteButton"
      onClick={props.onClick}>
      완료
    </div>
  );
}

export default CompleteButton;
