import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import Logo from "../../Shared/Logo/Logo";
import { RiStickyNoteAddLine, RiDashboardLine } from "react-icons/ri";
import useRole from "../../Hooks/useRole";
import { LuUserRoundPlus, LuSettings } from "react-icons/lu";
import { FaGraduationCap } from "react-icons/fa";
import { HiMenuAlt2 } from "react-icons/hi";
import useAuth from "../../Hooks/useAuth";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user } = useAuth();

  // Active Link Styling
  const activeClass =
    "bg-white/20 text-white font-bold border-r-4 border-white shadow-md";
  const normalClass =
    "text-white/80 hover:bg-white/10 hover:text-white transition-all duration-300";

  return (
    <div className="drawer lg:drawer-open bg-slate-50 font-sans">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      {/* Content Area */}
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <nav className="navbar w-full bg-white shadow-sm border-b px-4 py-3 z-10 sticky top-0">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-4"
              className="btn btn-ghost btn-square text-primary"
            >
              <HiMenuAlt2 className="text-2xl" />
            </label>
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-700 hidden lg:block ml-2">
              ScholarStream Dashboard
            </h2>
          </div>
        </nav>

        {/* Page content here */}
        <main className="p-6 md:p-10 flex-grow">
          <Outlet />
        </main>
      </div>

      {/* Sidebar Area */}
      <div className="drawer-side z-20">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>

        <div className="flex min-h-full flex-col w-64 md:w-72 bg-primary text-white">
          {/* Sidebar Logo Section */}
          <div className="p-6 mb-4 flex justify-center border-b border-white/10">
            <Logo />
          </div>

          {/* Sidebar Menu Items */}
          <ul className="menu px-4 gap-2 grow">
            <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-4 mb-2">
              General
            </p>

            <li>
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `${isActive ? activeClass : normalClass} p-3 rounded-lg`
                }
              >
                <RiDashboardLine className="text-xl" />
                <span>Overview</span>
              </NavLink>
            </li>

            {/* Admin Specific Role Section */}
            {role === "admin" && (
              <>
                <div className="divider before:bg-white/10 after:bg-white/10 my-4"></div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold ml-4 mb-2">
                  Administration
                </p>

                <li>
                  <NavLink
                    to="/dashboard/manageScholarship"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} p-3 rounded-lg`
                    }
                  >
                    <FaGraduationCap className="text-xl" />
                    <span>Manage Scholarships</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/addScholarship"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} p-3 rounded-lg`
                    }
                  >
                    <RiStickyNoteAddLine className="text-xl" />
                    <span>Add New Scholarship</span>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    to="/dashboard/users-management"
                    className={({ isActive }) =>
                      `${isActive ? activeClass : normalClass} p-3 rounded-lg`
                    }
                  >
                    <LuUserRoundPlus className="text-xl" />
                    <span>Manage Users</span>
                  </NavLink>
                </li>
              </>
            )}
          </ul>

          {/* Sidebar Footer Link */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-3.5">
              <img
                src={user?.photoURL}
                alt=""
                className="rounded-full w-[50px]"
              />
              <div>
                <p className="text-xl font-bold">{user?.displayName}</p>
                <p className="text-base-200">{role}</p>
              </div>
            </div>
            <Link
              to="/"
              className="btn btn-ghost btn-block text-white/80 hover:bg-white/10"
            >
              Log Out
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
