package models

import "gorm.io/gorm"

type Opcion struct {
	gorm.Model

	PreguntaID uint   `json:"preguntaId" gorm:"not null"`
	Texto      string `json:"texto" gorm:"not null"`
	Valor      string `json:"valor" gorm:"not null"`
}
