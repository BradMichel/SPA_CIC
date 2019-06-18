package services

import (
	"log"

	st "../settings"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jinzhu/gorm"
	//"github.com/jmoiron/sqlx"
)

func Conect() (db *gorm.DB) {
	db, err := gorm.Open(st.TypeDb, st.UrlDb)
	if err != nil {
		log.Println(err)
	}

	return
}
