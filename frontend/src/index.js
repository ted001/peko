import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Meals from "./pages/Meals";
import OrderNow from "./pages/OrderNow";
import Home from "./pages/Home";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/meals",
    element: <Meals />,
  },
  {
    path: "/orderNow",
    element: <OrderNow />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="container">
    <RouterProvider router={router} />
  </div>
);
