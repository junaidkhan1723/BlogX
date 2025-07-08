import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { AppContent } from '../../context/appContext';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Dashboard = () => {
  const { axios, backendUrl } = useContext(AppContent);

  const [dashboard, setDashboard] = useState({
    blogs: 0,
    comments: 0,
    drafts: 0,
    recentBlogs: []
  });

  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`);
      data.success
        ? setDashboard(data.dashboardData)
        : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className='flex-1 md:py-4 md:px-14 bg-blue-50/50'>

      {loading ? (
        <Loader/>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {/* Blogs */}
            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
              <img src={assets.dashboard_icon_1} alt="Blogs Icon" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashboard.blogs}</p>
                <p className='text-gray-400 font-light'>Blogs</p>
              </div>
            </div>

            {/* Comments */}
            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
              <img src={assets.dashboard_icon_2} alt="Comments Icon" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashboard.comments}</p>
                <p className='text-gray-400 font-light'>Comments</p>
              </div>
            </div>

            {/* Drafts */}
            <div className='flex items-center gap-4 bg-white p-4 min-w-58 rounded shadow cursor-pointer hover:scale-105 transition-all'>
              <img src={assets.dashboard_icon_3} alt="Drafts Icon" />
              <div>
                <p className='text-xl font-semibold text-gray-600'>{dashboard.drafts}</p>
                <p className='text-gray-400 font-light'>Drafts</p>
              </div>
            </div>
          </div>

          {/* Latest Blogs Header */}
          <div className='flex items-center gap-3 m-4 mt-6 text-gray-600'>
            <img src={assets.dashboard_icon_4} alt="Recent Blogs Icon" />
            <p>Latest Blogs</p>
          </div>

          {/* Blogs Table */}
          <div className='relative max-w-4xl overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-white'>
            <table className='w-full text-sm text-gray-500'>
              <thead className='text-xs text-gray-600 text-left uppercase bg-gray-50'>
                <tr>
                  <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                  <th scope='col' className='px-2 py-4'>Blog Title</th>
                  <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                  <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                  <th scope='col' className='px-2 py-4'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {dashboard?.recentBlogs?.length > 0 ? (
                  dashboard.recentBlogs.map((blog, index) => (
                    <BlogTableItem
                      key={blog._id}
                      blog={blog}
                      fetchBlogs={fetchDashboard}
                      index={index + 1}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-400">
                      No blogs found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
