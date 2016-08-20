package controllers

import (
	"net/http"
	"os"
	"bufio"
	"strings"
	"github.com/julienschmidt/httprouter"
	"fmt"
	"github.com/dtlydon/go-iyfd/models"
	"github.com/dtlydon/go-iyfd/controllers/util"
)

func Register() *httprouter.Router {
	router := httprouter.New()
	router.GET("/", Index);

	//Users
	userController := new(userController)
	router.POST("/api/user/register", userController.register)
	router.POST("/api/user/login", userController.login)
	router.GET("/api/user", Authorize(userController.query, models.AdminUser))

	//Teams
	teamController := new(teamController)
	router.GET("/api/teams", Authorize(teamController.query, models.AdminUser))
	router.GET("/api/teams/:id", Authorize(teamController.get, models.AdminUser))
	router.POST("/api/teams", Authorize(teamController.post, models.AdminUser))
	router.PATCH("/api/teams", Authorize(teamController.patch, models.AdminUser))

	//Entries
	entryController := new(entryController)
	router.GET("/api/entries", Authorize(entryController.query, models.AdminUser))
	router.POST("/api/entries", Authorize(entryController.post, models.AdminUser))
	router.PATCH("/api/entries", Authorize(entryController.patch, models.AdminUser))

	//MatchUps
	matchUpController := new(matchUpController)
	router.GET("/api/matchups", Authorize(matchUpController.query, models.AdminUser))
	router.POST("/api/matchups", Authorize(matchUpController.post, models.AdminUser))
	router.PATCH("/api/matchups", Authorize(matchUpController.patch, models.AdminUser))

	//Choices
	userChoiceController := new(userChoiceController)
	router.GET("/api/userchoice", Authorize(userChoiceController.query, models.BasicUser))
	router.POST("/api/userchoice", Authorize(userChoiceController.post, models.BasicUser))
	router.PATCH("/api/userchoice", Authorize(userChoiceController.patch, models.BasicUser))

	//TODO: Add css and img
	//http.HandleFunc("/img/", serveResource)
	//http.HandleFunc("/css/", serveResource)
	return router;
}

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params){
	fmt.Fprint(w, "This is a test")
}

func Authorize(handle httprouter.Handle, role models.Role) httprouter.Handle {
	return func(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
		tokenString := request.Header.Get("token")
		if(tokenString != "") {
			claims, ok := util.GetToken(tokenString)

			if ok && (claims["role"]).(float64) >= float64(role) {
				handle(responseWriter, request, params)
				return
			}
		}

		http.Error(responseWriter, http.StatusText(http.StatusUnauthorized), http.StatusUnauthorized)
	}
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