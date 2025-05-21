import React, { createContext, useContext, useState } from "react";

const BasketContext = createContext(undefined);

export const useBasket = () => useContext(BasketContext);

export const BasketProvider = ({ children }) => {
    const [basket, setBasket] = useState([]);

    const addToBasket = (product) => {
        setBasket((prev) => [...prev, product]);
    };

    const removeFromBasket = (index) => {
        setBasket((prev) => prev.filter((_, i) => i !== index));
    };

    return (
        <BasketContext.Provider value={{ basket, addToBasket, removeFromBasket }}>
            {children}
        </BasketContext.Provider>
    );
};
