class Structure {
	constructor(networkId, game, x, y, rotation=0) {
		this.game = game;
		this.x = x;
		this.y = y;
		this.rotation = rotation;
		this.networkId = this.type = networkId;
		this.maxHealth = 300;

		this._health = 300;
		this._updatedAttributes = [];
	}

	tick() {

	}

	onPick() {

	}

	onDestroy() {

	}

	getGridPosition() {
		return [{
			x: Math.floor(this.x / 40),
			y: Math.floor(this.y / 40)
		}];
	}

	canBuiltOn() {
		return this.getGridPosition().every((v) => !this.game.world.structures[this.game.world.getPositionTag(v)]);
	}

	getExportData() {
		return {
			type: this.networkId,
			x: this.x,
			y: this.y,
			rotation: this.rotation,
			health: this.health
		};
	}

	get updatedAttributes() {
		const temp = this._updatedAttributes;
		this._updatedAttributes = {};

		return temp;
	}

	get health() {
		return this._health;
	}

	set health(health) {
		this._updatedAttributes.health = health;
		this._health = health;

		if(this._health <= 0) {
			this.onDestroy();
			this.game.world.removeStructure(this);
		}
	}

	get width() {
		return 1;
	}

	get height() {
		return 1;
	}
}

module.exports = Structure;
