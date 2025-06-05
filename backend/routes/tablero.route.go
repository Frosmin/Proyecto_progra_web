package routes

import (
	"backend/db"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetTableroHandler(c *gin.Context) {
	var tablero []models.Tablero
	db.DB.Find(&tablero)
	c.JSON(http.StatusOK, tablero)
}

func PostTableroHandler(c *gin.Context) {
	var tablero models.Tablero
	if c.ShouldBindJSON(&tablero) != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Tablero no creado"})
	}
	c.JSON(http.StatusCreated, tablero)
}
