import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAxios from "../../../Hooks/useAxios";
import { toast } from "react-toastify";
import {
  FaGraduationCap,
  FaUniversity,
  FaGlobe,
  FaCity,
  FaCalendarAlt,
  FaDollarSign,
  FaImage,
} from "react-icons/fa";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();

  const handleScholarshipSubmit = async (data) => {
    const scholarshipImg = data.universityImage[0];
    const formData = new FormData();
    formData.append("image", scholarshipImg);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host_key
    }`;

    try {
      const res = await axios.post(image_API_URL, formData);
      const photoURL = res.data.data.url;
      data.universityImage = photoURL;

      // Convert numeric strings to numbers
      data.tuitionFees = parseFloat(data.tuitionFees);
      data.applicationFees = parseFloat(data.applicationFees);
      data.serviceCharge = parseFloat(data.serviceCharge);
      data.postedUserEmail = user.email;

      const scholarshipRes = await axiosSecure.post("/scholarships", data);
      if (scholarshipRes.data.insertedId) {
        toast.success("Scholarship added successfully! 💚");
        reset();
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Post a <span className="text-primary">Scholarship</span>
          </h1>
          <p className="text-gray-500 mt-2">
            Fill in the details below to add a new scholarship opportunity.
          </p>
        </div>
        <FaGraduationCap className="text-6xl text-primary/20 hidden md:block" />
      </div>

      <form
        onSubmit={handleSubmit(handleScholarshipSubmit)}
        className="space-y-6"
      >
        {/* Form Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
          {/* Scholarship Name */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Scholarship Name
            </label>
            <div className="relative">
              <input
                type="text"
                className={`input input-bordered w-full pl-10 focus:ring-2 focus:ring-primary/20 ${
                  errors.scholarshipName ? "border-red-500" : ""
                }`}
                placeholder="e.g. Merit-Based Excellence Grant"
                {...register("scholarshipName", {
                  required: "Scholarship Name is required",
                })}
              />
              <FaGraduationCap className="absolute left-3 top-4 text-gray-400" />
            </div>
            {errors.scholarshipName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.scholarshipName.message}
              </p>
            )}
          </div>

          {/* University Name */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              University Name
            </label>
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="e.g. Harvard University"
                {...register("universityName", { required: true })}
              />
              <FaUniversity className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* University Country */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">Country</label>
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="United States"
                {...register("universityCountry", { required: true })}
              />
              <FaGlobe className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* University City */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">City</label>
            <div className="relative">
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="Cambridge"
                {...register("universityCity", { required: true })}
              />
              <FaCity className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* World Rank, Category, Degree Grid */}
          <div className="grid grid-cols-2 gap-4 col-span-1 md:col-span-2">
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                University World Rank
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="Rank (e.g. 15)"
                {...register("universityWorldRank", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Subject Category
              </label>
              <select
                className="select select-bordered w-full font-normal"
                {...register("subjectCategory", { required: true })}
              >
                <option value="Agriculture">Agriculture</option>
                <option value="Engineering">Engineering</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Doctor">Doctor</option>
                <option value="Business">Business</option>
              </select>
            </div>
          </div>

          {/* Degree */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">Degree</label>
            <select
              className="select select-bordered w-full font-normal"
              {...register("degree", { required: true })}
            >
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          {/* Deadline */}
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Application Deadline
            </label>
            <div className="relative">
              <input
                type="date"
                className="input input-bordered w-full pl-10"
                {...register("applicationDeadline", { required: true })}
              />
              <FaCalendarAlt className="absolute left-3 top-4 text-gray-400" />
            </div>
          </div>

          {/* Fees Grid */}
          <div className="grid grid-cols-3 gap-3 col-span-1 md:col-span-2">
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Tuition ($)
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("tuitionFees", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                App Fee ($)
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("applicationFees", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Service ($)
              </label>
              <input
                type="number"
                className="input input-bordered w-full"
                {...register("serviceCharge", { required: true })}
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="form-control col-span-1 md:col-span-2">
            <label className="label font-semibold text-gray-700">
              University Image
            </label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <FaImage className="text-3xl text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">
                    Click to upload university banner
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  {...register("universityImage", { required: true })}
                />
              </label>
            </div>
          </div>

          {/* Description */}
          <div className="form-control col-span-1 md:col-span-2">
            <label className="label font-semibold text-gray-700">
              Scholarship Description
            </label>
            <textarea
              className="textarea textarea-bordered h-32 text-base md:w-[450px]"
              placeholder="Tell us more about this scholarship opportunity..."
              {...register("description", { required: true })}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="btn btn-primary btn-lg px-12 text-white shadow-lg shadow-primary/30"
          >
            Publish Scholarship
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddScholarship;
