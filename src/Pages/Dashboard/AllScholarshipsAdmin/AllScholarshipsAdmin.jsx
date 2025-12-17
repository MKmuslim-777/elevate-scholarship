import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { HiEye, HiPencilAlt, HiTrash, HiSearch } from "react-icons/hi";
import Swal from "sweetalert2";

const AllScholarshipsAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");

  const {
    data: scholarships = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships?filter=${filter}`);
      return res.data;
    },
  });

  const handleDeleteScholarship = (scholarship) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/scholarships/${scholarship._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Scholarship has been deleted.", "success");
          }
        });
      }
    });
  };

  refetch();

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-screen">
      {/* Header & Search Area */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Total{" "}
            <span className="text-primary font-extrabold">Scholarships</span>
          </h2>
          <p className="text-gray-500 mt-1">
            Manage and monitor all scholarships posted on the platform.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full lg:w-auto">
          {/* Search Input Field */}
          <div className="relative w-full md:w-80">
            <HiSearch className="absolute z-10 left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Search by University or Name..."
              className="input input-bordered w-full pl-10 focus:outline-primary border-gray-300"
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          {/* Stats Badge */}
          <div className="stats shadow bg-primary text-white hidden md:flex">
            <div className="stat px-6 py-2 flex flex-col items-center justify-center">
              <div className="stat-title text-white text-xs font-medium">
                Found
              </div>
              <div className="stat-value text-2xl">{scholarships.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-50">
            <tr className="text-gray-700 uppercase text-xs">
              <th className="py-4">SL</th>
              <th>Scholarship & University</th>
              <th>Subject & Degree</th>
              <th>Fees</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="5" className="text-center py-20">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                </td>
              </tr>
            ) : scholarships.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-20 text-gray-400 font-medium"
                >
                  No scholarships found matching your search.
                </td>
              </tr>
            ) : (
              scholarships.map((scholarship, index) => (
                <tr
                  key={scholarship._id}
                  className="hover:bg-blue-50/30 transition-colors"
                >
                  <th className="font-medium text-gray-500">{index + 1}</th>
                  <td>
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 leading-tight">
                        {scholarship.scholarshipName}
                      </span>
                      <span className="text-sm text-gray-500 font-semibold italic">
                        {scholarship.universityName}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="flex flex-col">
                      <span className="badge badge-outline badge-primary badge-sm font-semibold mb-1">
                        {scholarship.subjectCategory}
                      </span>
                      <span className="text-sm font-medium text-gray-600">
                        {scholarship.degree}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <p>
                        <span className="text-gray-400 font-bold uppercase text-[10px]">
                          App:
                        </span>{" "}
                        ${scholarship.applicationFees}
                      </p>
                      <p>
                        <span className="text-gray-400 font-bold uppercase text-[10px]">
                          Service:
                        </span>{" "}
                        ${scholarship.serviceCharge}
                      </p>
                    </div>
                  </td>
                  <td>
                    <div className="flex justify-center items-center gap-2">
                      <Link
                        to={`/scholarships/details/${scholarship._id}`}
                        className="btn btn-circle btn-ghost btn-sm text-blue-600 hover:bg-blue-100"
                        title="View Details"
                      >
                        <HiEye className="text-xl" />
                      </Link>

                      <Link
                        to={`/dashboard/update-scholarship/${scholarship._id}`}
                        className="btn btn-circle btn-ghost btn-sm text-yellow-600 hover:bg-yellow-100"
                        title="Edit Scholarship"
                      >
                        <HiPencilAlt className="text-xl" />
                      </Link>

                      <button
                        onClick={() => handleDeleteScholarship(scholarship)}
                        className="btn btn-circle btn-ghost btn-sm text-red-600 hover:bg-red-100"
                        title="Delete Scholarship"
                      >
                        <HiTrash className="text-xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllScholarshipsAdmin;
