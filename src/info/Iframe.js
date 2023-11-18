import React from "react";

function Iframe(props) {
  return (
    <div style={props.style}>
      <iframe style={{
        width: "100%",
        height: 360,
        borderWidth: 0,
        borderRadius: 12
      }}
        title={props.title}
        src={props.src}
        allowFullScreen={true} />
    </div>
  );
}

export default Iframe;
