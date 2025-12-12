import React from "react";
import { FaDollarSign, FaGraduationCap, FaMapMarkerAlt } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";

const ScholarshipCard = () => {
  return (
    <div className="card w-80 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* 1. University Image - Positioned at the top */}
      <figure className="px-10 pt-10">
        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/50 flex items-center justify-center">
          <img
            src={"universityImage"}
            alt={`${"universityName"} logo`}
            className="object-cover w-full h-full"
          />
        </div>
      </figure>

      <div className="card-body items-center text-center p-6">
        {/* 2. University Name */}
        <h2 className="card-title text-xl font-bold text-gray-800">
          {"universityName"}
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
            <span>{location}</span>
          </div>

          <hr className="my-2 border-gray-100" />

          {/* 5. Application Fees */}
          <div className="flex items-center justify-center gap-2">
            <FaDollarSign className="text-lg text-gray-500" />
            <span className="text-base font-medium text-gray-700">
              Application Fee:
            </span>
            <div className={`badge ${"badgeColor"} text-white font-bold p-3`}>
              {"applicationFee"}
            </div>
          </div>
        </div>

        {/* 6. View Details Button */}
        <div className="card-actions w-full mt-6">
          <button
            className="btn btn-primary w-full text-base"
            onClick={"onViewDetails"}
          >
            <IoEyeSharp className="text-xl" />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
