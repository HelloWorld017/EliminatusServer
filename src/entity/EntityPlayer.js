const Entity = require('./Entity');

class EntityPlayer extends Entity{
	constructor(game, user) {
		super('player', game, 4000, 0, 4000);

		this.id = user.id;
		this.eid = null;
		this.user = user;
		this.user.game = game;
		this.game = game;
		this.inventory = new Map();
		this.maxHealth = game.settings.user.defaultHealth;

		this._health = this.maxHealth;
	}

	addItem(itemTag, addAmount) {
		const amount = this.inventory.get(itemTag);

		if(!amount) {
			amount = 0;
		}

		this.inventory.set(itemTag, amount + addAmount);
		this.noticeInventory();
	}

	announce(...args) {
		this.user.announce(...args);
	}

	verifyAndMove(x, y, z, rot) {
		const movement = {x, y, z};
		let revert = false;

		Object.keys(movement).forEach((k) => {
			const v = movement[k];

			if(v && typeof v === 'number') {
				if(Math.abs(this[k] - v) >= 15) {
					revert = true;
				} else {
					this[k] = v;
				}
			}
		});

		if(typeof rot === 'number' && isFinite(rot)) {
			this.rotation = rot / (Math.PI * 2);
		}

		if(revert) {
			this.announce('entity.attribute', this.getExportData());
		}
	}

	noticeInventory() {
		const inv = {};
		this.inventory.forEach((v, k) => inv[k] = v);
		this.announce('player.inventory', {inventory: inv});
	}
}

module.exports = EntityPlayer;
