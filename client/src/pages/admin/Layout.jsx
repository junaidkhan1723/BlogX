import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";
import { assets } from "../../assets/assets";
import { AppContent } from "../../context/appContext";
import Navbar from "../../components/Navbar";


const Layout = () => {

  const { navigate} = useContext(AppContent) 

 

  return (
    <>
     <Navbar/>
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
