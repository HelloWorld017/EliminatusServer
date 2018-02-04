const deepExtend = require('deep-extend');
const uuid = require('uuid/v4');
const EntityPlayer = require('../entity/EntityPlayer');
const World = require('../world/World');

const DEFAULT_SETTINGS = {
	width: 8000,
	height: 8000,
	generate: {
		ore: 50,
		tree: 400,
		rock: 50,
		stone: 75,
		lamp: 200,
		barrel: 30
	},
	user: {
		defaultHealth: 10
	}
};

class Game {
	constructor(settings) {
		this.id = uuid();
		this.settings = deepExtend({}, DEFAULT_SETTINGS, settings);
		this.maxUser = settings.maxUser;
		this.users = new Map();
		this.world = new World(this);
		this.world.generateWorld();
	}

	announce(tag, payload) {
		this.users.forEach((v) => {
			v.announce(tag, payload);
		});
	}

	announceExcept(user, tag, payload) {
		this.users.forEach((v) => {
			if(v.id === user.id) return;
			v.announce(tag, payload);
		});
	}

	join(user) {
		const gameUser = new EntityPlayer(user);
		gameUser.eid = this.world.spawnEntity(gameUser);
		this.users.set(gameUser.id, gameUser);
		this.announce('user.join', {
			uid: gameUser.id,
			eid: gameUser.eid
		});
	}

	exit(user) {
		const gameUser = this.users.get(user.id);
		gameUser.user.game = undefined;

		this.users.forEach((v) => {
			v.announce('user.exit', {
				uid: gameUser.id,
				eid: gameUser.eid
			});
		});

		this.users.delete(gameUser.id);
	}
}

module.exports = Game;
