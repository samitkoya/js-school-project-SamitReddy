const modal = document.getElementById("info-modal");
const modalTitle = document.getElementById("modal-title");
const modalContent = document.getElementById("modal-content");
const closeBtn = document.querySelector(".close-btn");
let timelineData = [];
export function setModalData(data) {
    timelineData = data;
}
export function showModal(index) {
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
    if (e.target === modal)
        closeModal();
});
document.addEventListener("keydown", e => {
    if (e.key === "Escape" && modal.style.display === "block") {
        closeModal();
    }
});
