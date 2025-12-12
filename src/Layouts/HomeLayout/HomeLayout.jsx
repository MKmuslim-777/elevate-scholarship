import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";
import Banner from "../../Components/Banner/Banner";
import TopScholarships from "../../Components/TopScholarships/TopScholarships";
import Footer from "../../Shared/Footer/Footer";
import ScholarshipCard from "../../Components/TopScholarships/ScholarshipCard";

const HomeLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
        <Banner></Banner>
      </header>
      <main className="container">
        <TopScholarships></TopScholarships>
        {/* <ScholarshipCard></ScholarshipCard> */}
        <Outlet></Outlet>
      </main>

      <footer className="container">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
