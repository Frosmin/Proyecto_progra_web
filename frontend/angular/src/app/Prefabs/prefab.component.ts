import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-prefab',
    template: '',
    styleUrls: ['./prefab.component.css']
})
export class PrefabComponent {
    @Input() id!: number;
    @Input() name!: string;
}

// Derived QuestionComponent
@Component({
    selector: 'app-question',
    template: `
        <div class="question">
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./prefab.component.css']
})
export abstract class QuestionComponent extends PrefabComponent {
    @Input() question!: string; 

    abstract validator(): boolean;
}

// Derived BasicComponent
@Component({
    selector: 'app-basic',
    template: `
        <div class="basic">
            <ng-content></ng-content>
        </div>
    `,
    styleUrls: ['./prefab.component.css']
})
export class BasicComponent extends PrefabComponent {}