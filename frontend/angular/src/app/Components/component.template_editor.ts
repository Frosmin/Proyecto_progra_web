import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';
import { FormsModule } from '@angular/forms';
import { BoxComponent } from './box/box.component';
import { BoxType, BoxStatus,PieceType,BoxEvent } from '../utils/BoxTypes';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-template-editor',
    imports: [CommonModule, FormsModule,BoxComponent],
    templateUrl: './component.template_editor.html',
    styleUrls: ['./component.template_editor.scss'],
    standalone: true
})
export class TemplateEditorComponent {
    prefabs: Type<PrefabComponent>[] = [];
    queensPositions: { x: number; y: number }[] = [];
    tableroSize: number = 8;
    tablero: BoxType[][] = Array.from({ length: this.tableroSize }, (_, x) =>
        Array.from({ length: this.tableroSize }, (_, y) => ({
            id: x * this.tableroSize + y, // Unique ID for each box
            x,
            y,
            content: null,
            status: BoxStatus.EMPTY,
            safe: true,
        }))
    );
    tableroCreado: boolean = true;

        constructor(private cdr: ChangeDetectorRef) {}

    handleBoxClick(event: BoxEvent) {
        const box = this.tablero[event.x][event.y];
        box.content = event.content;
        box.status = box.status === BoxStatus.EMPTY ? BoxStatus.SELECTED : BoxStatus.EMPTY;
        this.queensPositions.push({ x: event.x, y: event.y });
        console.log("Box clicked at:", event.x, event.y, "Content:", event.content);
        if (event.content === PieceType.QUEEN) {
            console.log("Queen placed at:", event.x, event.y);
            for (let i = 0; i < this.tableroSize; i++) {
                if (i !== event.x) {
                    this.tablero[event.y][i].safe = false; // Row
                }
                if (i !== event.y) {
                    this.tablero[i][event.x].safe = false; // Column
                }
            }
            // Diagonals
            for (let i = 0; i < this.tableroSize; i++) {
                const diagX1 = event.x + i;
                const diagY1 = event.y + i;
                const diagX2 = event.x - i;
                const diagY2 = event.y - i;
                if (diagX1 < this.tableroSize && diagY1 < this.tableroSize) {
                    this.tablero[diagX1][diagY1].safe = false; // Diagonal \
                }
                if (diagX2 >= 0 && diagY2 >= 0) {
                    this.tablero[diagX2][diagY2].safe = false; // Diagonal /
                }
            }
        }
        this.cdr.detectChanges(); // Trigger change detection

    }
    
}