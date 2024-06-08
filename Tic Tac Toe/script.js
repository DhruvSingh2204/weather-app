let XorO = 'X'
let grid = [['e','e','e',] , ['e','e','e'] , ['e','e','e']]
let isOver = false;
let noOfMoves = 0

function move(box) {
  box.innerText = XorO
  box.style.opacity = 1
  noOfMoves++;

  const row = Math.floor((Number(box.id))/3)
  const column = (Number(box.id))%3
  
  grid[row][column] = XorO
  check(row , column , XorO)
  
  if(XorO == 'X'){
    XorO = 'O'
  } else{
    XorO = 'X'
  }

  if(noOfMoves == 9) {
    check(row , column , XorO)
    if(!isOver){
      isOver = true;
      document.getElementById('result').innerText = `DRAW`
    }
  }
}

function check(row , column , XorO) {
  // column check
  let i = 0
  
  for(i = 0;i<3;i++){
    if(grid[i][column] != XorO){
      break;
    }
  }

  if(i == 3){
    console.log(`${XorO} wins`)
    gameOver(XorO)
  }

  // row check
  for(i = 0;i<3;i++){
    if(grid[row][i] != XorO){
      break;
    }
  }

  if(i == 3){
    console.log(`${XorO} wins`)
    gameOver(XorO)
  }

  // ckeck diagonal
  for(i = 0;i<3;i++){
    if(grid[i][i] != XorO){
      break;
    }
  }

  if(i == 3){
    console.log(`${XorO} wins`)
    gameOver(XorO)
  }

  for(i = 0;i<3;i++){
    if(grid[2 - i][i] != XorO){
      break;
    }
  }

  if(i == 3){
    console.log(`${XorO} wins`)
    gameOver(XorO)
  }
}

function gameOver(XorO) {
  document.getElementById('result').innerText = `${XorO} WINS!!`
  isOver = true;
}

document.querySelectorAll('.box').forEach(element => {
  element.onclick = () => {
    if(!isOver)
    {
      const row = Math.floor((Number(element.id))/3)
      const column = (Number(element.id))%3

      if(grid[row][column] != 'e'){
        return;
      }
      console.log(`${element.id} clicked`)
      move(element)
    }
  }
})

document.querySelectorAll('.box').forEach(element => {
  element.onmouseover = () => {
    console.log(`Hover on ${element.id}`);
    const row = Math.floor((Number(element.id))/3)
    const column = (Number(element.id))%3

    if(grid[row][column] == 'e' && !isOver){
      element.innerText = XorO;
      element.style.opacity = 0.5
    }
  }

  element.onmouseout = () => {
    const row = Math.floor((Number(element.id))/3)
    const column = (Number(element.id))%3

    if(grid[row][column] == 'e' && !isOver){
      element.innerText = '';
    }
  }
})

document.getElementById('reset').onclick = () => {
  isOver = false;
  document.querySelectorAll('.box').forEach(element => {
    element.innerText = ''
  })
  grid = [['e','e','e',] , ['e','e','e'] , ['e','e','e']]
  document.getElementById('result').innerText = ''
  XorO = 'X'
  noOfMoves = 0;
}