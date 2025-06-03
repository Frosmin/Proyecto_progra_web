import { inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';
import { FormsModule } from '@angular/forms';
import { BoxComponent } from './box/box.component';
import { BoxType, PieceType,BoxEvent,
        CoordinateDictionary,PiecePosition,Pieces } from '../utils/BoxTypes';
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
    readonly pieces = Pieces;

    dropdownProps: { show: boolean; x: number; y: number } = {
        show: false,
        x: 0,
        y: 0,
    };


    handleBoxClick(event: BoxEvent) {
        const box = this.tablero[event.x][event.y];

        if(this.editor){
            if(box.content == null) {
                this.dropdownProps.show = true;
                this.dropdownProps.x = event.x;
                this.dropdownProps.y = event.y;
                
            }else{
                this.boardService.removePiece(this.tablero,this.piecePositions, event.x, event.y);
                console.log(this.piecePositions);
            }
        }else{
            // Logica para cuando no se está en modo edición
        }
        
    }

    handleSelectPiece(pieceType: PieceType) {
        const x: number = this.dropdownProps.x;
        const y : number = this.dropdownProps.y;
        // this.boardService.insertPiece(this.tablero,{x, y, piece: pieceType});
        this.tablero[x][y].content = pieceType;
        this.piecePositions[`${x}-${y}`] = { piece: pieceType, x, y };
        this.dropdownProps.show = false; 
    }
    
}