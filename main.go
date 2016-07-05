package main

import (
	"net/http"
	"github.com/dtlydon/go-iyfd/controllers"
)

func main() {

	controllers.Register()

	http.ListenAndServe(":8000", nil)
}
