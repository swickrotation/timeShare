const socket = io();

const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

// Ask for user permission to send notification
function requestNotificationPermission() {
    if (Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            }
        });
    }
}
requestNotificationPermission();

function sendNotification(message, iconpath) {
    if (Notification.permission === 'granted') {
        new Notification('Web Timer', {
            body: message,
            icon: iconpath 
        });
    }
}


// Update the timer display when receiving a new timer value
socket.on('timer-update', (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
});

// Editor controls
startButton.addEventListener('click', () => {
    socket.emit('start-timer');
    sendNotification('Timer Started', 'img/start.png')
});

stopButton.addEventListener('click', () => {
    socket.emit('stop-timer');
    sendNotification('Timer Stopped', 'img/stop.png')
});

resetButton.addEventListener('click', () => {
    socket.emit('reset-timer');
    sendNotification('Timer Reset', 'img/reset.png')
});
