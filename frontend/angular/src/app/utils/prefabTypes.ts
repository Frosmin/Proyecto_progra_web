import { CheckBoxQuestionComponent, MultipleChoiceQuestionComponent, TextQuestionComponent } from "../Prefabs/question-types.component";

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
        prefabs: []
    },
    {
        title: 'Preguntas',
        type: PrefabTypes.Question,
        prefabs: [
            {
                name: 'Texto',
                type: TextQuestionComponent,
            },
            {
                name: 'Opción Múltiple',
                type: MultipleChoiceQuestionComponent,
            },
            {
                name: 'CheckBox',
                type: CheckBoxQuestionComponent,
            },
        ],
    },
];