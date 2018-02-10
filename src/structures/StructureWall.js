const Structure = require('./Structure');

class StructureWall extends Structure {
	constructor(game, x, y, rotation) {
		super("wall", game, x, y, rotation);
		this.maxHealth = 600;
		this._health = this.maxHealth;
	}

	static get type() {
		return "wall";
	}

	get userBuildable() {
		return true;
	}
}

module.exports = StructureWall;
