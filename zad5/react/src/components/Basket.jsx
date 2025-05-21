import React from "react";

const Basket = ({ items, onRemove }) => {
    const total = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div>
            <h2>Basket</h2>
            {items.length === 0 ? (
                <p>Basket is empty</p>
            ) : (
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                            {item.name} - ${item.price.toFixed(2)}
                            <button onClick={() => onRemove(index)}>Remove</button>
                        </li>
                    ))}
                </ul>
            )}
            <p>Total: ${total.toFixed(2)}</p>
        </div>
    );
};

export default Basket;
