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


export type PiecesPositions= {
    piece: PieceType;
    x: number;
    y: number;
}
export type CoordinateKey = `${number}-${number}`;


export type CoordinateDictionary<PiecesPositions> = {
    [key in CoordinateKey]?: PiecesPositions;
};

