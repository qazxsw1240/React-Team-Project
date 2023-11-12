import React from "react";
import { VscChromeClose } from "react-icons/vsc";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.JSX.Element}
 */
function CancelButton(props) {
  return (
    <div
      className="CancelButton"
      onClick={props.onClick}>
      취소
    </div>
  );
}

export default CancelButton;
