import React from "react";
import bannerImg from "./../../assets/bannerPerson.png";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="bg-base-100 py-10 md:py-6 overflow-hidden mt-6">
      <div className="container mx-auto px-4">
        <div className="gap-10">
          <div className="text-center  flex flex-col justify-center items-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-primary block">Find Your Dream</span>
              <span className="text-secondary">Scholarship</span>
            </h1>
            <p className="text-gray-600 mt-5 text-base md:text-lg lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ScholarStream is your dedicated partner in rising to academic
              success. We believe financial barriers should never limit
              potential. Our platform connects you with exclusive, high-value
              funding opportunities designed to elevate your educational
              journey.
            </p>
            <Link
              to={"/all-scholarships"}
              className="btn btn-outline btn-primary rounded-full hover:text-white
               btn-lg px-8 max-w-[300px] mt-4.5"
            >
              Search Scholarships
            </Link>

            <img
              className="relative w-full max-w-[320px] md:max-w-[450px] object-contain drop-shadow-xl"
              src={bannerImg}
              alt="Student with Scholarship"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
