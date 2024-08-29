import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getAuthData } from "../../providers/AuthProvider";
import { TokenPayload } from "../../types/profiles";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const [, setLoggingOut] = useState<boolean>(false);
  const [user, setUser] = useState<TokenPayload | null>(null);

  const [, setToken] = useState<string | null>(null);

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

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-white mb-4">Home Page</h1>
        <p className="text-lg text-white">Welcome back, {user?.username || "Guest"}!</p>
      </div>
    </div>
  );
};

export default Home;
