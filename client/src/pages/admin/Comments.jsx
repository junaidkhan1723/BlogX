import React, { useContext, useEffect, useState } from 'react';
import CommentTableItem from '../../components/admin/CommentTableItem';
import { AppContent } from '../../context/appContext.jsx';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState('Not Approved');
  const [loading, setLoading] = useState(true);

  const { axios, backendUrl } = useContext(AppContent);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/api/admin/comments`);
      data.success ? setComments(data.comments) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const filteredComments = comments.filter((comment) =>
    filter === 'Approved' ? comment.isApproved : !comment.isApproved
  );

  return (
    <div className='flex-1 pt-5 px-1 sm:px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <div className="flex justify-between items-center max-w-3xl">
        <h1>Comments</h1>
        <div className='flex gap-4'>
          <button
            onClick={() => setFilter('Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Approved' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilter('Not Approved')}
            className={`shadow-custom-sm border rounded-full px-4 py-1 cursor-pointer text-xs ${
              filter === 'Not Approved' ? 'text-primary' : 'text-gray-700'
            }`}
          >
            Not Approved
          </button>
        </div>
      </div>

      <div className="relative h-4/5 max-w-3xl overflow-x-auto mt-4 bg-white shadow-lg rounded-lg scrollbar-hide">
        {loading ? (
          <div className="py-10 text-center">
            <Loader />
          </div>
        ) : (
          <table className='w-full text-sm text-gray-500'>
            <thead className='text-xs text-gray-600 text-left uppercase'>
              <tr>
                <th className='px-2 py-4 xl:px-6'>Blog Title & Comment</th>
                <th className='px-2 py-4 max-sm:hidden'>Date</th>
                <th className='px-2 py-4'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredComments.length > 0 ? (
                filteredComments.map((comment, index) => (
                  <CommentTableItem
                    key={comment._id}
                    comment={comment}
                    index={index + 1}
                    fetchComments={fetchComments}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center py-6 text-gray-400">
                    {filter === 'Approved'
                      ? 'No approved comments found.'
                      : 'No unapproved comments found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Comments;
