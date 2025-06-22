import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContent } from "../context/appContext";
import axios from "axios";
import { toast } from "react-toastify";

function ResetPassword() {

    const { backendUrl } = useContext(AppContent);

    axios.defaults.withCredentials = true;


  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [isEmailSent, setIsEmailSent] = useState('');
  const [otp, setOtp] = useState(0);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

    const inputRefs = React.useRef([]);
  
  
      // handle input, add number to next input field automatically
      const handleInput = (e, index)=>{
        if(e.target.value.length > 0 && index < inputRefs.current.length - 1){
          inputRefs.current[index + 1].focus();
        }
      };
  
       // remove the number from input field via backspace
      const handleKeyDown = (e, index)=>{
        if(e.key === 'Backspace' && e.target.value === '' && index > 0){
          inputRefs.current[index - 1].focus();
        }
      };
  
      //handle copy paste otp
  
      const handlePaste = (e)=>{
        const paste = e.clipboardData.getData('text')
        const pasteArray = paste.split('');
        pasteArray.forEach((char, index)=>{
          if(inputRefs.current[index]){
            inputRefs.current[index].value = char;
          }
        })
      };

      const onSubmitEmail = async (e)=>{
        e.preventDefault();

        try {
          const {data} = await axios.post(backendUrl + '/api/auth/send-reset-opt', {email})
          data.success ? toast.success(data.message) : toast.error(data.message);
          data.success && setIsEmailSent(true);
          
        } catch (error) {
          toast.error(error.message)
        }
      };

      const onSubmitOTP = async (e)=>{
        e.preventDefault();
        const otpArray = inputRefs.current.map(e => e.value);
        setOtp(otpArray.join(''));
        setIsOtpSubmitted(true);
      };

     const onSubmitNewPassword = async (e) => {
  e.preventDefault();
  try {
    const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
      email,
      otp,
      newPassword
    });

    data.success ? toast.success(data.message) : toast.error(data.message);
    if (data.success) navigate('/login');
  } catch (error) {
    toast.error(error.message);
  }
};


  return (
    <>
      <div className="flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-indigo-600 to bg-purple-400">
        <img
          onClick={() => navigate("/")}
          src={assets.logo}
          alt=""
          className="absolute left-3 sm:left-10 top-3 w-16 sm:w-24 cursor-pointer"
        />
          {/** enter email id */}

          {!isEmailSent && 
        <form onSubmit={onSubmitEmail} className="bg-slate-900 px-4 py-8 sm:p-8 rounded-lg shadow-lg w-96 text-sm ">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter your registered email ID.
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-indigo-500">
            <img src={assets.mail_icon} alt="" />
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              name="email"
              className="bg-transparent outline-none text-white font-semibold"
              type="email"
              placeholder="Email ID"
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-br from-purple-400 to bg-indigo-900 text-white rounded-full ">
            Submit
          </button>
        </form>
        }

        {/** otp input form */}

        {!isOtpSubmitted && isEmailSent &&

        <form onSubmit={onSubmitOTP}
          className="bg-slate-900 px-4 py-8 sm:p-8 rounded-lg shadow-lg w-96 text-sm "
          
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter the 6-digit code sent to your email ID.
          </p>
          <div className="flex justify-between mb-8" onPaste={handlePaste}>
            {" "}
            {/** input field for otp */}
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  type="text"
                  maxLength="1"
                  key={index}
                  required
                  className="w-12 h-12 bg-gradient-to-br from-purple-400 to bg-blue-400 text-white text-center text-xl rounded-md"
                  ref={(e) => {
                    inputRefs.current[index] = e;
                  }}
                  onInput={(e) => {
                    handleInput(e, index);
                  }}
                  onKeyDown={(e) => {
                    handleKeyDown(e, index);
                  }}
                />
              ))}
          </div>
          <button className="w-full py-2.5 bg-gradient-to-br from-purple-400 to bg-indigo-900 text-white rounded-full ">
            Submit
          </button>
        </form>
        }

        {/** enter new password */}

        {isOtpSubmitted && isEmailSent &&  
         <form onSubmit={onSubmitNewPassword} className="bg-slate-900 px-4 py-8 sm:p-8 rounded-lg shadow-lg w-96 text-sm ">
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            New Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter New Password
          </p>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-indigo-500">
            <img src={assets.lock_icon} alt="" />
            <input
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              value={newPassword}
              name="password"
              className="bg-transparent outline-none text-white font-semibold"
              type="password"
              placeholder="Enter New Password"
              required
            />
          </div>
          <button className="w-full py-3 bg-gradient-to-br from-purple-400 to bg-indigo-900 text-white rounded-full ">
            Submit
          </button>
        </form>
        }
      </div>
    </>
  );
}

export default ResetPassword;
