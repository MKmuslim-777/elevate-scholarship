import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { FaCheckCircle, FaArrowRight, FaFileAlt } from "react-icons/fa";
import Loading from "../../../Shared/Loading/Loading";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("successId");
  const axiosSecure = useAxiosSecure();
  const [updating, setUpdating] = useState(true);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?successId=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setUpdating(false);
        })
        .catch((err) => {
          console.error(err);
          setUpdating(false);
        });
    }
  }, [sessionId, axiosSecure]);

  if (updating) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <Loading />
        <p className="mt-4 text-gray-500 animate-pulse">
          Confirming your payment, please wait...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-green-100 scale-150 rounded-full animate-ping opacity-25"></div>
            <FaCheckCircle className="text-green-500 text-7xl relative z-10" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl font-black text-gray-800 mb-2">
          Payment Successful!
        </h2>
        <p className="text-gray-500 mb-8">
          Thank you for your application. Your payment has been processed
          securely and your application status is now updated.
        </p>

        {/* Transaction Info Box */}
        <div className="bg-gray-50 rounded-2xl p-4 mb-8 border border-gray-100">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400 font-medium">Transaction ID:</span>
            <span className="text-gray-700 font-bold truncate ml-4">
              {sessionId}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-400 font-medium">Status:</span>
            <span className="text-green-600 font-black uppercase text-[10px] bg-green-100 px-2 py-0.5 rounded">
              Verified
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/my-applications"
            className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-primary transition-all shadow-lg shadow-gray-200"
          >
            <FaFileAlt /> View My Applications
          </Link>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-4 bg-white text-gray-500 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            Back to Home <FaArrowRight size={12} />
          </Link>
        </div>

        <p className="mt-8 text-[10px] text-gray-400 uppercase tracking-widest font-bold">
          A confirmation email has been sent to your inbox
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
