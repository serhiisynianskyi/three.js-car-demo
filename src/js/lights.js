
export {createPointLight, createDirectionLight}

function createPointLight(position, color = 0xffcc00) {
	this.light = new THREE.SpotLight(color);
	this.light.castShadow = true;
	this.light.position.set(...position);
}

function createDirectionLight(position, color = 0xdfebff) {
	let lightDistance = 900;
	this.light = new THREE.DirectionalLight(color, 0.8);
	this.light.position.set(...position);
	this.light.position.multiplyScalar(1.3);
	this.light.castShadow = true;
	this.light.shadow.mapSize.width = 1024;
	this.light.shadow.mapSize.height = 1024;
	this.light.shadow.camera.left = -lightDistance;
	this.light.shadow.camera.right = lightDistance;
	this.light.shadow.camera.top = lightDistance;
	this.light.shadow.camera.bottom = -lightDistance;
	this.light.shadow.camera.far = 1800;
}