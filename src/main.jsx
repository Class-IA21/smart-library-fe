import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import LoginPage from "./pages/LoginPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import BookPage from "./pages/BookPage.jsx";
import Cards from "./pages/Cards.jsx";
import Students from "./pages/Students.jsx";
import StudentPage from "./pages/StudentPage.jsx";
import Transactions from "./pages/Transactions.jsx";
import NoPage from "./pages/NoPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <NoPage />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/book",
    element: <BookPage />,
  },
  {
    path: "/students",
    element: <Students />,
  },
  {
    path: "/student",
    element: <StudentPage />,
  },
  {
    path: "/cards",
    element: <Cards />,
  },
  {
    path: "/transactions",
    element: <Transactions />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
