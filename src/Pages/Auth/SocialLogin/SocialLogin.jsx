import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import useAxios from "../../../Hooks/useAxios";
import { FcGoogle } from "react-icons/fc"; // More reliable than custom SVG

const SocialLogin = () => {
  const { signInGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();

  const handleGoogleSignIn = () => {
    signInGoogle()
      .then((result) => {
        const studentInfo = {
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };

        axios.post("/users", studentInfo).then((res) => {
          // Navigates to the page they were trying to visit, or home
          navigate(location?.state || "/");
        });
      })
      .catch((error) => {
        console.error("Google Sign In Error:", error);
      });
  };

  return (
    <div className="w-full">
      <button
        onClick={handleGoogleSignIn}
        type="button"
        className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 transition-all duration-200 group"
      >
        <FcGoogle className="text-xl mr-3 group-hover:scale-110 transition-transform" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default SocialLogin;
