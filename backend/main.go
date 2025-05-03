package main

import (
	"net/http"
	"backend/db"
	"backend/routes"
	"github.com/gorilla/mux"
)

func main() {

	db.Connect()

	r := mux.NewRouter()

	r.HandleFunc("/", routes.Homehandler)
	http.ListenAndServe(":8080", r)
}
