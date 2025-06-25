import React from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
const BlogXBlogPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 text-gray-800 px-4 sm:px-6 lg:px-8 py-10 font-sans mt-20">
        <article className="max-w-3xl mx-auto">
         
          <header className="mb-10 border-b border-gray-300 pb-6">
            <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
              How I Built BlogX: My Full-Stack Blog App Journey
            </h1>
            <p className="text-gray-600 text-sm">
              Written by <strong>Junaid Khan</strong> · June 2025
            </p>
          </header>

          
          <section className="mb-8">
            <p className="text-lg leading-relaxed">
              As a developer passionate about learning full-stack web
              development, I created
              <strong className="text-blue-600"> BlogX</strong>, a modern blog
              platform where users can sign up and explore blogs. This
              project helped me improve my React, Express, and MongoDB skills.
            </p>
          </section>

          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
              🛠 What is BlogX?
            </h2>
            <p className="mb-4">BlogX includes:</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>User authentication with email verification</li>
              <li>JWT-based login/logout with cookies</li>
              <li>Responsive UI built with Tailwind CSS</li>
              <li>Deployed backend on Render</li>
              <li>Deployed frontend on Vercle</li>
            </ul>
          </section>

          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              💡 Tech Stack
            </h2>

            <h3 className="text-lg font-semibold mt-4">Frontend:</h3>
            <ul className="list-disc list-inside ml-4 mb-4 space-y-1">
              <li>React.js</li>
              <li>Tailwind CSS</li>
              <li>Bootstrap Icons</li>
              <li>React Router DOM</li>
              <li>React Toastify for notifications</li>
            </ul>

            <h3 className="text-lg font-semibold">Backend:</h3>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Node.js & Express.js</li>
              <li>MongoDB Atlas</li>
              <li>JWT for authentication</li>
              <li>bcrypt for password hashing</li>
            </ul>
          </section>

         
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🔐 Authentication Features
            </h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Signup/login with validation</li>
              <li>Email verification using OTP</li>
              <li>Secure password reset</li>
              <li>Protected routes using JWT</li>
            </ul>
          </section>

          
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🚀 Deployment & Structure
            </h2>
            <p className="mb-2">
              I followed a{" "}
              <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                client-server
              </code>{" "}
              structure:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">/client</code> →
                React frontend
              </li>
              <li>
                <code className="bg-gray-100 px-2 py-1 rounded">/server</code> →
                Express backend
              </li>
            </ul>
            <p className="mt-4">
              I also used{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                .env.production
              </code>{" "}
              and{" "}
              <code className="bg-gray-100 px-2 py-1 rounded">
                .env.development
              </code>{" "}
              to separate environments.
            </p>
          </section>

          {/* Conclusion */}
          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              🎯 Final Thoughts
            </h2>
            <p>
              Working on BlogX gave me confidence in building real-world
              full-stack apps. It covers everything from UI to backend security
              to deployment. I’m planning more improvements soon. Stay
              connected!
            </p>
          </section>

          {/* Contact Section */}
          <section className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-2">📬 Connect With Me:</h3>
            <div className="flex gap-6 mb-6">
              <a
                href="https://github.com/junaidkhan1723"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-800 hover:text-black"
              >
                <i className="bi bi-github text-xl"></i> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/junaidkhan1723"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-700 hover:text-blue-900"
              >
                <i className="bi bi-linkedin text-xl"></i> LinkedIn
              </a>
              <a
                href="mailto:patanjunaid7888@gmail.com"
                className="flex items-center gap-2 text-red-600 hover:text-red-800"
              >
                <i className="bi bi-envelope-fill text-xl"></i> Gmail
              </a>
            </div>
          </section>
        </article>

        {/* Footer */}
        <footer className="w-full bg-white border-t border-gray-300 py-4 text-center text-sm text-gray-600">
          <p>
            © 2025 <strong>BlogX</strong>. Built by <strong>Junaid Khan</strong>
            .{" "}
            <button
              onClick={() => navigate("/blog-x")}
              className="text-blue-600 hover:underline ml-1"
            >
              Read New Blog
            </button>
          </p>
        </footer>
      </div>
    </>
  );
};

export default BlogXBlogPage;
