const Structure = require('./Structure');

class StructureExtractorCore extends Structure {
	constructor(game, x, y, rotation) {
		super("extractor_core", game, x, y, rotation);
		this.maxHealth = 250;
		this._health = this.maxHealth;
		this.extractTick = 0;
		this.connected = false;
	}

	onTick() {
		const gridPos = this.getGridPosition()[0];
		const adjustRot = this.rotation + Math.PI / 2;
		const connectedStructure = this.game.world.structures[
			`${gridPos.x - Math.cos(adjustRot)}:${gridPos.y - Math.sin(adjustRot)}`
		];

		if(connectedStructure && connectedStructure.type === 'transmitter_core') {
			if(!this.connected) {
				this.connected = true;

				this._updatedAttributes.tags.connected = true;
				this.needsUpdate = true;
			}

			this.extractTick++;

			if(this.extractTick === 40) {
				this.game.users.forEach((v) => {
					v.addItem("cytrium", 5);
				});

				this.extractTick = 0;
			}
		} else {
			if(this.connected) {
				this.connected = false;

				this._updatedAttributes.tags.connected = false;
				this.needsUpdate = true;
			}
		}
	}

	getTags() {
		return {
			connected: this.connected
		};
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
