const Structure = require('./Structure');

class StructureTurret extends Structure {
	constructor(game, x, y) {
		super("turret", game, x, y);
		this.maxHealth = 450;
		this._health = this.maxHealth;
	}

	tick() {
		//TODO implement
	}

	getGridPosition() {
		const x = Math.floor(this.x / 40);
		const y = Math.floor(this.y / 40);
		const grid = [{x, y}];

		//TODO fix wrong grid
		grid.push({
			x: x + Math.round(Math.cos(this.rotation)),
			y: y + Math.round(Math.sin(this.rotation))
		});

		return grid;
	}

	static get type() {
		return "turret";
	}

	get userBuildable() {
		return true;
	}
}

module.exports = StructureTurret;
