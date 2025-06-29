import './Navbar.css'
import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } =
    useContext(AppContent);

  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cooldown state (seconds)
  const [cooldown, setCooldown] = useState(0);
  const [isSending, setIsSending] = useState(false);

  // Function to send verification OTP
  const sendVerificationOtp = async () => {
    if (cooldown > 0 || isSending) return;

    try {
      setIsSending(true); // disable button
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(
        backendUrl + "/api/auth/send-verify-otp"
      );

      if (data.success) {
        toast.success(data.message);
        navigate("/email-verify");
        setCooldown(10); // Start cooldown
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSending(false); // re-enable send flag after request
    }
  };

  // Handle cooldown countdown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  // Logout
  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(backendUrl + "/api/auth/logout");

      if (data.success) {
        toast.success(data.message);

        // Clear state before navigating
        setIsLoggedin(false);
        setUserData(null);

        // Delay navigation slightly to avoid render issues
        setTimeout(() => {
          navigate("/");
        }, 100);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div
        className="w-full flex justify-between items-center px-1 py-1 sm:py-0 sm:px-4
               fixed top-0 left-0 z-100 bg-transparent"
      >
        <img
          src={assets.logo}
          alt="Logo"
          className="w-30 sm:w-40 cursor-pointer"
          onClick={() => navigate("/")}
        />

        {userData ? (
          <div ref={menuRef} className="relative">
            <div
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-12 h-10 sm:w-16 sm:h-12 flex justify-center items-center border border-gray-500
            text-black font-semibold rounded-lg bg-primary/30 hover:bg-gray-300 transition-all cursor-pointer mb-3 me-3"
            >
              <span className="text-xl select-none">{userData.name[0].toUpperCase()}</span>

              {/* ✅ Show tick if verified */}
              {userData.isAccountVerified && (
                <sup className="text-blue-800 ml-1">
                  <i className="bi bi-patch-check-fill"></i>
                </sup>
              )}
            </div>

            {/* ✅ Dropdown Menu */}
            {menuOpen && (
              <ul className="absolute right-0 mt-2 bg-gray-300 text-sm rounded shadow-md z-10 min-w-[140px] select-none">
                {!userData.isAccountVerified && (
                  <li
                    onClick={sendVerificationOtp}
                    className={`py-2 px-4 ${
                      cooldown > 0 || isSending
                        ? "text-gray-400 cursor-not-allowed"
                        : "hover:bg-gray-200 cursor-pointer"
                    }`}
                  >
                    <span className="text-blue-700 text-xs">
                      <i class="bi bi-patch-check-fill"></i>
                    </span>
                    {isSending
                      ? "Sending..."
                      : cooldown > 0
                      ? `Wait ${cooldown}s`
                      : `Verify Email`}
                  </li>
                )}
                {/** home icon */}

                <li
                  onClick={() => {
                    navigate("/");
                  }}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-purple-600 select-none"
                >
                  <i class="bi bi-house"></i> Home
                </li>

                {/** profile icon */}
                <li
                  onClick={() => {
                    navigate("/your-space");
                  }}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-blue-600 select-none"
                >
                  <i class="bi bi-person-check"></i> Profile
                </li>
                {/** Read Blogs icon */}

                <li
                  onClick={() => {
                    navigate("/blog-x");
                  }}
                  className="py-2 px-4 hover:bg-gray-200 cursor-pointer text-gray-700 select-none"
                >
                  <i class="bi bi-book"></i> Read BX
                </li>
                {/** logout icon */}

                <li
                  onClick={logout}
                  className="py-2 px-4 text-red-700 hover:bg-gray-200 cursor-pointer select-none"
                >
                  <i class="bi bi-box-arrow-right"></i> Logout
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="flex items-center text-xl gap-2 bg-indigo-700 border border-gray-500 rounded-full px-4 py-2 sm:px-6 sm:py-3 text-white hover:bg-gray-700 transition-all select-none"
          >
            <i className="bi bi-person-add"></i>
          </button>
        )}
      </div>
    </>
  );
}

export default Navbar;
