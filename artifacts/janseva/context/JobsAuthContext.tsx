import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type JobsUserRole = "seeker" | "employer";

export interface JobsUser {
  id: string;
  name: string;
  phone: string;
  role: JobsUserRole;
  // Seeker fields
  age?: string;
  qualification?: string;
  skills?: string;
  experience?: string;
  // Employer fields
  company?: string;
  gstNo?: string;
  email?: string;
  location?: string;
  avatarColor: string;
  createdAt: string;
}

interface JobsAuthContextType {
  jobsUser: JobsUser | null;
  loading: boolean;
  registerJobs: (data: Omit<JobsUser, "id" | "createdAt">) => Promise<void>;
  loginJobs: (phone: string, role: JobsUserRole) => Promise<boolean>;
  logoutJobs: () => Promise<void>;
  updateJobsUser: (data: Partial<JobsUser>) => Promise<void>;
}

const JobsAuthContext = createContext<JobsAuthContextType | null>(null);

const STORAGE_KEY = "connectt_jobs_user";
const COLORS = ["#C2410C", "#EA580C", "#D97706", "#92400E", "#7C3AED", "#059669", "#0369A1"];

function randomColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

function generateId() {
  return "JU" + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
}

export function JobsAuthProvider({ children }: { children: ReactNode }) {
  const [jobsUser, setJobsUser] = useState<JobsUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try { setJobsUser(JSON.parse(raw)); } catch {}
      }
      setLoading(false);
    });
  }, []);

  const save = async (user: JobsUser | null) => {
    setJobsUser(user);
    if (user) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      await AsyncStorage.removeItem(STORAGE_KEY);
    }
  };

  const registerJobs = async (data: Omit<JobsUser, "id" | "createdAt">) => {
    const user: JobsUser = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    await save(user);
  };

  const loginJobs = async (phone: string, role: JobsUserRole): Promise<boolean> => {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        const existing = JSON.parse(raw) as JobsUser;
        if (existing.phone === phone && existing.role === role) {
          setJobsUser(existing);
          return true;
        }
      } catch {}
    }
    return false;
  };

  const logoutJobs = async () => {
    await save(null);
  };

  const updateJobsUser = async (data: Partial<JobsUser>) => {
    if (!jobsUser) return;
    const updated = { ...jobsUser, ...data };
    await save(updated);
  };

  return (
    <JobsAuthContext.Provider value={{ jobsUser, loading, registerJobs, loginJobs, logoutJobs, updateJobsUser }}>
      {children}
    </JobsAuthContext.Provider>
  );
}

export function useJobsAuth() {
  const ctx = useContext(JobsAuthContext);
  if (!ctx) throw new Error("useJobsAuth must be inside JobsAuthProvider");
  return ctx;
}

export { randomColor };
