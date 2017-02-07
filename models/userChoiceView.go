package models

import (
	"gopkg.in/mgo.v2/bson"
)

type UserChoiceView struct{
	Id bson.ObjectId	`_id,omitempty`
	UserId bson.ObjectId
	MatchUpId bson.ObjectId
	Entry1Id bson.ObjectId
	Entry2Id bson.ObjectId
	Entry1Name string
	Entry2Name string
	ChoiceId bson.ObjectId
}

func GetUserChoicesViewsByUserId(userId string) []UserChoiceView{
	userChoices := GetUserChoicesByUserId(userId)
	entries := GetEntries()
	matchUps := GetMatchUps()
	teams := GetTeams()

	userChoiceViews := [len(userChoices)]UserChoiceView{}

	for i, userChoice:= range userChoices{
		userChoiceViews[i].ChoiceId = userChoice.ChoiceId
		userChoiceViews[i].MatchUpId = userChoice.MatchUpId
		userChoiceViews[i].UserId = userChoice.UserId
		userChoiceViews[i].Id = userChoice.Id
		userChoiceViews[i].Entry1Id, userChoiceViews[i].Entry2Id = GetEntryIdsFromMatchUp(userChoice.MatchUpId, matchUps)
		userChoiceViews[i].Entry1Name, userChoiceViews[i].Entry2Name = GetEntryNames(userChoiceViews[i].Entry1Id, userChoiceViews[i].Entry2Id, entries, teams)
	}
}

func GetEntryIdsFromMatchUp(matchUpId bson.ObjectId, matchUps []MatchUp) (bson.ObjectId, bson.ObjectId) {
	for _, matchUp := range matchUps{
		if matchUp.Id == matchUpId{
			return matchUp.Entry1, matchUp.Entry2
		}

	}
}

func GetEntryNames(entry1Id bson.ObjectId, entry2Id bson.ObjectId, entries []Entry, teams []Team) (string, string){
	entry1Name := ""
	entry2Name := ""
	for _, entry := range entries{
		if entry.Id == entry1Id{
			entry1Name = GetTeamName(entry.TeamId, teams)
		}
		if entry.Id == entry2Id{
			entry2Name = GetTeamName(entry.TeamId, teams)
		}

		if(entry1Name != "" && entry2Name != ""){
			return entry1Name, entry2Name
		}
	}
}

func GetTeamName(teamId bson.ObjectId, teams []Team) string{
	for _, team := range teams{
		if(team.Id == teamId){
			return team.Name
		}
	}
}