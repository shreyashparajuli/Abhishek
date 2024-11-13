const pages = [];
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
    if (pages.length > 0) {
        pages[currentPageIndex].classList.remove('visible');

        // Select a new random page
        currentPageIndex = Math.floor(Math.random() * pages.length);
        pages[currentPageIndex].classList.add('visible');
    }

    // Get a new random tempo and update metronome interval
    const newBPM = getRandomBPM();
    console.log(`Generated BPM: ${newBPM}`); // Debugging line
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

document.addEventListener('DOMContentLoaded', function() {
    // Retrieve pages data from localStorage
    const pagesData = JSON.parse(localStorage.getItem('pagesData')) || [];

    // Populate pages dynamically
    const pageContainer = document.getElementById('pageContainer');
    pageContainer.innerHTML = ''; // Clear existing pages

    pagesData.forEach((page, index) => {
        const pageDiv = document.createElement('div');
        pageDiv.classList.add('page');
        if (index === 0) pageDiv.classList.add('visible'); // Make the first page visible
        pageDiv.innerHTML = `
            <h2>${page.title}</h2>
            <textarea readonly>${page.content}</textarea>
        `;
        pageContainer.appendChild(pageDiv);
        pages.push(pageDiv); // Store reference to each page
    });
});
