const lastPacket = new Map();

const checkCondition = socket => callback => payload => {
	if(!((typeof payload === 'object') && payload && socket.user && socket.user.game))
		return;

	if(lastPacket.has(socket.user.id) && Date.now() - lastPacket.get(socket.user.id) < 200)
		return;

	callback(payload, socket.user.getEntity(), socket.user.game);
};

module.exports = function handleGame(socket) {
	const checker = checkCondition(socket);

	socket.on('game.player.move', checker(({x, y, z, rotation}, ent) => {
		ent.verifyAndMove(x, y, z, rotation);
	}));

	socket.on('world.notify.request', checker((payload, ent, game) => {
		game.world.notifyWorld(ent);
	}));

	socket.on('disconnect', () => {
		if(socket.user) {
			lastPacket.delete(socket.user.id);
			if(socket.user.game ||socket.user.waiting) socket.user.exitGame();
			socket.user = null;
		}
	});
};
