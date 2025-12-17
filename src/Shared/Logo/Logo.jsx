import React from "react";
import { Link } from "react-router";
import logoImg from "../../assets/scholarStream.png";

const Logo = () => {
  return (
    <div>
      <Link to={"/"} className="text-xl">
        <img src={logoImg} className="w-[200px]" alt="" />
      </Link>
    </div>
  );
};

export default Logo;
