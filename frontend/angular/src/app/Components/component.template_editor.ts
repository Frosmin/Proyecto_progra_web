import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-template-editor',
    imports: [CommonModule],
    templateUrl: './component.template_editor.html',
    styleUrls: ['./component.template_editor.css'],
})
export class TemplateEditorComponent {
    prefabs: Type<PrefabComponent>[] = [];

    removePrefab(prefab: Type<PrefabComponent>) {
        const index = this.prefabs.indexOf(prefab);
        if (index > -1) {
            this.prefabs.splice(index, 1);
        }
    }

    trackById(index: number, prefab: any): number | string {
        return index; // Ensure this returns a unique ID for each prefab
    }
}