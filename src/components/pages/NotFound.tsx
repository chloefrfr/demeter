import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#131A2A] flex flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">404 Not Found</h1>
        <p className="text-lg text-white mb-6">The page you are looking for does not exist.</p>
        <button
          onClick={() => navigate("/")}
          className="bg-[#1E2A3F] text-white text-lg font-semibold py-2 px-6 rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-xl hover:bg-[#2C3E5C] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1E2A3F]">
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default NotFound;
