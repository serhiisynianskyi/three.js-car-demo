const textureCube = new THREE.CubeTextureLoader()
	.setPath('../images/snow_dust/')
	.load(['sleepyhollow_ft.jpg', 'sleepyhollow_bk.jpg', 'sleepyhollow_up.jpg', 'sleepyhollow_dn.jpg', 'sleepyhollow_rt.jpg', 'sleepyhollow_lf.jpg']);

const wheelsParts = [302, 303, 304, 305];

export default class Car{
	constructor(scene) {
		this.scene = scene;
	}

	getCarObject(url) {
		let meshes = [],
			objLoader = new THREE.OBJLoader();
		return new Promise((resolve, reject) => {
			objLoader.load(url, (object) => {
				object.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						child.castShadow = true;
						child.receiveShadow = true;
						meshes.push(child);
						resolve(meshes);
					}
				})
			})
		})
	}

	createMesh(meshes, material, scale) {
		let carGroup = new THREE.Group();
		let cloneMesh;
		meshes.forEach((item, index) => {
			let carMesh = item;

			carMesh.material = material;
			carMesh.material.envMap = textureCube;
			if (!wheelsParts.includes(index)) {
				carGroup.add(carMesh);
			}
			carGroup.scale.set(scale, scale, scale);
			carGroup.castShadow = true;
			carGroup.receiveShadow = true;
		});
		return carGroup
	}

	getCarMesh(urls, materials) {
		return Promise.all(urls.map(this.getCarObject)).then(results => {
			let totalBodyGroup = [];
			results.forEach((item, index) => {
				totalBodyGroup.push(this.createMesh(item, materials[index].materialType, materials[index].scale));
			});
			return totalBodyGroup
		});
	}
}