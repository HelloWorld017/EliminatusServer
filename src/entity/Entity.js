class Entity {
	constructor(entityName, game, x, y, z) {
		this.type = entityName;
		this.game = game;
		this.maxHealth = 100;
		this.eid = null;

		this._x = x;
		this._y = y;
		this._z = z;
		this._rotation = Math.PI / 2;
		this._health = this.maxHealth;
		this._updatedAttributes = {};

		this._addTrap('x', 'y', 'z', 'rotation');
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
			this.setDead();
		}
	}

	_addTrap(...propertyNames) {
		propertyNames.forEach(propertyName => {
			Object.defineProperty(this, propertyName, {
				get() {
					return this[`_${propertyName}`];
				},

				set(value) {
					this[`_${propertyName}`] = value;
					this._updatedAttributes[propertyName] = value;
				}
			});
		});

		return this;
	}

	setDead() {
		this.game.world.despawnEntity(this);
	}

	getExportData() {
		return {
			type: this.type,
			x: this.x,
			y: this.y,
			z: this.z,
			rotation: this.rotation,
			health: this.health,
			tags: {},
			id: this.eid
		};
	}
}

module.exports = Entity;
