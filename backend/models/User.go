package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Username  string `grorm:"unique;not null"`
	FirstName string `grorm:"not null"`
	LastName  string `grorm:"not null"`
	Email     string `grorm:"unique;not null"`
	Password  string
	Tablero   []Tablero `gorm:"foreignKey:UserID"`
}

func (u *User) HashPassword() error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	u.Password = string(hashedPassword)
	return nil
}

func (u *User) CheckPassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(password))
}
