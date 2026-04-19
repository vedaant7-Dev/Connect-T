import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform,
  TextInput, Alert, Modal, Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useJobsAuth, calcProfileCompletion, SEEKER_PROFILE_FIELDS, CurrentStatus } from "@/context/JobsAuthContext";
import { useJobs } from "@/context/JobsContext";

const STATUS_OPTIONS: { id: CurrentStatus; label: string; icon: string; color: string }[] = [
  { id: "employed",   label: "Currently Employed",  icon: "briefcase", color: "#059669" },
  { id: "unemployed", label: "Looking for Work",     icon: "search",    color: "#EA580C" },
  { id: "student",    label: "Student",              icon: "book-open", color: "#7C3AED" },
  { id: "fresher",    label: "Fresher (No Exp)",     icon: "star",      color: "#0369A1" },
];

function Avatar({ user, size = 72 }: { user: any; size?: number }) {
  const initials = (user.name || "U").split(" ").map((n: string) => n[0]).join("").slice(0, 2).toUpperCase();
  if (user.profilePhoto) {
    return <Image source={{ uri: user.profilePhoto }} style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 3, borderColor: "rgba(255,255,255,0.5)" }} />;
  }
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: user.avatarColor, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "rgba(255,255,255,0.4)" }}>
      <Text style={{ fontSize: size * 0.32, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" }}>{initials}</Text>
    </View>
  );
}

function CompletionBar({ pct }: { pct: number }) {
  const color = pct === 100 ? "#059669" : pct >= 60 ? "#EA580C" : "#DC2626";
  return (
    <View style={cs.barWrap}>
      <View style={cs.barTrack}>
        <View style={[cs.barFill, { width: `${pct}%` as any, backgroundColor: color }]} />
      </View>
      <Text style={[cs.barLabel, { color }]}>{pct}%</Text>
    </View>
  );
}

