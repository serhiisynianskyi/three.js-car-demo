import Car from "../components/Car";
import gameData from "../../game-config";

const materials = [
	{
		materialType: new THREE.MeshStandardMaterial({
			color: 0x771111,
			metalness: 0.9,
			roughness: 0.1,
			refractionRatio: 0.1
		}), scale: 50
	},
	{materialType: new THREE.MeshStandardMaterial({color: 0x111111, metalness: 0.5, roughness: 0.7}), scale: 40}
];

export default function createCar(scene, gameControllerData) {
	let carObject = new Car(scene);
	let sceneObjects = gameControllerData.sceneObjects;
	let totalCarBody = new THREE.Group,
		carBody,
		carWheel,
		carWheels;

	carObject.getCarMesh(gameData.objectsUrls, materials)
		.then((item) => {
			carBody = item[0];
			carWheel = item[1];
			carWheels = createWheels(carWheel, gameData.wheelsPosition);
			let carCollisionBox = createCollisionBox(carBody);
			totalCarBody.add(carBody).add(carWheels).add(carCollisionBox);
			totalCarBody.position.set(500, 32, 0);

			sceneObjects.carBody = carBody;
			sceneObjects.wheels = carWheels;
			sceneObjects.totalBody = totalCarBody;
			sceneObjects.collisionPhantom = carCollisionBox;

			scene.add(totalCarBody);
		})
}

function createCollisionBox(carBody) {
	let carSize = new THREE.Box3().setFromObject(carBody);
	let carSizeData = [carSize.max.x - carSize.min.x, carSize.max.y - carSize.min.y, carSize.max.z - carSize.min.z];
	let cubeGeometry = new THREE.CubeGeometry(...carSizeData);
	let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, transparent: true, opacity: 0.0});
	let carCollisionBox = new THREE.Mesh(cubeGeometry, cubeMaterial);
	// сместить carCollisionBox относительно смещенного центра модели
	carCollisionBox.position.set(75, 10, 25);
	return carCollisionBox
}

function createWheels(carWheel, wheelsPositions) {
	let wheels = new THREE.Group();
	for (let item of wheelsPositions) {
		let cloneWheel = carWheel.clone();
		cloneWheel.position.set(item.position[0], item.position[1], item.position[2]);
		if (item.rotationAngle) {
			cloneWheel.rotateX(THREE.Math.degToRad(item.rotationAngle));
			cloneWheel.isLeftSide = true;
		}
		else {
			cloneWheel.isLeftSide = false;
		}
		wheels.add(cloneWheel);
	}
	return wheels;
}