import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  Platform, TextInput, Alert, Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useJobsAuth } from "@/context/JobsAuthContext";
import { useJobs } from "@/context/JobsContext";
import { useRouter } from "expo-router";

function Avatar({ name, color, size = 60 }: { name: string; color: string; size?: number }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "rgba(255,255,255,0.4)" }}>
      <Text style={{ fontSize: size * 0.35, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" }}>{initials}</Text>
    </View>
  );
}

export default function JobsProfileScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const { jobsUser, logoutJobs, updateJobsUser } = useJobsAuth();
  const { getJobsByEmployer, jobs } = useJobs();
  const router = useRouter();

  const [showLogout, setShowLogout] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState(jobsUser?.name || "");
  const [editSkills, setEditSkills] = useState(jobsUser?.skills || "");
  const [editCompany, setEditCompany] = useState(jobsUser?.company || "");
  const [editLocation, setEditLocation] = useState(jobsUser?.location || "");

  if (!jobsUser) return null;

  const isEmployer = jobsUser.role === "employer";
  const myJobs = isEmployer ? getJobsByEmployer(jobsUser.id) : [];
  const appliedCount = isEmployer ? 0 : jobs.filter((j) => j.applicants.includes(jobsUser.id)).length;

  const handleSave = async () => {
    await updateJobsUser({
      name: editName.trim(),
      skills: editSkills.trim(),
      company: editCompany.trim(),
      location: editLocation.trim(),
    });
    setEditing(false);
  };

  const handleLogout = async () => {
    setShowLogout(false);
    await logoutJobs();
    router.replace("/jobs/login" as any);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: topPad + 12 }]}
      >
        <View style={styles.headerRow}>
          <Avatar name={jobsUser.name} color={jobsUser.avatarColor} size={64} />
          <View style={{ flex: 1 }}>
            <Text style={styles.headerName}>{jobsUser.name}</Text>
            <View style={styles.rolePill}>
              <Feather name={isEmployer ? "briefcase" : "user"} size={11} color="#EA580C" />
              <Text style={styles.rolePillText}>{isEmployer ? "Employer" : "Job Seeker"}</Text>
            </View>
            <Text style={styles.headerPhone}>+91 {jobsUser.phone}</Text>
          </View>
          <TouchableOpacity onPress={() => setEditing(true)} style={styles.editBtn}>
            <Feather name="edit-2" size={16} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          {isEmployer ? (
            <>
              <View style={styles.statBox}><Text style={styles.statNum}>{myJobs.length}</Text><Text style={styles.statLabel}>Jobs Posted</Text></View>
              <View style={styles.statBox}><Text style={styles.statNum}>{myJobs.reduce((a, j) => a + j.applicants.length, 0)}</Text><Text style={styles.statLabel}>Total Applicants</Text></View>
              <View style={styles.statBox}><Text style={styles.statNum}>{myJobs.filter((j) => j.active).length}</Text><Text style={styles.statLabel}>Active</Text></View>
            </>
          ) : (
            <>
              <View style={styles.statBox}><Text style={styles.statNum}>{appliedCount}</Text><Text style={styles.statLabel}>Applied</Text></View>
              <View style={styles.statBox}><Text style={styles.statNum}>{jobsUser.skills?.split(",").length || 0}</Text><Text style={styles.statLabel}>Skills</Text></View>
              <View style={styles.statBox}><Text style={styles.statNum}>{jobsUser.location || "–"}</Text><Text style={[styles.statLabel, { fontSize: 9 }]}>Location</Text></View>
            </>
          )}
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 8) + 80 }]} showsVerticalScrollIndicator={false}>

        {!isEmployer && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Personal Details</Text>
            {jobsUser.age && (
              <View style={[styles.infoRow, { marginBottom: 10 }]}>
                <Feather name="calendar" size={15} color="#EA580C" />
                <Text style={styles.infoLabel}>Age</Text>
                <Text style={styles.infoText}>{jobsUser.age} years</Text>
              </View>
            )}
            {jobsUser.qualification && (
              <View style={[styles.infoRow, { marginBottom: 10 }]}>
                <Feather name="book" size={15} color="#EA580C" />
                <Text style={styles.infoLabel}>Qualification</Text>
                <Text style={styles.infoText}>{jobsUser.qualification}</Text>
              </View>
            )}
            {jobsUser.location && (
              <View style={styles.infoRow}>
                <Feather name="map-pin" size={15} color="#EA580C" />
                <Text style={styles.infoLabel}>Location</Text>
                <Text style={styles.infoText}>{jobsUser.location}</Text>
              </View>
            )}
          </View>
        )}

        {!isEmployer && jobsUser.skills && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Skills</Text>
            <View style={styles.skillsWrap}>
              {jobsUser.skills.split(",").map((s, i) => (
                <View key={i} style={styles.skillChip}>
                  <Text style={styles.skillText}>{s.trim()}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {isEmployer && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Company Details</Text>
            <View style={[styles.infoRow, { marginBottom: 10 }]}>
              <Feather name="briefcase" size={15} color="#EA580C" />
              <Text style={styles.infoLabel}>Company</Text>
              <Text style={styles.infoText}>{jobsUser.company || "—"}</Text>
            </View>
            {jobsUser.gstNo && (
              <View style={[styles.infoRow, { marginBottom: 10 }]}>
                <Feather name="file-text" size={15} color="#EA580C" />
                <Text style={styles.infoLabel}>GST No</Text>
                <Text style={styles.infoText}>{jobsUser.gstNo}</Text>
              </View>
            )}
            {jobsUser.email && (
              <View style={[styles.infoRow, { marginBottom: 10 }]}>
                <Feather name="mail" size={15} color="#EA580C" />
                <Text style={styles.infoLabel}>Email</Text>
                <Text style={styles.infoText}>{jobsUser.email}</Text>
              </View>
            )}
            <View style={styles.infoRow}>
              <Feather name="map-pin" size={15} color="#EA580C" />
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoText}>{jobsUser.location || "Ambernath"}</Text>
            </View>
          </View>
        )}

        <TouchableOpacity style={styles.switchBtn} onPress={() => router.replace("/login" as any)} activeOpacity={0.85}>
          <Feather name="home" size={18} color="#EA580C" />
          <Text style={styles.switchBtnText}>Switch to Civic Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => setShowLogout(true)} activeOpacity={0.85}>
          <Feather name="log-out" size={18} color="#DC2626" />
          <Text style={styles.logoutBtnText}>Logout from Jobs</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={showLogout} transparent animationType="fade" onRequestClose={() => setShowLogout(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Logout?</Text>
            <Text style={styles.modalSub}>You will be returned to the job portal login screen.</Text>
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setShowLogout(false)}><Text style={styles.modalCancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={handleLogout}><Text style={styles.modalConfirmText}>Logout</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={editing} transparent animationType="slide" onRequestClose={() => setEditing(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TextInput style={styles.editInput} value={editName} onChangeText={setEditName} placeholder="Full Name" placeholderTextColor="#CBD5E1" />
            {isEmployer && <TextInput style={styles.editInput} value={editCompany} onChangeText={setEditCompany} placeholder="Company Name" placeholderTextColor="#CBD5E1" />}
            {!isEmployer && <TextInput style={styles.editInput} value={editSkills} onChangeText={setEditSkills} placeholder="Skills (comma separated)" placeholderTextColor="#CBD5E1" />}
            <TextInput style={styles.editInput} value={editLocation} onChangeText={setEditLocation} placeholder="Location" placeholderTextColor="#CBD5E1" />
            <View style={styles.modalBtns}>
              <TouchableOpacity style={styles.modalCancel} onPress={() => setEditing(false)}><Text style={styles.modalCancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.modalConfirm} onPress={handleSave}><Text style={styles.modalConfirmText}>Save</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFF7ED" },
  header: { paddingHorizontal: 16, paddingBottom: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
  headerName: { fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
  rolePill: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, alignSelf: "flex-start", marginTop: 4 },
  rolePillText: { fontSize: 11, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold" },
  headerPhone: { fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular", marginTop: 4 },
  editBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  statsRow: { flexDirection: "row", gap: 10 },
  statBox: { flex: 1, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 12, alignItems: "center" },
  statNum: { fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
  statLabel: { fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", textAlign: "center" },
  content: { padding: 16, gap: 4 },
  section: { backgroundColor: "white", borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: "#EA580C", shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionTitle: { fontSize: 12, fontWeight: "700", color: "#94A3B8", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 10 },
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillChip: { backgroundColor: "#FFF7ED", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: "#FED7AA" },
  skillText: { fontSize: 13, color: "#C2410C", fontFamily: "Inter_500Medium" },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  infoLabel: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_500Medium", width: 90 },
  infoText: { fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular", flex: 1 },
  switchBtn: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "white", borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: "#FED7AA" },
  switchBtnText: { fontSize: 15, fontWeight: "600", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
  logoutBtn: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#FEE2E2", borderRadius: 14, padding: 16, borderWidth: 1.5, borderColor: "#FECACA" },
  logoutBtnText: { fontSize: 15, fontWeight: "600", color: "#DC2626", fontFamily: "Inter_600SemiBold" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 12 },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
  modalSub: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular" },
  editInput: { backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular" },
  modalBtns: { flexDirection: "row", gap: 10, marginTop: 4 },
  modalCancel: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#F1F5F9", alignItems: "center" },
  modalCancelText: { fontSize: 15, fontWeight: "600", color: "#64748B", fontFamily: "Inter_600SemiBold" },
  modalConfirm: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#EA580C", alignItems: "center" },
  modalConfirmText: { fontSize: 15, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
