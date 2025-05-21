import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Products from "./components/Products";
import Basket from "./components/Basket";
import Payments from "./components/Payments";

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/">Products</Link> |{" "}
                <Link to="/basket">Basket</Link> |{" "}
                <Link to="/payments">Payments</Link>
            </nav>

            <Routes>
                <Route path="/" element={<Products />} />
                <Route path="/basket" element={<Basket />} />
                <Route path="/payments" element={<Payments />} />
            </Routes>
        </Router>
    );
};

export default App;