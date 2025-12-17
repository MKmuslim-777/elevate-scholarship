import React, { use } from "react";
import { FaGraduationCap, FaHome } from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { MdPermContactCalendar } from "react-icons/md";
import { Link, NavLink } from "react-router";

import { toast } from "react-toastify";
import { GoComment } from "react-icons/go";
// import ThemeToggle from "../ToggleBtn/ThemeToggle";
import useAuth from "../../Hooks/useAuth";
import Logo from "../../Shared/Logo/Logo";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  // console.log(user);

  const handleSignOut = () => {
    signOutUser()
      .then((result) => {
        console.log(result);
        toast.success("Successfully Sign Out !");
      })
      .catch((error) => {
        toast.error(error);
        console.log(error);
      });
  };

  const links = (
    <>
      <li className="mr-5">
        <NavLink
          to={"/"}
          className={
            "font-semibold text-primary text-[18px] hover:bg-transparent "
          }
        >
          <FaHome />
          Home
        </NavLink>
      </li>
      <li className="mr-5">
        <NavLink
          to={"all-scholarships"}
          className={
            "font-semibold text-primary text-[18px] hover:bg-transparent"
          }
        >
          <FaGraduationCap />
          All Scholarships
        </NavLink>
      </li>
      <li className="mr-5">
        <NavLink
          to={"/myProperties"}
          className={
            "font-semibold text-primary text-[18px] hover:bg-transparent"
          }
        >
          My Properties
        </NavLink>
      </li>
      {/* {user && (
        <li className="mr-5">
          <NavLink
            to={"/myProperties"}
            className={
              "font-semibold text-secondary text-[18px] hover:bg-transparent"
            }
          >
            My Properties
          </NavLink>
        </li>
      )} */}
    </>
  );

  return (
    <div className="bg-base-100 shadow-lg">
      <div className="container navbar ">
        <div className="navbar-start">
          <div className="drawer lg:hidden">
            <input
              id="my-drawer-1"
              type="checkbox"
              className="drawer-toggle lg:hidden"
            />
            <div className="drawer-content lg:hidden">
              <label
                htmlFor="my-drawer-1"
                className="btn border-none shadow-none bg-transparent lg:hidden"
              >
                <TiThMenu className=" hover:text-base-100" />
              </label>
            </div>
            <div className="drawer-side z-20">
              <label
                htmlFor="my-drawer-1"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              <ul className="menu bg-primary min-h-full w-80 p-4">{links}</ul>
            </div>
          </div>
          <div>
            <Logo></Logo>
          </div>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        <div className="navbar-end">
          {/* <ThemeToggle></ThemeToggle> */}

          {user ? (
            <>
              {" "}
              <div className="">
                <div className="dropdown dropdown-bottom dropdown-end ">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-outline btn-circle"
                  >
                    <img
                      src={user?.photoURL}
                      className="rounded-full w-[33px]"
                      alt="User Image"
                    />
                  </div>
                  <ul
                    tabIndex="-1"
                    className="dropdown-content menu bg-base-100 rounded-box z-1 w-[270px] p-2 shadow-sm"
                  >
                    {user && (
                      <div className="flex flex-col items-center">
                        <img
                          src={
                            user
                              ? user?.photoURL
                              : "https://img.icons8.com/puffy-filled/32/user.png"
                          }
                          className="rounded-full w-[30px] border border-secondary"
                          alt="User Profile"
                        />
                        <p className=" text-secondary font-bold mt-2 ">
                          {user?.displayName}
                        </p>
                        <p className=" text-secondary font-semibold">
                          {user?.email}
                        </p>
                        <li>
                          <NavLink
                            to={"/dashboard"}
                            className={
                              "font-semibold text-secondary text-[18px] hover:bg-transparent"
                            }
                          >
                            <GoComment /> Dashboard
                          </NavLink>
                        </li>
                        <div className="flex gap-2.5">
                          {/* <button className="btn btn-secondary text-base-100 mt-2">
                        Edit
                      </button> */}
                          <button
                            onClick={handleSignOut}
                            className="btn btn-outline w-full hover:bg-secondary hover:text-base-100 mt-2"
                          >
                            Sign Out
                          </button>
                        </div>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div>
              <Link to={"/auth/login"} className="myBtn ml-3.5">
                Sign In
              </Link>
              <Link
                to={"/auth/register"}
                className="btn btn-primary text-white ml-3.5"
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
