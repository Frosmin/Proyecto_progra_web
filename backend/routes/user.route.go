package routes

import (
	"backend/db"
	"backend/models"
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetUsersHandler(c *gin.Context) {
	var users []models.User
	db.DB.Find(&users)
	c.JSON(http.StatusOK, users)
}

func GetUserHandler(c *gin.Context) {
	id := c.Param("id")
	var user models.User
	db.DB.First(&user, id)

	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "usuario no encontrado"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func PostUserHandler(c *gin.Context) {
	var user models.User

	var error = c.ShouldBindJSON(&user)

	if error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "usuario no creado"})
	}

	c.JSON(http.StatusCreated, user)

}

func DeleteUserHandler(c *gin.Context) {
	id := c.Param("id")
	var user models.User

	db.DB.First(&user, id)

	if user.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Usuario no encontrado"})
		return
	}

	// Eliminación definitiva
	db.DB.Unscoped().Delete(&user)

	// Opcional: soft delete (mantiene el registro pero lo marca como eliminado)
	// db.DB.Delete(&user)

	c.JSON(http.StatusOK, gin.H{"message": "Usuario eliminado correctamente"})
}
