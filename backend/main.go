package main

import (
	"backend/db"
	"backend/routes"
	"log"
	"os/user"
)

func main() {

	db.Connect()

	// Migración de modelos
	db.DB.AutoMigrate(
		user.User{},
	)

	r := routes.SetupRouter()

	log.Println("Servidor escuchando en :8080")
	log.Fatal(r.Run(":8080"))
}
