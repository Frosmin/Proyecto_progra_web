import { Component, Output, EventEmitter } from '@angular/core';
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
    @Output() prefabCreated = new EventEmitter<PrefabComponent>();
    @Output() tableroCreado = new EventEmitter<{size: number, tablero: number[][]}>();

    // Propiedad para el input de número
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
            
            // Opcional: Resetear el valor del input
            // this.numeroValue = null;
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

    onButtonClick(prefab: PrefabComponent) {
        this.prefabCreated.emit(prefab); 
    }
}