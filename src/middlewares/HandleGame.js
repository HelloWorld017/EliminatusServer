const checkCondition = socket => callback => payload => {
	if((typeof payload === 'object') && payload && socket.user && socket.user.game) {
		callback(payload);
	}
};

module.exports = function handleGame(socket) {
	const checker = checkCondition(socket);

	socket.on('game.player.move', checker(({x, y, z, rotation}) => {
		const ent = socket.user.getEntity();

		ent.verifyAndMove(x, y, z, rotation);
	}));
}
