package services

import (
	"log"
	"net/http"

	_ "github.com/go-sql-driver/mysql"
)

func (activo *Activo) Post() (responseStatus int, err error) {

	db := Conect()

	defer db.Close()

	if !db.NewRecord(activo) {
		responseStatus = http.StatusBadRequest
		return
	}

	db.Create(activo)

	if db.NewRecord(activo) {
		responseStatus = http.StatusBadRequest
		return
	}

	responseStatus = http.StatusOK
	return

}

func (activo *Activo) Get() (responseStatus int, err error) {

	db := Conect()
	defer db.Close()
	log.Println("codigo =", activo.Codigo)
	db.Where("codigo = ?", activo.Codigo).First(&activo)
	responseStatus = http.StatusOK
	return
}

func (activos *Activos) Get() (responseStatus int, err error) {

	db := Conect()
	defer db.Close()

	err = db.Order("id DESC").Find(&activos).Error

	if err != nil {
		log.Println(err.Error())
	}

	return
}
