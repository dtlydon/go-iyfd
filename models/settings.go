package models

import (
	"github.com/dtlydon/go-iyfd/models/util"
	"gopkg.in/mgo.v2/bson"
	"fmt"
)

type Settings struct{
	SouthVs string
	IsAdminBlockOn bool
}

func GetSettings() Settings {
	dbUtil := getSettingsCollection()
	defer dbUtil.CloseSession()
	settings := Settings{}
	err := dbUtil.Collection.Find(bson.M{}).One(&settings)
	if(err != nil){
		fmt.Print("Error in Get Team ", err.Error())
	}
	return settings;
}

func UpdateSettings(settings Settings){
	dbUtil := getSettingsCollection()
	defer dbUtil.CloseSession()
	err2 := dbUtil.Collection.Remove(bson.M{})
	err := dbUtil.Collection.Insert(&settings)
	if(err != nil || err2 != nil){
		fmt.Println("Error in Add Team ", err.Error(), err2.Error())
	}
}

func getSettingsCollection() models.DbUtil {
	dbUtil := models.DbUtil{}
	dbUtil.SetSession("settings")
	return dbUtil
}