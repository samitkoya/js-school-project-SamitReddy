import { fetchTimelineData } from "./fetcher.js";
import { initRenderer } from "./renderer.js";
import { setModalData } from "./modal.js";
import { initTheme } from "./theme.js";

async function initApp() {
  const data = await fetchTimelineData();
  setModalData(data);
  initRenderer(data);
  initTheme();
}

initApp();
