"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplaintsScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var ComplaintContext_1 = require("@/context/ComplaintContext");
var DecorativeCircles_1 = require("@/components/DecorativeCircles");
var TopShade_1 = require("@/components/TopShade");
var LanguageContext_1 = require("@/context/LanguageContext");
var TabBarVisibilityContext_1 = require("@/context/TabBarVisibilityContext");
var statusLabelKeys = {
    submitted: "submitted",
    assigned: "assigned",
    in_progress: "inProgress",
    resolved: "resolved",
    rejected: "rejected",
};
var statusConfig = {
    submitted: { color: "#D97706", bg: "#FEF3C7", icon: "clock" },
    assigned: { color: "#EA580C", bg: "#FFEDD5", icon: "user-check" },
    in_progress: { color: "#7C3AED", bg: "#EDE9FE", icon: "tool" },
    resolved: { color: "#059669", bg: "#D1FAE5", icon: "check-circle" },
    rejected: { color: "#DC2626", bg: "#FEE2E2", icon: "x-circle" },
};
var categoryLabelKeys = {
    roads: "roads",
    water: "water",
    electricity: "electricity",
    garbage: "garbage",
    drainage: "drainage",
    streetlight: "streetLight",
    encroachment: "encroachment",
    other: "other",
};
var categoryConfig = {
    roads: { icon: "truck", color: "#92400E" },
    water: { icon: "droplet", color: "#0369A1" },
    electricity: { icon: "zap", color: "#D97706" },
    garbage: { icon: "trash-2", color: "#059669" },
    drainage: { icon: "git-merge", color: "#0EA5E9" },
    streetlight: { icon: "sun", color: "#7C3AED" },
    encroachment: { icon: "alert-triangle", color: "#DC2626" },
    other: { icon: "more-horizontal", color: "#475569" },
};
function timeAgo(dateStr) {
    var diff = Date.now() - new Date(dateStr).getTime();
    var mins = Math.floor(diff / 60000);
    var hours = Math.floor(mins / 60);
    var days = Math.floor(hours / 24);
    if (days > 0)
        return "".concat(days, "d ago");
    if (hours > 0)
        return "".concat(hours, "h ago");
    return "".concat(mins, "m ago");
}
function ComplaintCard(_a) {
    var complaint = _a.complaint, onPress = _a.onPress;
    var t = (0, LanguageContext_1.useLanguage)().t;
    var st = statusConfig[complaint.status];
    var cat = categoryConfig[complaint.category] || categoryConfig.other;
    return (<react_native_1.TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.card}>
      <react_native_1.View style={styles.cardTop}>
        <react_native_1.View style={[styles.catIcon, { backgroundColor: cat.color + "18" }]}>
          <vector_icons_1.Feather name={cat.icon} size={18} color={cat.color}/>
        </react_native_1.View>
        <react_native_1.View style={styles.cardInfo}>
          <react_native_1.View style={styles.cardTitleRow}>
            <react_native_1.Text style={styles.cardTitle} numberOfLines={1}>{complaint.title}</react_native_1.Text>
            <react_native_1.View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
              <vector_icons_1.Feather name={st.icon} size={9} color={st.color}/>
              <react_native_1.Text style={[styles.statusText, { color: st.color }]}>{t(statusLabelKeys[complaint.status])}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.Text style={styles.cardDesc} numberOfLines={2}>{complaint.description}</react_native_1.Text>
          <react_native_1.View style={styles.cardMeta}>
            <react_native_1.View style={styles.metaItem}>
              <vector_icons_1.Feather name="map-pin" size={10} color="#94A3B8"/>
              <react_native_1.Text style={styles.metaText} numberOfLines={1}>{complaint.location}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Text style={styles.metaDot}>·</react_native_1.Text>
            <react_native_1.Text style={styles.metaTime}>{timeAgo(complaint.createdAt)}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={styles.cardFooter}>
        <react_native_1.Text style={styles.cmpId}># {complaint.id}</react_native_1.Text>
        <react_native_1.View style={styles.timelineBar}>
          {["submitted", "assigned", "in_progress", "resolved"].map(function (s, i) {
            var steps = ["submitted", "assigned", "in_progress", "resolved"];
            var currentIdx = steps.indexOf(complaint.status);
            var filled = i <= currentIdx && complaint.status !== "rejected";
            return (<react_native_1.View key={s} style={[styles.timelineStep, {
                        backgroundColor: filled ? statusConfig[s].color : "#E2E8F0",
                        flex: i < 3 ? 1 : 0,
                        width: i === 3 ? 20 : undefined,
                        height: i === 3 ? 20 : 4,
                        borderRadius: i === 3 ? 10 : 2,
                        alignItems: "center",
                        justifyContent: "center",
                    }]}>
                {i === 3 && <vector_icons_1.Feather name="check" size={10} color={filled ? "white" : "#CBD5E1"}/>}
              </react_native_1.View>);
        })}
        </react_native_1.View>
        <vector_icons_1.Feather name="chevron-right" size={14} color="#CBD5E1"/>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
}
function ComplaintsScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var router = (0, expo_router_1.useRouter)();
    var complaints = (0, ComplaintContext_1.useComplaints)().complaints;
    var t = (0, LanguageContext_1.useLanguage)().t;
    var handleScroll = (0, TabBarVisibilityContext_1.useTabBarVisibility)().handleScroll;
    var _a = (0, react_1.useState)("all"), filter = _a[0], setFilter = _a[1];
    var filterTabs = [
        { id: "all", label: t("complaints"), icon: "file-text", color: "#92400E" },
        { id: "resolved", label: t("resolved"), icon: "check-circle", color: "#059669" },
        { id: "in_progress", label: t("inProgress"), icon: "tool", color: "#7C3AED" },
        { id: "rejected", label: t("rejected"), icon: "x-circle", color: "#DC2626" },
    ];
    var filtered = filter === "all"
        ? complaints
        : complaints.filter(function (c) {
            if (filter === "in_progress")
                return c.status === "in_progress" || c.status === "assigned";
            if (filter === "rejected")
                return c.status === "rejected";
            return c.status === filter;
        });
    var counts = {
        all: complaints.length,
        submitted: complaints.filter(function (c) { return c.status === "submitted"; }).length,
        in_progress: complaints.filter(function (c) { return c.status === "in_progress" || c.status === "assigned"; }).length,
        resolved: complaints.filter(function (c) { return c.status === "resolved"; }).length,
        rejected: complaints.filter(function (c) { return c.status === "rejected"; }).length,
    };
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12, overflow: "hidden" }]}>
        <TopShade_1.default height={100}/>
        <DecorativeCircles_1.default />
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.View>
            <react_native_1.Text style={styles.headerTitle}>{t("myComplaints")}</react_native_1.Text>
            <react_native_1.Text style={styles.headerSub}>{complaints.length} {t("total")}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.TouchableOpacity style={styles.newBtn} onPress={function () { return router.push("/complaint/new"); }} activeOpacity={0.85}>
            <vector_icons_1.Feather name="plus" size={16} color="white"/>
            <react_native_1.Text style={styles.newBtnText}>{t("new")}</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>

        <react_native_1.View style={styles.filterRow}>
          {filterTabs.map(function (tab) {
            var isActive = filter === tab.id;
            var count = counts[tab.id];
            return (<react_native_1.TouchableOpacity key={tab.id} onPress={function () { return setFilter(tab.id); }} style={[styles.filterChip, isActive && styles.filterChipActive]} activeOpacity={0.8}>
                <react_native_1.View style={[styles.filterChipIcon, isActive && { backgroundColor: tab.color + "12" }]}>
                  <vector_icons_1.Feather name={tab.icon} size={16} color={isActive ? tab.color : "rgba(255,255,255,0.55)"}/>
                </react_native_1.View>
                <react_native_1.Text style={[styles.filterChipCount, isActive && styles.filterChipCountActive]}>
                  {count !== null && count !== void 0 ? count : 0}
                </react_native_1.Text>
                <react_native_1.Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {tab.label}
                </react_native_1.Text>
              </react_native_1.TouchableOpacity>);
        })}
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.FlatList data={filtered} keyExtractor={function (c) { return c.id; }} renderItem={function (_a) {
            var item = _a.item;
            return (<ComplaintCard complaint={item} onPress={function () { return router.push({ pathname: "/complaint/[id]", params: { id: item.id } }); }}/>);
        }} contentContainerStyle={[styles.list, { paddingBottom: Math.max(insets.bottom, 8) + 80 }]} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16} ListEmptyComponent={<react_native_1.View style={styles.empty}>
            <vector_icons_1.Feather name="inbox" size={40} color="#CBD5E1"/>
            <react_native_1.Text style={styles.emptyTitle}>{t("noComplaintsYet")}</react_native_1.Text>
            <react_native_1.Text style={styles.emptySub}>{t("tapNewToRaise")}</react_native_1.Text>
          </react_native_1.View>}/>

    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 14, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    backBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center", marginBottom: 8 },
    headerRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: 14,
    },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "#FFFFFF", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular", marginTop: 2 },
    newBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "rgba(255,255,255,0.2)",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",
    },
    newBtnText: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    filterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        paddingBottom: 4,
    },
    filterChip: {
        width: "23%",
        aspectRatio: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        paddingHorizontal: 6,
        paddingVertical: 8,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.12)",
        borderWidth: 1.5,
        borderColor: "rgba(255,255,255,0.18)",
    },
    filterChipActive: {
        backgroundColor: "white",
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 4,
    },
    filterChipIcon: {
        width: 28,
        height: 28,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(255,255,255,0.12)",
    },
    filterChipCount: { fontSize: 20, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold", lineHeight: 24 },
    filterChipCountActive: { color: "#111827" },
    filterChipText: { fontSize: 12, fontWeight: "700", color: "rgba(255,255,255,0.85)", fontFamily: "Inter_600SemiBold", textAlign: "center", lineHeight: 15 },
    filterChipTextActive: { color: "#C2410C" },
    filterChipBadge: {
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 10,
        minWidth: 18,
        height: 18,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 4,
    },
    filterChipBadgeActive: { backgroundColor: "#EA580C" },
    filterChipBadgeText: { fontSize: 12, fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "Inter_700Bold" },
    filterChipBadgeTextActive: { color: "white" },
    list: { padding: 14 },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginBottom: 10,
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
        overflow: "hidden",
    },
    cardTop: { flexDirection: "row", gap: 10, padding: 14, alignItems: "flex-start" },
    catIcon: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    cardInfo: { flex: 1 },
    cardTitleRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", gap: 6, marginBottom: 4 },
    cardTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold", flex: 1 },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingHorizontal: 7,
        paddingVertical: 3,
        borderRadius: 20,
        flexShrink: 0,
    },
    statusText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    cardDesc: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", lineHeight: 17, marginBottom: 6 },
    cardMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
    metaItem: { flexDirection: "row", alignItems: "center", gap: 3, flex: 1 },
    metaText: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", flex: 1 },
    metaDot: { fontSize: 10, color: "#CBD5E1" },
    metaTime: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    cardFooter: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 14,
        paddingBottom: 12,
    },
    cmpId: { fontSize: 10, fontWeight: "700", color: "#94A3B8", fontFamily: "Inter_600SemiBold" },
    timelineBar: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
    },
    timelineStep: {},
    empty: { alignItems: "center", paddingTop: 60, gap: 8 },
    emptyTitle: { fontSize: 16, fontWeight: "700", color: "#334155", fontFamily: "Inter_700Bold" },
    emptySub: { fontSize: 13, color: "#94A3B8", fontFamily: "Inter_400Regular" },
});
