import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import Loading from "../../../Shared/Loading/Loading";
import { FaEdit, FaStar, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const AllReviews = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: reviews = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/all-reviews`);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

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

  console.log(reviews);

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
                        {/* <button
                          title="Edit Comment"
                          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaEdit size={14} />
                        </button> */}

                        {/* Delete Button */}
                        <button
                          onClick={() => handleDelete(review._id)}
                          title="Delete Comment"
                          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
                        >
                          <FaTrashAlt size={14} />
                        </button>
                      </div>
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

export default AllReviews;
