const Structure = require('./Structure');

class StructureOre extends Structure {
	constructor(game, x, y) {
		super("ore", game, x, y);
		this.maxHealth = 50;
		this._health = 50;
	}

	static get type() {
		return "ore";
	}
}

module.exports = StructureOre;
