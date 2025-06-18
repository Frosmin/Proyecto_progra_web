import { Injectable } from '@angular/core';
import { BoxType, PieceType, BoxEvent, BoxStatus,PiecePosition, CoordinateDictionary } from '../utils/BoxTypes';
import { of } from 'rxjs';

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

  rookMovement(board: BoxType[][], x: number, y: number, stop: boolean = true): pair[]{
    const  movements : pair[] = [];
    // left horizontal movement
    for (let i = y - 1; i >= 0; i--) {
      if (board[x][i].content === null || !stop) {
        movements.push({ x, y: i });
      } else {
        break;
      }
    }
    // right horizontal movement
    for (let i = y + 1; i < board[x].length; i++) {
      if (board[x][i].content === null || !stop) {
        movements.push({ x, y: i });
      } else {
        break;
      }
    }
    // up vertical movement
    for (let i = x - 1; i >= 0; i--) {
      if (board[i][y].content === null || !stop) {
        movements.push({ x: i, y });
      } else {
        break;
      }
    }
    // down vertical movement
    for (let i = x + 1; i < board.length; i++) {
      if (board[i][y].content === null || !stop) {
        movements.push({ x: i, y });
      } else {
        break;
      }
    }
    // console.log(movements);

    return movements;
  }

  bishopMovement(board: BoxType[][], x: number, y: number, stop : boolean = true): pair[]{
    const movements: pair[] = [];
    // Down Right Diagonal
    for (let i = 1; i < board.length; i++) {
      if (x + i < board.length && y + i < board.length) {
        if (board[x + i][y + i].content === null || !stop) {
          movements.push({ x: x + i, y: y + i });
        } else {
          break;
        }
      }
    }
    // Up Left Diagonal
    for (let i = 1; i < board.length; i++) {
      if (x - i >= 0 && y - i >= 0) {
        if (board[x - i][y - i].content === null || !stop) {
          movements.push({ x: x - i, y: y - i });
        } else {
          break;
        }
      }
    }
    // Down Left Diagonal
    for (let i = 1; i < board.length; i++) {
      if (x + i < board.length && y - i >= 0) {
        if (board[x + i][y - i].content === null || !stop) {
          movements.push({ x: x + i, y: y - i });
        } else {
          break;
        }
      }
    }
    // Up Right Diagonal
    for (let i = 1; i < board.length; i++) {
      if (x - i >= 0 && y + i < board.length) {
        if (board[x - i][y + i].content === null || !stop) {
          movements.push({ x: x - i, y: y + i });
        } else {
          break;
        }
      }
    }

    return movements;
  }

  queenMovement(board: BoxType[][], x: number, y: number, stop : boolean = true): pair[]{
    const movements: pair[] = [];
    // Combine rook and bishop movements
    movements.push(...this.rookMovement(board, x, y, stop));
    movements.push(...this.bishopMovement(board, x, y,stop));
    return movements;
  }

  knightMovement(board: BoxType[][], x: number, y: number, stop : boolean = true): pair[]{
    const movements: pair[] = [];
    const knightMoves: pair[] = [
      { x: x - 2, y: y - 1 }, { x: x - 2, y: y + 1 },
      { x: x + 2, y: y - 1 }, { x: x + 2, y: y + 1 },
      { x: x - 1, y: y - 2 }, { x: x - 1, y: y + 2 },
      { x: x + 1, y: y - 2 }, { x: x + 1, y: y + 2 }
    ];

    knightMoves.forEach(move => {
      if (move.x >= 0 && move.x < board.length && move.y >= 0 && move.y < board[0].length) {
        if (board[move.x][move.y].content === null || !stop) {
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
        if (box.status !=  BoxStatus.EMPTY) {
          box.status = BoxStatus.EMPTY;
        }
        box.safe = true; // Reset safe status
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

  removePiece(board: BoxType[][],piecePositions  :CoordinateDictionary<PiecePosition> ,x : number, y : number ) {
    const box : BoxType = board[x][y];
    box.content = null;
    delete piecePositions[`${x}-${y}`];
  }

  validateBoard(board : BoxType[][], piecePositions : CoordinateDictionary<PiecePosition>) : void {
      // Mark unsafe boxes
      const unsafeBoxes: pair[] = [];
      let x : number;
      let y : number;
      for(const [key,value] of Object.entries(piecePositions)) {
        console.log(key,value);
        if( value != undefined) {
          x = value.x;
          y = value.y;
          switch (value.piece) {
            case PieceType.QUEEN:
              unsafeBoxes.push(...this.queenMovement(board, x, y, false));
              break;
            case PieceType.ROOK:
              unsafeBoxes.push(...this.rookMovement(board, x, y, false));
              break;
            case PieceType.BISHOP:
              unsafeBoxes.push(...this.bishopMovement(board, x, y, false));
              break;
            case PieceType.KNIGHT:
              unsafeBoxes.push(...this.knightMovement(board, x, y, false));
              break;
            default:
              console.warn(`Piece type ${value.piece} not implemented for validation.`);
          }
        }
        // mark unsafe boxes in the board
        unsafeBoxes.forEach(box => {
          if (box.x >= 0 && box.x < board.length && box.y >= 0 && box.y < board[0].length) {
            const unsafeBox: BoxType = board[box.x][box.y];
            unsafeBox.safe = false;
            console.log(`Marking box at (${box.x}, ${box.y}) as unsafe`);
          }
        });

        // Check if any piece is in an unsafe box
        for (const [key, value] of Object.entries(piecePositions)) {
          if (value && !board[value.x][value.y].safe) {
            // If a piece is in an unsafe box.
            board[value.x][value.y].status = BoxStatus.SELECTED; // Reset status if safe

          } else if (value) {
            board[value.x][value.y].status = BoxStatus.CHECKED; // Reset status if safe
          }
        }
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

  resetPositions(board:BoxType[][] ,piecePositions: CoordinateDictionary<PiecePosition>): void {
    this.cleanBoard(board);
    for (const [key, value] of Object.entries(piecePositions)) {
      if (value) {
        const box: BoxType = board[value.x][value.y];
        box.content = value.piece;
        box.status = BoxStatus.EMPTY;
      }
    }    
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