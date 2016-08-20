package models

import (
	"github.com/dtlydon/go-iyfd/models/util"
	"gopkg.in/mgo.v2/bson"
	"fmt"
)

type Team struct{
	Id bson.ObjectId	`bson:"_id,omitempty"`
	Name string
	Acronym string
}

func GetTeams() []Team {
	dbUtil := getTeamCollection()
	defer dbUtil.CloseSession()

	teams := []Team{}
	err := dbUtil.Collection.Find(bson.M{}).All(&teams)
	if(err != nil){
		fmt.Print("Error in Get Teams %s", err.Error())
	}
	return teams;
}

func GetTeam(id bson.ObjectId) Team {
	dbUtil := getTeamCollection()
	defer dbUtil.CloseSession()
	team := Team{}
	err := dbUtil.Collection.Find(bson.M{"id": id}).One(&team)
	if(err != nil){
		fmt.Print("Error in Get Team ", err.Error())
	}
	return team;
}

func CreateTeam(team Team){
	if(string(team.Id) != ""){
		UpdateTeam(team)
		return
	}
	dbUtil := getTeamCollection()
	defer dbUtil.CloseSession()
	err := dbUtil.Collection.Insert(&team)
	if(err != nil){
		fmt.Println("Error in Add Team ", err.Error())
	}
}

func UpdateTeam(updatedTeam Team){
	dbUtil := getTeamCollection()
	team := GetTeam(updatedTeam.Id)
	defer dbUtil.CloseSession()
	err := dbUtil.Collection.Update(&team, &updatedTeam)
	if(err != nil){
		fmt.Print("Error in Update Team %s", err.Error())
	}
}

func getTeamCollection() models.DbUtil {
	dbUtil := models.DbUtil{}
	dbUtil.SetSession("teams")
	return dbUtil
}