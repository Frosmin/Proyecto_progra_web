package routes

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

// SetupRouter configura el enrutador con middleware CORS y todas las rutas necesarias
func SetupRouter() *gin.Engine {
	r := gin.Default()

	// Configuración de CORS
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"*"} // Tu aplicación Angular
	config.AllowMethods = []string{"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}

	r.Use(cors.New(config))

	// Configuración base
	r.GET("/", func(c *gin.Context) {
		c.String(200, "Bienvenido a la API de Aprendizaje Python")
	})

	// Configurar rutas de API
	api := r.Group("/api")

	// Rutas de usuario
	api.GET("/users", GetUsersHandler)
	api.GET("/user/:id", GetUserHandler)
	api.POST("/user", PostUserHandler)
	api.DELETE("/user/:id", DeleteUserHandler)

	// Rutas de tablero
	api.GET("/tableros", GetTablerosHandler)
	api.GET("/tablero/:id", GetTableroHandler)
	api.POST("/tablero", PostTableroHandler)
	api.GET("/user/:id/tableros", GetUserTablerosHandler)

	//login
	api.POST("/login", LoginHandler)

	return r
}
