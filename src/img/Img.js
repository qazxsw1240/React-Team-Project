import React from "react";

/**
 * @typedef {object} ImgProps
 * @property {string} src
 */

/**
 * @param {ImgProps} props 
 * @returns {React.JSX.Element}
 */
function Img(props) {
  const { src } = props;
  return (
    <img
      style={{
        width: "var(--bookmark-image-width)",
        height: "36px",
        float: "left"
      }}
      src={src}
      alt="thumbnail" />
  );
}

export default Img;
