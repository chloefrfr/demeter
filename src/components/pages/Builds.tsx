import React, { useState } from "react";
import { FaBox, FaPlus } from "react-icons/fa";
import Sidebar from "../Sidebar";
import BuildsTab from "../tabs/BuildsTab";
import AddBuildTab from "../tabs/AddBuildTab";
import { useBuildStore } from "../../store/useBuildStore";

export interface Build {
  splash: string;
  shipping: string;
  version: string;
}

const Builds: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"builds" | "addBuild">("builds");

  const { builds } = useBuildStore((state) => ({
    builds: state.builds,
    addBuild: state.addBuild,
  }));

  const buildsCount = builds.length || 0;

  return (
    <div className="flex min-h-screen bg-[#0A0F1F]">
      <Sidebar />
      <div className="flex-1 p-4 relative">
        <div className="flex mb-4 border-b border-gray-700">
          <button
            className={`flex items-center py-2 px-4 text-lg font-semibold ${
              activeTab === "builds" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("builds")}>
            <FaBox className="mr-2" />
            Builds
            {activeTab === "builds" && (
              <span className="ml-2 text-sm text-gray-300">({buildsCount})</span>
            )}
          </button>
          <button
            className={`flex items-center py-2 px-4 text-lg font-semibold ${
              activeTab === "addBuild" ? "border-b-2 border-blue-500 text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab("addBuild")}>
            <FaPlus className="mr-2" />
            Add Build
          </button>
        </div>

        <div className="relative">
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              activeTab === "builds" ? "opacity-100" : "opacity-0"
            }`}>
            <BuildsTab builds={builds} />
          </div>
          <div
            className={`transition-opacity duration-500 ease-in-out ${
              activeTab === "addBuild" ? "opacity-100" : "opacity-0"
            }`}>
            <AddBuildTab isActive={activeTab === "addBuild"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Builds;
