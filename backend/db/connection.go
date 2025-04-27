package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DSN = "host= user= password= dbname= port=5432"

var DB *gorm.DB

func Connect() {
	var err error
	DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})
	if err != nil {
		panic("failed to connect database: " + err.Error())
	} else {
		println("Connected to database")
	}
}
