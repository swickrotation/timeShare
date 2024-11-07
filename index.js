const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static files from the 'public' directory
app.use(express.static('public'));

let timer = 0;
let interval = null;

const startTimer = () => {
    if (!interval) {
        interval = setInterval(() => {
            timer++;
            io.emit('timer-update', timer);
        }, 1000);
    }
};

const stopTimer = () => {
    clearInterval(interval);
    interval = null;
};

const resetTimer = () => {
    stopTimer();
    timer = 0;
    io.emit('timer-update', timer);
};

io.on('connection', (socket) => {
    console.log('A user connected');
    socket.emit('timer-update', timer);

    socket.on('start-timer', () => {
        startTimer();
    });

    socket.on('stop-timer', () => {
        stopTimer();
    });

    socket.on('reset-timer', () => {
        resetTimer();
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
