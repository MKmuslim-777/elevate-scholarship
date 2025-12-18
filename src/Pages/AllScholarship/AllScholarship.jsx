import React, { useState } from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../../Components/TopScholarships/ScholarshipCard";
import { FiSearch } from "react-icons/fi";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";

const AllScholarship = () => {
  const axios = useAxios();
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

  refetch();

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Explore All Scholarships
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover opportunities that match your academic goals. Use the search
          bar below to find scholarships by name, university, or degree.
        </p>
      </div>

      {/* Search Bar  */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400 group-focus-within:text-primary transition-colors text-xl" />
          </div>
          <input
            type="text"
            placeholder="Search by name, university, scholarship or Degree..."
            className="input input-bordered w-full pl-12 h-14 rounded-full shadow-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
            onChange={(e) => setFilter(e.target.value)}
          />
          <button className="btn btn-primary absolute z-10 text-base-100 right-2 top-2 rounded-full px-6">
            Search
          </button>
        </div>
      </div>

      {/* Scholarships Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          {/* <span className="loading loading-spinner loading-lg text-primary"></span> */}
          <Loading></Loading>
        </div>
      ) : (
        <>
          {scholarships.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {scholarships.map((scholarship) => (
                <div
                  key={scholarship._id}
                  className="hover:scale-[1.02] transition-transform duration-300"
                >
                  <ScholarshipCard scholarship={scholarship} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-400 italic">
                No scholarships found matching your search.
              </h3>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllScholarship;
