import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";
import { useBasket } from "../context/BasketContext.jsx";

const Products = () => {
    const [products, setProducts] = useState([]);
    const { addToBasket } = useBasket();

    useEffect(() => {
        fetchProducts().then(setProducts).catch(console.error);
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - ${p.price}
                        <button onClick={() => addToBasket(p)}>Add to Basket</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
