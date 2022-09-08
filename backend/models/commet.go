package models

import (
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model
	Name    string     `gorm:"name"`
	Profile string     `gorm:"profile"`
	Content string     `gorm:"content"`
	Replays []*Comment `gorm:"many2many:replays"`
}
