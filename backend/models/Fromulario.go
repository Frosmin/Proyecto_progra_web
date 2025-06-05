package models

import "gorm.io/gorm"

type Fromulario struct {
	gorm.Model
	Title       string    `gorm:"unique;not null"`
	Description string    `gorm:"not null"`
	Tableros    []Tablero `json:"tableros" gorm:"foreignKey:FormularioID"`
}
