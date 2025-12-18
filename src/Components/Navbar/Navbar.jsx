import React from "react";
import { FaGraduationCap, FaHome, FaUserCircle } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { GoComment, GoSignOut, GoStack } from "react-icons/go";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import Logo from "../../Shared/Logo/Logo";

const Navbar = () => {
  const { user, signOutUser } = useAuth();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        toast.success("Signed out successfully!");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const links = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? "bg-primary/10 text-primary font-bold"
                : "text-gray-600 hover:text-primary hover:bg-gray-50"
            }`
          }
        >
          <FaHome /> Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-scholarships"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? "bg-primary/10 text-primary font-bold"
                : "text-gray-600 hover:text-primary hover:bg-gray-50"
            }`
          }
        >
          <FaGraduationCap /> Scholarships
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/myProperties"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isActive
                ? "bg-primary/10 text-primary font-bold"
                : "text-gray-600 hover:text-primary hover:bg-gray-50"
            }`
          }
        >
          <GoStack /> My Properties
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto navbar py-3 px-4">
        {/* Navbar Start: Logo & Mobile Menu */}
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost lg:hidden p-2">
              <TiThMenu className="text-2xl text-primary" />
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-4 shadow-xl bg-white rounded-2xl w-64 border border-gray-100 gap-2"
            >
              {links}
            </ul>
          </div>
          <Logo />
        </div>

        {/* Navbar Center: Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2 list-none">{links}</ul>
        </div>

        {/* Navbar End: Auth States */}
        <div className="navbar-end gap-3">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar border-2 border-primary/20 hover:border-primary transition-all p-0.5"
              >
                <div className="w-10 rounded-full">
                  <img
                    src={
                      user?.photoURL ||
                      "https://img.icons8.com/puffy-filled/32/user.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </label>

              <div
                tabIndex={0}
                className="mt-3 z-[1] p-5 shadow-2xl dropdown-content bg-white rounded-2xl w-72 border border-gray-100"
              >
                <div className="flex flex-col items-center text-center border-b border-gray-100 pb-4 mb-4">
                  <img
                    src={
                      user?.photoURL ||
                      "https://img.icons8.com/puffy-filled/32/user.png"
                    }
                    className="rounded-full w-16 h-16 border-4 border-primary/10 mb-3 object-cover"
                    alt="Profile"
                  />
                  <h4 className="text-gray-900 font-bold text-lg leading-tight">
                    {user?.displayName}
                  </h4>
                  <p className="text-gray-500 text-sm truncate w-full">
                    {user?.email}
                  </p>
                </div>

                <ul className="space-y-2">
                  <li>
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-700 font-medium transition-colors"
                    >
                      <GoComment className="text-primary text-xl" /> Dashboard
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 p-3 w-full rounded-xl hover:bg-red-50 text-red-600 font-medium transition-colors"
                    >
                      <GoSignOut className="text-xl" /> Sign Out
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="hidden sm:flex text-gray-700 font-semibold hover:text-primary px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/auth/register"
                className="btn btn-primary btn-sm md:btn-md text-white px-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all border-none"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
