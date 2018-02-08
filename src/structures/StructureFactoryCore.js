const Structure = require('./Structure');

class StructureFactoryCore extends Structure {
	constructor(game, x, y, rot) {
		super("factory_core", game, x, y, rot);
		this.maxHealth = 350;
		this.max = 4;
		this._health = 350;
	}

	getGridPosition() {
		const x = Math.floor(this.x / 40);
		const y = Math.floor(this.y / 40);

		return [{x, y}, {x: x + 1, y}, {x, y: y + 1}, {x: x + 1, y: y + 1}];
	}

	get width() {
		return 2;
	}

	get height() {
		return 2;
	}

	static get type() {
		return "factory_core";
	}

	get userBuildable() {
		return true;
	}
}

module.exports = StructureFactoryCore;
