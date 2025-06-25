import { Component, ViewChild, AfterViewInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { boardType } from '../utils/FormType'; 
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PieceType, PiecePosition, CoordinateDictionary } from '../utils/BoxTypes'; 
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

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
    HttpClientModule, 
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements AfterViewInit {
  @ViewChild(BoardComponent) boardComponentInstance!: BoardComponent;
  // boards: boardType[] = [];
  // cnt: number = 1;


  editor: boolean = true; // Para determinar si se está en modo edición o no
  boards: boardType[] = [
    {
      id: 'singleBoard', 
      size: 8,
      pieces: [], 
    },
  ];

  boardTitle: string = '';
  boardDescription: string = '';

  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private router = inject(Router);

  ngAfterViewInit() {

  }

  toggleEditor(): void {
    this.editor = !this.editor;
    if (this.boardComponentInstance) {
      this.boardComponentInstance.editor = this.editor; 
    }
  }

private pieceTypeToString(pieceType: PieceType): string {

    switch (pieceType) {
      case PieceType.QUEEN: return "QUEEN";
      case PieceType.ROOK: return "ROOK";
      case PieceType.BISHOP: return "BISHOP";
      case PieceType.KNIGHT: return "KNIGHT";

      default:
        console.warn(`Tipo de pieza no mapeado a string: ${pieceType}`);
        return "UNKNOWN";
    }
  }
















  // consola(): void {
  //   if (this.boardComponentInstance) {
  //     // Accede directamente a las propiedades públicas de BoardComponent
  //     const tableroActual = this.boardComponentInstance.tablero;
  //     const posicionesPiezasActuales =
  //       this.boardComponentInstance.piecePositions;
  //     const tamanoTableroActual = this.boardComponentInstance.tableroSize;

  //     console.log('Datos del BoardComponent obtenidos desde FormComponent:');
  //     console.log('Título:', this.boardTitle);
  //     console.log('Descripción:', this.boardDescription);
  //     console.log('Tamaño del tablero:', tamanoTableroActual);
  //     console.log('Estructura del tablero (cuadrícula):', tableroActual);
  //     console.log('Posiciones de las piezas:', posicionesPiezasActuales);

  //     // Aquí podrías llamar a una función para enviar estos datos al backend
  //     // this.enviarDatosAlBackend(this.boardTitle, this.boardDescription, tamanoTableroActual, posicionesPiezasActuales);
  //   } else {
  //     console.error('BoardComponent no está disponible todavía.');
  //   }
  // }


  saveBoardData(): void {
    if (!this.boardComponentInstance) {
    console.error("BoardComponent no está disponible todavía.");
    alert("Error: No se pudo acceder a los datos del tablero.");
    return;
    }

    if (!this.authService.isLoggedIn()) {
    alert('Debes iniciar sesión para crear un tablero.');
    this.router.navigate(['/login']);
    return;
    }

    const posicionesPiezasActuales = this.boardComponentInstance.piecePositions;
    const tamanoTableroActual = this.boardComponentInstance.tableroSize;

    if (!this.boardTitle.trim()) {
        console.error("El título no puede estar vacío.");
        alert("Error: El título es obligatorio.");
        return;
    }
    if (!this.boardDescription.trim()) {
        console.error("La descripción no puede estar vacía.");
        alert("Error: La descripción es obligatoria.");
        return;
    }

    const positionsForBackend = Object.values(posicionesPiezasActuales)
      .map((p: PiecePosition | undefined) => { 
       
        if (p === undefined || p.piece === null) {
          return null;
        }
        return {
          Type: p.piece,
          PosX: p.x,
          PosY: p.y,
        };
      })
      .filter(p => p !== null); 

 const currentUser = this.authService.getCurrentUser();
    const payload = {
    Title: this.boardTitle,
    Description: this.boardDescription,
    Size: tamanoTableroActual,
    Positions: positionsForBackend, 
    UserID: currentUser ? currentUser.ID : 0,
    };

    console.log('Enviando datos al backend (/api/tableros):', payload);

    const apiUrl = 'http://localhost:8080/api/tablero'; 

    this.http.post(apiUrl, payload).subscribe({
      next: (response) => {
        console.log('Tablero guardado exitosamente:', response);
        alert('Tablero guardado exitosamente!');
      },
      error: (error) => {
        console.error('Error al guardar el tablero:', error);
        alert(`Error al guardar el tablero: ${error.message || 'Error desconocido'}`);
      },
    });
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
