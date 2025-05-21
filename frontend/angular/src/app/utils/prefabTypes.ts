
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
    },
    {
        title: 'Preguntas',
        type: PrefabTypes.Question,
        prefabs: [
            {
                name: 'Texto',
                type: QuestionTypes.Text,
            },
            {
                name: 'Opción Múltiple',
                type: QuestionTypes.MultipleChoice,
            },
            {
                name: 'CheckBox',
                type: QuestionTypes.CheckBox,
            },
        ],
    },
];