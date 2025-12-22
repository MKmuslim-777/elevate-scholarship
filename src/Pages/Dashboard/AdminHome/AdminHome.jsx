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
import ChartAdmin from "./ChartAdmin/ChartAdmin";

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
          {/* <button className="btn btn-circle btn-ghost bg-white shadow-sm border border-slate-200">
            <FaBell className="text-slate-500" />
          </button> */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {/* Total Students */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 transition-all hover:shadow-md group">
          <div className="flex justify-between items-center">
            <div className="bg-blue-500 p-4 rounded-2xl shadow-lg shadow-blue-200">
              <FaUsers className=" text-white text-xl " />
            </div>
            <div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
                <FaArrowUp size={8} /> {students.length / 100}%
              </div>
            </div>
          </div>
          <p className="text-xs mt-3.5 font-black text-slate-400 uppercase tracking-widest">
            Total Students
          </p>
          <h3 className="text-2xl font-black text-slate-800 mt-1">
            {students.length}
          </h3>
        </div>

        {/* Total Applications */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 transition-all hover:shadow-md group">
          <div className="flex justify-between items-center">
            <div className="bg-purple-500 p-4 rounded-2xl shadow-lg shadow-purple-200">
              <FaFileUpload className=" text-white text-xl " />
            </div>
            <div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
                <FaArrowUp size={8} /> {applications.length / 100}%
              </div>
            </div>
          </div>
          <p className="text-xs mt-3.5 font-black text-slate-400 uppercase tracking-widest">
            Total Applications
          </p>
          <h3 className="text-2xl font-black text-slate-800 mt-1">
            {applications.length}
          </h3>
        </div>
        {/* Active Scholarships */}
        <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-200 transition-all hover:shadow-md group">
          <div className="flex justify-between items-center">
            <div className="bg-orange-600 p-4 rounded-2xl shadow-lg shadow-orange-200">
              <FaUniversity className=" text-white text-xl " />
            </div>
            <div>
              <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs bg-emerald-50 px-2 py-1 rounded-lg">
                <FaArrowUp size={8} /> {scholarships.length / 100}%
              </div>
            </div>
          </div>
          <p className="text-xs mt-3.5 font-black text-slate-400 uppercase tracking-widest">
            Active Scholarships
          </p>
          <h3 className="text-2xl font-black text-slate-800 mt-1">
            {scholarships.length}
          </h3>
        </div>
      </div>

      {/* <ChartAdmin
        applications={applications}
        scholarships={scholarships}
      ></ChartAdmin> */}
    </div>
  );
};

export default AdminHome;
