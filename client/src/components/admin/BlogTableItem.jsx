import React, { useContext } from 'react'
import { assets } from '../../assets/assets';
import { AppContent } from '../../context/appContext';
import { toast } from 'react-toastify';

const BlogTableItem = ({blog, fetchBlogs, index}) => {

    const {title, createdAt} = blog;
    const BlogDate = new Date(createdAt);

    const {axios, backendUrl} = useContext(AppContent)

    // delete blogs
    const deleteBlog = async ()=>{
      const confirm = window.confirm('Are you sure you want to delete this blog?');
      if(!confirm) return;
      try {
      const {data} = await axios.post(`${backendUrl}/api/blog/delete`, {id: blog._id});
      if(data.success){
        toast.success(data.message)
        await fetchBlogs();
      }else{
        toast.error(data.message)
      }
      } catch (error) {
        toast.error(error.message)
      }
    };


    // toggle publish
     const togglePublish = async ()=>{
      try {
        const {data} = await axios.post(`${backendUrl}/api/blog/toggle-publish`, {id: blog._id});
      if(data.success){
        toast.success(data.message)
        await fetchBlogs();
      }else{
        toast.error(data.message)
      }
      } catch (error) {
        toast.error(error.message)
      }
    };
     

  return (
    <>
    <tr className='border-y border-gray-300  '>
      <th className=' py-4 sm:px-2 sm:py-4 '>{ index }</th>
      <td className='py-4 sm:px-2 sm:py-4 '>{ title }</td>
      <td className='px-2 py-4 max-sm:hidden'>{ BlogDate.toDateString() }</td>
      <td className='px-2 py-4 max-sm:hidden'>
        <p className={`${blog.isPublished ? "text-green-600" : "text-orange-700"}`}>
            { blog.isPublished ? 'Published' : 'Unpublished'}
            </p>
      </td>
            <td className='px-6 py-4 flex text-xs gap-3'>
                <button onClick={togglePublish} className='border px-2 py-0.5 mt-1 rounded cursor-pointer'>{ blog.isPublished ? 'Unpublished' : 'Published'}</button>
                <img src={assets.cross_icon} alt="" className='w-8 hover:scale-110 transition-all cursor-pointer' onClick={deleteBlog} />
            </td>


    </tr>

    </>
  )
}

export default BlogTableItem
