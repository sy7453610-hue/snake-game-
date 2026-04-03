const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
let snake = [{ x: 10 * box, y: 10 * box }];
let direction = "RIGHT";

let food = {
    x: Math.floor(Math.random() * 20) * box,
    y: Math.floor(Math.random() * 20) * box
};

let score = 0;

// Controls
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
});

function draw() {
    // Background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Snake
    ctx.fillStyle = "lime";
    snake.forEach((part) => {
        ctx.fillRect(part.x, part.y, box, box);
    });

    // Ball (food)
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, Math.PI * 2);
    ctx.fill();

    // Move snake
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "UP") headY -= box;
    if (direction === "DOWN") headY += box;

    // Eat food
    if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").innerText = score;

        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    let newHead = { x: headX, y: headY };

    // Collision
    if (
        headX < 0 || headY < 0 ||
        headX >= canvas.width || headY >= canvas.height ||
        snake.some(part => part.x === headX && part.y === headY)
    ) {
        clearInterval(game);
        alert("Game Over! Score: " + score);
    }

    snake.unshift(newHead);
}

// Start game
let game = setInterval(draw, 150);