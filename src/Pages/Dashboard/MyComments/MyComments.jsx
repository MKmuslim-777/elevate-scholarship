import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import {
  FaTrashAlt,
  FaEdit,
  FaStar,
  FaRegCommentDots,
  FaEye,
} from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../Shared/Loading/Loading";

import { MdOutlineRateReview } from "react-icons/md";
import { toast } from "react-toastify";

const MyComments = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState(null);

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
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?email=${user.email}`);
      return res.data;
    },
  });

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/reviews/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Your comment has been removed.", "success");
          }
        });
      }
    });
  };

  const handleEditCommentSubmit = (review) => {
    const reviewsInfo = {
      ratings: rating,
      reviewerPhoto: user.photoURL,
      reviewerEmail: user.email,
      reviewerName: user.displayName,
      reviewerComment: newComment,
      scholarshipId: review.scholarshipId,
      universityName: review.universityName,
      scholarshipName: review.scholarshipName,
    };

    console.log(reviewsInfo);

    axiosSecure.patch(`/reviews/${review._id}`, reviewsInfo).then((res) => {
      if (res.data.modifiedCount > 0) {
        toast.success("Review updated successfully! 💚");

        const modal = document.getElementById("edit_comment_modal");
        if (modal) {
          modal.close();
        }
      } else {
        toast.error("No changes made.");
      }
    });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">
            My Comments
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Manage and track the reviews you've shared.
          </p>
        </div>
        <div className="bg-white px-5 py-2 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3">
          <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">
            Reviews
          </span>
          <span className="text-xl font-black text-blue-600">
            {reviews.length}
          </span>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr className="text-gray-500 text-[11px] uppercase tracking-widest font-bold">
                <th className="py-5 px-6">Scholarship & University</th>
                <th className="py-5 px-6">Comment</th>
                <th className="py-5 px-6 text-center">Rating</th>
                <th className="py-5 px-6 text-center">Date</th>
                <th className="py-5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {isLoading ? (
                <tr>
                  <td colSpan="5" className="text-center py-20">
                    <Loading />
                  </td>
                </tr>
              ) : reviews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-24">
                    <div className="flex flex-col items-center opacity-40">
                      <FaRegCommentDots
                        size={54}
                        className="mb-4 text-gray-300"
                      />
                      <p className="text-xl font-semibold text-gray-600">
                        No comments found
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                reviews.map((review) => (
                  <tr
                    key={review._id}
                    className="hover:bg-blue-50/20 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {review.scholarshipName}
                      </div>
                      <div className="text-[11px] text-gray-400 uppercase font-medium mt-0.5">
                        {review.universityName}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-gray-600 text-sm italic line-clamp-2 max-w-xs">
                        "{review.reviewerComment}"
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-1.5 bg-amber-50 text-amber-600 px-3 py-1 rounded-lg border border-amber-100 w-fit mx-auto font-bold text-sm">
                        <FaStar className="text-xs" /> {review.ratings}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center text-gray-500 text-xs font-medium">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex justify-end items-center gap-2">
                        {/* View Button */}
                        {/* <button
                          title="View Review"
                          className="p-2 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 transition-all"
                        >
                          <FaEye size={14} />
                        </button> */}

                        {/* Edit Button */}
                        <button
                          title="Edit Comment"
                          onClick={() =>
                            document
                              .getElementById("edit_comment_modal")
                              .showModal()
                          }
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaEdit size={14} />
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(review._id)}
                          title="Delete Comment"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>

                      <dialog
                        id="edit_comment_modal"
                        className="modal modal-bottom sm:modal-middle"
                      >
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
                            onSubmit={() => handleEditCommentSubmit(review)}
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
                                className="input input-bordered w-full"
                                placeholder="Your Name"
                                defaultValue={user?.displayName}
                                readOnly
                              />
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
                                className="input input-bordered w-full"
                                placeholder="Email"
                                defaultValue={user?.email}
                                readOnly
                              />
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
                                className="input input-bordered w-full h-20"
                                placeholder="Share your experience..."
                                defaultValue={review?.reviewerComment}
                                onChange={() =>
                                  setNewComment(event.target.value)
                                }
                              />
                            </div>

                            {/* --- FORM ACTIONS --- */}
                            <div className="modal-action mt-6 flex justify-end gap-3">
                              {/* Close Button - Closes the modal without submitting */}
                              <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() =>
                                  document
                                    .getElementById("edit_comment_modal")
                                    .close()
                                }
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
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyComments;
