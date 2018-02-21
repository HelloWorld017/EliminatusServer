const Structure = require('./Structure');

class StructureTransmitterCore extends Structure {
	constructor(game, x, y, rotation) {
		super("transmitter_core", game, x, y, rotation);
		this.maxHealth = 250;
		this._health = this.maxHealth;
	}

	static get type() {
		return "transmitter_core";
	}

	get ingredients() {
		return {
			cytrium: 100,
			stone: 50
		};
	}

	get userBuildable() {
		return true;
	}
}

module.exports = StructureTransmitterCore;
