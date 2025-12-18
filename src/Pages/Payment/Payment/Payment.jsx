import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Shared/Loading/Loading";

const Payment = () => {
  const { user } = useAuth();
  const { scholarshipId } = useParams();
  const axiosSecure = useAxiosSecure();

  const {
    isLoading,
    data: scholarship,
    refetch,
  } = useQuery({
    queryKey: ["scholarships", scholarshipId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/application/${scholarshipId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    const paymentInfo = {
      applicationFees: scholarship.applicationFees,
      scholarshipId: scholarship._id,
      studentEmail: user.email,
      scholarshipName: scholarship.scholarshipName,
    };

    const res = await axiosSecure.post("/checkout-session", paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h1>
        Please pay ${scholarship.applicationFees} :{" "}
        {scholarship.scholarshipName}
      </h1>
      <button onClick={handlePayment} className="btn btn-primary text-white">
        Pay
      </button>
    </div>
  );
};

export default Payment;
