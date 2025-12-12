import React from "react";
// Import necessary icons from react-icons (adjust the specific library, e.g., 'fa' for Font Awesome)
import {
  FaGraduationCap,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaDollarSign,
} from "react-icons/fa";

const TopScholarships = () => {
  const scholarship = {
    title: "The Tech Innovator Grant",
    organization: "Global Tech Foundation",
    deadline: "October 31, 2026",
    awardAmount: "10,000",
    eligibility:
      "Students pursuing a degree in Computer Science or Engineering.",
    location: "Global / Online",
  };

  return (
    <div className="container mx-auto p-4">
      <div className="card shadow-xl bg-base-100 w-full max-w-lg mx-auto">
        <div className="card-body p-6">
          <div className="flex items-start justify-between mb-4">
            <h2 className="card-title text-2xl font-bold text-primary">
              <FaGraduationCap className="text-3xl mr-2" />
              {scholarship.title}
            </h2>

            {/* <div className="badge badge-lg badge-secondary font-semibold">
              STEM Focus
            </div> */}
          </div>

          <p className="text-lg text-gray-600 mb-4">
            {scholarship.organization}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-accent ">
              <FaDollarSign className="mr-3 text-xl" />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-black">Award</span>
                <span className="text-xl font-bold text-black">
                  ${scholarship.awardAmount}
                </span>
              </div>
            </div>

            <div className="flex items-center">
              <FaCalendarAlt className="mr-3 text-xl text-error" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Deadline</span>
                <span className="text-lg font-semibold">
                  {scholarship.deadline}
                </span>
              </div>
            </div>

            <div className="flex items-center col-span-1 md:col-span-2">
              <FaMapMarkerAlt className="mr-3 text-xl text-info" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Scope</span>
                <span className="text-lg">{scholarship.location}</span>
              </div>
            </div>
          </div>

          <div className="mb-6 border-l-4 border-l-warning pl-3 py-1">
            <p className="font-semibold text-gray-700">Eligibility Snippet:</p>
            <p className="text-sm text-gray-500 italic">
              {scholarship.eligibility}
            </p>
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-outline btn-primary hover:text-white w-full">
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopScholarships;
