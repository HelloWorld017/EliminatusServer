const StructureResource = require('./StructureResource');

class StructureBarrel extends StructureResource {
	constructor(game, x, y, rot) {
		super("barrel", game, x, y, rot);
		this.maxHealth = 5;
		this._health = 5;
		this.max = 1;
	}

	handlePick(user) {
		user.addItem("cytrium", 6);
	}

	static get type() {
		return "barrel";
	}
}

module.exports = StructureBarrel;
