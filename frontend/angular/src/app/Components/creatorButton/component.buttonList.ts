import { Component,Output,EventEmitter } from '@angular/core';
import { prefabOptions } from '../../utils/prefabTypes';
import { PrefabComponent } from '../../Prefabs/prefab.component';
import { NgModule } from '@angular/core';
import { CreatorButtonComponent } from './component.button';

@Component({
    selector: 'app-button-list',
    template: `
        <div class="button-list">
            <h2>Opcioness</h2>
            @for(button of buttons; track button.label) {
                <app-creator-button 
                    [name]="button.label" 
                    (addPrefab)="onButtonClick($event)">
                </app-creator-button>
            }
            
        </div>
    `,
    imports: [CreatorButtonComponent],
    styleUrls: ['./component.buttonList.css']
})
export class ButtonListComponent {
    @Output() prefabCreated = new EventEmitter<PrefabComponent>();


    buttons = prefabOptions[1].prefabs.map(option => ({
        label: option.name,
        prefabType: option.type,
    }));

    onButtonClick(prefab: PrefabComponent) {
        this.prefabCreated.emit(prefab); 
    }
}