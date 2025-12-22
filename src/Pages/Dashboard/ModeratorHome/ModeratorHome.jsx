import React from "react";
import {
  FaFileSignature,
  FaStar,
  FaPlusCircle,
  FaCheckCircle,
  FaEye,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";
import { Link } from "react-router";

const ModeratorHome = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Pending Applications
  const { data: applications = [], isLoading: appLoading } = useQuery({
    queryKey: ["pending-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/pending-applications?status=pending");
      return res.data;
    },
  });

  // Fetch Reviews
  const { data: reviews = [], isLoading: reviewLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-reviews`);
      return res.data;
    },
  });

  if (appLoading || reviewLoading) return <Loading />;

  return (
    <div className="p-6 lg:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-10">
        <h2 className="text-3xl font-black text-gray-800">
          Moderator <span className="text-primary italic">Dashboard</span>
        </h2>
        <p className="text-gray-500">
          Manage scholarship applications and student reviews efficiently.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <StatCard
          icon={<FaFileSignature className="text-blue-600" />}
          title="Pending Applications"
          count={applications.length}
          bgColor="bg-blue-50"
        />
        <StatCard
          icon={<FaStar className="text-amber-500" />}
          title="Student Reviews"
          count={reviews.length}
          bgColor="bg-amber-50"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Management</h3>
            <div className="space-y-4">
              <Link
                to="/dashboard/add-scholarship"
                className="flex items-center gap-3 w-full p-4 bg-primary text-white font-bold rounded-2xl hover:opacity-90 transition-all"
              >
                <FaPlusCircle /> Add Scholarship
              </Link>
              <Link
                to="/dashboard/manage-applied-applications"
                className="flex items-center gap-3 w-full p-4 bg-white text-gray-700 border border-gray-200 font-bold rounded-2xl hover:bg-gray-50 transition-all"
              >
                <FaCheckCircle className="text-green-500" /> Manage Applications
              </Link>
              <Link
                to="/dashboard/all-reviews"
                className="flex items-center gap-3 w-full p-4 bg-white text-gray-700 border border-gray-200 font-bold rounded-2xl hover:bg-gray-50 transition-all"
              >
                <FaStar className="text-amber-500" /> All Reviews
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Pending Table */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">
              Recent Pending Requests
            </h3>
            <Link
              to="/dashboard/manage-applied-applications"
              className="text-primary text-sm font-bold hover:underline"
            >
              View All
            </Link>
          </div>

          {applications.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr className="text-gray-400 uppercase text-xs">
                    <th>Student</th>
                    <th>Scholarship</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.slice(0, 5).map((app) => (
                    <tr
                      key={app._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="font-medium text-gray-700">
                        {app.userName}
                      </td>
                      <td className="text-gray-500">{app.scholarshipName}</td>
                      <td>
                        <Link to="/dashboard/manage-applied-applications">
                          <button className="btn btn-ghost btn-xs text-primary">
                            <FaEye /> Details
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-10 text-gray-400">
              No pending applications found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, count, bgColor }) => (
  <div className="p-6 rounded-3xl shadow-sm border border-gray-100 bg-white hover:shadow-md transition-shadow">
    <div
      className={`w-12 h-12 ${bgColor} rounded-2xl flex items-center justify-center text-xl mb-4`}
    >
      {icon}
    </div>
    <p className="text-gray-500 font-medium text-sm uppercase tracking-wider">
      {title}
    </p>
    <h4 className="text-3xl font-black text-gray-800 mt-1">{count}</h4>
  </div>
);

export default ModeratorHome;
