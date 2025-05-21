import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { QuestionComponent } from '../prefab.component';

@Component({
  selector: 'app-checkbox',
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
})
export class CheckboxComponent extends QuestionComponent {
  options: { [key: string]: string } = {};

  objectValues(obj: { [key: string]: string }): string[] {
    return Object.values(obj);
  }

  override validator(): boolean {
    return true;
  }
}
