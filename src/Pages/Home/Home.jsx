import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "../../Components/Banner/Banner";
import TopScholarships from "../../Components/TopScholarships/TopScholarships";

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <div>
        <TopScholarships></TopScholarships>
      </div>
    </div>
  );
};

export default Home;
