import { inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';
import { FormsModule } from '@angular/forms';
import { BoxComponent } from './box/box.component';
import { BoxType, BoxStatus,PieceType,BoxEvent,CoordinateDictionary,PiecePosition } from '../utils/BoxTypes';
import { ChangeDetectorRef } from '@angular/core';
import { BoardService } from '../board/board.service';



@Component({
    selector: 'app-template-editor',
    imports: [CommonModule, FormsModule,BoxComponent],
    templateUrl: './component.template_editor.html',
    styleUrls: ['./component.template_editor.scss'],
    standalone: true
})
export class TemplateEditorComponent {
    @Input() editor : boolean = true;
    boardService = inject(BoardService);;
    piecePositions: CoordinateDictionary<PiecePosition> = {};
    tableroSize: number = 8;
    tablero: BoxType[][] = this.boardService.createBoard(this.tableroSize);
    tableroCreado: boolean = true;


    handleBoxClick(event: BoxEvent) {
        const box = this.tablero[event.x][event.y];

        if(box.content == null) {
            this.boardService.insertPiece(this.tablero,{x: event.x, y: event.y, piece: PieceType.QUEEN});
            this.piecePositions[`${event.x}-${event.y}`] = { piece: PieceType.QUEEN, x: event.x, y: event.y };
        }else{
            delete this.piecePositions[`${event.x}-${event.y}`];
            this.boardService.removePiece(this.tablero,this.piecePositions, event.x, event.y);
        }
        // print the current state of the board
        console.log(this.tablero.map(row => row.map(box => `${box.x}-${box.y} ${box.safe}, `).join(' ')).join('\n'));

    }
    
}