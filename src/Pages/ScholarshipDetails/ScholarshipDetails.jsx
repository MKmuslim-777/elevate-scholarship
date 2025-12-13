import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useLoaderData, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const ScholarshipDetails = () => {
  const data = useLoaderData();

  console.log(data);

  // const { data: scholarship = {} } = useQuery({
  //   queryKey: ["scholarship"],
  //   queryFn: async () => {
  //     const res = await axios.get(`/scholarships/${paramsId}`);
  //     console.log(res);
  //     return res.data;
  //   },
  // });

  return (
    <div>
      <h1>Scholarship details</h1>
    </div>
  );
};

export default ScholarshipDetails;
