import { TimelineEvent } from "./types.js";

const modal = document.getElementById("info-modal") as HTMLElement;
const modalTitle = document.getElementById("modal-title") as HTMLElement;
const modalContent = document.getElementById("modal-content") as HTMLElement;
const closeBtn = document.querySelector(".close-btn") as HTMLElement;

let timelineData: TimelineEvent[] = [];

export function setModalData(data: TimelineEvent[]) {
  timelineData = data;
}

export function showModal(index: number) {
  const event = timelineData[index];
  modalTitle.textContent = `${event.year}: ${event.title}`;
  modalContent.innerHTML = event.fullContent;
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

closeBtn.addEventListener("click", closeModal);

window.addEventListener("click", e => {
  if (e.target === modal) closeModal();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});
