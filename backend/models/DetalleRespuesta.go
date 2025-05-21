package models

import "gorm.io/gorm"

type DetalleRespuesta struct {
	gorm.Model

	RespuestaID uint   `json:"respuestaId" gorm:"not null"`
	PreguntaID  uint   `json:"preguntaId" gorm:"not null"`
	Texto       string `json:"texto"`

	// Para respuestas de selección múltiple o checkbox
	OpcionesSeleccionadas []OpcionSeleccionada `json:"opcionesSeleccionadas,omitempty" gorm:"foreignKey:DetalleRespuestaID;constraint:OnDelete:CASCADE"`
}
