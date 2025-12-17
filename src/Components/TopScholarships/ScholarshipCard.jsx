import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { FaMoneyBillWave, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const ScholarshipCard = ({ scholarship }) => {
  const {
    universityImage,
    universityName,
    scholarshipName,
    subjectCategory,
    applicationFees,
    universityCity,
    universityCountry,
    _id,
  } = scholarship;

  return (
    <div className="group card w-full max-w-[400px] mx-auto bg-base-100 shadow-md border border-gray-100 hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden">
      {/* Image Section with Overlay Effect */}
      <figure className="relative h-56 overflow-hidden">
        <img
          src={universityImage}
          alt={`${universityName}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="badge badge-primary border-none text-white font-bold py-3 px-4 shadow-lg capitalize">
            {subjectCategory}
          </span>
        </div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-5 md:p-6">
        <h2 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-primary transition-colors">
          {universityName}
        </h2>

        {/* Scholarship Name placeholder if available */}
        <p className="text-sm text-gray-500 font-medium mb-2 truncate">
          {scholarshipName || "International Excellence Grant"}
        </p>

        {/* Info Grid */}
        <div className="flex flex-col gap-3 mt-2 text-sm text-gray-600">
          <div className="flex items-start space-x-2">
            <IoLocationOutline className="text-lg text-primary shrink-0 mt-0.5" />
            <span className="leading-tight">
              {universityCity}, {universityCountry}
            </span>
          </div>

          <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-dashed border-slate-200">
            <div className="flex items-center space-x-2">
              <FaMoneyBillWave className="text-lg text-secondary" />
              <span className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                Application Fees
              </span>
            </div>
            <span className="font-bold text-gray-800 text-lg">
              ${applicationFees}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-actions mt-6">
          <Link
            to={`/scholarships/details/${_id}`}
            className="btn btn-primary w-full text-white rounded-xl shadow-md hover:shadow-primary/30 gap-2 border-none"
          >
            Details
            <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
