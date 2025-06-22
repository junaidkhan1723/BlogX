import React, { useContext, useState } from "react";
import axios from 'axios'
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const {backendUrl, setIsLoggedin, getUserData} = useContext(AppContent);

  const [state, setState] = useState("Sing Up");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const onSubmitHandler = async (e) => {
  try {
    e.preventDefault();

    axios.defaults.withCredentials = true;

      // Sing Up API 
    if (state === 'Sing Up') {
      const { data } = await axios.post(backendUrl + '/api/auth/register', {
        name,
        email,
        password
      });

      if (data.success) {
        toast.success(data.message)
        setIsLoggedin(true);
        navigate('/');
        getUserData();

      } else {
        toast.error(data.message);
      }
    }else{  //login API
      const { data } = await axios.post(backendUrl + '/api/auth/login', {
        email,
        password
      });

      if (data.success) {
        toast.success(data.message)
        setIsLoggedin(true);
        navigate('/');
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
    <>
        {/* page theme */}
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">

        {/* Logo Image */}
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-3 sm:left-10 top-3 w-16 sm:w-24 cursor-pointer"
        /> 
        <div className="bg-gradient-to-br from-purple-400 to bg-blue-400 p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-500 text-sm">
          <h2 className="text-3xl font-semibold text-white text-center mb-3  ">
            {state === "Sing Up" ? "Create Account" : "Login"}  {/* toggle according to condition */}
          </h2>
          <p className=" text-center text-sm mb-6 text-purple-950 ">
            {state === "Sing Up"
              ? "Create your account"
              : "Login to your account"}
          </p>

          <form onSubmit={onSubmitHandler}>

            {/** toggle between sign up and login Fullname input  */}
            {state === "Sing Up" && (
              <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">
                <img src={assets.person_icon} alt="" />
                <input
                  onChange={(e) => setName(e.target.value)}
                  value={name} name="name"
                  className="bg-transparent outline-none text-purple-950"
                  type="text"
                  placeholder="Full Name"
                  required
                />
              </div>
            )}
                {/** Email Input  */}
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">
              <img src={assets.mail_icon} alt="" />
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email} name='email'
                className="bg-transparent outline-none text-purple-950"
                type="email"
                placeholder="Email ID"
                required
              />
            </div>
                  {/** password input */}
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-gradient-to-br from-blue-200 to bg-[#c8c8c8]">
              <img src={assets.lock_icon} alt="" />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password} name="password"
                className="bg-transparent outline-none text-purple-950"
                type="password"
                placeholder="Password"
                required
              />
            </div>
                  {/** forgot pass, navigate to reset-password page */}
            <p
              onClick={() => {
                navigate("/reset-password");
              }}
              className="mb-4 cursor-pointer text-black hover:text-gray-100 transition-all"> Forgot Password? </p>


                {/** button for Singup and Login, Changes according to the state */}
            <button className=" w-full py-5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium hover:bg-purple-100 transition-all cursor-pointer">
              {state}
            </button>
          </form>

          {/** form toggle between SingUp and Login*/}

          {state === "Sing Up" ? (
            <p className="text-gray-950 text-center text-xs mt-4 ">
              Already have an account?{" "}
              <span
                onClick={() => setState("Login")}
                className="text-blue-950 cursor-pointer underline font-semibold"
              >
                Login here
              </span>
            </p>
          ) : (
            <p className="text-gray-950 text-center text-xs mt-4 ">
              Don't have an account?{" "}
              <span
                onClick={() => setState("Sing Up")}
                className="text-blue-950 cursor-pointer underline font-semibold"
              >
                Sing Up
              </span>
            </p>
          )}

          <p onClick={() => navigate("/")} className="text-blue-950 underline cursor-pointer text-center text-md mt-3">Back to Home </p>

        </div>
      </div>    
    </>
  );
}

export default Login;
