import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Modal,
  TextInput,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Haptics from "expo-haptics";
import { useComplaints, Complaint, ComplaintStatus } from "@/context/ComplaintContext";

const statusConfig: Record<ComplaintStatus, { label: string; color: string; bg: string; icon: string }> = {
  submitted: { label: "Submitted", color: "#D97706", bg: "#FEF3C7", icon: "clock" },
  assigned: { label: "Assigned", color: "#2563EB", bg: "#DBEAFE", icon: "user-check" },
  in_progress: { label: "In Progress", color: "#7C3AED", bg: "#EDE9FE", icon: "tool" },
  resolved: { label: "Resolved", color: "#059669", bg: "#D1FAE5", icon: "check-circle" },
  rejected: { label: "Rejected", color: "#DC2626", bg: "#FEE2E2", icon: "x-circle" },
};

const categoryConfig: Record<string, { label: string; icon: string; color: string }> = {
  roads: { label: "Roads", icon: "truck", color: "#92400E" },
  water: { label: "Water", icon: "droplet", color: "#0369A1" },
  electricity: { label: "Electricity", icon: "zap", color: "#D97706" },
  garbage: { label: "Garbage", icon: "trash-2", color: "#059669" },
  drainage: { label: "Drainage", icon: "git-merge", color: "#0EA5E9" },
  streetlight: { label: "Street Light", icon: "sun", color: "#7C3AED" },
  encroachment: { label: "Encroachment", icon: "alert-triangle", color: "#DC2626" },
  other: { label: "Other", icon: "more-horizontal", color: "#475569" },
};

const nextStatusOptions: Record<ComplaintStatus, { status: ComplaintStatus; label: string; color: string }[]> = {
  submitted: [
    { status: "assigned", label: "Assign to Team", color: "#2563EB" },
    { status: "rejected", label: "Reject", color: "#DC2626" },
  ],
  assigned: [
    { status: "in_progress", label: "Mark In Progress", color: "#7C3AED" },
    { status: "rejected", label: "Reject", color: "#DC2626" },
  ],
  in_progress: [
    { status: "resolved", label: "Mark Resolved", color: "#059669" },
    { status: "rejected", label: "Reject", color: "#DC2626" },
  ],
  resolved: [],
  rejected: [],
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(mins / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  return `${mins}m ago`;
}

interface ActionModalProps {
  complaint: Complaint;
  onClose: () => void;
  onUpdate: (status: ComplaintStatus, note: string) => void;
}

function ActionModal({ complaint, onClose, onUpdate }: ActionModalProps) {
  const [note, setNote] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<ComplaintStatus | null>(null);
  const options = nextStatusOptions[complaint.status] || [];

  return (
    <View style={modalStyles.overlay}>
      <View style={modalStyles.sheet}>
        <View style={modalStyles.handle} />
        <Text style={modalStyles.title}>Update Complaint</Text>
        <Text style={modalStyles.cmpId}># {complaint.id}</Text>
        <Text style={modalStyles.cmpName} numberOfLines={2}>{complaint.title}</Text>

        <Text style={modalStyles.label}>Select Action</Text>
        <View style={modalStyles.optionRow}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.status}
              style={[
                modalStyles.optionBtn,
                { borderColor: opt.color + "40" },
                selectedStatus === opt.status && { backgroundColor: opt.color, borderColor: opt.color },
              ]}
              onPress={() => setSelectedStatus(opt.status)}
              activeOpacity={0.8}
            >
              <Feather
                name={statusConfig[opt.status].icon as any}
                size={14}
                color={selectedStatus === opt.status ? "white" : opt.color}
              />
              <Text style={[
                modalStyles.optionText,
                { color: selectedStatus === opt.status ? "white" : opt.color },
              ]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={modalStyles.label}>Note / Resolution (optional)</Text>
        <TextInput
          style={modalStyles.noteInput}
          value={note}
          onChangeText={setNote}
          placeholder="Add a note for the citizen..."
          placeholderTextColor="#CBD5E1"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
        />

        <View style={modalStyles.btnRow}>
          <TouchableOpacity style={modalStyles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
            <Text style={modalStyles.cancelBtnText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[modalStyles.confirmBtn, !selectedStatus && { opacity: 0.5 }]}
            onPress={() => {
              if (!selectedStatus) return;
              onUpdate(selectedStatus, note);
              onClose();
            }}
            disabled={!selectedStatus}
            activeOpacity={0.85}
          >
            <LinearGradient colors={["#1E40AF", "#2563EB"]} style={modalStyles.confirmBtnGrad}>
              <Text style={modalStyles.confirmBtnText}>Update Status</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

function AdminComplaintCard({ complaint, onAction }: { complaint: Complaint; onAction: () => void }) {
  const st = statusConfig[complaint.status];
  const cat = categoryConfig[complaint.category] || categoryConfig.other;
  const hasActions = nextStatusOptions[complaint.status]?.length > 0;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={[styles.catDot, { backgroundColor: cat.color + "20" }]}>
          <Feather name={cat.icon as any} size={14} color={cat.color} />
        </View>
        <View style={styles.cardHeaderText}>
          <Text style={styles.cmpTitle} numberOfLines={1}>{complaint.title}</Text>
          <Text style={styles.cmpMeta}>{cat.label} · {timeAgo(complaint.createdAt)}</Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: st.bg }]}>
          <Text style={[styles.statusPillText, { color: st.color }]}>{st.label}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.metaRow}>
          <Feather name="map-pin" size={11} color="#94A3B8" />
          <Text style={styles.metaText} numberOfLines={1}>{complaint.location}</Text>
        </View>
        <View style={styles.metaRow}>
          <Feather name="tag" size={11} color="#94A3B8" />
          <Text style={styles.metaText}># {complaint.id}</Text>
        </View>
        <Text style={styles.descText} numberOfLines={2}>{complaint.description}</Text>
      </View>

      {hasActions && (
        <TouchableOpacity style={styles.actionBtn} onPress={onAction} activeOpacity={0.85}>
          <LinearGradient colors={["#1E40AF", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.actionBtnGrad}>
            <Feather name="edit-3" size={13} color="white" />
            <Text style={styles.actionBtnText}>Update Status</Text>
          </LinearGradient>
        </TouchableOpacity>
      )}

      {complaint.status === "resolved" && (
        <View style={styles.resolvedBar}>
          <Feather name="check-circle" size={12} color="#059669" />
          <Text style={styles.resolvedBarText}>Resolved · {complaint.resolvedNote || "Issue fixed"}</Text>
        </View>
      )}
    </View>
  );
}

