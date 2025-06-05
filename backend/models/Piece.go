package models

type PieceType string

const (
	QUEEN  PieceType = "queen"
	BISHOP PieceType = "bishop"
	KNIGHT PieceType = "knight"
	ROOK   PieceType = "rook"
)

type Piece struct {
	Type      PieceType `json:"type" gorm:"type:varchar(20);not null"`
	PosX      int       `json:"posX" gorm:"not null"`
	PosY      int       `json:"posY" gorm:"not null"`
	TableroID uint      `json:"-"`
}
