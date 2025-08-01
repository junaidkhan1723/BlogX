import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContent } from '../../context/appContext';
import { toast } from 'react-toastify';

const AdminLogin = () => {
  const { axios,setIsAdmin, backendUrl} = useContext(AppContent);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     const { data } = await axios.post(`${backendUrl}/api/admin/adminLogin`, { email, password });

     if (data.success) {
       localStorage.setItem("isAdmin", "true");
    setIsAdmin(true);
     toast.success("Login successful!");
     navigate("/admin");
} else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='w-full max-w-sm p-6 max-md:m-6 border border-primary/30 shadow-xl shadow-primary/15 rounded-lg'>
        <div className='flex flex-col items-center justify-center'>
          <div className='w-full py-6 text-center'>
            <h1 className='text-3xl font-bold'>
              <span className='text-primary'>Admin</span> Login
            </h1>
            <p className='font-light text-xs mt-2'>
              Enter the credentials to access the admin panel
            </p>
          </div>
          <form onSubmit={handleSubmit} className='mt-6 w-full sm:max-w-md text-gray-600'>
            <div className='flex flex-col'>
              <label>Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type='email'
                required
                placeholder='junaid@gmail.com'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>

            <div className='flex flex-col'>
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                required
                placeholder='12345'
                className='border-b-2 border-gray-300 p-2 outline-none mb-6'
              />
            </div>
            <button
              type='submit'
              className='w-full py-3 font-medium bg-primary text-white rounded cursor-pointer hover:bg-primary/90 transition-all'
            >
              Login
            </button>

            <h4
              onClick={() => navigate('/blog-x')}
              className='text-primary decoration underline text-sm text-center mt-2 hover:text-gray-900 cursor-pointer'
            >
              Back to BlogX
            </h4>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
