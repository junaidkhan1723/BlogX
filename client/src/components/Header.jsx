import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContent } from '../context/appContext'
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = ()=> {

  const navigate = useNavigate();

  const {userData} = useContext(AppContent);

  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center  text-gray-800'>
      <img src={assets.header_img} alt="" className='w-24 h-24 sm:w-50 sm:h-50 rounded-full mb-6 '/>
      <h1 className=' flex items-center gap-2 text-xl sm:text-3xl font-medium mb-2 '>Hey {userData?.name || 'Reader'}! <img className='w-10 aspect-square' src={assets.hand_wave} alt="icon"/></h1>
      <h2 className='text-2xl sm:text-5xl font-semibold mb-4 '>Welcome To BlogX</h2>
      <p className='mb-8 text-sm sm:text-xl max-w-md font-semibold text-purple-950'>This is your space to explore the latest and coolest tech trends in the IT world.
           </p>
          {userData ? 
        <button  onClick={() => navigate("/blog-x")} className=' border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-100 transition-all'>
          <i class="bi bi-door-open"></i>  Get Started
        </button>: <button  onClick={() => navigate("/login")} className=' border border-gray-500 rounded-full px-8 py-2.5  hover:bg-gray-100 transition-all'>
        <i class="bi bi-door-closed-fill"></i> Login
        </button>  }

    </div>
  )
}

export default Header
