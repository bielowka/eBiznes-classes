describe("React App UI Tests", () => {
    beforeEach(() => {
        cy.intercept("GET", "http://localhost:8080/products", {
            fixture: "products.json"
        }).as("getProducts");

        cy.intercept("POST", "http://localhost:8080/payments", {
            statusCode: 200,
            body: { success: true }
        }).as("postPayment");

        cy.visit("http://localhost:5173/");
        cy.wait("@getProducts");
    });

    it("1. Displays product list", () => {
        cy.get("h2").should("contain", "Products");

        cy.fixture("products").then((products) => {
            products.forEach((product) => {
                cy.contains(product.name).should("exist");
            });
        });
        cy.get("button").filter(":contains('Add to Basket')").should("exist");
        cy.get("button").filter(":contains('Add to Basket')").should("have.length", 3);
    });

    it("2. Adds a product to basket", () => {
        cy.contains("Add to Basket").first().click();
        cy.contains("Basket").click();
        cy.get("li").should("have.length", 1);
        cy.fixture("products").then((products) => {
            cy.contains(products[0].name).should("exist");
            cy.get("p").contains(`Total: $${products[0].price.toFixed(2)}`).should("exist");
        });
        cy.get("button").contains("Remove").should("exist");
        cy.get("button").contains("Remove").should("have.length", 1);
    });

    it("3. Calculates total in basket", () => {
        cy.contains("Add to Basket").first().click();
        cy.contains("Basket").click();
        cy.get("p").contains("Total: $").should("exist");
        cy.fixture("products").then((products) => {
            cy.get("p").contains(`Total: $${products[0].price.toFixed(2)}`).should("exist");
        });
    });

    it("4. Removes item from basket", () => {
        cy.contains("Add to Basket").first().click();
        cy.contains("Basket").click();
        cy.contains("Remove").click();
        cy.get("p").contains("Basket is empty").should("exist");
        cy.get("li").should("have.length", 0);
        cy.get("p").contains("Total: $0.00").should("exist");
    });

    it("5. Performs payment with empty basket", () => {
        cy.contains("Payments").click();
        cy.get("button").should("be.disabled");
    });

    it("6. Adds multiple products to basket", () => {
        cy.get("button").filter(":contains('Add to Basket')").should("have.length", 3);
        cy.get("button").filter(":contains('Add to Basket')").eq(0).click();
        cy.get("button").filter(":contains('Add to Basket')").eq(1).click();
        cy.contains("Basket").click();
        cy.get("li").should("have.length", 2);
        cy.fixture("products").then((products) => {
            cy.contains(products[0].name).should("exist");
            cy.contains(products[1].name).should("exist");
        });
    });

    it("7. Calculates correct total for multiple items", () => {
        cy.get("button").filter(":contains('Add to Basket')").eq(0).click();
        cy.get("button").filter(":contains('Add to Basket')").eq(1).click();
        cy.contains("Basket").click();
        cy.get("p").contains("Total: $").invoke("text").then((text) => {
            expect(text).to.match(/Total: \$[0-9]+/);
        });
        cy.fixture("products").then((products) => {
            const total = products[0].price + products[1].price;
            cy.get("p").contains(`Total: $${total.toFixed(2)}`).should("exist");
        });
    });

    it("8. Navigates to Payments page", () => {
        cy.contains("Payments").click();
        cy.url().should("include", "/payments");
        cy.get("h2").should("contain", "Payments");
    });

    it("9. Navigates to Basket page", () => {
        cy.contains("Basket").click();
        cy.url().should("include", "/basket");
        cy.get("h2").should("contain", "Basket");
    });

    it("10. Product list has buttons", () => {
        cy.get("button").contains("Add to Basket").should("exist");
    });

    it("11. Same product can be added multiple times", () => {
        cy.contains("Add to Basket").first().click();
        cy.contains("Add to Basket").first().click();
        cy.contains("Basket").click();
        cy.get("li").should("have.length", 2);
        cy.get("li").filter(":contains('Product 1')").should("have.length", 2);
    });

    it("12. Product name is displayed correctly", () => {
        cy.fixture("products").then((products) => {
            cy.contains(products[0].name).should("exist");
        });
    });

    it("13. Basket page is empty on fresh load", () => {
        cy.contains("Basket").click();
        cy.get("p").should("contain", "Basket is empty");
    });

    it("14. Payment button enables with items", () => {
        cy.contains("Add to Basket").first().click();
        cy.contains("Payments").click();
        cy.get("button").should("not.be.disabled");
    });

    it("15. Performs valid payment", () => {
        cy.contains("Add to Basket").first().click();
        cy.contains("Payments").click();

        cy.get("button").filter(":contains('Pay')").should("exist").should("not.be.disabled");
        cy.get("p").contains("Total to pay: $").should("exist");
        cy.fixture("products").then((products) => {
            cy.get("p").contains(`Total to pay: $${products[0].price.toFixed(2)}`).should("exist");
        });

        cy.get("button").filter(":contains('Pay')").click();

        cy.wait("@postPayment").its("request.body").then((body) => {
            expect(body).to.have.property("total", 10);
            expect(body).to.have.property("products");
        });

        cy.on("window:alert", (txt) => {
            expect(txt).to.contain("Payment successful");
        });
    });

    it("16. Payment fails with empty POST body", () => {
        cy.intercept("POST", "http://localhost:8080/payments", {
            statusCode: 400,
            body: { error: "Invalid request" }
        }).as("postPaymentFail");

        cy.contains("Add to Basket").first().click();
        cy.contains("Payments").click();

        cy.window().then((win) => {
            win.localStorage.clear();
        });

        cy.get("button").filter(":contains('Pay')").click();
        cy.wait("@postPaymentFail");

        cy.on("window:alert", (txt) => {
            expect(txt).to.contain("Payment failed");
        });
    });

    it("17. Total amount updates when removing item", () => {
        cy.get("button").filter(":contains('Add to Basket')").eq(0).click();
        cy.get("button").filter(":contains('Add to Basket')").eq(1).click();
        cy.contains("Basket").click();

        cy.get("p").contains("Total: $").invoke("text").as("totalBefore");
        cy.contains("Remove").first().click();
        cy.get("p").contains("Total: $").invoke("text").as("totalAfter");

        cy.get("@totalBefore").should("not.eq", cy.get("@totalAfter"));
    });

    it("18. Total is calculated correctly for one product added multiple times", () => {
        cy.contains("Add to Basket").first().click();
        cy.contains("Add to Basket").first().click();
        cy.contains("Basket").click();

        cy.get("li").should("have.length", 2);
        cy.get("p").contains("Total: $").invoke("text").then((text) => {
            const price = parseFloat(text.replace("Total: $", ""));
            expect(price).to.eq(20);
        });
    });

    it("19. Cannot pay without selecting product", () => {
        cy.contains("Payments").click();
        cy.get("button").filter(":contains('Pay')").should("be.disabled");
    });

    it("20. Navigating between pages doesn't lose basket", () => {
        cy.contains("Add to Basket").eq(0).click();
        cy.contains("Basket").click();
        cy.get("li").should("have.length", 1);

        cy.contains("Products").click();
        cy.contains("Basket").click();
        cy.get("li").should("have.length", 1);

        cy.fixture("products").then((products) => {
            cy.contains(products[0].name).should("exist");
        });
    });

    it("21. Total updates correctly when adding multiple products", () => {
        cy.get("button").filter(":contains('Add to Basket')").eq(0).click();
        cy.get("button").filter(":contains('Add to Basket')").eq(1).click();
        cy.contains("Basket").click();

        cy.get("p").contains("Total: $").invoke("text").then((text) => {
            const total = parseFloat(text.replace("Total: $", ""));
            cy.fixture("products").then((products) => {
                const expectedTotal = products[0].price + products[1].price;
                expect(total).to.eq(expectedTotal);
            });
        });

        cy.get("button").filter(":contains('Remove')").first().click();
        cy.get("p").contains("Total: $").invoke("text").then((text) => {
            const total = parseFloat(text.replace("Total: $", ""));
            cy.fixture("products").then((products) => {
                const expectedTotal = products[1].price;
                expect(total).to.eq(expectedTotal);
            });
        });

        cy.get("button").filter(":contains('Remove')").first().click();
        cy.get("p").contains("Basket is empty").should("exist");
        cy.get("p").contains("Total: $0.00").should("exist");
        cy.get("li").should("have.length", 0);
    });
});
