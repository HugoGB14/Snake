const grid = document.querySelector(".grid");
const gridSize = 20;
const snakeBody = [22, 21, 20];
let appleIndex = 0;
let direction = 1;
let intervalId = 0;
let speed = 500;
let pos = []
let = allpos = []

function createGrid() {
  for (let i = 0; i < gridSize ** 2; i++) {
    const square = document.createElement("div");
    grid.appendChild(square);
    var n = document.createTextNode(i);
    square.appendChild(n)
  }
}

function drawSnake() {
  snakeBody.forEach((index) => {
    grid.children[index].classList.add("snake");
    pos.push(index);
  });
  allpos.push(pos);
  pos = [];
}

function undrawSnake() {
  snakeBody.forEach((index) => {
    grid.children[index].classList.remove("snake");
  });
}

function isGameOver() {
    const head = snakeBody[0];
    return (
      // check for collision with walls
      (head > gridSize ** 2 - gridSize || // top or bottom row
       head % gridSize === 0 || head % gridSize === gridSize - 1) || // left or right column
      // check for collision with tail
      snakeBody.slice(1).includes(head)
    );
  }
  

function moveSnake() {
    undrawSnake();
    const tail = snakeBody.pop();
    const head = snakeBody[0] + direction;
    snakeBody.unshift(head);
    if (snakeBody[0] === appleIndex) {
      snakeBody.push(tail);
      grid.children[appleIndex].classList.remove("apple");
      generateApple();
      speed *= 0.9;
    }
    grid.children[snakeBody[0]].classList.add("snake");
    drawSnake();
    if (isGameOver()) {
      clearInterval(intervalId);
      console.log(allpos);
      alert("Game over!");
    }
  }
  

function generateApple() {
  appleIndex = Math.floor(Math.random() * gridSize ** 2);
  while (grid.children[appleIndex].classList.contains("snake")) {
    appleIndex = Math.floor(Math.random() * gridSize ** 2);
  }
  grid.children[appleIndex].classList.add("apple");
}

function startGame() {
  intervalId = setInterval(moveSnake, speed);
  generateApple();
}

function controlSnake(event) {
  if (event.keyCode === 37 && direction !== 1) {
    direction = -1;
  } else if (event.keyCode === 38 && direction !== gridSize) {
    direction = -gridSize;
  } else if (event.keyCode === 39 && direction !== -1) {
    direction = 1;
  } else if (event.keyCode === 40 && direction !== -gridSize) {
    direction = gridSize;
  }
}

document.addEventListener("keydown", controlSnake);

createGrid();
startGame();
