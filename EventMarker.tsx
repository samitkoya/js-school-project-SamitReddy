import React from "react";
import { TimelineEvent } from "../types";

interface EventMarkerProps {
  event: TimelineEvent;
  onClick: () => void;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, onClick }) => (
  <button
    className="timeline-label"
    onClick={onClick}
    aria-label={`Select event from ${event.year}`}
  >
    {event.year}
  </button>
);

export default EventMarker;