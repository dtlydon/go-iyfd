package models

import (
	"github.com/dtlydon/go-iyfd/models/util"
	"gopkg.in/mgo.v2/bson"
	"fmt"
)

const MySecret = "$ugar1sSw33t!"

type Role int

const(
	BasicUser Role = iota
	Bob
	AdminUser
	SuperUser
)


type User struct{
	Id bson.ObjectId	`bson:"_id,omitempty"`
	Role int
	Username string
	HashPassword string
	FirstName string
	LastName string
	Email string
	HasPaid bool
}

func CreateUser(user User){
	dbUtil := getUserCollection()
	defer dbUtil.Session.Close()

	fmt.Println("User about to be inserted %s", user)
	dbUtil.Collection.Insert(&user)
}

func GetUsers() []User{
	dbUtil := getUserCollection()
	defer dbUtil.Session.Close()

	users := []User{}
	dbUtil.Collection.Find(bson.M{}).All(&users)
	return users
}

func GetUserByUsername(username string) User{
	dbUtil := getUserCollection()
	defer dbUtil.Session.Close()

	user := User{}
	dbUtil.Collection.Find(bson.M{"username": username}).One(&user)
	return user
}

func UpdateUser(user User){
	dbUtil := getUserCollection()
	defer dbUtil.Session.Close()

	dbUtil.Collection.UpdateId(user.Id, &user)
}

func GetUserPassword(userId bson.ObjectId) string{
	dbUtil := getUserCollection()
	defer dbUtil.Session.Close()
	user := User{}
	dbUtil.Collection.FindId(userId).One(&user)
	return user.HashPassword
}

func getUserCollection() models.DbUtil{
	dbUtil := models.DbUtil{}
	dbUtil.SetSession("users")
	return dbUtil
}