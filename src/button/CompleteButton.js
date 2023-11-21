import React from "react";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.JSX.Element}
 */
function CompleteButton(props) {
  const { onClick } = props;
  return (
    <div
      className="complete-button"
      onClick={onClick}>
      완료
    </div>
  );
}

export default CompleteButton;
