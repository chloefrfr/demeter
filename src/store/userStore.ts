import { create } from "zustand";

export interface User {
  accountId: string;
  discordId: string;
  roles: string[];
  email: string;
  username: string;
  password: string;
  banned: boolean;
  has_all_items: boolean;
  hwid: string;
  lastLogin: string;
}

interface StoreState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const userStore = create<StoreState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default userStore;
