import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/admin/Sidebar";

const Layout = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar/>
      <div className="flex min-h-[calc(100vh-70px)] border border-t-gray-300 border-b-gray-50">
        <Sidebar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
