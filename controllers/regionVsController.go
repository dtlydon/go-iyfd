package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/dtlydon/go-iyfd/models"
	"github.com/julienschmidt/httprouter"
	"fmt"
)

type regionVsController struct{
}

func (this *regionVsController) get(responseWriter http.ResponseWriter, r *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content Type", "application/json")
	regionVs := models.GetRegionVs()
	err2 := json.NewEncoder(responseWriter).Encode(regionVs)
	if(err2 != nil){
		fmt.Printf("Error get team: %s", err2.Error())
	}
	responseWriter.WriteHeader(200)
}

func (this *regionVsController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	regionVs := models.RegionVs{}
	fmt.Println("Region VS: ", request.Body)
	err := json.NewDecoder(request.Body).Decode(&regionVs)
	if(err != nil){
		fmt.Printf("Error adding team: %s", err.Error())
	}
	models.CreateRegionVs(regionVs)
	responseWriter.WriteHeader(200)
}