import React from "react";
import {
  FaBullseye,
  FaEye,
  FaHandshake,
  FaGlobe,
  FaGraduationCap,
  FaUsers,
} from "react-icons/fa";

const AboutUs = () => {
  const stats = [
    {
      id: 1,
      label: "Total Funding",
      value: "$2.5M+",
      icon: <FaGlobe />,
      color: "text-blue-600",
    },
    {
      id: 2,
      label: "Partner Universities",
      value: "150+",
      icon: <FaGraduationCap />,
      color: "text-purple-600",
    },
    {
      id: 3,
      label: "Active Students",
      value: "50K+",
      icon: <FaUsers />,
      color: "text-emerald-600",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[120px] opacity-50"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100 rounded-full blur-[120px] opacity-50"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-widest text-primary uppercase bg-primary/10 rounded-full">
            Empowering Futures
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight">
            We are{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary/80 to-primary">
              ScholarStream
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed font-light">
            ScholarStream is more than a platform; it's a bridge. We connect
            world-class talent with life-changing opportunities, making
            education accessible to everyone, everywhere.
          </p>
        </div>
      </section>

      {/* --- Stats Section --- */}
      <section className="py-12 bg-base-100 border-y border-slate-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="flex items-center justify-center gap-6 p-8 bg-white rounded-3xl shadow-sm border border-slate-100"
              >
                <div
                  className={`text-4xl ${stat.color} bg-slate-50 p-4 rounded-2xl`}
                >
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-black text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-slate-500 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Our Story & Image Section --- */}
      <section className="py-24 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="w-full lg:w-1/2 relative">
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/80 to-primary/50 rounded-[2.5rem] blur opacity-20 transform -rotate-3"></div>
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
              <img
                src="https://i.ibb.co.com/qF5vmq8z/photo-1523240795612-9a054b0db644.avif"
                alt="ScholarStream Team"
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <h2 className="text-4xl font-bold text-slate-900 leading-snug">
              Started from a Simple Need: <br />
              <span className="text-primary">Transparency in Education.</span>
            </h2>
            <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
              <p>
                Founded in 2024, ScholarStream began when we realized that
                thousands of brilliant students miss out on funding simply
                because of complex application processes and hidden information.
              </p>
              <p>
                Our data-driven ecosystem "streams" the right opportunities to
                the right students, ensuring that merit and ambition are the
                only criteria for success, not financial background.
              </p>
            </div>
            <button className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-primary transition-colors shadow-lg shadow-slate-200">
              Learn More About Our Process
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
