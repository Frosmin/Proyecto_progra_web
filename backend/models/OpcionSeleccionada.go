package models

import "gorm.io/gorm"

type OpcionSeleccionada struct {
	gorm.Model

	DetalleRespuestaID uint `json:"detalleRespuestaId" gorm:"not null"`
	OpcionID           uint `json:"opcionId" gorm:"not null"`
}
