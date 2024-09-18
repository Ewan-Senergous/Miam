import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Home from "./pages/Home";
import TheRecipes from "./pages/TheRecipes";

import "./styles/main.css";
import CreateRecipe from "./pages/CreateRecipe";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import PanelAdmin from "./pages/userAdmin/PanelAdmin";
import User from "./pages/User";
import LeBuffet from "./pages/leBuffet/LeBuffet";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/theRecipes",
        element: <TheRecipes />,
      },

      {
        path: "/create-recipe",
        element: <CreateRecipe />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/panel-admin",
        element: <PanelAdmin />,
      },
      {
        path: "/user",
        element: <User />,
      },
      {
        path: "/le-buffet",
        element: <LeBuffet />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
