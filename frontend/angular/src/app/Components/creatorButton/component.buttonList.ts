import { Component, Output,Input, EventEmitter } from '@angular/core';
import { prefabOptions } from '../../utils/prefabTypes';
import { PrefabComponent } from '../../Prefabs/prefab.component';
import { CreatorButtonComponent } from './component.button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-button-list',
    imports: [CreatorButtonComponent, FormsModule, CommonModule],
    standalone: true,
    templateUrl: './component.buttonList.html',
    styleUrls: ['./component.buttonList.css']
})
export class ButtonListComponent {
    @Output() tableroCreado = new EventEmitter<{size: number, tablero: number[][]}>();
    @Output() editorChange = new EventEmitter<boolean>();
    @Input() editor: boolean = true; // Para determinar si se está en modo edición o no
    numeroValue: number | null = null;

    buttons = prefabOptions[1].prefabs.map(option => ({
        label: option.name,
        prefabType: option.type,
    }));

    procesarNumero() {
        if (this.numeroValue !== null && this.numeroValue > 0) {
            const tableroSize = this.numeroValue;
            const tablero = this.crearTablero(tableroSize);
            this.tableroCreado.emit({size: tableroSize, tablero: tablero});
        } else {
            alert('Por favor, introduce un número válido mayor que cero.');
        }
    }

    crearTablero(size: number): number[][] {
        const tablero: number[][] = [];
        for (let i = 0; i < size; i++) {
            const fila: number[] = [];
            for (let j = 0; j < size; j++) {
                fila.push(i * size + j + 1); // Numeramos las celdas de 1 a n²
            }
            tablero.push(fila);
        }
        return tablero;
    }
    toggleEditor() {
        this.editor = !this.editor;
        this.editorChange.emit(this.editor);
    }

}