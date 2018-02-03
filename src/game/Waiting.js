const uuid = require('uuid/v4');

class Waiting {
	constructor(title, maxUser, gameManager) {
		this.users = new Map();
		this.maxUser = maxUser;
		this.id = uuid();
		this.title = title;
		this.manager = gameManager;
	}

	join(user) {
		this.users.set(user.id, user);
		user.waiting = this;

		if(this.users.size >= this.maxUser) {
			const game = this.manager.startGame({
				maxUser: this.maxUser
			});

			this.users.forEach((v) => {
				this.exit(v);
				game.join(v);
			});
		}
	}

	exit(user) {
		user.waiting = undefined;
		this.users.delete(user.id);

		if(this.users.size <= 0) {
			this.manager.waitings.delete(this.id);
		}
	}
}

module.exports = Waiting;
