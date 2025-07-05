import React, { useEffect, useState } from 'react'
import { comments_data } from '../../assets/assets.js';
import CommentTableItem from '../../components/admin/CommentTableItem';

const Comments = () => {

  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');

  const fetchComments = async ()=>{
    setComments(comments_data)
  };

  useEffect(()=>{
    fetchComments()
  },[]);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
     <div className="flex justify-between items-center max-w-3xl">
      <h1>Comments</h1>
      <div className='flex gap-4'>
        <button onClick={()=>{setFilter('Approved')}} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
          ${filter === 'Approved' ? 'text-primary' : 'text-gray-700'} `}>Apporved</button>

          <button onClick={()=>{setFilter('Not Approved')}} className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs
          ${filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'} `}>Not Apporved</button>
      </div>
     </div>

     <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow rounded-lg scrollbar-hide">
     <table className='w-full text-sm text-gray-500'>
          <thead className='text-xs text-gray-600 text-left uppercase'>
            <tr>
                  <th scope='col' className='px-2 py-4 xl:px-6'>Blog Title & Comment</th>
                  <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                  <th scope='col' className='px-2 py-4'>Actions</th>
            </tr>
          </thead>
            <tbody>
             {comments.filter((comment)=>{
              if(filter === "Approved") return comment.isApproved === true;
              return comment.isApproved === false;
             }).map((comment, index)=> <CommentTableItem key={comment._id}
             comment={comment} index={index + 1} fetchComments={fetchComments}/>)}
            </tbody>          
     </table>
     </div>
    </div>
  )
}

export default Comments
