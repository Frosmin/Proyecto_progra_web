package models

type Position struct {
	ID        uint   `gorm:"primaryKey" json:"ID"`
	Type      string `gorm:"not null" json:"Type"`
	PosX      int    `gorm:"not null" json:"PosX"`
	PosY      int    `gorm:"not null" json:"PosY"`
	TableroID uint   `json:"TableroID"`
}
type Tablero struct {
	ID          uint       `gorm:"primaryKey" json:"ID"`
	Title       string     `gorm:"unique;not null" json:"Title"`
	Description string     `gorm:"unique;not null" json:"Description"`
	Positions   []Position `gorm:"foreignKey:TableroID" json:"Positions"`
	Size        int        `gorm:"not null" json:"Size"`
	UserID      uint       `json:"UserID"`
}
