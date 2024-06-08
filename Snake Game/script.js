let inputDir = { x: 0, y: 0 }
const foodSound = new Audio("food.mp3")
const moveSound = new Audio("move.mp3")
const gameoverSound = new Audio("gameover.mp3")
const musicSound = new Audio("music.mp3")
let lastPaintTime = 0;
let speed = 10;
let score = 0;
let isOver = false;

let snakeArr = [
  { x: 15, y: 13 }
]

let food = { x: 13, y: 11 }

function main(ctime) {
  // console.log(ctime)
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime
  if (!isOver) {
    gameEngine()
  }
}

function isCollide() {
  if (snakeArr[0].x > 18 || snakeArr[0].x < 0 || snakeArr[0].y > 18 || snakeArr[0].y < 0) {
    return true;
  }

  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[0].x == snakeArr[i].x && snakeArr[0].y == snakeArr[i].y) {
      return true
    }
  }

  return false;
}

function gameEngine() {
  // update snake array and food
  if (isCollide()) {
    musicSound.pause()
    isOver = true;
    gameoverSound.play()
    moveSound.pause()
    score = 0
    inputDir = { x: 0, y: 0 }
  }

  // food eaten
  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    foodSound.play()
    score++;
    if (score > hiscoreval) {
      hiscoreval = score
      document.getElementById('hiscore').innerText = `${score}`
      localStorage.setItem('hiscore', JSON.stringify(hiscoreval))
    }
    document.getElementById('score').innerText = `${score}`
    // regenerate food
    food.x = Math.ceil(Math.random() * 17)
    food.y = Math.ceil(Math.random() * 17)

    // increase snake length by 1
    snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
  }

  // moving snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }
  }

  snakeArr[0].x += inputDir.x
  snakeArr[0].y += inputDir.y

  // display snake
  document.getElementById('board').innerText = ''
  snakeArr.forEach((e, index) => {
    const snakeElement = document.createElement('div')
    snakeElement.style.gridRowStart = e.y
    snakeElement.style.gridColumnStart = e.x
    if (index == 0) { snakeElement.classList.add('head') }
    else { snakeElement.classList.add('snake') }
    document.getElementById('board').appendChild(snakeElement)
  })

  // display food

  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  document.getElementById('board').appendChild(foodElement)
}

let hiscoreval = 0

let hiscore = localStorage.getItem("hiscore")
if (hiscore == null) {
  hiscoreval = 0
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
} else {
  hiscoreval = JSON.parse(hiscore)
  document.getElementById('hiscore').innerText = `${hiscore}`
}

requestAnimationFrame(main);

document.addEventListener('keydown', (e) => {
  if (e.key == 'ArrowUp' && !isOver && inputDir.y != 1) {
    moveSound.play()
    inputDir.x = 0
    inputDir.y = -1
  } else if (e.key == 'ArrowDown' && !isOver && inputDir.y != -1) {
    moveSound.play()
    inputDir.x = 0
    inputDir.y = 1
  } else if (e.key == 'ArrowLeft' && !isOver && inputDir.x != 1) {
    moveSound.play()
    inputDir.x = -1
    inputDir.y = 0
  } else if (e.key == 'ArrowRight' && !isOver && inputDir.x != -1) {
    moveSound.play()
    inputDir.x = 1
    inputDir.y = 0
  }
})

// musicSound.play()

function gameover() {
  isOver = false;
  // musicSound.play()
  snakeArr = [
    { x: 15, y: 13 }
  ]

  food = { x: 13, y: 11 }
  score = 0;
  document.getElementById('score').innerText = `${score}`
}