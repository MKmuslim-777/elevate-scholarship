import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import {
  FaEnvelope,
  FaUserShield,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const axiosSecure = useAxiosSecure();

  const { data: userInfo = {} } = useQuery({
    queryKey: ["users", user],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/profile?email=${user.email}`);
      return res.data;
    },
  });

  console.log(userInfo);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Banner Section */}
        <div className="h-32 bg-gradient-to-r from-primary to-blue-600"></div>

        <div className="px-8 pb-8">
          {/* Profile Image & Role Badge */}
          <div className="relative -top-12 flex flex-col md:flex-row md:items-end gap-6">
            <div className="avatar">
              <div className="w-32 h-32 rounded-2xl ring-4 ring-white shadow-lg">
                <img src={userInfo?.photoURL} alt="Profile" />
              </div>
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-black text-gray-800">
                {userInfo?.displayName}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="badge badge-primary font-bold uppercase tracking-wider p-3 text-base-100">
                  {userInfo?.role}
                </span>
                {role === "admin" && (
                  <span className="text-gray-400 text-sm">
                    Verified ScholarStream Account
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* User Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
            {/* Left Column: Contact Info */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
                  <FaEnvelope className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Email Address
                  </p>
                  <p className="text-gray-700 font-medium">{userInfo?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="p-3 bg-purple-100 text-purple-600 rounded-xl">
                  <FaUserShield className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Account Type
                  </p>
                  <p className="text-gray-700 font-medium capitalize">
                    {role} Access
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Timestamps */}
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="p-3 bg-green-100 text-green-600 rounded-xl">
                  <FaCalendarAlt className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Joined On
                  </p>
                  <p className="text-gray-700 font-medium">
                    {/* Assuming data comes from the DB structure you shared */}
                    {formatDate(userInfo?.createdAt)}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl">
                <div className="p-3 bg-amber-100 text-amber-600 rounded-xl">
                  <FaClock className="text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Last Updated
                  </p>
                  <p className="text-gray-700 font-medium">
                    {formatDate(userInfo?.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Section */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-400">
              User ID:{" "}
              <span className="font-mono text-xs">{userInfo?._id}</span>
            </p>
            {/* <button className="btn btn-primary rounded-xl px-8 shadow-lg shadow-primary/20 text-base-100">
              Edit Profile
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
