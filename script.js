const yearSlider = document.getElementById('year-slider');
const timelineLabels = document.getElementById('timeline-labels');
const currentYearDisplay = document.getElementById('current-year');
const eventTitle = document.getElementById('event-title');
const eventSummary = document.getElementById('event-summary');
const eventImage = document.getElementById('event-image');
const learnMoreBtn = document.getElementById('learn-more');
const themeToggle = document.getElementById('theme-toggle');
const modal = document.getElementById('info-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.querySelector('.close-btn');

let timelineData = [];

async function fetchTimelineData() {
  try {
    const response = await fetch('events.json');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    timelineData = data.timelineData;
    initApp();
    
  } catch (error) {
    console.error("Error loading timeline data:", error);
    timelineData = [
      {
        year: 1977,
        title: "Data Loading Issue",
        summary: "Enable CORS or use a dev server to load full timeline data",
        image: "",
        fullContent: "<p>Please check your console for errors and ensure:</p><ul><li>You're using a dev server (like Live Server)</li><li>timeline-data.json exists in the same folder</li></ul>"
      }
    ];
    initApp();
  }
}

function initApp() {
  initSlider();
  updateDisplay(0);
  setupEventListeners();
}

function initSlider() {
  yearSlider.min = 0;
  yearSlider.max = timelineData.length - 1;
  
  timelineLabels.innerHTML = '';
  
  timelineData.forEach((event, index) => {
    const label = document.createElement('div');
    label.className = 'timeline-label';
    label.textContent = event.year;
    label.dataset.index = index;
    
    label.addEventListener('click', () => {
      yearSlider.value = index;
      updateDisplay(index);
      yearSlider.dispatchEvent(new Event('input'));
    });
    
    timelineLabels.appendChild(label);
  });
  
  timelineLabels.children[0].classList.add('active');
}

function updateDisplay(index) {
  const event = timelineData[index];
  
  currentYearDisplay.textContent = event.year;
  eventTitle.textContent = event.title;
  eventSummary.textContent = event.summary;
  
  if (event.image) {
    eventImage.src = event.image;
    eventImage.style.display = 'block';
  } else {
    eventImage.style.display = 'none';
  }
  
  document.querySelectorAll('.timeline-label').forEach(label => {
    label.classList.remove('active');
  });
  timelineLabels.children[index].classList.add('active');
  
  learnMoreBtn.dataset.index = index;
}

function showModal(index) {
  const event = timelineData[index];
  modalTitle.textContent = `${event.year}: ${event.title}`;
  modalContent.innerHTML = event.fullContent;
  modal.style.display = 'block';
  
  modal.setAttribute('aria-modal', 'true');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.style.display = 'none';
  document.body.style.overflow = 'auto';
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    document.documentElement.removeAttribute('data-theme');
    themeToggle.textContent = '🌙 Dark Mode';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️ Light Mode';
  }
}

function setupEventListeners() {
  yearSlider.addEventListener('input', () => updateDisplay(yearSlider.value));
  learnMoreBtn.addEventListener('click', () => showModal(learnMoreBtn.dataset.index));
  closeBtn.addEventListener('click', closeModal);
  themeToggle.addEventListener('click', toggleTheme);
  
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeModal();
    }
  });
}
fetchTimelineData();