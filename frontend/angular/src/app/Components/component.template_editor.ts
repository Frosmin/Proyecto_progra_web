import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';

@Component({
    selector: 'app-template-editor',
    imports: [CommonModule],
    templateUrl: './component.template_editor.html',
    styleUrls: ['./component.template_editor.css'],
})
export class TemplateEditorComponent {
    prefabs: Type<PrefabComponent>[] = [];
}