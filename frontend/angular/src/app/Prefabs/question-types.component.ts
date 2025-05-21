import { Component, Input } from '@angular/core';
import { QuestionComponent, SharedTemplateComponent } from './prefab.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


// Text Question Component
@Component({
    selector: 'app-text-question',
    template: `
        <app-shared-template>
             <div class="text-question">
                  <label>{{ name }}</label>
                   <input type="text" [name]="id.toString()" [(ngModel)]="answer" />
                </div>
             </app-shared-template>
    `,
    imports: [FormsModule, SharedTemplateComponent],
    styleUrls: ['./question-types.component.css']
})
export class TextQuestionComponent extends QuestionComponent {
    
    
}

// Multiple Choice Question Component
@Component({
    selector: 'app-multiple-choice-question',
    template: `
        <app-shared-template >

             <div class="multiple-choice-question">

                  <label>{{ name }}</label>

                   <div *ngFor="let option of objectValues(options)">

                        <input type="radio" [name]="id" [value]="options[option]" /> {{ options[option] }}

                     </div>

                  </div>

        </app-shared-template>
    `,
    imports: [CommonModule,SharedTemplateComponent],
    styleUrls: ['./question-types.component.css']
})
export class MultipleChoiceQuestionComponent extends QuestionComponent {
     
    options: { [key: string]: string } = {};

    objectValues(obj: { [key: string]: string }): string[] {
        return Object.values(obj);
    }

    addOption(key: string, value: string): void {
        this.options[key] = value;
    }
}

// CheckBox Question
@Component({
    selector: 'app-checkbox-question',
    template: `
        <div class="checkbox-question">
            <label>{{ name }}</label>
            <div *ngFor="let option of objectValues(options)">
                <input type="checkbox" [id]="id.toString() + '-' + option" [value]="option" /> {{ option }}
            </div>
        </div>
    `,
    imports:[CommonModule],
    styleUrls: ['./prefab.component.css']
})
export class CheckBoxQuestionComponent extends QuestionComponent {
    options: { [key: string]: string } = {};

    objectValues(obj: { [key: string]: string }): string[] {
        return Object.values(obj);
    }

    override validator(): boolean {
        return true;
    }

}