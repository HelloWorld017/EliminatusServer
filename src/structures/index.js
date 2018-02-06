const StructureBarrel = require("./StructureBarrel");
const StructureHeadquater = require("./StructureHeadquater");
const StructureLamp = require("./StructureLamp");
const StructureOre = require("./StructureOre");
const StructureRock = require("./StructureRock");
const StructureStone = require("./StructureStone");
const StructureTree = require("./StructureTree");
const StructureTurret = require("./StructureTurret");

const structures = [
	StructureBarrel,
	StructureHeadquater,
	StructureLamp,
	StructureOre,
	StructureRock,
	StructureStone,
	StructureTree,
	StructureTurret
];
const structuresByType = new Map;

for(const structure of structures) {
	structuresByType.set(structure.type, structure);
}

module.exports = structuresByType;
