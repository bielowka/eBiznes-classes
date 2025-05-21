import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

const Products = ({ onAddToBasket }) => {
    const [products, setProducts] = useState([]);

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
                        <button onClick={() => onAddToBasket(p)}>Add to Basket</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
