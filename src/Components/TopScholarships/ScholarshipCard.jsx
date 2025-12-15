import React from "react";
import { IoLocationOutline } from "react-icons/io5";

import { FaMoneyBillWave } from "react-icons/fa";
import { Link } from "react-router";

// Assume you would receive the scholarship data as a prop named 'scholarship'
const ScholarshipCard = ({ scholarship }) => {
  console.log(scholarship);
  const {
    universityImage,
    universityName,
    subjectCategory,
    applicationFees,
    universityCity,
    universityCountry,
    _id,
  } = scholarship;

  return (
    <div className="card w-96 bg-base-100 shadow-xl border border-gray-200 hover:shadow-2xl transition-shadow duration-300">
      <figure className="h-48 overflow-hidden">
        <img
          src={universityImage}
          alt={`${universityName} building`}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body p-6">
        <h2 className="card-title text-xl font-bold text-gray-800 mb-2">
          {universityName}
        </h2>

        <div className="badge badge-lg badge-primary text-white font-semibold mb-3">
          {subjectCategory}
        </div>

        <div className="grid grid-cols-2 gap-y-3 mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <IoLocationOutline className="text-lg text-primary" />
            <span>
              {universityCity} {universityCountry}
            </span>
          </div>

          <div className="flex items-center space-x-2 justify-end">
            <FaMoneyBillWave className="text-lg text-secondary" />
            <span className="font-semibold">{applicationFees}</span>
          </div>

          <div className="col-span-2">
            {/* You could add another piece of info here if needed */}
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <Link
            to={`/scholarships/details/${_id}`}
            className="btn btn-primary btn-block text-base-100"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;
