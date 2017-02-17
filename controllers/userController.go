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
	tokenString := util.SetToken(user)
	err2 := json.NewEncoder(responseWriter).Encode(viewUser.Username)
	if(err2 != nil){
		fmt.Println("Error getting users", err2.Error())
		responseWriter.WriteHeader(400)
		return
	}
	responseWriter.Header().Add("token", tokenString)
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
		userToStoreInCookies := viewmodels.User{}
		userToStoreInCookies.Username = user.Username
		userToStoreInCookies.Role = user.Role
		err2 := json.NewEncoder(responseWriter).Encode(userToStoreInCookies)
		if(err2 != nil){
			fmt.Println("Error getting users", err2.Error())
			responseWriter.WriteHeader(400)
			return
		}
	} else{
		responseWriter.WriteHeader(400);
	}
}

func (this *userController) get(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	tokenString := request.Header.Get("token")
	if(tokenString != "") {
		claims, _ := util.GetToken(tokenString)
		userToStoreInCookies := viewmodels.User{}
		userToStoreInCookies.Username = (claims["username"]).(string)
		userToStoreInCookies.Role = int((claims["role"]).(float64))
		err := json.NewEncoder(responseWriter).Encode(userToStoreInCookies);
		if(err != nil){
			fmt.Println("Error parsing username from token claims: ", err.Error())
		}
	}
	responseWriter.WriteHeader(200);
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
			Role: user.Role,
			HasPaid: user.HasPaid,
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

func (this *userController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	responseWriter.Header().Add("Content-Type", "application/json")
	viewUser := viewmodels.User{}
	err := json.NewDecoder(request.Body).Decode(&viewUser)
	if(err != nil){
		fmt.Println("Error updating user: ", err.Error())
	}

	//convert from VM to M
	user := models.User{
		Id: viewUser.Id,
		Username: viewUser.Username,
		Email: viewUser.Email,
		FirstName: viewUser.FirstName,
		LastName: viewUser.LastName,
		Role: viewUser.Role,
		HasPaid: viewUser.HasPaid,
	}

	if(viewUser.Password != ""){
		user.HashPassword = getHashedWord(viewUser.Password)
	} else{
		user.HashPassword = models.GetUserPassword(user.Id)
	}

	models.UpdateUser(user)

	responseWriter.WriteHeader(200);
}

func (this *userController) getUsername(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	username:= params.ByName("username")

	user := models.GetUserByUsername(username)
	if(user.Id != ""){
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