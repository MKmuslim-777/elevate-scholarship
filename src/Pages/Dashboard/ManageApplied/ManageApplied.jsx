import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaEye,
  FaCommentDots,
  FaTrashAlt,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";

const ManageApplied = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedApp, setSelectedApp] = useState(null);

  const {
    data: applications = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["all-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/allApplications`);
      return res.data;
    },
  });

  const handleUpdateStatus = async (id, status) => {
    console.log(id, status);

    const res = await axiosSecure.patch(`/applications/status/${id}`, {
      status,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Status: ${status}`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };
  const handleFeedbackSubmit = async (id, feedback) => {
    console.log(id, feedback);

    const res = await axiosSecure.patch(`/applications/feedback/${id}`, {
      feedback,
    });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Successfully submitted feedback!`,
        showConfirmButton: false,
        timer: 1000,
      });
    }
  };

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    document.getElementById("details_modal").showModal();
  };

  const handleFeedback = (app) => {
    setSelectedApp(app);
    document.getElementById("feedback_modal").showModal();
  };

  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-orange-100 text-orange-600 border-orange-200",
      processing: "bg-blue-100 text-blue-600 border-blue-200",
      completed: "bg-emerald-100 text-emerald-600 border-emerald-200",
      rejected: "bg-rose-100 text-rose-600 border-rose-200",
    };
    return (
      styles[status?.toLowerCase()] ||
      "bg-gray-100 text-gray-600 border-gray-200"
    );
  };

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">
              Manage Applications
            </h2>
            <p className="text-gray-500 font-medium">
              Review and process student scholarship submissions
            </p>
          </div>
          <div className="stats shadow bg-white border border-gray-100 rounded-2xl">
            <div className="stat px-8">
              <div className="stat-title text-xs uppercase font-bold text-gray-400">
                Total Apps
              </div>
              <div className="stat-value text-primary text-2xl">
                {applications.length}
              </div>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="table w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="py-6 px-6 text-gray-400 font-bold uppercase text-[10px] tracking-widest text-center">
                    #
                  </th>
                  <th className="py-6 px-6 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    Applicant & University
                  </th>
                  <th className="py-6 px-6 text-gray-400 font-bold uppercase text-[10px] tracking-widest text-center">
                    Feedback
                  </th>
                  <th className="py-6 px-6 text-gray-400 font-bold uppercase text-[10px] tracking-widest text-center">
                    Status
                  </th>
                  <th className="py-6 px-6 text-gray-400 font-bold uppercase text-[10px] tracking-widest text-center">
                    Payment
                  </th>
                  <th className="py-6 px-6 text-gray-400 font-bold uppercase text-[10px] tracking-widest text-right">
                    Update Actions
                  </th>
                </tr>
              </thead>
              <tbody className={``}>
                {applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className={` transition-all duration-300 ${
                      app.applicationStatus === "rejected"
                        ? "bg-red-100 hover:bg-red-300/50"
                        : "hover:bg-blue-50/30"
                    }`}
                  >
                    <td className="text-center font-mono text-gray-400 text-sm">
                      {index + 1}
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="font-bold text-xl text-gray-800">
                            {app.userName}
                          </div>
                          <div className="font-bold text-[16px] text-gray-600">
                            {app.userEmail}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <FaUniversity className="text-gray-300 text-2xl" />{" "}
                            {app.universityName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-500 text-xs italic line-clamp-2 max-w-[150px]">
                        {app.feedback ? (
                          `"${app.feedback}"`
                        ) : (
                          <button
                            onClick={() => handleFeedback(app)}
                            className="btn btn-sm"
                          >
                            Give Feedback
                          </button>
                        )}
                      </p>
                    </td>
                    <td className="text-center">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase border ${getStatusStyle(
                          app.applicationStatus
                        )}`}
                      >
                        {app.applicationStatus}
                      </span>
                    </td>
                    <td className="text-center">
                      <div
                        className={`badge badge-sm font-bold p-3 ${
                          app.paymentStatus === "paid"
                            ? "bg-green-500 text-white border-none"
                            : "bg-gray-200 text-gray-600 border-none"
                        }`}
                      >
                        {app.paymentStatus}
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex justify-end items-center gap-3">
                        <button
                          onClick={() => handleViewDetails(app)}
                          className="btn btn-ghost btn-sm text-gray-400 hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <FaEye size={16} />
                        </button>

                        <select
                          className="select select-bordered select-sm text-xs font-semibold focus:outline-none w-28"
                          // value={app.applicationStatus}
                          onChange={(e) =>
                            handleUpdateStatus(app._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="completed">Completed</option>
                        </select>
                        <button
                          onClick={() =>
                            handleUpdateStatus(app._id, "rejected")
                          }
                          title="Reject"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* --- REFINED DETAILS MODAL --- */}
      <dialog id="details_modal" className="modal">
        <div className="modal-box max-w-lg p-0 bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white">
            <div className="flex justify-between items-start">
              <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
                <FaInfoCircle size={28} />
              </div>
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost text-white">
                  ✕
                </button>
              </form>
            </div>
            <h3 className="text-2xl font-black mt-4">Application Details</h3>
            <p className="text-blue-100 text-sm opacity-80">
              Reference ID: {selectedApp?._id?.slice(-8)}
            </p>
          </div>

          <div className="p-8 grid grid-cols-2 gap-y-6 gap-x-4">
            <DetailItem
              label="Applicant Email"
              value={selectedApp?.userEmail}
            />
            <DetailItem
              label="Subject Category"
              value={selectedApp?.scholarshipCategory}
            />
            <DetailItem
              label="University"
              value={selectedApp?.universityName}
            />
            <DetailItem
              label="Degree"
              value={selectedApp?.degree || "Undergraduate"}
            />

            <div className="col-span-2 mt-2">
              <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black uppercase text-gray-400 tracking-tighter mb-1">
                  Moderator Feedback
                </p>
                <p className="text-gray-700 text-sm italic">
                  {selectedApp?.feedback || "No feedback provided yet."}
                </p>
              </div>
            </div>
          </div>

          <div className="modal-action p-6 bg-gray-50/50">
            <form method="dialog" className="w-full">
              <button className="btn btn-block bg-gray-900 text-white hover:bg-gray-800 rounded-xl border-none">
                Done
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <dialog
        id="feedback_modal"
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box p-0 overflow-hidden border-none shadow-2xl rounded-3xl bg-white">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <FaCommentDots size={24} />
              </div>
              <div>
                <h3 className="font-black text-xl tracking-tight uppercase">
                  Provide Feedback
                </h3>
                <p className="text-orange-100 text-xs font-medium opacity-80">
                  ID: {selectedApp?._id?.slice(-10)}...
                </p>
              </div>
            </div>
          </div>

          {/* Body Section */}
          <div className="p-8">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-bold text-gray-600">
                  Your Observations
                </span>
                <span className="label-text-alt text-gray-400">Required</span>
              </label>

              <textarea
                name="feedback"
                className="textarea textarea-bordered h-32 w-full bg-gray-50 border-gray-200 focus:border-orange-500 focus:ring-orange-500 rounded-2xl p-4 text-gray-700 transition-all text-sm"
                placeholder="Type the reason for approval or rejection here..."
              ></textarea>

              <div className="mt-4 p-4 bg-blue-50 rounded-xl flex items-start gap-3 border border-blue-100">
                <FaInfoCircle className="text-blue-500 mt-0.5" />
                <p className="text-[11px] text-blue-700 leading-relaxed font-medium">
                  This feedback will be visible to the applicant on their
                  dashboard. Please be clear and professional.
                </p>
              </div>
            </div>
          </div>

          {/* Footer / Actions */}
          <div className="modal-action p-6 pt-0 flex gap-3">
            <form method="dialog" className="flex-1">
              <button className="btn btn-block bg-gray-100 hover:bg-gray-200 text-gray-600 border-none rounded-xl font-bold uppercase text-xs tracking-widest">
                Cancel
              </button>
            </form>

            <button
              onClick={() => handleFeedbackSubmit()}
              className="btn flex-[2] bg-orange-600 hover:bg-orange-700 text-white border-none rounded-xl font-bold uppercase text-xs tracking-widest shadow-lg shadow-orange-200"
            >
              Send Feedback
            </button>
          </div>
        </div>

        {/* Backdrop click to close */}
        <form
          method="dialog"
          className="modal-backdrop bg-slate-900/40 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

// Small helper component for the Modal
const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">
      {label}
    </p>
    <p className="text-gray-800 font-bold text-sm truncate">{value || "N/A"}</p>
  </div>
);

export default ManageApplied;
