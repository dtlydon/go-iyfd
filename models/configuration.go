package models

import (
	"os"
	"fmt"
)

func GetCurrentDirectory() string {
	// return "/home/ec2-user/projects/src/github.com/dtlydon/go-iyfd"
	workingDir, err := os.Getwd()
	if err != nil{
		fmt.Println("Error attempting to get WD: ", err.Error())
		return ""
	}
	return workingDir
}
