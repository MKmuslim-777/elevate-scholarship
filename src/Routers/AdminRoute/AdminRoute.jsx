import React from "react";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import Loading from "../../Shared/Loading/Loading";
import ForbiddenAccess from "../../Components/ForbiddenAccess/ForbiddenAccess";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "admin") {
    return <ForbiddenAccess></ForbiddenAccess>;
  }

  return children;
};

export default AdminRoute;
