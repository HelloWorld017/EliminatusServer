const StructureResource = require('./StructureResource');

class StructureRock extends StructureResource {
	constructor(game, x, y) {
		super("rock", game, x, y);
		this.maxHealth = 100;
		this.max = 20;
		this._health = this.maxHealth;
	}

	handlePick(user) {
		user.addItem('cytrium', 10);
		user.addItem('stone', 15);
	}

	static get type() {
		return "rock";
	}
}

module.exports = StructureRock;
