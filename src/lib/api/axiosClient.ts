import { AxiosError, AxiosResponse } from "axios";
import { PlayerData, UserInfoResponse } from "../../types/requests";
import { endpoints } from "./endpoints";
import { axiosClient } from "../../providers/AxiosProvider";

export const getUserInfo = async (): Promise<UserInfoResponse> => {
  try {
    const response: AxiosResponse = await axiosClient.get(endpoints.GET_DISCORD_INFO);
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      status: axiosError.response?.status || 500,
      error: axiosError.message,
    };
  }
};

export const getPlayerData = async (token: string): Promise<PlayerData> => {
  try {
    const response: AxiosResponse = await axiosClient.post(endpoints.GET_PLAYER_DATA, { token });
    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    const axiosError = error as AxiosError;
    return {
      status: axiosError.response?.status || 500,
      error: axiosError.message,
    };
  }
};
