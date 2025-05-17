package main

import (
	"echo_gorm/db"
	"echo_gorm/handlers"
	"github.com/labstack/echo/v4"
)

func main() {
	echoInstance := echo.New()

	db.ConnectDatabase()

	echoInstance.POST("/products", handlers.CreateProduct)
	echoInstance.GET("/products", handlers.GetProducts)
	echoInstance.GET("/products/:id", handlers.GetProduct)
	echoInstance.PUT("/products/:id", handlers.UpdateProduct)
	echoInstance.DELETE("/products/:id", handlers.DeleteProduct)

	echoInstance.POST("/baskets", handlers.CreateBasket)
	echoInstance.GET("/baskets", handlers.GetBaskets)
	echoInstance.GET("/baskets/:id", handlers.GetBasket)
	echoInstance.DELETE("/baskets/:id", handlers.DeleteBasket)
	echoInstance.POST("/baskets/:id/add-product/:product_id", handlers.AddToBasket)
	echoInstance.POST("/baskets/:id/delete-product/:product_id", handlers.RemoveFromBasket)

	echoInstance.Logger.Fatal(echoInstance.Start(":8080"))
}
