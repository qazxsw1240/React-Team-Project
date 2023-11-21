import React from "react";
import { VscChromeClose } from "react-icons/vsc";

/**
 * @param {React.HTMLAttributes} props
 * @returns {React.JSX.Element}
 */
function CrossButton(props) {
  const { onClick } = props;
  return (
    <div
      className="cross-button"
      onClick={onClick}>
      <VscChromeClose
        style={{
          margin: "0 auto"
        }}
      />
    </div>
  );
}

export default CrossButton;
