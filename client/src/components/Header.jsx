import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContent } from "../context/appContext";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";

const Header = () => {
  const navigate = useNavigate();

  const { userData } = useContext(AppContent);

  return (
    <>
      <div className=" mt-16 sm:mt-20 mx-8 sm:mx-16 xl:mx-24 relative text-center ">
        <h1 className=" flex items-center justify-center text-gray-900 gap-2 text-xl sm:text-3xl font-semibold mb-2 sm:mb-2">
          Hey{" "}
          <span className="text-purple-800 font-semibold animate-bounceX hover:animate-wiggleX hover:text-purple-600 transition duration-300 ">
            {" "}
            {userData?.name.split(" ")[0] || "Reader"}!{" "}
          </span>{" "}
          <img
            className="w-8 aspect-square"
            src={assets.hand_wave}
            alt="icon"
          />
        </h1>
        <h2 className="text-2xl sm:text-5xl font-semibold text-gray-800 ">
          Welcome To Blog
          <span className="text-indigo-700 inline-block animate-wiggleX hover:animate-bounceX hover:text-purple-600 transition duration-300">
            X
          </span>
        </h2>

        <p className=" my-6 sm:my-8 max-w-2xl m-auto max-sm:text-sm text-gray-700">
          Write what matters, share what inspires — where thoughts meet the
          world.
        </p>

        <p className="text-gray-700 max-w-2xl mx-auto text-center text-xs sm:text-lg mt-4 mb-4">
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

        <p className="text-gray-600 text-sm sm:text-base max-w-xl mx-auto mb-8">
          {userData ? (
            <>
              You're logged in! Click <strong>“Get Started”</strong> to explore
              all the blogs.
            </>
          ) : (
            <>
              To post or explore blogs, please <strong>sign up</strong> or{" "}
              <strong>log in</strong>. You can either click the{" "}
              <strong>“Login”</strong> button below.
            </>
          )}
        </p>

        {userData ? (
          <button
            onClick={() => navigate("/blog-x")}
            className=" border border-gray-500 rounded-full px-8 py-2.5 bg-primary/10 animate-bounceX hover:animate-wiggleX hover:text-purple-600 transition-all select-none "
          >
            <i class="bi bi-door-open"></i> Get Started
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className=" border border-gray-500 rounded-full px-8 py-2.5 bg-primary/30 animate-bounceX hover:animate-wiggleX hover:text-purple-600 transition-all select-none"
          >
            Login <i class="bi bi-arrow-right"></i>
          </button>
        )}
      </div>
    </>
  );
};

export default Header;
