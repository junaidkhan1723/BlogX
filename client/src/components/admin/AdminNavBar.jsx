import React, { useContext } from 'react'
import { assets } from '../../assets/assets.js'
import { AppContent } from '../../context/appContext.jsx';

const AdminNavBar = () => {
    const {navigate, isAdmin} = useContext(AppContent)
  return (
    <>
    <div className='flex justify-between items-center mx-2 sm:mx-8'>
      <img onClick={()=> navigate('/')} src={assets.logo} alt="logo" className='w-24 sm:w-32 cursor-pointer' title="Home" />
      <button onClick={()=> navigate('/admin')} className='flex items-center gap-1 rounded-full text-xs sm:text-sm
       cursor-pointer bg-primary hover:bg-gray-700 text-white px-2 py-2 sm:px-6 '>{isAdmin ? 'Dashboard' : 'Admin'}<img src={assets.arrow} alt="" className='w-3' /> </button>
    </div>
    </>
  )
}

export default AdminNavBar
