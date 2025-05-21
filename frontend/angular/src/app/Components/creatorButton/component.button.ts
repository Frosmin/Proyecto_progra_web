import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PrefabTypes } from "../../utils/prefabTypes";
import { BasicComponent, PrefabComponent } from "../../Prefabs/prefab.component";
import { MultipleChoiceQuestionComponent,TextQuestionComponent } from "../../Prefabs/question-types.component";

@Component({
    selector: 'app-creator-button',
    template: `
        <button class="creational-btn" (click)="createPrefab()">{{name}}</button>
    `,
    styleUrls: ['./component.button.css']
})
export class CreatorButtonComponent {
    @Output() addPrefab  = new EventEmitter<PrefabComponent>();
    @Input() name: string = "Crear Prefab";
    // @Input() prefabType: PrefabComponent = new MultipleChoiceQuestionComponent;
    
    createPrefab() {
        this.addPrefab.emit(new TextQuestionComponent());
    }

}