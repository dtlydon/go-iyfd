package models

import (
	"gopkg.in/mgo.v2/bson"
	"github.com/dtlydon/go-iyfd/models/util"
	"fmt"
)

type Entry struct{
	Id bson.ObjectId	`bson:"_id,omitempty"`
	TeamId bson.ObjectId
	Region string // NE, NW, MD, S
	Rank int //1-16
}

func GetEntries() []Entry{
	dbUtil := getEntryCollection()
	defer dbUtil.CloseSession()

	entries := []Entry{}
	dbUtil.Collection.Find(bson.M{}).Sort("rank").All(&entries)
	return entries
}

func UpdateEntry(entry Entry){
	dbUtil := getEntryCollection()
	defer dbUtil.CloseSession()

	err := dbUtil.Collection.UpdateId(entry.Id, entry)
	if(err != nil){
		fmt.Println("Error updating entry: ", err.Error())
	}
}

func CreateEntry(entry Entry){
	dbUtil := getEntryCollection()
	defer dbUtil.CloseSession()

	err := dbUtil.Collection.Insert(entry)
	if(err != nil){
		fmt.Println("error creating entry: ", err.Error())
	}
}

func getEntryCollection() models.DbUtil {
	dbUtil := models.DbUtil{}
	dbUtil.SetSession("entries")
	return dbUtil
}