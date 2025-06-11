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
  // standalone: true,
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
  boards: boardType[] = [];
  cnt: number = 1;
  editor: boolean = true; // Para determinar si se está en modo edición o no

  toggleEditor() : void{
    this.editor = !this.editor;
  }

  agregarTablero() {
    const nuevoTablero: boardType = {
      id: this.cnt.toString(),
      size: 4,
      pieces: [],
    };
    this.boards.push(nuevoTablero);
    this.cnt++;
  }
  eliminarTablero(index: number) {
    this.boards.splice(index, 1);
  }
}
