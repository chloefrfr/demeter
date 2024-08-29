import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "../../providers/AuthProvider";
import { TokenPayload } from "../../types/profiles";
import { FaUser } from "react-icons/fa";
import Sidebar from "../Sidebar";
import "../../styles/home.css";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const [, setLoggingOut] = useState<boolean>(false);
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const useAuthValidation = () => {
    const validateUserAndToken = useCallback(async () => {
      const authData = await getAuthData();
      const foundUser = authData.user ?? null;
      const foundToken = authData.token ?? null;

      if (!foundUser || !foundToken) {
        setLoggingOut(true);
        setTimeout(() => navigate("/login"), 100);
      }

      setUser(foundUser);
      setToken(foundToken);
      setLoading(false);
    }, [navigate]);

    useEffect(() => {
      validateUserAndToken();

      const handleStorageEvent = (event: StorageEvent) => {
        if (event.key === "user" || event.key === "token") {
          validateUserAndToken();
        }
      };

      window.addEventListener("storage", handleStorageEvent);
      return () => window.removeEventListener("storage", handleStorageEvent);
    }, [validateUserAndToken]);
  };

  useAuthValidation();

  const currentHour = new Date().getHours();
  let greetingMessage = "Good Morning";

  if (currentHour >= 12 && currentHour < 18) {
    greetingMessage = "Good Afternoon";
  } else if (currentHour >= 18) {
    greetingMessage = "Good Evening";
  }

  return (
    <div
      className={`min-h-screen bg-[#0A0F1F] flex select-none overflow-hidden transition-opacity duration-500 ease-in-out ${
        loading ? "opacity-0" : "opacity-100"
      }`}>
      <Sidebar />

      <div className="flex-1 p-6 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <header className="flex items-center bg-[#1C263B] p-4 rounded-md shadow-md w-full max-w-[800px] transition-transform duration-500 ease-in-out animate-fadeIn">
            <div className="flex items-center space-x-4 animate-fadeIn">
              {user?.profile?.athena?.currentCharacter ? (
                <img
                  src={user.profile.athena.currentCharacter}
                  alt={`${user.username}'s avatar`}
                  className="w-24 h-24 rounded-full object-cover transition-transform transform hover:scale-125 animate-fadeIn"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-500 rounded-full flex items-center justify-center text-white transition-transform transform hover:scale-125 animate-fadeIn">
                  <FaUser className="w-16 h-16" />
                </div>
              )}
              <div className="text-white">
                <h2 className="text-2xl font-semibold animate-fadeIn">
                  {greetingMessage}, {user?.username || "Guest"}
                </h2>
                <p className="text-sm text-[#52628D] animate-fadeIn">Enjoy your experience!</p>
              </div>
            </div>
          </header>
        )}
      </div>
    </div>
  );
};

export default Home;
