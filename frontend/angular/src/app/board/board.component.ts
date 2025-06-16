import {
  EventEmitter,
  inject,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
import { BoardService } from '../board/board.service';
import { InputComponent } from '../Components/input/input.component';
import { TableroService } from '../services/form.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board-component',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    BoxComponent, 
    InputComponent,
    MatSnackBarModule
  ],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})


export class BoardComponent {
  _editor: boolean = true;
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() formularioId: number = 1;

  constructor(private tableroService: TableroService, private snackBar: MatSnackBar) {}
  

  @Input() 
  set editor(value: boolean) {
    this._editor = value;
    this.onEditorChange();
  }
  get editor(): boolean {
    return this._editor;
  }





  saveTablero() {
  // Verificar si hay piezas en el tablero
  if (Object.keys(this.piecePositions).length === 0) {
    this.snackBar.open('Por favor, coloca al menos una pieza en el tablero', 'Cerrar', {
      duration: 3000
    });
    return;
  }

  // Verificar si hay un título
  if (!this.title.trim()) {
    this.snackBar.open('Por favor, añade un título al tablero', 'Cerrar', {
      duration: 3000
    });
    return;
  }

  // Crear array de posiciones
  const positions: any[] = [];
  
  // Convertir el diccionario de piezas a un array como lo espera el backend
  Object.keys(this.piecePositions).forEach(key => {
    const pos = this.piecePositions[key as keyof typeof this.piecePositions];
    if (pos) {
      positions.push({
        Type: pos.piece,
        PosX: pos.x,
        PosY: pos.y
      });
    }
  });

  console.log('Posiciones procesadas:', positions);

  // Crear el objeto tablero según el modelo del backend
  const tableroToSave = {
    Title: this.title,
    Description: this.description || 'Sin descripción',
    Size: this.tableroSize,
    FormularioID: this.formularioId,
    Positions: positions
  };

  console.log('Enviando tablero:', tableroToSave);

  // Enviar los datos al backend
  this.tableroService.saveTablero(tableroToSave).subscribe({
    next: (response) => {
      this.snackBar.open('Tablero guardado con éxito!', 'Cerrar', {
        duration: 3000
      });
      console.log('Tablero guardado:', response);
    },
    error: (error) => {
      this.snackBar.open('Error al guardar el tablero: ' + (error.message || 'Error desconocido'), 'Cerrar', {
        duration: 5000
      });
      console.error('Error al guardar el tablero:', error);
    }
  });
}
  


 

  boardService = inject(BoardService);
  piecePositions: CoordinateDictionary<PiecePosition> = {};
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
}
