import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { getBinaryHash } from "../../lib/build/getBinaryHash";
import { fileExists } from "../../lib/build/file";
import { open } from "@tauri-apps/api/dialog";
import { useBuildStore } from "../../store/useBuildStore";
import { getVersionByHash } from "../../lib/build/getVersionByHash";
import { convertFileSrc } from "@tauri-apps/api/tauri";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddBuildTabProps {
  isActive: boolean;
}

const AddBuildTab: React.FC<AddBuildTabProps> = ({ isActive }) => {
  const [loading, setLoading] = useState(false);
  const { builds, addBuild } = useBuildStore((state) => ({
    builds: state.builds,
    addBuild: state.addBuild,
  }));

  const handleClick = async () => {
    if (!isActive) return;
    try {
      const filePaths = await open({
        directory: true,
        multiple: false,
      });

      if (filePaths) {
        const paths = Array.isArray(filePaths) ? filePaths : [filePaths];

        for (const path of paths) {
          setLoading(true);
          const splash = `${path}\\FortniteGame\\Content\\Splash\\Splash.bmp`;
          const shipping = `${path}\\FortniteGame\\Binaries\\Win64\\FortniteClient-Win64-Shipping.exe`;

          if (!(await fileExists(splash))) {
            setLoading(false);
            toast.error("Splash file not found.");
            return;
          }

          const versionHash = await getBinaryHash(shipping);
          const version = await getVersionByHash(versionHash);

          if (!version) {
            setLoading(false);
            toast.error("Invalid version: This version is not supported.");
            return;
          }

          const buildExists = builds.some(
            (build) => build.splash === convertFileSrc(splash) && build.shipping === shipping
          );

          if (buildExists) {
            setLoading(false);
            toast.error("Build already exists.");
            return;
          }

          addBuild({
            splash: convertFileSrc(splash),
            shipping: shipping,
            version: `${version}`,
          });

          toast.success("Build added successfully.");
        }
      }
    } catch (error) {
      console.error(`Error selecting files: ${error}`);
      toast.error("Failed to select files.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="absolute top-4 left-4 w-48 h-64 bg-[#1B2A50] rounded-lg cursor-pointer hover:bg-[#1F3A7A] transition-colors duration-300 flex items-center justify-center select-none"
      style={{ position: "fixed", top: "5rem", left: "6rem" }}
      onClick={handleClick}>
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1B2A50] bg-opacity-50 rounded-lg">
          <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
        </div>
      ) : (
        <AiOutlinePlus
          className="text-gray-300 text-xl transition-transform duration-300 transform hover:scale-105"
          style={{
            textShadow: "0 2px 4px rgba(0, 0, 0, 0.6)",
          }}
        />
      )}
      <ToastContainer theme="dark" position="top-right" newestOnTop />
    </div>
  );
};

export default AddBuildTab;
