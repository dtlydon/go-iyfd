package controllers

import (
	"net/http"
	"os"
	"bufio"
	"strings"
	"github.com/gorilla/mux"
)

func Register() {

	router := mux.NewRouter()

	teamController := new(teamController)
	router.HandleFunc("/api/teams", teamController.get)
	http.Handle("/", router)

	//TODO: Add css and img
	//http.HandleFunc("/img/", serveResource)
	//http.HandleFunc("/css/", serveResource)
}

//TODO: Rewrite this and own it
func serveResource(w http.ResponseWriter, req *http.Request) {
	path := "public" + req.URL.Path
	var contentType string
	if strings.HasSuffix(path, ".css") {
		contentType = "text/css"
	} else if strings.HasSuffix(path, ".png") {
		contentType = "image/png"
	} else {
		contentType = "text/plain"
	}

	f, err := os.Open(path)

	if err == nil {
		defer f.Close()
		w.Header().Add("Content Type", contentType)

		br := bufio.NewReader(f)
		br.WriteTo(w)
	} else {
		w.WriteHeader(404)
	}
}