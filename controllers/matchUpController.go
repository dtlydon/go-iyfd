package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"github.com/dtlydon/go-iyfd/models"
	"encoding/json"
	"fmt"
	"math"
	"gopkg.in/mgo.v2/bson"
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

	if(matchUp.Winner != ""){
		CreateOrUpdateNextMatchUp(matchUp.Winner, matchUp.Seed, matchUp.Round, matchUp.Region)
	}
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
			Region: regionEntries[i].Region,
		}

		models.CreateMatchUp(newMatchUp)
	}
}

func CreateOrUpdateNextMatchUp(entryId bson.ObjectId, seed int, round int, region string){
	nextRound := round + 1;
	if(nextRound <= 4){
		exponent := float64(4 - nextRound)
		maxSeedNextRound := int(math.Exp2(exponent))
		maxSeedThisRound := maxSeedNextRound * 2
		newSeed := seed //1, 2, 3, 4 OR 1, 2 OR 1
		isHigherSeed := newSeed > maxSeedNextRound
		if(isHigherSeed){
			newSeed = maxSeedThisRound - seed + 1
		}

		currentMatchUp := models.GetMatchUpByRegionRoundAndSeed(region, nextRound, newSeed)
		if(currentMatchUp.Id == ""){
			if(isHigherSeed){
				currentMatchUp.Entry2 = entryId
			} else{
				currentMatchUp.Entry1 = entryId;
			}
			currentMatchUp.Seed = newSeed
			currentMatchUp.Round = nextRound
			currentMatchUp.Region = region

			models.CreateMatchUp(currentMatchUp);
		} else{
			if(isHigherSeed){
				currentMatchUp.Entry2 = entryId;
			} else{
				currentMatchUp.Entry1 = entryId;
			}
			models.UpdateMatchUp(currentMatchUp);
		}

	} else if(nextRound == 5){
		//TODO: Process final four
		//Get Entry Region
		//Get Regions VS
		//Get matchup with opposing region
		//If not exists Create New Matchup
		//Else Update with this entry
	} else if(nextRound == 6){
		//TODO: Process Finals
		//Get Matchup for round 6
		//If not exists Create New Matchup
		//Else Update Existing matchup with this entry
	}


}