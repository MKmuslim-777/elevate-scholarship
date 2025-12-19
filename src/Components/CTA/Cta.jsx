import React from "react";
import { Link } from "react-router";

const Cta = () => {
  return (
    <div>
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

export default Cta;
