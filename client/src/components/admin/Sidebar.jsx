import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { motion } from 'framer-motion';

const sidebarLinks = [
  { to: '/admin', icon: assets.home_icon, label: 'Dashboard', exact: true },
  { to: '/admin/addBlog', icon: assets.add_icon, label: 'Add Blogs' },
  { to: '/admin/listBlog', icon: assets.list_icon, label: 'Blog Lists' },
  { to: '/admin/comments', icon: assets.comment_icon, label: 'Comments' },
];

const Sidebar = () => {
  return (
    <motion.div
      className="flex md:flex-col fixed bottom-0 md:static w-full md:w-auto bg-white z-50 shadow-md md:shadow-none border-t md:border-t-0 md:border-r border-gray-200"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {sidebarLinks.map(({ to, icon, label, exact }) => (
        <NavLink
          key={label}
          end={exact}
          to={to}
          className={({ isActive }) =>
            `flex flex-1 justify-center md:justify-start items-center gap-3 py-3.5 md:px-9 
            cursor-pointer transition-colors duration-200 ${
              isActive ? 'bg-primary/10 border-t-4 md:border-t-0 md:border-r-4 border-primary' : ''
            }`
          }
        >
          <img src={icon} alt={label} className="w-5" />
          <p className="hidden md:inline-block">{label}</p>
        </NavLink>
      ))}
    </motion.div>
  );
};

export default Sidebar;
