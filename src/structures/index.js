const StructureBarrel = require("./StructureBarrel");
const StructureHeadquater = require("./StructureHeadquater");
const StructureLamp = require("./StructureLamp");
const StructureOre = require("./StructureOre");
const StructureRock = require("./StructureRock");
const StructureStone = require("./StructureStone");
const StructureTree = require("./StructureTree");

const structures = [
	StructureBarrel,
	StructureHeadquater,
	StructureLamp,
	StructureOre,
	StructureRock,
	StructureStone,
	StructureTree
];
const structuresByType = {};

for(const structure of structures) {
	structuresByType[structure.type] = structure;
}

module.exports = structuresByType;
