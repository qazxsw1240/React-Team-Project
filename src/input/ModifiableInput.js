import React, { useContext, useEffect, useState } from "react";

// props = {text : 문자열}
function ModifiableInput(props) {
  const [modifiable, setModifiable] = useState(false);
  const [text, setText] = useState(props.text);
  useEffect(() => {}, [text]);

  const changeText = (event) => { 
    setText(() => event.target.value); 
    setModifiable(() => false);

    props.bookmark[props.str_key] = event.target.value;


    console.log(props.bookmark)

    
  }

  if (modifiable) {
    return (
      
        <div className="window modifiable" style={{display: "flex"}}>
            <input
              className={props.type}
              style={{ height: 30, paddingLeft: "10px", flexWrap: "wrap"}}
              type="text"
              defaultValue={text}
              onKeyDown={(event) => { if (event.key === "Enter") { changeText(event) }}}
              onBlur={(event) => { changeText(event) }}
              autoFocus={true}
              size={47}
            />
        
      </div>
    );
  }
  return (
    <div className="window modifiable"
        onDoubleClick={() => setModifiable(() => true)} 
        title="더블클릭해서 편집">
        <div className={props.type} style={props.style}>
          {text}
        </div>
    </div>
  );
}

export default ModifiableInput;
