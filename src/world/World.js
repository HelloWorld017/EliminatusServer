const uuid = require('uuid/v4');
const ElmError = require('../error/ElmError');
const structuresByType = require('../structures');

class World {
	constructor(game) {
		this.structures = {};
		this.structureList = new Map;
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

		object.uid = uuid();

		this.structureList.set(object.uid, object);

		const positions = object.getGridPosition();
		positions.forEach((v) => {
			const {x, y} = v;
			this.structures[this.getPositionTag({x, y})] = object;
		});

		if(!force) object.startBuildAnimation();
		this.game.announce('structure.spawn', {
			animate: !force ? [{
				type: "structure.build",
				args: {
					targetHealth: object.maxHealth
				}
			}] : [],
			structure: object.getExportData()
		});
	}

	removeStructure(object) {
		const positions = object.getGridPosition();
		positions.forEach((v) => {
			const {x, y} = v;
			delete this.structures[this.getPositionTag({x, y})];
		});

		this.structureList.delete(object.uid);

		this.game.announce('structure.remove', object.getExportData());
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
		const entityUpdate = Object.keys(this.entities).map(key => {
			this.entities[key].tick();

			if(!this.entities[key].needsUpdate) return false;

			return this.entities[key].updatedAttributes;
		}).filter(v => v);

		const structureUpdate = [...this.structureList.keys()].map(key => {
			this.structureList.get(key).tick();

			if(!this.structureList.get(key).needsUpdate) return false;

			return this.structureList.get(key).updatedAttributes;
		}).filter(v => v);

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
