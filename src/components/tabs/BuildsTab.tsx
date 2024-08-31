import React, { useState } from "react";
import { Build } from "../pages/Builds";
import "@fontsource/bricolage-grotesque";

interface BuildsTabProps {
  builds: Build[];
}

const BuildsTab: React.FC<BuildsTabProps> = ({ builds }) => {
  return (
    <div className="flex flex-wrap gap-6 pl-1 mt-6 justify-start">
      {builds.map((build, index) => (
        <BuildCard key={index} build={build} />
      ))}
    </div>
  );
};

interface BuildCardProps {
  build: Build;
}

const BuildCard: React.FC<BuildCardProps> = ({ build }) => {
  const [loading, setLoading] = useState(true);

  const handleClick = () => {};

  return (
    <div
      className="relative bg-[#1C2D3F] text-[#E4E4E4] rounded-xl shadow-lg w-[220px] border border-[#2C3A4B] flex-shrink-0 overflow-hidden select-none cursor-pointer transition-transform duration-300 transform hover:scale-105 hover:opacity-90 hover:bg-[#2C3A4B] group"
      onClick={handleClick}>
      <div className="relative rounded-t-xl overflow-hidden border border-[#2C3A4B] glow-effect">
        {loading && <div className="absolute inset-0 bg-gray-800 animate-pulse" />}
        <img
          src={build.splash}
          alt={`Build version ${build.version}`}
          className={`w-full h-[150px] object-cover transition-opacity duration-500 ${
            loading ? "opacity-0" : "opacity-100"
          }`}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
          onLoad={() => setLoading(false)}
        />
      </div>

      <div className="relative p-3 bg-[#0A1A2B] rounded-b-xl border-t border-[#2C3A4B] shadow-md transition-shadow duration-300 hover:shadow-lg">
        <h2 className="text-lg font-semibold text-gray-100 glow-text">Build {build.version}</h2>
        <div className="absolute inset-0 border border-light-blue-400 rounded-xl transition-transform duration-300 transform scale-0 hover:scale-100" />
      </div>
    </div>
  );
};

export default BuildsTab;
