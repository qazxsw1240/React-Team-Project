import * as Bookmark from "db/bookmark";

import React, { useEffect, useRef, useState } from "react";

const TimelineRegex = /(\d+:)?(\d+):(\d+)/;

/**
 * @typedef {object} TimelineProps
 * @property {Bookmark.YouTubeBookmarkTimeline} timeline
 * @property {(type:string,index:number)=>void=} onModifyButtonPressed
 * @property {(type:string)=>void=} onDeleteButtonPressed
 * @property {(timeline:string)=>void=} onTimelineSelected
 */

/**
 * @param {TimelineProps} props
 * @returns {React.JSX.Element}
 */
function TimeLine(props) {
  const {
    timeline,
    onModifyButtonPressed = t => t,
    onDeleteButtonPressed = t => t,
    onTimelineSelected = t => t
  } = props;
  const [value, setValue] = useState(formatTimeLine(timeline.timeline));
  const [readOnly, setReadOnly] = useState(true);
  const focusRef = useRef(null);

  // console.log("rerendered", timeline);

  useEffect(() => {
    const current = focusRef?.current;
    if (current) {
      current.value = value;
    }
    onModifyButtonPressed(value);
  }, [value]);

  /**
   * @param {React.KeyboardEvent.<HTMLInputElement>&React.BaseSyntheticEvent.<HTMLInputElement,any,HTMLInputElement>} event 
   */
  function checkKeyEnter(event) {
    const target = event.target;
    const content = target.value;
    if (event.key === "Enter") {
      if (!TimelineRegex.test(content)) {
        console.log('invalid input', content);
        event.target.setCustomValidity("올바르지 않은 형식입니다.");
        return;
      }
      setValue(content);
      setReadOnly(() => true);
    }
  }

  /**
   * @param {React.BaseSyntheticEvent<HTMLInputElement>} event 
   */
  function checkInput(event) {
    const input = event.target.value;
    const component = focusRef?.current;
    if (component) {
      component.value = input;
    }
    if (!TimelineRegex.test(input)) {
      event.target.setCustomValidity("올바르지 않은 형식입니다.");
      return;
    }
  }

  const inputDefaultValue = formatTimeLine(timeline.timeline);

  // console.log(inputDefaultValue);

  return (
    <div
      key="timeline"
      className="timeline">
      {/* <div
        className="timeline-input"
        contentEditable={readOnly}>
        {inputDefaultValue}
      </div> */}
      {
        readOnly ?
          <input
            type="text"
            className="timeline-input"
            ref={focusRef}
            readOnly={true}
            defaultValue={inputDefaultValue}
            value={inputDefaultValue}
            onChange={checkInput}
            onKeyDown={checkKeyEnter}
          /> :
          <input
            type="text"
            className="timeline-input"
            ref={focusRef}
            readOnly={false}
            defaultValue={inputDefaultValue}
            // value={inputDefaultValue}
            onChange={checkInput}
            onKeyDown={checkKeyEnter}
          />
      }
      <div
        title={`클릭해서 ${value}(으)로 이동`}
        className="timeline-button timeline-edit-button"
        onClick={() => onTimelineSelected(timeline.timeline)}>
        이동
      </div>
      <div
        className="timeline-button timeline-edit-button"
        onClick={() => {
          setReadOnly(() => false);
          focusRef?.current?.focus();
        }}>
        수정
      </div>
      <div
        className="timeline-button timeline-delete-button"
        onClick={() => onDeleteButtonPressed("")}>
        삭제
      </div>
    </div>
  );
}

/**
 * @param {string} timeline 
 * @returns {string}
 */
function formatTimeLine(timeline) {
  const timelineSeconds = parseInt(timeline);
  const hours = Math.floor(timelineSeconds / 3600);
  const minutes = Math.floor((timelineSeconds % 3600) / 60);
  const seconds = timelineSeconds % 60;
  let format = "";
  if (hours !== 0) {
    format += hours.toString().padStart(2, '0');
  }
  if (format.length !== 0) {
    format += ":";
  }
  format += `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  return format;
}

export default TimeLine;
