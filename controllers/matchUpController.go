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

const numberOfEntriesPerRegion = 16; //TODO: actually 16

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

func (this *matchUpController) generateFirstRound(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-type", "application/json")

	allMatchUps := models.GetMatchUps()
	if len(allMatchUps) > 0 {
		responseWriter.WriteHeader(400)
		return

	}

	allEntries := models.GetEntries()
	fmt.Println("allEntries: ", len(allEntries))

	//S, W, E, MW
	//TODO: These should be functions
	southEntries := [numberOfEntriesPerRegion]models.Entry{}
	westEntries := [numberOfEntriesPerRegion]models.Entry{}
	eastEntries := [numberOfEntriesPerRegion]models.Entry{}
	midWestEntries := [numberOfEntriesPerRegion]models.Entry{}
	numberOfSouthEntries := 0;
	numberOfWestEntries := 0;
	numberOfEastEntries := 0;
	numberOfMidWestEntries := 0;
	for _, entry:= range allEntries{
		if entry.Region == "s"{
			southEntries[numberOfSouthEntries] = entry
			numberOfSouthEntries++;
		}
		if entry.Region == "w"{
			westEntries[numberOfWestEntries] = entry
			numberOfWestEntries++;
		}
		if entry.Region == "e"{
			eastEntries[numberOfEastEntries] = entry
			numberOfEastEntries++;
		}
		if entry.Region == "mw"{
			midWestEntries[numberOfMidWestEntries] = entry
			numberOfMidWestEntries++;
		}
	}

	CreateMatchUpsInRegion(southEntries)
	CreateMatchUpsInRegion(westEntries)
	CreateMatchUpsInRegion(eastEntries)
	CreateMatchUpsInRegion(midWestEntries)
}

func CreateMatchUpsInRegion(regionEntries [numberOfEntriesPerRegion]models.Entry){
	//1 - 8 is position 0 - 7
	firstRoundCount := len(regionEntries) //len is 16

	for i := 0; i < firstRoundCount / 2; i++ {
		newMatchUp := models.MatchUp{
			Round: 1,
			Seed: i + 1,
			Entry1: regionEntries[i].Id, //0, 1
			Entry2: regionEntries[firstRoundCount - 1 - i].Id, //16 -1 = 15 16 -1 -1 = 14,
		}

		models.CreateMatchUp(newMatchUp)
	}
}