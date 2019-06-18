package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"github.com/gorilla/context"
)

func responseJson(w http.ResponseWriter, data interface{}, responseStatus int) {
	response, _ := json.Marshal(data)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(responseStatus)
	w.Write(response)
}

func getParams(r *http.Request) map[string]interface{} {

	return context.Get(r, "params").(map[string]interface{})

}

func getFloat64(variable interface{}) (number float64) {
	String := variable.(string)
	number, err := strconv.ParseFloat(String, 64)
	log.Println("err: ", err)
	return
}

func getInt(variable interface{}) (number int) {
	String := variable.(string)
	numberTemp, err := strconv.ParseInt(String, 10, 64)

	number = int(numberTemp)
	log.Println("err: ", err)
	return
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
