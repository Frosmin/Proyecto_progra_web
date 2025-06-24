package routes

import (
	"backend/db"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTablerosHandler(c *gin.Context) {
	var tablero []models.Tablero
	db.DB.Find(&tablero)
	c.JSON(http.StatusOK, tablero)
}

func GetTableroHandler(c *gin.Context) {
	id := c.Param("id")
	var tablero models.Tablero

	// Cargar un tablero específico con sus posiciones
	if err := db.DB.Preload("Positions").First(&tablero, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Tablero no encontrado"})
		return
	}

	c.JSON(http.StatusOK, tablero)
}

func PostTableroHandler(c *gin.Context) {
	var tablero models.Tablero

	if err := c.ShouldBindJSON(&tablero); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tablero.UserID == 0 {
		tablero.UserID = 1 //borrar despues
	}

	// Guardar el tablero con sus posiciones
	if result := db.DB.Create(&tablero); result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	c.JSON(http.StatusCreated, tablero)
}
