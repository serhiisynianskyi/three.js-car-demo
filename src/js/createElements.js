"use strict";

import createCar from './sceneElementsCreators/carCreator'
import createGameScene from './sceneElementsCreators/gameSceneCreator'
import createGarage from './sceneElementsCreators/garageCreator'

export {createElements}

function createElements(scene, gameSceneData, gameControllerData) {
	createGameScene(scene, gameControllerData);
	createCar(scene, gameControllerData);
	createGarage(scene, gameControllerData);
}