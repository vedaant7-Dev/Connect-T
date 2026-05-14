import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { findNagarsevakById, findNagarsevakByMobile } from "@/data/nagarsevaks";

export type UserRole = "citizen" | "nagarsevak" | "super_admin";

export interface User {
  id: string;
  name: string;
  mobile: string;
  role: UserRole;
  ward?: string;
  wardCode?: string | null;
  wardNumber?: string;
  isSuperAdmin?: boolean;
  age?: number;
  email?: string;
  address?: string;
  nagarsevakId?: string;
  avatarColor?: string;
  createdAt?: string;
  notifyEmail?: boolean;
  notifyWhatsapp?: boolean;
  profilePhoto?: string;
  wardChanged?: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  loading: boolean;
  login: (user: User) => Promise<void>;
  logout: () => Promise<void>;
  checkPhone: (mobile: string) => Promise<User | null>;
  register: (userData: Omit<User, "id" | "avatarColor" | "createdAt">) => Promise<User>;
  loginWithPhone: (mobile: string) => Promise<User | null>;
  loginWithNagarsevakId: (mobile: string, nagarsevakId: string) => Promise<User | null>;
  updateUser: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const SESSION_KEY = "janseva_user";
const USERS_KEY = "janseva_users";

const AVATAR_COLORS = ["#1E40AF", "#059669", "#7C3AED", "#D97706", "#DC2626", "#0EA5E9"];

const SUPER_ADMIN_MOBILE = "8554994735";

function normalizeMobile(mobile: string): string {
  return mobile.trim().replace(/\D/g, "");
}

async function getAllUsers(): Promise<User[]> {
  try {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

async function saveAllUsers(users: User[]): Promise<void> {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(SESSION_KEY)
      .then((stored) => {
        if (stored) setUser(JSON.parse(stored));
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (userData: User) => {
    setUser(userData);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  };

  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(SESSION_KEY);
  };

  const checkPhone = async (mobile: string): Promise<User | null> => {
    const normalized = normalizeMobile(mobile);
    const users = await getAllUsers();
    return users.find((u) => normalizeMobile(u.mobile) === normalized) ?? null;
  };

  const register = async (
    userData: Omit<User, "id" | "avatarColor" | "createdAt">
  ): Promise<User> => {
    const users = await getAllUsers();
    const colorIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
    const normalizedMobile = normalizeMobile(userData.mobile);
    const existingIndex = users.findIndex((u) => normalizeMobile(u.mobile) === normalizedMobile);
    const newUser: User = {
      ...userData,
      mobile: normalizedMobile,
      role: userData.role || "citizen",
      wardCode: userData.wardCode ?? null,
      isSuperAdmin: userData.isSuperAdmin || false,
      id: existingIndex >= 0 ? users[existingIndex].id : "U" + Date.now(),
      avatarColor: existingIndex >= 0 ? users[existingIndex].avatarColor : AVATAR_COLORS[colorIndex],
      createdAt: existingIndex >= 0 ? users[existingIndex].createdAt : new Date().toISOString(),
    };
    if (existingIndex >= 0) {
      users[existingIndex] = newUser;
    } else {
      users.push(newUser);
    }
    await saveAllUsers(users);
    await login(newUser);
    return newUser;
  };

  const loginWithPhone = async (mobile: string): Promise<User | null> => {
    const normalizedMobile = normalizeMobile(mobile);

    if (normalizedMobile === SUPER_ADMIN_MOBILE) {
      const superAdminUser: User = {
        id: "SUPER_ADMIN",
        name: "Karanjule Patil Tejashri Vishwajeet",
        mobile: SUPER_ADMIN_MOBILE,
        role: "super_admin",
        ward: "All Wards",
        wardCode: null,
        nagarsevakId: "SUPER_ADMIN",
        isSuperAdmin: true,
        avatarColor: "#16A34A",
        createdAt: new Date().toISOString(),
      };
      await login(superAdminUser);
      return superAdminUser;
    }

    const users = await getAllUsers();
    const existingUser = users.find((u) => normalizeMobile(u.mobile) === normalizedMobile);
    if (existingUser) {
      if (existingUser.role === "nagarsevak" && existingUser.nagarsevakId) {
        const directoryEntry = findNagarsevakById(existingUser.nagarsevakId);
        if (directoryEntry) {
          const refreshed: User = {
            ...existingUser,
            name: directoryEntry.name,
            ward: directoryEntry.ward,
            wardCode: directoryEntry.wardCode ?? null,
            isSuperAdmin: directoryEntry.isSuperAdmin || false,
          };
          const idx = users.findIndex((u) => u.id === existingUser.id);
          if (idx >= 0) {
            users[idx] = refreshed;
            await saveAllUsers(users);
          }
          await login(refreshed);
          return refreshed;
        }
      }
      await login(existingUser);
      return existingUser;
    }

    const directoryEntry = findNagarsevakByMobile(normalizedMobile);
    if (directoryEntry) {
      const colorIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
      const nagarsevakUser: User = {
        id: "U" + Date.now(),
        name: directoryEntry.name,
        mobile: directoryEntry.mobile,
        role: directoryEntry.role || "nagarsevak",
        ward: directoryEntry.ward,
        wardCode: directoryEntry.wardCode ?? null,
        nagarsevakId: directoryEntry.id,
        isSuperAdmin: directoryEntry.isSuperAdmin || false,
        avatarColor: AVATAR_COLORS[colorIndex],
        createdAt: new Date().toISOString(),
      };
      users.push(nagarsevakUser);
      await saveAllUsers(users);
      await login(nagarsevakUser);
      return nagarsevakUser;
    }

    return null;
  };

  const loginWithNagarsevakId = async (mobile: string, nagarsevakId: string): Promise<User | null> => {
    const normalizedId = nagarsevakId.toUpperCase().trim();
    const directoryEntry = findNagarsevakById(normalizedId);
    if (!directoryEntry) return null;

    const enteredMobile = normalizeMobile(mobile);
    if (enteredMobile && enteredMobile !== normalizeMobile(directoryEntry.mobile)) return null;

    const users = await getAllUsers();
    const found = users.find((u) => u.role === "nagarsevak" && u.nagarsevakId === normalizedId);
    if (found) {
      const refreshed: User = {
        ...found,
        name: directoryEntry.name,
        mobile: directoryEntry.mobile,
        ward: directoryEntry.ward,
        wardCode: directoryEntry.wardCode ?? null,
        isSuperAdmin: directoryEntry.isSuperAdmin || false,
      };
      const idx = users.findIndex((u) => u.id === found.id);
      if (idx >= 0) {
        users[idx] = refreshed;
        await saveAllUsers(users);
      }
      await login(refreshed);
      return refreshed;
    }

    const colorIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
    const newUser: User = {
      id: "U" + Date.now(),
      name: directoryEntry.name,
      mobile: directoryEntry.mobile,
      role: directoryEntry.role || "nagarsevak",
      ward: directoryEntry.ward,
      wardCode: directoryEntry.wardCode ?? null,
      nagarsevakId: normalizedId,
      isSuperAdmin: directoryEntry.isSuperAdmin || false,
      avatarColor: AVATAR_COLORS[colorIndex],
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    await saveAllUsers(users);
    await login(newUser);
    return newUser;
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) return;
    const updated: User = {
      ...user,
      ...updates,
      id: user.id,
      role: updates.role || user.role,
      nagarsevakId: updates.nagarsevakId ?? user.nagarsevakId,
      createdAt: user.createdAt,
      wardCode: updates.wardCode ?? user.wardCode ?? null,
      isSuperAdmin: updates.isSuperAdmin ?? user.isSuperAdmin ?? false,
    };
    setUser(updated);
    await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(updated));
    const users = await getAllUsers();
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx >= 0) {
      users[idx] = updated;
    } else {
      users.push(updated);
    }
    await saveAllUsers(users);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, loading, login, logout, checkPhone, register, loginWithPhone, loginWithNagarsevakId, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
}
