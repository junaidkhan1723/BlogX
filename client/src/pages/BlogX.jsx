import React, { useContext, useRef } from "react";
import BlogList from "../components/BlogList";
import NewsLetter from "../components/NewsLetter";
import Footer from "../components/Footer";
import { AppContent } from "../context/appContext";
import AdminNavBar from "../components/admin/AdminNavBar";

function BlogX() {

      const {setInput, input} = useContext(AppContent);
      const inputRef = useRef();

      const onSubmitHandler = async (e)=>{
        e.preventDefault();
        setInput(inputRef.current.value);
      };

      const onClear = ()=>{
        setInput('')
        inputRef.current.value = ''
      }
  return (

    <>
      <div className='min-h-screen bg-[url("/gradientBackground.png")] bg-cover bg-center'>
        <AdminNavBar/>

        <div className="mx-8 sm:mx-16 xl:mx-24 pt-4 sm:pt-6 relative text-center">
          <div className="text-center mb-2">
            <div className="text-indigo-700 inline-flex items-center justify-center gap-4 px-6 py-1.5 sm:mb-2 border border-primary/40 bg-primary/10 rounded-full text-sm animate-bounceX hover:animate-wiggleX hover:text-purple-600 transition duration-300">
              <p>
                NEW: AI feature integrated <i className="bi bi-stars"></i>
              </p>
            </div>
          </div>

            {/** Heading */}

          <h1 className="text-2xl sm:text-6xl font-semibold sm:leading-16 text-gray-600">
            Your Ideas.
            <span className="text-purple-800 font-semibold"> Your Space.</span>
            <br />
            Your Blog.
          </h1>

          <p className="my-6 sm:my-8 max-w-2xl m-auto max-sm:text-xs text-gray-700 text-center">
            Your{" "}
            <span className="font-semibold text-indigo-700">
              Creative Space
            </span>{" "}
            to
            <span className="font-medium text-purple-700"> Learn</span>,
            <span className="font-medium text-purple-700"> Build</span>, and
            <span className="font-medium text-purple-700"> Grow</span> as a
            <span className="font-semibold text-indigo-700">
              {" "}
              Full-Stack Developer
            </span>
            .<br />
            Explore blogs covering everything from
            <span className="font-medium text-blue-700"> Frontend</span> to
            <span className="font-medium text-blue-700"> Backend</span>,
            <span className="font-medium text-green-700"> Databases</span>,
            <span className="font-medium text-yellow-700"> Dev Tools</span>, and
            <span className="font-medium text-pink-700"> Deployment</span>.
          </p>

          {/** Search Blogs */}

          <form onSubmit={onSubmitHandler} className="flex justify-between max-w-lg max-sm:scale-75 mx-auto border border-gray-400 bg-white rounded overflow-hidden mb-4">
            <input ref={inputRef}
              type="text"
              placeholder="Search for blogs"
              required
              className="w-full pl-4 outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 sm:px-8 m-1.5 rounded hover:scale-105 transition-all cursor-pointer">
              Search
            </button>
          </form>
        </div>
        <div className="text-center">
          {
          input && 
          <button onClick={onClear} className="border font-light text-xs py-1 px-3 rounded-sm shadow-custom-sm cursor-pointer">Clear search</button>
          }
        </div>
        <BlogList />
        <NewsLetter/>
        <Footer/>
      </div>
    </>
  );
}

export default BlogX;
