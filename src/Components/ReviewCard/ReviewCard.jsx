import React from "react";
import { IoStar } from "react-icons/io5";

const ReviewCard = ({ review }) => {
  const { reviewerPhoto, reviewerName, createdAt, ratings, reviewerComment } =
    review;

  // Format the review date
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="p-4 border border-base-300 rounded-lg bg-base-50">
      <div className="flex items-start mb-3">
        {/* Reviewer Image (Avatar) */}
        <div className="avatar mr-4">
          <div className="w-12 rounded-full">
            <img src={reviewerPhoto} alt={`${reviewerName}'s profile`} />
          </div>
        </div>

        <div className="flex-grow">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg text-gray-800">
              {reviewerName}
            </div>
            <div className="text-sm text-gray-500">{formattedDate}</div>
          </div>

          {/* Star Rating Display */}
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <IoStar
                key={i}
                className={`h-4 w-4 ${
                  i < ratings ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-gray-600 border-l-2 border-accent pl-3 italic">
        "{reviewerComment}"
      </p>
    </div>
  );
};

export default ReviewCard;
