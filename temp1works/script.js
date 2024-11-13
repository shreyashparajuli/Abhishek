const pages = document.querySelectorAll('.page');
const metronomeSound = document.getElementById('metronomeSound');
const bpmDisplay = document.getElementById('bpmDisplay');
let currentPageIndex = 0;
let metronomeInterval;
let beepCount = 0;
let isRunning = false;

function getRandomBPM() {
  return Math.floor(Math.random() * (150 - 90 + 1)) + 90; // Random BPM between 90 and 150
}

function bpmToMilliseconds(bpm) {
  return 60000 / bpm; // Convert BPM to milliseconds
}

function playMetronome() {
  if (!isRunning) return; // Stop if not running
  metronomeSound.currentTime = 0;
  metronomeSound.play();
  beepCount++; // Increment beep count

  if (beepCount >= 4) { // Change page after 4 beeps
    switchPage();
    beepCount = 0; // Reset beep count
  }
}

function switchPage() {
  // Hide the current page
  pages[currentPageIndex].classList.remove('visible');

  // Select a new random page
  currentPageIndex = Math.floor(Math.random() * pages.length);
  pages[currentPageIndex].classList.add('visible');

  // Get a new random tempo and update metronome interval
  const newBPM = getRandomBPM();
  bpmDisplay.textContent = `BPM: ${newBPM}`; // Update BPM display
  const interval = bpmToMilliseconds(newBPM);
  clearInterval(metronomeInterval); // Clear the previous interval
  metronomeInterval = setInterval(playMetronome, interval); // Set new interval
}

function startMetronomeAndSwitcher() {
  if (isRunning) return; // Prevent multiple intervals
  isRunning = true;
  switchPage(); // Start the first page switch
}

function stopMetronomeAndSwitcher() {
  clearInterval(metronomeInterval); // Clear the interval
  metronomeSound.pause(); // Stop the metronome sound
  metronomeSound.currentTime = 0; // Reset sound to start
  isRunning = false;
  beepCount = 0; // Reset beep count
  bpmDisplay.textContent = 'BPM: 0'; // Reset BPM display
}
