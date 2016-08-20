package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/dtlydon/go-iyfd/models"
	"github.com/julienschmidt/httprouter"
	"gopkg.in/mgo.v2/bson"
	"fmt"
)

type teamController struct{
}

func (this *teamController) query(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-Type", "application/json")
	teams := models.GetTeams()
	err := json.NewEncoder(responseWriter).Encode(teams)
	if(err != nil){
		fmt.Printf("Error querying teams: %s", err.Error())
	}
	responseWriter.WriteHeader(200)
}

func (this *teamController) get(responseWriter http.ResponseWriter, r *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content Type", "application/json")
	id := params.ByName("id")
	if(bson.IsObjectIdHex(id)){
		team := models.GetTeam(bson.ObjectIdHex(id))
		err2 := json.NewEncoder(responseWriter).Encode(team)
		if(err2 != nil){
			fmt.Printf("Error get team: %s", err2.Error())
		}
	}
	responseWriter.WriteHeader(200)
}

func (this *teamController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	team := models.Team{}
	err := json.NewDecoder(request.Body).Decode(&team)
	if(err != nil){
		fmt.Printf("Error adding team: %s", err.Error())
	}

	models.CreateTeam(team)
	responseWriter.WriteHeader(200)
}

func (this *teamController) patch(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	team := models.Team{}
	err := json.NewDecoder(request.Body).Decode(&team)
	if(err != nil){
		fmt.Printf("Error patching team: %s", err.Error())
	}

	models.UpdateTeam(team)
	responseWriter.WriteHeader(200)
}