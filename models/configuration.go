package models

import (
	"os"
	"fmt"
)

func GetCurrentDirectory() string{
	return "/home/ubuntu/go/src/github.com/dtlydon/go-iyfd";
	//workingDir, err := os.Getwd()
	//if err != nil{
	//	fmt.Println("Error attempting to get WD: ", err.Error())
	//	return ""
	//}
	//return workingDir
}
