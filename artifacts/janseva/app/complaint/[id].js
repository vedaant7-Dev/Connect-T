"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplaintDetailScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var ComplaintContext_1 = require("@/context/ComplaintContext");
var LanguageContext_1 = require("@/context/LanguageContext");
var AuthContext_1 = require("@/context/AuthContext");
var statusLabelKeys = {
    submitted: "submitted", assigned: "assigned", in_progress: "inProgress",
    resolved: "resolved", rejected: "rejected",
};
var statusConfig = {
    submitted: { color: "#D97706", bg: "#FEF3C7", icon: "clock" },
    assigned: { color: "#EA580C", bg: "#FFEDD5", icon: "user-check" },
    in_progress: { color: "#7C3AED", bg: "#EDE9FE", icon: "tool" },
    resolved: { color: "#059669", bg: "#D1FAE5", icon: "check-circle" },
    rejected: { color: "#DC2626", bg: "#FEE2E2", icon: "x-circle" },
};
var categoryLabelKeys = {
    roads: "roads", water: "waterSupply", electricity: "electricity", garbage: "garbage",
    drainage: "drainage", streetlight: "streetLight", encroachment: "encroachment", other: "other",
};
var categoryConfig = {
    roads: { icon: "truck", color: "#92400E", bg: "#FEF3C7" },
    water: { icon: "droplet", color: "#0369A1", bg: "#BAE6FD" },
    electricity: { icon: "zap", color: "#D97706", bg: "#FEF3C7" },
    garbage: { icon: "trash-2", color: "#059669", bg: "#D1FAE5" },
    drainage: { icon: "git-merge", color: "#0EA5E9", bg: "#FFF7ED" },
    streetlight: { icon: "sun", color: "#7C3AED", bg: "#EDE9FE" },
    encroachment: { icon: "alert-triangle", color: "#DC2626", bg: "#FEE2E2" },
    other: { icon: "more-horizontal", color: "#475569", bg: "#F1F5F9" },
};
var timelineSteps = ["submitted", "assigned", "in_progress", "resolved"];
function formatDate(dateStr) {
    var d = new Date(dateStr);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }) +
        " " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
}
function ComplaintDetailScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var router = (0, expo_router_1.useRouter)();
    var _a = (0, expo_router_1.useLocalSearchParams)(), id = _a.id, fresh = _a.fresh;
    var getComplaintById = (0, ComplaintContext_1.useComplaints)().getComplaintById;
    var t = (0, LanguageContext_1.useLanguage)().t;
    var user = (0, AuthContext_1.useAuth)().user;
    var isNagarsevak = (user === null || user === void 0 ? void 0 : user.role) === "nagarsevak";
    var fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(fresh === "1" ? 0 : 1)).current;
    (0, react_1.useEffect)(function () {
        if (fresh === "1") {
            react_native_1.Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
        }
    }, []);
    var complaint = getComplaintById(id);
    if (!complaint) {
        return (<react_native_1.View style={[styles.root, { alignItems: "center", justifyContent: "center" }]}>
        <react_native_1.Text style={{ color: "#64748B" }}>{t("complaintNotFound")}</react_native_1.Text>
      </react_native_1.View>);
    }
    var st = statusConfig[complaint.status];
    var cat = categoryConfig[complaint.category] || categoryConfig.other;
    var currentStepIdx = complaint.status === "rejected" ? -1 : timelineSteps.indexOf(complaint.status);
    return (<react_native_1.Animated.View style={[styles.root, { opacity: fadeAnim }]}>
      <expo_linear_gradient_1.LinearGradient colors={fresh === "1" ? ["#166534", "#16A34A", "#22C55E"] : ["#C2410C", "#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={styles.backBtn} activeOpacity={0.8}>
          <vector_icons_1.Feather name="chevron-left" size={20} color="white"/>
          <react_native_1.Text style={styles.backBtnText}>Back</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.View style={styles.headerCenter}>
            {fresh === "1" && (<react_native_1.View style={styles.successPill}>
                <vector_icons_1.Feather name="check-circle" size={12} color="#6EE7B7"/>
                <react_native_1.Text style={styles.successPillText}>{t("complaintRegistered")}</react_native_1.Text>
              </react_native_1.View>)}
            <react_native_1.Text style={styles.headerTitle} numberOfLines={2}>{complaint.title}</react_native_1.Text>
            <react_native_1.Text style={styles.headerSub}># {complaint.id}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={[styles.statusBadge, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
            <vector_icons_1.Feather name={st.icon} size={12} color="white"/>
            <react_native_1.Text style={styles.statusBadgeText}>{t(statusLabelKeys[complaint.status])}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 8) + 40 }]} showsVerticalScrollIndicator={false}>
        {/* Photo */}
        {complaint.photoUri ? (<react_native_1.View style={styles.photoCard}>
            <react_native_1.Image source={{ uri: complaint.photoUri }} style={styles.photo}/>
            <react_native_1.View style={styles.photoLabel}>
              <vector_icons_1.Feather name="camera" size={12} color="#64748B"/>
              <react_native_1.Text style={styles.photoLabelText}>{t("problemPhoto")}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>) : null}

        {isNagarsevak && complaint.userName && (<react_native_1.View style={styles.complainantCard}>
            <react_native_1.Text style={styles.detailSectionTitle}>{t("complainantProfile")}</react_native_1.Text>
            <react_native_1.View style={styles.complainantHeader}>
              <react_native_1.View style={styles.complainantAvatar}>
                <react_native_1.Text style={styles.complainantAvatarText}>{complaint.userName.charAt(0).toUpperCase()}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={{ flex: 1 }}>
                <react_native_1.Text style={styles.complainantName}>{complaint.userName}</react_native_1.Text>
                <react_native_1.Text style={styles.complainantRole}>{t("citizen")}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={styles.complainantDivider}/>
            <react_native_1.View style={styles.complainantDetails}>
              {complaint.userMobile ? (<react_native_1.View style={styles.complainantRow}>
                  <react_native_1.View style={[styles.complainantIcon, { backgroundColor: "#FFEDD5" }]}>
                    <vector_icons_1.Feather name="phone" size={13} color="#EA580C"/>
                  </react_native_1.View>
                  <react_native_1.View style={{ flex: 1 }}>
                    <react_native_1.Text style={styles.complainantLabel}>{t("phone")}</react_native_1.Text>
                    <react_native_1.Text style={styles.complainantValue}>+91 {complaint.userMobile}</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>) : null}
              {complaint.userEmail ? (<react_native_1.View style={styles.complainantRow}>
                  <react_native_1.View style={[styles.complainantIcon, { backgroundColor: "#FCE7F3" }]}>
                    <vector_icons_1.Feather name="mail" size={13} color="#DB2777"/>
                  </react_native_1.View>
                  <react_native_1.View style={{ flex: 1 }}>
                    <react_native_1.Text style={styles.complainantLabel}>{t("email")}</react_native_1.Text>
                    <react_native_1.Text style={styles.complainantValue}>{complaint.userEmail}</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>) : null}
              <react_native_1.View style={styles.complainantRow}>
                <react_native_1.View style={[styles.complainantIcon, { backgroundColor: "#D1FAE5" }]}>
                  <vector_icons_1.Feather name="map-pin" size={13} color="#059669"/>
                </react_native_1.View>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={styles.complainantLabel}>{t("ward")}</react_native_1.Text>
                  <react_native_1.Text style={styles.complainantValue}>{complaint.ward}</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>
              {complaint.userAddress ? (<react_native_1.View style={styles.complainantRow}>
                  <react_native_1.View style={[styles.complainantIcon, { backgroundColor: "#FEF3C7" }]}>
                    <vector_icons_1.Feather name="home" size={13} color="#D97706"/>
                  </react_native_1.View>
                  <react_native_1.View style={{ flex: 1 }}>
                    <react_native_1.Text style={styles.complainantLabel}>{t("address")}</react_native_1.Text>
                    <react_native_1.Text style={styles.complainantValue}>{complaint.userAddress}</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>) : null}
              {complaint.userAge ? (<react_native_1.View style={styles.complainantRow}>
                  <react_native_1.View style={[styles.complainantIcon, { backgroundColor: "#EDE9FE" }]}>
                    <vector_icons_1.Feather name="calendar" size={13} color="#7C3AED"/>
                  </react_native_1.View>
                  <react_native_1.View style={{ flex: 1 }}>
                    <react_native_1.Text style={styles.complainantLabel}>{t("age")}</react_native_1.Text>
                    <react_native_1.Text style={styles.complainantValue}>{complaint.userAge} years</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>) : null}
            </react_native_1.View>
          </react_native_1.View>)}

        {/* Status tracker */}
        <react_native_1.View style={styles.trackerCard}>
          <react_native_1.Text style={styles.trackerTitle}>{t("complaintStatus")}</react_native_1.Text>
          <react_native_1.View style={styles.trackerSteps}>
            {timelineSteps.map(function (step, idx) {
            var done = idx < currentStepIdx;
            var active = idx === currentStepIdx;
            var sConfig = statusConfig[step];
            return (<react_1.default.Fragment key={step}>
                  <react_native_1.View style={styles.trackerItem}>
                    <react_native_1.View style={[
                    styles.trackerDot,
                    done && { backgroundColor: "#059669", borderColor: "#059669" },
                    active && { backgroundColor: sConfig.color, borderColor: sConfig.color },
                    !done && !active && { backgroundColor: "white", borderColor: "#E2E8F0" },
                ]}>
                      {done ? (<vector_icons_1.Feather name="check" size={10} color="white"/>) : (<vector_icons_1.Feather name={sConfig.icon} size={10} color={active ? "white" : "#CBD5E1"}/>)}
                    </react_native_1.View>
                    <react_native_1.Text style={[
                    styles.trackerLabel,
                    active && { color: sConfig.color, fontFamily: "Inter_700Bold" },
                    done && { color: "#059669" },
                ]}>
                      {t(statusLabelKeys[step])}
                    </react_native_1.Text>
                  </react_native_1.View>
                  {idx < timelineSteps.length - 1 && (<react_native_1.View style={[
                        styles.trackerLine,
                        { backgroundColor: done ? "#FACC15" : "#E2E8F0" },
                    ]}/>)}
                </react_1.default.Fragment>);
        })}
          </react_native_1.View>
        </react_native_1.View>

        {/* Details */}
        <react_native_1.View style={styles.detailCard}>
          <react_native_1.Text style={styles.detailSectionTitle}>{t("complaintDetails")}</react_native_1.Text>
          <react_native_1.View style={styles.detailRow}>
            <react_native_1.View style={[styles.catIconWrap, { backgroundColor: cat.bg }]}>
              <vector_icons_1.Feather name={cat.icon} size={14} color={cat.color}/>
            </react_native_1.View>
            <react_native_1.View>
              <react_native_1.Text style={styles.detailLabel}>{t("category")}</react_native_1.Text>
              <react_native_1.Text style={styles.detailValue}>{t(categoryLabelKeys[complaint.category] || "other")}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={styles.divider}/>
          <react_native_1.View style={styles.detailRow}>
            <react_native_1.View style={[styles.catIconWrap, { backgroundColor: "#FFF7ED" }]}>
              <vector_icons_1.Feather name="map-pin" size={14} color="#EA580C"/>
            </react_native_1.View>
            <react_native_1.View style={{ flex: 1 }}>
              <react_native_1.Text style={styles.detailLabel}>{t("location")}</react_native_1.Text>
              <react_native_1.Text style={styles.detailValue}>{complaint.location}</react_native_1.Text>
              <react_native_1.Text style={styles.detailSub}>{complaint.ward}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={styles.divider}/>
          <react_native_1.View style={styles.detailRow}>
            <react_native_1.View style={[styles.catIconWrap, { backgroundColor: "#FFF7ED" }]}>
              <vector_icons_1.Feather name="calendar" size={14} color="#EA580C"/>
            </react_native_1.View>
            <react_native_1.View>
              <react_native_1.Text style={styles.detailLabel}>{t("submittedOn")}</react_native_1.Text>
              <react_native_1.Text style={styles.detailValue}>{formatDate(complaint.createdAt)}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={styles.divider}/>
          <react_native_1.View>
            <react_native_1.Text style={styles.detailLabel}>{t("description")}</react_native_1.Text>
            <react_native_1.Text style={[styles.detailValue, { marginTop: 6, lineHeight: 20 }]}>{complaint.description}</react_native_1.Text>
          </react_native_1.View>
          {complaint.assignedTo && (<>
              <react_native_1.View style={styles.divider}/>
              <react_native_1.View style={styles.detailRow}>
                <react_native_1.View style={[styles.catIconWrap, { backgroundColor: "#FFEDD5" }]}>
                  <vector_icons_1.Feather name="user-check" size={14} color="#EA580C"/>
                </react_native_1.View>
                <react_native_1.View>
                  <react_native_1.Text style={styles.detailLabel}>{t("assignedTo")}</react_native_1.Text>
                  <react_native_1.Text style={styles.detailValue}>{complaint.assignedTo}</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>
            </>)}
          {complaint.resolvedNote && (<>
              <react_native_1.View style={styles.divider}/>
              <react_native_1.View style={styles.resolvedNote}>
                <vector_icons_1.Feather name="check-circle" size={14} color="#059669"/>
                <react_native_1.Text style={styles.resolvedNoteText}>{complaint.resolvedNote}</react_native_1.Text>
              </react_native_1.View>
            </>)}
        </react_native_1.View>

        {/* Timeline */}
        <react_native_1.View style={styles.timelineCard}>
          <react_native_1.Text style={styles.detailSectionTitle}>{t("activityTimeline")}</react_native_1.Text>
          {complaint.timeline.slice().reverse().map(function (entry, idx) {
            var eSt = statusConfig[entry.status];
            return (<react_native_1.View key={idx} style={styles.timelineEntry}>
                <react_native_1.View style={styles.timelineLeft}>
                  <react_native_1.View style={[styles.tlDot, { backgroundColor: eSt.bg }]}>
                    <vector_icons_1.Feather name={eSt.icon} size={10} color={eSt.color}/>
                  </react_native_1.View>
                  {idx < complaint.timeline.length - 1 && <react_native_1.View style={styles.tlLine}/>}
                </react_native_1.View>
                <react_native_1.View style={styles.timelineRight}>
                  <react_native_1.View style={styles.tlHeader}>
                    <react_native_1.Text style={[styles.tlStatus, { color: eSt.color }]}>{t(statusLabelKeys[entry.status])}</react_native_1.Text>
                    <react_native_1.Text style={styles.tlTime}>{formatDate(entry.timestamp)}</react_native_1.Text>
                  </react_native_1.View>
                  {entry.note ? <react_native_1.Text style={styles.tlNote}>{entry.note}</react_native_1.Text> : null}
                  {entry.updatedBy ? (<react_native_1.Text style={styles.tlBy}>— {entry.updatedBy}</react_native_1.Text>) : null}
                </react_native_1.View>
              </react_native_1.View>);
        })}
        </react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_1.Animated.View>);
}
var styles = react_native_1.StyleSheet.create({
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 10,
        alignSelf: "flex-start",
        paddingVertical: 4,
        paddingRight: 8,
        paddingLeft: 2,
    },
    backBtnText: {
        color: "rgba(255,255,255,0.92)",
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Inter_600SemiBold",
    },
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 18, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
    headerCenter: { flex: 1 },
    successPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        backgroundColor: "rgba(110,231,183,0.15)",
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
        marginBottom: 6,
    },
    successPillText: { fontSize: 10, fontWeight: "700", color: "#6EE7B7", fontFamily: "Inter_600SemiBold" },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 11, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular", marginTop: 2 },
    statusBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        flexShrink: 0,
    },
    statusBadgeText: { fontSize: 10, fontWeight: "700", color: "white", fontFamily: "Inter_600SemiBold" },
    scroll: { flex: 1 },
    content: { padding: 14 },
    photoCard: {
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 14,
        backgroundColor: "white",
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    photo: { width: "100%", height: 200 },
    photoLabel: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    photoLabelText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular" },
    trackerCard: {
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    trackerTitle: { fontSize: 13, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 16 },
    trackerSteps: { flexDirection: "row", alignItems: "flex-start" },
    trackerItem: { alignItems: "center", gap: 6, flexShrink: 0 },
    trackerDot: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    trackerLine: { flex: 1, height: 2, borderRadius: 1, marginTop: 13, marginHorizontal: 4 },
    trackerLabel: {
        fontSize: 9,
        fontWeight: "600",
        color: "#94A3B8",
        fontFamily: "Inter_500Medium",
        textAlign: "center",
        maxWidth: 60,
    },
    detailCard: {
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    detailSectionTitle: { fontSize: 13, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 14 },
    detailRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
    catIconWrap: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    detailLabel: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", marginBottom: 2 },
    detailValue: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    detailSub: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 1 },
    divider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },
    resolvedNote: {
        flexDirection: "row",
        gap: 8,
        backgroundColor: "#D1FAE5",
        borderRadius: 10,
        padding: 10,
        alignItems: "flex-start",
    },
    resolvedNoteText: { flex: 1, fontSize: 12, color: "#065F46", fontFamily: "Inter_400Regular", lineHeight: 18 },
    timelineCard: {
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    timelineEntry: { flexDirection: "row", gap: 12, marginBottom: 4 },
    timelineLeft: { alignItems: "center", width: 28, flexShrink: 0 },
    tlDot: {
        width: 28,
        height: 28,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    tlLine: { flex: 1, width: 2, backgroundColor: "#F1F5F9", marginTop: 4 },
    timelineRight: { flex: 1, paddingBottom: 16 },
    tlHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
    tlStatus: { fontSize: 12, fontWeight: "700", fontFamily: "Inter_700Bold" },
    tlTime: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    tlNote: { fontSize: 12, color: "#334155", fontFamily: "Inter_400Regular", lineHeight: 18, marginBottom: 2 },
    tlBy: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", fontStyle: "italic" },
    complainantCard: {
        backgroundColor: "white",
        borderRadius: 18,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 2,
    },
    complainantHeader: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 0 },
    complainantAvatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: "#EA580C",
        alignItems: "center",
        justifyContent: "center",
    },
    complainantAvatarText: { fontSize: 18, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    complainantName: { fontSize: 15, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    complainantRole: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 1 },
    complainantDivider: { height: 1, backgroundColor: "#F1F5F9", marginVertical: 12 },
    complainantDetails: { gap: 10 },
    complainantRow: { flexDirection: "row", alignItems: "center", gap: 10 },
    complainantIcon: {
        width: 32,
        height: 32,
        borderRadius: 9,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    complainantLabel: { fontSize: 9, color: "#94A3B8", fontFamily: "Inter_400Regular", marginBottom: 1 },
    complainantValue: { fontSize: 13, fontWeight: "600", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
});
