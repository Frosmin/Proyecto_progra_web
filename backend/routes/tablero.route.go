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

	if tablero.ID == 0 {
		// Crear un nuevo tablero
		if result := db.DB.Create(&tablero); result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}
		c.JSON(http.StatusCreated, tablero)
	} else {
		// Buscar y actualizar el tablero existente
		var existingTablero models.Tablero
		if err := db.DB.First(&existingTablero, tablero.ID).Error; err != nil {
			c.JSON(http.StatusNotFound, gin.H{"error": "Tablero no encontrado"})
			return
		}

		// Update the tablero fields
		if result := db.DB.Model(&existingTablero).Updates(tablero); result.Error != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
			return
		}

		// Update the positions of the tablero
		if len(tablero.Positions) > 0 {
			// Delete existing positions
			db.DB.Where("tablero_id = ?", existingTablero.ID).Delete(&models.Position{})
			// Add new positions
			for _, position := range tablero.Positions {
				position.TableroID = existingTablero.ID
				if err := db.DB.Create(&position).Error; err != nil {
					c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
					return
				}
			}
		}
		c.JSON(http.StatusOK, existingTablero)
	}
}

func GetUserTablerosHandler(c *gin.Context) {
	userID := c.Param("id")
	var tableros []models.Tablero

	if err := db.DB.Where("user_id = ?", userID).Find(&tableros).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Error al obtener los tableros"})
		return
	}

	c.JSON(http.StatusOK, tableros)
}
