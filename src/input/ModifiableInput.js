import { useEffect, useState } from "react";

/**
 * @typedef {object} ModifiableInputProps
 * @property {string} text
 * @property {(text:string)=>void=} onTextChange
 */

/**
 * 
 * @param {ModifiableInputProps} props 
 * @returns 
 */
function ModifiableInput(props) {
  const { onTextChange = s => undefined } = props;
  const [modifiable, setModifiable] = useState(false);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    onTextChange(text);
  }, [text]);

  const changeText = (event) => {
    setText(() => event.target.value);
    setModifiable(() => false);
    props.bookmark[props.category] = event.target.value;
  };

  const checkCategory = (category) => {
    return category === "title" ?
      "제목 입력" : "ex) https://www.youtube.com/watch?v=8PG55X45cUs";
  };

  const checkKeyEnter = (event) => {
    if (event.key === "Enter") {
      changeText(event);
    }
  };

  if (modifiable) {
    return (
      <div className="window modifiable"
        style={{ display: "flex" }}>
        <input
          className={props.type}
          style={{
            height: 30,
            paddingLeft: "10px",
            flexWrap: "wrap"
          }}
          type="text"
          defaultValue={props.status !== "new" ? text : ""}
          placeholder={checkCategory(props.category)}
          onKeyDown={(event) => { checkKeyEnter(event); }}
          onBlur={(event) => { changeText(event); }}
          autoFocus={true}
          size={props.size}
        />
      </div>
    );
  }

  return (
    <div className="window modifiable"
      onClick={() => setModifiable(() => true)}
      title="클릭해서 편집">
      <div className={props.type}
        style={props.style}>
        {text}
      </div>
    </div>
  );
}

export default ModifiableInput;
