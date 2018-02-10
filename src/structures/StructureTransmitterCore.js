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

	get userBuildable() {
		return true;
	}
}

module.exports = StructureTransmitterCore;
