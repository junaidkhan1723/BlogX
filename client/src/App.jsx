import "./App.css";
import { Routes, Route } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import BlogX from "./pages/BlogX";
import { ToastContainer } from "react-toastify";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import ListBlog from "./pages/admin/ListBlog";
import Comments from "./pages/admin/Comments";
import 'quill/dist/quill.snow.css'
import AdminLogin from "./components/admin/AdminLogin";
import { AppContent } from "./context/appContext";
import { useContext } from "react";

const App = () => {

  const {token} = useContext(AppContent)
  return (
    <div>
      <ToastContainer
  position="top-center"
  autoClose={2000}
  hideProgressBar={true}
  newestOnTop={true}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  limit={3}
/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/blog-x" element={ <BlogX />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token ? <Layout/> :<AdminLogin/> }>
        <Route path="/admin/addBlog" element={<AddBlog/>}/>
        <Route path="/admin/listBlog" element={<ListBlog/>}/>
        <Route path="/admin/comments" element={<Comments/>}/>
        <Route index element={<Dashboard/>}/>
        <Route path="addBlog" element={<AddBlog/>}/>
        <Route path="listBlog" element={<ListBlog/>}/>
        <Route path="comments" element={<Comments/>}/>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
