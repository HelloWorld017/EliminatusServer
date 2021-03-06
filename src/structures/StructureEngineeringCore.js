const Structure = require('./Structure');

class StructureEngineeringCore extends Structure {
	constructor(game, x, y, rot) {
		super("engineering_core", game, x, y, rot);
		this.maxHealth = 550;
		this._health = 550;
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
		return "engineering_core";
	}

	get userBuildable() {
		return true;
	}

	get ingredients() {
		return {
			cytrium: 700,
			stone: 50,
			wood: 30
		};
	}
}

module.exports = StructureEngineeringCore;
