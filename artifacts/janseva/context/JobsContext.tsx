import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type JobCategory = "manufacturing" | "it" | "retail" | "healthcare" | "construction" | "transport" | "education" | "security" | "other";
export type JobType = "full-time" | "part-time" | "contract" | "apprentice";

export interface Job {
  id: string;
  employerId: string;
  employerName: string;
  company: string;
  title: string;
  category: JobCategory;
  type: JobType;
  salary: string;
  location: string;
  description: string;
  requirements: string;
  openings: number;
  applicants: string[];
  shortlisted: string[];
  rejected: string[];
  createdAt: string;
  active: boolean;
}

interface JobsContextType {
  jobs: Job[];
  loading: boolean;
  addJob: (data: Omit<Job, "id" | "createdAt" | "applicants" | "shortlisted" | "rejected" | "active">) => void;
  applyJob: (jobId: string, seekerId: string) => void;
  hasApplied: (jobId: string, seekerId: string) => boolean;
  getJobsByEmployer: (employerId: string) => Job[];
  toggleJobActive: (jobId: string) => void;
  shortlistApplicant: (jobId: string, seekerId: string) => void;
  rejectApplicant: (jobId: string, seekerId: string) => void;
  deleteJob: (jobId: string) => void;
}

const JobsContext = createContext<JobsContextType | null>(null);
const STORAGE_KEY = "connectt_jobs_listings_v2";

const SEED_JOBS: Job[] = [
  {
    id: "JOB001", employerId: "SYS", employerName: "Ambernath MIDC HR",
    company: "Hindustan Unilever MIDC", title: "Factory Operator",
    category: "manufacturing", type: "full-time", salary: "₹12,000 – ₹18,000/month",
    location: "MIDC Ambernath", openings: 5,
    description: "We are hiring Factory Operators for our Ambernath MIDC plant. Day/night shift rotations. ESI & PF benefits included.",
    requirements: "Min 10th pass. 1 year factory experience preferred. Must be physically fit.",
    applicants: ["DEMO_A1", "DEMO_A2", "DEMO_A3"],
    shortlisted: ["DEMO_A1"],
    rejected: ["DEMO_A3"],
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(), active: true,
  },
  {
    id: "JOB002", employerId: "SYS", employerName: "Tech Recruiter",
    company: "SoftEdge Solutions", title: "Computer Operator / Data Entry",
    category: "it", type: "full-time", salary: "₹10,000 – ₹15,000/month",
    location: "Ambernath East", openings: 2,
    description: "Looking for a Computer Operator for data entry, billing, and office work. Basic knowledge of MS Office required.",
    requirements: "12th pass or graduate. MS Office knowledge. Typing speed 30 WPM+.",
    applicants: ["DEMO_B1", "DEMO_B2"],
    shortlisted: [],
    rejected: [],
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(), active: true,
  },
  {
    id: "JOB003", employerId: "SYS", employerName: "Retail Manager",
    company: "Reliance Smart Ambernath", title: "Sales Associate",
    category: "retail", type: "full-time", salary: "₹9,000 – ₹13,000/month",
    location: "Shivaji Chowk, Ambernath", openings: 4,
    description: "Join our Reliance Smart store team. Handle customer queries, billing, and stock management.",
    requirements: "10th/12th pass. Good communication skills. Willingness to work weekends.",
    applicants: ["DEMO_C1"],
    shortlisted: ["DEMO_C1"],
    rejected: [],
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(), active: true,
  },
  {
    id: "JOB004", employerId: "SYS", employerName: "Security Agency",
    company: "G4S Security Solutions", title: "Security Guard",
    category: "security", type: "full-time", salary: "₹11,000 – ₹14,000/month",
    location: "Various Sites, Ambernath", openings: 10,
    description: "Security Guard positions available at MIDC factories and residential complexes in Ambernath. Uniform and training provided.",
    requirements: "Min 18–45 years. 10th pass preferred. Ex-servicemen given priority.",
    applicants: [],
    shortlisted: [],
    rejected: [],
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(), active: true,
  },
  {
    id: "JOB005", employerId: "SYS", employerName: "Hospital HR",
    company: "Nair Hospital Ambernath", title: "Nursing Assistant",
    category: "healthcare", type: "full-time", salary: "₹10,000 – ₹16,000/month",
    location: "Old Ambernath", openings: 3,
    description: "Nursing assistants needed for our hospital. Support nursing staff with patient care, vitals monitoring, and ward management.",
    requirements: "ANM / GNM certificate required. Freshers welcome.",
    applicants: ["DEMO_D1", "DEMO_D2"],
    shortlisted: ["DEMO_D2"],
    rejected: [],
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(), active: true,
  },
  {
    id: "JOB006", employerId: "SYS", employerName: "Transport Manager",
    company: "City Link Transport", title: "Heavy Vehicle Driver",
    category: "transport", type: "full-time", salary: "₹18,000 – ₹25,000/month",
    location: "Ambernath MIDC", openings: 2,
    description: "Experienced heavy vehicle drivers needed for factory goods transport within MIDC and Mumbai area routes.",
    requirements: "Valid heavy vehicle license. Min 3 years driving experience. Clean record.",
    applicants: [],
    shortlisted: [],
    rejected: [],
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(), active: false,
  },
  {
    id: "JOB007", employerId: "SYS", employerName: "School Principal",
    company: "Ambernath English Medium School", title: "Primary Teacher",
    category: "education", type: "full-time", salary: "₹12,000 – ₹20,000/month",
    location: "Station Area, Ambernath", openings: 2,
    description: "Primary school teachers required for classes 1–5. English medium. Must be able to teach all core subjects.",
    requirements: "B.Ed required. TET passed preferred. Good English communication.",
    applicants: [],
    shortlisted: [],
    rejected: [],
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(), active: true,
  },
];

