package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/dtlydon/go-iyfd/models"
	"encoding/json"
	"fmt"
	"github.com/dtlydon/go-iyfd/controllers/util"
	"gopkg.in/mgo.v2/bson"
)

type userChoiceController struct{

}

func (this *userChoiceController) query(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-type", "application/json")
	tokenString := request.Header.Get("token")
	//If you managed to lose your token, you will be denied...
	if(tokenString == "") {
		responseWriter.WriteHeader(401)
		return
	}

	token, _ := util.GetToken(tokenString)
	userId := token["id"]
	userChoices := models.GetUserChoicesViewsByUserId(userId.(string))
	err := json.NewEncoder(responseWriter).Encode(&userChoices)
	if(err != nil){
		fmt.Println("Error getting matchups: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	responseWriter.WriteHeader(200)
}

func (this *userChoiceController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
	responseWriter.Header().Add("Content-type", "application/json")
	tokenString := request.Header.Get("token")
	//If you managed to lose your token, you will be denied...
	if(tokenString == "") {
		responseWriter.WriteHeader(401)
		return
	}

	token, _ := util.GetToken(tokenString)
	userId := token["id"]

	userChoice := models.UserChoice{}
	err := json.NewDecoder(request.Body).Decode(&userChoice)
	if(err != nil){
		fmt.Println("Error creating matchup: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	userChoice.UserId = bson.ObjectIdHex(userId.(string))

	//TODO: Add error handling for each CRUD
	models.CreateUserChoice(userChoice)
	responseWriter.WriteHeader(200)
}

func (this *userChoiceController) patch(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
	responseWriter.Header().Add("Content-type", "application/json")
	tokenString := request.Header.Get("token")
	//If you managed to lose your token, you will be denied...
	if(tokenString == "") {
		responseWriter.WriteHeader(401)
		return
	}

	token, _ := util.GetToken(tokenString)
	userId := token["id"]
	userChoice := models.UserChoice{}
	err := json.NewDecoder(request.Body).Decode(&userChoice)
	if(err != nil){
		fmt.Println("Error updating matchup: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	if(userChoice.UserId != bson.ObjectIdHex(userId.(string))){
		responseWriter.WriteHeader(401)
		return
	}

	models.UpdateUserChoice(userChoice)
	responseWriter.WriteHeader(200)
}