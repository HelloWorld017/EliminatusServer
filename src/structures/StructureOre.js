const Structure = require('./Structure');

class StructureOre extends Structure {
	constructor(game, x, y, z) {
		super("ore", game, x, y, z);
		this.maxHealth = 50;
		this._health = 50;
	}
}

module.exports = StructureOre;
