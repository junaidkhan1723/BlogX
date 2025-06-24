import './App.css'
import { Routes,Route } from 'react-router-dom';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import Login from './pages/Login';
import EmailVerify from './pages/EmailVerify';
import BlogX from './pages/BlogX';
import { ToastContainer } from 'react-toastify';
import BlogXBlogPage from './pages/BlogXBlogPage';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/blog-x' element={<BlogX/>}/>
        <Route path='//blogx-journey' element={<BlogXBlogPage/>}/>
      </Routes>
    </div>
  )
}

export default App
