package controllers

import (
	"net/http"
	"github.com/julienschmidt/httprouter"
	"os"
	"fmt"
	"io"
	"github.com/dtlydon/go-iyfd/models"
)

type audioController struct{

}

func (this *audioController) get(responseWriter http.ResponseWriter, request *http.Request, params httprouter.Params){
	http.ServeFile(responseWriter, request, models.GetCurrentDirectory() + "/audio/bobsaudio.m4a")
	//workingDir := models.GetCurrentDirectory()
	//f, err := os.Open(workingDir + "/audio/bobsaudio.m4a")
	//if err == nil {
	//	defer f.Close()
	//	fileHeader := make([]byte, 512)
	//
	//	f.Read(fileHeader)
	//	fileContentType := http.DetectContentType(fileHeader)
	//
	//	fileStat, _ := f.Stat()
	//	fileSize := strconv.FormatInt(fileStat.Size(), 10)
	//
	//	responseWriter.Header().Set("Content-Disposition", "attachent; filename=Announcement.m4a")
	//	responseWriter.Header().Set("Content-Type", fileContentType)
	//	responseWriter.Header().Set("Content-Length", fileSize)
	//
	//	f.Seek(0, 0)
	//	io.Copy(responseWriter, f)
	//} else{
	//	fmt.Println("Error getting stupid audio: ", err.Error())
	//	responseWriter.WriteHeader(400)
	//}
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

	fullFileName := models.GetCurrentDirectory() + "/audio/bobsaudio.m4a"
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