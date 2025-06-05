package models

import "gorm.io/gorm"

type Tablero struct {
	gorm.Model

	Description string  `gorm:"unique;not null"`
	Positions   []Piece `gorm:"foreignKey:TableroID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
}
