import { useEffect, useState } from "react";


/**
 * @typedef {object} ModifiableTextAreaProps
 * @property {string} text
 * @property {(text:string)=>void=} onTextChange
 */

/**
 * @param {ModifiableTextAreaProps&React.HTMLAttributes} props 
 * @returns 
 */
function ModifiableTextArea(props) {
  const { onTextChange = s => undefined, style } = props;
  const [modifiable, setModifiable] = useState(false);
  const [text, setText] = useState(props.text);

  useEffect(() => {
    onTextChange(text);
  }, [text]);

  function changeText(event) {
    setText(() => event.target.value);
    setModifiable(() => false);
  }

  function handleTextareaChange(event) {
    setText(event.target.value);
  }

  function checkKeyEnter(event) {
    if (event.key === "Enter") {
      changeText(event);
    }
  }

  if (modifiable) {
    return (
      <div className="window modifiable"
        style={{
          // display: "flex"
        }}>
        <textarea
          className="input-text"
          style={{
            ...(style ?? {}),
            resize: "none"
          }}
          defaultValue={text}
          maxLength={300}
          onChange={handleTextareaChange}
          placeholder="설명 입력"
          onKeyDown={(event) => checkKeyEnter(event)}
          onBlur={(event) => changeText(event)}
          autoFocus={true}
        />
      </div>
    );
  }

  return (
    <div
      className="window modifiable"
      style={{ boxSizing: "border-box" }}
      onClick={() => setModifiable(() => true)}
      title="클릭해서 편집">
      <div
        className={props.type}
        style={{
          ...(style ?? {}),
        }}>
        {text}
      </div>
    </div>
  );
}

export default ModifiableTextArea;
