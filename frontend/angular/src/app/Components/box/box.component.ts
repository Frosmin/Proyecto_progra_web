import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pieces,BoxStatus,PieceType ,BoxEvent} from '../../utils/BoxTypes';

@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  @Output() onClickBox = new EventEmitter<BoxEvent>();
  @Input() editor: boolean = true; // Para determinar si se está en modo edición o no
  @Input() content: PieceType | null = null;
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() status: BoxStatus = BoxStatus.SELECTED;
  @Input() safe: boolean = false;

  
  

  onClick() {
    this.onClickBox.emit({
      x: this.x, 
      y: this.y, 
      content: this.content !== null ? null: PieceType.QUEEN // Default to QUEEN if no content is provided
    });
  }


}
