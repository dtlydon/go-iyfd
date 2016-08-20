package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/dtlydon/go-iyfd/models"
	"encoding/json"
	"fmt"
)

type matchUpController struct{

}

func (this *matchUpController) query(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-type", "application/json")
	matchUps := models.GetMatchUps()
	err := json.NewEncoder(responseWriter).Encode(&matchUps)
	if(err != nil){
		fmt.Println("Error getting matchups: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	responseWriter.WriteHeader(200)
}

func (this *matchUpController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
	responseWriter.Header().Add("Content-type", "application/json")
	matchUp := models.MatchUp{}
	err := json.NewDecoder(request.Body).Decode(&matchUp)
	if(err != nil){
		fmt.Println("Error creating matchup: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	models.CreateMatchUp(matchUp)
	responseWriter.WriteHeader(200)
}

func (this *matchUpController) patch(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
	responseWriter.Header().Add("Content-type", "application/json")
	matchUp := models.MatchUp{}
	err := json.NewDecoder(request.Body).Decode(&matchUp)
	if(err != nil){
		fmt.Println("Error updating matchup: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	models.UpdateMatchUp(matchUp)
	responseWriter.WriteHeader(200)
}