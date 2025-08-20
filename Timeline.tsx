import React, { useState } from "react";
import { TimelineEvent } from "../types";

interface TimelineProps {
  events: TimelineEvent[];
  onSelectEvent: (event: TimelineEvent) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onSelectEvent }) => {
  const [index, setIndex] = useState(0);

  if (!events || events.length === 0) {
    return <p>Loading events...</p>;
  }

  const event = events[index];

  return (
    <div>
      <div className="timeline-slider">
        <label htmlFor="year-slider" className="sr-only">
          Select a year
        </label>
        <input
          id="year-slider"
          type="range"
          min="0"
          max={events.length - 1}
          value={index}
          className="slider"
          onChange={(e) => setIndex(parseInt(e.target.value, 10))}
        />
        <div className="timeline-labels">
          {events.map((ev, i) => (
            <div
              key={ev.year}
              className={`timeline-label ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
            >
              {ev.year}
            </div>
          ))}
        </div>
      </div>

      <div className="content-container">
        <div className="year-display">
          <h2>{event.year}</h2>
          <div className="event-content">
            <div className="event-image-container">
              <img src={event.image} alt={event.title} />
            </div>
            <div className="event-text">
              <h3>{event.title}</h3>
              <p>{event.summary}</p>
              <button
                className="learn-more-btn"
                onClick={() => onSelectEvent(event)}
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
