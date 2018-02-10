const Structure = require('./Structure');

class StructureGeneratorCore extends Structure {
	constructor(game, x, y, rot) {
		super("generator_core", game, x, y, rot);
		this.maxHealth = 310;
		this._health = 310;
	}

	onTick() {
		//TODO add health to near structures
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
		return "generator_core";
	}

	get userBuildable() {
		return true;
	}
}

module.exports = StructureGeneratorCore;
