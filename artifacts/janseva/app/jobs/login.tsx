import React, { useState, useRef } from "react";
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator, Alert, Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useJobsAuth, JobsUserRole, randomColor } from "@/context/JobsAuthContext";

type AuthTab = "login" | "register";
type Step = "form" | "otp" | "success";

const ROLES: { id: JobsUserRole; icon: string; label: string; sub: string }[] = [
  { id: "seeker", icon: "user", label: "Job Seeker", sub: "Find jobs in Ambernath" },
  { id: "employer", icon: "briefcase", label: "Employer", sub: "Post jobs & hire talent" },
];

export default function JobsLoginScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { registerJobs, loginJobs } = useJobsAuth();

  const [tab, setTab] = useState<AuthTab>("login");
  const [role, setRole] = useState<JobsUserRole>("seeker");
  const [step, setStep] = useState<Step>("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("Ambernath");
  const [skills, setSkills] = useState("");

  const [otp, setOtp] = useState(["", "", "", ""]);
  const otpRefs = [useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null), useRef<TextInput>(null)];

  const setOtpDigit = (i: number, val: string) => {
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 3) otpRefs[i + 1]?.current?.focus();
  };

  const handleSendOtp = () => {
    setError("");
    if (phone.length !== 10) { setError("Enter a valid 10-digit mobile number."); return; }
    if (tab === "register" && !name.trim()) { setError("Please enter your full name."); return; }
    if (tab === "register" && role === "employer" && !company.trim()) { setError("Please enter your company name."); return; }
    setStep("otp");
  };

  const handleVerifyOtp = async () => {
    const code = otp.join("");
    if (code.length < 4) { setError("Enter the 4-digit OTP."); return; }
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    try {
      if (tab === "register") {
        await registerJobs({
          name: name.trim(),
          phone,
          role,
          company: company.trim() || undefined,
          skills: skills.trim() || undefined,
          location: location.trim(),
          avatarColor: randomColor(),
        });
      } else {
        const ok = await loginJobs(phone, role);
        if (!ok) {
          setError("No account found. Please register first.");
          setStep("form");
          setTab("register");
          setLoading(false);
          return;
        }
      }
      setStep("success");
      setTimeout(() => router.replace("/jobs/(tabs)" as any), 1200);
    } catch {
      setError("Something went wrong. Try again.");
    }
    setLoading(false);
  };

  const switchTab = (t: AuthTab) => {
    setTab(t); setStep("form"); setError(""); setOtp(["", "", "", ""]);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <ScrollView style={{ flex: 1, backgroundColor: "#FFF7ED" }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
          style={[styles.header, { paddingTop: (Platform.OS === "web" ? 44 : insets.top) + 20 }]}
        >
          <View style={styles.headerLogo}>
            <Image source={require("../../assets/images/logo_transparent.png")} style={styles.headerLogoImg} resizeMode="contain" />
          </View>
          <Text style={styles.headerTitle}>Connect T Jobs</Text>
          <Text style={styles.headerSub}>Ambernath's #1 Local Job Portal</Text>
        </LinearGradient>

        <View style={styles.card}>
          {step === "success" ? (
            <View style={styles.successWrap}>
              <View style={styles.successCircle}>
                <Feather name="check" size={36} color="white" />
              </View>
              <Text style={styles.successTitle}>Welcome!</Text>
              <Text style={styles.successSub}>Taking you to the job portal…</Text>
            </View>
          ) : (
            <>
              <Text style={styles.cardTitle}>{tab === "login" ? "Welcome Back" : "Create Account"}</Text>

              <View style={styles.roleRow}>
                {ROLES.map((r) => (
                  <TouchableOpacity
                    key={r.id}
                    style={[styles.roleCard, role === r.id && styles.roleCardActive]}
                    onPress={() => setRole(r.id)}
                    activeOpacity={0.8}
                  >
                    <View style={[styles.roleIcon, role === r.id && styles.roleIconActive]}>
                      <Feather name={r.icon as any} size={20} color={role === r.id ? "white" : "#EA580C"} />
                    </View>
                    <Text style={[styles.roleLabel, role === r.id && styles.roleLabelActive]}>{r.label}</Text>
                    <Text style={[styles.roleSub, role === r.id && { color: "rgba(255,255,255,0.75)" }]}>{r.sub}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View style={styles.tabRow}>
                {(["login", "register"] as AuthTab[]).map((t) => (
                  <TouchableOpacity key={t} style={[styles.tabItem, tab === t && styles.tabActive]} onPress={() => switchTab(t)}>
                    <Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                      {t === "login" ? "Login" : "Register"}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {step === "form" && (
                <>
                  {tab === "register" && (
                    <View style={styles.inputWrap}>
                      <Text style={styles.inputLabel}>Full Name</Text>
                      <TextInput
                        style={styles.input}
                        value={name}
                        onChangeText={setName}
                        placeholder="e.g. Ramesh Patil"
                        placeholderTextColor="#CBD5E1"
                        autoCapitalize="words"
                      />
                    </View>
                  )}

                  {tab === "register" && role === "employer" && (
                    <View style={styles.inputWrap}>
                      <Text style={styles.inputLabel}>Company Name</Text>
                      <TextInput
                        style={styles.input}
                        value={company}
                        onChangeText={setCompany}
                        placeholder="e.g. XYZ Manufacturing Pvt Ltd"
                        placeholderTextColor="#CBD5E1"
                        autoCapitalize="words"
                      />
                    </View>
                  )}

                  {tab === "register" && role === "seeker" && (
                    <View style={styles.inputWrap}>
                      <Text style={styles.inputLabel}>Skills (optional)</Text>
                      <TextInput
                        style={styles.input}
                        value={skills}
                        onChangeText={setSkills}
                        placeholder="e.g. Welding, MS Office, Driving"
                        placeholderTextColor="#CBD5E1"
                      />
                    </View>
                  )}

                  <View style={styles.inputWrap}>
                    <Text style={styles.inputLabel}>Mobile Number</Text>
                    <View style={styles.phoneRow}>
                      <View style={styles.phoneCode}><Text style={styles.phoneCodeText}>+91</Text></View>
                      <TextInput
                        style={[styles.input, { flex: 1, marginBottom: 0 }]}
                        value={phone}
                        onChangeText={(t) => setPhone(t.replace(/\D/g, "").slice(0, 10))}
                        placeholder="XXXXX XXXXX"
                        placeholderTextColor="#CBD5E1"
                        keyboardType="phone-pad"
                        maxLength={10}
                      />
                    </View>
                  </View>

                  {!!error && <Text style={styles.error}>{error}</Text>}

                  <TouchableOpacity style={styles.btn} onPress={handleSendOtp} activeOpacity={0.85}>
                    <LinearGradient colors={["#C2410C", "#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btnGrad}>
                      <Text style={styles.btnText}>Send OTP</Text>
                      <Feather name="arrow-right" size={18} color="white" />
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}

              {step === "otp" && (
                <>
                  <Text style={styles.otpHint}>Enter the 4-digit OTP sent to +91 {phone}</Text>
                  <View style={styles.otpRow}>
                    {otp.map((d, i) => (
                      <TextInput
                        key={i}
                        ref={otpRefs[i]}
                        style={[styles.otpBox, d && styles.otpBoxFilled]}
                        value={d}
                        onChangeText={(v) => setOtpDigit(i, v.replace(/\D/g, "").slice(-1))}
                        keyboardType="number-pad"
                        maxLength={1}
                      />
                    ))}
                  </View>
                  <Text style={styles.otpDemoNote}>Demo: any 4 digits work</Text>

                  {!!error && <Text style={styles.error}>{error}</Text>}

                  <TouchableOpacity style={styles.btn} onPress={handleVerifyOtp} activeOpacity={0.85} disabled={loading}>
                    <LinearGradient colors={["#C2410C", "#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btnGrad}>
                      {loading ? <ActivityIndicator color="white" /> : <>
                        <Text style={styles.btnText}>Verify & Continue</Text>
                        <Feather name="check" size={18} color="white" />
                      </>}
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => { setStep("form"); setOtp(["", "", "", ""]); setError(""); }} style={{ alignSelf: "center", marginTop: 10 }}>
                    <Text style={styles.backLink}>← Change number</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          )}
        </View>

        <View style={styles.backBtn}>
          <TouchableOpacity onPress={() => router.replace("/login" as any)} style={styles.backPill}>
            <Feather name="arrow-left" size={14} color="#EA580C" />
            <Text style={styles.backPillText}>Back to Civic Services</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { alignItems: "center", paddingHorizontal: 24, paddingBottom: 32 },
  headerLogo: { marginBottom: 8 },
  headerLogoImg: { width: 60, height: 60 },
  headerTitle: { fontSize: 24, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
  headerSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 4 },

  card: { backgroundColor: "white", borderRadius: 28, margin: 16, marginTop: -20, padding: 24, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 20, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
  cardTitle: { fontSize: 20, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 18, textAlign: "center" },

  roleRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
  roleCard: { flex: 1, borderRadius: 14, borderWidth: 2, borderColor: "#FED7AA", backgroundColor: "#FFF7ED", padding: 12, alignItems: "center", gap: 6 },
  roleCardActive: { borderColor: "#EA580C", backgroundColor: "#EA580C" },
  roleIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFEDD5", alignItems: "center", justifyContent: "center" },
  roleIconActive: { backgroundColor: "rgba(255,255,255,0.25)" },
  roleLabel: { fontSize: 13, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold" },
  roleLabelActive: { color: "white" },
  roleSub: { fontSize: 10, color: "#92400E", fontFamily: "Inter_400Regular", textAlign: "center" },

  tabRow: { flexDirection: "row", backgroundColor: "#F1F5F9", borderRadius: 12, padding: 3, marginBottom: 20 },
  tabItem: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 10 },
  tabActive: { backgroundColor: "white", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
  tabText: { fontSize: 14, color: "#64748B", fontFamily: "Inter_500Medium" },
  tabTextActive: { color: "#EA580C", fontFamily: "Inter_700Bold" },

  inputWrap: { marginBottom: 14 },
  inputLabel: { fontSize: 12, fontWeight: "600", color: "#475569", fontFamily: "Inter_600SemiBold", marginBottom: 6 },
  input: { backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular" },
  phoneRow: { flexDirection: "row", gap: 8, alignItems: "center" },
  phoneCode: { backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12 },
  phoneCodeText: { fontSize: 15, color: "#0F172A", fontFamily: "Inter_600SemiBold" },

  btn: { borderRadius: 14, overflow: "hidden", marginTop: 6 },
  btnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 15, gap: 8 },
  btnText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },

  otpHint: { fontSize: 13, color: "#64748B", fontFamily: "Inter_400Regular", textAlign: "center", marginBottom: 16 },
  otpRow: { flexDirection: "row", gap: 10, justifyContent: "center", marginBottom: 8 },
  otpBox: { width: 56, height: 60, borderRadius: 14, borderWidth: 2, borderColor: "#E2E8F0", fontSize: 24, fontWeight: "700", color: "#0F172A", backgroundColor: "#F8FAFC", fontFamily: "Inter_700Bold", textAlign: "center", textAlignVertical: "center", paddingVertical: 0, includeFontPadding: false, lineHeight: 60 },
  otpBoxFilled: { borderColor: "#EA580C", backgroundColor: "#FFF7ED" },
  otpDemoNote: { fontSize: 11, color: "#94A3B8", textAlign: "center", marginBottom: 14, fontFamily: "Inter_400Regular" },

  error: { fontSize: 13, color: "#DC2626", fontFamily: "Inter_400Regular", textAlign: "center", marginBottom: 10, backgroundColor: "#FEE2E2", padding: 10, borderRadius: 8 },
  backLink: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_400Regular" },

  successWrap: { alignItems: "center", paddingVertical: 32, gap: 12 },
  successCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#EA580C", alignItems: "center", justifyContent: "center" },
  successTitle: { fontSize: 24, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
  successSub: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular" },

  backBtn: { alignItems: "center", paddingBottom: 32 },
  backPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "white", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1.5, borderColor: "#FED7AA" },
  backPillText: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_600SemiBold" },
});
