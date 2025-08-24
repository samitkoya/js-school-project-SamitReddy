import React, { useState, useEffect } from "react";
import { TimelineEvent } from "../types";

interface TimelineProps {
  events: TimelineEvent[];
  onSelectEvent: (event: TimelineEvent) => void;
}

const Timeline: React.FC<TimelineProps> = ({ events, onSelectEvent }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setIndex(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setIndex(prev => Math.min(events.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [events.length]);

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
          aria-valuenow={index}
          aria-valuemin={0}
          aria-valuemax={events.length - 1}
          aria-valuetext={events[index].year.toString()}
        />
        <div className="timeline-labels">
          {events.map((ev, i) => (
            <button
              key={ev.year}
              className={`timeline-label ${i === index ? "active" : ""}`}
              onClick={() => setIndex(i)}
              aria-current={i === index ? "true" : "false"}
              aria-label={`Select year ${ev.year}`}
            >
              {ev.year}
            </button>
          ))}
        </div>
      </div>

      <div className="content-container" aria-live="polite">
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
                aria-label={`Learn more about ${event.title}`}
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