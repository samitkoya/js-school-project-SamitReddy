import React from "react";
import { TimelineEvent } from "../types";

interface EventMarkerProps {
  event: TimelineEvent;
  onClick: () => void;
}

const EventMarker: React.FC<EventMarkerProps> = ({ event, onClick }) => (
  <div className="timeline-label" onClick={onClick} role="button" tabIndex={0}>
    {event.year}
  </div>
);

export default EventMarker;
