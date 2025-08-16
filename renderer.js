import { showModal } from "./modal.js";
const yearSlider = document.getElementById("year-slider");
const timelineLabels = document.getElementById("timeline-labels");
const currentYearDisplay = document.getElementById("current-year");
const eventTitle = document.getElementById("event-title");
const eventSummary = document.getElementById("event-summary");
const eventImage = document.getElementById("event-image");
const learnMoreBtn = document.getElementById("learn-more");
let timelineData = [];
export function initRenderer(data) {
    timelineData = data;
    initSlider();
    updateDisplay(0);
    setupEventListeners();
}
function initSlider() {
    yearSlider.min = "0";
    yearSlider.max = (timelineData.length - 1).toString();
    timelineLabels.innerHTML = "";
    timelineData.forEach((event, index) => {
        const label = document.createElement("div");
        label.className = "timeline-label";
        label.textContent = event.year.toString();
        label.dataset.index = index.toString();
        label.addEventListener("click", () => {
            yearSlider.value = index.toString();
            updateDisplay(index);
            yearSlider.dispatchEvent(new Event("input"));
        });
        timelineLabels.appendChild(label);
    });
    timelineLabels.children[0].classList.add("active");
}
function updateDisplay(index) {
    const event = timelineData[index];
    currentYearDisplay.textContent = event.year.toString();
    eventTitle.textContent = event.title;
    eventSummary.textContent = event.summary;
    if (event.image) {
        eventImage.src = event.image;
        eventImage.style.display = "block";
    }
    else {
        eventImage.style.display = "none";
    }
    document.querySelectorAll(".timeline-label").forEach(label => label.classList.remove("active"));
    timelineLabels.children[index].classList.add("active");
    learnMoreBtn.dataset.index = index.toString();
}
function setupEventListeners() {
    yearSlider.addEventListener("input", () => updateDisplay(Number(yearSlider.value)));
    learnMoreBtn.addEventListener("click", () => showModal(Number(learnMoreBtn.dataset.index)));
}
