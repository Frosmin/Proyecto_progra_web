import { Component, ViewChild, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { boardType, boardsMockups } from '../utils/FormType';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-form',
  // standalone: true,
  imports: [CommonModule, BoardComponent, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  boards: boardType[] = [];
  cnt: number = 1;
  editor: boolean = true; // Para determinar si se está en modo edición o no

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
