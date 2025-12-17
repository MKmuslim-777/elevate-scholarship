import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaTrashAlt,
  FaUsersCog,
  FaUserShield,
  FaUserEdit,
} from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [filter, setFilter] = useState("");

  const {
    data: users = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["users", filter],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?filter=${filter}`);
      return res.data;
    },
  });

  const handleUpdateRole = (user, newRole) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user.name} a ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, update it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/${user._id}/role`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire(
                "Updated!",
                `${user.name} is now a ${newRole}.`,
                "success"
              );
            }
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone!",
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/users/${user._id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-screen">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <FaUsersCog className="text-primary" /> User Management
          </h2>
          <p className="text-gray-500 mt-1">
            Manage and assign roles to all platform users.
          </p>
        </div>

        <div className="join w-full md:w-auto">
          {/* <select
            className="select select-bordered join-item focus:outline-none"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select> */}
          <input
            onChange={(e) => setFilter(e.target.value)}
            className="input input-bordered join-item w-full"
            placeholder="Search user..."
          />
          <button className="btn rounded-br-md rounded-tr-md">Search</button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-slate-50 text-gray-700 text-sm uppercase">
            <tr>
              <th>#</th>
              <th>User Info</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Manage Roles</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6" className="text-center py-10">
                  <span className="loading loading-dots loading-lg text-primary"></span>
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-10 h-10 rounded-full">
                          <img src={user?.photoURL} alt="User" />
                        </div>
                      </div>
                      <div className="font-bold text-gray-800">
                        {user?.name}
                      </div>
                    </div>
                  </td>
                  <td className="text-gray-600">{user?.email}</td>
                  <td>
                    <span
                      className={`badge badge-sm font-semibold  p-3 ${
                        user.role === "admin"
                          ? "badge-primary text-white"
                          : user.role === "moderator"
                          ? "badge-secondary text-white"
                          : "badge-ghost"
                      }`}
                    >
                      {user.role || "User"}
                    </span>
                  </td>
                  <td className="text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleUpdateRole(user, "admin")}
                        className="btn btn-xs btn-outline btn-primary hover:text-white"
                        disabled={user.role === "admin"}
                        title="Make Admin"
                      >
                        Admin
                      </button>
                      <button
                        onClick={() => handleUpdateRole(user, "moderator")}
                        className="btn btn-xs btn-outline btn-secondary hover:text-white"
                        disabled={user.role === "moderator"}
                        title="Make Moderator"
                      >
                        Moderator
                      </button>
                    </div>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-sm text-error hover:bg-error/10"
                    >
                      <FaTrashAlt />
                    </button>
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

export default UserManagement;
