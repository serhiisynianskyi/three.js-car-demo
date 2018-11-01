export {checkMovement}

import {setDefeat, setVictory} from './listenersFunctionality'

function checkMovement(data) {
	setRotationDirection(data);
	turnWheels(data);
	if (data.carControls.currentSpeed !== 0 && data.status.isRun) {
		moveCar(data)
	}
	if (data.sceneObjects.collisionPhantom) {
		detectCollision(data)
	}
}

function detectCollision(data) {
	let originPoint = new THREE.Vector3().setFromMatrixPosition(data.sceneObjects.collisionPhantom.matrixWorld );
	for (let vertexIndex = 0; vertexIndex < data.sceneObjects.collisionPhantom.geometry.vertices.length; vertexIndex++) {
		let localVertex = data.sceneObjects.collisionPhantom.geometry.vertices[vertexIndex].clone();
		let globalVertex = localVertex.applyMatrix4(data.sceneObjects.collisionPhantom.matrix);
		let directionVector = globalVertex.sub(data.sceneObjects.collisionPhantom.position);
		let ray = new THREE.Raycaster()
		ray.set(originPoint, directionVector.clone().normalize());
		let collisionResults = ray.intersectObjects(data.collidableMeshList);
		if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
			setDefeat(data);
		}
	}
}

function turnWheels(data) {
	// TODO
}

function setRotationDirection(data) {
	if (data.isMoved && data.status.isRun) {
		data.isRestingState = false;
		let isForward = (data.carControls.currentSpeed <= data.carControls.maxForwardSpeed && data.carControls.currentAcceleration > 0);
		let isBackward = (data.carControls.currentSpeed >= -data.carControls.maxBackwardSpeed && data.carControls.currentAcceleration < 0);
		if (isForward || isBackward) {
			data.carControls.currentSpeed += data.carControls.currentAcceleration;
		}
		data.carControls.currentSpeed = THREE.Math.clamp(data.carControls.currentSpeed, -data.carControls.maxBackwardSpeed, data.carControls.maxForwardSpeed)
	}
	else {
		if (data.carControls.currentSpeed > 0) {
			data.carControls.currentSpeed -= data.carControls.deceleration;
		}
		if (data.carControls.currentSpeed < 0) {
			data.carControls.currentSpeed += data.carControls.deceleration;
		}
		if (Math.abs(data.carControls.currentSpeed.toFixed(4)) === Math.abs(data.carControls.currentAcceleration.toFixed(4))) {
			data.carControls.currentSpeed = 0;
			data.isRestingState = true;
			if(data.status.startMoved){
				checkParkingPosition(data)
			}
		}
	}
}

function checkParkingPosition(data) {
	let carPosition = new THREE.Box3().setFromObject(data.sceneObjects.totalBody);
	let garagePosition = new THREE.Box3().setFromObject(data.sceneObjects.garage);
	if(carPosition.max.x < garagePosition.max.x && carPosition.min.x > (garagePosition.min.x+30) && data.status.startMoved) {
		setVictory(data);
	}
	else {
		setDefeat(data);
	}
}

function moveCar(data) {
	if(data.sceneObjects.totalBody) {
		data.sceneObjects.wheels.children.forEach((item)=> {
			item.rotation.z += item.isLeftSide ? -data.carControls.currentSpeed : data.carControls.currentSpeed;
		});
		data.sceneObjects.totalBody.position.x -= data.carControls.currentSpeed * 45;
		data.sceneObjects.totalBody.position.z += Math.sin(THREE.Math.degToRad(data.carControls.turnDegree));
	}
}