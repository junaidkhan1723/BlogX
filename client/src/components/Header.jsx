import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContent);

  return (
    <header className="mx-4 sm:mx-16 xl:mx-24 relative text-center py-12">
      {/* Greeting */}
      <h1 className="flex items-center justify-center text-gray-900 gap-2 text-2xl sm:text-3xl font-semibold mb-4">
        Hey{" "}
        <span className="text-purple-800 font-bold hover:text-purple-600 animate-bounceX hover:animate-wiggleX transition duration-300">
          {userData?.name.split(" ")[0] || "Reader"}!
        </span>
        <img
          className="w-8 aspect-square"
          src={assets.hand_wave}
          alt="wave"
        />
      </h1>

      {/* Main Heading */}
      <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight text-gray-900">
        Welcome to{" "}
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
          BlogX
        </span>
      </h2>

      {/* Tagline */}
      <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-700">
        Write what matters, share what inspires — where thoughts meet the world.
      </p>

      {/* Secondary Description */}
      <p className="mt-4 max-w-3xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
        <span className="font-semibold text-indigo-700">BlogX</span> is your
        dedicated space to{" "}
        <span className="font-medium text-purple-700">learn</span> and{" "}
        <span className="font-medium text-purple-700">grow</span> as a{" "}
        <span className="font-semibold text-indigo-700">
          full-stack developer
        </span>
        . Explore blogs covering everything from{" "}
        <span className="font-medium text-blue-700">frontend</span> to{" "}
        <span className="font-medium text-blue-700">backend</span>,{" "}
        <span className="font-medium text-green-700">databases</span>,{" "}
        <span className="font-medium text-yellow-700">dev tools</span>, and{" "}
        <span className="font-medium text-pink-700">deployment</span> — all in
        one place.
      </p>

      {/* Login Info */}
      <p className="mt-6 max-w-xl mx-auto text-gray-600 text-sm sm:text-base">
        {userData ? (
          <>
            You’re logged in! Click <strong>“Get Started”</strong> to explore
            all the blogs.
          </>
        ) : (
          <>
            To post or explore blogs, please <strong>sign up</strong> or{" "}
            <strong>log in</strong>. Click the{" "}
            <strong>“Login”</strong> button below.
          </>
        )}
      </p>

      {/* Button */}
      <div className="mt-8">
        {userData ? (
          <button
            onClick={() => navigate("/blog-x")}
            className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-8 py-3 bg-indigo-600 text-white font-medium shadow hover:bg-indigo-700 transition cursor-pointer"
          >
            <i className="bi bi-door-open"></i> Get Started
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 border border-gray-300 rounded-full px-8 py-3 bg-purple-600 text-white font-medium shadow hover:bg-purple-700 transition cursor-pointer"
          >
            Login <i className="bi bi-arrow-right"></i>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
