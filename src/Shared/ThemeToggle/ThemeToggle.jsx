import React, { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToggle = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const html = document.documentElement;

    localStorage.setItem("theme", theme);

    if (theme === "dark") {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    } else {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    }
  }, [theme]);

  return (
    <div className="md:mr-5 mr-3">
      <button
        onClick={handleToggle}
        className="p-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-primary hover:text-primary transition-all shadow-sm focus:outline-none"
        aria-label="Toggle Theme"
      >
        {theme === "light" ? (
          <FaMoon className="w-5 h-5" />
        ) : (
          <FaSun className="text-yellow-500 w-5 h-5" />
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
