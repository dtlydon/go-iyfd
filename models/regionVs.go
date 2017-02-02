package models

import (
	"github.com/dtlydon/go-iyfd/models/util"
	"gopkg.in/mgo.v2/bson"
	"fmt"
)

type RegionVs struct{
	SouthVs string
}

func GetRegionVs() RegionVs {
	dbUtil := getRegionVsCollection()
	defer dbUtil.CloseSession()
	regionVs := RegionVs{}
	err := dbUtil.Collection.Find(bson.M{}).One(&regionVs)
	if(err != nil){
		fmt.Print("Error in Get Team ", err.Error())
	}
	return regionVs;
}

func CreateRegionVs(regionVs RegionVs){
	dbUtil := getRegionVsCollection()
	defer dbUtil.CloseSession()
	err2 := dbUtil.Collection.Remove(bson.M{})
	err := dbUtil.Collection.Insert(&regionVs)
	if(err != nil || err2 != nil){
		fmt.Println("Error in Add Team ", err.Error(), err2.Error())
	}
}

func getRegionVsCollection() models.DbUtil {
	dbUtil := models.DbUtil{}
	dbUtil.SetSession("regionVs")
	return dbUtil
}