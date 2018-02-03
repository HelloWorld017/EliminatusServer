const StructureResource = require('./StructureResource');

class StructureLamp extends StructureResource {
	constructor(game, x, y, z) {
		super("lamp", game, x, y, z);
		this.maxHealth = 20;
		this.max = 4;
		this._health = 20;
	}

	handlePick(user) {
		user.addItem("cytrium", 3);
		user.addItem("stone", 5);
	}
}

module.exports = StructureLamp;
