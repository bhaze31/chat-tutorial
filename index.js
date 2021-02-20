const express = require('express');
const app = express();

app.use(express.static(__dirname + '/src'));

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/src/chat.html');
});

app.get('*', (req, res) => {
    res.sendFile(__dirname + '/src/chat.html');
});

const server = app.listen(3113, () => {
    console.log("Listening on 3113...");
});

const socketio = require('socket.io')(server);

socketio.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('message', (data) => {
        socket.broadcast.emit("message", data);
    });
});
