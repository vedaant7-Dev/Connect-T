import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type UserRole = "citizen" | "nagarsevak" | "head_admin";

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  ward?: string;
  wardNumber?: string;
  avatarColor?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const STORAGE_KEY = "janseva_user";

const AVATAR_COLORS = ["#1E40AF", "#059669", "#7C3AED", "#D97706", "#DC2626", "#0EA5E9"];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((stored) => {
        if (stored) setUser(JSON.parse(stored));
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (userData: User) => {
    const colorIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
    const enriched = { ...userData, id: "U" + Date.now(), avatarColor: AVATAR_COLORS[colorIndex] };
    setUser(enriched);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(enriched));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
