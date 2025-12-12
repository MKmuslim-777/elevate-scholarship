import React from "react";
import { createBrowserRouter } from "react-router";
import App from "../App";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";

const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/all-scholarships",
        Component: AllScholarship,
      },
    ],
  },
]);

export default router;
