import React from "react";
import { FaBullseye, FaEye, FaHandshake } from "react-icons/fa";
import aboutImg from "../../assets/about-team.jpg"; // Replace with your actual image path
import { Link } from "react-router";

const AboutUs = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-primary/5 rounded-4xl mt-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            About <span className="text-primary">ScholarStream</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Connecting ambitious students with global opportunities. We bridge
            the gap between financial constraints and academic excellence
            through a seamless, data-driven scholarship ecosystem.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Side */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-72 h-72 bg-secondary/20 rounded-full blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Students studying"
                className="relative rounded-2xl shadow-2xl z-10 w-full object-cover"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
            <p className="text-gray-600 text-lg">
              Founded in 2024, ScholarStream began with a simple observation:
              thousands of life-changing scholarships go unclaimed every year
              because students simply don't know they exist.
            </p>
            <p className="text-gray-600 text-lg">
              We built this platform to "streamline" the search process,
              providing a transparent and efficient way for students to
              discover, track, and apply for funding that fits their unique
              profiles.
            </p>
            <div className="stats shadow bg-base-200 w-full mt-4">
              <div className="stat place-items-center">
                <div className="stat-title text-gray-500">Total Funding</div>
                <div className="stat-value text-primary">$2.5M+</div>
              </div>
              <div className="stat place-items-center border-l border-gray-300">
                <div className="stat-title text-gray-500">
                  Partner Universities
                </div>
                <div className="stat-value text-secondary">150+</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className=" py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="card bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <FaBullseye className="text-primary text-3xl" />
                </div>
                <h2 className="card-title text-2xl mb-2">Our Mission</h2>
                <p className="text-gray-600">
                  To democratize access to education by providing a transparent
                  gateway to financial aid for students worldwide.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="card bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <FaEye className="text-secondary text-3xl" />
                </div>
                <h2 className="card-title text-2xl mb-2">Our Vision</h2>
                <p className="text-gray-600">
                  To become the global gold standard for scholarship management
                  and student funding discovery.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="card bg-white shadow-xl hover:-translate-y-2 transition-transform duration-300">
              <div className="card-body items-center text-center">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                  <FaHandshake className="text-accent text-3xl" />
                </div>
                <h2 className="card-title text-2xl mb-2">Our Values</h2>
                <p className="text-gray-600">
                  Integrity, accessibility, and innovation guide every decision
                  we make for our student community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 text-center container mx-auto px-4">
        <div className="bg-primary rounded-3xl p-8 md:p-16 text-white shadow-2xl overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Ready to start your journey?
            </h2>
            <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto">
              Join thousands of students who have already found their path to
              success through ScholarStream.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to={"/all-scholarships"}
                className="btn btn-secondary btn-lg border-none text-white px-10"
              >
                Get Started
              </Link>
            </div>
          </div>
          {/* Decorative Circle */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/10 rounded-full -ml-10 -mb-10"></div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
