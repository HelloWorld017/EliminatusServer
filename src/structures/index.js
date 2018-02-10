const StructureBarrel = require("./StructureBarrel");
const StructureEngineeringCore = require('./StructureEngineeringCore');
const StructureExtractorCore = require('./StructureExtractorCore');
const StructureFactoryCore = require('./StructureFactoryCore');
const StructureGeneratorCore = require('./StructureGeneratorCore');
const StructureHeadquater = require("./StructureHeadquater");
const StructureLamp = require("./StructureLamp");
const StructureOre = require("./StructureOre");
const StructureRepairCore = require('./StructureRepairCore');
const StructureRock = require("./StructureRock");
const StructureRotatedWall = require('./StructureRotatedWall');
const StructureStone = require("./StructureStone");
const StructureTransmitterCore = require('./StructureTransmitterCore');
const StructureTree = require("./StructureTree");
const StructureTurret = require("./StructureTurret");
const StructureWall = require('./StructureWall');

const structures = [
	StructureBarrel,
	StructureExtractorCore,
	StructureEngineeringCore,
	StructureFactoryCore,
	StructureGeneratorCore,
	StructureHeadquater,
	StructureLamp,
	StructureOre,
	StructureRepairCore,
	StructureRock,
	StructureRotatedWall,
	StructureStone,
	StructureTransmitterCore,
	StructureTree,
	StructureTurret,
	StructureWall
];
const structuresByType = new Map;

for(const structure of structures) {
	structuresByType.set(structure.type, structure);
}

module.exports = structuresByType;
