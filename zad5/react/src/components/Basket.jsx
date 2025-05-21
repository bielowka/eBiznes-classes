import React from "react";
import { useBasket } from "../context/BasketContext.jsx";

const Basket = () => {
    const { basket, removeFromBasket } = useBasket();
    const total = basket.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <h2>Basket</h2>
            {basket.length === 0 ? (
                <p>Basket is empty</p>
            ) : (
                <ul>
                    {basket.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price.toFixed(2)}
                            <button onClick={() => removeFromBasket(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>Total: ${total.toFixed(2)}</p>
        </div>
    );
};

export default Basket;