import React from "react";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.JSX.Element}
 */
function CancelButton(props) {
  return (
    <div
      className="cancel-button"
      onClick={props.onClick}>
      취소
    </div>
  );
}

export default CancelButton;
