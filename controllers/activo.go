package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	s "../services"
)

func GetActivo(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	params := getParams(r)

	var response interface{}

	if params["id"] == nil {

		activos := s.Activos{}
		activos.Get()
		response = activos
	} else {

		id := getInt(params["id"])
		activo := s.Activo{
			Codigo: id,
		}
		activo.Get()
		response = activo
	}

	responseJson(w, response, http.StatusOK)
}

func PostActivo(w http.ResponseWriter, r *http.Request) {

	enableCors(&w)

	decoder := json.NewDecoder(r.Body)

	var activo s.Activo
	err := decoder.Decode(&activo)

	if err != nil {
		panic(err)
	}
	responseStatus, err := activo.Post()
	log.Println(activo)
	responseJson(w, activo, responseStatus)
}
