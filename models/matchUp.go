package models

import (
	"gopkg.in/mgo.v2/bson"
	"github.com/dtlydon/go-iyfd/models/util"
	"fmt"
)

type MatchUp struct{
	Id bson.ObjectId	`bson:"_id,omitempty"`
	Entry1 bson.ObjectId	`bson:"entry1,omitempty"`
	Entry2 bson.ObjectId	`bson:"entry2,omitempty"`
	Winner bson.ObjectId	`bson:"winner,omitempty"`
	Region string
	Seed int
	Round int
}

func GetMatchUps() []MatchUp{
	dbUtil := getMatchUpCollection()
	defer dbUtil.CloseSession()

	matchUps := []MatchUp{}
	dbUtil.Collection.Find(bson.M{}).All(&matchUps)
	return matchUps
}

func GetMatchUpByRegionRoundAndSeed(region string, round int, seed int) MatchUp{
	dbUtil := getMatchUpCollection()
	defer dbUtil.CloseSession()

	matchUp := MatchUp{}
	dbUtil.Collection.Find(bson.M{"region": region, "round":round, "seed": seed}).One(&matchUp)
	return matchUp
}

func CreateMatchUp(matchUp MatchUp){
	dbUtil := getMatchUpCollection()
	defer dbUtil.CloseSession()

	err := dbUtil.Collection.Insert(&matchUp)
	if(err != nil){
		fmt.Println("Error creating matchup: ", err.Error())
	}
}

func UpdateMatchUp(matchUp MatchUp){
	dbUtil := getMatchUpCollection()
	defer dbUtil.CloseSession()

	dbUtil.Collection.UpdateId(matchUp.Id, &matchUp)
}

func getMatchUpCollection() models.DbUtil{
	dbUtil := models.DbUtil{}
	dbUtil.SetSession("matchups")
	return dbUtil
}