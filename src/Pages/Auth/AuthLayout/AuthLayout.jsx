import React from "react";
import Logo from "../../../Shared/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      <Logo></Logo>
      <div>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
