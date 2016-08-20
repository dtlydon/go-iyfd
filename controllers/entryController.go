package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"encoding/json"
	"github.com/dtlydon/go-iyfd/models"
	"fmt"
)

type entryController struct{

}

func (this *entryController) query(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-Type", "application/json")
	entries := models.GetEntries()
	err := json.NewEncoder(responseWriter).Encode(entries)
	if(err != nil){
		fmt.Println("error getting entries: ", err.Error())
		responseWriter.WriteHeader(400)
	}
	responseWriter.WriteHeader(200)
}

func (this *entryController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-type", "application/json")
	entry := models.Entry{}
	err := json.NewDecoder(request.Body).Decode(&entry)
	if(err != nil){
		fmt.Println("Error decoding entry: ", err.Error())
		responseWriter.WriteHeader(400)
	}

	models.CreateEntry(entry)
	responseWriter.WriteHeader(200)
}

func (this *entryController) patch(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-type", "application/json")
	entry := models.Entry{}
	err := json.NewDecoder(request.Body).Decode(&entry)
	if(err != nil){
		fmt.Println("Error decoding entry: ", err.Error())
		responseWriter.WriteHeader(400)
	}

	models.UpdateEntry(entry)
	responseWriter.WriteHeader(200)
}