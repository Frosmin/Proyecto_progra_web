import { Injectable } from '@angular/core';
import { BoxType, PieceType, BoxEvent, BoxStatus,PiecePosition, CoordinateDictionary } from '../utils/BoxTypes';

type pair = {
  x: number;
  y: number;
};


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
    box.content = PieceType.QUEEN;
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

  rookMovement(board: BoxType[][], x: number, y: number): pair[]{
    const  movements : pair[] = [];
    // left horizontal movement
    for (let i = y - 1; i >= 0; i--) {
      if (board[x][i].content === null) {
        movements.push({ x, y: i });
      } else {
        break;
      }
    }
    // right horizontal movement
    for (let i = y + 1; i < board[x].length; i++) {
      if (board[x][i].content === null) {
        movements.push({ x, y: i });
      } else {
        break;
      }
    }
    // up vertical movement
    for (let i = x - 1; i >= 0; i--) {
      if (board[i][y].content === null) {
        movements.push({ x: i, y });
      } else {
        break;
      }
    }
    // down vertical movement
    for (let i = x + 1; i < board.length; i++) {
      if (board[i][y].content === null) {
        movements.push({ x: i, y });
      } else {
        break;
      }
    }
    // console.log(movements);

    return movements;
  }
  

  showValidMovements(board: BoxType[][], piecePosition: PiecePosition) : void {
    const validMovements : pair[] = [];
    switch (piecePosition.piece) {
      case PieceType.QUEEN:
        // validMovements.push(...this.moveQueen(board, piecePosition.x, piecePosition.y));
        break;
      case PieceType.ROOK:
        validMovements.push(...this.rookMovement(board, piecePosition.x, piecePosition.y));
        break;
      default:
        console.warn(`Piece type ${piecePosition.piece} not implemented for movement.`);
    }
    // Set box status to highlighted for valid movements
    validMovements.forEach(movement => {
      console.log(`Highlighting box at (${movement.x}, ${movement.y})`);
      const box: BoxType = board[movement.x][movement.y];
      box.status = BoxStatus.HIGHLIGHTED;
    });
  }

  insertPiece(board: BoxType[][], piecePosition : PiecePosition) : void {
    
    const box: BoxType = board[piecePosition.x][piecePosition.y];


    box.content = piecePosition.piece;

    switch (piecePosition.piece) {
      case PieceType.QUEEN:
        board = this.moveQueen(board, piecePosition.x, piecePosition.y);
        break;
      default:
        console.warn(`Piece type ${piecePosition.piece} not implemented for insertion.`);
    }


  }

  cleanBoard(board: BoxType[][]): void {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const box: BoxType = board[x][y];
        box.content = null;
        box.status = BoxStatus.EMPTY;
        box.safe = true;
      }
    }
  }

  removePiece(board: BoxType[][],piecePositions  :CoordinateDictionary<PiecePosition> ,x : number, y : number ) {
    const box : BoxType = board[x][y];
    box.content = null;
    delete piecePositions[`${x}-${y}`];

  }

}
