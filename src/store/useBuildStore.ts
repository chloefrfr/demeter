import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Build } from "../components/pages/Builds";

interface BuildStore {
  builds: Build[];
  addBuild: (build: Build) => void;
}

export const useBuildStore = create<BuildStore>()(
  persist(
    (set) => ({
      builds: [],
      addBuild: (newBuild: Build) =>
        set((state) => ({
          builds: [...state.builds, newBuild],
        })),
    }),
    {
      name: "build.storage",
    }
  )
);
