import React, { useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import { IoStar } from "react-icons/io5";
import useAuth from "../../Hooks/useAuth";
import ReviewCard from "../ReviewCard/ReviewCard";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import useAxios from "../../Hooks/useAxios";

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

const Reviews = ({ scholarshipData }) => {
  const {
    // degree,
    // tuitionFees,
    // serviceCharge,
    // applicationDeadline,
    // postedUserEmail,
    scholarshipName,
    // universityWorldRank,
    // universityImage,
    universityName,
    // subjectCategory,
    // applicationFees,
    // universityCity,
    // universityCountry,
    // description,
    _id,
  } = scholarshipData;

  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const axiosSecure = useAxiosSecure();
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data: scholarshipReviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews?scholarshipId=${_id}`);
      return res.data;
    },
  });
  refetch();

  const modal = document.getElementById("review_modal");

  const handleSubmitReviews = (data) => {
    const reviewsInfo = {
      ratings: rating,
      reviewerPhoto: user.photoURL,
      reviewerEmail: user.email,
      reviewerName: user.displayName,
      reviewerComment: data.reviewerComment,
      scholarshipId: _id,
      universityName: universityName,
      scholarshipName: scholarshipName,
    };

    console.log(reviewsInfo);

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

  const handleReviewClick = () => {
    console.log("Review Form should open now.");
    modal.showModal();
  };

  return (
    <div className="w-full">
      <section
        className="card bg-base-100 shadow-xl border border-base-200 p-4 md:p-6"
        id="reviews-section"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 border-b pb-2">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 flex items-center mb-3 md:mb-0">
            <MdOutlineRateReview className="mr-3 text-accent text-3xl" />
            Students Reviews ({scholarshipReviews.length})
          </h3>

          <button
            onClick={handleReviewClick}
            className="btn btn-primary btn-outline w-full md:w-auto hover:text-white"
          >
            <MdOutlineRateReview />
            Add Your Review
          </button>
        </div>

        {/* reviews giving form modal */}

        <dialog
          id="review_modal"
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
                  onClick={() =>
                    document.getElementById("review_modal").close()
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

        {/* List of Reviews */}
        <div className="space-y-6 mt-6">
          {scholarshipReviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
          {scholarshipReviews.length === 0 && (
            <p className="text-gray-500 italic text-center py-8">
              No reviews yet. Be the first to share your experience!
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reviews;
