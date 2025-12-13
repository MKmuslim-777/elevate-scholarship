import React from "react";
import { FaDollarSign, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  return (
    <div className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* 1. University Image - Positioned at the top */}
      <figure className="px-10 pt-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/50 flex items-center justify-center">
          <img
            src={scholarship.university_image}
            alt={`${scholarship.scholarship_name} logo`}
            className="object-cover w-full h-full"
          />
        </div>
      </figure>

      <div className="card-body items-center text-center p-6">
        {/* 2. University Name */}
        <h2 className="card-title text-xl font-bold text-gray-800">
          {scholarship.scholarship_name}
        </h2>

        <div className="w-full space-y-3 mt-2">
          {/* 3. Scholarship Category */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <FaGraduationCap className="text-primary text-lg" />
            <span className="font-semibold">{"category"}</span>
          </div>

          {/* 4. Location */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <FaMapMarkerAlt className="text-secondary text-lg" />
            <span>{scholarship.location}</span>
          </div>

          <hr className="my-2 border-gray-100" />

          {/* 5. Application Fees */}
          <div className="flex items-center justify-center gap-2">
            <FaDollarSign className="text-lg text-gray-500" />
            <span className="text-base font-medium text-gray-700">
              Application Fee:
            </span>
            <div className={`badge ${"badgeColor"} text-primary font-bold p-3`}>
              {scholarship.application_fees}
            </div>
          </div>
        </div>

        {/* 6. View Details Button */}
        <div className="card-actions w-full mt-6">
          <Link
            to={`/scholarships/details/${scholarship._id}`}
            className="btn btn-primary w-full text-base-100"
            onClick={"onViewDetails"}
          >
            <IoEyeSharp className="text-xl" />
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
