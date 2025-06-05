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
	// 	models.Fromulario{},
	// 	models.Tablero{},
	// 	models.Piece{},
	// )

	r := routes.SetupRouter()

	log.Println("Servidor escuchando en :8080")
	log.Fatal(r.Run(":8080"))
}
