const ElmError = require('../error/ElmError');
const structuresByType = require('../structures');

class World {
	constructor(game) {
		this.structures = new Map;
		this.entities = {};
		this.deathNote = [];
		this.lastEntityId = 0;

		this.game = game;
		this.settings = this.game.settings;
		this.width = this.settings.width;
		this.height = this.settings.height;

		this.structuresByType = structuresByType;
	}

	getPositionTag({x, y}) {
		return `${x}:${y}`;
	}

	generateWorld() {
		const headquater = new (structuresByType.get('headquater'))(this.game, this.width / 2, this.height / 2);
		this.addStructure(headquater, true);

		Object.keys(this.settings.generate).forEach((key) => {
			for(let i = 0; i < this.settings.generate[key]; i++) {
				let placeable = null;
				while(!placeable) {
					const x = Math.floor(Math.random() * (this.settings.width / 40));
					const y = Math.floor(Math.random() * (this.settings.height / 40));

					if(!this.structures[this.getPositionTag({x: x, y: y})]) {
						placeable = true;
						this.addStructure(new (this.structuresByType.get(key))(this.game, x * 40, y * 40), true);
					} else placeable = false;
				}
			}
		});
	}

	addStructure(object, force=false) {
		if(!force && !object.canBuiltOn()) {
			return new ElmError("Cannot build structure!", "world.structure.build.conditions");
		}

		const positions = object.getGridPosition();
		positions.forEach((v) => {
			const {x, y} = v;
			this.structures[this.getPositionTag({x, y})] = object;
		});
		this.game.announce('structure.spawn', object.getExportData());
	}

	removeStructure(object) {
		const positions = object.getGridPosition();
		positions.forEach((v) => {
			const {x, y} = v;
			delete this.structures[this.getPositionTag({x, y})];
		});

		user.announce('structure.remove', object.getExportData());
	}

	getStructureExportData() {
		return Object.keys(this.structures).map((key) => {
			return this.structures[key].getExportData();
		});
	}

	getEntityExportData() {
		return Object.keys(this.entities).map((key) => {
			return this.entities[key].getExportData();
		});
	}

	notifyWorld(user) {
		user.announce('world.entities', this.getEntityExportData());
		user.announce('world.structures', this.getStructureExportData());
	}

	tick() {
		const entityUpdate = Object.keys(this.entities).map((key) => {
			return this.entities[key].getExportData();
		});

		const structureUpdate = Object.keys(this.structures).map((key) => {
			return this.structures[key].updatedAttributes;
		});

		this.game.announce('world.tick', {
			entityUpdate, structureUpdate
		});
	}

	spawnEntity(entity) {
		entity.eid = ++this.lastEntityId;
		this.entities[entity.eid] = entity;
		this.game.announce('entity.spawn', entity.getExportData());

		return entity.eid;
	}

	despawnEntity(eid) {
		this.deathNote.push(eid);
	}
}

module.exports = World;
