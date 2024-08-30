import { invoke } from "@tauri-apps/api";

export const getBinaryHash = async (filePath: string): Promise<string> => {
  try {
    const hashHex = await invoke<string>("get_binary_hash", { filePath });
    return hashHex;
  } catch (error) {
    console.error(`Error finding file hash: ${error}`);
    throw new Error("Failed to find file hash.");
  }
};
