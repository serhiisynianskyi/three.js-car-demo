import gameData from "../../game-config";
import GameScene from "../components/GameScene";

let sceneData = gameData.gameSceneSize;
const gameSceneSize = [
	{
		prop: 'width',
		x: sceneData.planeSize.depth / 2 - sceneData.edges.depth / 2,
		y: sceneData.edges.height / 2,
		z: 0,
		rotate: Math.PI / 2
	},
	{
		prop: 'width',
		x: -sceneData.planeSize.depth / 2 + sceneData.edges.depth / 2,
		y: sceneData.edges.height / 2,
		z: 0,
		rotate: Math.PI / 2
	},
	{
		prop: 'depth',
		x: 0,
		y: sceneData.edges.height / 2,
		z: sceneData.planeSize.width / 2 - sceneData.edges.depth / 2
	},
	{
		prop: 'depth',
		x: 0,
		y: sceneData.edges.height / 2,
		z: -sceneData.planeSize.width / 2 + sceneData.edges.depth / 2
	}
];

export default function createGameScene(scene, gameControllerData) {
	let planeData = {
		width: sceneData.planeSize.width,
		height: sceneData.planeSize.height,
		depth: sceneData.planeSize.depth
	};
	gameSceneSize.forEach((item) => {
		item.width = sceneData.planeSize[item.prop];
		item.height = sceneData.edges.height;
		item.depth = sceneData.edges.depth;
	});
	let gameScene = new GameScene(planeData, gameSceneSize);
	scene.add(gameScene.meshes.fullMesh);
	if (gameScene.meshes) {
		gameControllerData.collidableMeshList.push(...gameScene.meshes.edgesMesh.children)
	}
}