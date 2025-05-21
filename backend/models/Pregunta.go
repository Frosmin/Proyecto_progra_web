package models

import "gorm.io/gorm"

type Pregunta struct {
	gorm.Model

	FormularioID uint   `json:"formularioId" gorm:"not null"`
	Texto        string `json:"texto" gorm:"not null"`
	Tipo         string `json:"tipo" gorm:"not null"` // "text", "multipleChoice", "checkbox"
	Requerido    bool   `json:"requerido" gorm:"default:false"`
	Orden        int    `json:"orden"`

	// Para preguntas de opción múltiple o checkbox
	Opciones []Opcion `json:"opciones,omitempty" gorm:"foreignKey:PreguntaID;constraint:OnDelete:CASCADE"`
}
