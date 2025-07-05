import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/admin/Sidebar";

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row min-h-screen border border-t-gray-300">
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
