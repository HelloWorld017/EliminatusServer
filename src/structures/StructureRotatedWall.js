const Structure = require('./Structure');

class StructureRotatedWall extends Structure {
	constructor(game, x, y, rotation) {
		super("wall_rot", game, x, y, rotation);
		this.maxHealth = 600;
		this._health = this.maxHealth;
	}

	static get type() {
		return "wall_rot";
	}

	get userBuildable() {
		return true;
	}
}

module.exports = StructureRotatedWall;
