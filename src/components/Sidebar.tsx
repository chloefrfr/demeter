import React from "react";
import { FaHome, FaCog } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-20 bg-[#131A2A] flex flex-col items-center py-4 space-y-6 transition-transform duration-300 ease-in-out rounded-r-2xl shadow-md">
      <a
        href="/"
        className="text-[#52628D] hover:bg-[#1C263B] p-3 rounded-full transition-all duration-300 ease-in-out hover:text-white flex items-center justify-center transform hover:scale-105">
        <FaHome className="w-7 h-7" />
      </a>

      <a
        href="/builds"
        className="text-[#52628D] hover:bg-[#1C263B] p-3 rounded-full transition-all duration-300 ease-in-out hover:text-white flex items-center justify-center transform hover:scale-105">
        <HiViewGridAdd className="w-7 h-7" />
      </a>

      <div className="flex-grow"></div>

      <a
        href="/settings"
        className="text-[#52628D] hover:bg-[#1C263B] p-3 rounded-full transition-all duration-300 ease-in-out hover:text-white flex items-center justify-center transform hover:scale-105">
        <FaCog className="w-7 h-7" />
      </a>
    </aside>
  );
};

export default Sidebar;
