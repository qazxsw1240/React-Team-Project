import React from "react";

function Img(props) {
  return (
    <img style={
      {
        width: "var(--bookmark-image-width)",
        height: "36px",
        float: "left"
      }
    }
      src={props.src}
      alt="thumbnail" />
  );
}

export default Img;