function generateId() {
  return "JOB" + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}

export function JobsProvider({ children }: { children: ReactNode }) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const parsed: Job[] = JSON.parse(raw);
          // migrate old jobs that lack shortlisted/rejected
          const migrated = parsed.map((j) => ({
            shortlisted: [],
            rejected: [],
            ...j,
          }));
          setJobs(migrated);
          return;
        } catch {}
      }
      setJobs(SEED_JOBS);
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_JOBS));
    }).finally(() => setLoading(false));
  }, []);

  const save = async (updated: Job[]) => {
    setJobs(updated);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const addJob = (data: Omit<Job, "id" | "createdAt" | "applicants" | "shortlisted" | "rejected" | "active">) => {
    const job: Job = {
      ...data,
      id: generateId(),
      applicants: [],
      shortlisted: [],
      rejected: [],
      active: true,
      createdAt: new Date().toISOString(),
    };
    save([job, ...jobs]);
  };

  const applyJob = (jobId: string, seekerId: string) => {
    save(jobs.map((j) => j.id === jobId && !j.applicants.includes(seekerId)
      ? { ...j, applicants: [...j.applicants, seekerId] }
      : j
    ));
  };

  const hasApplied = (jobId: string, seekerId: string) => {
    const job = jobs.find((j) => j.id === jobId);
    return !!job && job.applicants.includes(seekerId);
  };

  const getJobsByEmployer = (employerId: string) => jobs.filter((j) => j.employerId === employerId);

  const toggleJobActive = (jobId: string) => {
    save(jobs.map((j) => j.id === jobId ? { ...j, active: !j.active } : j));
  };

  const shortlistApplicant = (jobId: string, seekerId: string) => {
    save(jobs.map((j) => j.id === jobId
      ? {
          ...j,
          shortlisted: j.shortlisted.includes(seekerId) ? j.shortlisted : [...j.shortlisted, seekerId],
          rejected: j.rejected.filter((id) => id !== seekerId),
        }
      : j
    ));
  };

  const rejectApplicant = (jobId: string, seekerId: string) => {
    save(jobs.map((j) => j.id === jobId
      ? {
          ...j,
          rejected: j.rejected.includes(seekerId) ? j.rejected : [...j.rejected, seekerId],
          shortlisted: j.shortlisted.filter((id) => id !== seekerId),
        }
      : j
    ));
  };

  const deleteJob = (jobId: string) => {
    save(jobs.filter((j) => j.id !== jobId));
  };

  return (
    <JobsContext.Provider value={{ jobs, loading, addJob, applyJob, hasApplied, getJobsByEmployer, toggleJobActive, shortlistApplicant, rejectApplicant, deleteJob }}>
      {children}
    </JobsContext.Provider>
  );
}

export function useJobs() {
  const ctx = useContext(JobsContext);
  if (!ctx) throw new Error("useJobs must be inside JobsProvider");
  return ctx;
}

export const categoryConfig: Record<JobCategory, { label: string; icon: string; color: string; bg: string }> = {
  manufacturing: { label: "Manufacturing", icon: "settings",        color: "#92400E", bg: "#FEF3C7" },
  it:            { label: "IT / Computer", icon: "monitor",         color: "#1D4ED8", bg: "#DBEAFE" },
  retail:        { label: "Retail / Sales", icon: "shopping-bag",   color: "#7C3AED", bg: "#EDE9FE" },
  healthcare:    { label: "Healthcare",    icon: "activity",        color: "#DC2626", bg: "#FEE2E2" },
  construction:  { label: "Construction", icon: "tool",             color: "#B45309", bg: "#FFEDD5" },
  transport:     { label: "Transport",    icon: "truck",            color: "#0369A1", bg: "#BAE6FD" },
  education:     { label: "Education",    icon: "book-open",        color: "#059669", bg: "#D1FAE5" },
  security:      { label: "Security",     icon: "shield",           color: "#475569", bg: "#F1F5F9" },
  other:         { label: "Other",        icon: "more-horizontal",  color: "#64748B", bg: "#F1F5F9" },
};

export const typeConfig: Record<JobType, { label: string; color: string; bg: string }> = {
  "full-time":   { label: "Full Time",   color: "#059669", bg: "#D1FAE5" },
  "part-time":   { label: "Part Time",   color: "#D97706", bg: "#FEF3C7" },
  "contract":    { label: "Contract",    color: "#7C3AED", bg: "#EDE9FE" },
  "apprentice":  { label: "Apprentice",  color: "#EA580C", bg: "#FFEDD5" },
};
