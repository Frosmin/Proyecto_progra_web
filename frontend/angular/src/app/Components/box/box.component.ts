import { Component, Input } from '@angular/core';
import { BoxType,BoxStatus,PieceType } from '../../utils/BoxTypes';

@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  @Input() x: number = 0;
  @Input() y: number = 0;

}
