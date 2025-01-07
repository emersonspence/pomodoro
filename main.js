// Variables to store time
let workTime = 25 * 60; // 25 minutes
let breakTime = 5 * 60; // 5 minutes
let currentTime = workTime;
let timerInterval;
let isTimerRunning = false;
let isWorkSession = true; // true for work, false for break

// DOM elements
const timeDisplay = document.getElementById("time-display");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");
const sessionTypeDisplay = document.getElementById("session-type");

function updateDisplay() {
    let minutes = Math.floor(currentTime / 60);
    let seconds = currentTime % 60;
    timeDisplay.textContent = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function startTimer() {
    if (isTimerRunning) return;

    isTimerRunning = true;
    startButton.textContent = "Pause";
    resetButton.disabled = true;

    timerInterval = setInterval(() => {
        currentTime--;
        updateDisplay();

        if (currentTime === 0) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            startButton.textContent = "Start";
            resetButton.disabled = false;
            toggleSession();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    startButton.textContent = "Resume";
    resetButton.disabled = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    currentTime = isWorkSession ? workTime : breakTime;
    updateDisplay();
    startButton.textContent = "Start";
    resetButton.disabled = true;
}

function toggleSession() {
    isWorkSession = !isWorkSession;
    currentTime = isWorkSession ? workTime : breakTime;
    sessionTypeDisplay.textContent = isWorkSession ? "Work Session" : "Break Time";
    updateDisplay();
}

startButton.addEventListener("click", () => {
    if (isTimerRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

resetButton.addEventListener("click", resetTimer);

// Initialize display
updateDisplay();
