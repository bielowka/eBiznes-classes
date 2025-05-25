package main

import (
	"echo_gorm/db"
	"echo_gorm/handlers"
	"github.com/labstack/echo/v4"
)

func main() {
	echoInstance := echo.New()

	db.ConnectDatabase()

	const (
		productPath       = "/products"
		productIDPath     = "/products/:id"
		basketPath        = "/baskets"
		basketIDPath      = "/baskets/:id"
		addProductPath    = "/baskets/:id/add-product/:product_id"
		removeProductPath = "/baskets/:id/delete-product/:product_id"
	)

	echoInstance.POST(productPath, handlers.CreateProduct)
	echoInstance.GET(productPath, handlers.GetProducts)
	echoInstance.GET(productIDPath, handlers.GetProduct)
	echoInstance.PUT(productIDPath, handlers.UpdateProduct)
	echoInstance.DELETE(productIDPath, handlers.DeleteProduct)

	echoInstance.POST(basketPath, handlers.CreateBasket)
	echoInstance.GET(basketPath, handlers.GetBaskets)
	echoInstance.GET(basketIDPath, handlers.GetBasket)
	echoInstance.DELETE(basketIDPath, handlers.DeleteBasket)
	echoInstance.POST(addProductPath, handlers.AddToBasket)
	echoInstance.POST(removeProductPath, handlers.RemoveFromBasket)

	echoInstance.Logger.Fatal(echoInstance.Start(":8080"))
}
