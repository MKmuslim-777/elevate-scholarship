import React, { useState, useEffect } from "react";
import {
  FaGraduationCap,
  FaHome,
  FaTimes,
  FaSun,
  FaMoon,
  FaPhoneAlt,
  FaInfoCircle,
  FaChevronDown,
} from "react-icons/fa";
import { TiThMenu } from "react-icons/ti";
import { GoComment, GoSignOut, GoStack, GoShieldCheck } from "react-icons/go";
import { Link, NavLink } from "react-router";
import { toast } from "react-toastify";
import useAuth from "../../Hooks/useAuth";
import Logo from "../../Shared/Logo/Logo";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // থিম স্টেট (LocalStorage থেকে ডিফল্ট ভ্যালু নিচ্ছে)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // থিম পরিবর্তন করার লজিক
  useEffect(() => {
    const html = document.documentElement;

    // DaisyUI এর জন্য data-theme সেট করা
    html.setAttribute("data-theme", theme);

    // Tailwind এর dark: ক্লাসের জন্য classList আপডেট করা
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // লোকাল স্টোরেজে সেভ রাখা যাতে রিফ্রেশ দিলেও থিম না যায়
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  // স্ক্রল এফেক্ট হ্যান্ডলার
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = () => {
    signOutUser()
      .then(() => toast.success("Logged out safely"))
      .catch((error) => toast.error(error.message));
  };

  const navLinkStyles = ({ isActive }) =>
    `relative flex items-center gap-2 px-3 py-2 text-sm font-medium transition-all duration-300 rounded-full ${
      isActive
        ? "text-primary bg-primary/10 shadow-sm"
        : "text-slate-600 dark:text-slate-300 hover:text-primary hover:bg-slate-50 dark:hover:bg-slate-800"
    }`;

  const links = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyles}>
          <FaHome className="text-lg" /> Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-scholarships" className={navLinkStyles}>
          <FaGraduationCap className="text-lg" /> Scholarships
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/dashboard/my-applications" className={navLinkStyles}>
              <GoStack className="text-lg" /> Applications
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/my-comments" className={navLinkStyles}>
              <GoComment className="text-lg" /> Feedback
            </NavLink>
          </li>
        </>
      )}

      <li>
        <NavLink to="/about" className={navLinkStyles}>
          <FaInfoCircle className="text-lg" /> About
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className={navLinkStyles}>
          <FaPhoneAlt className="text-sm" /> Contact
        </NavLink>
      </li>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[1000]  transition-all duration-300 w-full ${
        scrolled
          ? "py-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-slate-800"
          : "py-4 bg-white dark:bg-slate-950"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsDrawerOpen(true)}
            className="lg:hidden p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            <TiThMenu className="text-2xl text-slate-700 dark:text-slate-300" />
          </button>
          <Logo className="w-10 h-10" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-1 bg-slate-100/50 dark:bg-slate-800/50 p-1.5 rounded-full border border-slate-200/60 dark:border-slate-700/60">
            {links}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all shadow-sm"
          >
            {theme === "light" ? (
              <FaMoon />
            ) : (
              <FaSun className="text-yellow-500" />
            )}
          </button>

          {user ? (
            <div className="dropdown dropdown-end group">
              <label
                tabIndex={0}
                className="flex items-center gap-2 cursor-pointer p-1 pr-3 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <div className="avatar">
                  <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={
                        user?.photoURL ||
                        `https://ui-avatars.com/api/?name=${user?.displayName}`
                      }
                      alt="avatar"
                    />
                  </div>
                </div>
                <FaChevronDown className="text-[10px] text-slate-400 group-hover:rotate-180 transition-transform" />
              </label>

              <div
                tabIndex={0}
                className="dropdown-content mt-4 z-[1] p-2 shadow-2xl bg-white dark:bg-slate-900 rounded-2xl w-64 border border-slate-100 dark:border-slate-800"
              >
                <div className="px-4 py-3 mb-2 border-b dark:border-slate-800">
                  <p className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    {user?.displayName}
                  </p>
                  <p className="text-[11px] text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <Link
                  to="/dashboard"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/5 text-slate-600 dark:text-slate-300 hover:text-primary"
                >
                  <GoShieldCheck className="text-xl" /> Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-3 px-4 py-3 w-full rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-500 mt-1 font-medium"
                >
                  <GoSignOut className="text-xl" /> Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/auth/login"
                className="hidden sm:block px-5 py-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-primary"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="px-6 py-2.5 bg-primary text-white text-sm font-bold rounded-full shadow-lg hover:-translate-y-0.5 transition-all"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-[100] lg:hidden transition-all duration-300 ${isDrawerOpen ? "visible" : "invisible"}`}
      >
        <div
          className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity ${isDrawerOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setIsDrawerOpen(false)}
        />
        <aside
          className={`absolute top-0 left-0 h-full w-[80%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="p-6 flex justify-between items-center border-b dark:border-slate-800">
            <Logo />
            <button
              onClick={() => setIsDrawerOpen(false)}
              className="p-2 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400"
            >
              <FaTimes />
            </button>
          </div>
          <ul className="p-6 space-y-4" onClick={() => setIsDrawerOpen(false)}>
            {links}
          </ul>
        </aside>
      </div>
    </header>
  );
};

export default Navbar;
