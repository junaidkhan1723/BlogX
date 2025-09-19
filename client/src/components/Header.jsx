import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);

  return (
    <header className="w-full max-w-6xl mx-auto px-6 sm:px-8 py-1 text-center select-none">
      {/* Greeting Section */}
      <div className="mb-2 sm:mb-4">
        <h1 className="flex items-center justify-center gap-2 text-2xl sm:text-4xl font-medium text-gray-700 mb-3">
          Hey{" "}
          <span className="text-gray-900 font-semibold animate-bounceX hover:animate-wiggleX transition duration-300">
            {userData?.name.split(" ")[0] || "Reader"}
          </span>
          <img className="w-6 h-6" src={assets.hand_wave} alt="wave" />
        </h1>
      </div>

      {/* Main Heading */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
          Welcome to <span className="shimmer-text transition-all">BlogX</span>
        </h2>

        {/* Primary Tagline */}
        <p className="sm:w-[600px] text-xl sm:text-2xl text-gray-600 font-light leading-wide sm:leading-relaxed mx-auto">
          Write what matters, share what inspires — where thoughts meet the
          world.
        </p>
      </div>

      {/* Description Section */}
      <div className="sm:mb-6 mb-6 ">
        <p className="text-base sm:text-lg text-gray-700 leading-relaxed sm:w-[600px] mx-auto ">
          <strong>BlogX</strong> is your dedicated space to learn and grow as a
          full-stack developer. Explore comprehensive blogs covering frontend,
          backend, databases, dev tools, and deployment — all in one place.
        </p>
      </div>

      {/* User Status Info */}
      <div className="mb-6 sm:mb-8">
        <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto sm:w-[400px]">
          {userData ? (
            <>
              You're logged in! Click <strong>"Get Started"</strong> to explore
              all the blogs.
            </>
          ) : (
            <>
              To post or explore blogs, please <strong>sign up</strong> or{" "}
              <strong>log in</strong>. Click the <strong>"Get Started"</strong> button
              below.
            </>
          )}
        </p>
      </div>

      {/* Action Button */}
      <div className="flex justify-center">
        {userData ? (
          <button
            onClick={() => navigate("/blog-x")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            <i className="bi bi-book text-lg"></i>
            Start Reading
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
          >
            Get Started
            <i className="bi bi-arrow-right text-lg"></i>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
