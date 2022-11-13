import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "./pages/Main";
import OrderNow from "./pages/OrderNow";

export default function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/OrderNow" element={<OrderNow />} />
      </Routes>
    </div>
  );
}
