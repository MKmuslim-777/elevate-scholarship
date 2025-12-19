import React from "react";

const Faq = () => {
  return (
    <div className="md:mx-20">
      <h3 className="text-primary text-2xl md:text-4xl font-bold my-5">
        🎓 General Information
      </h3>
      <div className="join join-vertical bg-base-100">
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title font-semibold">
            What is ScholarStream?
          </div>
          <div className="collapse-content text-sm">
            ScholarStream is a modern scholarship management platform designed
            to bridge the gap between international universities and aspiring
            students. We provide up-to-date information on various scholarship
            categories and a seamless application process.
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold">
            Can I apply for multiple scholarships at once?
          </div>
          <div className="collapse-content text-sm">
            Yes! You can apply for as many scholarships as you are eligible for.
            However, please note that you can only submit one application per
            specific scholarship listing.
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold">
            How do I apply for a scholarship?
          </div>
          <div className="collapse-content text-sm">
            First, create an account on our platform. Browse through the "All
            Scholarships" page to find an opportunity that fits your profile.
            Click the "Apply Now" button, fill in the required details, and
            complete the application fee payment to submit your request.
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold">
            Can I edit my application after submission?
          </div>
          <div className="collapse-content text-sm">
            You can edit your application details as long as the status is
            marked as "Pending." Once an administrator begins processing your
            application or changes its status, editing will no longer be
            permitted.
          </div>
        </div>
        <div className="collapse collapse-arrow join-item border-base-300 border">
          <input type="radio" name="my-accordion-4" />
          <div className="collapse-title font-semibold">
            How can I track my application status?
          </div>
          <div className="collapse-content text-sm">
            Simply go to the "My Applications" section in your User Dashboard.
            You can see real-time updates—whether your application is Pending,
            Processing, Completed, or Rejected.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
