import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';
import { FormsModule } from '@angular/forms';
import { BoxComponent } from './box/box.component';
import { BoxType, BoxStatus,PieceType } from '../utils/BoxTypes';

@Component({
    selector: 'app-template-editor',
    imports: [CommonModule, FormsModule,BoxComponent],
    templateUrl: './component.template_editor.html',
    styleUrls: ['./component.template_editor.scss'],
    standalone: true
})
export class TemplateEditorComponent {
    prefabs: Type<PrefabComponent>[] = [];
    
    tableroSize: number = 8;
    tablero: BoxType[][] = Array.from({ length: this.tableroSize }, (_, x) =>
        Array.from({ length: this.tableroSize }, (_, y) => ({
            id: x * this.tableroSize + y, // Unique ID for each box
            x,
            y,
            content: null,
            status: 'EMPTY' as BoxStatus
        }))
    );
    tableroCreado: boolean = true;
}