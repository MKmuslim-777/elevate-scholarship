import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Outlet } from "react-router";

import Footer from "../../Shared/Footer/Footer";

const HomeLayout = () => {
  return (
    <div>
      <header>
        <Navbar></Navbar>
      </header>
      <main className="container">
        <Outlet></Outlet>
      </main>

      <footer className="container">
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
