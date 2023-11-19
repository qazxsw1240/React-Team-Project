import * as Bookmark from "db/bookmark";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import TimeLine from "./TimeLine";

/**
 * @typedef {object} TimelinesProps
 * @property {Bookmark.YouTubeBookmark} bookmark
 * @property {(timelines:Bookmark.YouTubeBookmarkTimeline[])=>void=} onTimelineChange
 */

/**
 * 
 * @param {TimelinesProps&React.HTMLAttributes} props 
 * @returns {React.JSX.Element}
 */
function TimeLines(props) {
  const { style,
    bookmark,
    onTimelineChange = t => undefined
  } = props;
  const [timelines, setTimeLines] = useState(bookmark.timelines);
  /**
   * @type {React.MutableRefObject.<?HTMLDivElement>}
   */
  const scrollBottomRef = useRef(null);

  useEffect(() => {
    onTimelineChange(timelines);
  }, [timelines]);

  useLayoutEffect(() => {
    scrollBottomRef?.current?.scrollIntoView(false);
  }, []);

  return (
    <div
      id="timelines"
      className="window"
      style={{ ...(style ?? {}), marginTop: 0 }}>
      <div className="window-inner" style={{ marginTop: 0 }}>
        <div
          ref={scrollBottomRef}
          style={{ minHeight: 36, maxHeight: 526, overflowY: "scroll" }}>
          <form onSubmit={e => e.preventDefault()}>
            {timelines.map((t, i) => <TimeLine
              timeline={t}
              onModifyButtonPressed={(type) => {
                setTimeLines(ts => ts.map((t2, i2) => {
                  if (i2 === i) {
                    return { timeline: calculateTimeline(type) };
                  }
                  return t2;
                }));
              }}
              onDeleteButtonPressed={(type) => {
                const seconds = calculateTimeline(type);
                setTimeLines(ts => ts.filter(t => t.timeline !== seconds));
              }}
            />
            )}
            <button
              onClick={() => setTimeLines(timelines => [...timelines, { timeline: "0" }])}>
              +
            </button>
          </form>
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
function calculateTimeline(timeline) {
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
