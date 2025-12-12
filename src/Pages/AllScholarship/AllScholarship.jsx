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
      <h2>All Scholarships</h2>
    </div>
  );
};

export default AllScholarship;
