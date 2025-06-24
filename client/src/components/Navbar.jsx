import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent);

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
        setIsLoggedin(false);
        setUserData(false);
        navigate("/");
        toast.success(data.message);
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
    <div
      className="w-full flex justify-between items-center p-4 sm:p-2 sm:px-16 
                 fixed top-0 left-0 z-50 backdrop-blur-sm bg-transparent"
    >
      <img
        src={assets.logo}
        alt="Logo"
        className="w-18 sm:w-22 cursor-pointer"
        onClick={() => navigate("/")}
      />

      {userData ? (
        <div ref={menuRef} className="relative">
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className="w-16 h-12 flex justify-center items-center border border-gray-500
              text-black font-semibold rounded-lg hover:bg-gray-300 transition-all cursor-pointer"
          >
            <span className="text-xl">{userData.name[0].toUpperCase()}</span><sup className="text-blue-800"><i class="bi bi-patch-check-fill"></i></sup>
          </div>

          {menuOpen && (
            <ul className="absolute right-0 mt-2 bg-gray-300 text-sm rounded shadow-md z-10 min-w-[140px]">
              {!userData.isAccountVerified && (
                <li
                  onClick={sendVerificationOtp}
                  className={`py-2 px-4 ${
                    cooldown > 0 || isSending
                      ? "text-gray-400 cursor-not-allowed"
                      : "hover:bg-gray-200 cursor-pointer"
                  }`}
                >
                  {isSending
                    ? "Sending..."
                    : cooldown > 0
                    ? `Wait ${cooldown}s`
                    : "Verify Email"}
                </li>
              )}
              <li
                onClick={logout}
                className="py-2 px-4 text-red-700 hover:bg-gray-200 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center text-xl-center gap-2 border border-gray-500 rounded-full px-4 py-4 text-gray-800 hover:bg-gray-100 transition-all"
        >
          <i class="bi bi-person-add"></i>
        </button>
      )}
    </div>
  );
}

export default Navbar;
