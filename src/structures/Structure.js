const {clamp} = require('../utils');

class Structure {
	constructor(networkId, game, x, y, rotation=0) {
		this.game = game;
		this.x = clamp(0, x, game.world.width);
		this.y = clamp(0, y, game.world.height);
		this.rotation = rotation;
		this.networkId = this.type = networkId;
		this.maxHealth = 300;

		this.healthDelta = 0;
		this.building = false;

		this.needsUpdate = false;

		this._health = 300;
		this._updatedAttributes = {
			x: this.x,
			y: this.y
		};
	}

	tick() {
		this.health += this.healthDelta;

		if(this.building) {
			if(this.health === this.maxHealth) {
				this.building = false;
				this.healthDelta -= 5;
			}
		} else this.onTick();
	}

	pick(user) {
		this.onPick(user);
	}

	onTick() {

	}

	onPick() {

	}

	onDestroy() {

	}

	startBuildAnimation() {
		this.health = 1;
		this.healthDelta += 5;
		this.building = true;
	}

	getGridPosition() {
		return [{
			x: Math.floor(this.x / 40),
			y: Math.floor(this.y / 40)
		}];
	}

	canBuiltOn() {
		if(this.rotation % (Math.PI / 2) !== 0) return false;

		if(!this.userBuildable) return false;

		return this.getGridPosition().every((v) => !this.game.world.structures[this.game.world.getPositionTag(v)]);
	}

	getExportData() {
		return {
			type: this.networkId,
			x: this.x,
			y: this.y,
			rotation: this.rotation,
			health: this.health,
			maxHealth: this.maxHealth
		};
	}

	get ingredients() {
		return {};
	}

	get userBuildable() {
		return false;
	}

	get updatedAttributes() {
		const temp = this._updatedAttributes;
		this.needsUpdate = false;
		this._updatedAttributes = {
			x: this.x,
			y: this.y
		};
		return temp;
	}

	get health() {
		return this._health;
	}

	set health(health) {
		health = Math.min(this.maxHealth, health);
		if(this.health === health) return;

		this.needsUpdate = true;
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
