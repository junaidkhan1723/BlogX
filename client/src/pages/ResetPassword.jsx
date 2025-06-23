import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {
  const { backendUrl } = useContext(AppContent);
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  // Form states
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState(0);

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  // OTP Input refs
  const inputRefs = useRef([]);

  // Cooldown timer state
  const [cooldown, setCooldown] = useState(0);

  // Cooldown effect hook
  useEffect(() => {
    let interval;
    if (cooldown > 0) {
      interval = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [cooldown]);

  // Handle input auto focus
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste event across OTP inputs
  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").trim().slice(0, 6);
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // Send reset OTP
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    if (cooldown > 0) {
      toast.warn("Please wait before requesting another OTP.");
      return;
    }
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/send-reset-opt",
        { email }
      );
      if (data.success) {
        toast.success(data.message);
        setIsEmailSent(true);
        setCooldown(60);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle OTP form submission
  const onSubmitOTP = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((el) => el.value);
    const fullOtp = otpArray.join("");
    setOtp(fullOtp);
    setIsOtpSubmitted(true);
  };

  // Final password reset submission
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        backendUrl + "/api/auth/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-indigo-600 to bg-purple-400">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt=""
        className="absolute left-3 sm:left-10 top-3 w-16 sm:w-24 cursor-pointer"
      />

      {/* Email Form */}
      {!isEmailSent && (
        <form
          onSubmit={onSubmitEmail}
          className="bg-slate-900 px-4 py-8 sm:p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email ID.
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-indigo-500">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className="bg-transparent outline-none text-white font-semibold"
              type="email"
              placeholder="Email ID"
              required
            />
          </div>
          <button
            disabled={cooldown > 0}
            className={`w-full py-3 text-white rounded-full transition-all ${
              cooldown > 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-br from-purple-400 to bg-indigo-900"
            }`}
          >
            {cooldown > 0 ? `Wait ${cooldown}s` : "Submit"}
          </button>
        </form>
      )}

      {/* OTP Form */}
      {isEmailSent && !isOtpSubmitted && (
        <form
          onSubmit={onSubmitOTP}
          className="bg-slate-900 px-6 py-8 sm:p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email ID.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-gradient-to-br from-purple-400 to bg-blue-400 text-white text-center text-xl rounded-md"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
          </div>
          <button className="w-full py-2.5 bg-gradient-to-br from-purple-400 to bg-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}

      {/* New Password Form */}
      {isEmailSent && isOtpSubmitted && (
        <form
          onSubmit={onSubmitNewPassword}
          className="bg-slate-900 px-4 py-8 sm:p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your new password below.
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-indigo-500">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
              name="password"
              className="bg-transparent outline-none text-white font-semibold"
              type="password"
              placeholder="Enter New Password"
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-br from-purple-400 to bg-indigo-900 text-white rounded-full">
            Submit
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
