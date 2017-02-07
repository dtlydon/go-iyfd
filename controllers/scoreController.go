package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/dtlydon/go-iyfd/models"
	"encoding/json"
	"fmt"
)

type scoreController struct{

}

func (this *scoreController) query(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-type", "application/json")

	scores := models.GetScores()
	err := json.NewEncoder(responseWriter).Encode(&scores)
	if(err != nil){
		fmt.Println("Error getting matchups: ", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	responseWriter.WriteHeader(200)
}