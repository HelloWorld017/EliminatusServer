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

	get ingredients() {
		return {
			cytrium: 70,
			stone: 10,
			wood: 10
		};
	}

	static get type() {
		return "extractor_core";
	}

	get userBuildable() {
		return true;
	}

	canBuiltOn() {
		if(this.rotation % (Math.PI / 2) !== 0) return false;

		return this.getGridPosition().every(v => {
			const structure = this.game.world.structures[this.game.world.getPositionTag(v)];

			if(!structure) return false;
			return structure.type === 'ore';
		});
	}
}

module.exports = StructureExtractorCore;
