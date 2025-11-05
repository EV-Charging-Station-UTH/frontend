import { create } from "zustand";

// Định nghĩa interface cho AuthState
interface AuthState {
  user: any | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: any) => void;
  setToken: (token: string) => void;
  logout: () => void;
  login: (user: any, token: string) => void;
}

export const AuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setUser: (user) => set({ user, isAuthenticated: true }),
  setToken: (token) => set({ token, isAuthenticated: true }),

  logout: () => {
    set({ user: null, token: null, isAuthenticated: false });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  login: (user, token) => {
    set({ user, token, isAuthenticated: true });
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  },
}));
