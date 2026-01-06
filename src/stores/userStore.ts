import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  firstname: string;
  registration_number: number;
  authorization: string;
}

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user: User) => set({ user }),
      logout: () => set({ user: null }),
    }),
    {
      name: "user-storage", // clé dans localStorage
    }
  )
);
