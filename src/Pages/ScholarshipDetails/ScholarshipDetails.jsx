import React, { use } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import {
  FaGraduationCap,
  FaMoneyBillWave,
  FaGlobe,
  FaSearchDollar,
} from "react-icons/fa";
import { GiRank2, GiNotebook } from "react-icons/gi";
import { MdOutlineEmail } from "react-icons/md";
import Reviews from "../../Components/Reviews/Reviews";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const ScholarshipDetails = () => {
  const scholarshipData = useLoaderData();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const {
    universityImage,
    universityName,
    subjectCategory,
    applicationFees,
    universityCity,
    universityCountry,
    _id,
    degree,
    tuitionFees,
    serviceCharge,
    applicationDeadline,
    postedUserEmail,
    scholarshipName,
    universityWorldRank,
    description,
  } = scholarshipData;

  // Format the deadline date
  const formattedDeadline = new Date(applicationDeadline).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Helper function to format currency
  const formatCurrency = (amount) =>
    amount === 0 ? "Free" : `$${amount.toLocaleString()}`;

  const handlePayment = async (scholarshipData) => {
    const paymentInfo = {
      applicationFees: scholarshipData.applicationFees,
      scholarshipId: scholarshipData._id,
      studentEmail: user.email,
      scholarshipName: scholarshipName,
    };

    const res = await axiosSecure.post("/checkout-session", paymentInfo);
    // window.location.href = res.data.url;
    window.location.assign(res.data.url);
  };

  const handleApply = (scholarshipData) => {
    const applicationInfo = {
      scholarshipId: _id,
      userId: user._id,
      userName: user.displayName,
      userEmail: user.email,
      universityName: scholarshipData.universityName,
      scholarshipCategory: scholarshipData.subjectCategory,
      degree: scholarshipData.degree,
      applicationFees: scholarshipData.applicationFees,
      serviceCharge: scholarshipData.serviceCharge,
      universityAddress: { universityCity, universityCountry },
      applicationStatus: "pending",
      feedback: "",
    };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3b82f6",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, Select it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.post(`/applications`, applicationInfo).then((res) => {
          console.log(res.data);
          if (res.data.insertedId) {
            navigate("/dashboard/my-applications");

            Swal.fire(
              "Selected for apply!",
              "Your Application has been selected.",
              "success"
            );
          } else if (res.data.message === "application exists") {
            Swal.fire({
              icon: "error",
              title: "Already Selected",
              text: "Never apply for some scholarship!",
              footer: '<a href="#">Why do I have this issue?</a>',
            });
          }
        });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Header Section: Image and Scholarship Title */}
      <header className="mb-8 rounded-xl overflow-hidden shadow-lg border border-base-200">
        <figure className="relative h-64 md:h-96 w-full">
          <img
            src={universityImage}
            alt={`${universityName} campus`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20 bg-opacity-40 flex items-end p-6">
            <h1 className="text-4xl md:text-5xl font-extrabold text-base-100 leading-tight">
              {scholarshipName}
            </h1>
          </div>
        </figure>
      </header>

      {/* Main Content Layout (Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Column 1 (Main Details) */}
        <div className="lg:col-span-2 space-y-8">
          {/* University Info Card */}
          <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-3 text-primary">
                <FaGraduationCap />
              </span>
              {universityName}
            </h2>

            <p className="text-lg text-gray-600 border-l-4 border-primary pl-4 py-2">
              {description}
            </p>

            <div className="mt-6 flex flex-wrap gap-4 items-center">
              {/* Location Badge */}
              <div className="badge badge-lg badge-neutral p-3 text-base font-medium">
                <IoLocationOutline className="mr-1" />
                {universityCity}, {universityCountry}
              </div>
              {/* World Rank Badge */}
              <div className="badge badge-lg badge-info p-3 text-base font-medium">
                <GiRank2 className="mr-1" />
                World Rank: #{universityWorldRank}
              </div>
            </div>
          </div>

          {/* Detailed Info Section */}
          <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
              Financial and Academic Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              {/* Application Deadline */}
              <InfoItem
                icon={<IoCalendarOutline />}
                label="Application Deadline"
                value={formattedDeadline}
                color="text-error"
              />

              {/* Degree Level */}
              <InfoItem
                icon={<FaGraduationCap />}
                label="Degree Level"
                value={degree}
                color="text-primary"
              />

              {/* Subject Category */}
              <InfoItem
                icon={<GiNotebook />}
                label="Subject Category"
                value={subjectCategory}
                color="text-secondary"
              />

              {/* Tuition Fees */}
              <InfoItem
                icon={<FaMoneyBillWave />}
                label="Tuition Fees"
                value={formatCurrency(tuitionFees)}
                color="text-success"
              />

              {/* Application Fees */}
              <InfoItem
                icon={<FaSearchDollar />}
                label="Application Fees"
                value={formatCurrency(applicationFees)}
                color="text-warning"
              />

              {/* Service Charge */}
              <InfoItem
                icon={<FaMoneyBillWave />}
                label="Service Charge"
                value={formatCurrency(serviceCharge)}
                color="text-info"
              />
            </div>
          </div>
          <div>
            <Reviews scholarshipData={scholarshipData}></Reviews>
          </div>
        </div>

        {/* Column 2 (Action Sidebar) */}
        <aside className="space-y-6">
          {/* Apply Button Card */}
          <div className="card bg-primary text-primary-content shadow-xl p-6">
            <h3 className="text-2xl font-bold mb-4 text-base-100">
              Ready to Apply?
            </h3>
            <p className="mb-4 text-sm opacity-90 text-base-100">
              The deadline is **{formattedDeadline}**. Don't miss this
              opportunity!
            </p>
            {/* <Link to={`/application/${_id}`}> */}
            <button
              onClick={() => handleApply(scholarshipData)}
              className="btn bg-base-200 btn-lg w-full text-base-100"
            >
              Apply Now
            </button>
            {/* </Link> */}
          </div>

          {/* Contact & Admin Card */}
          <div className="card bg-base-100 shadow-xl border border-base-200 p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
              Contact Information
            </h3>
            <div className="space-y-3">
              <InfoItem
                icon={<MdOutlineEmail />}
                label="Posted By"
                value={postedUserEmail}
                color="text-accent"
              />
            </div>
            <div className="mt-4">
              <button className="btn btn-outline btn-neutral btn-sm w-full">
                Contact University
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

// Helper component for consistent display of info items
const InfoItem = ({ icon, label, value, color }) => (
  <div className="flex items-start space-x-3">
    <span className={`text-xl flex-shrink-0 mt-1 ${color}`}>{icon}</span>
    <div>
      <p className="font-semibold text-gray-700">{label}</p>
      <p className="text-gray-500">{value}</p>
    </div>
  </div>
);

export default ScholarshipDetails;
