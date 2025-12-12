import React from "react";
import bannerImg from "./../../assets/banner.jpg";

const Banner = () => {
  return (
    <div
      className="relative h-[70vh] w-full flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      {/* Blur Layer */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>

      {/* Text Content */}
      <div className="relative text-center text-white z-10 md:w-11/12">
        <h1 className="text-4xl md:text-8xl font-bold mb-3 drop-shadow-lg md:mx-0 mx-2.5">
          Fund Your Future
        </h1>
        <p className="text-lg md:text-3xl opacity-90 mt-8">
          Get matched with scholarships made for you. No stress, just
          search—your next opportunity is waiting
        </p>

        <button className="btn btn-primary text-white ">
          Find Scholarships
        </button>
      </div>
    </div>
  );
};

export default Banner;
