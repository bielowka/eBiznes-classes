package handlers

import (
	"echo_gorm/db"
	"echo_gorm/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

const productNotFoundErrorMessage = "Product not found"

func CreateProduct(c echo.Context) error {
	var product models.Product
	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	db.DB.Create(&product)
	return c.JSON(http.StatusCreated, product)
}

func GetProducts(c echo.Context) error {
	var products []models.Product
	db.DB.Find(&products)
	return c.JSON(http.StatusOK, products)
}

func GetProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := db.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": productNotFoundErrorMessage})
	}

	return c.JSON(http.StatusOK, product)
}

func UpdateProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := db.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": productNotFoundErrorMessage})
	}

	if err := c.Bind(&product); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	db.DB.Save(&product)
	return c.JSON(http.StatusOK, product)
}

func DeleteProduct(c echo.Context) error {
	id := c.Param("id")
	var product models.Product

	if err := db.DB.First(&product, id).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": productNotFoundErrorMessage})
	}

	db.DB.Delete(&product)
	return c.NoContent(http.StatusNoContent)
}
