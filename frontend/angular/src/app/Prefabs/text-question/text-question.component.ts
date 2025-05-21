import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { QuestionComponent, SharedTemplateComponent } from '../prefab.component';

@Component({
  selector: 'app-text-question',
  standalone: true,
  imports: [FormsModule, SharedTemplateComponent],
  templateUrl: './text-question.component.html',
  styleUrl: './text-question.component.scss'
})
export class TextQuestionComponent extends QuestionComponent {

}
