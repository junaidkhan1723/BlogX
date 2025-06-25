import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function YourSpace() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10 pt-50">
        {/* Under Development Notice */}
        <div className="w-full max-w-2xl bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-10 rounded-lg mb-8 shadow">
          <h3 className="text-lg font-bold mb-1">🚧 This Page is Under Development</h3>
          <p className="text-sm">
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
      </main>

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

export default YourSpace;
