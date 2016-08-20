package controllers

import (
	"github.com/dtlydon/go-iyfd/models"
	"github.com/dtlydon/go-iyfd/viewmodels"
	"golang.org/x/crypto/bcrypt"
	"fmt"
	"net/http"
	"github.com/julienschmidt/httprouter"
	"encoding/json"
	"gopkg.in/mgo.v2/bson"
	"github.com/dtlydon/go-iyfd/controllers/util"
)

type userController struct{

}

func (this *userController) register(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	viewUser := viewmodels.User{}
	err := json.NewDecoder(request.Body).Decode(&viewUser)
	if(err != nil){
		fmt.Println("Error registering user: %s", err.Error())
	}

	//convert from VM to M
	user := models.User{
		Id: bson.NewObjectId(),
		Username: viewUser.Username,
		HashPassword: getHashedWord(viewUser.Password),
		Email: viewUser.Email,
		FirstName: viewUser.FirstName,
		LastName: viewUser.LastName,
		Role: int(models.BasicUser), //Default role will be 0
	}

	fmt.Println("Basic User Role is : ", models.BasicUser)

	models.CreateUser(user)
}

func (this *userController) login(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
	viewUser := viewmodels.User{}
	err := json.NewDecoder(request.Body).Decode(&viewUser)
	if(err != nil){
		fmt.Println("Error registering user: %s", err.Error())
	}

	user := models.GetUserByUsername(viewUser.Username)
	hashedPassword := []byte(user.HashPassword)
	err = bcrypt.CompareHashAndPassword(hashedPassword, []byte(viewUser.Password))
	if(err == nil) {
		tokenString := util.SetToken(user)
		responseWriter.Header().Add("token", tokenString)
	} else{
		responseWriter.Write([]byte("Invalid username and password"))
		http.Error(responseWriter, http.StatusText(http.StatusBadRequest), http.StatusBadRequest)
	}
}

func (this *userController) query(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-Type", "application/json")
	users := models.GetUsers()

	viewUsers := make([]viewmodels.User, len(users))

	for i, user := range users {
		viewUser := viewmodels.User{
			Id: user.Id,
			FirstName: user.FirstName,
			LastName: user.LastName,
			Email: user.Email,
			Username: user.Username,
		}
		viewUsers[i] = viewUser
	}
	err := json.NewEncoder(responseWriter).Encode(viewUsers)
	if(err != nil){
		fmt.Println("Error getting users", err.Error())
		responseWriter.WriteHeader(400)
		return
	}

	responseWriter.WriteHeader(200)
}

func getHashedWord(word string) string{
	wordInBytes := []byte(word)
	hashedWord, err := bcrypt.GenerateFromPassword(wordInBytes, bcrypt.DefaultCost)
	if(err != nil){
		fmt.Println("Error hashing word %s", err.Error())
	}
	return string(hashedWord)
}