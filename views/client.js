var gameIsStarted = 0;

var monsters;
//Define physical dimension to scale playboard
var min;
//PAUSED
var paused = false;
$(document).ready(function() {
	//Define default game money
	const initialGameMoney = 40;
	//Define money
	var gameMoney = initialGameMoney;
	//Degfine gameLife
	var gameLife = 100;
	//Define game score
	var score = 0;
	//Define max of towers
	const maxTowers = 23;
	//Define game tick
	var gameTick = 0;
	//Define game level
	var waveCount = 0;
	//Define monsters count
	var monsterCount = 5;
	//Define backgrund image
	const img = new Image();
	img.src = "images/Copie_4.jpg";
	//Define mac height dimension
	const macDisplaySize = 803;
	//Define mac constant dimension after monsters
	const macDisplaySizeMonsters = 826;
	//Define tower 1 image
	const tower1Image = new Image();
	tower1Image.src = "images/tower1.png";
	//Define tower 2 image
	const tower2Image = new Image();
	tower2Image.src = "images/tower2.png";
	//Define tower 3 image
	const tower3Image = new Image();
	tower3Image.src = "images/tower3.png";
	//Define empty point
	const emptyPointer = new Image();
	emptyPointer.src = "images/grid.png"
	//Define yellow empty point
	const emptyYellowPointer = new Image();
	emptyYellowPointer.src = "images/grid-yellow1.png";
	//Game zone canvas object
	const canvas = document.getElementById("game_zone");
	//Define virtual size of free square, after it will be converted to real pixels
	var sizeRect = 80 / macDisplaySize * min;
	//Define selected tower to build
	var selectedTower = 0;
	//Define last min
	var lastDimension = -1;
	//Define free spaces on the map
	const pointsVirtual = [
		//Prima linie
		{ type: 0, tick: 0, tickLimit: 10, x: 320, y: -10},
		{ type: 0, tick: 0, tickLimit: 10, x: 440, y: -10},
		{ type: 0, tick: 0, tickLimit: 10, x: 560, y: -10},
		{ type: 0, tick: 0, tickLimit: 10, x: 680, y: -10},
		//A doua linie
		{ type: 0, tick: 0, tickLimit: 10, x: 320, y: 80},
		{ type: 0, tick: 0, tickLimit: 10, x: 440, y: 80},
		{ type: 0, tick: 0, tickLimit: 10, x: 560, y: 80},
		{ type: 0, tick: 0, tickLimit: 10, x: 680, y: 90},
		//Unul singur in dreapta
		{ type: 0, tick: 0, tickLimit: 10, x: 680, y: 220},
		//Mijlocul
		{ type: 0, tick: 0, tickLimit: 10, x: 310, y: 280},
		{ type: 0, tick: 0, tickLimit: 10, x: 450, y: 280},
		{ type: 0, tick: 0, tickLimit: 10, x: 310, y: 360},
		{ type: 0, tick: 0, tickLimit: 10, x: 450, y: 360},
		//Stanga primul rand
		{ type: 0, tick: 0, tickLimit: 10, x: 10,  y: 240},
		{ type: 0, tick: 0, tickLimit: 10, x: 130, y: 240},
		//Stanga al doilea rand
		{ type: 0, tick: 0, tickLimit: 10, x: 10,  y: 350},
		{ type: 0, tick: 0, tickLimit: 10, x: 130, y: 350},
		//Mai jos de caruta
		{ type: 0, tick: 0, tickLimit: 10, x: 680, y: 440},
		//In jurul turnului
		{ type: 0, tick: 0, tickLimit: 10, x: 130, y: 590},
		{ type: 0, tick: 0, tickLimit: 10, x: 290, y: 590},
		//In dreapta turnului
		{ type: 0, tick: 0, tickLimit: 10, x: 480, y: 620},
		{ type: 0, tick: 0, tickLimit: 10, x: 590, y: 620},
		{ type: 0, tick: 0, tickLimit: 10, x: 700, y: 620},
	];
	var points;
	//Define bullets
	var bullets = [];
	//Define monsters
	const monstersConst = [
		// { stateImg: 0, state: 0, type: 1, x: 50, y: 30, hp: 100},
		// { stateImg: 0, state: 0, type: 2, x: -100, y: 30, hp: 100},
		// { stateImg: 0, state: 10, type: 0, x: 50, y: 210, hp: 100},
	];
	//Define bullet image
	const bullet1 = new Image();
	bullet1.src = "images/fireball.png";
	const bullet2 = new Image();
	bullet2.src = "images/electricbullet.png";
	const bullet3 = new Image();
	bullet3.src = "images/rockball.png";
	////////////////////////////////// TOWER CONFIG
	//Towers distance
	const tower1Distance = 150;
	const tower2Distance = 120;
	const tower3Distance = 100;
	//Towers limit tick
	const tower1Tick = 20;
	const tower2Tick = 25;
	const tower3Tick = 55;
	//Towers damage
	const tower1Damage = 20;
	const tower2Damage = 30;
	const tower3Damage = 50;
	//Towers damage
	const tower1Speed = 10;
	const tower2Speed = 15;
	const tower3Speed = 20;
	////////////////////////////////  END TOWER CONFIG
	//Define monsters modify
	//Define monster image
	const monster1 = new Image();
	monster1.src = "images/WALK_000.png";
	//Monsters states img
	const monstersImages1 = new Array();
	monstersImages1[0] = new Image();
	monstersImages1[0].src = "images/WALK_000.png";
	monstersImages1[1] = new Image();
	monstersImages1[1].src = "images/WALK_001.png";
	monstersImages1[2] = new Image();
	monstersImages1[2].src = "images/WALK_002.png";
	monstersImages1[3] = new Image();
	monstersImages1[3].src = "images/WALK_003.png";
	monstersImages1[4] = new Image();
	monstersImages1[4].src = "images/WALK_004.png";
	monstersImages1[5] = new Image();
	monstersImages1[5].src = "images/WALK_005.png";
	monstersImages1[6] = new Image();
	monstersImages1[6].src = "images/WALK_006.png";

	const monstersImages1Left = new Array();
	monstersImages1Left[0] = new Image();
	monstersImages1Left[0].src = "images/WALK_000_l.png";
	monstersImages1Left[1] = new Image();
	monstersImages1Left[1].src = "images/WALK_001_l.png";
	monstersImages1Left[2] = new Image();
	monstersImages1Left[2].src = "images/WALK_002_l.png";
	monstersImages1Left[3] = new Image();
	monstersImages1Left[3].src = "images/WALK_003_l.png";
	monstersImages1Left[4] = new Image();
	monstersImages1Left[4].src = "images/WALK_004_l.png";
	monstersImages1Left[5] = new Image();
	monstersImages1Left[5].src = "images/WALK_005_l.png";
	monstersImages1Left[6] = new Image();
	monstersImages1Left[6].src = "images/WALK_006_l.png";

	const monstersImages2 = new Array();
	monstersImages2[0] = new Image();
	monstersImages2[0].src = "images/WALK_100.png";
	monstersImages2[1] = new Image();
	monstersImages2[1].src = "images/WALK_101.png";
	monstersImages2[2] = new Image();
	monstersImages2[2].src = "images/WALK_102.png";
	monstersImages2[3] = new Image();
	monstersImages2[3].src = "images/WALK_103.png";
	monstersImages2[4] = new Image();
	monstersImages2[4].src = "images/WALK_104.png";
	monstersImages2[5] = new Image();
	monstersImages2[5].src = "images/WALK_105.png";
	monstersImages2[6] = new Image();
	monstersImages2[6].src = "images/WALK_106.png";

	const monstersImages2Left = new Array();
	monstersImages2Left[0] = new Image();
	monstersImages2Left[0].src = "images/WALK_100_l.png";
	monstersImages2Left[1] = new Image();
	monstersImages2Left[1].src = "images/WALK_101_l.png";
	monstersImages2Left[2] = new Image();
	monstersImages2Left[2].src = "images/WALK_102_l.png";
	monstersImages2Left[3] = new Image();
	monstersImages2Left[3].src = "images/WALK_103_l.png";
	monstersImages2Left[4] = new Image();
	monstersImages2Left[4].src = "images/WALK_104_l.png";
	monstersImages2Left[5] = new Image();
	monstersImages2Left[5].src = "images/WALK_105_l.png";
	monstersImages2Left[6] = new Image();
	monstersImages2Left[6].src = "images/WALK_106_l.png";


	const monstersImages3 = new Array();
	monstersImages3[0] = new Image();
	monstersImages3[0].src = "images/WALK_200.png";
	monstersImages3[1] = new Image();
	monstersImages3[1].src = "images/WALK_201.png";
	monstersImages3[2] = new Image();
	monstersImages3[2].src = "images/WALK_202.png";
	monstersImages3[3] = new Image();
	monstersImages3[3].src = "images/WALK_203.png";
	monstersImages3[4] = new Image();
	monstersImages3[4].src = "images/WALK_204.png";
	monstersImages3[5] = new Image();
	monstersImages3[5].src = "images/WALK_205.png";
	monstersImages3[6] = new Image();
	monstersImages3[6].src = "images/WALK_206.png";

	const monstersImages3Left = new Array();
	monstersImages3Left[0] = new Image();
	monstersImages3Left[0].src = "images/WALK_200_l.png";
	monstersImages3Left[1] = new Image();
	monstersImages3Left[1].src = "images/WALK_201_l.png";
	monstersImages3Left[2] = new Image();
	monstersImages3Left[2].src = "images/WALK_202_l.png";
	monstersImages3Left[3] = new Image();
	monstersImages3Left[3].src = "images/WALK_203_l.png";
	monstersImages3Left[4] = new Image();
	monstersImages3Left[4].src = "images/WALK_204_l.png";
	monstersImages3Left[5] = new Image();
	monstersImages3Left[5].src = "images/WALK_205_l.png";
	monstersImages3Left[6] = new Image();
	monstersImages3Left[6].src = "images/WALK_206_l.png";
	//Define state directions
	const toRight = [0, 10, 4];
	const toLeft = [12, 14, 2];
	const toDown = [1, 3, 13, 11];
	//Define interval variable
	var timer = null;
	//END definition zone

	const setCanvasSize = () => {
		document.getElementById("game_zone").height = min;
		document.getElementById("game_zone").width = min;
	}
	const setImagesSize = (next) => {
		img.width = min;
		img.height = min;
		tower1Image.width = 80 / macDisplaySize * min;
		tower1Image.height = 139 / macDisplaySize * min;
		tower2Image.width = 80 / macDisplaySize * min;
		tower2Image.height = 136 / macDisplaySize * min;
		tower3Image.width = 80 / macDisplaySize * min;
		tower3Image.height = 141 / macDisplaySize * min;
		//Scale monsters
		monster1.width = 100 / macDisplaySize * min;
		monster1.height = 67 / macDisplaySize * min;
		for (var i = 0; i < monstersImages1.length; i++) {
			monstersImages1[i].width = 100 / macDisplaySize * min;
			monstersImages1[i].height = 67 / macDisplaySize * min;
			monstersImages1Left[i].width = 100 / macDisplaySize * min;
			monstersImages1Left[i].height = 67 / macDisplaySize * min;
			monstersImages2[i].width = 100 / macDisplaySize * min;
			monstersImages2[i].height = 67 / macDisplaySize * min;
			monstersImages2Left[i].width = 100 / macDisplaySize * min;
			monstersImages2Left[i].height = 67 / macDisplaySize * min;
			monstersImages3[i].width = 100 / macDisplaySize * min;
			monstersImages3[i].height = 67 / macDisplaySize * min;
			monstersImages3Left[i].width = 100 / macDisplaySize * min;
			monstersImages3Left[i].height = 67 / macDisplaySize * min;
		}
		//bullets
		bullet1.width = 20 / macDisplaySize * min;
		bullet1.height = 20 / macDisplaySize * min;
		bullet2.width = 30 / macDisplaySize * min;
		bullet2.height = 30 / macDisplaySize * min;
		bullet3.width = 30 / macDisplaySize * min;
		bullet3.height = 30 / macDisplaySize * min;
		//ENd scale
		emptyPointer.width = 80 / macDisplaySize * min;
		emptyPointer.height = 80 / macDisplaySize * min;
		emptyYellowPointer.width = 80 / macDisplaySize * min;
		emptyYellowPointer.height = 80 / macDisplaySize * min;
		$('#tw1').width(80 / macDisplaySize * min);
		$('#tw1').height(139 / macDisplaySize * min);
		$('#tw2').height(136 / macDisplaySize * min);
		$('#tw2').width(80 / macDisplaySize * min);
		$('#tw3').width(80 / macDisplaySize * min);
		$('#tw3').height(141 / macDisplaySize * min);
		$('#destroy').width(80 / macDisplaySize * min);
		$('#destroy').height(80 / macDisplaySize * min);
		$('#tower_zone').height(750 / macDisplaySize * min);
		$('#tower_zone').width(211 / macDisplaySize * min);
		$('#tower_zone').css('padding-top', 50 / 730 * min);
		$('hr').width(80 / 210 * $('#tower_zone').width());
		next();
	}

	const getAvailableHeight = () => {
		var height = window.innerHeight;
		height -= $('#game_zone').position().top; //space betwen canvas and top page
		return height;
	}

	const getAvailableWidth = () => {
		var width = window.innerWidth;
		//width -= $('#game_zone').position().left; //space betwen canvas and top page
		width -= $('#tower_zone').width() + 10;
		return width;
	}

	const resetAllImages = () => {
		$('#tw3').attr('src', 'images/tower3.png');
		$('#tw2').attr('src', 'images/tower1.png');
		$('#tw1').attr('src', 'images/tower2.png');
		$('#destroy').attr('src', 'images/sell.png');
	}

	document.getElementById('tw1').addEventListener('click', function (e) {
		resetAllImages();
		if (selectedTower == 1) {
			selectedTower = 0;
		} else {
			selectedTower = 1;
			$('#tw1').attr('src', 'images/tower2_2.png');
		}
		redraw();
	});

	const addRandomMonster = () => {
		if (monsters.length == 0 && monsterCount == 0) {
			waveCount++;
			monsterCount = 10 + waveCount * 3;
		}
		if (monsterCount == 0)
			return;
		monsterCount--;
		var monstersAvailable;
		if (waveCount < 3) {
			monstersAvailable = 1;
		} else if (waveCount < 5) {
			monstersAvailable = 2;
		} else {
			monstersAvailable = 3;
		}
		var typeMonster = Math.floor((Math.random() * 100)) % monstersAvailable;
		var location = Math.floor((Math.random() * 100)) % 2;
		lastDimension = min;
		if (location == 0) {
			monsters.push({
				stateImg: 0, 
				state: 0, 
				type: typeMonster, 
				x: 50 / macDisplaySize * min, 
				y: 30 / macDisplaySize * min, 
				hp: 150 + (typeMonster + 1) * 20 * waveCount
			});
		} else {
			monsters.push({
				stateImg: 0, 
				state: 10, 
				type: typeMonster, 
				x: 50 / macDisplaySize * min, 
				y: 210 / macDisplaySize * min , 
				hp: 150 + (typeMonster + 1) * 20 * waveCount
			});
		}
	}


	document.getElementById('tw2').addEventListener('click', function (e) {
		resetAllImages();
		if (selectedTower == 2) {
			selectedTower = 0;
		} else {
			selectedTower = 2;
			$('#tw2').attr('src', 'images/tower1_2.png');
		}
		redraw();
	});

	document.getElementById('tw3').addEventListener('click', function (e) {
		resetAllImages();
		if (selectedTower == 3) {
			selectedTower = 0;
		} else {
			selectedTower = 3;
			$('#tw3').attr('src', 'images/tower3_2.png');
		}
		redraw();
	});

	document.getElementById('destroy').addEventListener('click', function (e) {
		resetAllImages();
		if (selectedTower == -1) {
			selectedTower = 0;
		} else {
			$('#destroy').attr('src', 'images/sell_click.png');
			selectedTower = -1;
		}
		redraw();
	});

	const updateLabelValues = () => {
		$('#scor').html("Scor: "+score);
		$('#money').html("Bani: "+gameMoney);
	}


	const updateSizes = () => {
		if (getAvailableWidth() < getAvailableHeight()){
			min = getAvailableWidth();
		} else {
			min = getAvailableHeight();

		}
		sizeRect = 80 / macDisplaySize * min;
		setImagesSize(setCanvasSize);
		if (gameIsStarted == 0) {
			monsters = JSON.parse(JSON.stringify(monstersConst));
			points = JSON.parse(JSON.stringify(pointsVirtual));
			gameIsStarted = 1;
		}
		for (var i = 0; i < points.length; i++) {
			points[i].x = pointsVirtual[i].x / macDisplaySize * min + $('#game_zone').position().left;
			points[i].y = pointsVirtual[i].y / macDisplaySize * min + $('#game_zone').position().top;
		}
		for (var i = 0; i < monsters.length; i++) {
			monsters[i].x = monsters[i].x / lastDimension * min + $('#game_zone').position().left;
			monsters[i].y = monsters[i].y / lastDimension * min + $('#game_zone').position().top;

			if (monsters.length - 1 == i) {
				lastDimension = min;
			}
		}
	}

	const drawMonsters = (monster, ctx) => {
		if (monster.type == 0) {
			if ($.inArray(monster.state, toLeft) != -1 || monster.state == 13 || monster.state == 11) {
				ctx.drawImage(monstersImages1Left[monster.stateImg],
											monster.x,
											monster.y,
											monstersImages1Left[monster.stateImg].width,
											monstersImages1Left[monster.stateImg].height);
			} else {
				ctx.drawImage(monstersImages1[monster.stateImg],
											monster.x,
											monster.y,
											monstersImages1[monster.stateImg].width,
											monstersImages1[monster.stateImg].height);
			}
		} else if (monster.type == 1) {
			if ($.inArray(monster.state, toLeft) != -1 || monster.state == 13 || monster.state == 11) {
				ctx.drawImage(monstersImages2Left[monster.stateImg],
											monster.x,
											monster.y,
											monstersImages2Left[monster.stateImg].width,
											monstersImages2Left[monster.stateImg].height);

			} else {
				ctx.drawImage(monstersImages2[monster.stateImg],
											monster.x,
											monster.y,
											monstersImages2[monster.stateImg].width,
											monstersImages2[monster.stateImg].height);
			}
		} else if (monster.type == 2) {
			if ($.inArray(monster.state, toLeft) != -1 || monster.state == 13 || monster.state == 11) {
				ctx.drawImage(monstersImages3Left[monster.stateImg],
											monster.x,
											monster.y,
											monstersImages3Left[monster.stateImg].width,
											monstersImages3Left[monster.stateImg].height);
			} else {
				ctx.drawImage(monstersImages3[monster.stateImg],
											monster.x,
											monster.y,
											monstersImages3[monster.stateImg].width,
											monstersImages3[monster.stateImg].height);
			}
		}
		ctx.beginPath();
		ctx.rect(monster.x + 20 / macDisplaySize * min, monster.y - 10 / macDisplaySize * min, monster.hp / (150 + (monster.type + 1) * 20 * waveCount) * (50 / macDisplaySize * min), 8 / macDisplaySize * min);
		console.log(monster.hp)
		if (monster.hp / (150 + (monster.type + 1) * 20 * waveCount) > 0.6) {
			ctx.fillStyle = "#39e600";
			ctx.fill();
		} else if (monster.hp / (150 + (monster.type + 1) * 20 * waveCount) > 0.3) {

			ctx.fillStyle = "#ffbf00";
			ctx.fill();
		} else {
			ctx.fillStyle = "#b32400";
			ctx.fill();
		}
		ctx.stroke();
		ctx.closePath();
	}

	const drawBullets = (ctx) => {
		for (var i = 0; i < bullets.length; i++) {
			if (bullets[i].type == 1) {
				ctx.drawImage(bullet1, bullets[i].x, bullets[i].y, bullet1.width, bullet1.height);
			} else if (bullets[i].type == 2) {
				ctx.drawImage(bullet2, bullets[i].x, bullets[i].y, bullet2.width, bullet2.height);
			} else if (bullets[i].type == 3) {
				ctx.drawImage(bullet3, bullets[i].x, bullets[i].y, bullet3.width, bullet3.height);
			}
		}
	}

	const redraw = function() {
		//Set correct image dimensions
		setImagesSize(setCanvasSize);
		//Get canvas element
		const c = document.getElementById("game_zone");
		//Get 2D context on Canvas
		var ctx = c.getContext("2d");
		//Resize canvas with user window
		ctx.canvas.width = min;
		ctx.canvas.height = min;
		//Draw game_zone on canvas
		ctx.drawImage(img, 0, 0, min, min);
		//Draw monsters
		for (i = 0; i < monsters.length; i++) {
			drawMonsters(monsters[i], ctx);
		}
		//Draw towers on image
		for (i = 0; i < points.length; i++) {
			/*
				-1 = emoty focused place
				0 = empty place
				1 = tower of type 1
				2 = tower of type 2
			*/
			if (points[i].type == 2) {
				ctx.drawImage(tower1Image,
								points[i].x,
								points[i].y,
								tower1Image.width,
								tower1Image.height);
			}  else if (points[i].type == 1) {
				ctx.drawImage(tower2Image,
								points[i].x,
								points[i].y,
								tower2Image.width,
								tower2Image.height);
			} else if (points[i].type == 3) {
				ctx.drawImage(tower3Image,
								points[i].x,
								points[i].y,
								tower3Image.width,
								tower3Image.height);
			} else if (points[i].type == -1 || (selectedTower > 0 && points[i].type == 0)) {
				ctx.drawImage(emptyYellowPointer,
								points[i].x,
								points[i].y + (50 / macDisplaySize * min),
								emptyYellowPointer.width,
								emptyYellowPointer.height);
			}
		}
		//Drag game life
		ctx.beginPath();
		ctx.rect(205 / macDisplaySize * min, 
				 770 / macDisplaySize * min, 
				 (gameLife / 100) * 100 / macDisplaySize * min, 
				 15 / macDisplaySize * min);
		if (gameLife > 60) {
			ctx.fillStyle = "#39e600";
			ctx.fill();
		} else if (gameLife >  30) {
			ctx.fillStyle = "#ffbf00";
			ctx.fill();
		} else {
			ctx.fillStyle = "#b32400";
			ctx.fill();
		}
		ctx.stroke();
		ctx.closePath();


		///
		drawBullets(ctx);
	}

	changeToRed = (event) => {
		event.src="images/grid-yellow.png"
	}

	changeToGray = (event) => {
		event.src="images/grid.png"
	}

	const checkSize = () => {
		if (window.innerHeight < 500 || window.innerWidth < 500) {
			//('#modal_message').text('We can\'t display game on your display, please get minim 500x500 resolution');
			//modal.style.display = "block";
			$('#not-ready-message').text('Please resize the window');
			$('div#body').hide();
			$('div#not-ready').show();
			return false;
		} else {
			return true;
		}
	}

	const pause = () => {
		paused = !paused;
		if (!paused)
			timer = setInterval(moveDinamicObjects, 35);
		if (paused)
			clearInterval(timer);
	}

	testFunction = (event) => {
		if (localStorage && 'monsters' in localStorage && 'points' in localStorage) {
			gameIsStarted = 1;
			monsters = JSON.parse(localStorage.monsters);
			points = JSON.parse(localStorage.points);
			lastDimension = parseInt(localStorage.lastDimension);
			waveCount = parseInt(localStorage.waveCount);
			gameLife = parseInt(localStorage.gameLife);
			gameMoney = parseInt(localStorage.gameMoney);
			score = parseInt(localStorage.score);
		}
		updateLabelValues();
		paused = true;
		clearInterval(timer);
		$('#game_zone').css('display', 'none');
		$('#tower_zone').css('display', 'none');
		if (checkSize()) {
			updateSizes();
			redraw();
			setTimeout(() => {
				$('#loading').css('display','none');
				$('#game_zone').css('display','block');
				$('#tower_zone').css('display','block');
				$('div#body').show();
				$('div#not-ready').hide();
			},1000);
		}
	}

	const addMoneyBySell = (type) => {
		if (type == 1) {
			gameMoney += 10;
		} else if (type == 2) {
			gameMoney += 20;
		} else if (type == 3) {
			gameMoney += 40;
		}
		updateLabelValues();
	}

	/*
		Function that update towers/empty positions based on click.
		Every place could change image when the towers from the right
		side is clicked
	*/
	const changeBox = (canvas, evt) => {
		var isClickInBox = false;
		var changeImage = false;
		var mouserPosition = getMousePos(canvas, evt);
		for (var i = 0; i < points.length; i++) {
			if (mouserPosition.x >= points[i].x &&
				mouserPosition.x <= points[i].x + sizeRect &&
				mouserPosition.y >= points[i].y + (50 / macDisplaySize * min) &&
				mouserPosition.y <= points[i].y + sizeRect + (50 / macDisplaySize * min)) {
				isClickInBox = true;
				//Build tower of type 1
				if (selectedTower == 1  && points[i].type < 1 && gameMoney >= 15) {
					gameMoney -= 15;
					points[i].type = 1;
					selectedTower = 0;
					$('#tw1').css('border','');
					changeImage = true;
				} else if (selectedTower == 2 && points[i].type < 1 && gameMoney >= 30) {
					gameMoney -= 30;
					points[i].type = 2;
					selectedTower = 0;
					$('#tw2').css('border','');
					changeImage = true;
				} else if (selectedTower == 3 && points[i].type < 1 && gameMoney >= 50) {
					gameMoney -= 50;
					points[i].type = 3;
					selectedTower = 0;
					$('#tw3').css('border','');
					changeImage = true;
				} else if (selectedTower == -1 && points[i].type > 0) {
					//Destroy tower, it should have type 1, 2 or 3
					addMoneyBySell(points[i].type);
					selectedTower = 0;
					points[i].type = 0;
					$('#destroy').css('border', '');
				}
			}
		}
		updateLabelValues();
		if (isClickInBox) {
			redraw();
			if (changeImage) {
				resetAllImages();
			}
		}
	}

	const distance = (x1, y1, x2, y2) => {
		return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
	}

	const checkColision = () => {
		for (var i = 0; i < monsters.length; i++) {
			for (var j = 0; j < bullets.length; j++) {
				if (distance(monsters[i].x + 50 / macDisplaySize * min,
										 monsters[i].y + 33 / macDisplaySize * min,
										 bullets[j].x,
										 bullets[j].y)
										 < 35) {
					monsters[i].hp -= bullets[j].damage;
					bullets.splice(j, 1);
				}
			}
		}
	}

	const limitFor = (type) => {
		if (type == 1) {
			return tower1Tick;
		} else if (type == 2) {
			return tower2Tick;
		} else if (type == 3) {
			return tower3Tick;
		}
	}

	const getSpeed = (type) => {
		if (type == 1) {
			return tower1Speed;
		} else if (type == 2) {
			return tower2Speed;
		} else if (type == 3) {
			return tower3Speed;
		}
	}

	const getDistance = (type) => {
		if (type == 1) {
			return tower1Distance;
		} else if (type == 2) {
			return tower2Distance;
		} else if (type == 3) {
			return tower3Distance;
		}
	}

	const getDamage = (type) => {
		if (type == 1) {
			return tower1Damage;
		} else if (type == 2) {
			return tower2Damage;
		} else if (type == 3) {
			return tower3Damage;
		}
	}

	const initialGame = () => {
		localStorage.clear();
		monsters = [];
		bullets = [];
		points = JSON.parse(JSON.stringify(pointsVirtual));
		gameMoney = initialGameMoney;
		gameLife = 100;
		waveCount = 0;
		score = 0;
		monsterCount = 5
		selectedTower = 0;
		lastDimension = -1;
		paused = false;
		clearInterval(timer);
		pause();
		updateSizes();
	}

	const moveDinamicObjects = () => {
		if (gameLife <= 0) {
			clearInterval(timer);
			alert("Game over");
			initialGame();
		}
		localStorage.setItem("monsters", JSON.stringify(monsters));
		localStorage.setItem("points", JSON.stringify(points));
		localStorage.setItem("lastDimension", lastDimension);
		localStorage.setItem("gameIsStarted", gameIsStarted);
		localStorage.setItem("waveCount", waveCount);
		localStorage.setItem("gameLife", gameLife);
		localStorage.setItem("score", score);
		localStorage.setItem("gameMoney", gameMoney);

		gameTick++;
		if (gameTick == 80) {
			gameTick = 0;
			addRandomMonster();
		}
		if (paused) {
			redraw();
			return;
		}
		for (var i = 0; i < points.length; i++) {
			if (points[i].type != 0 && points[i].tick != limitFor(points[i].type))
				points[i].tick++;
			if (points[i].tick == limitFor(points[i].type)) {
				if (monsters.length == 0)
					continue;
				var max_i = 0;
				for (var j = 1; j < monsters.length; j++) {
					if (distance(points[i].x + 40 / macDisplaySizeMonsters * min, points[i].y + 70 / macDisplaySizeMonsters * min, monsters[max_i].x + 50 / macDisplaySizeMonsters * min, monsters[max_i].y + 33 / macDisplaySizeMonsters * min) >
							distance(points[i].x + 40 / macDisplaySizeMonsters * min, points[i].y + 70 / macDisplaySizeMonsters * min, monsters[j].x + 50 / macDisplaySizeMonsters * min, monsters[j].y + 33 / macDisplaySizeMonsters * min)) {
								max_i = j;
					}
				}
				if (distance(points[i].x + 40 / macDisplaySizeMonsters * min,
										 points[i].y + 70 / macDisplaySizeMonsters * min,
										 monsters[max_i].x + 50 / macDisplaySizeMonsters * min,
										 monsters[max_i].y + 33 / macDisplaySizeMonsters * min)
						<
					200) {
					bullets.push({
						type: points[i].type,
						speed: getSpeed(points[i].type),
						angle: Math.atan2(-(points[i].y + 70 / macDisplaySizeMonsters * min) + (monsters[max_i].y + 33 / macDisplaySizeMonsters * min),
															-(points[i].x + 40 / macDisplaySizeMonsters * min) + (monsters[max_i].x + + 50 / macDisplaySizeMonsters * min)),
						x: points[i].x + 40 / macDisplaySizeMonsters * min,
						y: points[i].y + 70 / macDisplaySizeMonsters * min,
						level: 0,
						distance: getDistance(points[i].type),
						damage: getDamage(points[i].type)
					});
					points[i].tick = 0;
				}
			}
		}
		moveBullets();
		for (var i = 0; i < monsters.length; i++) {
			if (monsters[i].hp <= 0) {
				score += (monsters[i].type + 1) * (waveCount + 1);
				gameMoney += (monsters[i].type + 1) * 2;
				$('#scor').html("Scor: "+score);
				$('#money').html("Bani: "+gameMoney);

				monsters.splice(i, 1);
				continue;
			}

			monsters[i].stateImg = (monsters[i].stateImg + 1) % 7;
			if (monsters[i].state == 10 && monsters[i].x >= 560 / macDisplaySizeMonsters * min) {
				monsters[i].state = 11;
			} else if (monsters[i].state == 11 && monsters[i].y >= 575 / macDisplaySizeMonsters * min) {
				monsters[i].state = 12;
			} else if (monsters[i].state == 12 && monsters[i].x <= 385 / macDisplaySizeMonsters * min) {
				monsters[i].state = 13;
			} else if (monsters[i].state == 13 && monsters[i].y >= 730 / macDisplaySizeMonsters * min) {
				monsters[i].state = 14;
			} else if (monsters[i].state == 14 && monsters[i].x <= 340 / macDisplaySizeMonsters * min) {
				gameLife -= 10;
				gameMoney += 10;
				monsters.splice(i, 1);
				continue;
			}
			if (monsters[i].state == 0 && monsters[i].x >= 215 / macDisplaySizeMonsters * min) {
				monsters[i].state = 1;
			} else if (monsters[i].state == 1 && monsters[i].y >= 575 / macDisplaySizeMonsters * min) {
				monsters[i].state = 2;
			} else if (monsters[i].state == 2 && monsters[i].x <= 50 / macDisplaySizeMonsters * min) {
				monsters[i].state = 3;
			} else if (monsters[i].state == 3 && monsters[i].y >= 730 / macDisplaySizeMonsters * min) {
				monsters[i].state = 4;
			} else if (monsters[i].state == 4 && monsters[i].x >= 120 / macDisplaySizeMonsters * min) {
				gameLife -= 10;
				gameMoney += 10;
				monsters.splice(i, 1);
				continue;
			}
			if ($.inArray(monsters[i].state, toRight) != -1) {
				monsters[i].x += 2 / macDisplaySize * min;
			} else if ($.inArray(monsters[i].state, toLeft) != -1) {
				monsters[i].x -= 2 / macDisplaySize * min;
			} else if ($.inArray(monsters[i].state, toDown) != -1) {
				monsters[i].y += 2 / macDisplaySize * min;
			}
		}
		checkColision();
		redraw();
	}

	const moveBullets = () => {
		for (i = 0; i < bullets.length; i++) {
			bullets[i].x += Math.cos(bullets[i].angle) * bullets[i].speed;
			bullets[i].y += Math.sin(bullets[i].angle) * bullets[i].speed;
			bullets[i].distance += bullets[i].speed;
			if (bullets[i].x < 0 || bullets[i].y < 0 || bullets[i].x > min || bullets[i].y > min || bullets[i].distance > 400) {
				bullets.splice(i, 1);
			}
		}
	}

	const getMousePos = (canvas, evt) => {
		var rect = canvas.getBoundingClientRect();
		return {
			x: evt.clientX - rect.left,
			y: evt.clientY - rect.top
		};
	}

	canvas.addEventListener('click', function(evt) {
		changeBox(canvas, evt);
	}, false);
	document.getElementById("start_stop").addEventListener('click', function(evt) {
		pause();
	}, false);
	document.getElementById("restart_game").addEventListener('click', function(evt) {
		initialGame();
	}, false);
});
