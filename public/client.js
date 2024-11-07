const socket = io();

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Update the timer display when receiving a new timer value
socket.on('timer-update', (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

// Editor controls
startButton.addEventListener('click', () => {
    socket.emit('start-timer');
});

stopButton.addEventListener('click', () => {
    socket.emit('stop-timer');
});

resetButton.addEventListener('click', () => {
    socket.emit('reset-timer');
});
