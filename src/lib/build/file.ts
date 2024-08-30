import { exists } from "@tauri-apps/api/fs";

export const fileExists = async (filePath: string): Promise<boolean> => {
  try {
    await exists(filePath);
    return true;
  } catch {
    return false;
  }
};
