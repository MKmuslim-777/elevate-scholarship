import { Link } from "react-router";
import ScholarshipCard from "../TopScholarships/ScholarshipCard";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Shared/Loading/Loading";
import { FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2"; // FaSparkles এর বদলে আধুনিক বিকল্প
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
    // bg-white (লাইট) এবং dark:bg-slate-950 (ডার্ক) মোড সেট করা হয়েছে
    <div className="relative py-24 transition-colors duration-500 bg-white dark:bg-slate-950 overflow-hidden">
      {/* ডার্ক মোডে সুন্দর দেখানোর জন্য গ্লোয়িং ব্যাকগ্রাউন্ড ডেকোরেশন */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-[100px] -z-10 translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-100/30 dark:bg-indigo-900/10 rounded-full blur-[80px] -z-10 -translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 lg:px-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-primary dark:text-blue-400 font-bold text-xs uppercase tracking-[0.2em]">
              <HiSparkles className="animate-pulse" />
              Best Opportunities
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
              Recently Added <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/80 dark:from-blue-500 dark:to-blue-400">
                Scholarships
              </span>
            </h2>
          </motion.div>

          <Link
            to={"/all-scholarships"}
            className="group flex items-center gap-3 bg-white dark:bg-slate-900 border-2 border-primary dark:border-blue-500 text-primary dark:text-blue-400 px-8 py-4 rounded-2xl font-bold hover:bg-primary dark:hover:bg-blue-600 hover:text-white dark:hover:text-white transition-all duration-300 shadow-xl shadow-blue-100 dark:shadow-none"
          >
            Explore All
            <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div>
          {scholarships.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {scholarships.slice(0, 8).map((scholarship) => (
                <motion.div
                  key={scholarship._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="h-full"
                >
                  <ScholarshipCard scholarship={scholarship} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-600 dark:text-slate-400">
                No scholarships posted yet.
              </h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentScholarships;
