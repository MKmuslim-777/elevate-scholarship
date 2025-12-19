import React from "react";
import useAuth from "../../Hooks/useAuth";

import ForbiddenAccess from "../../Components/ForbiddenAccess/ForbiddenAccess";
import Loading from "../../Shared/Loading/Loading";
import useRole from "../../Hooks/useRole";

const ModeratorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (role !== "moderator") {
    return <ForbiddenAccess></ForbiddenAccess>;
  }

  return children;
};

export default ModeratorRoute;
