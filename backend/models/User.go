package models

import "gorm.io/gorm"

type User struct {
	gorm.Model

	Username  string `grorm:"unique;not null"`
	FirstName string `grorm:"not null"`
	LastName  string `grorm:"not null"`
	Email     string `grorm:"unique;not null"`
	Password  string
	Tablero   []Tablero `gorm:"foreignKey:UserID"`
}
