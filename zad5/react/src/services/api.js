export const fetchProducts = async () => {
    const res = await fetch("http://localhost:8080/products");
    return res.json();
};

export const sendPayment = async (paymentData) => {
    return await fetch("http://localhost:8080/payments", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(paymentData),
    });
};
