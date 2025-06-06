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
  editor: boolean = true; // Para determinar si se está en modo edición o no

  setTableroData(tableroData: {size: number, tablero: number[][]}, templateEditor: TemplateEditorComponent) {
  templateEditor.tableroSize = tableroData.size;
  templateEditor.tablero = templateEditor.boardService.createBoard(tableroData.size);
  templateEditor.piecePositions = {};  // Reiniciar las posiciones de las piezas
  templateEditor.tableroCreado = true;
}

  setEditorState(editorState: boolean) {
    this.editor = editorState;
  }
}
