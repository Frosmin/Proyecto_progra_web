import { PiecePosition } from "./BoxTypes";


export type boardType = {
    id : string;
    size : number;
    pieces : PiecePosition[]
}


export const boardsMockups : boardType[] =[
    {
        id: '1',
        size: 8,
        pieces : [],
    },
    {
        id: '2',
        size: 4,
        pieces : [],
    },
    {
        id: '3',
        size: 5,
        pieces : [],
    },
]