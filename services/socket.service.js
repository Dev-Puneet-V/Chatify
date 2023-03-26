const express = require('express');
const app = express();
const { Server } = require("socket.io");
const http = require('http');
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('A user connected', socket);
  
    // Listen for incoming messages from clients
    socket.on('chat message', (msg) => {
        console.log(`Received message: ${msg}`);

        // Broadcast the message to all connected clients except the sender
        socket.broadcast.emit('chat message', msg);
    });

    // Listen for disconnect events
    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

app.listen(process.env.SOCKET_PORT, () => {
    console.log(`Socket is running at port: ${process.env.SOCKET_PORT}`)
});