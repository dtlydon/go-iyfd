package models

import "gopkg.in/mgo.v2/bson"

type Scores struct{
	Username string
	Score int
}

func GetScores()[]Scores{
	users := GetUsers()
	userChoices := GetUserChoices()
	matchUps := GetMatchUps()

	scores := make([]Scores, len(users))

	for i, user := range users{
		scores[i].Username = user.Username
		scores[i].Score = GetUserScore(user.Id, userChoices, matchUps)
	}
	return scores;
}

func GetUserScore(userId bson.ObjectId, userChoices []UserChoice, matchUps []MatchUp) int{
	score:=0
	for _, userChoice := range userChoices{
		if userChoice.UserId == userId{
			for _, matchUp := range matchUps{
				if matchUp.Winner != "" && matchUp.Id == userChoice.MatchUpId && matchUp.Winner == userChoice.ChoiceId{
					score += matchUp.Round
				}
			}
		}
	}
	return score;
}