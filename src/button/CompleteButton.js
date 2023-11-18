import React from "react";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.JSX.Element}
 */
function CompleteButton(props) {
  return (
    <div
      className="complete-button"
      onClick={props.onClick}>
      완료
    </div>
  );
}

export default CompleteButton;
