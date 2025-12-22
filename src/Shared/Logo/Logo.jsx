import React from "react";
import { Link } from "react-router";
// import logoImg from "../../assets/scholarStream.png";

const Logo = () => {
  return (
    <div>
      <Link to={"/"} className="text-xl">
        <img
          src={`https://i.ibb.co.com/Bk2PzmR/Gemini-Generated-Image-qixyqyqixyqyqixy.png`}
          className="w-[80px]"
          alt=""
        />
      </Link>
    </div>
  );
};

export default Logo;
