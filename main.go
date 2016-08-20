package main

import (
	"net/http"
	"github.com/dtlydon/go-iyfd/controllers"
)

func main() {

	router := controllers.Register()

	http.ListenAndServe(":8000", router)
}
