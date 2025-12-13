import React from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const AllScholarship = () => {
  const axios = useAxios();

  const { data: scholarships = [] } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axios.get("/scholarships");
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-5xl text-center font-bold my-5 text-primary">
        All Scholarships
      </h2>

      <div className="grid grid-cols-4 gap-3.5">
        {scholarships.map((scholarship) => (
          <div className="border rounded-2xl p-5">
            <h1>{scholarship.scholarship_name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
