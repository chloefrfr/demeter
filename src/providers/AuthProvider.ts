import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TokenPayload } from "../types/profiles";
import { getPlayerData } from "../lib/api/axiosClient";
import { queryClient } from "../main";

interface AuthData {
  user: TokenPayload | null;
  token: string | null;
}

const LOCAL_STORAGE_KEY = "authData";

export const getAuthData = async (): Promise<AuthData> => {
  const authDataStr = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (authDataStr) {
    return JSON.parse(authDataStr);
  }
  return { user: null, token: null };
};

const saveAuthData = (authData: AuthData) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(authData));
};

const clearAuthData = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
};

export const useAuth = () => {
  const { data: authData, refetch } = useQuery<AuthData>({
    queryKey: ["authData"],
    queryFn: getAuthData,
    initialData: { user: null, token: null },
  });

  const loginMutation = useMutation({
    mutationFn: async (accessToken: string) => {
      const user = await getPlayerData(accessToken);
      if (user.status === 200) {
        const newAuthData: AuthData = {
          user: user.data!,
          token: accessToken,
        };
        saveAuthData(newAuthData);
        queryClient.setQueryData(["authData"], newAuthData);
        return newAuthData;
      } else {
        throw new Error("Failed to get user data.");
      }
    },
    onSuccess: () => {
      refetch();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      clearAuthData();
      queryClient.setQueryData(["authData"], { user: null, token: null });
    },
  });

  const checkExistingAccessToken = async () => {
    const hashCode = window.location.hash;
    if (hashCode.startsWith("#login:")) {
      const accessToken = hashCode.split(":")[1];
      if (accessToken) {
        await loginMutation.mutateAsync(accessToken);
        window.location.hash = "";
      }
    }
  };

  const getAccessTokenFromHash = async (): Promise<string | null> => {
    await checkExistingAccessToken();
    return authData?.token || null;
  };

  const subscribeToHashChange = async (callback: () => void) => {
    const handleHashChange = () => {
      callback();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  };

  const isAuthenticated = () => {
    return !!authData.token;
  };

  return {
    user: authData?.user,
    token: authData?.token,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    getAccessTokenFromHash,
    subscribeToHashChange,
    isAuthenticated,
  };
};
