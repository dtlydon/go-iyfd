package util

import (
	"github.com/dgrijalva/jwt-go"
	"fmt"
	"time"
	"github.com/dtlydon/go-iyfd/models"
)

const mySecret = "SugarIsSweet"

func GetToken(tokenString string) (jwt.MapClaims, bool) {
	token, _ := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(mySecret), nil
	})

	claims, ok := token.Claims.(jwt.MapClaims)
	return claims, (ok && token.Valid)
}

func SetToken(user models.User) string{
	// Create a new token object, specifying signing method and the claims
	// you would like it to contain.
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id": user.Id,
		"role": user.Role,
		"username": user.Username,
		"nbf": time.Date(2015, 10, 10, 12, 0, 0, 0, time.UTC).Unix(),
	})

	// Sign and get the complete encoded token as a string using the secret
	tokenString, err := token.SignedString([]byte(mySecret))
	if(err != nil){
		fmt.Println("Error getting token string: ", err.Error())
	}
	return tokenString
}