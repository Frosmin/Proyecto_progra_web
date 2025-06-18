import {
  EventEmitter,
  inject,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BoxComponent } from '../Components/box/box.component';
import {
  BoxType,
  PieceType,
  BoxEvent,
  CoordinateDictionary,
  PiecePosition,
  Pieces,
} from '../utils/BoxTypes';
import { ChangeDetectorRef } from '@angular/core';
import { BoardService } from '../board/board.service';
import { InputComponent } from '../Components/input/input.component';

@Component({
  selector: 'app-board-component',
  standalone: true,
  imports: [CommonModule, FormsModule, BoxComponent, InputComponent],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent {
  _editor: boolean = true;
  @Input()
  get editor(): boolean {
    return this._editor;
  }
  set editor(value: boolean) {
    this._editor = value;
    
    this.onEditorChange();
  }

 

  boardService = inject(BoardService);
  piecePositions: CoordinateDictionary<PiecePosition> = {};
  originalPiecePositions: CoordinateDictionary<PiecePosition> = {};
  tablero: BoxType[][] = [];

  private _tableroSize: number = 1;
  @Input()
  set tableroSize(value: number) {
    this._tableroSize = value;
    this.tablero = this.boardService.createBoard(this._tableroSize);
  }

  get tableroSize(): number {
    return this._tableroSize;
  }

  tableroCreado: boolean = true;
  readonly pieces = Pieces;
  selectedPiece: PiecePosition | null = null;

  dropdownProps: { show: boolean; x: number; y: number } = {
    show: false,
    x: 0,
    y: 0,
  };

  onEditorChange(): void {
    this.boardService.unhighlightBoard(this.tablero);
    if (this.editor) {
      this.piecePositions = { ...this.originalPiecePositions };
    } else {
      this.originalPiecePositions = { ...this.piecePositions };
    }
    this.boardService.resetPositions(this.tablero, this.originalPiecePositions);
  }

  handleBoxClick(event: BoxEvent) {
    const box = this.tablero[event.x][event.y];
    const x = event.x;
    const y = event.y;

    if (this.editor) {
      if (box.content == null) {
        this.dropdownProps.show = true;
        this.dropdownProps.x = x;
        this.dropdownProps.y = y;
      } else {
        this.boardService.removePiece(this.tablero, this.piecePositions, x, y);
        console.log(this.piecePositions);
      }
    } else {
      if (box.content != null) {
        this.boardService.unhighlightBoard(this.tablero);
        this.selectedPiece = { piece: box.content, x, y };
        this.boardService.showValidMovements(this.tablero, this.selectedPiece);
      } else {
        if (this.selectedPiece) {
          this.boardService.movePiece(
            this.tablero,
            this.piecePositions,
            this.selectedPiece,
            x,
            y
          );
          this.selectedPiece = null;
        }
        this.boardService.unhighlightBoard(this.tablero);
      }
    }
  }

  handleSelectPiece(pieceType: PieceType) {
    const x: number = this.dropdownProps.x;
    const y: number = this.dropdownProps.y;
    this.tablero[x][y].content = pieceType;
    this.piecePositions[`${x}-${y}`] = { piece: pieceType, x, y };
    this.dropdownProps.show = false;
  }

  handleValidateBoard() {
    this.boardService.unhighlightBoard(this.tablero);
    this.boardService.validateBoard(this.tablero, this.piecePositions);
    console.log(this.tablero);
  }

  resetBoard(size: number) {
    this.tableroSize = size;
    this.tablero = this.boardService.createBoard(size);
    this.piecePositions = {};
    this.dropdownProps.show = false;
    this.selectedPiece = null;
  }


  console(): void {
    console.log(this.tablero);
    console.log(this.piecePositions);
  }
}
