package models

import "gorm.io/gorm"

type Tablero struct {
	gorm.Model
	Description  string  `json:"description" gorm:"unique;not null"`
	Positions    []Piece `json:"positions" gorm:"foreignKey:TableroID"`
	FormularioID uint    `json:"formularioId,omitempty"`
}
