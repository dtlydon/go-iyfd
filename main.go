package main

import (
	"fmt"
	"net/http"

	"github.com/dtlydon/go-iyfd/controllers"
)

func main() {
	router := controllers.Register()
	fmt.Println("Starting server...")
	fmt.Println(http.ListenAndServe(":80", router))
}
