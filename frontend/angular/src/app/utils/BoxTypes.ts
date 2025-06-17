export enum PieceType {
    QUEEN= 'queen',
    KING = 'king',
    BISHOP = 'bishop',
    KNIGHT = 'knight',
    ROOK = 'rook',
    PAWN = 'pawn',
}

export enum BoxStatus{
    EMPTY = 'empty',
    SELECTED = 'selected',
    HIGHLIGHTED = 'highlighted',
    CHECKED = 'checked',
}

export type BoxType = {
    id: string,
    x: number;
    y: number;
    content: PieceType | null;
    status: BoxStatus;
    safe: boolean;
};

export type BoxEvent = {
    x: number;
    y: number;
    content: PieceType | null;
}


export type PiecePosition= {
    piece: PieceType | null;
    x: number;
    y: number;
}
export type CoordinateKey = `${number}-${number}`;


export type CoordinateDictionary<PiecePosition> = {
    [key in CoordinateKey]?: PiecePosition;
};


export const Pieces : {type : PieceType, img: string}[] = [
    {
        type: PieceType.QUEEN,
        img : 'queen.png'
    },
    {
        type: PieceType.BISHOP,
        img : 'bishop.png'
    },
    {
        type: PieceType.KNIGHT,
        img : 'knight.png'
    },
    {
        type: PieceType.ROOK,
        img : 'rook.png'
    }
]
    
