package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/dtlydon/go-iyfd/models"
	"encoding/json"
	"fmt"
	"gopkg.in/mgo.v2/bson"
)

type mimicPlayController struct{

}

func (this *mimicPlayController) query(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-type", "application/json")

	userId := params.ByName("userId")
	fmt.Println("User is: ", userId)
	if(bson.IsObjectIdHex(userId)) {
		bsonUserId := bson.ObjectIdHex(userId)
		userChoices := models.GetUserChoicesViewsByUserId(bsonUserId)
		err := json.NewEncoder(responseWriter).Encode(&userChoices)
		if (err != nil) {
			fmt.Println("Error getting matchups: ", err.Error())
			responseWriter.WriteHeader(400)
			return
		}
	}

	responseWriter.WriteHeader(200)
}

func (this *mimicPlayController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
	responseWriter.Header().Add("Content-type", "application/json")

	userChoice := models.UserChoice{}
	err := json.NewDecoder(request.Body).Decode(&userChoice)
	if(err != nil){
		fmt.Println("Error creating matchup: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	userId := params.ByName("userId")
	if(bson.IsObjectIdHex(userId)) {
		userChoice.UserId = bson.ObjectIdHex(userId)
		models.UpdateUserChoice(userChoice)
	}

	responseWriter.WriteHeader(200)
}

func (this *mimicPlayController) patch(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
	responseWriter.Header().Add("Content-type", "application/json")
	userChoice := models.UserChoice{}
	err := json.NewDecoder(request.Body).Decode(&userChoice)

	if(err != nil){
		fmt.Println("Error updating matchup: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	matchUps := models.GetMatchUps()
	for _, matchUp := range matchUps{
		if matchUp.Id == userChoice.MatchUpId && matchUp.Winner != "" {
			responseWriter.WriteHeader(400)
			return
		}
	}

	userId := params.ByName("userId")
	if(bson.IsObjectIdHex(userId)) {
		if (userChoice.UserId != bson.ObjectIdHex(userId)) {
			responseWriter.WriteHeader(401)
			return
		}

		models.UpdateUserChoice(userChoice)
	}
	responseWriter.WriteHeader(200)
}