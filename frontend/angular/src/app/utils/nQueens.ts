function isValid(
  n: number,
  row: number,
  col: number,
  board: number[][]
): boolean {
  // up vertical
  for (let i = 1; row - i >= 0; i++) {
    if (board[row - i][col] === 1) return false;
  }
  // up right diagonal
  for (let i = 1; row - i >= 0 && col + i < n; i++) {
    if (board[row - i][col + i] === 1) return false;
  }
  // up left diagonal
  for (let i = 1; row - i >= 0 && col - i < n; i++) {
    if (board[row - i][col - i] === 1) return false;
  }

  return true;
}

function findQueens(
  n: number,
  row: number,
  board: number[][],
  ans: number[][][]
) {
  if (row === n) {
    const tmp = board.map((row) => [...row]);
    ans.push(tmp);
    return;
  }
  for (let col = 0; col < n; col++) {
    if (isValid(n, row, col, board) === true) {
      board[row][col] = 1;
      findQueens(n, row + 1, board, ans);
      board[row][col] = 0;
    }
  }
}

function nQueens(n: number): number[][][] {
  const board: number[][] = Array.from({ length: n }, () => Array(n).fill(0));

  const ans: number[][][] = [];

  findQueens(n, 0, board, ans);

  return ans;
}
