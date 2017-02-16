package controllers

import (
	"net/http"
	"os"
	"bufio"
	"strings"
	"github.com/julienschmidt/httprouter"
	"github.com/dtlydon/go-iyfd/models"
	"github.com/dtlydon/go-iyfd/controllers/util"
	"html/template"
	"fmt"
)

func Register() *httprouter.Router {
	router := httprouter.New()

	//Users
	userController := new(userController)
	router.POST("/api/user/register", userController.register)
	router.POST("/api/user/login", userController.login)
	router.GET("/api/user/info", userController.get)
	router.GET("/api/user", Authorize(userController.query, models.AdminUser))
	router.POST("/api/user", Authorize(userController.post, models.AdminUser))

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
	router.POST("/api/matchups/generate", Authorize(matchUpController.generateFirstRound, models.AdminUser))

	//Choices
	userChoiceController := new(userChoiceController)
	router.GET("/api/userchoice", Authorize(userChoiceController.query, models.BasicUser))
	router.POST("/api/userchoice", Authorize(userChoiceController.post, models.BasicUser))
	router.PATCH("/api/userchoice", Authorize(userChoiceController.patch, models.BasicUser))

	//Mimic Play
	mimicPlayController := new(mimicPlayController)
	router.GET("/api/userchoice/:userId", Authorize(mimicPlayController.query, models.AdminUser))
	router.POST("/api/userchoice/:userId", Authorize(mimicPlayController.post, models.AdminUser))
	router.PATCH("/api/userchoice/:userId", Authorize(mimicPlayController.patch, models.AdminUser))

	settingsController := new(settingsController)
	router.GET("/api/settings", settingsController.get)
	router.POST("/api/settings", Authorize(settingsController.post, models.AdminUser))

	scoreController := new(scoreController)
	router.GET("/api/scores", scoreController.query)

	audioController := new(audioController)
	router.GET("/api/announcement.m4a", audioController.get)
	router.POST("/api/announcement", Authorize(audioController.post, models.Bob))

	router.GET("/content/*all", serveMyContent)
	router.GET("/lib/*all", serveResource)
	router.GET("/app/*all", serveApp)

	router.NotFound = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./views/index.html")
	})
	return router
}

func Index(w http.ResponseWriter, r *http.Request, _ httprouter.Params){
	w.Header().Add("Content Type", "text/html")
	t, _ := template.ParseFiles("views/Index.html");
	if(t != nil) {
		viewModel := struct {
			Title string
			Items []string
		}{
			Title: "IYFD",
			Items: []string{},
		}

		t.Execute(w, viewModel)
	}
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

func serveApp(w http.ResponseWriter, req *http.Request, params httprouter.Params){
	path := "app" + params.ByName("all")
	contentType := "text/javascript"

	f, err := os.Open(path)

	if err == nil {
		defer f.Close()
		w.Header().Add("Content-Type", contentType)

		br := bufio.NewReader(f)
		br.WriteTo(w)
	} else {
		fmt.Println("error ", err)
		w.WriteHeader(404)
	}
}

func serveMyContent(w http.ResponseWriter, req *http.Request, params httprouter.Params){
	path := params.ByName("all")
	var contentType string
	var pathPrefix string

	if strings.HasSuffix(path, ".js") {
		contentType = "text/javascript"
		pathPrefix = "js"
	} else if strings.HasSuffix(path, ".css"){
		contentType = "text/css"
		pathPrefix = "styles"
	}

	path = pathPrefix + path

	f, err := os.Open(path)

	if err == nil {
		defer f.Close()
		w.Header().Add("Content-Type", contentType)

		br := bufio.NewReader(f)
		br.WriteTo(w)
	} else {
		fmt.Println("error ", err)
		w.WriteHeader(404)
	}
}

func serveResource(w http.ResponseWriter, req *http.Request, params httprouter.Params) {
	path := "lib" + params.ByName("all")
	var contentType string

	if strings.HasSuffix(path, ".html") {
		contentType = "text/html"
	} else if strings.HasSuffix(path, ".css") {
		fmt.Println("css ", path)
		contentType = "text/css"
	} else if strings.HasSuffix(path, ".png") {
		contentType = "image/png"
	}else if strings.HasSuffix(path, ".js"){
		contentType = "text/javascript"
	} else {
		fmt.Println("plain ", path)
		contentType = "text/plain"
	}

	f, err := os.Open(path)

	if err == nil {
		defer f.Close()
		w.Header().Add("Content-Type", contentType)

		br := bufio.NewReader(f)
		br.WriteTo(w)
	} else {
		fmt.Println("error ", err)
		w.WriteHeader(404)
	}
}