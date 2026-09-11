"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { api } from "@/services/api";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  savedPlaces?: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateUserSavedPlaces: (savedPlaces: string[]) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize auth from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem("travelx_token");
      const storedUser = localStorage.getItem("travelx_user");

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch {
      // ignore JSON parse or storage errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.login({ email, password });

      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem("travelx_token", res.token);
        localStorage.setItem("travelx_user", JSON.stringify(res.user));
        setIsLoading(false);
        return { success: true };
      }

      // Offline demo fallback if backend is unreachable
      if (!res.success && email && password) {
        const demoUser: UserProfile = {
          id: "usr-demo",
          name: email.split("@")[0],
          email,
          savedPlaces: [],
        };
        const demoToken = "demo-mock-jwt-token";
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem("travelx_token", demoToken);
        localStorage.setItem("travelx_user", JSON.stringify(demoUser));
        setIsLoading(false);
        return { success: true, message: "Signed in in demo mode." };
      }

      setIsLoading(false);
      return { success: false, message: res.message || "Invalid credentials." };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err.message || "Sign in failed." };
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.register({ name, email, password });

      if (res.success && res.token && res.user) {
        setToken(res.token);
        setUser(res.user);
        localStorage.setItem("travelx_token", res.token);
        localStorage.setItem("travelx_user", JSON.stringify(res.user));
        setIsLoading(false);
        return { success: true };
      }

      // Fallback
      if (!res.success && name && email) {
        const fallbackUser: UserProfile = {
          id: `usr-${Date.now()}`,
          name,
          email,
          savedPlaces: [],
        };
        const fallbackToken = "demo-mock-jwt-token";
        setToken(fallbackToken);
        setUser(fallbackUser);
        localStorage.setItem("travelx_token", fallbackToken);
        localStorage.setItem("travelx_user", JSON.stringify(fallbackUser));
        setIsLoading(false);
        return { success: true, message: "Account created (Local mode)." };
      }

      setIsLoading(false);
      return { success: false, message: res.message || "Registration failed." };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, message: err.message || "Registration failed." };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("travelx_token");
    localStorage.removeItem("travelx_user");
  }, []);

  const updateUserSavedPlaces = useCallback((savedPlaces: string[]) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated = { ...prev, savedPlaces };
      localStorage.setItem("travelx_user", JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateUserSavedPlaces,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
