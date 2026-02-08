import React from "react";
import { FaGraduationCap, FaGlobe, FaUsers, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router";

const AboutUs = () => {
  const stats = [
    {
      id: 1,
      label: "Scholarships Listed",
      value: "5,000+",
      icon: <FaGraduationCap />,
    },
    { id: 2, label: "Success Stories", value: "1,200+", icon: <FaUsers /> },
    { id: 3, label: "Global Partners", value: "50+", icon: <FaGlobe /> },
  ];

  return (
    <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-300 mt-20">
      {/* 1. Hero Section */}
      <section className="relative py-20 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Empowering Your Future with ScholarStream
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            We believe that education is for everyone and financial constraints
            should never stand in the way of your dreams. ScholarStream connects
            students to the world's best scholarships.
          </p>
        </div>

        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full translate-x-1/2 translate-y-1/2 blur-3xl"></div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 -mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-700 text-center transform hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="text-3xl text-primary mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Mission & Vision */}
      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Students Collaborating"
              className="rounded-3xl shadow-2xl"
            />
          </div>
          <div className="lg:w-1/2 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 bg-primary/10 rounded-xl text-primary text-xl">
                  <FaLightbulb />
                </span>
                <h2 className="text-3xl font-bold">Our Mission</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                Our core mission is to create a transparent and easy-to-use
                platform where talented students can find global scholarship
                information and apply directly without any complexity.
              </p>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600 text-xl">
                  <FaGlobe />
                </span>
                <h2 className="text-3xl font-bold">Our Vision</h2>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                We envision a world where educational opportunities are not
                limited by geographical or economic boundaries. Through
                technology, we bridge the gap between dreams and reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Why Choose Us Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/30">
        <div className="container mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose ScholarStream?
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "Verified Data",
              desc: "Every scholarship is manually verified by our team for accuracy.",
            },
            {
              title: "Easy Tracking",
              desc: "Apply and track your application status in one simple dashboard.",
            },
            {
              title: "Modern Experience",
              desc: "Enjoy a clean interface with dark mode and smooth navigation.",
            },
            {
              title: "Dedicated Support",
              desc: "Our team is always ready to assist students in their journey.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <h4 className="text-xl font-bold mb-3 text-primary">
                {item.title}
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 container mx-auto px-4 text-center">
        <div className="bg-primary rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden shadow-2xl shadow-primary/30">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 relative z-10">
            Start Your Dream Journey Today
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto relative z-10">
            Browse through thousands of scholarships and find the perfect match
            for your higher education.
          </p>
          <Link
            to="/all-scholarships"
            className="bg-white text-primary px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-100 transition-colors shadow-lg relative z-10"
          >
            Explore Scholarships
          </Link>

          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-black/10 rounded-full -translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
