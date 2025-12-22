import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Banner from "../../Components/Banner/Banner";

import AboutUs from "../../Components/AboutUs/AboutUs";
import RecentScholarships from "../../Components/RecentScholarships/RecentScholarships";
import Faq from "../../Components/FAQ/Faq";
import Cta from "../../Components/CTA/Cta";
import { motion } from "motion/react";
import FramerMotion from "../../Shared/FramerMotion/FramerMotion";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <FramerMotion></FramerMotion>

      <div>
        <RecentScholarships></RecentScholarships>
        <AboutUs></AboutUs>
        <Cta></Cta>
        <Faq></Faq>
      </div>
    </div>
  );
};

export default Home;
