import React, { useState } from "react";
import SocialLogin from "../SocialLogin/SocialLogin";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();
  const { updateUserProfile, registerUser } = useAuth();
  const [eye, setEye] = useState(false);

  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    const email = data.email;
    const password = data.password;

    registerUser(email, password).then(() => {
      const formData = new FormData();
      formData.append("image", profileImg);

      const image_API_URL = `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_image_host_key
      }`;

      axios
        .post(image_API_URL, formData)
        .then((res) => {
          const photoURL = res.data.data.url;

          const userInfo = {
            email: email,
            displayName: data.name,
            photoURL: photoURL,
          };

          axios.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("User Created");
            }
          });

          //   update use profile
          const userProfile = {
            displayName: data.name,
            photoURL: photoURL,
          };

          updateUserProfile(userProfile)
            .then(() => {
              navigate(location?.state || "/");
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    });
  };

  return (
    <div className="">
      <div className="p-20 ">
        <h3 className="text-3xl  font-bold ">Welcome To Elevate</h3>
        <h3 className="text-5xl font-bold text-secondary ">Scholarship!</h3>
        <p className="">Register and Find Future💚</p>
        <div className="">
          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset ">
              {/* Name */}

              {/* Name */}
              <label className="label">Your Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="input"
                placeholder="Your Name"
              />
              {errors.name?.type === "required" && (
                <p className="text-red-500">Name is Required.</p>
              )}

              {/* Email */}
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
              <div className="relative">
                <div className="flex flex-col">
                  <label className="label">Password</label>
                  <input
                    type={eye ? "text" : "password"}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    })}
                    className="input"
                    placeholder="Password"
                  />
                </div>

                <span
                  onClick={() => setEye(!eye)}
                  className="absolute top-8 left-73 z-10"
                >
                  {eye ? (
                    <FaEyeSlash className="text-sm" />
                  ) : (
                    <FaEye className="text-sm" />
                  )}
                </span>
              </div>
              {errors.password?.type === "required" && (
                <p className="text-red-500">Password is Required.</p>
              )}
              {errors.password?.type === "minLength" && (
                <p className="text-red-500">
                  Password must be 6 characters or longer.
                </p>
              )}
              {errors.password?.type === "pattern" && (
                <p className="text-red-500">
                  Password must be special characters
                </p>
              )}

              <label className="label mt-2.5">Upload Your Photo</label>
              <input
                type="file"
                {...register("photo", { required: true })}
                className="file-input "
                placeholder="Your Photo"
              />
              {errors.photo?.type === "required" && (
                <p className="text-red-500">Photo is Required.</p>
              )}

              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-primary text-white mt-4 w-[320px]">
                Register
              </button>
              <p className="mt-2.5">
                Already Have an Account
                <Link
                  state={location?.state}
                  to={"/login"}
                  className={"text-blue-700 underline "}
                >
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
          <SocialLogin></SocialLogin>
        </div>
      </div>
    </div>
  );
};

export default Register;
