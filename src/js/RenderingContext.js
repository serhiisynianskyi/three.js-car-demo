export default class RenderingContext {
	constructor(scene, renderer, width, height) {
		this.scene = scene;
		this.renderer = renderer;
		this.width = width;
		this.height = height;
	}

	setOrthographicCamera() {
		this.camera = new THREE.OrthographicCamera(this.width / -2, this.width / 2, this.height / 2, this.height / -2, 0.1, 10000);
		this.camera.updateProjectionMatrix();
		this.camera.position.set(0, 50, -2000);
		this.camera.rotation.set(0, 0, 0);
		this.controls = new THREE.OrbitControls(this.camera);
		this.controls.enabled = false;
	}

	setPerspectiveCamera() {
		this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 10000);
		this.camera.updateProjectionMatrix();
		this.camera.position.set(1000, 700, -900);
		this.camera.rotation.set(-3, 1, 3);
		this.controls = new THREE.OrbitControls(this.camera);
		this.controls.enabled = true;
	}

	static getDefault(containerElement) {
		const width = window.innerWidth, height = window.innerHeight;
		const scene = new THREE.Scene();
		const renderer = new THREE.WebGLRenderer({antialias: true});
		let camera;
		let controls;

		renderer.setSize(width, height);
		renderer.setClearColor(0x111111);
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.toneMappingExposure = 1;

		containerElement.appendChild(renderer.domElement);

		return new RenderingContext(scene, renderer, width, height);
	}

	render() {
		this.renderer.render(this.scene, this.camera);
	}
}