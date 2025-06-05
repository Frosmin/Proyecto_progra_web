package models

import "gorm.io/gorm"

type Position struct {
	gorm.Model
	Type      string `gorm:"not null"`
	PosX      int    `gorm:"not null"`
	PosY      int    `gorm:"not null"`
	TableroID uint
}
type Tablero struct {
	gorm.Model
	Description  string     `gorm:"unique;not null"`
	Positions    []Position `gorm:"foreignKey:TableroID"`
	FormularioID uint       `gorm:"column:formularioId;type:bigint;not null"`
}
