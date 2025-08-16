import { TimelineEvent } from "./types.js";

export async function fetchTimelineData(): Promise<TimelineEvent[]> {
  try {
    const response = await fetch("events.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data.timelineData as TimelineEvent[];
  } catch (error) {
    console.error("Error loading timeline data:", error);
    return [
      {
        year: 1977,
        title: "Data Loading Issue",
        summary: "Enable CORS or use a dev server to load full timeline data",
        fullContent:
          "<p>Please check your console for errors and ensure:</p><ul><li>You're using a dev server (like Live Server)</li><li>events.json exists in the same folder</li></ul>"
      }
    ];
  }
}
