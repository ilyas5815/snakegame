const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;
const snakeBox = 20;
const totalMoves = canvasSize / snakeBox;
const apple = new Image();
apple.src = 'images/apple.png';

// gamesounds

let dead = new Audio();
let eat = new Audio();
let right = new Audio();
let left = new Audio();
let up = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
up.src = "audio/up.mp3";
down.src = "audio/down.mp3";

// snake defining through array

let snake = [];
snake[0] = {
    x: 9 * snakeBox,
    y: 10 * snakeBox
};

// create food

let food = {};
getFood();

// score variable

let score = 0;

// snake directions

let dir = "";

// event listener

document.addEventListener("keydown", direction)
function direction() {
    let key = event.keyCode;
    if (key == 37 && dir != "RIGHT") {
        dir = "LEFT";
        left.play();
    } else if (key == 38 && dir != "DOWN") {
        dir = "UP";
        up.play();
    } else if (key == 39 && dir != "LEFT") {
        dir = "RIGHT";
        right.play();
    } else if (key == 40 && dir != "UP") {
        dir = "DOWN";
        down.play();
    }
}


//  food allocation at random positions

function getFood() {
    food = {
        x: Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox,
        y: Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox
    };
}
// collision detection

function collisionDet(head, arr) {
    for (i = 0; i < arr.length; i++) {
        if (arr[i].x == head.x && arr[i].y == head.y) {
            return true;
        }
    }
    return false;

}

// game play


function render() {
    ctx.fillStyle = "#c6ac8f" ;
    ctx.fillRect(0, 0, canvasSize, canvasSize)
    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i == 0 ? "#22333b" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, snakeBox, snakeBox)
        ctx.strokeStyle = "#eae0d5";
        ctx.strokeRect(snake[i].x, snake[i].y, snakeBox, snakeBox)
    }
    ctx.drawImage(apple, food.x, food.y, snakeBox, snakeBox);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (dir == "LEFT") snakeX -= snakeBox;
    if (dir == "RIGHT") snakeX += snakeBox;
    if (dir == "UP") snakeY -= snakeBox;
    if (dir == "DOWN") snakeY += snakeBox;

    // if snake eats food

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        eat.play();
        getFood();
    }
    else {
        snake.pop();
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collisionDet(newHead, snake)) {
        gameOver();
        return;
    }
    snake.unshift(newHead);
    ctx.fillStyle = "#22333b";
    ctx.font = "50px bold";
    ctx.fillText(score,10,40);
}
render();

var gm = setInterval(render, 100);

function gameOver() {
    clearInterval(gm);
    dead.play();
    ctx.fillStyle = "#0a0908";
    ctx.font = "40px tahoma";
    ctx.fillText("Game Over", canvasSize / 2 - 100, canvasSize / 2)
}

