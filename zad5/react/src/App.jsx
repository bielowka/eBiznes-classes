import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Payments from "./components/Payments";

const App = () => {
    const [basket, setBasket] = useState([]);

    const handleAddToBasket = (product) => {
        setBasket([...basket, product]);
    };

    const handleRemoveFromBasket = (index) => {
        setBasket(basket.filter((_, i) => i !== index));
    };

    return (
        <Router>
            <nav>
                <Link to="/">Products</Link> |{" "}
                <Link to="/basket">Basket</Link> |{" "}
                <Link to="/payments">Payments</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Products onAddToBasket={handleAddToBasket} />} />
                <Route path="/basket" element={<Basket items={basket} onRemove={handleRemoveFromBasket} />} />
                <Route path="/payments" element={<Payments basket={basket} />} />
            </Routes>
        </Router>
    );
};

export default App;
