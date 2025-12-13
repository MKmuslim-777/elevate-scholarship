import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import AuthLayout from "../Pages/Auth/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";

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
      {
        path: "/scholarships/details/:id",
        Component: ScholarshipDetails,
        loader: ({ params }) =>
          fetch(`http://localhost:3000/scholarships/${params.id}`),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
]);

export default router;
