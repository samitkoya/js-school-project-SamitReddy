import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Timeline from "./components/Timeline";
import EventModal from "./components/EventModal";
import FilterPanel from "./components/FilterPanel";
import eventsData from "./data/events.json";
import { TimelineEvent } from "./types";

const App: React.FC = () => {
  const [events, setEvents] = useState<TimelineEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  useEffect(() => {
    setEvents(eventsData.timelineData);
  }, []);

  return (
    <div className="container">
      <Header />
      <main id="main-content">
        <Timeline events={events} onSelectEvent={setSelectedEvent} />
        <FilterPanel />
        {selectedEvent && (
          <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
      </main>
    </div>
  );
};

export default App;