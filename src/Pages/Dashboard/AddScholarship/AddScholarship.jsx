import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AddScholarship = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleScholarshipSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="container">
      <h1 className="text-2xl md:text-5xl text-primary font-bold my-10">
        AddScholarship
      </h1>

      <form onSubmit={handleSubmit(handleScholarshipSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {/* Scholarship Name */}
          <fieldset className="fieldset ">
            <label className="label">Scholarship Name</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="Scholarship Name"
              {...register("scholarshipName", { required: true })}
            />
            {errors.scholarshipName?.type === "required" && (
              <p className="text-red-500">Scholarship Name is Required.</p>
            )}
          </fieldset>
          {/* University Name */}
          <fieldset className="fieldset ">
            <label className="label">University Name</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="University Name"
              {...register("universityName", { required: true })}
            />
            {errors.universityName?.type === "required" && (
              <p className="text-red-500">University Name is Required.</p>
            )}
          </fieldset>
          {/* University Country */}
          <fieldset className="fieldset ">
            <label className="label">University Country</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="University Country"
              {...register("universityCountry", { required: true })}
            />
            {errors.universityCountry?.type === "required" && (
              <p className="text-red-500">University Country is Required.</p>
            )}
          </fieldset>
          {/* University City */}
          <fieldset className="fieldset ">
            <label className="label">University City</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="University City"
              {...register("universityCity", { required: true })}
            />
            {errors.universityCity?.type === "required" && (
              <p className="text-red-500">University City is Required.</p>
            )}
          </fieldset>
          {/* University World Rank */}
          <fieldset className="fieldset ">
            <label className="label">University World Rank</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="University World Rank"
              {...register("universityWorldRank", { required: true })}
            />
            {errors.universityWorldRank?.type === "required" && (
              <p className="text-red-500">university World Rank is Required.</p>
            )}
          </fieldset>
          {/* Subject Category */}
          <fieldset className="fieldset ">
            <label className="label">Subject Category</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="Subject category"
              {...register("subjectCategory", { required: true })}
            />
            {errors.subjectCategory?.type === "required" && (
              <p className="text-red-500">subject Category is Required.</p>
            )}
          </fieldset>
          {/* Degree */}
          <fieldset className="fieldset ">
            <label className="label">Degree</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="Degree"
              {...register("degree", { required: true })}
            />
            {errors.degree?.type === "required" && (
              <p className="text-red-500">Degree is Required.</p>
            )}
          </fieldset>
          {/* Tuition fees */}
          <fieldset className="fieldset ">
            <label className="label">Tuition Fees</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="Tuition Fees"
              {...register("tuitionFees", { required: true })}
            />
            {errors.tuitionFees?.type === "required" && (
              <p className="text-red-500">Tuition Fees is Required.</p>
            )}
          </fieldset>
          {/* Application fees */}
          <fieldset className="fieldset ">
            <label className="label">Application Fees</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="Application Fees"
              {...register("applicationFees", { required: true })}
            />
            {errors.applicationFees?.type === "required" && (
              <p className="text-red-500">Application Fees is Required.</p>
            )}
          </fieldset>
          {/* Service Charge */}
          <fieldset className="fieldset ">
            <label className="label">Service Charge</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="Service Charge"
              {...register("serviceCharge", { required: true })}
            />
            {errors.serviceCharge?.type === "required" && (
              <p className="text-red-500">Service Charge is Required.</p>
            )}
          </fieldset>
          {/* Application Deadline */}
          <fieldset className="fieldset ">
            <label className="label">Application Deadline</label>
            <input
              type="date"
              className="input bg-transparent text-primary w-full"
              placeholder="Application Deadline"
              {...register("applicationDeadline", { required: true })}
            />
            {errors.applicationDeadline?.type === "required" && (
              <p className="text-red-500">Application Dead line is Required.</p>
            )}
          </fieldset>
          {/* Posted User Email */}
          <fieldset className="fieldset ">
            <label className="label">Posted User Email</label>
            <input
              type="text"
              className="input bg-transparent text-primary w-full"
              placeholder="Posted User Email"
              defaultValue={user.email}
              {...register("postedUserEmail", { required: true })}
            />
            {errors.postedUserEmail?.type === "required" && (
              <p className="text-red-500">Posted User Email is Required.</p>
            )}
          </fieldset>

          {/* University Image */}
          <fieldset className="fieldset ">
            <label className="label">University Image</label>
            <input
              type="file"
              {...register("universityImage", { required: true })}
              className="file-input "
              placeholder="Upload University Image"
            />
            {errors.universityImage?.type === "required" && (
              <p className="text-red-500">
                University Image is must be Required.
              </p>
            )}
          </fieldset>
        </div>
        <button className="btn btn-primary text-white w-full ">Submit</button>
      </form>
    </div>
  );
};

export default AddScholarship;
