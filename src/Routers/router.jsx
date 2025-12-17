import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import AllScholarship from "../Pages/AllScholarship/AllScholarship";
import AuthLayout from "../Pages/Auth/AuthLayout/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import ScholarshipDetails from "../Pages/ScholarshipDetails/ScholarshipDetails";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import DashboardHome from "../Pages/DashboardHome/DashboardHome";
import AddScholarship from "../Pages/Dashboard/AddScholarship/AddScholarship";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import AllScholarshipsAdmin from "../Pages/Dashboard/AllScholarshipsAdmin/AllScholarshipsAdmin";
import AdminRoute from "./AdminRoute/AdminRoute";
import NotFound from "../Components/NotFound/NotFound";

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
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`http://localhost:3000/scholarships/${params.id}`),
      },
    ],
  },
  {
    path: "auth",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "addScholarship",
        element: (
          <AdminRoute>
            <AddScholarship></AddScholarship>
          </AdminRoute>
        ),
      },
      {
        path: "users-management",
        Component: UserManagement,
      },
      {
        path: "manageScholarship",
        element: (
          <AdminRoute>
            <AllScholarshipsAdmin></AllScholarshipsAdmin>
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
