import React, { useMemo } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useJobs } from "@/context/JobsContext";

export default function JobStatusScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ status?: string }>();
  const { jobs } = useJobs();
  const status = (params.status ?? "active") as "shortlisted" | "rejected" | "pending" | "active";

  const items = useMemo(() => {
    if (status === "shortlisted") return jobs.filter((j) => j.shortlisted.length > 0);
    if (status === "rejected") return jobs.filter((j) => j.rejected.length > 0);
    if (status === "pending") return jobs.filter((j) => j.applicants.some((id) => !j.shortlisted.includes(id) && !j.rejected.includes(id)));
    return jobs.filter((j) => j.active);
  }, [jobs, status]);

  const title = status === "shortlisted" ? "Shortlisted Jobs" : status === "rejected" ? "Rejected Jobs" : status === "pending" ? "Pending Jobs" : "Active Jobs";
  const theme =
    status === "shortlisted"
      ? { colors: ["#16A34A", "#22C55E", "#34D399"], accent: "#059669", soft: "#D1FAE5", border: "#A7F3D0", icon: "user-check" as const }
      : status === "rejected"
        ? { colors: ["#DC2626", "#EF4444", "#F87171"], accent: "#DC2626", soft: "#FEE2E2", border: "#FECACA", icon: "user-x" as const }
        : status === "pending"
          ? { colors: ["#2563EB", "#3B82F6", "#60A5FA"], accent: "#1D4ED8", soft: "#EFF6FF", border: "#BFDBFE", icon: "clock" as const }
          : { colors: ["#C2410C", "#EA580C", "#FB923C"], accent: "#C2410C", soft: "#FFF7ED", border: "#FED7AA", icon: "zap" as const };

  return (
    <View style={s.root}>
      <LinearGradient colors={theme.colors as any} style={s.header}>
        <TouchableOpacity onPress={() => router.back()} style={s.backBtn} activeOpacity={0.8}>
          <Feather name="arrow-left" size={18} color="white" />
        </TouchableOpacity>
        <Text style={s.headerTitle}>{title}</Text>
        <Text style={s.headerSub}>{items.length} jobs</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (
          <View style={s.empty}>
          <Feather name={theme.icon} size={42} color={theme.accent} />
            <Text style={s.emptyText}>No {title.toLowerCase()} found</Text>
          </View>
        ) : (
          items.map((job) => {
            const pending = job.applicants.filter((id) => !job.shortlisted.includes(id) && !job.rejected.includes(id));
            return (
              <View key={job.id} style={s.card}>
                <View style={s.cardTop}>
                  <Text style={s.jobTitle}>{job.title}</Text>
                  <Text style={s.jobMeta}>{job.company} · {job.location}</Text>
                </View>
                <View style={s.chipGrid}>
                  <View style={[s.chip, { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }]}>
                    <Text style={[s.chipNum, { color: "#C2410C" }]}>{job.openings}</Text>
                    <Text style={s.chipLabel}>Openings</Text>
                  </View>
                  <View style={[s.chip, { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }]}>
                    <Text style={[s.chipNum, { color: "#1D4ED8" }]}>{job.applicants.length}</Text>
                    <Text style={s.chipLabel}>Applied</Text>
                  </View>
                  <View style={[s.chip, { backgroundColor: "#D1FAE5", borderColor: "#A7F3D0" }]}>
                    <Text style={[s.chipNum, { color: "#059669" }]}>{job.shortlisted.length}</Text>
                    <Text style={s.chipLabel}>Shortlisted</Text>
                  </View>
                  <View style={[s.chip, { backgroundColor: "#FEE2E2", borderColor: "#FECACA" }]}>
                    <Text style={[s.chipNum, { color: "#DC2626" }]}>{job.rejected.length}</Text>
                    <Text style={s.chipLabel}>Rejected</Text>
                  </View>
                  <View style={[s.chip, { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }]}>
                    <Text style={[s.chipNum, { color: "#C2410C" }]}>{pending.length}</Text>
                    <Text style={s.chipLabel}>Pending</Text>
                  </View>
                </View>
                <Text style={s.description}>{job.description}</Text>
                <Text style={s.requirements}>{job.requirements}</Text>
              </View>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
  backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.18)", marginBottom: 12 },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
  headerSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4, fontFamily: "Inter_400Regular" },
  content: { padding: 16, gap: 12 },
  card: { backgroundColor: "white", borderRadius: 18, padding: 16, gap: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  cardTop: { gap: 4 },
  jobTitle: { fontSize: 16, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
  jobMeta: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular" },
  chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 2 },
  chip: { minWidth: 84, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, borderWidth: 1, alignItems: "center" },
  chipNum: { fontSize: 16, fontWeight: "800", fontFamily: "Inter_700Bold" },
  chipLabel: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
  description: { fontSize: 13, color: "#334155", lineHeight: 19, fontFamily: "Inter_400Regular", marginTop: 4 },
  requirements: { fontSize: 12, color: "#64748B", lineHeight: 18, fontFamily: "Inter_400Regular" },
  empty: { alignItems: "center", justifyContent: "center", paddingTop: 80, gap: 10 },
  emptyText: { fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular" },
});