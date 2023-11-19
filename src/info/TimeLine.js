import * as Bookmark from "db/bookmark";

import React, { useEffect, useRef, useState } from "react";

const TimelineRegex = /(\d+:)?(\d+):(\d+)/;

/**
 * @typedef {object} TimelineProps
 * @property {Bookmark.YouTubeBookmarkTimeline} timeline
 * @property {(type:string)=>void=} onModifyButtonPressed
 * @property {(type:string)=>void=} onDeleteButtonPressed
 */

/**
 * @param {TimelineProps} props
 * @returns {React.JSX.Element}
 */
function TimeLine(props) {
    const {
        timeline,
        onModifyButtonPressed = t => t,
        onDeleteButtonPressed = t => t
    } = props;
    const [value, setValue] = useState(formatTimeLine(timeline.timeline));
    const [readOnly, setReadOnly] = useState(true);
    const focusRef = useRef(null);

    useEffect(() => {
        onModifyButtonPressed(value);
    }, [value]);

    /**
     * @param {React.BaseSyntheticEvent<HTMLInputElement>} event 
     */
    function checkKeyEnter(event) {
        const content = event.target.value;
        if (event.key === "Enter") {
            setValue(content);
        }
    }

    /**
     * @param {React.BaseSyntheticEvent<HTMLInputElement>} event 
     */
    function checkInput(event) {
        const input = event.target.value;
        if (!TimelineRegex.test(input)) {
            event.target.setCustomValidity("올바르지 않은 형식입니다.");
            return;
        }
        event.target.setCustomValidity("");
    }

    const input = <input
        ref={focusRef}
        readOnly={readOnly}
        defaultValue={value}
        onChange={checkInput}
        onKeyDown={checkKeyEnter}
    />;
    return (
        <div key="timeline">
            {input}
            <button onClick={() => {
                setReadOnly(() => false);
                focusRef?.current?.focus();
            }}>
                수정
            </button>
            <button onClick={() => onDeleteButtonPressed(focusRef?.current?.value)}>삭제</button>
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
