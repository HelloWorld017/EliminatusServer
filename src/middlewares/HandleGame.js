const {clamp, mod} = require('../utils');
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

	socket.on('game.structure.build', checker(({type, x, y, rotation}, ent, game) => {
		if(typeof x !== 'number' || typeof y !== 'number' || typeof rotation !== 'number' || typeof type !== 'string')
			return;

		if(!game.world.structuresByType.get(type)) return;
		// Should use map because if we use object rather than map,
		// poisonous inputs like "constructor" can result in object["constructor"]

		const structure = new (game.world.structuresByType.get(type))(game, x, y, mod(rotation, Math.PI * 2));

		if(!Object.keys(structure.ingredients).every(k => ent.inventory.get(k) >= structure.ingredients[k])) return;
		Object.keys(structure.ingredients).forEach(k => ent.takeItem(k, structure.ingredients[k]));

		game.world.addStructure(structure);
	}));

	socket.on('game.structure.pick', checker(({x, z}, ent, game) => {
		if(typeof x !== 'number' || typeof z !== 'number' || !isFinite(x) || !isFinite(z)) return;
		const structureTag = game.world.getPositionTag({x, y: z});
		const structure = game.world.structures[structureTag];

		if(!structure) return;

		structure.pick(ent);
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
