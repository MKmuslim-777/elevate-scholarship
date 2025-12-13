import React from "react";
import Logo from "../../../Shared/Logo/Logo";
import { Outlet } from "react-router";
import Navbar from "../../../Components/Navbar/Navbar";

const AuthLayout = () => {
  return (
    <div className="">
      <Navbar></Navbar>
      <div>
        <div className="container mx-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
