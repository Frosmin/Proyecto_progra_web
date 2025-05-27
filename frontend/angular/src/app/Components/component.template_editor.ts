import { inject, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';
import { FormsModule } from '@angular/forms';
import { BoxComponent } from './box/box.component';
import { BoxType, BoxStatus,PieceType,BoxEvent,CoordinateDictionary,PiecesPositions } from '../utils/BoxTypes';
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
    boardService = inject(BoardService);;
    prefabs: Type<PrefabComponent>[] = [];
    piecePositions: CoordinateDictionary<PiecesPositions> = {};
    tableroSize: number = 8;
    tablero: BoxType[][] = this.boardService.createBoard(this.tableroSize);
    tableroCreado: boolean = true;

    handleBoxClick(event: BoxEvent) {
        const box = this.tablero[event.x][event.y];
        box.content = event.content;

        if(event.content == null) {
            console.log("inserting piece at:", event.x, event.y);

            this.boardService.insertPiece(this.tablero, event.x, event.y, PieceType.QUEEN);
        }else{

        }
        box.status = box.status === BoxStatus.EMPTY ? BoxStatus.SELECTED : BoxStatus.EMPTY;
        
        // if (event.content === PieceType.QUEEN) {
        //     console.log("Queen placed at:", event.x, event.y);
        //     for (let i = 0; i < this.tableroSize; i++) {
        //         // Vertical
        //         if (event.y != i) {
        //             this.tablero[event.x][i].safe = false; // Vertical
        //         }
        //         // Horizontal
        //         if (event.x != i) {
        //             this.tablero[i][event.y].safe = false; // Horizontal
        //         }
        //     }
        //     //Diagonals
        //     for (let i = 1; i < this.tableroSize; i++) {
        //         if (event.x + i < this.tableroSize && event.y + i < this.tableroSize) {
        //             this.tablero[event.x + i][event.y + i].safe = false; // Down Right Diagonal
        //         }
        //         if (event.x - i >= 0 && event.y - i >= 0) {
        //             this.tablero[event.x - i][event.y - i].safe = false; // Up Left Diagonal
        //         }
        //         if (event.x + i < this.tableroSize && event.y - i >= 0) {
        //             this.tablero[event.x + i][event.y - i].safe = false; // Down Left Diagonal
        //         }
        //         if (event.x - i >= 0 && event.y + i < this.tableroSize) {
        //             this.tablero[event.x - i][event.y + i].safe = false; // Up Right Diagonal
        //         }
        //     }
            
        // }

    }
    
}