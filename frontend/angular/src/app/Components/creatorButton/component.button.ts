import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PrefabTypes } from '../../utils/prefabTypes';
import {
  BasicComponent,
  PrefabComponent,
} from '../../Prefabs/prefab.component';
import { TextQuestionComponent } from '../../Prefabs/text-question/text-question.component';

@Component({
  selector: 'app-creator-button',
  standalone: true,
  template: `
    <button class="creational-btn" (click)="createPrefab()">{{ name }}</button>
  `,
  styleUrls: ['./component.button.css'],
})
export class CreatorButtonComponent {
  @Output() addPrefab = new EventEmitter<PrefabComponent>();
  @Input() name: string = 'Crear Prefab';
  @Input() prefabType: PrefabComponent = new TextQuestionComponent();

  createPrefab() {
    this.addPrefab.emit(this.prefabType);
  }
}
