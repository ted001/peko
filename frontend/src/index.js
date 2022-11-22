import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Meals from "./pages/Meals";
import OrderNow from "./pages/OrderNow";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Userhub from "./pages/Userhub";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const router = createBrowserRouter([
  //Akhila
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <Register />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/userhub",
    element: <Userhub />,
    errorElement: <ErrorPage />,
  },
  //Jin
  {
    path: "/meals",
    element: <Meals />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/orderNow",
    element: <OrderNow />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <div className="container">
    <RouterProvider router={router} />
  </div>
);
