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
    <div className="group card w-full max-w-[400px] mx-auto bg-white dark:bg-slate-900 shadow-md dark:shadow-2xl border border-gray-100 dark:border-slate-800 hover:shadow-2xl dark:hover:shadow-blue-900/20 transition-all duration-500 rounded-3xl overflow-hidden">
      {/* Image Section */}
      <figure className="relative h-52 md:h-56 overflow-hidden">
        <img
          src={universityImage}
          alt={`${universityName}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-primary dark:bg-blue-600 text-white text-[10px] uppercase tracking-widest font-black py-1.5 px-4 rounded-full shadow-lg">
            {subjectCategory}
          </span>
        </div>
        {/* Image Overlay for Dark Mode */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </figure>

      {/* Card Body */}
      <div className="card-body p-6 space-y-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 line-clamp-1 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
            {universityName}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium truncate mt-1">
            {scholarshipName || "International Excellence Grant"}
          </p>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 pt-2">
          {/* Location */}
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 text-primary dark:text-blue-400">
              <IoLocationOutline size={18} />
            </div>
            <span className="text-sm font-medium">
              {universityCity}, {universityCountry}
            </span>
          </div>

          {/* Application Fee Box */}
          <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-2">
              <FaMoneyBillWave className="text-secondary dark:text-emerald-400 text-lg" />
              <span className="text-slate-500 dark:text-slate-400 uppercase text-[10px] font-bold tracking-widest">
                App Fees
              </span>
            </div>
            <span className="font-black text-slate-800 dark:text-white text-xl">
              ${applicationFees}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="card-actions pt-4">
          <Link
            to={`/scholarships/details/${_id}`}
            className="group/btn flex items-center justify-center w-full gap-3 bg-primary dark:bg-blue-600 hover:bg-slate-900 dark:hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 dark:shadow-blue-900/20"
          >
            Details
            <FaArrowRight className="text-sm transition-transform group-hover/btn:translate-x-2" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
