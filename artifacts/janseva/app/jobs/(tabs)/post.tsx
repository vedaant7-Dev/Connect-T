import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity,
  TextInput, Platform, Alert, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useJobsAuth } from "@/context/JobsAuthContext";
import { useJobs, categoryConfig, typeConfig, JobCategory, JobType } from "@/context/JobsContext";
import { useRouter } from "expo-router";

const categories = Object.entries(categoryConfig).map(([id, cfg]) => ({ id: id as JobCategory, ...cfg }));
const types = Object.entries(typeConfig).map(([id, cfg]) => ({ id: id as JobType, ...cfg }));

export default function PostJobScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const { jobsUser } = useJobsAuth();
  const { addJob } = useJobs();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<JobCategory>("manufacturing");
  const [type, setType] = useState<JobType>("full-time");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("Ambernath");
  const [openings, setOpenings] = useState("1");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!jobsUser || jobsUser.role !== "employer") {
    return (
      <View style={styles.restricted}>
        <Feather name="lock" size={44} color="#CBD5E1" />
        <Text style={styles.restrictedTitle}>Employers Only</Text>
        <Text style={styles.restrictedSub}>Only employer accounts can post jobs.</Text>
      </View>
    );
  }

  const handleSubmit = async () => {
    if (!title.trim()) { Alert.alert("Enter job title"); return; }
    if (!salary.trim()) { Alert.alert("Enter salary range"); return; }
    if (!description.trim()) { Alert.alert("Enter job description"); return; }
    if (!requirements.trim()) { Alert.alert("Enter requirements"); return; }

    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    addJob({
      employerId: jobsUser.id,
      employerName: jobsUser.name,
      company: jobsUser.company || jobsUser.name,
      title: title.trim(),
      category,
      type,
      salary: salary.trim(),
      location: location.trim(),
      openings: parseInt(openings) || 1,
      description: description.trim(),
      requirements: requirements.trim(),
    });
    setSubmitting(false);
    Alert.alert("Job Posted!", "Your job listing is now live.", [
      { text: "View Jobs", onPress: () => router.replace("/jobs/(tabs)" as any) },
    ]);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: topPad + 12 }]}
      >
        <Text style={styles.headerTitle}>Post a Job</Text>
        <Text style={styles.headerSub}>Fill in the details to attract candidates</Text>
      </LinearGradient>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.form, { paddingBottom: Math.max(insets.bottom, 8) + 80 }]} showsVerticalScrollIndicator={false}>

        <View style={styles.field}>
          <Text style={styles.label}>Job Title *</Text>
          <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Factory Operator, Sales Executive" placeholderTextColor="#CBD5E1" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Job Category *</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingBottom: 4 }}>
            {categories.map((c) => (
              <TouchableOpacity
                key={c.id}
                style={[styles.chip, category === c.id && { backgroundColor: "#EA580C" }]}
                onPress={() => setCategory(c.id)}
                activeOpacity={0.8}
              >
                <Feather name={c.icon as any} size={13} color={category === c.id ? "white" : c.color} />
                <Text style={[styles.chipText, category === c.id && { color: "white" }]}>{c.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Job Type *</Text>
          <View style={styles.typeRow}>
            {types.map((t) => (
              <TouchableOpacity
                key={t.id}
                style={[styles.typeChip, type === t.id && { backgroundColor: "#EA580C", borderColor: "#EA580C" }]}
                onPress={() => setType(t.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.typeChipText, type === t.id && { color: "white" }]}>{t.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.row}>
          <View style={[styles.field, { flex: 1 }]}>
            <Text style={styles.label}>Salary *</Text>
            <TextInput style={styles.input} value={salary} onChangeText={setSalary} placeholder="e.g. ₹12,000–₹18,000/mo" placeholderTextColor="#CBD5E1" />
          </View>
          <View style={[styles.field, { width: 90 }]}>
            <Text style={styles.label}>Openings</Text>
            <TextInput style={styles.input} value={openings} onChangeText={(v) => setOpenings(v.replace(/\D/g, ""))} placeholder="1" placeholderTextColor="#CBD5E1" keyboardType="number-pad" maxLength={2} />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Location *</Text>
          <TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="e.g. MIDC Ambernath" placeholderTextColor="#CBD5E1" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Job Description *</Text>
          <TextInput style={[styles.input, styles.textarea]} value={description} onChangeText={setDescription} placeholder="Describe the job role and responsibilities…" placeholderTextColor="#CBD5E1" multiline numberOfLines={4} textAlignVertical="top" />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Requirements *</Text>
          <TextInput style={[styles.input, styles.textarea]} value={requirements} onChangeText={setRequirements} placeholder="Qualifications, experience, skills needed…" placeholderTextColor="#CBD5E1" multiline numberOfLines={3} textAlignVertical="top" />
        </View>

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85} disabled={submitting}>
          <LinearGradient colors={["#C2410C", "#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitGrad}>
            {submitting ? <ActivityIndicator color="white" /> : (
              <><Feather name="upload" size={18} color="white" /><Text style={styles.submitText}>Post Job</Text></>
            )}
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#FFF7ED" },
  header: { paddingHorizontal: 16, paddingBottom: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
  headerSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 4 },
  form: { padding: 16, gap: 4 },
  field: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#475569", fontFamily: "Inter_600SemiBold", marginBottom: 8 },
  input: { backgroundColor: "white", borderWidth: 1.5, borderColor: "#FED7AA", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular" },
  textarea: { minHeight: 90, paddingTop: 12 },
  row: { flexDirection: "row", gap: 10 },
  chip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20, backgroundColor: "#FFF7ED", borderWidth: 1.5, borderColor: "#FED7AA" },
  chipText: { fontSize: 12, fontFamily: "Inter_500Medium", color: "#92400E" },
  typeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  typeChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: "#FED7AA", backgroundColor: "white" },
  typeChipText: { fontSize: 13, fontFamily: "Inter_500Medium", color: "#92400E" },
  submitBtn: { borderRadius: 14, overflow: "hidden", marginTop: 8 },
  submitGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 15, gap: 10 },
  submitText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
  restricted: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#FFF7ED" },
  restrictedTitle: { fontSize: 20, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
  restrictedSub: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular" },
});
