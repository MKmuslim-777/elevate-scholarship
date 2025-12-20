import React from "react";
import useAuth from "../../../Hooks/useAuth";
import {
  FaUsers,
  FaUniversity,
  FaFileUpload,
  FaWallet,
  FaArrowUp,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";

const AdminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // For total students
  const {
    studentLoading,
    data: students = [],
    refetch,
  } = useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-students?role=student`);
      return res.data;
    },
  });
  const { applicationLoading, data: applications = [] } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/total-applications`);
      return res.data;
    },
  });
  const { scholarshipLoading, data: scholarships = [] } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/scholarships`);
      return res.data;
    },
  });

  if (studentLoading || applicationLoading || scholarshipLoading) {
    return <Loading></Loading>;
  }

  refetch();

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen font-sans">
      {/* Top Navigation Row (UI ONLY) */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Dashboard{" "}
            <span className="text-slate-400 font-light text-xl ml-2">
              Overview
            </span>
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Welcome back, {user?.displayName || "Admin"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="btn btn-circle btn-ghost bg-white shadow-sm border border-slate-200">
            <FaBell className="text-slate-500" />
          </button>
          <div className="flex items-center gap-3 bg-white p-2 pr-5 rounded-full shadow-sm border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
              {user?.displayName?.charAt(0) || "A"}
            </div>
            <span className="font-bold text-slate-700 text-sm hidden md:block">
              Administrator
            </span>
          </div>
        </div>
      </div>

      {/* Grid for Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <StatCard
          label="Total Students"
          value={students.length}
          icon={<FaUsers />}
          color="blue"
          // percent="12%"
        />
        <StatCard
          label="Total Applications"
          value={applications.length}
          icon={<FaFileUpload />}
          color="purple"
          // percent="8%"
        />
        <StatCard
          label="Active Scholarships"
          value={scholarships.length}
          icon={<FaUniversity />}
          color="orange"
          // percent="5%"
        />
        {/* <StatCard
          label="Total Revenue"
          value="$24,500"
          icon={<FaWallet />}
          color="emerald"
          // percent="15%"
        /> */}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Card (UI Chart Placeholder) */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-10">
            <h4 className="text-xl font-bold text-slate-800">
              Application Performance
            </h4>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-lg uppercase">
                Monthly
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-lg uppercase">
                Yearly
              </span>
            </div>
          </div>

          {/* Abstract Graphic Bars (UI DESIGN) */}
          <div className="flex items-end justify-between h-48 gap-3 mt-10">
            {[40, 70, 45, 90, 65, 80, 50, 95, 60, 85, 40, 75].map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-slate-100 rounded-t-xl group relative cursor-pointer"
              >
                <div
                  style={{ height: `${h}%` }}
                  className="bg-primary/20 group-hover:bg-primary transition-all duration-300 rounded-t-xl"
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">
            <span>Jan</span>
            <span>Mar</span>
            <span>May</span>
            <span>Jul</span>
            <span>Sep</span>
            <span>Nov</span>
          </div>
        </div>

        {/* Calendar / Schedule UI */}
        <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
          <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <FaCalendarAlt className="text-slate-400" /> Recent Updates
          </h4>
          <div className="space-y-6">
            <ActivityItem
              title="New Application"
              time="2 mins ago"
              desc="Sarah Jenkins applied for Oxford"
            />
            <ActivityItem
              title="Payment Received"
              time="45 mins ago"
              desc="Transaction ID #99281 was successful"
            />
            <ActivityItem
              title="University Added"
              time="2 hours ago"
              desc="New partner: Stanford University"
            />
            <ActivityItem
              title="Feedback Sent"
              time="5 hours ago"
              desc="Moderator reviewed 12 applications"
            />
          </div>
          <button className="btn btn-block mt-8 bg-slate-900 hover:bg-black text-white rounded-2xl border-none">
            View All Reports
          </button>
        </div>
      </div>
    </div>
  );
};

// UI Components for the design
const StatCard = ({ label, value, icon, color, percent }) => {
  const colors = {
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-600",
    emerald: "bg-emerald-500",
  };
  return (
    <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 transition-all hover:shadow-md group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`${colors[color]} p-4 rounded-2xl text-white text-xl shadow-lg shadow-${color}-200`}
        >
          {icon}
        </div>
        <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
          <FaArrowUp size={8} /> {percent}
        </div>
      </div>
      <p className="text-xs font-black text-slate-400 uppercase tracking-widest">
        {label}
      </p>
      <h3 className="text-2xl font-black text-slate-800 mt-1">{value}</h3>
    </div>
  );
};

const ActivityItem = ({ title, time, desc }) => (
  <div className="relative pl-6 border-l-2 border-slate-100 py-1">
    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7.5px] top-2 ring-4 ring-white"></div>
    <div className="flex justify-between items-center mb-1">
      <h5 className="font-bold text-sm text-slate-800">{title}</h5>
      <span className="text-[10px] font-bold text-slate-400">{time}</span>
    </div>
    <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
  </div>
);

export default AdminHome;
