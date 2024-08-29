import React, { useEffect, useState } from "react";
import { getPlayerData, getUserInfo } from "../../lib/api/axiosClient";
import { open } from "@tauri-apps/api/shell";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";
import { CSSTransition } from "react-transition-group";
import "../../styles/login.css";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const authData = useAuth();
  const [showPage, setShowPage] = useState(true);
  const [navigating, setNavigating] = useState(false);

  useEffect(() => {
    const handleLoginCallback = async () => {
      const accessToken = await authData.getAccessTokenFromHash();

      if (accessToken) {
        try {
          const user = await getPlayerData(accessToken);

          if (user.status === 200) {
            authData.login(accessToken);
            setShowPage(false); // Trigger page transition
            setNavigating(true); // Indicate that navigation is in progress
          }
        } catch (error) {
          console.error(`Failed to login: ${error}`);
        }
      } else if (!authData.isAuthenticated()) {
        navigate("/login");
      }
    };

    authData.subscribeToHashChange(handleLoginCallback);

    return () => {
      window.removeEventListener("hashchange", handleLoginCallback);
    };
  }, [navigate, authData]);

  useEffect(() => {
    if (navigating) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 300); // Adjust timeout to match animation duration

      return () => clearTimeout(timer);
    }
  }, [navigating, navigate]);

  const handleLogin = async () => {
    try {
      const user = await getUserInfo();
      if (user.status === 200) {
        await open(user.data);
      } else {
        console.error(`Failed to get discord login link: ${user.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <CSSTransition
        in={showPage}
        timeout={300}
        classNames="fade"
        unmountOnExit
        onExited={() => {
          if (navigating) {
            navigate("/");
          }
        }}>
        <div className="relative bg-gray-800 p-8 rounded-xl shadow-lg w-full max-w-md transition-transform duration-300 ease-in-out transform hover:scale-105">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 rounded-xl -z-10 transition-opacity duration-500 ease-in-out" />

          <h1 className="text-5xl font-extrabold text-white mb-6 text-center leading-tight transition-opacity duration-300 ease-in-out">
            Welcome
          </h1>
          <button
            onClick={handleLogin}
            className="w-full p-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105">
            Authorize with Discord
          </button>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Login;
