import Wall from "./Wall";

const wallsProps = {
	color: 0x555555,
	metalness: 0.8,
	roughness: 0.2,
	transparent: true,
	opacity: 0.3
};

export default class Garage extends Wall{
	constructor(floorData, wallsData) {
		super();
		this.floorData = floorData;
		this.wallsData = wallsData;
		this.meshes = this.createScene();
	}

	createScene() {
		let ceilMesh = this.createObjectMesh(this.floorData.width, this.floorData.height, this.floorData.depth, wallsProps);
		let edgesMesh = this.createWalls(this.wallsData, wallsProps);
		let fullMesh = new THREE.Group()
			.add(ceilMesh)
			.add(edgesMesh);
		return {
			ceilMesh,
			edgesMesh,
			fullMesh
		}
	}
}