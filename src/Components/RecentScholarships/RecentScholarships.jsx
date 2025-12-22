import { Link } from "react-router";
import ScholarshipCard from "../TopScholarships/ScholarshipCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

const RecentScholarships = () => {
  const axiosSecure = useAxiosSecure();

  const { data: scholarships = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/recent-scholarships");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="py-20  from-white to-blue-50/30">
      <div className="container mx-auto px-4 lg:px-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
              <span className="w-8 h-[2px] bg-primary inline-block"></span>
              Best Opportunities
            </div>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-800 tracking-tight leading-tight">
              Recently Published <br />
              <span className="text-primary italic">Scholarships</span>
            </h2>
          </div>

          <motion.button whileTap={{ scale: 0.9 }} className="">
            <Link
              to={"/all-scholarships"}
              className="group flex items-center  gap-3 bg-white border-2 border-primary text-primary px-6 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition-all duration-300 shadow-lg shadow-blue-100"
            >
              Explore All
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.button>
        </div>

        {/* Cards Grid */}
        <div>
          {scholarships.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarships.slice(0, 6).map((scholarship) => (
                <div
                  key={scholarship._id}
                  className="transform hover:-translate-y-2 transition-all duration-500"
                >
                  <ScholarshipCard scholarship={scholarship} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100 shadow-inner">
              <div className="max-w-xs mx-auto opacity-40">
                <svg
                  className="w-20 h-20 mx-auto mb-4 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.172 9.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="text-xl font-bold text-gray-600">
                  No scholarships posted yet.
                </h3>
                <p className="text-sm text-gray-400 mt-2">
                  Check back later for new opportunities!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentScholarships;
