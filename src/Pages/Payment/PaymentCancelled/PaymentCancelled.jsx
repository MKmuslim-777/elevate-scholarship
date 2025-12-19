import React from "react";
import { Link, useNavigate } from "react-router";
import {
  FaTimesCircle,
  FaRedo,
  FaHome,
  FaExclamationTriangle,
} from "react-icons/fa";

const PaymentCancelled = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center border border-gray-100">
        {/* Cancelled Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-red-100 scale-150 rounded-full opacity-30"></div>
            <FaTimesCircle className="text-red-500 text-7xl relative z-10" />
          </div>
        </div>

        {/* Text Content */}
        <h2 className="text-3xl font-black text-gray-800 mb-2">
          Payment Cancelled
        </h2>
        <p className="text-gray-500 mb-6">
          The transaction was cancelled and no funds were withdrawn from your
          account. If this was a mistake, you can try again below.
        </p>

        {/* Warning Note */}
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-2xl p-4 mb-8 text-left">
          <FaExclamationTriangle className="text-amber-500 mt-1 shrink-0" />
          <p className="text-xs text-amber-700 leading-relaxed">
            <strong>Note:</strong> If your balance was deducted but you see this
            message, please contact our support team with your email address.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 w-full py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-red-600 transition-all shadow-lg shadow-gray-200"
          >
            <FaRedo size={14} /> Try Payment Again
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 w-full py-4 bg-white text-gray-500 font-bold rounded-2xl border border-gray-200 hover:bg-gray-50 transition-all"
          >
            <FaHome /> Back to Home
          </Link>
        </div>

        {/* Support Link */}
        <p className="mt-8 text-sm text-gray-400">
          Need help?{" "}
          <Link
            to="/contact"
            className="text-primary font-bold hover:underline"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PaymentCancelled;
