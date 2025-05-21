 package main

 import (
 	"encoding/json"
 	"fmt"
 	"log"
 	"net/http"
 )

type Product struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Price float64 `json:"price"`
}

type Payment struct {
	Products []Product `json:"products"`
	Total    float64   `json:"total"`
}

 func main() {
 	http.HandleFunc("/products", handleProducts)
 	http.HandleFunc("/payments", handlePayments)

 	fmt.Println("Server running on http://localhost:8080")
 	log.Fatal(http.ListenAndServe(":8080", nil))
 }

 func handleProducts(w http.ResponseWriter, r *http.Request) {
 	products := []Product{
 		{ID: 1, Name: "Laptop", Price: 999.99},
 		{ID: 2, Name: "Mouse", Price: 49.99},
 		{ID: 3, Name: "Keyboard", Price: 79.99},
 	}

 	w.Header().Set("Content-Type", "application/json")
 	json.NewEncoder(w).Encode(products)
 }

func handlePayments(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "Only POST allowed", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	var payment Payment
	err := json.NewDecoder(r.Body).Decode(&payment)
	if err != nil {
		http.Error(w, "Invalid data", http.StatusBadRequest)
		return
	}

	fmt.Printf("Received payment for %d items. Total: $%.2f\n", len(payment.Products), payment.Total)
	w.WriteHeader(http.StatusOK)
}
