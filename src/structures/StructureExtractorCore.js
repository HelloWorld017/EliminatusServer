const Structure = require('./Structure');

class StructureExtractorCore extends Structure {
	constructor(game, x, y, rotation) {
		super("extractor_core", game, x, y, rotation);
		this.maxHealth = 250;
		this._health = this.maxHealth;
	}

	onTick() {
		//TODO implement
	}

	static get type() {
		return "extractor_core";
	}

	get userBuildable() {
		return true;
	}
}

module.exports = StructureExtractorCore;
