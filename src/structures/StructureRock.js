const StructureResource = require('./StructureResource');

class StructureRock extends StructureResource {
	constructor(game, x, y, z) {
		super("rock", game, x, y, z);
		this.maxHealth = 100;
		this.max = 20;
		this._health = this.maxHealth;
	}

	handlePick(user) {
		user.addItem('cytrium', 10);
		user.addItem('stone', 15);
	}
}

module.exports = StructureRock;