export default function AdminScreen() {
  const insets = useSafeAreaInsets();
  const topPad = Platform.OS === "web" ? 67 : insets.top;
  const bottomPad = Platform.OS === "web" ? 34 : 0;
  const { complaints, updateStatus } = useComplaints();
  const [filterStatus, setFilterStatus] = useState<ComplaintStatus | "all">("all");
  const [activeComplaint, setActiveComplaint] = useState<Complaint | null>(null);

  const filtered = filterStatus === "all"
    ? complaints
    : complaints.filter((c) => c.status === filterStatus);

  const pending = complaints.filter((c) => c.status === "submitted").length;
  const active = complaints.filter((c) => c.status === "assigned" || c.status === "in_progress").length;
  const resolved = complaints.filter((c) => c.status === "resolved").length;

  const handleUpdate = (status: ComplaintStatus, note: string) => {
    if (!activeComplaint) return;
    if (Platform.OS !== "web") {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }
    updateStatus(activeComplaint.id, status, note, "Ward Officer Patil");
    setActiveComplaint(null);
  };

  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#0F172A", "#1E3A8A", "#1E40AF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: topPad + 12 }]}
      >
        <View style={styles.headerTop}>
          <View>
            <View style={styles.adminBadge}>
              <Feather name="shield" size={10} color="#60A5FA" />
              <Text style={styles.adminBadgeText}>WARD OFFICER PANEL</Text>
            </View>
            <Text style={styles.headerTitle}>Admin Dashboard</Text>
            <Text style={styles.headerSub}>Ward 14 — Dadar</Text>
          </View>
          <View style={styles.headerStats}>
            <View style={styles.hStat}>
              <Text style={styles.hStatNum}>{pending}</Text>
              <Text style={styles.hStatLabel}>Pending</Text>
            </View>
            <View style={styles.hStatDiv} />
            <View style={styles.hStat}>
              <Text style={styles.hStatNum}>{active}</Text>
              <Text style={styles.hStatLabel}>Active</Text>
            </View>
            <View style={styles.hStatDiv} />
            <View style={styles.hStat}>
              <Text style={styles.hStatNum}>{resolved}</Text>
              <Text style={styles.hStatLabel}>Done</Text>
            </View>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
          {(["all", "submitted", "assigned", "in_progress", "resolved", "rejected"] as const).map((s) => {
            const isActive = filterStatus === s;
            const config = s !== "all" ? statusConfig[s] : null;
            return (
              <TouchableOpacity
                key={s}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => setFilterStatus(s)}
                activeOpacity={0.8}
              >
                {config ? <Feather name={config.icon as any} size={10} color={isActive ? "white" : "rgba(255,255,255,0.6)"} /> : null}
                <Text style={[styles.filterText, isActive && { color: "white" }]}>
                  {s === "all" ? "All" : config?.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </LinearGradient>

      {pending > 0 && (
        <View style={styles.urgentBanner}>
          <Feather name="alert-circle" size={14} color="#DC2626" />
          <Text style={styles.urgentText}>{pending} complaint{pending > 1 ? "s" : ""} need attention</Text>
        </View>
      )}

      <FlatList
        data={filtered}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => (
          <AdminComplaintCard
            complaint={item}
            onAction={() => setActiveComplaint(item)}
          />
        )}
        contentContainerStyle={[styles.list, { paddingBottom: bottomPad + 90 }]}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Feather name="check-circle" size={36} color="#CBD5E1" />
            <Text style={styles.emptyText}>No complaints in this category</Text>
          </View>
        }
      />

      {activeComplaint && (
        <Modal transparent animationType="slide" visible onRequestClose={() => setActiveComplaint(null)}>
          <ActionModal
            complaint={activeComplaint}
            onClose={() => setActiveComplaint(null)}
            onUpdate={handleUpdate}
          />
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#F8FAFC" },
  header: { paddingHorizontal: 20, paddingBottom: 14 },
  headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
  adminBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: "rgba(96,165,250,0.15)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginBottom: 6,
  },
  adminBadgeText: { fontSize: 9, fontWeight: "700", color: "#60A5FA", letterSpacing: 1, fontFamily: "Inter_600SemiBold" },
  headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
  headerSub: { fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular", marginTop: 2 },
  headerStats: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 14,
    padding: 10,
    alignItems: "center",
  },
  hStat: { alignItems: "center", paddingHorizontal: 10 },
  hStatNum: { fontSize: 20, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
  hStatLabel: { fontSize: 9, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular", marginTop: 1 },
  hStatDiv: { width: 1, height: 24, backgroundColor: "rgba(255,255,255,0.2)" },
  filterRow: { gap: 8, paddingRight: 4, paddingBottom: 4 },
  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  filterChipActive: { backgroundColor: "rgba(255,255,255,0.25)" },
  filterText: { fontSize: 11, fontWeight: "700", color: "rgba(255,255,255,0.6)", fontFamily: "Inter_600SemiBold" },
  urgentBanner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FECACA",
  },
  urgentText: { fontSize: 12, fontWeight: "700", color: "#DC2626", fontFamily: "Inter_600SemiBold" },
  list: { padding: 14 },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    marginBottom: 10,
    overflow: "hidden",
    shadowColor: "#1E40AF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14, paddingBottom: 10 },
  catDot: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", flexShrink: 0 },
  cardHeaderText: { flex: 1 },
  cmpTitle: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
  cmpMeta: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 1 },
  statusPill: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20, flexShrink: 0 },
  statusPillText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
  cardBody: { paddingHorizontal: 14, paddingBottom: 10, gap: 4 },
  metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
  metaText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", flex: 1 },
  descText: { fontSize: 12, color: "#475569", fontFamily: "Inter_400Regular", lineHeight: 17, marginTop: 4 },
  actionBtn: {
    marginHorizontal: 14,
    marginBottom: 14,
    borderRadius: 12,
    overflow: "hidden",
  },
  actionBtnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10 },
  actionBtnText: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
  resolvedBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#D1FAE5",
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  resolvedBarText: { fontSize: 11, color: "#065F46", fontFamily: "Inter_400Regular", flex: 1 },
  empty: { alignItems: "center", paddingTop: 60, gap: 10 },
  emptyText: { fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular" },
});

const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 40,
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: "#E2E8F0",
    borderRadius: 2,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: { fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 4 },
  cmpId: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginBottom: 2 },
  cmpName: { fontSize: 13, color: "#475569", fontFamily: "Inter_400Regular", marginBottom: 16, lineHeight: 18 },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: "#94A3B8",
    letterSpacing: 1,
    fontFamily: "Inter_600SemiBold",
    marginBottom: 8,
  },
  optionRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
  optionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1.5,
    backgroundColor: "white",
  },
  optionText: { fontSize: 12, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
  noteInput: {
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 13,
    color: "#0F172A",
    fontFamily: "Inter_400Regular",
    height: 90,
    marginBottom: 16,
  },
  btnRow: { flexDirection: "row", gap: 10 },
  cancelBtn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#F1F5F9",
  },
  cancelBtnText: { fontSize: 14, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold" },
  confirmBtn: {
    flex: 2,
    borderRadius: 14,
    overflow: "hidden",
  },
  confirmBtnGrad: {
    paddingVertical: 14,
    alignItems: "center",
  },
  confirmBtnText: { fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
