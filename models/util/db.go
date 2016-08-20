package models

import(
	"gopkg.in/mgo.v2"
	"fmt"
	"errors"
)

type DbUtil struct{
	Session *mgo.Session
	Collection *mgo.Collection
}

func (this *DbUtil) SetSession(collectionName string){
	err := errors.New("")
	this.Session, err = mgo.Dial("localhost:27017")
	if(err != nil){
		fmt.Print("Error occurred in the DB util %s", err.Error())
		//TODO: Add error handling
	}

	this.Collection = this.Session.DB("iyfd").C(collectionName)
}

func (this *DbUtil) CloseSession(){
	this.Session.Close()
}