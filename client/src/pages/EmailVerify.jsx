import React, { useContext, useEffect, useState, useRef } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContent } from "../context/appContext";
import { toast } from "react-toastify";

function EmailVerify() {
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent);
  const navigate = useNavigate();

  const inputRefs = useRef([]); // Refs to all OTP input boxes
  const [isOtpComplete, setIsOtpComplete] = useState(false); // Flag to enable submit when all boxes are filled
  const [cooldown, setCooldown] = useState(0); // Cooldown timer for resend button

  axios.defaults.withCredentials = true;

  // Send initial OTP when component mounts
  useEffect(() => {
    const sendInitialOtp = async () => {
      try {
        const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp", {
          userId: userData?._id,
        });
        if (data.success) {
          toast.success("OTP sent to your email.");
          setCooldown(60); // Start cooldown after initial OTP
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error("Failed to send OTP.");
      }
    };

    if (isLoggedin && userData?._id && !userData.isAccountVerified) {
      sendInitialOtp();
    }
  }, [isLoggedin, userData, backendUrl]);

  // Focus on the first OTP input when component mounts
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Check if all OTP fields are filled to enable the Verify button
  useEffect(() => {
    const checkOtpFilled = () => {
      const allFilled = inputRefs.current.every(
        (input) => input && input.value.length === 1
      );
      setIsOtpComplete(allFilled);
    };

    inputRefs.current.forEach((input) => {
      if (input) {
        input.addEventListener("input", checkOtpFilled);
      }
    });

    return () => {
      inputRefs.current.forEach((input) => {
        if (input) {
          input.removeEventListener("input", checkOtpFilled);
        }
      });
    };
  }, []);

  // Start cooldown timer when resend OTP is triggered
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) clearInterval(timer);
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [cooldown]);

  // Move to next input field on typing
  const handleInput = (e, index) => {
    const value = e.target.value;
    if (value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Move to previous field on backspace if current field is empty
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste of full OTP
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text").slice(0, 6);
    paste.split("").forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
    setIsOtpComplete(true);
    inputRefs.current[paste.length - 1]?.focus();
  };

  // Submit OTP to backend for verification
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const otp = inputRefs.current.map((input) => input.value).join("");

    try {
      const { data } = await axios.post(backendUrl + "/api/auth/verify-account", {
        userId: userData?._id,
        otp,
      });

      if (data.success) {
        toast.success(data.message);
        await getUserData(); // Refresh user data
        navigate("/"); // Redirect to home
      } else {
        toast.error(data.message);
        inputRefs.current.forEach((input) => (input.value = ""));
        setIsOtpComplete(false);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      toast.error(error.message);
      inputRefs.current.forEach((input) => (input.value = ""));
      setIsOtpComplete(false);
      inputRefs.current[0]?.focus();
    }
  };

  // Trigger resend OTP API
  const handleResendOtp = async () => {
    try {
      const { data } = await axios.post(backendUrl + "/api/auth/send-verify-otp", {
        userId: userData?._id,
      });
      if (data.success) {
        toast.success("OTP resent to your email.");
        setCooldown(60);
        inputRefs.current.forEach((input) => (input.value = ""));
        setIsOtpComplete(false);
        inputRefs.current[0]?.focus();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to resend OTP.");
    }
  };

  // Redirect verified users
  useEffect(() => {
    if (isLoggedin && userData?.isAccountVerified) {
      navigate("/");
    }
  }, [isLoggedin, userData, navigate]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/BlogBG.png")] bg-cover bg-center'>
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="logo"
        className="absolute left-3 sm:left-10 top-3 w-16 sm:w-24 cursor-pointer"
      />

      {/* OTP Form */}
      <form
        onSubmit={onSubmitHandler}
        className="bg-slate-900 px-4 py-8 sm:p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Email Verify OTP
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter the 6-digit code sent to your email ID.
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-between mb-6" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                required
                className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 text-white text-center text-xl rounded-md"
                ref={(el) => (inputRefs.current[index] = el)}
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isOtpComplete}
          className={`w-full py-3 rounded-full transition-all ${
            isOtpComplete
              ? "bg-gradient-to-br from-purple-400 to-indigo-900 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Verify Email
        </button>

        {/* Resend OTP Link with Cooldown */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={handleResendOtp}
            disabled={cooldown > 0}
            className={`text-indigo-300 hover:underline text-sm ${
              cooldown > 0 ? "cursor-not-allowed text-gray-400" : ""
            }`}
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EmailVerify;