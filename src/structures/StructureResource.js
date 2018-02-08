const Structure = require('./Structure');

class StructureResource extends Structure {
	constructor(networkId, game, x, y, rot) {
		super(networkId, game, x, y, rot);
		this.max = 10;
	}

	onPick(user) {
		const nextHealth = this.health - this.max / 10;

		if(nextHealth <= 0) {
			this.handlePick();
		}

		this.health = nextHealth;
	}

	handlePick() {

	}
}

module.exports = StructureResource;
