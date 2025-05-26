package handlers

import (
	"echo_gorm/db"
	"echo_gorm/models"
	"github.com/labstack/echo/v4"
	"net/http"
)

const basketNotFoundErrorMessage = "Basket not found"

func basketNotFoundResponse(c echo.Context) error {
	return c.JSON(http.StatusNotFound, echo.Map{"error": basketNotFoundErrorMessage})
}

func CreateBasket(c echo.Context) error {
	var basket models.Basket
	if err := c.Bind(&basket); err != nil {
		return c.JSON(http.StatusBadRequest, err)
	}

	if err := db.DB.Create(&basket).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return c.JSON(http.StatusCreated, basket)
}

func GetBaskets(c echo.Context) error {
	var baskets []models.Basket
	db.DB.Preload("Products").Find(&baskets)
	return c.JSON(http.StatusOK, baskets)
}

func GetBasket(c echo.Context) error {
	id := c.Param("id")
	var basket models.Basket

	if err := db.DB.Preload("Products").First(&basket, id).Error; err != nil {
		return basketNotFoundResponse(c)
	}

	return c.JSON(http.StatusOK, basket)
}

func DeleteBasket(c echo.Context) error {
	id := c.Param("id")
	var basket models.Basket

	if err := db.DB.First(&basket, id).Error; err != nil {
		return basketNotFoundResponse(c)
	}

	if err := db.DB.Delete(&basket).Error; err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.NoContent(http.StatusNoContent)
}

func AddToBasket(c echo.Context) error {
	basketID := c.Param("id")
	var basket models.Basket

	if err := db.DB.First(&basket, basketID).Error; err != nil {
		return basketNotFoundResponse(c)
	}

	productID := c.Param("product_id")
	var product models.Product

	if err := db.DB.First(&product, productID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Product not found"})
	}

	if err := db.DB.Model(&basket).Association("Products").Append(&product); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Could not add product to basket"})
	}

	return c.JSON(http.StatusOK, basket)
}

func RemoveFromBasket(c echo.Context) error {
	basketID := c.Param("id")
	var basket models.Basket

	if err := db.DB.First(&basket, basketID).Error; err != nil {
		return basketNotFoundResponse(c)
	}

	productID := c.Param("product_id")
	var product models.Product

	if err := db.DB.First(&product, productID).Error; err != nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Product not found"})
	}

	if err := db.DB.Model(&basket).Association("Products").Delete(&product); err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.NoContent(http.StatusNoContent)
}
