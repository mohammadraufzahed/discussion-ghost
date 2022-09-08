package database

import (
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var Db *gorm.DB

func CreateDatabase() (*gorm.DB, error) {
	dsn := "goback:goback@tcp(database:3306)/goback?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	Db = db
	return db, err
}
