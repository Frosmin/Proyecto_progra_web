import { Component, ViewChild, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from '../board/board.component';
import { boardType,boardsMockups } from '../utils/FormType';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,BoardComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  boards : boardType[] = boardsMockups

  editor: boolean = true; // Para determinar si se está en modo edición o no

}
