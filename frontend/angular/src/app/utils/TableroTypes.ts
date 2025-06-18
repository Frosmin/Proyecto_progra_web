export interface Position {
  ID: number;
  CreatedAt: string;   
  UpdatedAt: string;
  DeletedAt: string | null;
  Type: string;
  PosX: number;
  PosY: number;
  TableroID: number;
}

export interface Tablero {
  ID: number;
  createdAt: string;   
  updatedAt: string;
  DeletedAt: string | null;
  Title: string;
  Description: string;
  Size: number;
  Positions: Position[];
}
