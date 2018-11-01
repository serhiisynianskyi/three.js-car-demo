export default class Wall {
	constructor(props) {
		this.props = props;
	}

	createObjectMesh(width, height, depth, material) {
		let mesh = new THREE.Mesh(
			new THREE.BoxGeometry(width, height, depth),
			new THREE.MeshStandardMaterial(material)
		);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		return mesh
	}

	createWalls(wallsData, wallsProps) {
		let wallsMeshes = new THREE.Group();
		wallsData.forEach((item) => {
			let wallMesh = this.createObjectMesh(item.width, item.height, item.depth, wallsProps);
			wallMesh.position.set(item.x, item.y, item.z);
			if (item.rotate) {
				wallMesh.rotateY(item['rotate']);
			}
			wallsMeshes.add(wallMesh);
		});
		return wallsMeshes;
	}
}