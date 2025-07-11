import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { assets } from "../../assets/assets";
import { AppContent } from "../../context/appContext";


const Layout = () => {


 const {setIsAdmin, navigate} = useContext(AppContent) 

const logout = () => {
  localStorage.removeItem("isAdmin");
  setIsAdmin(false);
  navigate("/blog-x");
};

  return (
    <>
     <div className="flex justify-between items-center mx-2 sm:mx-8 border-b border-gray-200">
        <img onClick={()=> navigate('/')} src={assets.logo} alt="logo" className='w-24 sm:w-32 cursor-pointer' title="Home" />
        <button onClick={logout} className='flex items-center gap-1 rounded-full text-xs sm:text-sm
               cursor-pointer bg-primary hover:bg-gray-700 text-white px-2 py-2 sm:px-6 '>Logout</button>
            
      </div>
      <button
      onClick={() => navigate('/blog-x')}
      className="fixed top-20 right-6 z-99 
                 bg-primary text-white shadow-lg 
                 hover:bg-gray-800 border border-gray-300 
                p-2 sm:p-3 rounded-full transition duration-300 
                 md:top-30 md:right-14"
      title="Go Back"
    >
       <i class="bi bi-arrow-left"></i>
    </button>
      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar />
        {/* spacing for mobile nav bar */}
        <div className="flex-grow bg-white p-4 pb-20 md:pb-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
