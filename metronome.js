const pageContainer = document.getElementById('pageContainer');
const metronomeSound = document.getElementById('metronomeSound');
const bpmDisplay = document.getElementById('bpmDisplay');
let metronomeInterval;
let beepCount = 0;
let currentPageIndex = 0;
let isRunning = false;

// Load page data from sessionStorage
const pageCount = parseInt(sessionStorage.getItem('pageCount'), 10);
const pageData = JSON.parse(sessionStorage.getItem('pageData'));

// Create and add pages to the container
for (let i = 0; i < pageCount; i++) {
  const pageDiv = document.createElement('div');
  pageDiv.classList.add('page');
  if (i === 0) pageDiv.classList.add('visible');
  
  const title = document.createElement('h2');
  title.textContent = pageData[i].title;
  
  const content = document.createElement('p');
  content.textContent = pageData[i].content;
  
  pageDiv.appendChild(title);
  pageDiv.appendChild(content);
  pageContainer.appendChild(pageDiv);
}

const pages = document.querySelectorAll('.page');

function getRandomBPM() {
  return Math.floor(Math.random() * (150 - 90 + 1)) + 90;
}

function bpmToMilliseconds(bpm) {
  return 60000 / bpm;
}

function playMetronome() {
  if (!isRunning) return;
  metronomeSound.currentTime = 0;
  metronomeSound.play();
  beepCount++;

  if (beepCount >= 4) {
    switchPage();
    beepCount = 0;
  }
}

function switchPage() {
  pages[currentPageIndex].classList.remove('visible');
  currentPageIndex = Math.floor(Math.random() * pageCount);
  pages[currentPageIndex].classList.add('visible');

  const newBPM = getRandomBPM();
  bpmDisplay.textContent = `BPM: ${newBPM}`;
  clearInterval(metronomeInterval);
  metronomeInterval = setInterval(playMetronome, bpmToMilliseconds(newBPM));
}

function startMetronomeAndSwitcher() {
  if (isRunning) return;
  isRunning = true;
  switchPage();
}

function stopMetronomeAndSwitcher() {
  clearInterval(metronomeInterval);
  metronomeSound.pause();
  metronomeSound.currentTime = 0;
  isRunning = false;
}
