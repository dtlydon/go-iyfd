package models

import (
	"gopkg.in/mgo.v2/bson"
	"github.com/dtlydon/go-iyfd/models/util"
	"fmt"
	"time"
)

type UserChoice struct{
	Id bson.ObjectId	`_id,omitempty`
	UserId bson.ObjectId
	MatchUpId bson.ObjectId
	ChoiceId bson.ObjectId	`bson:"choiceId,omitempty"`
	LastUpdated time.Time
	Round int
	Region string
}

func GetUserChoicesByUserId(userId bson.ObjectId) []UserChoice{
	fmt.Println("user id: ", userId)
	dbUtil := getUserChoiceCollection()
	defer dbUtil.CloseSession()

	userChoices := []UserChoice{}
	err := dbUtil.Collection.Find(bson.M{"userid": userId}).All(&userChoices)
	fmt.Println(userChoices)
	if(err != nil){
		fmt.Println("Error retrieving user choices for user: ", err.Error())
	}
	return userChoices
}

//Admin
func GetUserChoices() []UserChoice{
	dbUtil := getUserChoiceCollection()
	defer dbUtil.CloseSession()

	userChoices := []UserChoice{}
	dbUtil.Collection.Find(bson.M{}).All(&userChoices)
	return userChoices
}

func CreateUserChoice (userChoice UserChoice) {
	dbUtil := getUserChoiceCollection()
	defer dbUtil.CloseSession()

	err := dbUtil.Collection.Insert(&userChoice)
	if(err != nil){
		fmt.Println("Error creating user choice: ", err.Error())
	}
}

func CreateUserChoices(userChoices []UserChoice) {
	dbUtil := getUserChoiceCollection()
	defer dbUtil.CloseSession()

	err := dbUtil.Collection.Insert(&userChoices)
	if(err != nil){
		fmt.Println("Error creating user: ", err.Error())
	}
}

func UpdateUserChoice (userChoice UserChoice){
	dbUtil := getUserChoiceCollection()
	defer dbUtil.CloseSession()

	userChoice.LastUpdated = time.Now()
	err := dbUtil.Collection.UpdateId(userChoice.Id, &userChoice)
	if(err != nil){
		fmt.Println("Error updating user: ", err.Error())
	}
}

func getUserChoiceCollection() models.DbUtil{
	dbUtil := models.DbUtil{}
	dbUtil.SetSession("userchoices")
	return dbUtil
}