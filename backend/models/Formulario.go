package models

import (
	"time"

	"gorm.io/gorm"
)

type Formulario struct {
	gorm.Model

	Title       string    `json:"title" gorm:"unique;not null"`
	Description string    `json:"description"`
	CreatedBy   string    `json:"createdBy"`
	IsPublic    bool      `json:"isPublic" gorm:"default:false"`
	ExpiresAt   time.Time `json:"expiresAt,omitempty"`

	Preguntas  []Pregunta  `json:"preguntas,omitempty" gorm:"foreignKey:FormularioID;constraint:OnDelete:CASCADE"`
	Respuestas []Respuesta `json:"respuestas,omitempty" gorm:"foreignKey:FormularioID;constraint:OnDelete:CASCADE"`
}
