import React from "react";
import { Link } from "react-router";

const Logo = () => {
  return (
    <div>
      <Link to={"/"} className="text-xl">
        ScholarStream
      </Link>
    </div>
  );
};

export default Logo;
