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
	Winner bson.ObjectId
	Round int
	Region string
	EntryRank1 int
	EntryRank2 int
}

func GetUserChoicesViewsByUserId(userId bson.ObjectId) []UserChoiceView{
	userChoices := GetUserChoicesByUserId(userId)
	matchUps := GetMatchUps()
	if(len(userChoices) != len(matchUps)){
		userChoices = BuildAndCreateUserChoices(userId, matchUps, userChoices)
	}
	entries := GetEntries()
	teams := GetTeams()

	userChoiceViews := make([]UserChoiceView, len(userChoices))

	for i, userChoice:= range userChoices{
		userChoiceViews[i].ChoiceId = userChoice.ChoiceId
		userChoiceViews[i].MatchUpId = userChoice.MatchUpId
		userChoiceViews[i].Round = userChoice.Round
		userChoiceViews[i].Region = userChoice.Region
		userChoiceViews[i].UserId = userChoice.UserId
		userChoiceViews[i].Id = userChoice.Id
		userChoiceViews[i].Entry1Id, userChoiceViews[i].Entry2Id, userChoiceViews[i].Winner = GetEntryIdsFromMatchUp(userChoice.MatchUpId, matchUps)
		userChoiceViews[i].Entry1Name, userChoiceViews[i].Entry2Name, userChoiceViews[i].EntryRank1, userChoiceViews[i].EntryRank2 = GetEntryNames(userChoiceViews[i].Entry1Id, userChoiceViews[i].Entry2Id, entries, teams)
	}

	return userChoiceViews
}

func GetEntryIdsFromMatchUp(matchUpId bson.ObjectId, matchUps []MatchUp) (bson.ObjectId, bson.ObjectId, bson.ObjectId) {
	for _, matchUp := range matchUps{
		if matchUp.Id == matchUpId{
			return matchUp.Entry1, matchUp.Entry2, matchUp.Winner
		}

	}
	return "", "", ""
}

func GetEntryNames(entry1Id bson.ObjectId, entry2Id bson.ObjectId, entries []Entry, teams []Team) (string, string, int, int){
	entry1Name := ""
	entry2Name := ""
	entry1Rank := 0
	entry2Rank := 0
	for _, entry := range entries{
		if entry.Id == entry1Id{
			entry1Name = GetTeamName(entry.TeamId, teams)
			entry1Rank = entry.Rank
		}
		if entry.Id == entry2Id{
			entry2Name = GetTeamName(entry.TeamId, teams)
			entry2Rank = entry.Rank
		}

		if(entry1Name != "" && entry2Name != ""){
			return entry1Name, entry2Name, entry1Rank, entry2Rank
		}
	}
	return "", "", 0, 0
}

func GetTeamName(teamId bson.ObjectId, teams []Team) string{
	for _, team := range teams{
		if(team.Id == teamId){
			return team.Name
		}
	}
	return ""
}

func BuildAndCreateUserChoices(userId bson.ObjectId, matchUps []MatchUp, userChoices []UserChoice) []UserChoice{
	newUserChoices := make([]UserChoice, len(matchUps))
	for i, matchUp := range matchUps{
		existingChoice := GetUserChoiceByMatchUpId(userChoices, matchUp.Id)
		if(existingChoice.Id == ""){
			existingChoice.Id = bson.NewObjectId()
			existingChoice.UserId = userId
			existingChoice.MatchUpId = matchUp.Id
			existingChoice.Region = matchUp.Region
			existingChoice.Round = matchUp.Round
			CreateUserChoice(existingChoice)
		}

		newUserChoices[i] = existingChoice
	}
	return newUserChoices
}

func GetUserChoiceByMatchUpId(userChoices []UserChoice, matchUpId bson.ObjectId) UserChoice{
	userChoice:=UserChoice{}
	for _, existingUserChoice := range userChoices{
		if existingUserChoice.MatchUpId == matchUpId{
			return existingUserChoice
		}
	}
	return userChoice
}