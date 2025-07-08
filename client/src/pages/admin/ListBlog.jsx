import React, { useContext, useEffect, useState } from 'react'
import BlogTableItem from '../../components/admin/BlogTableItem';
import { AppContent } from '../../context/appContext';
import { toast } from 'react-toastify';

const ListBlog = () => {

  const [blogs, setBlogs] = useState([]);
    const {axios, backendUrl} = useContext(AppContent);
  
 // fetche blogs from server
  const fetchBlogs = async ()=>{
    try {
      const {data} = await axios.get(`${backendUrl}/api/admin/blogs`);
      if(data.success){
        setBlogs(data.blogs)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(()=>{
    fetchBlogs()
  },[]);


  return (
    <div className=' flex-1 pt-5 sm:pt-8 sm:pl-16 bg-blue-50/50'>
      <h1>All blogs</h1>

      <div className='relative  mt-4 max-w-4xl overflow-x-auto shadow-lg rounded-lg scrollbar-hide bg-white'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
                <tr>
                  <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                  <th scope='col' className='px-2 py-4'>Blog Title</th>
                  <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                  <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                  <th scope='col' className='px-2 py-4'>Actions</th>
                 
                </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index)=>{
                  return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchBlogs} index={index + 1}/>
              })}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ListBlog;
