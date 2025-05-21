package models

import (
	"time"

	"gorm.io/gorm"
)

type Respuesta struct {
	gorm.Model

	FormularioID uint      `json:"formularioId" gorm:"not null"`
	RespuestaPor string    `json:"respuestaPor"`
	FechaEnvio   time.Time `json:"fechaEnvio" gorm:"default:CURRENT_TIMESTAMP"`

	// Relaciones
	DetallesRespuesta []DetalleRespuesta `json:"detallesRespuesta,omitempty" gorm:"foreignKey:RespuestaID;constraint:OnDelete:CASCADE"`
}
