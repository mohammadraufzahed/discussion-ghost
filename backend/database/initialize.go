package database

import (
	"github.com/mohammadraufzahed/discussion-ghost/models"
	"gorm.io/gorm"
)

func InitializeModels(db *gorm.DB) {
	db.AutoMigrate(&models.Comment{})
}
