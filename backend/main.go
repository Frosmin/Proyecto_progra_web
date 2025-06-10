package main

import (
	"backend/db"
	"backend/routes"
	"log"
)

func main() {

	db.Connect()

	// db.DB.AutoMigrate(
	// 	models.User{},
	// 	models.Formulario{},
	// 	models.Tablero{},
	// 	models.Position{},
	// )

	r := routes.SetupRouter()

	log.Println("Servidor escuchando en :8080")
	log.Fatal(r.Run(":8080"))
}
