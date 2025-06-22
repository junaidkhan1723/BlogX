import React, { useContext, useEffect } from 'react'
import {assets} from '../assets/assets.js'
import { useNavigate } from "react-router-dom"
import axios from 'axios';
import { AppContent } from '../context/appContext';
import { toast } from 'react-toastify';



function EmailVerify() {
  
  axios.defaults.withCredentials = true;
  const {backendUrl, isLoggedin, userData, getUserData, } = useContext(AppContent);

  const navigate = useNavigate();

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

    // handle otp submit 
    const onSubmitHandler = async (e) =>{
      try {
            e.preventDefault();
            const otpArray = inputRefs.current.map(e=> e.value);
            const otp = otpArray.join('');

            const {data} = await axios.post(backendUrl + '/api/auth/verify-account', {otp});

            if(data.success){
              toast.success(data.message);
              getUserData();
              navigate('/')
            }else{
              toast.error(data.message)
            }
      } catch (error) {
       toast.error(error.message)

      }
    };

      useEffect(()=>{

        isLoggedin && userData && userData.isAccountVerified && navigate('/')

      },[isLoggedin, navigate, userData])


  return (<>
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/BlogBG.png")] bg-cover bg-center'>
    <img
              onClick={() => navigate("/")}
              src={assets.logo}
              alt=""
              className="absolute left-3 sm:left-10 top-3 w-16 sm:w-24 cursor-pointer"
            /> 
            <form className='bg-slate-900 px-4 py-8 sm:p-8 rounded-lg shadow-lg w-96 text-sm ' onSubmit={onSubmitHandler}>
              <h1 className='text-white text-2xl font-semibold text-center mb-4'>Email Verify OTP</h1>
              <p className='text-center mb-6 text-indigo-300'>Enter the 6-digit code sent to your email ID.</p>
              <div className='flex justify-between mb-8' onPaste={handlePaste}> {/** input field for otp */}

                {Array(6).fill(0).map((_, index)=>(
                  <input type="text" maxLength="1" key={index} required
                  className='w-12 h-12 bg-gradient-to-br from-purple-400 to bg-blue-400 text-white text-center text-xl rounded-md'
                  ref={(e)=>{inputRefs.current[index]=e}}
                  onInput={(e)=>{handleInput(e, index)}}
                  onKeyDown={(e)=>{handleKeyDown(e, index)}}
                  />
                ))}
                
              </div>
              <button className='w-full py-3 bg-gradient-to-br from-purple-400 to bg-indigo-900 text-white rounded-full '>Verify Email</button>
            </form>
     
    </div>
    </>
  )
}

export default EmailVerify
