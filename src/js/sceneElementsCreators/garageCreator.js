import gameData from "../../game-config";
import Garage from "../components/Garage";
import {createPointLight} from "../lights"

let garageData = gameData.garageSize;
const wallsSize = [
	{
		prop: 'width',
		x: -garageData.size.depth / 2 + garageData.wallWidth / 2,
		y: garageData.size.height / 2,
		z: 0,
		rotate: Math.PI / 2
	},
	{
		prop: 'depth',
		x: 0,
		y: garageData.size.height / 2,
		z: garageData.size.width / 2 - garageData.wallWidth / 2
	},
	{
		prop: 'depth',
		x: 0,
		y: garageData.size.height / 2,
		z: -garageData.size.width / 2 + garageData.wallWidth / 2
	}
];

export default function createGarage(scene, gameControllerData) {
	let ceilSize = {
		width: garageData.size.width,
		height: garageData.wallWidth,
		depth: garageData.size.depth
	};
	wallsSize.forEach((item) => {
		item.width = garageData.size[item.prop];
		item.height = garageData.size.height;
		item.depth = garageData.wallWidth;
	});
	let garage = new Garage(ceilSize, wallsSize);
	garage.meshes.fullMesh.position.set(-400, 0, 0);
	garage.meshes.ceilMesh.position.set(0, garageData.size.height, 0);
	scene.add(garage.meshes.fullMesh);
	gameControllerData.sceneObjects.garage = garage.meshes.fullMesh;
	let spotLight = new createPointLight([-500, 150, 0]);
	scene.add(spotLight.light);

	if (garage.meshes) {
		gameControllerData.collidableMeshList.push(...garage.meshes.edgesMesh.children)
	}
}