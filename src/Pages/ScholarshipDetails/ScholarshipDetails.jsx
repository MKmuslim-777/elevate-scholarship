import React from "react";
import { useLoaderData } from "react-router";

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
