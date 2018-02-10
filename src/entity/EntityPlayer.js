const Entity = require('./Entity');

class EntityPlayer extends Entity{
	constructor(game, user) {
		super('player', game, 4000, 0, 4040);

		this.id = user.id;
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

		this.updatedAttributes.tags.inventory = this.getInventoryExportData();
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
					//TODO prevent moving outside map, prevent flying
					revert = true;
				} else {
					this[k] = v;
				}
			}
		});

		if(typeof rot === 'number' && isFinite(rot)) {
			this.rotation = rot % (Math.PI * 2);
		}

		if(revert) {
			this.announce('entity.attribute', this.getExportData());
		}
	}

	getInventoryExportData() {
		const inv = {};
		this.inventory.forEach((v, k) => inv[k] = v);
		return inv;
	}

	get updatedAttributes() {
		const temp = this._updatedAttributes;
		this._updatedAttributes = {
			id: this.eid,
			tags: {
				uid: this.id
			}
		};

		return temp;
	}

	getExportData() {
		return {
			type: this.type,
			x: this.x,
			y: this.y,
			z: this.z,
			rotation: this.rotation,
			health: this.health,
			tags: {
				inventory: this.getInventoryExportData(),
				uid: this.id
			},
			id: this.eid
		};
	}
}

module.exports = EntityPlayer;
