const Game = require('./Game');
const Waiting = require('./Waiting');

class GameManager {
	constructor() {
		this.games = new Map();
		this.waitings = new Map();
	}

	startGame(settings) {
		const game = new Game(settings);
		this.games.set(game.id, game);

		return game;
	}

	createWaiting(title, maxUser) {
		if(typeof title !== 'string') return;
		if(typeof maxUser === 'string') maxUser = parseInt(maxUser);

		if(typeof maxUser !== 'number') return;

		title = title.slice(0, 20);
		title.replace(/[^A-Za-z0-9- ]/g, '');

		if(!isFinite(maxUser)) maxUser = 1
		if(maxUser < 1) maxUser = 1;
		if(maxUser > 6) maxUser = 6;

		maxUser = Math.round(maxUser);

		const waiting = new Waiting(title, maxUser, this);
		this.waitings.set(waiting.id, waiting);

		return waiting;
	}

	getWaitings() {
		return [...this.waitings.values()].map(v => ({
			id: v.id,
			title: v.title,
			current: v.users.size,
			max: v.maxUser,
			users: [...v.users.values()].map(v => [v.id, v.name])
		}));
	}

	endGame(game) {
		this.games.delete(game.id);
	}
}

module.exports = GameManager;
