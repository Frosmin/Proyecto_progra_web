import { Injectable } from '@angular/core';
import { BoxType, PieceType, BoxEvent, BoxStatus } from '../utils/BoxTypes';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor() { }

  createBoard(size: number): BoxType[][] {
    return Array.from({ length: size }, (_, x) =>
      Array.from({ length: size }, (_, y) => ({
        id: `${x}-${y}`, 
        x,
        y,
        content: null,
        status: BoxStatus.EMPTY,
        safe: true,
      }))
    );
  }


  moveQueen(board: BoxType[][], x: number, y : number) : BoxType[][] {
    const box: BoxType = board[x][y];
    // Mark rows and columns as unsafe
    for (let i = 0; i < board.length; i++) {
      if (i !== y) {
        board[x][i].safe = false; // Horizontal
      }
      if (i !== x) {
        board[i][y].safe = false; // Vertical
      }
    }
    // Mark diagonals as unsafe
    for (let i = 1; i < board.length; i++) {
      if (x + i < board.length && y + i < board.length) {
        board[x + i][y + i].safe = false; // Down Right Diagonal
      }
      if (x - i >= 0 && y - i >= 0) {
        board[x - i][y - i].safe = false; // Up Left Diagonal
      }
      if (x + i < board.length && y - i >= 0) {
        board[x + i][y - i].safe = false; // Down Left Diagonal
      }
      if (x - i >= 0 && y + i < board.length) {
        board[x - i][y + i].safe = false; // Up Right Diagonal
      }
    }

    return board;
  }

  insertPiece(board: BoxType[][],x: number, y : number, piece : PieceType = PieceType.QUEEN) : BoxType[][] {
    
    const box: BoxType = board[x][y];
    
    if (box.content !== null) {
      return board;
    }

    box.content = piece;

    switch (piece) {
      case PieceType.QUEEN:
        board = this.moveQueen(board, x, y);
        break;
      default:
        console.warn(`Piece type ${piece} not implemented for insertion.`);
    }

    return board;

  }

  removePiece(board: BoxType[][], ){

  }

}
