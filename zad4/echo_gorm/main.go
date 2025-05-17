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

	echoInstance.Logger.Fatal(echoInstance.Start(":8080"))
}
