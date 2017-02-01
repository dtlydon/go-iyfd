package models

import (
	"gopkg.in/mgo.v2/bson"
	"github.com/dtlydon/go-iyfd/models/util"
	"fmt"
)

type MatchUp struct{
	Id bson.ObjectId	`bson:"_id,omitempty"`
	Entry1 bson.ObjectId
	Entry2 bson.ObjectId
	Winner bson.ObjectId	`bson:"winner,omitempty"`
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