package db

import (
	"echo_gorm/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	db, err := gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to database")
	}

	DB = db

	errMigrate := db.AutoMigrate(&models.Product{})
	if errMigrate != nil {
		return
	}
}
