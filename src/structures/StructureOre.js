const Structure = require('./Structure');

class StructureOre extends Structure {
	constructor(game, x, y, rot) {
		super("ore", game, x, y, rot);
		this.maxHealth = 50;
		this._health = 50;
	}

	static get type() {
		return "ore";
	}
}

module.exports = StructureOre;
