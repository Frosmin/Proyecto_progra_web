import { Component, Input } from '@angular/core';

// Clase base abstracta , creo que es mejor usar interfaces
@Component({
    selector: 'app-prefab',
    template: '',
    styleUrls: ['./prefab.component.css']
})
export abstract class PrefabComponent {
     id!: number;
     name!: string;

    constructor() {
        this.id = Math.floor(Math.random() * 10000); // Genera un ID aleatorio
    }
}

// Template compartido para componentes derivados
@Component({
    selector: 'app-shared-template',
    template: `
        <div class="shared-container">
            <h3>{{ name }}</h3>
            <div class="content">
                <ng-content></ng-content>
            </div>
        </div>
    `,
    styleUrls: ['./prefab.component.css']
})
export class SharedTemplateComponent extends PrefabComponent {}

// Derived QuestionComponent
@Component({
    selector: 'app-question',
    templateUrl: './shared-template.component.html', 
    styleUrls: ['./prefab.component.css']
})
export class QuestionComponent extends PrefabComponent {
    answer: string = '';
    rightAnswer: string = '';
    points: number = 0;

    validator(): boolean {
        // Implementación específica
        return this.answer === this.rightAnswer;
    }
}

// Derived BasicComponent
@Component({
    selector: 'app-basic',
    templateUrl: './shared-template.component.html', 
    styleUrls: ['./prefab.component.css']
})
export class BasicComponent extends PrefabComponent {
    @Input() description!: string;
}