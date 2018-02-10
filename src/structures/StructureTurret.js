const Structure = require('./Structure');

class StructureTurret extends Structure {
	constructor(game, x, y, rotation) {
		super("turret", game, x, y, rotation);
		this.maxHealth = 450;
		this._health = this.maxHealth;
	}

	onTick() {
		//TODO attack near spectors
	}

	getGridPosition() {
		const x = Math.floor(this.x / 40);
		const z = Math.floor(this.y / 40);
		const rot = this.rotation;

		const grid = [{x, y: z}];

		if(rot === Math.PI * 3 / 2) grid.push({x: x - 1, y: z});
		else if(rot === Math.PI) grid.push({x, y: z - 1});
		else if(rot === Math.PI / 2) grid.push({x: x + 1, y: z});
		else grid.push({x, y: z + 1});

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
