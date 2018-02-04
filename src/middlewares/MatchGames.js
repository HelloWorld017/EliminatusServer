module.exports = function matchGames(socket) {
	socket.on('match.waitings', () => {
		socket.emit('match.waitings.success', global.gameManager.getWaitings());
	});

	socket.on('match.create', payload => {
		if(typeof payload !== 'object' || !payload) return;
		if(!socket.user) return;

		const {title, maxUser} = payload;

		try {
			const waiting = global.gameManager.createWaiting(title, maxUser);

			if(!waiting) return;
			socket.user.joinGame(waiting);
			socket.emit('match.create.success', waiting.id);
		} catch(e) {
			console.error(e);
		}
	});

	socket.on('match.join', id => {
		if(!global.gameManager.waitings.get(id)) return;
		if(!socket.user) return;

		try {
			const waiting = global.gameManager.waitings.get(id);
			socket.user.joinGame(waiting);
			socket.emit('match.join.success', waiting.id);
		} catch(e) {
			console.error(e);
		}
	});

	socket.on('match.exit', () => {
		if(!socket.user) return;

		try {
			socket.user.exitGame();
		} catch(e) {
			console.error(e);
		}
	});
};
