enum PieceType {
    QUEEN= 'queen',
    KING = 'king',
    BISHOP = 'bishop',
    KNIGHT = 'knight',
    ROOK = 'rook',
    PAWN = 'pawn',
}

enum BoxStatus{
    EMPTY = 'empty',
    SELECTED = 'selected',
    HIGHLIGHTED = 'highlighted',
}

type BoxType = {
    id: number,
    x: number;
    y: number;
    content: PieceType | null;
    status: BoxStatus;
};

export type { PieceType, BoxStatus, BoxType };