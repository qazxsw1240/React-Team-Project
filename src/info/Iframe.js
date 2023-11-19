import React from "react";

/**
 * @typedef {object} IframeProps
 * @property {string} title
 * @property {string} src
 */

/**
 * @param {IframeProps&React.HTMLAttributes} props 
 * @returns {React.JSX.Element}
 */
function Iframe(props) {
  const { style, title, src } = props;
  return (
    <div style={style}>
      <iframe style={{
        width: "100%",
        height: 360,
        borderWidth: 0,
        borderRadius: 12
      }}
        title={title}
        src={src}
        allowFullScreen={true} />
    </div>
  );
}

export default Iframe;
