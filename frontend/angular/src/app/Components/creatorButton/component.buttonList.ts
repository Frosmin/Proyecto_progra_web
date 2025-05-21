import { Component,Output,EventEmitter } from '@angular/core';
import { prefabOptions } from '../../utils/prefabTypes';
import { PrefabComponent } from '../../Prefabs/prefab.component';
import { CreatorButtonComponent } from './component.button';

@Component({
    selector: 'app-button-list',
    imports: [CreatorButtonComponent],
    standalone: true,
    templateUrl: './component.buttonList.html',
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