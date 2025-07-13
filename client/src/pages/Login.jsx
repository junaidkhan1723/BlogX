import React, { useContext, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent);

  const [state, setState] = useState("Sing Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // loader state

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loader

    if (state === "Sing Up" && password !== confirmPassword) {
      toast.error("Passwords do not match");
      setLoading(false); // Stop loader
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
          toast.success("Login Successful");
          setIsLoggedin(true);
          navigate("/");
          getUserData();
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false); // Stop loader
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 sm:px-0 bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">
      <img
        onClick={() => navigate("/")}
        src={assets.logo}
        alt="Logo"
        className="absolute left-3 sm:left-10 top-3 w-30 sm:w-40 cursor-pointer"
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

        {/* Loader or Form */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader />
          </div>
        ) : (
          <form onSubmit={onSubmitHandler}>
            {state === "Sing Up" && (
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
                <i className="bi bi-eye"></i>
              ) : (
                <i className="bi bi-eye-slash"></i>
              )}
              </span>
            </div>

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
        )}

        {/* Toggle form type */}
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
              Sign Up
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
