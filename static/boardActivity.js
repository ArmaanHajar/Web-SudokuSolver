var board;
board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]];

var newBoard;
newBoard = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0]];

function generateFullBoard(board) {
    var find = findEmpty(board);
    
    if (!find) {
        return true;
    } 
    else {
        var [row, column] = find;
    }
    for (var num = 1; num < 10; num++) {
        var randomNum = Math.floor(Math.random() * 9) + 1;
        if (checkValid(board, randomNum, [row, column])) {
            board[row][column] = randomNum;
    
            if (generateFullBoard(board)) {
                return true;
            } 
            else {
                board[row][column] = 0;
            }
        }
    }
    return false;
}
        
function findEmpty(board) {
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      if (board[i][j] === 0) {
        return [i, j];
      }
    }
  }

  return null;
} 

function checkValid(board, number, position) {
  var column, i, j, row;
  [row, column] = position;
  for (var i = 0; i < board[0].length; i++) {
    if (board[row][i] === number && column !== i) {
      return false;
    }
  }
  for (var i = 0; i < board.length; i++) {
    if (board[i][column] === number && row !== i) {
      return false;
    }
  }
  var x = Math.floor(row / 3) * 3;
  var y = Math.floor(column / 3) * 3;
  for (var i = x; i < x + 3; i++) {
    for (var j = y; j < y + 3; j++) {
      if (board[i][j] === number && [i, j] !== position) {
        return false;
      }
    }
  }
  return true;
}

function removeNumbers(board, difficulty) {
  var remOrNo, removeNum;

  if (difficulty === 0) {
    remOrNo = 47;
  } 
  else if (difficulty === 1) {
      remOrNo = 37;
  } 
  else if (difficulty === 2) {
      remOrNo = 27;
  }
  else if (difficulty === 3) {
          remOrNo = 21;
  }
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      removeNum = Math.floor(Math.random() * 100);
      if (removeNum > remOrNo) {
        board[i][j] = 0;
      }
    }
  }
}

export function solveBoard(board) {
  var column, find, row
  find = findEmpty(board);
  if (!find) {
    return true;
  }
  else {
    [row, column] = find;
  }
  for (var i = 1; i <= 9; i++) {
    if (checkValid(board, i, [row, column])) {
      board[row][column] = i;
      if (solveBoard(board)) {
        return true;
      }
      else {
        board[row][column] = 0;
      }
    }
  }
  return false;
}

export function generateEasyBoard(board) {
  generateFullBoard(board);
  removeNumbers(board, 0);
  newBoard = board;
}

export function generateMediumBoard(board) {
  generateFullBoard(board);
  removeNumbers(board, 1);
  newBoard = board;
}

export function generateHardBoard(board) {
  generateFullBoard(board);
  removeNumbers(board, 2);
  newBoard = board;
}

export function generateExpertBoard(board) {
  generateFullBoard(board);
  removeNumbers(board, 3);
  newBoard = board;
}

export { newBoard };