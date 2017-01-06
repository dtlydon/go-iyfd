package main

import (
	"github.com/dtlydon/go-iyfd/controllers"
	"net/http"
)

func main() {

	router := controllers.Register()

	http.ListenAndServe(":8000", router)
}
