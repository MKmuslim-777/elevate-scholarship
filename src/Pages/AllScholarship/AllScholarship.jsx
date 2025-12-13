import React from "react";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import ScholarshipCard from "../../Components/TopScholarships/ScholarshipCard";

const AllScholarship = () => {
  const axios = useAxios();

  const { data: scholarships = [], refetch } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axios.get("/scholarships");
      return res.data;
    },
  });
  refetch();

  return (
    <div>
      <h2 className="text-5xl text-center font-bold my-5 text-primary">
        All Scholarships
      </h2>

      <div className="grid grid-cols-4 gap-3.5">
        {scholarships.map((scholarship) => (
          <ScholarshipCard
            key={scholarship._id}
            scholarship={scholarship}
          ></ScholarshipCard>
        ))}
      </div>
    </div>
  );
};

export default AllScholarship;