function InfoRow({ icon, label, value }: { icon: string; label: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={cs.infoRow}>
      <Feather name={icon as any} size={14} color="#EA580C" />
      <Text style={cs.infoLabel}>{label}</Text>
      <Text style={cs.infoValue} numberOfLines={2}>{value}</Text>
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

  // Edit state
  const [eName, setEName] = useState(jobsUser?.name || "");
  const [eEmail, setEEmail] = useState(jobsUser?.email || "");
  const [eAge, setEAge] = useState(jobsUser?.age || "");
  const [eQual, setEQual] = useState(jobsUser?.qualification || "");
  const [eSkills, setESkills] = useState(jobsUser?.skills || "");
  const [eAbout, setEAbout] = useState(jobsUser?.about || "");
  const [eStatus, setEStatus] = useState<CurrentStatus | "">(jobsUser?.currentStatus || "");
  const [eCurrentCompany, setECurrentCompany] = useState(jobsUser?.currentCompany || "");
  const [eCurrentRole, setECurrentRole] = useState(jobsUser?.currentRole || "");
  const [eExperience, setEExperience] = useState(jobsUser?.experience || "");
  const [ePrevCompany, setEPrevCompany] = useState(jobsUser?.previousCompany || "");
  const [ePrevRole, setEPrevRole] = useState(jobsUser?.previousRole || "");
  const [eLocation, setELocation] = useState(jobsUser?.location || "");
  const [eLanguages, setELanguages] = useState(jobsUser?.languages || "");
  const [eCompany, setECompany] = useState(jobsUser?.company || "");

  if (!jobsUser) return null;

  const isEmployer = jobsUser.role === "employer";
  const completion = calcProfileCompletion(jobsUser);
  const myJobs = isEmployer ? getJobsByEmployer(jobsUser.id) : [];
  const appliedCount = isEmployer ? 0 : jobs.filter((j) => j.applicants.includes(jobsUser.id)).length;

  const pickPhoto = async () => {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) { Alert.alert("Permission needed", "Allow photo library access to upload photo."); return; }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
      base64: false,
    });
    if (!result.canceled && result.assets[0]) {
      await updateJobsUser({ profilePhoto: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    if (!eName.trim()) { Alert.alert("Name is required"); return; }
    await updateJobsUser({
      name: eName.trim(),
      email: eEmail.trim(),
      age: eAge.trim(),
      qualification: eQual.trim(),
      skills: eSkills.trim(),
      about: eAbout.trim(),
      currentStatus: eStatus as CurrentStatus || undefined,
      currentCompany: eCurrentCompany.trim(),
      currentRole: eCurrentRole.trim(),
      experience: eExperience.trim(),
      previousCompany: ePrevCompany.trim(),
      previousRole: ePrevRole.trim(),
      location: eLocation.trim(),
      languages: eLanguages.trim(),
      company: eCompany.trim(),
    });
    setEditing(false);
    Alert.alert("Profile Updated", "Your profile has been saved successfully.");
  };

  const openEdit = () => {
    setEName(jobsUser.name || ""); setEEmail(jobsUser.email || ""); setEAge(jobsUser.age || "");
    setEQual(jobsUser.qualification || ""); setESkills(jobsUser.skills || ""); setEAbout(jobsUser.about || "");
    setEStatus(jobsUser.currentStatus || ""); setECurrentCompany(jobsUser.currentCompany || "");
    setECurrentRole(jobsUser.currentRole || ""); setEExperience(jobsUser.experience || "");
    setEPrevCompany(jobsUser.previousCompany || ""); setEPrevRole(jobsUser.previousRole || "");
    setELocation(jobsUser.location || ""); setELanguages(jobsUser.languages || "");
    setECompany(jobsUser.company || "");
    setEditing(true);
  };

  const handleLogout = async () => {
    setShowLogout(false);
    await logoutJobs();
    router.replace("/jobs/login" as any);
  };

  const missingFields = SEEKER_PROFILE_FIELDS.filter((f) => {
    const val = jobsUser[f.key];
    return !val || String(val).trim() === "";
  });

  return (
    <View style={cs.root}>
      <LinearGradient
        colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={[cs.header, { paddingTop: topPad + 12 }]}
      >
        <View style={cs.headerRow}>
          <TouchableOpacity onPress={pickPhoto} activeOpacity={0.85} style={cs.avatarWrap}>
            <Avatar user={jobsUser} size={70} />
            <View style={cs.cameraBtn}><Feather name="camera" size={12} color="white" /></View>
          </TouchableOpacity>

          <View style={{ flex: 1 }}>
            <Text style={cs.headerName} numberOfLines={1}>{jobsUser.name}</Text>
            <View style={cs.rolePill}>
              <Feather name={isEmployer ? "briefcase" : "user"} size={10} color="#EA580C" />
              <Text style={cs.rolePillText}>{isEmployer ? "Employer" : "Job Seeker"}</Text>
            </View>
            <Text style={cs.headerSub}>+91 {jobsUser.phone}</Text>
          </View>

          <TouchableOpacity onPress={openEdit} style={cs.editBtn}>
            <Feather name="edit-2" size={16} color="white" />
          </TouchableOpacity>
        </View>

        {!isEmployer && (
          <View style={cs.completionCard}>
            <View style={cs.completionTop}>
              <Text style={cs.completionLabel}>Profile Completion</Text>
              {completion === 100 && (
                <TouchableOpacity
                  onPress={() => router.push("/jobs/resume" as any)}
                  style={cs.resumeBtn}
                >
                  <Feather name="file-text" size={12} color="white" />
                  <Text style={cs.resumeBtnText}>View Resume</Text>
                </TouchableOpacity>
              )}
            </View>
            <CompletionBar pct={completion} />
            {completion < 100 && (
              <Text style={cs.completionHint}>
                Complete your profile to unlock resume generation →
              </Text>
            )}
            {completion === 100 && (
              <Text style={[cs.completionHint, { color: "#059669" }]}>
                🎉 Profile complete! Your resume is ready to generate.
              </Text>
            )}
          </View>
        )}

        <View style={cs.statsRow}>
          {isEmployer ? (
            <>
              <View style={cs.statBox}><Text style={cs.statNum}>{myJobs.length}</Text><Text style={cs.statLabel}>Jobs Posted</Text></View>
              <View style={cs.statBox}><Text style={cs.statNum}>{myJobs.reduce((a, j) => a + j.applicants.length, 0)}</Text><Text style={cs.statLabel}>Applicants</Text></View>
              <View style={cs.statBox}><Text style={cs.statNum}>{myJobs.filter((j) => j.active).length}</Text><Text style={cs.statLabel}>Active</Text></View>
            </>
          ) : (
            <>
              <View style={cs.statBox}><Text style={cs.statNum}>{appliedCount}</Text><Text style={cs.statLabel}>Applied</Text></View>
              <View style={cs.statBox}><Text style={cs.statNum}>{jobsUser.experience || "—"}</Text><Text style={cs.statLabel}>Experience</Text></View>
              <View style={cs.statBox}><Text style={cs.statNum}>{completion}%</Text><Text style={cs.statLabel}>Profile</Text></View>
            </>
          )}
        </View>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={[cs.content, { paddingBottom: Math.max(insets.bottom, 8) + 90 }]} showsVerticalScrollIndicator={false}>

        {!isEmployer && completion < 100 && missingFields.length > 0 && (
          <View style={cs.missingCard}>
            <Feather name="alert-circle" size={15} color="#EA580C" />
            <View style={{ flex: 1 }}>
              <Text style={cs.missingTitle}>Complete your profile</Text>
              <Text style={cs.missingText}>Missing: {missingFields.map(f => f.label).join(", ")}</Text>
            </View>
            <TouchableOpacity onPress={openEdit} style={cs.missingBtn}>
              <Text style={cs.missingBtnText}>Fill Now</Text>
            </TouchableOpacity>
          </View>
        )}

        {!isEmployer && (
          <>
            <View style={cs.section}>
              <Text style={cs.sectionTitle}>Personal Information</Text>
              <InfoRow icon="user" label="Full Name" value={jobsUser.name} />
              <InfoRow icon="calendar" label="Age" value={jobsUser.age ? `${jobsUser.age} years` : undefined} />
              <InfoRow icon="phone" label="Mobile" value={`+91 ${jobsUser.phone}`} />
              <InfoRow icon="mail" label="Email" value={jobsUser.email} />
              <InfoRow icon="map-pin" label="Location" value={jobsUser.location} />
              <InfoRow icon="globe" label="Languages" value={jobsUser.languages} />
            </View>

            <View style={cs.section}>
              <Text style={cs.sectionTitle}>Education</Text>
              <InfoRow icon="award" label="Qualification" value={jobsUser.qualification} />
            </View>

            <View style={cs.section}>
              <Text style={cs.sectionTitle}>Current Status</Text>
              {jobsUser.currentStatus ? (
                <View style={cs.statusPill}>
                  <Feather name={STATUS_OPTIONS.find(s => s.id === jobsUser.currentStatus)?.icon as any || "briefcase"} size={14} color={STATUS_OPTIONS.find(s => s.id === jobsUser.currentStatus)?.color || "#EA580C"} />
                  <Text style={[cs.statusPillText, { color: STATUS_OPTIONS.find(s => s.id === jobsUser.currentStatus)?.color || "#EA580C" }]}>
                    {STATUS_OPTIONS.find(s => s.id === jobsUser.currentStatus)?.label}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity onPress={openEdit} style={cs.emptyField}><Text style={cs.emptyFieldText}>Tap to add status</Text></TouchableOpacity>
              )}
              {(jobsUser.currentStatus === "employed") && (
                <>
                  <InfoRow icon="briefcase" label="Company" value={jobsUser.currentCompany} />
                  <InfoRow icon="tag" label="Role" value={jobsUser.currentRole} />
                </>
              )}
            </View>

            <View style={cs.section}>
              <Text style={cs.sectionTitle}>Work Experience</Text>
              <InfoRow icon="clock" label="Total Exp." value={jobsUser.experience} />
              <InfoRow icon="building-2" label="Prev. Company" value={jobsUser.previousCompany} />
              <InfoRow icon="tag" label="Prev. Role" value={jobsUser.previousRole} />
            </View>

            {jobsUser.skills && (
              <View style={cs.section}>
                <Text style={cs.sectionTitle}>Skills</Text>
                <View style={cs.skillsWrap}>
                  {jobsUser.skills.split(",").map((s, i) => (
                    <View key={i} style={cs.skillChip}><Text style={cs.skillText}>{s.trim()}</Text></View>
                  ))}
                </View>
              </View>
            )}

            {jobsUser.about && (
              <View style={cs.section}>
                <Text style={cs.sectionTitle}>About / Objective</Text>
                <Text style={cs.aboutText}>{jobsUser.about}</Text>
              </View>
            )}

            {completion === 100 && (
              <TouchableOpacity onPress={() => router.push("/jobs/resume" as any)} style={cs.resumeCardBtn} activeOpacity={0.88}>
                <LinearGradient colors={["#059669", "#16A34A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={cs.resumeCardGrad}>
                  <Feather name="file-text" size={20} color="white" />
                  <View>
                    <Text style={cs.resumeCardTitle}>Generate Resume</Text>
                    <Text style={cs.resumeCardSub}>Choose from 3 professional templates</Text>
                  </View>
                  <Feather name="arrow-right" size={18} color="white" />
                </LinearGradient>
              </TouchableOpacity>
            )}
          </>
        )}

        {isEmployer && (
          <View style={cs.section}>
            <Text style={cs.sectionTitle}>Company Details</Text>
            <InfoRow icon="briefcase" label="Company" value={jobsUser.company} />
            <InfoRow icon="file-text" label="GST Number" value={jobsUser.gstNo} />
            <InfoRow icon="mail" label="Email" value={jobsUser.email} />
            <InfoRow icon="phone" label="Mobile" value={`+91 ${jobsUser.phone}`} />
            <InfoRow icon="map-pin" label="Location" value={jobsUser.location} />
          </View>
        )}

        <TouchableOpacity style={cs.switchBtn} onPress={() => router.replace("/login" as any)} activeOpacity={0.85}>
          <Feather name="home" size={18} color="#EA580C" />
          <Text style={cs.switchBtnText}>Switch to Civic Services</Text>
        </TouchableOpacity>

        <TouchableOpacity style={cs.logoutBtn} onPress={() => setShowLogout(true)} activeOpacity={0.85}>
          <Feather name="log-out" size={18} color="#DC2626" />
          <Text style={cs.logoutBtnText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={editing} animationType="slide" onRequestClose={() => setEditing(false)}>
        <View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
          <LinearGradient colors={["#C2410C", "#EA580C"]} style={[cs.editHeader, { paddingTop: (Platform.OS === "web" ? 44 : insets.top) + 12 }]}>
            <TouchableOpacity onPress={() => setEditing(false)} style={cs.editClose}>
              <Feather name="x" size={20} color="white" />
            </TouchableOpacity>
            <Text style={cs.editHeaderTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={handleSave} style={cs.editSaveBtn}>
              <Text style={cs.editSaveBtnText}>Save</Text>
            </TouchableOpacity>
          </LinearGradient>

          <ScrollView contentContainerStyle={cs.editScroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>

            <Text style={cs.editSection}>Basic Information</Text>
            <EditField label="Full Name *" value={eName} onChange={setEName} placeholder="Your full name" />
            <EditField label="Age" value={eAge} onChange={setEAge} placeholder="e.g. 25" keyboardType="number-pad" />
            <EditField label="Email Address" value={eEmail} onChange={setEEmail} placeholder="you@email.com" keyboardType="email-address" />
            <EditField label="Location / Area" value={eLocation} onChange={setELocation} placeholder="e.g. Ambernath East" />
            <EditField label="Languages Known" value={eLanguages} onChange={setELanguages} placeholder="e.g. Hindi, Marathi, English" />

            {!isEmployer && (
              <>
                <Text style={cs.editSection}>Education</Text>
                <EditField label="Highest Qualification" value={eQual} onChange={setEQual} placeholder="e.g. 12th Pass, B.Com, ITI" />

                <Text style={cs.editSection}>Current Status</Text>
                <View style={cs.statusOptions}>
                  {STATUS_OPTIONS.map((s) => (
                    <TouchableOpacity
                      key={s.id}
                      style={[cs.statusOption, eStatus === s.id && { borderColor: s.color, backgroundColor: s.color + "15" }]}
                      onPress={() => setEStatus(s.id)}
                      activeOpacity={0.8}
                    >
                      <Feather name={s.icon as any} size={14} color={eStatus === s.id ? s.color : "#64748B"} />
                      <Text style={[cs.statusOptionText, eStatus === s.id && { color: s.color, fontFamily: "Inter_700Bold" }]}>{s.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {(eStatus === "employed") && (
                  <>
                    <EditField label="Current Company" value={eCurrentCompany} onChange={setECurrentCompany} placeholder="Company name" />
                    <EditField label="Current Role / Designation" value={eCurrentRole} onChange={setECurrentRole} placeholder="e.g. Sales Executive" />
                  </>
                )}

                <Text style={cs.editSection}>Work Experience</Text>
                <EditField label="Total Experience" value={eExperience} onChange={setEExperience} placeholder="e.g. 2 years, Fresher" />
                <EditField label="Previous Company" value={ePrevCompany} onChange={setEPrevCompany} placeholder="e.g. ABC Pvt Ltd" />
                <EditField label="Previous Role" value={ePrevRole} onChange={setEPrevRole} placeholder="e.g. Factory Operator" />

                <Text style={cs.editSection}>Skills & About</Text>
                <EditField label="Skills" value={eSkills} onChange={setESkills} placeholder="e.g. Welding, MS Office, Driving" />
                <EditField label="About / Career Objective" value={eAbout} onChange={setEAbout} placeholder="Write a short objective statement…" multiline />
              </>
            )}

            {isEmployer && (
              <>
                <Text style={cs.editSection}>Company</Text>
                <EditField label="Company Name" value={eCompany} onChange={setECompany} placeholder="e.g. XYZ Pvt Ltd" />
              </>
            )}

            <TouchableOpacity onPress={handleSave} style={cs.saveBtnFull} activeOpacity={0.85}>
              <LinearGradient colors={["#C2410C", "#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={cs.saveBtnGrad}>
                <Feather name="check" size={18} color="white" />
                <Text style={cs.saveBtnText}>Save Profile</Text>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>

      <Modal visible={showLogout} transparent animationType="fade" onRequestClose={() => setShowLogout(false)}>
        <View style={cs.modalOverlay}>
          <View style={cs.modalCard}>
            <Text style={cs.modalTitle}>Logout?</Text>
            <Text style={cs.modalSub}>You will be returned to the job portal login screen.</Text>
            <View style={cs.modalBtns}>
              <TouchableOpacity style={cs.modalCancel} onPress={() => setShowLogout(false)}><Text style={cs.modalCancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={cs.modalConfirm} onPress={handleLogout}><Text style={cs.modalConfirmText}>Logout</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function EditField({ label, value, onChange, placeholder, keyboardType, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; keyboardType?: any; multiline?: boolean;
}) {
  return (
    <View style={cs.fieldWrap}>
      <Text style={cs.fieldLabel}>{label}</Text>
      <TextInput
        style={[cs.fieldInput, multiline && { minHeight: 80, textAlignVertical: "top", paddingTop: 12 }]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor="#CBD5E1"
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
        autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
      />
    </View>
  );
}

const cs = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFF7ED" },
  header: { paddingHorizontal: 16, paddingBottom: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
  headerRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 14 },
  avatarWrap: { position: "relative" },
  cameraBtn: { position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: "#EA580C", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" },
  headerName: { fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
  rolePill: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, alignSelf: "flex-start", marginTop: 4 },
  rolePillText: { fontSize: 11, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold" },
  headerSub: { fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular", marginTop: 3 },
  editBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },

  completionCard: { backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 12, marginBottom: 12 },
  completionTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  completionLabel: { fontSize: 13, fontWeight: "600", color: "white", fontFamily: "Inter_600SemiBold" },
  resumeBtn: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#059669", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
  resumeBtnText: { fontSize: 11, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
  barWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
  barTrack: { flex: 1, height: 8, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 4, overflow: "hidden" },
  barFill: { height: "100%", borderRadius: 4 },
  barLabel: { fontSize: 13, fontWeight: "700", fontFamily: "Inter_700Bold", minWidth: 36, textAlign: "right" },
  completionHint: { fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: "Inter_400Regular", marginTop: 6 },

  statsRow: { flexDirection: "row", gap: 10 },
  statBox: { flex: 1, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 12, alignItems: "center" },
  statNum: { fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
  statLabel: { fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", textAlign: "center" },

  content: { padding: 16, gap: 4 },
  missingCard: { flexDirection: "row", alignItems: "flex-start", gap: 10, backgroundColor: "#FFF7ED", borderRadius: 14, padding: 14, marginBottom: 12, borderWidth: 1.5, borderColor: "#FED7AA" },
  missingTitle: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
  missingText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
  missingBtn: { backgroundColor: "#EA580C", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8 },
  missingBtnText: { fontSize: 12, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },

  section: { backgroundColor: "white", borderRadius: 16, padding: 16, marginBottom: 12, shadowColor: "#EA580C", shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  sectionTitle: { fontSize: 12, fontWeight: "700", color: "#94A3B8", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 12 },
  infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 10 },
  infoLabel: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_500Medium", width: 80 },
  infoValue: { flex: 1, fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular" },
  emptyField: { backgroundColor: "#F8FAFC", borderRadius: 10, padding: 12, borderWidth: 1, borderColor: "#E2E8F0", borderStyle: "dashed" },
  emptyFieldText: { fontSize: 13, color: "#94A3B8", fontFamily: "Inter_400Regular", textAlign: "center" },
  statusPill: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F8FAFC", borderRadius: 12, padding: 12, alignSelf: "flex-start" },
  statusPillText: { fontSize: 14, fontWeight: "700", fontFamily: "Inter_700Bold" },
  skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  skillChip: { backgroundColor: "#FFF7ED", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: "#FED7AA" },
  skillText: { fontSize: 13, color: "#C2410C", fontFamily: "Inter_500Medium" },
  aboutText: { fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular", lineHeight: 20 },

  resumeCardBtn: { borderRadius: 16, overflow: "hidden", marginBottom: 12 },
  resumeCardGrad: { flexDirection: "row", alignItems: "center", padding: 18, gap: 14 },
  resumeCardTitle: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
  resumeCardSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", fontFamily: "Inter_400Regular" },

  switchBtn: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "white", borderRadius: 14, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: "#FED7AA" },
  switchBtnText: { fontSize: 15, fontWeight: "600", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
  logoutBtn: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#FEE2E2", borderRadius: 14, padding: 16, borderWidth: 1.5, borderColor: "#FECACA" },
  logoutBtnText: { fontSize: 15, fontWeight: "600", color: "#DC2626", fontFamily: "Inter_600SemiBold" },

  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  modalCard: { backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, gap: 12 },
  modalTitle: { fontSize: 18, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
  modalSub: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular" },
  modalBtns: { flexDirection: "row", gap: 10, marginTop: 4 },
  modalCancel: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#F1F5F9", alignItems: "center" },
  modalCancelText: { fontSize: 15, fontWeight: "600", color: "#64748B", fontFamily: "Inter_600SemiBold" },
  modalConfirm: { flex: 1, padding: 14, borderRadius: 12, backgroundColor: "#EA580C", alignItems: "center" },
  modalConfirmText: { fontSize: 15, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },

  editHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16, gap: 12 },
  editClose: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  editHeaderTitle: { flex: 1, fontSize: 18, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
  editSaveBtn: { backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  editSaveBtnText: { fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
  editScroll: { padding: 16, paddingBottom: 60 },
  editSection: { fontSize: 13, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 18, marginBottom: 8 },
  fieldWrap: { marginBottom: 14 },
  fieldLabel: { fontSize: 12, fontWeight: "600", color: "#475569", fontFamily: "Inter_600SemiBold", marginBottom: 6 },
  fieldInput: { backgroundColor: "white", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular" },
  statusOptions: { gap: 8, marginBottom: 4 },
  statusOption: { flexDirection: "row", alignItems: "center", gap: 10, padding: 12, borderRadius: 12, borderWidth: 1.5, borderColor: "#E2E8F0", backgroundColor: "white" },
  statusOptionText: { fontSize: 14, color: "#64748B", fontFamily: "Inter_500Medium" },
  saveBtnFull: { borderRadius: 14, overflow: "hidden", marginTop: 12 },
  saveBtnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 15, gap: 10 },
  saveBtnText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
