import React from "react";

const Faq = () => {
  const faqData = [
    {
      id: "faq-1",
      question: "What is ScholarStream?",
      answer:
        "ScholarStream is a modern scholarship management platform designed to bridge the gap between international universities and aspiring students. We provide up-to-date information on various scholarship categories and a seamless application process.",
    },
    {
      id: "faq-2",
      question: "Can I apply for multiple scholarships at once?",
      answer:
        "Yes! You can apply for as many scholarships as you are eligible for. However, please note that you can only submit one application per specific scholarship listing.",
    },
    {
      id: "faq-3",
      question: "How do I apply for a scholarship?",
      answer:
        "First, create an account on our platform. Browse through the 'All Scholarships' page to find an opportunity that fits your profile. Click the 'Apply Now' button, fill in the required details, and complete the application fee payment to submit your request.",
    },
    {
      id: "faq-4",
      question: "Can I edit my application after submission?",
      answer:
        "You can edit your application details as long as the status is marked as 'Pending.' Once an administrator begins processing your application or changes its status, editing will no longer be permitted.",
    },
    {
      id: "faq-5",
      question: "How can I track my application status?",
      answer:
        "Simply go to the 'My Applications' section in your User Dashboard. You can see real-time updates—whether your application is Pending, Processing, Completed, or Rejected.",
    },
  ];

  return (
    <div className="bg-slate-50 py-16 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side: Header Content */}
          <div className="space-y-6">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide uppercase">
              Support Center
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
              Got Questions? <br />
              <span className="text-primary">We Have Answers.</span>
            </h2>
            <p className="text-slate-600 text-lg">
              Everything you need to know about ScholarStream and our
              application process. Can't find what you're looking for? Reach out
              to our support team.
            </p>

            {/* Simple Stats or Trust Badge */}
            <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
              <div className="bg-primary p-3 rounded-lg text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg underline">
                  Need further help?
                </h4>
                <p className="text-slate-500 text-sm">
                  Our team is available 24/7 for you.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: FAQ Accordion */}
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div
                key={faq.id}
                className="collapse collapse-arrow bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-lg font-bold text-slate-800 py-5">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-50">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
