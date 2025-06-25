import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sing Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm Password
  const [showPassword, setShowPassword] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (state === "Sing Up" && password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      axios.defaults.withCredentials = true;

      if (state === "Sing Up") {
        const { data } = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        if (data.success) {
          toast.success(data.message);
          setIsLoggedin(true);
          navigate("/");
          getUserData();
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        if (data.success) {
          toast.success("Logged In Successfully");
          setIsLoggedin(true);
          navigate("/");
          getUserData();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-3 sm:left-10 top-3 w-16 sm:w-24 cursor-pointer"
      />

      <div className="bg-gradient-to-br from-purple-400 to bg-blue-400 p-8 sm:p-10 rounded-lg shadow-lg w-full max-w-sm text-indigo-500 text-sm">
        <h2 className="text-3xl font-semibold text-white text-center mb-3">
          {state === "Sing Up" ? "Create Account" : "Login"}
        </h2>
        <p className="text-center text-sm mb-6 text-purple-950">
          {state === "Sing Up"
            ? "Create your account"
            : "Login to your account"}
        </p>

        <form onSubmit={onSubmitHandler}>
          {state === "Sing Up" && (
            <>
              <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">
                <img src={assets.person_icon} alt="" className="w-5 h-5" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  name="name"
                  className="bg-transparent outline-none text-purple-950 w-full truncate"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
            </>
          )}

          <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">
            <img src={assets.mail_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              className="bg-transparent outline-none text-purple-950 w-full truncate"
              type="email"
              placeholder="Email ID"
              required
            />
          </div>

          <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-200 to bg-[#c8c8c8] relative">
            <img src={assets.lock_icon} alt="" className="w-5 h-5" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name="password"
              className="bg-transparent outline-none text-purple-950 w-full truncate"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 text-xs text-gray-700 cursor-pointer"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.28 2.22a.75.75 0 0 0-1.06 1.06l14.5 14.5a.75.75 0 1 0 1.06-1.06l-1.745-1.745a10.029 10.029 0 0 0 3.3-4.38 1.651 1.651 0 0 0 0-1.185A10.004 10.004 0 0 0 9.999 3a9.956 9.956 0 0 0-4.744 1.194L3.28 2.22ZM7.752 6.69l1.092 1.092a2.5 2.5 0 0 1 3.374 3.373l1.091 1.092a4 4 0 0 0-5.557-5.557Z"
                    clipRule="evenodd"
                  />
                  <path d="m10.748 13.93 2.523 2.523a9.987 9.987 0 0 1-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 0 1 0-1.186A10.007 10.007 0 0 1 2.839 6.02L6.07 9.252a4 4 0 0 0 4.678 4.678Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="size-5"
                >
                  <path d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path
                    fillRule="evenodd"
                    d="M.664 10.59a1.651 1.651 0 0 1 0-1.186A10.004 10.004 0 0 1 10 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0 1 10 17c-4.257 0-7.893-2.66-9.336-6.41ZM14 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </span>
          </div>

          {/* ✅ Confirm Password */}
          {state === "Sing Up" && (
            <div className="mb-4 flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">
              <img src={assets.lock_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                name="confirmPassword"
                className="bg-transparent outline-none text-purple-950 w-full truncate"
                type={showPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
              />
            </div>
          )}

          <p
            onClick={() => navigate("/reset-password")}
            className="mb-4 cursor-pointer text-black hover:text-gray-100 transition-all"
          >
            Forgot Password?
          </p>

          <button className="w-full py-4 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:bg-purple-100 transition-all cursor-pointer">
            {state}
          </button>
        </form>

        {state === "Sing Up" ? (
          <p className="text-gray-950 text-center text-xs mt-4">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-950 cursor-pointer underline font-semibold"
            >
              Login here
            </span>
          </p>
        ) : (
          <p className="text-gray-950 text-center text-xs mt-4">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sing Up")}
              className="text-blue-950 cursor-pointer underline font-semibold"
            >
              Sing Up
            </span>
          </p>
        )}

        <p
          onClick={() => navigate("/")}
          className="text-blue-950 underline cursor-pointer text-center text-md mt-3"
        >
          Back to Home
        </p>
      </div>
    </div>
  );
}

export default Login;
