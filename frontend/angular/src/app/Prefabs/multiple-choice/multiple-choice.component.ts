import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  QuestionComponent,
  SharedTemplateComponent,
} from '../prefab.component';

@Component({
  selector: 'app-multiple-choice',
  imports: [CommonModule, SharedTemplateComponent],
  templateUrl: './multiple-choice.component.html',
  styleUrl: './multiple-choice.component.scss',
})
export class MultipleChoiceComponent extends QuestionComponent {
  options: { [key: string]: string } = {};

  objectValues(obj: { [key: string]: string }): string[] {
    return Object.values(obj);
  }

  addOption(key: string, value: string): void {
    this.options[key] = value;
  }
}
