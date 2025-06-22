import React, { useContext } from "react";
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/appContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();

  const {userData, backendUrl, setUserData, setIsLoggedin} = useContext(AppContent);
  // sends verifiaction OTP
  const sendVerificationOtp = async ()=>{
    try {

      axios.defaults.withCredentials = true;

      const {data} = await axios.post(backendUrl + '/api/auth/send-verify-otp'); //path to connect backend

      if(data.success){
        navigate('/email-verify');
        toast.success(data.message)
      }else{
        toast.error(data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }
// handle logout 
  const logout = async ()=>{
    try {

      axios.defaults.withCredentials = true;
      const {data} = await axios.post(backendUrl  + '/api/auth/logout');
      data.success && setIsLoggedin(false);
      data.success && setUserData(false);
      navigate('/')
      toast.success(data.message)
      
    } catch (error) {

      toast.error(error.message)
      
    }
  }

  return (
    <>
      <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">
        <img src={assets.logo} alt="" className="w-18 sm:w-22" />
        {userData ?
        <div className="w-10 h-10 flex justify-center items-center border border-gray-500
        text-black font-semibold relative group
        rounded-full hover:bg-gray-300 transition-all cursor-pointer ">
              {userData.name[0].toUpperCase()}

              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-sky-600 rounded pt-10">
                 <ul className=" list-none m-0 p-3 border-none rounded bg-gray-300 text-sm"> 
                  {!userData.isAccountVerified && 
                <li onClick={sendVerificationOtp} className=" py-1 px-1 hover:bg-gray-200 cursor-pointer">Verify Email</li>}
                <li onClick={logout} className="py-1 px-2 text-red-700 hover:bg-gray-200 cursor-pointer pr-10">Logout</li>

              </ul>
              </div>
        </div> :

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-gray-500 rounded-full px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all"
        >
          Login <img src={assets.arrow_icon} alt="" />
        </button>

      }        
      </div>
    </>
  );
}

export default Navbar;
