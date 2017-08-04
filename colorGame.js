var level = 6;
var color = [];
var pickedColor;
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.querySelector("#colorDisplay");
var pickedColorFeedback = document.querySelector("#pickedColorFeedback");
var resetButton = document.querySelector("#reset");
var difficultyButton = document.querySelectorAll(".difficulty");

initializeComponents();
initializeGame();

function initializeGame() {
	color = generateRandomColors(level);
	pickedColor = pickColor();
	colorDisplay.textContent = pickedColor;
	pickedColorFeedback.textContent = "";
	h1.style.backgroundColor = "steelblue";
	initializeSquares();
}

function initializeSquares() {
	for (var i = 0; i < squares.length; i++) {
		if (color[i]) {
			squares[i].style.backgroundColor = color[i];
			squares[i].style.display = "block";
			squares[i].style.opacity = 1;
		} else {
			squares[i].style.display = "none";
		}
	}
}

function changeColor(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		squares[i].style.opacity = 1;
	}
	h1.style.backgroundColor = color;
}

function pickColor() {
	var random = Math.floor(Math.random()*color.length);
	return color[random];
}

function generateRandomColors(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push(randomColor());
	}

	return arr;
}

function randomColor() {
	var red = Math.floor(Math.random() * 256);
	var green = Math.floor(Math.random() * 256);
	var blue = Math.floor(Math.random() * 256);
	return "rgb(" + red + ", " + green + ", " + blue + ")";
}

//Initialize components
function initializeComponents() {
	//eventListener squares
	for (var i = 0; i < squares.length; i++) {
		squares[i].addEventListener("click", function() {
			if (this.style.backgroundColor === pickedColor) {
				pickedColorFeedback.textContent = "Correct!";
				resetButton.textContent = "Play again?"
				changeColor(pickedColor);
			} else {
				this.style.opacity = 0;
				pickedColorFeedback.textContent = "Try again";
			}
		});
	}

	//eventListener reset button
	resetButton.addEventListener("click", function() {
		initializeGame();
		this.textContent = "New colors"
	});

	//eventListener difficulty buttons
	for (var i = 0; i < difficultyButton.length; i++) {
		difficultyButton[i].addEventListener("click", function() {
			for (var i = 0; i < difficultyButton.length; i++) {
				difficultyButton[i].classList.remove("selected");
			}
			this.classList.add("selected");
			this.textContent === "Easy" ? level = 3 : level = 6;
			initializeGame();
		});
	}
}