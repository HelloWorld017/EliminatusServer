const ElmError = require('../error/ElmError');
const uuid = require('uuid/v4');

class User {
	constructor(name, socket) {
		this.id = uuid();
		this.name = name;
		this.socket = socket;
		this.game = undefined;
		this.waiting = undefined;
	}

	announce(tag, payload) {
		this.socket.emit(tag, payload);
	}

	getEntity() {
		if(!this.game) return;

		return this.game.users.get(this.id);
	}

	joinGame(game) {
		if(this.game || this.waiting) return new ElmError("Already the user has game", 'user.already.joined');
			//Throwing can result in fragile server.

		if(game.maxUser >= game.users.size + 1) {
			game.join(this);
		} else {
			return new ElmError("Max user exceeded", 'user.max.exceed');
		}
	}

	exitGame() {
		if(this.waiting) {
			this.waiting.exit(this);
			return;
		}

		if(!this.game) return new ElmError("User has no games", 'user.not.joined');

		this.game.exit(this);
	}
}

module.exports = User;
