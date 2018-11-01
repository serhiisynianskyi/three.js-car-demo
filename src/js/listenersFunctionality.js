export {setListeners, setDefeat, setVictory}
import {renderingContext, gameControllerData} from "../index";

const mainWrapper = document.querySelector('.main-wrapper');
const modesWrapper = mainWrapper.querySelector('.modes-wrapper');
const restartButton = mainWrapper.querySelector('.restart');

const listeners = [
	{
		'target': document,
		'event': 'keydown',
		'handler': handleKeyDown
	},
	{
		'target': document,
		'event': 'keyup',
		'handler': handleKeyUp
	},
	{
		'target': window,
		'event': 'resize',
		'handler': resize
	},
	{
		'target': modesWrapper,
		'event': 'click',
		'handler': checkMode
	},
	{
		'target': restartButton,
		'event': 'click',
		'handler': initStart
	},
];

const gameClassList = {
	isLose: 'defeat',
	isWin: 'win'
};

function setListeners(data) {
	listeners.forEach((item) => {
		item.target.addEventListener(item.event, item.handler.bind(data));
	})
}

function checkKeyType(e) {
	let moveType = 'notype';
	let code = e.keyCode.toString();
	switch (code) {
		case '87': //w
			moveType = 'up';
			break;
		case '83': // s
			moveType = 'down';
			break;
		case '65': // a
			moveType = 'left';
			break;
		case '68': // d
			moveType = 'right';
			break;
		case '38': // ArrowUp
			moveType = 'up';
			break;
		case '40': // ArrowDown
			moveType = 'down';
			break;
		case '37': //ArrowLeft
			moveType = 'left';
			break;
		case '39': //ArrowRight
			moveType = 'right';
			break;
		default:
			moveType = false;
			break;
	}
	return moveType;
}

function handleKeyUp(e) {
	let moveType = checkKeyType(e);
	if (moveType) {
		if (moveType === 'up' || moveType === 'down') {
			this.isMoved = false;
		}
		this.carControls.turnDegree = 0;
	}
}

function handleKeyDown(e) {
	let moveType = checkKeyType(e);
	if (moveType) {
		setDirectionProperties(moveType, this);
	}
}

function setDirectionProperties(moveType, gameData) {
	if (moveType === 'up') {
		gameData.carControls.currentAcceleration = gameData.carControls.acceleration;
		gameData.isMoved = true;
		gameData.status.startMoved = true;
	}
	if (moveType === 'down') {
		gameData.carControls.currentAcceleration = -gameData.carControls.acceleration;
		gameData.isMoved = true;
		gameData.status.startMoved = true;
	}
	if (moveType === 'left') {
		gameData.carControls.turnDegree = 1;
	}
	if (moveType === 'right') {
		gameData.carControls.turnDegree = -1;
	}
}

function checkMode(e) {
	if (e.target.dataset.mode) {
		Array.prototype.forEach.call(modesWrapper.children, function (item) {
			item.classList.remove('active');
		});
		e.target.classList.add('active');
		setMode(e.target.dataset.mode, this)
	}
}

function setMode(mode, gameData) {
	switch (mode) {
		case 'mode-2d':
			renderingContext.setOrthographicCamera();
			break;
		case 'mode-3d':
			renderingContext.setPerspectiveCamera();
			break;
		default:
			break
	}
}

function resize() {
	renderingContext.camera.aspect = window.innerWidth / window.innerHeight;
	renderingContext.renderer.setSize(window.innerWidth, window.innerHeight);
	renderingContext.camera.updateProjectionMatrix();
}

function initStart() {
	this.carControls.currentSpeed = 0;
	this.carControls.currentAcceleration = 0;
	this.sceneObjects.totalBody.position.set(500, 32, 0);
	this.status.isRun = true;
	this.status.startMoved = false;
	Object.keys(gameClassList).forEach((item) => {
		mainWrapper.classList.remove(gameClassList[item]);
	});
}

function setDefeat (gameData) {
	gameData.status.isRun = false;
	mainWrapper.classList.add(gameClassList.isLose);
}

function setVictory(gameData) {
	gameData.status.isRun = false;
	mainWrapper.classList.add(gameClassList.isWin);
}