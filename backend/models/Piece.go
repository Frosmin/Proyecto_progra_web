package models

import (
	"gorm.io/gorm"
)

type PieceType string

const (
	QUEEN  PieceType = "queen"
	BISHOP PieceType = "bishop"
	KNIGHT PieceType = "knight"
	ROOK   PieceType = "rook"
)

type Piece struct {
	gorm.Model

	Type PieceType `gorm:"type:varchar(20);not null"`
	PosX int       `gorm:"not null"`
	PosY int       `gorm:"not null"`
}
