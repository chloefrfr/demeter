import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">404 Not Found</h1>
        <p className="text-lg text-white">The page you are looking for does not exist.</p>
      </div>
    </div>
  );
};

export default NotFound;
