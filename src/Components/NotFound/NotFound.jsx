import React from "react";
import { Link } from "react-router";
import { HiArrowNarrowLeft } from "react-icons/hi";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        {/* Visual Part */}
        <div className="relative">
          <h1 className="text-[12rem] font-extrabold text-primary/10 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-2xl shadow-xl mb-4 animate-bounce">
              <svg
                className="w-16 h-16 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800">
              Oops! Lost in Space?
            </h2>
          </div>
        </div>

        {/* Content Part */}
        <div className="mt-8 space-y-4">
          <p className="text-gray-500 text-lg">
            The page you are looking for doesn't exist or has been moved to
            another scholarship stream.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link
              to="/"
              className="btn btn-primary px-8 rounded-full text-white shadow-lg shadow-primary/30 flex items-center gap-2 group"
            >
              <HiArrowNarrowLeft className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>

            <Link
              to="/all-scholarships"
              className="btn btn-outline btn-primary px-8 rounded-full hover:text-base-100"
            >
              Explore Scholarships
            </Link>
          </div>
        </div>

        {/* Footer Help */}
        {/* <p className="mt-12 text-sm text-gray-400">
          Need help?{" "}
          <Link to="/contact" className="underline hover:text-primary">
            Contact our support team
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default NotFound;
