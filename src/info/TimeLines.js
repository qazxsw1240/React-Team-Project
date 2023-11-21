import * as Bookmark from "db/bookmark";
import React, { useEffect, useState } from "react";
import TimeLine from "./TimeLine";

import { IoIosAdd } from "react-icons/io";

import "./timeline.css";

/**
 * @typedef {object} TimelinesProps
 * @property {Bookmark.YouTubeBookmark} bookmark
 * @property {Array.<Bookmark.YouTubeBookmarkTimeline>} timelines
 * @property {(timelines:Array.<Bookmark.YouTubeBookmarkTimeline>)=>void=} onTimelineChange
 * @property {(timeline:string)=>void=} onTimelineSelected
 */

/**
 * 
 * @param {TimelinesProps&React.HTMLAttributes} props 
 * @returns {React.JSX.Element}
 */
function TimeLines(props) {
  const {
    style,
    bookmark,
    timelines,
    onTimelineChange = t => undefined,
    onTimelineSelected = t => undefined
  } = props;

  const [timelineData, setTimelineData] = useState(timelines);

  useEffect(() => {
    onTimelineChange(timelineData);
  }, [timelineData]);

  /**
   * @param {number} index 
   */
  function deleteTimelineData(index) {
    setTimelineData(ts => ts.filter((_, i) => i !== index));
  }

  return (
    <div
      id="timelines"
      className="window"
      style={{ ...(style ?? {}), marginTop: 0 }}>
      <div className="window-inner" style={{ marginTop: 0 }}>
        <div
          style={{ minHeight: 36, maxHeight: 526, overflowY: "scroll" }}>
          {
            timelineData.map((t, i) => (
              <TimeLine
                key={`${bookmark.id}${i}`}
                timeline={t}
                onModifyButtonPressed={type => {
                  setTimelineData(ts => ts.map((t2, i2) => {
                    if (i2 === i) {
                      return { timeline: calculateTimeline(type) };
                    }
                    return t2;
                  }));
                }}
                onDeleteButtonPressed={() => {
                  deleteTimelineData(i);
                }}
                onTimelineSelected={onTimelineSelected} />
            ))
          }
          <div
            className="timeline-add-button"
            title="북마크 추가">
            <IoIosAdd
              style={{
                margin: "0 auto"
              }}
              onClick={() => {
                setTimelineData(ts => [...ts, ({ timeline: "0" })]);
              }}
            />
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  );
}

/**
 * @param {string} timeline 
 */
export function calculateTimeline(timeline) {
  const times = timeline.split(":");
  if (times.length === 3) {
    const [hours, minutes, seconds] = times;
    const hoursInSeconds = parseInt(hours) * 3600;
    const minutesInSeconds = parseInt(minutes) * 60;
    const secondsInSeconds = parseInt(seconds);
    return (hoursInSeconds + minutesInSeconds + secondsInSeconds).toString();
  }
  const [minutes, seconds] = times;
  const minutesInSeconds = parseInt(minutes) * 60;
  const secondsInSeconds = parseInt(seconds);
  return (minutesInSeconds + secondsInSeconds).toString();
}

export default TimeLines;
