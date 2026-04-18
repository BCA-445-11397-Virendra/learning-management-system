import React from "react";
import { Link } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">

      {/* 404 Text */}
      <h1 className="text-7xl md:text-9xl font-bold text-blue-600">
        404
      </h1>

      {/* Message */}
      <h2 className="text-xl md:text-3xl font-semibold mt-4 text-gray-800">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-500 mt-2 max-w-md">
        The page you are looking for might have been removed or is temporarily unavailable.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        
        <Link to="/">
          <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            <Home size={18} />
            Go Home
          </button>
        </Link>

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeft size={18} />
          Go Back
        </button>

      </div>

    </div>
  );
};

export default NotFound;