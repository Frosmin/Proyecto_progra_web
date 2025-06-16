import { Component, ViewChild, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { boardType, boardsMockups } from '../utils/FormType';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    BoardComponent,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  // boards: boardType[] = [];
  // cnt: number = 1;
  editor: boolean = true; // Para determinar si se está en modo edición o no
  @ViewChild(BoardComponent) boardComponentInstance!: BoardComponent;

    boards: boardType[] = [{
    id: 'singleBoard', // ID único para el tablero
    size: 8, // Tamaño por defecto del tablero
    pieces: [], // Piezas iniciales, si las hubiera
  }];


  boardTitle: string = ''; 
  boardDescription: string = ''; 

  toggleEditor() : void{
    this.editor = !this.editor;
  }


  consola(): void {
      if (this.boardComponentInstance) {
        // Accede directamente a las propiedades públicas de BoardComponent
        const tableroActual = this.boardComponentInstance.tablero;
        const posicionesPiezasActuales = this.boardComponentInstance.piecePositions;
        const tamanoTableroActual = this.boardComponentInstance.tableroSize;

        console.log("Datos del BoardComponent obtenidos desde FormComponent:");
        console.log("Título:", this.boardTitle);
        console.log("Descripción:", this.boardDescription);
        console.log("Tamaño del tablero:", tamanoTableroActual);
        console.log("Estructura del tablero (cuadrícula):", tableroActual);
        console.log("Posiciones de las piezas:", posicionesPiezasActuales);

        // Aquí podrías llamar a una función para enviar estos datos al backend
        // this.enviarDatosAlBackend(this.boardTitle, this.boardDescription, tamanoTableroActual, posicionesPiezasActuales);
      } else {
        console.error("BoardComponent no está disponible todavía.");
      }
  }


  
  




























  // agregarTablero() {
  //   const nuevoTablero: boardType = {
  //     id: this.cnt.toString(),
  //     size: 4,
  //     pieces: [],
  //   };
  //   this.boards.push(nuevoTablero);
  //   this.cnt++;
  // }
  // eliminarTablero(index: number) {
  //   this.boards.splice(index, 1);
  // }
}
