import React from "react";
import bannerImg from "./../../assets/bannerPerson.png";

const Banner = () => {
  return (
    <div className="bg-base-100 py-10 md:py-6 overflow-hidden mt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-10">
          {/* Left Content */}
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-tight">
              <span className="text-primary block">Find Your Dream</span>
              <span className="text-secondary">Scholarship</span>
            </h1>

            <p className="text-gray-600 mt-6 text-base md:text-lg lg:max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              ScholarStream is your dedicated partner in rising to academic
              success. We believe financial barriers should never limit
              potential. Our platform connects you with exclusive, high-value
              funding opportunities designed to elevate your educational
              journey.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              {/* <button className="btn btn-primary btn-lg px-8 hover:scale-105 transition-transform">
               Learn More
              </button> */}
              <button
                className="btn btn-outline btn-primary hover:text-white
               btn-lg px-8"
              >
                Search Scholarships
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-2/5 flex justify-center">
            <div className="relative">
              {/* Decorative Background for Image (Optional daisyUI class) */}
              <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl"></div>
              <img
                className="relative w-full max-w-[320px] md:max-w-[450px] object-contain drop-shadow-xl"
                src={bannerImg}
                alt="Student with Scholarship"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
