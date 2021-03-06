const Structure = require('./Structure');

class StructureRepairCore extends Structure {
	constructor(game, x, y, rot) {
		super("repair_core", game, x, y, rot);
		this.maxHealth = 430;
		this._health = this.maxHealth;
	}

	onTick() {
		//TODO heal near entities
	}

	getGridPosition() {
		const x = Math.floor(this.x / 40);
		const y = Math.floor(this.y / 40);

		return [{x, y}, {x: x + 1, y}, {x, y: y + 1}, {x: x + 1, y: y + 1}];
	}

	get ingredients() {
		return {
			cytrium: 400,
			stone: 30,
			wood: 30
		};
	}

	get width() {
		return 2;
	}

	get height() {
		return 2;
	}

	static get type() {
		return "repair_core";
	}

	get userBuildable() {
		return true;
	}
}

module.exports = StructureRepairCore;
