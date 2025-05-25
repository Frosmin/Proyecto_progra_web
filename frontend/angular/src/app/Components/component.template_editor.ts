import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-template-editor',
    imports: [CommonModule, FormsModule],
    templateUrl: './component.template_editor.html',
    styleUrls: ['./component.template_editor.css'],
    standalone: true
})
export class TemplateEditorComponent {
    prefabs: Type<PrefabComponent>[] = [];
    
    tableroSize: number = 0;
    tablero: number[][] = [];
    tableroCreado: boolean = false;
}