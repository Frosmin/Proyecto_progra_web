import { Component } from '@angular/core';
import { PrefabComponent,QuestionComponent } from './prefab.component';

// Text Question
@Component({
    selector: 'app-text-question',
    template: `
        <div class="text-question">
            <label>{{ name }}</label>
            <input type="text" [id]="id" />
        </div>
    `,
    styleUrls: ['./prefab.component.css']
})
export class TextQuestionComponent extends QuestionComponent {
    validator(): boolean {
        // Implement validation logic for TextQuestionComponent
        return true;
    }
}

// Multiple Choice Question
@Component({
    selector: 'app-multiple-choice-question',
    template: `
        <div class="multiple-choice-question">
            <label>{{ name }}</label>
            <div *ngFor="let option of options">
                <input type="radio" [name]="id" [value]="option" /> {{ option }}
            </div>
        </div>
    `,
    styleUrls: ['./prefab.component.css']
})
export class MultipleChoiceQuestionComponent extends QuestionComponent {
    options: string[] = [];

    validator(): boolean {
        // Implement validation logic for MultipleChoiceQuestionComponent
        return this.options.length > 0;
    }
}

// CheckBox Question
@Component({
    selector: 'app-checkbox-question',
    template: `
        <div class="checkbox-question">
            <label>{{ name }}</label>
            <div *ngFor="let option of options">
                <input type="checkbox" [id]="id + '-' + option" [value]="option" /> {{ option }}
            </div>
        </div>
    `,
    styleUrls: ['./prefab.component.css']
})
export class CheckBoxQuestionComponent extends QuestionComponent {
    options: string[] = [];

    validator(): boolean {
        // Implement validation logic for CheckBoxQuestionComponent
        return this.options.length > 0;
    }
}