import React from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import Logo from "../../../Shared/Logo/Logo";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signInUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((result) => {
        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl">
        {/* Header/Logo Section */}
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome Back!
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Please log in to your account to continue.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(handleLogin)}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`appearance-none relative block w-full px-3 py-3 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm`}
                placeholder="name@provider.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-blue-600 hover:text-blue-500"
                >
                  Forgot password?
                </button>
              </div>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`appearance-none relative block w-full px-3 py-3 border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } placeholder-gray-400 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 italic">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Log In
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6">
            <SocialLogin />
          </div>
        </div>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            state={location?.state}
            to={"/auth/register"}
            className="font-bold text-blue-600 hover:text-blue-500 transition-colors"
          >
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
