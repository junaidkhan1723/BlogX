import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function BlogX() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-6 py-12 bg-gray-100 text-center flex flex-col items-center pt-50">
        {/* Blog Cards Section */}
        <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* Published Blog Card */}
          <div className="bg-white shadow-md rounded-lg p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-blue-700 mb-2">📘 How I Built BlogX</h2>
              <p className="text-sm text-gray-600 mb-4">
                Curious about the tech behind this site? Read my latest blog post to learn how BlogX was built from scratch!
              </p>
            </div>
            <button
              onClick={() => navigate('/blogx-journey')}
              className="mt-auto px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
            >
              Read Blog
            </button>
          </div>

          {/* Coming Soon Cards */}
          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center">
            <p className="text-gray-500 italic">🕓 New blog coming soon...</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 flex items-center justify-center">
            <p className="text-gray-500 italic">🕓 New blog coming soon...</p>
          </div>
        </div>

        {/* Under Development Notice */}
        <div className="w-full max-w-xl bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded mb-10">
          <h3 className="font-bold text-lg">🚧 This Project is Under Development</h3>
          <p className="text-sm mt-1">
            I'm currently improving BlogX and adding more features 👨🏻‍💻🚀. Stay tuned!
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 mb-10">
          <a
            href="https://github.com/junaidkhan1723"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition"
          >
            <i className="bi bi-github"></i> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/junaidkhan1723"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            <i className="bi bi-linkedin"></i> LinkedIn
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-gray-300 py-4 text-center text-sm text-gray-600">
        <p>
          © 2025 <strong>BlogX</strong>. Built by <strong>Junaid Khan</strong>.{' '}
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline ml-1"
          >
            Back to Home
          </button>
        </p>
      </footer>
    </>
  );
}

export default BlogX;
