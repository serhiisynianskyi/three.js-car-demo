import Wall from "./Wall";

const planeProps = {
	color: 0x444444,
	metalness: 0.1,
	roughness: 0.8
};

const edgesProps = {
	color: 0x999999,
	metalness: 0.7,
	roughness: 0.5
};

export default class GameScene extends Wall{
	constructor(planeData, wallsData) {
		super();
		this.planeData = planeData;
		this.wallsData = wallsData;
		this.meshes = this.createScene();
	}

	createScene() {
		let planeMesh = this.createObjectMesh(this.planeData.width, this.planeData.height, this.planeData.depth, planeProps);
		let edgesMesh = this.createWalls(this.wallsData, edgesProps);
		let fullMesh = new THREE.Group()
			.add(planeMesh)
			.add(edgesMesh);
		return {
			planeMesh,
			edgesMesh,
			fullMesh
		}
	}
}