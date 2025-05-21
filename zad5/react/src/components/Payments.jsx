import React from "react";
import { sendPayment } from "../services/api";
import { useBasket } from "../context/BasketContext.jsx";

const Payments = () => {
    const { basket } = useBasket();
    const total = basket.reduce((sum, item) => sum + item.price, 0);

    const handleSubmit = async () => {
        const response = await sendPayment({
            products: basket,
            total,
        });

        if (response.status === 200) {
            alert("Payment successful");
        } else {
            alert("Payment failed");
        }
    };

    return (
        <div>
            <h2>Payments</h2>
            <p>Total to pay: ${total.toFixed(2)}</p>
            <button onClick={handleSubmit} disabled={basket.length === 0}>
                Pay
            </button>
        </div>
    );
};

export default Payments;
