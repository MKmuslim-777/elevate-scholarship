import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPaperPlane,
} from "react-icons/fa";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
  };

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 min-h-screen mt-20">
      {/* 1. Hero Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto text-lg">
            Have questions about scholarships or need technical support? We are
            here to help you navigate your journey.
          </p>
        </div>
      </section>

      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* 2. Contact Information */}
          <div className="lg:w-1/3 space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Fill out the form and our team will get back to you within 24
                hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-primary rounded-xl text-white">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Call Us
                  </p>
                  <p className="font-bold">+1 (555) 000-1234</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-primary rounded-xl text-white">
                  <FaEnvelope />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Email Us
                  </p>
                  <p className="font-bold">support@scholarstream.com</p>
                </div>
              </div>

              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <div className="p-4 bg-primary rounded-xl text-white">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Location
                  </p>
                  <p className="font-bold">123 Education Lane, NY, USA</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-8">
              <p className="font-bold mb-4">Follow Our Updates</p>
              <div className="flex gap-4">
                {[<FaFacebookF />, <FaTwitter />, <FaLinkedinIn />].map(
                  (icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-primary hover:text-white transition-all"
                    >
                      {icon}
                    </a>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* 3. Contact Form */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-slate-900 p-8 md:p-12 rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold px-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold px-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold px-1">Subject</label>
                  <select className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all">
                    <option>General Inquiry</option>
                    <option>Scholarship Assistance</option>
                    <option>Technical Issue</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold px-1">Message</label>
                  <textarea
                    rows="5"
                    placeholder="How can we help you?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-primary outline-none transition-all resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto px-10 py-4 bg-primary text-white font-bold rounded-full shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
                >
                  <FaPaperPlane className="text-sm" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Simple FAQ Preview */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Quick Answers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="p-6">
              <h4 className="font-bold text-lg mb-2">
                Is ScholarStream free to use?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                Yes, searching and browsing for scholarships is completely free
                for all students.
              </p>
            </div>
            <div className="p-6">
              <h4 className="font-bold text-lg mb-2">
                How often is the list updated?
              </h4>
              <p className="text-slate-600 dark:text-slate-400">
                We update our scholarship database daily to ensure accuracy and
                new opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
