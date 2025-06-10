package routes

import (
	"backend/db"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetFormularioHandler(c *gin.Context) {
	var formulario []models.Formulario
	db.DB.Find(&formulario)
	c.JSON(http.StatusOK, formulario)
}
func GetFormularioByIDHandler(c *gin.Context) {
	id := c.Param("id")
	var formulario models.Formulario

	if err := db.DB.First(&formulario, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Formulario no encontrado"})
		return
	}

	c.JSON(http.StatusOK, formulario)
}
