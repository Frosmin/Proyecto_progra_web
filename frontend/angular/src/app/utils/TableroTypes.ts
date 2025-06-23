export interface Position {
  ID: number;
  Type: string;
  PosX: number;
  PosY: number;
  TableroID: number;
}

export interface Tablero {
  ID: number;
  Title: string;
  Description: string;
  Size: number;
  Positions: Position[];
}
