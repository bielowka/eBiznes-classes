import React, { useState } from "react";
import { sendPayment } from "../services/api";

const Payments = () => {
    const [productName, setProductName] = useState("");
    const [amount, setAmount] = useState("");

    const handleSubmit = async () => {
        const paymentData = {
            productName: productName,
            amount: Number(amount),
        };

        const response = await sendPayment(paymentData);

        if (response.status === 200) {
            alert(`Payment sent for ${productName}: $${amount}`);
        } else {
            alert("Payment failed");
        }
    };

    return (
        <div>
            <h2>Payments</h2>
            <input
                type="text"
                placeholder="Enter product name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
            />
            <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleSubmit}>Send Payment</button>
        </div>
    );
};

export default Payments;
