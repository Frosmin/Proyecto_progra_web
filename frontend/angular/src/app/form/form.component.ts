import { Component, ViewChild, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateEditorComponent } from '../Components/component.template_editor';
import { PrefabComponent } from '../Prefabs/prefab.component';
import { ButtonListComponent } from '../Components/creatorButton/component.buttonList';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule,TemplateEditorComponent,ButtonListComponent],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  addPrefabToEditor(prefab: PrefabComponent, templateEditor: TemplateEditorComponent) {
    templateEditor.prefabs.push(prefab.constructor as Type<PrefabComponent>); 
  }
}
