const StructureResource = require('./StructureResource');

class StructureTree extends StructureResource {
	constructor(game, x, y, z) {
		super("tree", game, x, y, z);
		this.maxHealth = 30;
		this.max = 6;
		this._health = this.maxHealth;
	}

	handlePick(user) {
		user.addItem("cytrium", 3);
		user.addItem("tree", 8);
	}

	static get type() {
		return "tree";
	}
}

module.exports = StructureTree;
