"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplaintListScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var expo_router_1 = require("expo-router");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var ComplaintContext_1 = require("@/context/ComplaintContext");
var AuthContext_1 = require("@/context/AuthContext");
var statusMeta = {
    submitted: { title: "New Complaints", subtitle: "All newly submitted complaints", icon: "file-text", color: "#C2410C", bg: "#FFEDD5" },
    assigned: { title: "Assigned Complaints", subtitle: "Complaints assigned to ward team", icon: "user-check", color: "#EA580C", bg: "#FFEDD5" },
    in_progress: { title: "In Progress Complaints", subtitle: "Assigned and active complaints", icon: "tool", color: "#7C3AED", bg: "#EDE9FE" },
    resolved: { title: "Resolved Complaints", subtitle: "Complaints marked as resolved", icon: "check-circle", color: "#059669", bg: "#D1FAE5" },
    rejected: { title: "Rejected Complaints", subtitle: "Complaints that were rejected", icon: "x-circle", color: "#DC2626", bg: "#FEE2E2" },
};
var categoryIcon = {
    roads: "truck",
    water: "droplet",
    electricity: "zap",
    garbage: "trash-2",
    drainage: "git-merge",
    streetlight: "sun",
    encroachment: "alert-triangle",
    other: "more-horizontal",
};
function timeAgo(dateStr) {
    var diff = Date.now() - new Date(dateStr).getTime();
    var hours = Math.floor(diff / 3600000);
    var days = Math.floor(hours / 24);
    if (days > 0)
        return "".concat(days, "d ago");
    if (hours > 0)
        return "".concat(hours, "h ago");
    return "just now";
}
function ComplaintRow(_a) {
    var complaint = _a.complaint;
    var meta = statusMeta[complaint.status];
    return (<react_native_1.TouchableOpacity style={styles.rowCard} activeOpacity={0.9} onPress={function () { return expo_router_1.router.push({ pathname: "/complaint/[id]", params: { id: complaint.id } }); }}>
      <react_native_1.View style={[styles.rowIcon, { backgroundColor: meta.bg }]}>
        <vector_icons_1.Feather name={(categoryIcon[complaint.category] || "file-text")} size={19} color={meta.color}/>
      </react_native_1.View>
      <react_native_1.View style={styles.rowBody}>
        <react_native_1.View style={styles.rowTop}>
          <react_native_1.Text style={styles.rowTitle} numberOfLines={1}>{complaint.title}</react_native_1.Text>
          <react_native_1.View style={[styles.statusPill, { backgroundColor: meta.bg }]}>
            <vector_icons_1.Feather name={meta.icon} size={10} color={meta.color}/>
            <react_native_1.Text style={[styles.statusText, { color: meta.color }]}>{meta.title.replace(" Complaints", "")}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.Text style={styles.rowDesc} numberOfLines={2}>{complaint.description}</react_native_1.Text>
        <react_native_1.View style={styles.metaRow}>
          <react_native_1.View style={styles.metaChip}>
            <vector_icons_1.Feather name="map-pin" size={10} color="#64748B"/>
            <react_native_1.Text style={styles.metaText} numberOfLines={1}>{complaint.location}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.metaChip}>
            <vector_icons_1.Feather name="home" size={10} color="#64748B"/>
            <react_native_1.Text style={styles.metaText} numberOfLines={1}>{complaint.ward}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.metaChip}>
            <vector_icons_1.Feather name="clock" size={10} color="#64748B"/>
            <react_native_1.Text style={styles.metaText}>{timeAgo(complaint.createdAt)}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={styles.citizenRow}>
          <vector_icons_1.Feather name="user" size={11} color="#EA580C"/>
          <react_native_1.Text style={styles.citizenText}>{complaint.userName || "Citizen"}</react_native_1.Text>
          {!!complaint.userMobile && <react_native_1.Text style={styles.citizenText}>· {complaint.userMobile}</react_native_1.Text>}
        </react_native_1.View>
      </react_native_1.View>
      <vector_icons_1.Feather name="chevron-right" size={18} color="#CBD5E1"/>
    </react_native_1.TouchableOpacity>);
}
function ComplaintListScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 54 : insets.top;
    var params = (0, expo_router_1.useLocalSearchParams)();
    var selectedStatus = params.status && statusMeta[params.status] ? params.status : "submitted";
    var pageMeta = statusMeta[selectedStatus];
    var complaints = (0, ComplaintContext_1.useComplaints)().complaints;
    var user = (0, AuthContext_1.useAuth)().user;
    var wardComplaints = (user === null || user === void 0 ? void 0 : user.ward) ? complaints.filter(function (item) { return item.ward === user.ward; }) : complaints;
    var filtered = wardComplaints
        .filter(function (item) { return selectedStatus === "in_progress" ? item.status === "in_progress" || item.status === "assigned" : item.status === selectedStatus; })
        .sort(function (a, b) { return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(); });
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#166534", "#16A34A", "#22C55E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 10 }]}>
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.TouchableOpacity onPress={function () { return expo_router_1.router.back(); }} style={styles.backBtn} activeOpacity={0.85}>
            <vector_icons_1.Feather name="chevron-left" size={20} color="white"/>
            <react_native_1.Text style={styles.backText}>Back</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.View style={styles.countPill}>
            <react_native_1.Text style={styles.countPillText}>{filtered.length}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={styles.headerTitleRow}>
          <react_native_1.View style={[styles.headerIcon, { backgroundColor: "rgba(255,255,255,0.18)" }]}>
            <vector_icons_1.Feather name={pageMeta.icon} size={24} color="white"/>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={styles.headerTitle}>{pageMeta.title}</react_native_1.Text>
            <react_native_1.Text style={styles.headerSub}>{pageMeta.subtitle}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.FlatList data={filtered} keyExtractor={function (item) { return item.id; }} renderItem={function (_a) {
        var item = _a.item;
        return <ComplaintRow complaint={item}/>;
    }} contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom, 12) + 24 }]} showsVerticalScrollIndicator={false} ListEmptyComponent={<react_native_1.View style={styles.emptyCard}>
            <vector_icons_1.Feather name={pageMeta.icon} size={38} color="#CBD5E1"/>
            <react_native_1.Text style={styles.emptyTitle}>No {pageMeta.title.toLowerCase()}</react_native_1.Text>
            <react_native_1.Text style={styles.emptySub}>Complaints for this status will appear here.</react_native_1.Text>
          </react_native_1.View>}/>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
    backBtn: { flexDirection: "row", alignItems: "center", gap: 4, paddingVertical: 8, paddingRight: 10 },
    backText: { fontSize: 14, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    countPill: { minWidth: 38, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center", backgroundColor: "white" },
    countPillText: { fontSize: 15, fontWeight: "900", color: "#166534", fontFamily: "Inter_700Bold" },
    headerTitleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    headerIcon: { width: 56, height: 56, borderRadius: 18, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.22)" },
    headerTitle: { fontSize: 22, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.4 },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.78)", fontFamily: "Inter_400Regular", marginTop: 3 },
    listContent: { padding: 14, gap: 10 },
    rowCard: { flexDirection: "row", alignItems: "flex-start", gap: 10, backgroundColor: "white", borderRadius: 18, padding: 12, borderWidth: 1, borderColor: "#E2E8F0", shadowColor: "#166534", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 },
    rowIcon: { width: 48, height: 48, borderRadius: 15, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    rowBody: { flex: 1 },
    rowTop: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 5 },
    rowTitle: { flex: 1, fontSize: 14, fontWeight: "900", color: "#0F172A", fontFamily: "Inter_700Bold" },
    statusPill: { flexDirection: "row", alignItems: "center", gap: 4, borderRadius: 20, paddingHorizontal: 7, paddingVertical: 3, flexShrink: 0 },
    statusText: { fontSize: 9, fontWeight: "900", fontFamily: "Inter_700Bold" },
    rowDesc: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", lineHeight: 17 },
    metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
    metaChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#F8FAFC", borderRadius: 10, paddingHorizontal: 7, paddingVertical: 4, maxWidth: "100%" },
    metaText: { fontSize: 10, color: "#64748B", fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    citizenRow: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 },
    citizenText: { fontSize: 11, color: "#475569", fontFamily: "Inter_600SemiBold", fontWeight: "600" },
    emptyCard: { alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 20, padding: 28, borderWidth: 1.5, borderStyle: "dashed", borderColor: "#CBD5E1", marginTop: 20 },
    emptyTitle: { fontSize: 15, fontWeight: "900", color: "#475569", fontFamily: "Inter_700Bold", marginTop: 10 },
    emptySub: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 4, textAlign: "center" },
});
