import React from "react";
import { Link } from "react-router";
import { IoShieldOutline } from "react-icons/io5";

const ForbiddenAccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center p-8 md:p-12 lg:p-16 bg-white rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-500 hover:scale-[1.01] border-t-4 border-error">
        {/* Error Icon */}
        <IoShieldOutline className="mx-auto text-error w-16 h-16 md:w-20 md:h-20 mb-4" />

        {/* Error Code */}
        <h1 className="text-8xl md:text-9xl font-extrabold text-error mb-4">
          403
        </h1>

        {/* Message Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Access Denied
        </h2>

        {/* Detailed Message */}
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You do not have the necessary permissions to view this page. Please
          log in with an authorized account.
        </p>

        <div className="flex md:flex-row flex-col  items-center justify-center">
          <Link
            to={"/auth/login"}
            className="btn btn-primary text-base-100 w-full sm:w-auto hover:scale-[1.05] transition-transform duration-200"
          >
            Go to Login
          </Link>

          <Link
            to="/"
            className="btn btn-outline md:mt-0 mt-4 hover:bg-base-200 w-full sm:w-auto sm:ml-4"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenAccess;
