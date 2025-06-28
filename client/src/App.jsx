import "./App.css";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import BlogX from "./pages/BlogX";
import { ToastContainer } from "react-toastify";
import BlogXBlogPage from "./pages/BlogXBlogPage";
import YourSpace from "./pages/YourSpace";
import Blog from "./pages/Blog";

const App = () => {
  return (
    <div>
      <ToastContainer position="top-left" autoClose={2000}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/blog-x" element={<BlogX />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="//blogx-journey" element={<BlogXBlogPage />} />
        <Route path="//your-space" element={<YourSpace />} />
      </Routes>
    </div>
  );
};

export default App;
