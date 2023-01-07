const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cellSize = 20;

const canvasSize = 600;
canvas.width = canvasSize;
canvas.height = canvasSize;

const mapCount = canvasSize / cellSize;

let direction = {
  x: 0,
  y: 0,
};

const initialTail = [
  {
    x: 4,
    y: 4,
  },
  {
    x: 4,
    y: 4,
  },
  {
    x: 4,
    y: 4,
  },
  {
    x: 4,
    y: 4,
  },
];

let tail = [...initialTail];

let food = { x: randomCoord().x, y: randomCoord().y };

function randomNum() {
  return Math.floor(Math.random() * mapCount);
}

console.log(food);
function randomCoord() {
  const x = randomNum();
  const y = randomNum();
  if (isCoordOnSnake(x, y)) {
    return randomCoord();
  } else {
    return { x, y };
  }
}

function isCoordOnSnake(x, y) {
  let isOnSnake = false;
  tail.forEach((cell) => {
    if (cell.x === x && cell.y === y) {
      isOnSnake = true;
    }
  });
  return isOnSnake;
}

function draw() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  tail.forEach((cell) => {
    ctx.fillStyle = "red";
    ctx.strokeStyle = "black";
    ctx.fillRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
    ctx.strokeRect(cell.x * cellSize, cell.y * cellSize, cellSize, cellSize);
  });

  ctx.fillStyle = "yellow";
  ctx.fillRect(food.x * cellSize, food.y * cellSize, cellSize, cellSize);
}

setInterval(() => {
  if (direction.x === 0 && direction.y === 0) {
    draw();
    return;
  }
  const newCell = {
    x: (mapCount + tail[tail.length - 1].x + direction.x) % mapCount,
    y: (mapCount + tail[tail.length - 1].y + direction.y) % mapCount,
  };

  if (newCell.x === food.x && newCell.y === food.y) {
    tail.push(newCell);
    food = { x: randomCoord().x, y: randomCoord().y };
  } else {
    tail.shift();
    tail.push(newCell);
  }
  draw();
}, 1000 / 40);

document.addEventListener("keydown", function (evt) {
  switch (evt.code) {
    case "ArrowUp":
      direction.x = 0;
      direction.y = -1;
      break;
    case "ArrowDown":
      direction.x = 0;
      direction.y = 1;
      break;

    case "ArrowLeft":
      direction.x = -1;
      direction.y = 0;
      break;
    case "ArrowRight":
      direction.x = 1;
      direction.y = 0;
      break;
  }
});
