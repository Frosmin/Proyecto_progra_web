package routes

import "net/http"

func Homehandler(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("esto vien de la carpeta routesss"))
}
