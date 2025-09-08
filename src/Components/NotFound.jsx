import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-indigo-100 via-white to-indigo-50">
      {/* Icon */}
      <div className="text-indigo-500 text-7xl sm:text-8xl font-extrabold animate-bounce">
        404
      </div>

      {/* Message */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-4">
        Oops! Page Not Found
      </h1>
      <p className="text-gray-600 mt-2 max-w-md">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      {/* Button */}
      <button
        onClick={() => (window.location.href = "/")}
        className="mt-6 bg-indigo-500 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-600 transition-all duration-300 hover:scale-105"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
