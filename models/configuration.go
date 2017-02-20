package models

import (
	"os"
	"fmt"
)

func GetCurrentDirectory() string{
	workingDir, err := os.Getwd()
	if err != nil{
		fmt.Println("Error attempting to get WD: ", err.Error())
		return ""
	}
	return workingDir
}
