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
    console.log(data);
    const email = data.email;
    const password = data.password;

    signInUser(email, password)
      .then((result) => {
        console.log(result);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="">
      <div>
        <div>
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p>Please Log in your account.</p>

          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="input"
                placeholder="Email"
              />
              {errors.email?.type === "required" && (
                <p className="text-red-500">Email is Required.</p>
              )}

              {/* Password */}

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password", {
                  required: true,
                })}
                className="input"
                placeholder="Password"
              />
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is Required.</p>
              )}
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary text-secondary mt-4 w-[320px]">
                Login
              </button>
            </fieldset>
            <p className="mt-2.5">
              Have no Account{" "}
              <Link
                state={location?.state}
                to={"/auth/register"}
                className={"text-blue-500 underline "}
              >
                Register
              </Link>
            </p>
          </form>

          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
