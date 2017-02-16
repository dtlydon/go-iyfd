package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"os"
	"bufio"
	"fmt"
	"io"
)

type audioController struct{

}

func (this *audioController) get(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	f, err := os.Open("audio/bobsaudio.m4a")
	if err == nil {
		defer f.Close()
		responseWriter.Header().Add("Content-Type", "audio/m4a")

		br := bufio.NewReader(f)
		br.WriteTo(responseWriter)
	} else{
		fmt.Println("Error getting stupid audio: ", err.Error())
		responseWriter.WriteHeader(400)
	}
}

func (this *audioController) post(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params) {
	//For memory sake...
	request.ParseMultipartForm(32 << 20)

	file, _, err := request.FormFile("announcement")
	if err != nil{
		fmt.Println("Error parsing the audio file: ", err.Error())
		responseWriter.WriteHeader(400)
	}
	defer file.Close()

	fullFileName := "audio/bobsaudio.m4a"
	_ , err = os.Stat(fullFileName)
	if err != nil && !os.IsNotExist(err) {
		if os.IsExist(err) {
			fmt.Println("Should get here...")
			os.Remove(fullFileName)
		} else{

			fmt.Println("Error checking on file: ", err.Error())
			responseWriter.WriteHeader(400)
		}
	}

	newFile, err := os.Create(fullFileName)
	if err != nil && !os.IsNotExist(err) {
		fmt.Println("Error creating new file: ", err.Error())
		responseWriter.WriteHeader(400)
	}
	defer newFile.Close()

	//fmt.Println("File 1: ", file.)
	_, err = io.Copy(newFile, file)

	if err != nil {
		fmt.Println("Error copying file to new file: ", err.Error())
		responseWriter.WriteHeader(400)
	}
	responseWriter.WriteHeader(200)
}