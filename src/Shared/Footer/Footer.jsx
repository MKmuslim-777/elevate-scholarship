import React from "react";
import Logo from "../Logo/Logo";
import { FaYoutube, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-white rounded-t-[3rem] pt-16 pb-8 px-6 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start text-center md:text-left">
          {/* Brand Section */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <img
              src="https://i.ibb.co.com/rf5yZYXF/Gemini-Generated-Image-ao7oqvao7oqvao7o.png"
              alt=""
              className="w-[140px]"
            />
            <p className="text-gray-400 max-w-xs leading-relaxed">
              Empowering students worldwide to achieve their academic dreams
              through streamlined scholarship opportunities.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-bold text-primary mb-2 uppercase tracking-widest">
              Resources
            </h4>
            <nav className="flex flex-col space-y-2 text-gray-400">
              <Link
                to="/all-scholarships"
                className="hover:text-primary transition-colors"
              >
                All Scholarships
              </Link>
              <Link
                to="/about"
                className="hover:text-primary transition-colors"
              >
                How it Works
              </Link>
              <Link
                to="/contact"
                className="hover:text-primary transition-colors"
              >
                Contact Support
              </Link>
              <Link
                to="/privacy"
                className="hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Newsletter & Socials */}
          <div className="flex flex-col items-center md:items-start space-y-6">
            <h4 className="text-lg font-bold text-primary uppercase tracking-widest">
              Follow Our Journey
            </h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 bg-white/5 rounded-full hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                <FaFacebookF className="text-xl" />
              </a>
              <a
                href="#"
                className="p-3 bg-white/5 rounded-full hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                <FaXTwitter className="text-xl" />
              </a>
              <a
                href="#"
                className="p-3 bg-white/5 rounded-full hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                <FaLinkedinIn className="text-xl" />
              </a>
              <a
                href="#"
                className="p-3 bg-white/5 rounded-full hover:bg-primary hover:scale-110 transition-all duration-300"
              >
                <FaYoutube className="text-xl" />
              </a>
            </div>
            <p className="text-sm text-gray-500">
              Stay updated with latest opportunities.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:row justify-between items-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} ScholarStream. Built with ❤️ for
            Students.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer transition-colors">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
