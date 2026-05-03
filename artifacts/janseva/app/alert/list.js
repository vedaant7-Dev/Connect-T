"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AlertListScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var expo_router_1 = require("expo-router");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Haptics = require("expo-haptics");
var AlertContext_1 = require("@/context/AlertContext");
var AuthContext_1 = require("@/context/AuthContext");
function formatDate(value) {
    var date = new Date(value);
    return "".concat(date.toLocaleDateString("en-IN", { day: "numeric", month: "short" }), " \u00B7 ").concat(date.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
}
function AlertRow(_a) {
    var _b, _c;
    var item = _a.item, onRemove = _a.onRemove;
    var isAlert = item.type === "alert";
    var color = isAlert ? "#DC2626" : "#EA580C";
    var bg = isAlert ? "#FEE2E2" : "#FFEDD5";
    return (<react_native_1.View style={styles.rowCard}>
      {((_b = item.media) === null || _b === void 0 ? void 0 : _b.type) === "image" ? (<react_native_1.Image source={{ uri: item.media.uri }} style={styles.rowImage}/>) : ((_c = item.media) === null || _c === void 0 ? void 0 : _c.type) === "video" ? (<react_native_1.View style={[styles.rowVideo, { backgroundColor: bg }]}>
          <vector_icons_1.Feather name="play-circle" size={24} color={color}/>
        </react_native_1.View>) : (<react_native_1.View style={[styles.rowIcon, { backgroundColor: bg }]}>
          <vector_icons_1.Feather name={isAlert ? "alert-triangle" : "radio"} size={20} color={color}/>
        </react_native_1.View>)}
      <react_native_1.View style={styles.rowBody}>
        <react_native_1.View style={styles.rowTop}>
          <react_native_1.View style={[styles.typePill, { backgroundColor: bg }]}>
            <react_native_1.Text style={[styles.typeText, { color: color }]}>{isAlert ? "Alert" : "News"}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.Text style={styles.timeText}>{formatDate(item.createdAt)}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.title} numberOfLines={1}>{item.title}</react_native_1.Text>
        <react_native_1.Text style={styles.body} numberOfLines={2}>{item.body}</react_native_1.Text>
        <react_native_1.View style={styles.metaRow}>
          {!!item.location && (<react_native_1.View style={styles.metaChip}>
              <vector_icons_1.Feather name="map-pin" size={10} color="#64748B"/>
              <react_native_1.Text style={styles.metaText} numberOfLines={1}>{item.location}</react_native_1.Text>
            </react_native_1.View>)}
          {!!item.priority && (<react_native_1.View style={styles.metaChip}>
              <vector_icons_1.Feather name="flag" size={10} color="#64748B"/>
              <react_native_1.Text style={styles.metaText}>{item.priority}</react_native_1.Text>
            </react_native_1.View>)}
          {!!item.media && (<react_native_1.View style={styles.metaChip}>
              <vector_icons_1.Feather name={item.media.type === "video" ? "video" : "image"} size={10} color="#64748B"/>
              <react_native_1.Text style={styles.metaText}>{item.media.type}</react_native_1.Text>
            </react_native_1.View>)}
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.TouchableOpacity style={styles.deleteBtn} onPress={function () {
            if (react_native_1.Platform.OS !== "web")
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            onRemove(item.id);
        }} activeOpacity={0.85}>
        <vector_icons_1.Feather name="trash-2" size={15} color="#DC2626"/>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
}
function AlertListScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 54 : insets.top;
    var _a = (0, AlertContext_1.useAlerts)(), allAlerts = _a.alerts, removeAlert = _a.removeAlert;
    var user = (0, AuthContext_1.useAuth)().user;
    var alerts = (user === null || user === void 0 ? void 0 : user.role) === "nagarsevak"
        ? allAlerts.filter(function (a) { return a.postedById ? a.postedById === user.id : a.postedBy === user.name; })
        : allAlerts.filter(function (a) { return !a.ward || (!!(user === null || user === void 0 ? void 0 : user.ward) && (0, AlertContext_1.wardKey)(a.ward) === (0, AlertContext_1.wardKey)(user.ward)); });
    var alertCount = alerts.filter(function (item) { return item.type === "alert"; }).length;
    var newsCount = alerts.filter(function (item) { return item.type === "news"; }).length;
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#166534", "#16A34A", "#22C55E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 10 }]}>
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.TouchableOpacity onPress={function () { return expo_router_1.router.back(); }} style={styles.backBtn} activeOpacity={0.85}>
            <vector_icons_1.Feather name="chevron-left" size={20} color="white"/>
            <react_native_1.Text style={styles.backText}>Back</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity onPress={function () { return expo_router_1.router.push("/alert/new"); }} style={styles.addBtn} activeOpacity={0.85}>
            <vector_icons_1.Feather name="plus" size={14} color="#166534"/>
            <react_native_1.Text style={styles.addText}>Post</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <react_native_1.Text style={styles.headerTitle}>Alerts & News</react_native_1.Text>
        <react_native_1.Text style={styles.headerSub}>All posted alerts and news shown in rows</react_native_1.Text>
        <react_native_1.View style={styles.statsRow}>
          <react_native_1.View style={styles.statChip}>
            <react_native_1.Text style={styles.statNum}>{alerts.length}</react_native_1.Text>
            <react_native_1.Text style={styles.statLabel}>Total</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.statChip}>
            <react_native_1.Text style={styles.statNum}>{alertCount}</react_native_1.Text>
            <react_native_1.Text style={styles.statLabel}>Alerts</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.statChip}>
            <react_native_1.Text style={styles.statNum}>{newsCount}</react_native_1.Text>
            <react_native_1.Text style={styles.statLabel}>News</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.FlatList data={alerts} keyExtractor={function (item) { return item.id; }} renderItem={function (_a) {
        var item = _a.item;
        return <AlertRow item={item} onRemove={removeAlert}/>;
    }} contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom, 12) + 24 }]} showsVerticalScrollIndicator={false} ListEmptyComponent={<react_native_1.View style={styles.emptyCard}>
            <vector_icons_1.Feather name="bell-off" size={36} color="#CBD5E1"/>
            <react_native_1.Text style={styles.emptyTitle}>No alerts or news yet</react_native_1.Text>
            <react_native_1.Text style={styles.emptySub}>Tap Post to broadcast updates to citizens.</react_native_1.Text>
          </react_native_1.View>}/>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 18, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
    backBtn: { flexDirection: "row", alignItems: "center", gap: 4, paddingVertical: 8, paddingRight: 10 },
    backText: { fontSize: 14, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    addBtn: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "white", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14 },
    addText: { fontSize: 12, fontWeight: "900", color: "#166534", fontFamily: "Inter_700Bold" },
    headerTitle: { fontSize: 24, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.4 },
    headerSub: { fontSize: 13, color: "rgba(255,255,255,0.78)", fontFamily: "Inter_400Regular", marginTop: 5 },
    statsRow: { flexDirection: "row", gap: 10, marginTop: 16 },
    statChip: { flex: 1, backgroundColor: "rgba(255,255,255,0.16)", borderWidth: 1, borderColor: "rgba(255,255,255,0.22)", borderRadius: 16, paddingVertical: 10, alignItems: "center" },
    statNum: { fontSize: 18, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    statLabel: { fontSize: 10, color: "rgba(255,255,255,0.72)", fontFamily: "Inter_600SemiBold", fontWeight: "600", marginTop: 1 },
    listContent: { padding: 14, gap: 10 },
    rowCard: { flexDirection: "row", alignItems: "flex-start", gap: 10, backgroundColor: "white", borderRadius: 18, padding: 12, borderWidth: 1, borderColor: "#E2E8F0", shadowColor: "#166534", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 },
    rowIcon: { width: 48, height: 48, borderRadius: 15, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    rowImage: { width: 58, height: 58, borderRadius: 15, backgroundColor: "#F8FAFC", flexShrink: 0 },
    rowVideo: { width: 58, height: 58, borderRadius: 15, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    rowBody: { flex: 1 },
    rowTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 5 },
    typePill: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
    typeText: { fontSize: 10, fontWeight: "900", fontFamily: "Inter_700Bold" },
    timeText: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", flexShrink: 0 },
    title: { fontSize: 14, fontWeight: "900", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 3 },
    body: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", lineHeight: 17 },
    metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 8 },
    metaChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#F8FAFC", borderRadius: 10, paddingHorizontal: 7, paddingVertical: 4, maxWidth: "100%" },
    metaText: { fontSize: 10, color: "#64748B", fontWeight: "700", fontFamily: "Inter_600SemiBold", textTransform: "capitalize" },
    deleteBtn: { width: 32, height: 32, borderRadius: 11, alignItems: "center", justifyContent: "center", backgroundColor: "#FEF2F2", flexShrink: 0 },
    emptyCard: { alignItems: "center", justifyContent: "center", backgroundColor: "white", borderRadius: 20, padding: 28, borderWidth: 1.5, borderStyle: "dashed", borderColor: "#CBD5E1", marginTop: 20 },
    emptyTitle: { fontSize: 15, fontWeight: "900", color: "#475569", fontFamily: "Inter_700Bold", marginTop: 10 },
    emptySub: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 4, textAlign: "center" },
});
