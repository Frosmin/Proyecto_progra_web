import { CheckboxComponent } from "../Prefabs/checkbox/checkbox.component";
import { MultipleChoiceComponent } from "../Prefabs/multiple-choice/multiple-choice.component";
import { TextQuestionComponent } from "../Prefabs/text-question/text-question.component";

export enum PrefabTypes {
  Basic = 'Basic',
  Question = 'Question',
}

export enum QuestionTypes {
  Text = 'Text',
  MultipleChoice = 'MultipleChoice',
  CheckBox = 'CheckBox',
}

export const prefabOptions = [
  {
    title: 'Útiles',
    type: PrefabTypes.Basic,
    prefabs: [],
  },
  {
    title: 'Preguntas',
    type: PrefabTypes.Question,
    prefabs: [
      {
        name: 'Reinas',
        type: TextQuestionComponent,
      },
      {
        name: 'Caballos',
        type: MultipleChoiceComponent,
      },
      {
        name: 'Alfiles',
        type: CheckboxComponent,
      },
      {
        name: 'Tores',
        type: CheckboxComponent,
      },
    ],
  },
];
