import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Component, Type } from '@angular/core';
import { PrefabComponent } from '../Prefabs/prefab.component';

@Component({
    selector: 'app-template-editor',
    template: `
        <div>
            <h2>Prefab List</h2>
            <ng-container *ngFor="let prefab of prefabs">
                <ng-container *ngComponentOutlet="prefab"></ng-container>
            </ng-container>
            <ng-template #noPrefabsMessage>
                <p>No prefabs available.</p>
            </ng-template>
        </div>
    `,
    imports: [CommonModule],
    styleUrls: ['./component.template_editor.css'],
})
export class TemplateEditorComponent {
    prefabs: Type<PrefabComponent>[] = [];
}