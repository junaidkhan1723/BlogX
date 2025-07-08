import React, { useState, useContext } from "react";
import { blogCategories } from "../assets/assets.js";
import { motion } from "motion/react";
import BlogCard from "./BlogCard";
import { AppContent } from "../context/appContext";
import Loader from "./Loader";

function BlogList() {
  const [menu, setMenu] = useState("All");
  const { blogs, input } = useContext(AppContent);

  const filteredBlogs = () => {
    let result = blogs;

    // Filter by search input
    if (input.trim()) {
      result = result.filter((blog) =>
        blog.title?.toLowerCase().includes(input.toLowerCase()) ||
        blog.category?.toLowerCase().includes(input.toLowerCase())
      );
    }

    // Filter by selected category
    if (menu !== "All") {
      result = result.filter((blog) => blog.category === menu);
    }

    return result;
  };

  const finalBlogs = filteredBlogs();

  // Show loader only if blogs haven't loaded yet
  if (!blogs || blogs.length === 0) {
    return <Loader />;
  }

  return (
    <>
      <div>
        {/* Category Buttons */}
        <div className="flex justify-center gap-2 sm:gap-8 my-10 relative">
          {blogCategories.map((item) => (
            <div key={item} className="relative">
              <button
                onClick={() => setMenu(item)}
                className={`cursor-pointer text-gray-500 ${
                  menu === item && "text-white px-4 pt-0.5"
                }`}
              >
                {item}
                {menu === item && (
                  <motion.div
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute left-0 right-0 top-0 h-7 -z-1 bg-primary rounded-full"
                  ></motion.div>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Blog Cards or Fallback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-24 mx-8 sm:mx-16 xl:mx-40">
          {finalBlogs.length > 0 ? (
            finalBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              No blogs available for this category.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default BlogList;
