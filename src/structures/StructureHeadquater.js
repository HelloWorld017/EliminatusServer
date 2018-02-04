const Structure = require('./Structure');

class StructureHeadquater extends Structure{
	constructor(game, x, y) {
		super("headquater", game, x, y);
		this.maxHealth = 2000;
		this._health = 2000;
		this.innerTick = 0;
	}

	tick() {
		this.innerTick++;

		if(this.innerTick % 100 === 0) {
			this.game.users.forEach((v) => {
				v.addItem("cytrium", 5);
			});
		}
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
		return "headquater";
	}
}

module.exports = StructureHeadquater;
