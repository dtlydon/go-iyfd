package controllers

import (
	"net/http"
	"encoding/json"
	"github.com/dtlydon/go-iyfd/repositories"
)

type teamController struct{
	teamRepo repositories.TeamRepository
}

func (this *teamController) get(responseWriter http.ResponseWriter, request *http.Request){
	data := this.teamRepo.GetAll()
	responseWriter.Header().Add("Content Type", "application/json")
	err := json.NewEncoder(responseWriter).Encode(data)
	if(err != nil){
		//TODO: Right panic function
	}
}