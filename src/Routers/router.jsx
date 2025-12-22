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
import AddScholarship from "../Pages/Dashboard/AddScholarship/AddScholarship";
import UserManagement from "../Pages/Dashboard/UserManagement/UserManagement";
import AllScholarshipsAdmin from "../Pages/Dashboard/AllScholarshipsAdmin/AllScholarshipsAdmin";
import AdminRoute from "./AdminRoute/AdminRoute";
import NotFound from "../Components/NotFound/NotFound";
import Payment from "../Pages/Payment/Payment/Payment";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/Payment/PaymentCancelled/PaymentCancelled";
import StudentRoute from "./StudentRoute/StudentRoute";
import MyApplications from "../Pages/Dashboard/MyAppications/MyApplications";
import MyComments from "../Pages/Dashboard/MyComments/MyComments";
import ModeratorRoute from "./ModeratorRoute/ModeratorRoute";
import AllReviews from "../Pages/Dashboard/AllReviews/AllReviews";
import ManageApplied from "../Pages/Dashboard/ManageApplied/ManageApplied";
import DashBoardHomeAuth from "../Pages/DashBoardHomeAuth/DashBoardHomeAuth";
import MyProfile from "../Pages/Dashboard/MyProfile/MyProfile";

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
        path: "application/:scholarshipId",
        element: (
          <PrivateRoute>
            <Payment></Payment>
          </PrivateRoute>
        ),
      },
      {
        path: "/scholarships/details/:id",
        element: (
          <PrivateRoute>
            <ScholarshipDetails></ScholarshipDetails>
          </PrivateRoute>
        ),
        // loader: ({ params }) =>
        //   fetch(`http://localhost:3000/scholarships/${params.id}`),
        loader: ({ params }) =>
          fetch(
            `https://scholarship-stream-server-eleven.vercel.app/scholarships/${params.id}`
          ),
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
        element: <DashBoardHomeAuth></DashBoardHomeAuth>,
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
        element: (
          <AdminRoute>
            <UserManagement></UserManagement>
          </AdminRoute>
        ),
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-applications",
        element: (
          <StudentRoute>
            <MyApplications></MyApplications>
          </StudentRoute>
        ),
      },
      {
        path: "my-comments",
        element: (
          <StudentRoute>
            <MyComments></MyComments>
          </StudentRoute>
        ),
      },
      {
        path: "manageScholarship",
        element: (
          <AdminRoute>
            <AllScholarshipsAdmin></AllScholarshipsAdmin>
          </AdminRoute>
        ),
      },
      {
        path: "payment-success",
        element: (
          <StudentRoute>
            <PaymentSuccess></PaymentSuccess>
          </StudentRoute>
        ),
      },
      {
        path: "payment-cancelled",
        element: (
          <StudentRoute>
            <PaymentCancelled></PaymentCancelled>
          </StudentRoute>
        ),
      },
      {
        path: "all-reviews",
        element: (
          <ModeratorRoute>
            <AllReviews></AllReviews>
          </ModeratorRoute>
        ),
      },
      {
        path: "manage-applied-applications",
        element: (
          <ModeratorRoute>
            <ManageApplied></ManageApplied>
          </ModeratorRoute>
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
