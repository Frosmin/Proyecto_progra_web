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

func GetFormularioFULLByIDHandler(c *gin.Context) {
	id := c.Param("id")
	var formulario models.Formulario

	if err := db.DB.Preload("Tableros").Preload("Tableros.Positions").First(&formulario, id).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Formulario no encontrado"})
		return
	}

	c.JSON(http.StatusOK, formulario)
}

func PostFormularioHandler(c *gin.Context) {
	var formulario models.Formulario

	if err := c.ShouldBindJSON(&formulario); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if res := db.DB.Create(&formulario); res.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": res.Error.Error()})
		return
	}
	c.JSON(http.StatusCreated, formulario)
}
