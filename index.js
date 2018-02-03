const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const middlewares = require('./src/middlewares');
const GameManager = require('./src/game/GameManager');

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = process.env.PORT || 2222;

server.listen(port, () => console.log(`Listening on ${port}`));

app.use((req, res, next) => {
	//TODO redirect
	res.send('Listening...');
});


global.gameManager = new GameManager;

io.on('connection', (socket) => {
	middlewares.forEach((v) => v(socket));
});
