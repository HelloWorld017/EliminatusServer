const StructureResource = require('./StructureResource');

class StructureStone extends StructureResource {
	constructor(game, x, y) {
		super("stone", game, x, y);
		this.maxHealth = 30;
		this.max = 6;
		this._health = this.maxHealth;
	}

	handlePick(user) {
		user.addItem('cytrium', 6);
		user.addItem('stone', 10);
	}

	static get type() {
		return "stone";
	}
}

module.exports = StructureStone;
