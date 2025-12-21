import React, { useState } from "react"; // useState যোগ করা হয়েছে
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import {
  FaEdit,
  FaRegFileAlt,
  FaTrashAlt,
  FaUniversity,
  FaMapMarkerAlt,
  FaEye,
  FaCreditCard,
  FaInfoCircle,
  FaComment,
} from "react-icons/fa";
import Loading from "../../../Shared/Loading/Loading";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { MdOutlineRateReview } from "react-icons/md";
import { toast } from "react-toastify";

const MyApplications = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [selectedApp, setSelectedApp] = useState(null);
  const [rating, setRating] = useState(0);
  const [appInfo, setAppInfo] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const StarInput = ({ selected, onClick }) => (
    <svg
      onClick={onClick}
      className={`w-8 h-8 cursor-pointer transition duration-150 ${
        selected ? "text-yellow-500" : "text-gray-300 hover:text-yellow-400"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.09 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  const {
    isLoading,
    data: applications = [],
    refetch,
  } = useQuery({
    queryKey: ["applications", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/applications?email=${user.email}`);
      return res.data;
    },
  });

  const modal = document.getElementById("review_modal");

  const handleViewDetails = (app) => {
    setSelectedApp(app);
    document.getElementById("details_modal").showModal();
  };

  const handleApplicationDelete = (app) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#3b82f6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/applications/${app._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Application has been removed.", "success");
          }
        });
      }
    });
  };

  const handlePayment = async (app) => {
    console.log(app);
    const paymentInfo = {
      applicationFees: app.applicationFees,
      scholarshipId: app._id,
      studentEmail: user.email,
      scholarshipName: app.scholarshipName,
    };

    const res = await axiosSecure.post("/checkout-session", paymentInfo);
    // window.location.href = res.data.url;
    window.location.assign(res.data.url);
  };

  const handleSubmitReviews = (data) => {
    const reviewsInfo = {
      ratings: rating,
      reviewerPhoto: user.photoURL,
      reviewerEmail: user.email,
      reviewerName: user.displayName,
      reviewerComment: data.reviewerComment,
      scholarshipId: appInfo.scholarshipId,
      universityName: appInfo.universityName,
      scholarshipName: appInfo.scholarshipName,
    };

    // console.log(reviewsInfo);

    axiosSecure.post(`/reviews`, reviewsInfo).then((res) => {
      if (res.data.insertedId) {
        console.log(res);
        toast.success("Thanks for your experience!💚");
        const modal = document.getElementById("review_modal");
        if (modal) {
          modal.close();
        }
      }
    });
  };
  const handleReviewClick = (app) => {
    console.log("Review Form should open now.");
    modal.showModal();
    setAppInfo(app);
  };

  const getStatusStyle = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "processing":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-700 border-green-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            My Applications
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            View and track your scholarship journey.
          </p>
        </div>
        <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Applied
          </span>
          <span className="text-xl font-black text-primary">
            {applications.length}
          </span>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr className="text-gray-500 text-[11px] uppercase tracking-widest font-bold">
                <th className="py-5 px-6 text-center">SL</th>
                <th className="py-5 px-6">University & Category</th>
                <th className="py-5 px-6">Feedback</th>
                <th className="py-5 px-6 text-center">Fees</th>
                <th className="py-5 px-6 text-center">App Status</th>
                <th className="py-5 px-6 text-center">Payment</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="text-center py-20">
                    <Loading />
                  </td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-24 italic opacity-40"
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app, index) => (
                  <tr
                    key={app._id}
                    className="hover:bg-blue-50/20 transition-colors group"
                  >
                    <td className="text-center font-bold text-gray-300">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-gray-50 rounded-xl text-gray-400 group-hover:text-primary transition-all">
                          <FaUniversity size={18} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 leading-tight">
                            {app.universityName}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-[11px] text-gray-400">
                            <span className="text-primary font-bold uppercase">
                              {app.scholarshipCategory}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt size={10} />{" "}
                              {app.universityAddress?.universityCity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-500 text-xs  max-w-[150px]">
                        {app.feedback ? `"${app.feedback}"` : "No feedback"}
                      </p>
                    </td>
                    <td className="py-4 px-6 text-center font-bold text-gray-700">
                      ${app.applicationFees}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(
                          app.applicationStatus
                        )}`}
                      >
                        {app.applicationStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      {app.paymentStatus === "unpaid" ? (
                        <button
                          onClick={() => handlePayment(app)}
                          className="flex items-center gap-2 mx-auto px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold uppercase rounded-lg hover:bg-primary transition-all"
                        >
                          <FaCreditCard /> Pay Now
                        </button>
                      ) : (
                        <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-500 text-white tracking-wider">
                          Paid
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end items-center gap-2">
                        <button
                          onClick={() => handleViewDetails(app)}
                          className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all shadow-sm"
                        >
                          <FaEye size={14} />
                        </button>
                        {app.applicationStatus === "pending" && (
                          <>
                            <button className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                              <FaEdit size={14} />
                            </button>
                            <button
                              onClick={() => handleApplicationDelete(app)}
                              className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                            >
                              <FaTrashAlt size={14} />
                            </button>
                          </>
                        )}
                        {app.applicationStatus === "completed" && (
                          <>
                            <button
                              onClick={() => handleReviewClick(app)}
                              className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                            >
                              <FaComment />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- SINGLE MODAL OUTSIDE THE LOOP --- */}
      <dialog id="details_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-2xl bg-white p-0 overflow-hidden">
          <div className="bg-primary p-6 text-white flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <FaInfoCircle size={24} />
            </div>
            <div>
              <h3 className="font-black text-xl tracking-tight uppercase">
                Application Insights
              </h3>
              <p className="text-white/70 text-sm font-medium">
                Detailed view of your submission
              </p>
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Scholarship Name
                </label>
                <p className="text-gray-800 font-semibold mt-1">
                  {selectedApp?.universityName || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Subject Category
                </label>
                <p className="text-gray-800 font-semibold mt-1">
                  {selectedApp?.scholarshipCategory || "N/A"}
                </p>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  University
                </label>
                <p className="text-gray-800 font-semibold mt-1">
                  {selectedApp?.universityName}
                </p>
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest">
                  Applied Date
                </label>
                <p className="text-gray-800 font-semibold mt-1">
                  {new Date().toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-dashed border-gray-200">
              <label className="text-[10px] font-black uppercase text-gray-400 tracking-widest block mb-2">
                Admin Feedback
              </label>
              <p className="text-gray-600 italic text-sm">
                {selectedApp?.feedback
                  ? `"${selectedApp.feedback}"`
                  : "The administrator has not provided any feedback yet."}
              </p>
            </div>
          </div>

          <div className="modal-action p-6 pt-0">
            <form method="dialog">
              <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 font-black uppercase text-xs rounded-xl transition-all tracking-widest">
                Close Record
              </button>
            </form>
          </div>
        </div>
        <form
          method="dialog"
          className="modal-backdrop bg-black/40 backdrop-blur-sm"
        >
          <button>close</button>
        </form>
      </dialog>

      {/* Single modal for add review */}

      <dialog id="review_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box p-6 bg-base-100 shadow-2xl">
          <h3 className="font-bold text-2xl text-primary mb-4 border-b pb-2 flex items-center">
            {/* Review Icon */}
            <MdOutlineRateReview className="mr-2" />
            Submit Your Scholarship Review
          </h3>

          <p className="text-sm text-gray-500 mb-6">
            Share your experience to help future applicants!
          </p>

          {/* --- REVIEW FORM DESIGN START --- */}
          <form
            method="dialog"
            onSubmit={handleSubmit(handleSubmitReviews)}
            className="space-y-4"
          >
            {/* 1. Rating Field */}
            <div className="form-control">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Rating:
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((starValue) => (
                    <StarInput
                      key={starValue}
                      selected={starValue <= rating}
                      onClick={() => setRating(starValue)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Your Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Your Name
                </span>
              </label>
              <input
                type="text"
                {...register("reviewerName", { required: true })}
                className="input input-bordered w-full"
                placeholder="Your Name"
                defaultValue={user?.displayName}
                readOnly
              />
              {errors.reviewerName?.type === "required" && (
                <p className="text-red-500">Your Name is Required.</p>
              )}
            </div>
            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Email
                </span>
              </label>
              <input
                type="text"
                {...register("reviewerEmail", { required: true })}
                className="input input-bordered w-full"
                placeholder="Email"
                defaultValue={user?.email}
                readOnly
              />
              {errors.reviewerEmail?.type === "required" && (
                <p className="text-red-500">Reviewer Email is Required.</p>
              )}
            </div>
            {/* Comment */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold text-gray-700">
                  Your Experience
                </span>
              </label>
              <textarea
                type="text"
                {...register("reviewerComment", { required: true })}
                className="input input-bordered w-full h-20"
                placeholder="Share your experience..."
              />
              {errors.reviewerComment?.type === "required" && (
                <p className="text-red-500">Reviewer Comment is Required.</p>
              )}
            </div>

            {/* --- FORM ACTIONS --- */}
            <div className="modal-action mt-6 flex justify-end gap-3">
              {/* Close Button - Closes the modal without submitting */}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => document.getElementById("review_modal").close()}
              >
                Cancel
              </button>

              {/* Submit Button - Closes the modal (using method="dialog") and implies submission */}
              <button type="submit" className="btn btn-success">
                Post Review
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default MyApplications;
