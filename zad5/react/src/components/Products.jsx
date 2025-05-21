import React, { useEffect, useState } from "react";
import { fetchProducts } from "../services/api";

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then(setProducts);
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <ul>
                {products.map((p) => (
                    <li key={p.id}>
                        {p.name} - ${p.price}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Products;
