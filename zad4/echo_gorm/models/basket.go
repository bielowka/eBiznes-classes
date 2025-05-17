package models

import "gorm.io/gorm"

type Basket struct {
	gorm.Model
	User     string
	Products []Product `gorm:"many2many:basket_products;"`
}
