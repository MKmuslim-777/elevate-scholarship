import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../../Shared/Loading/Loading";
import AdminHome from "../Dashboard/AdminHome/AdminHome";

const DashBoardHomeAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role === "admin") {
    return <AdminHome></AdminHome>;
  }

  return children;
};

export default DashBoardHomeAuth;
