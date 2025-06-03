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

  bishopMovement(board: BoxType[][], x: number, y: number): pair[]{
    const movements: pair[] = [];
    // Down Right Diagonal
    for (let i = 1; i < board.length; i++) {
      if (x + i < board.length && y + i < board.length) {
        if (board[x + i][y + i].content === null) {
          movements.push({ x: x + i, y: y + i });
        } else {
          break;
        }
      }
    }
    // Up Left Diagonal
    for (let i = 1; i < board.length; i++) {
      if (x - i >= 0 && y - i >= 0) {
        if (board[x - i][y - i].content === null) {
          movements.push({ x: x - i, y: y - i });
        } else {
          break;
        }
      }
    }
    // Down Left Diagonal
    for (let i = 1; i < board.length; i++) {
      if (x + i < board.length && y - i >= 0) {
        if (board[x + i][y - i].content === null) {
          movements.push({ x: x + i, y: y - i });
        } else {
          break;
        }
      }
    }
    // Up Right Diagonal
    for (let i = 1; i < board.length; i++) {
      if (x - i >= 0 && y + i < board.length) {
        if (board[x - i][y + i].content === null) {
          movements.push({ x: x - i, y: y + i });
        } else {
          break;
        }
      }
    }

    return movements;
  }

  queenMovement(board: BoxType[][], x: number, y: number): pair[]{
    const movements: pair[] = [];
    // Combine rook and bishop movements
    movements.push(...this.rookMovement(board, x, y));
    movements.push(...this.bishopMovement(board, x, y));
    return movements;
  }

  knightMovement(board: BoxType[][], x: number, y: number): pair[]{
    const movements: pair[] = [];
    const knightMoves: pair[] = [
      { x: x - 2, y: y - 1 }, { x: x - 2, y: y + 1 },
      { x: x + 2, y: y - 1 }, { x: x + 2, y: y + 1 },
      { x: x - 1, y: y - 2 }, { x: x - 1, y: y + 2 },
      { x: x + 1, y: y - 2 }, { x: x + 1, y: y + 2 }
    ];

    knightMoves.forEach(move => {
      if (move.x >= 0 && move.x < board.length && move.y >= 0 && move.y < board[0].length) {
        if (board[move.x][move.y].content === null) {
          movements.push(move);
        }
      }
    });

    return movements;
  }
  

  showValidMovements(board: BoxType[][], piecePosition: PiecePosition) : void {
    const validMovements : pair[] = [];
    switch (piecePosition.piece) {
      case PieceType.QUEEN:
        validMovements.push(...this.queenMovement(board, piecePosition.x, piecePosition.y));
        break;
      case PieceType.ROOK:
        validMovements.push(...this.rookMovement(board, piecePosition.x, piecePosition.y));
        break;
      case PieceType.BISHOP:
        validMovements.push(...this.bishopMovement(board, piecePosition.x, piecePosition.y));
        break;
      case PieceType.KNIGHT:
        validMovements.push(...this.knightMovement(board, piecePosition.x, piecePosition.y));
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

  unhighlightBoard(board: BoxType[][]): void {
    for (let x = 0; x < board.length; x++) {
      for (let y = 0; y < board[x].length; y++) {
        const box: BoxType = board[x][y];
        if (box.status === BoxStatus.HIGHLIGHTED) {
          box.status = BoxStatus.EMPTY;
        }
      }
    }
  }
  movePiece(
      board : BoxType[][],
      piecePositions: CoordinateDictionary<PiecePosition>,
      selectedPiece : PiecePosition, 
      xto : number, yto : number ) : void{

    if(board[xto][yto].status == BoxStatus.HIGHLIGHTED) {
      const box: BoxType = board[selectedPiece.x][selectedPiece.y];
      box.content = null;
      box.status = BoxStatus.EMPTY;

      const newBox: BoxType = board[xto][yto];
      newBox.content = selectedPiece.piece;
      newBox.status = BoxStatus.EMPTY;

      delete piecePositions[`${selectedPiece.x}-${selectedPiece.y}`];
      piecePositions[`${xto}-${yto}`] = { piece: selectedPiece.piece, x: xto, y: yto };
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


// insertPiece(board: BoxType[][], piecePosition : PiecePosition) : void {
    
//   const box: BoxType = board[piecePosition.x][piecePosition.y];


//   box.content = piecePosition.piece;

//   switch (piecePosition.piece) {
//     case PieceType.QUEEN:
//       board = this.moveQueen(board, piecePosition.x, piecePosition.y);
//       break;
//     default:
//       console.warn(`Piece type ${piecePosition.piece} not implemented for insertion.`);
//   }
// }