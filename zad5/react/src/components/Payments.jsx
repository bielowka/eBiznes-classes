import React, { useState } from "react";
import { sendPayment } from "../services/api";

const Payments = ({ basket }) => {
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
            <button onClick={handleSubmit}>Pay</button>
        </div>
    );
};

export default Payments;
