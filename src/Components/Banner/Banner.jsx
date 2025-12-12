import React from "react";
import bannerImg from "./../../assets/bannerPerson.png";

const Banner = () => {
  return (
    <div className="container">
      <div className="md:flex justify-between items-center">
        {/* left */}
        <div className="md:pt-20 md:px-20">
          <h1 className="text-2xl md:text-5xl font-bold text-primary">
            Find Your Dream
          </h1>
          <h1 className="text-2xl md:text-7xl font-bold">
            <span className="text-secondary">Scholarship</span>
          </h1>
          <p className="text-black  mt-3.5 text-lg md:pr-[350px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat
            eligendi laudantium mollitia, quis ad accusamus maiores libero quas
            recusandae distinctio.
          </p>

          <div>
            <button className="btn btn-outline btn-primary hover:text-white mt-3.5">
              Find Your Scholarships
            </button>
          </div>
        </div>

        {/* right */}
        <div>
          <img className="max-w-[450px]" src={bannerImg} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Banner;
