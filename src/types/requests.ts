import { TokenPayload } from "./profiles";

export interface UserInfoResponse {
  status: number;
  data?: any;
  error?: string;
}

export interface PlayerData {
  status: number;
  error?: string;
  data?: TokenPayload;
}
