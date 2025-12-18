import React from "react";
import Logo from "../../../Shared/Logo/Logo";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-100 flex flex-col">
      <header className="p-6 md:p-10 flex justify-center md:justify-start">
        <div className="hover:scale-105 transition-transform duration-200">
          <Logo />
        </div>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="py-6 text-center text-gray-400 text-xs">
        <p>
          &copy; {new Date().getFullYear()} Elevate Scholarship. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default AuthLayout;
