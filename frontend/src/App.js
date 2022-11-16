import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Meals from "./pages/Meals";
import OrderNow from "./pages/OrderNow";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/orderNow" element={<OrderNow />} />
      </Routes>
    </div>
  );
}
