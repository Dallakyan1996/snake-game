const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const snakeData = [
    {
        x: 80,
        y: 10,
    },
    {
        x: 45,
        y: 10,
    },
    {
        x: 10,
        y: 10,
    }
]


function update() {
    snakeData.forEach(item => {
        item.x += 1
    })
}

function createGameBoard() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, 500, 800)
}

function createSnakeBlock() {
    snakeData.forEach(item => {
        ctx.fillStyle = "red",
            ctx.fillRect(item.x, item.y, 30, 30)
    })
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    createGameBoard();
    snakeData.forEach(item => {
        ctx.fillStyle = "red",
            ctx.fillRect(item.x, item.y, 30, 30)
    })
}

function loop() {
    requestAnimationFrame(loop);
  
    update();
    draw();
}

loop();

