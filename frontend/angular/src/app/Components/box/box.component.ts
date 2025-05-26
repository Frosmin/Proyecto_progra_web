import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BoxType,BoxStatus,PieceType } from '../../utils/BoxTypes';

@Component({
  selector: 'app-box',
  imports: [],
  templateUrl: './box.component.html',
  styleUrl: './box.component.scss'
})
export class BoxComponent {
  @Output() onClickBox = new EventEmitter<PieceType | null>();
  @Input() content: PieceType | null = null;
  @Input() x: number = 0;
  @Input() y: number = 0;

  onClick() {
    if(this.content === null) {
      this.content = PieceType.QUEEN; 
      this.onClickBox.emit(PieceType.QUEEN);
    }else{
      this.content = null; 
      this.onClickBox.emit(null);
    }
  }

}
