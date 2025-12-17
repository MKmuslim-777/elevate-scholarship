import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "../../Components/Banner/Banner";

import AboutUs from "../../Components/AboutUs/AboutUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>

      <div>
        <AboutUs></AboutUs>
      </div>
    </div>
  );
};

export default Home;
