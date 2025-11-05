// src/hooks/useAuth.ts

import { AuthStore } from "@/stores/auth-store";

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, setToken, logout, login } =
    AuthStore();

  return {
    user,
    token,
    isAuthenticated,
    setUser,
    setToken,
    logout,
    login,
  };
};
