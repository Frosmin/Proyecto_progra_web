package db

import (
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DSN = "host=dpg-d0mjb5u3jp1c738db5hg-a.oregon-postgres.render.com user=simon password=OlCsMOu1LJ7bfwspCRADrtsUwszacxJg dbname=web_as25 port=5432"

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

// @dpg-d0mjb5u3jp1c738db5hg-a.oregon-postgres.render.com/web_as25
