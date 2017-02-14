package viewmodels

import "gopkg.in/mgo.v2/bson"

type User struct{
	Id bson.ObjectId
	Username string
	Email string
	FirstName string
	LastName string
	Password string //For login/register purposes
	Role int
}
