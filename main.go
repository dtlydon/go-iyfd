package main

import (
	"github.com/dtlydon/go-iyfd/controllers"
	"net/http"
	"fmt"
)

func main() {
	router := controllers.Register()
	fmt.Println("Starting server...")
	http.ListenAndServe(":80", router)
}
