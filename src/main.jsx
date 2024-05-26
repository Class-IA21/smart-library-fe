import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BookPage from "./pages/BookPage.jsx";
import NoPage from "./pages/NoPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage/>,
    errorElement: <NoPage />,
  }, {
    path: "/dashboard",
    element: <Dashboard />,
  }, {
    path: "/book",
    element: <BookPage />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
