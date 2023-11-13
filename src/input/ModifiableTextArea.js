import React, { useContext, useEffect, useState, useRef } from "react";


// props = {text : 문자열}
function ModifiableTextArea(props) {
  const [modifiable, setModifiable] = useState(false);
  const [text, setText] = useState(props.text);
  useEffect(() => { }, [text]);

  const changeText = (event) => {
    setText(() => event.target.value);
    setModifiable(() => false);

    props.bookmark[props.str_key] = event.target.value;
    console.log(props.bookmark)
  }

  const handleTextareaChange = (event) => {
    setText(event.target.value);
  };

  if (modifiable) {
    return (

      <div className="window modifiable" style={{
        height: props.attributes.height, marginTop: props.attributes.marginTop,
        marginBottom: props.attributes.marginBottom, display: "flex"
      }}>
        <textarea style={{ overflowY: "hidden", flexWrap: "wrap" }}
          defaultValue={props.status !== "new" ? text : ""}
          cols={props.attributes.cols}
          maxLength={props.attributes.maxLength}
          onChange={handleTextareaChange}
          placeholder="설명 입력"

          onKeyDown={(event) => { if (event.key === "Enter") { changeText(event) } }}
          onBlur={(event) => { changeText(event) }}

          autoFocus={true}
        />
      </div>

    );
  }

  return (
    <div className="window modifiable"
      onClick={() => setModifiable(() => true)}
      title="클릭해서 편집">
      <div className="input-text" style={{ ...props.style, paddingLeft: "12px" }}>
        {text}
      </div>
    </div>
  );
}

export default ModifiableTextArea;
