package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/dtlydon/go-iyfd/models"
	"github.com/julienschmidt/httprouter"
	"fmt"
)

type settingsController struct{
}

func (this *settingsController) get(responseWriter http.ResponseWriter, r *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content Type", "application/json")
	settings := models.GetSettings()
	err2 := json.NewEncoder(responseWriter).Encode(settings)
	if(err2 != nil){
		fmt.Printf("Error get team: %s", err2.Error())
	}
	responseWriter.WriteHeader(200)
}

func (this *settingsController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	settings := models.Settings{}
	err := json.NewDecoder(request.Body).Decode(&settings)
	if(err != nil){
		fmt.Printf("Error adding team: %s", err.Error())
	}
	models.UpdateSettings(settings)
	responseWriter.WriteHeader(200)
}