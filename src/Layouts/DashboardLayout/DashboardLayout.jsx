import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../../Shared/Logo/Logo";
import {
  RiStickyNoteAddLine,
  RiDashboardLine,
  RiLogoutBoxRLine,
} from "react-icons/ri";
import useRole from "../../Hooks/useRole";
import { FaGraduationCap, FaUsersCog, FaHome, FaListAlt } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
import { GoComment } from "react-icons/go";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user, signOutUser } = useAuth();

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

  const activeClass =
    "bg-white/20 text-white font-bold border-r-4 border-white shadow-inner";
  const normalClass =
    "text-white/70 hover:bg-white/10 hover:text-white transition-all duration-300";

  return (
    <div className="drawer lg:drawer-open bg-[#f8fafc] font-sans">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Top Navbar */}
        <nav className="navbar w-full bg-white shadow-sm border-b px-6 py-4 z-10 sticky top-0">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-square text-primary"
            >
              <HiMenuAlt2 className="text-2xl" />
            </label>
          </div>
          <div className="flex-1">
            <div className="flex flex-col">
              <h2 className="text-lg font-bold text-gray-800 ml-2 uppercase tracking-tight">
                ScholarStream <span className="text-primary">Dashboard</span>
              </h2>
              <span className="text-[10px] text-gray-400 ml-2 font-medium">
                Logged in as: {role}
              </span>
            </div>
          </div>
          <div className="flex-none gap-2">
            <Link
              to="/"
              className="btn btn-ghost btn-sm text-gray-500 gap-2 hover:text-base-100"
            >
              <FaHome /> Home
            </Link>
          </div>
        </nav>

        {/* Page content here */}
        <main className="p-4 md:p-8 lg:p-10 min-h-screen">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Sidebar Area */}
      <div className="drawer-side z-30">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col w-64 md:w-72 bg-primary text-white shadow-2xl">
          {/* Sidebar Logo Section */}
          <div className="p-8 flex justify-center border-b border-white/5 bg-black/5">
            <Logo />
          </div>

          {/* Sidebar Menu Items */}
          <ul className="menu p-4 gap-1 grow mt-4">
            <p className="text-[11px] uppercase tracking-[2px] text-white/40 font-black ml-4 mb-3">
              Main Menu
            </p>

            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `${
                    isActive ? activeClass : normalClass
                  } flex items-center gap-4 py-3.5 px-5 rounded-xl`
                }
              >
                <RiDashboardLine className="text-xl" />
                <span className="text-sm">Overview</span>
              </NavLink>
            </li>

            {/* Admin Specific Role Section */}
            {role === "admin" && (
              <>
                <div className="divider before:bg-white/5 after:bg-white/5 my-6 opacity-50 px-4"></div>
                <p className="text-[11px] uppercase tracking-[2px] text-white/40 font-black ml-4 mb-3">
                  Admin Tools
                </p>

                <li>
                  <NavLink
                    to="/dashboard/manageScholarship"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeClass : normalClass
                      } flex items-center gap-4 py-3.5 px-5 rounded-xl`
                    }
                  >
                    <FaGraduationCap className="text-xl" />
                    <span className="text-sm">Manage Scholarships</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/addScholarship"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeClass : normalClass
                      } flex items-center gap-4 py-3.5 px-5 rounded-xl`
                    }
                  >
                    <RiStickyNoteAddLine className="text-xl" />
                    <span className="text-sm">Post Scholarship</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeClass : normalClass
                      } flex items-center gap-4 py-3.5 px-5 rounded-xl`
                    }
                  >
                    <FaUsersCog className="text-xl" />
                    <span className="text-sm">User Directory</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "student" && (
              <>
                {/* My Applications Link */}
                <li>
                  <NavLink
                    to="/dashboard/my-applications"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeClass : normalClass
                      } flex items-center gap-4 py-3.5 px-5 rounded-xl transition-all duration-200`
                    }
                  >
                    <FaListAlt className="text-xl" />
                    <span className="text-sm font-medium">My Applications</span>
                  </NavLink>
                </li>

                {/* My Comments Link */}
                <li>
                  <NavLink
                    to="/dashboard/my-comments"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeClass : normalClass
                      } flex items-center gap-4 py-3.5 px-5 rounded-xl transition-all duration-200`
                    }
                  >
                    <GoComment className="text-xl" />
                    <span className="text-sm font-medium">My Comments</span>
                  </NavLink>
                </li>
              </>
            )}
            {role === "moderator" && (
              <>
                {/* My Applications Link */}
                <li>
                  <NavLink
                    to="/dashboard/manage-applied-applications"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeClass : normalClass
                      } flex items-center gap-4 py-3.5 px-5 rounded-xl`
                    }
                  >
                    <FaGraduationCap className="text-xl" />
                    <span className="text-sm">Manage Applied Applications</span>
                  </NavLink>
                </li>

                {/* My Comments Link */}
                <li>
                  <NavLink
                    to="/dashboard/all-reviews"
                    className={({ isActive }) =>
                      `${
                        isActive ? activeClass : normalClass
                      } flex items-center gap-4 py-3.5 px-5 rounded-xl transition-all duration-200`
                    }
                  >
                    <GoComment className="text-xl" />
                    <span className="text-sm font-medium">All Reviews</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Sidebar Footer User Card */}
          <div className="p-4 mx-4 mb-6 bg-black/10 rounded-2xl border border-white/10">
            <div className="flex items-center gap-4 mb-4">
              <div className="avatar">
                <div className="w-12 rounded-xl ring ring-white/20 ring-offset-base-100 ring-offset-2">
                  <img src={user?.photoURL} alt="profile" />
                </div>
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">
                  {user?.displayName}
                </p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider font-bold">
                  {role}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="btn btn-sm btn-block bg-red-500/20 hover:bg-red-500 border-red-500/50 text-white border-none rounded-lg flex items-center gap-2 transition-all duration-300"
            >
              <RiLogoutBoxRLine className="text-lg" />
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
