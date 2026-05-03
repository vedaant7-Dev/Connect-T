"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Haptics = require("expo-haptics");
var ComplaintContext_1 = require("@/context/ComplaintContext");
var AlertContext_1 = require("@/context/AlertContext");
var AuthContext_1 = require("@/context/AuthContext");
var expo_router_1 = require("expo-router");
var LanguageContext_1 = require("@/context/LanguageContext");
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
var nextStatusLabelKeys = {
    submitted: ["assignToTeam", "reject"],
    assigned: ["markInProgress", "reject"],
    in_progress: ["markResolved", "reject"],
    resolved: [],
    rejected: [],
};
var nextStatusOptions = {
    submitted: [{ status: "assigned", color: "#EA580C" }, { status: "rejected", color: "#DC2626" }],
    assigned: [{ status: "in_progress", color: "#7C3AED" }, { status: "rejected", color: "#DC2626" }],
    in_progress: [{ status: "resolved", color: "#059669" }, { status: "rejected", color: "#DC2626" }],
    resolved: [],
    rejected: [],
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
function ActionModal(_a) {
    var complaint = _a.complaint, onClose = _a.onClose, onUpdate = _a.onUpdate;
    var _b = (0, react_1.useState)(""), note = _b[0], setNote = _b[1];
    var _c = (0, react_1.useState)(null), selectedStatus = _c[0], setSelectedStatus = _c[1];
    var t = (0, LanguageContext_1.useLanguage)().t;
    var options = nextStatusOptions[complaint.status] || [];
    var optionLabelKeys = nextStatusLabelKeys[complaint.status] || [];
    return (<react_native_1.View style={modalStyles.overlay}>
      <react_native_1.View style={modalStyles.sheet}>
        <react_native_1.View style={modalStyles.handle}/>
        <react_native_1.Text style={modalStyles.title}>{t("updateComplaint")}</react_native_1.Text>
        <react_native_1.Text style={modalStyles.cmpId}># {complaint.id}</react_native_1.Text>
        <react_native_1.Text style={modalStyles.cmpName} numberOfLines={2}>{complaint.title}</react_native_1.Text>
        <react_native_1.View style={modalStyles.cmpLocation}>
          <vector_icons_1.Feather name="map-pin" size={12} color="#94A3B8"/>
          <react_native_1.Text style={modalStyles.cmpLocationText}>{complaint.location}</react_native_1.Text>
        </react_native_1.View>

        <react_native_1.Text style={modalStyles.label}>{t("selectAction")}</react_native_1.Text>
        <react_native_1.View style={modalStyles.optionRow}>
          {options.map(function (opt, idx) { return (<react_native_1.TouchableOpacity key={opt.status} style={[modalStyles.optionBtn, { borderColor: opt.color + "40" }, selectedStatus === opt.status && { backgroundColor: opt.color, borderColor: opt.color }]} onPress={function () { return setSelectedStatus(opt.status); }} activeOpacity={0.8}>
              <vector_icons_1.Feather name={statusConfig[opt.status].icon} size={14} color={selectedStatus === opt.status ? "white" : opt.color}/>
              <react_native_1.Text style={[modalStyles.optionText, { color: selectedStatus === opt.status ? "white" : opt.color }]}>{t(optionLabelKeys[idx])}</react_native_1.Text>
            </react_native_1.TouchableOpacity>); })}
        </react_native_1.View>

        <react_native_1.Text style={modalStyles.label}>{t("noteResolution")}</react_native_1.Text>
        <react_native_1.TextInput style={modalStyles.noteInput} value={note} onChangeText={setNote} placeholder={t("addNoteForCitizen")} placeholderTextColor="#CBD5E1" multiline numberOfLines={3} textAlignVertical="top"/>

        <react_native_1.View style={modalStyles.btnRow}>
          <react_native_1.TouchableOpacity style={modalStyles.cancelBtn} onPress={onClose} activeOpacity={0.8}>
            <react_native_1.Text style={modalStyles.cancelBtnText}>{t("cancel")}</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={[modalStyles.confirmBtn, !selectedStatus && { opacity: 0.5 }]} onPress={function () { if (!selectedStatus)
        return; onUpdate(selectedStatus, note); onClose(); }} disabled={!selectedStatus} activeOpacity={0.85}>
            <expo_linear_gradient_1.LinearGradient colors={["#EA580C", "#FB923C"]} style={modalStyles.confirmBtnGrad}>
              <react_native_1.Text style={modalStyles.confirmBtnText}>{t("updateStatus")}</react_native_1.Text>
            </expo_linear_gradient_1.LinearGradient>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
}
function DetailedComplaintCard(_a) {
    var complaint = _a.complaint, onAction = _a.onAction;
    var t = (0, LanguageContext_1.useLanguage)().t;
    var st = statusConfig[complaint.status];
    var cat = categoryConfig[complaint.category] || categoryConfig.other;
    var hasActions = (nextStatusOptions[complaint.status] || []).length > 0;
    var router = (0, expo_router_1.useRouter)();
    return (<react_native_1.TouchableOpacity style={styles.card} onPress={function () { return router.push({ pathname: "/complaint/[id]", params: { id: complaint.id } }); }} activeOpacity={0.92}>
      <react_native_1.View style={styles.cardHeader}>
        <react_native_1.View style={[styles.catDot, { backgroundColor: cat.color + "20" }]}>
          <vector_icons_1.Feather name={cat.icon} size={14} color={cat.color}/>
        </react_native_1.View>
        <react_native_1.View style={styles.cardHeaderText}>
          <react_native_1.Text style={styles.cmpTitle} numberOfLines={1}>{complaint.title}</react_native_1.Text>
          <react_native_1.Text style={styles.cmpMeta}>{timeAgo(complaint.createdAt)}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={[styles.statusPill, { backgroundColor: st.bg }]}>
          <vector_icons_1.Feather name={st.icon} size={9} color={st.color}/>
          <react_native_1.Text style={[styles.statusPillText, { color: st.color }]}>{t(statusLabelKeys[complaint.status])}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={styles.cardBody}>
        <react_native_1.View style={styles.metaRow}>
          <vector_icons_1.Feather name="map-pin" size={11} color="#94A3B8"/>
          <react_native_1.Text style={styles.metaText} numberOfLines={1}>{complaint.location}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.metaRow}>
          <vector_icons_1.Feather name="home" size={11} color="#94A3B8"/>
          <react_native_1.Text style={styles.metaText}>{complaint.ward}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.descText} numberOfLines={2}>{complaint.description}</react_native_1.Text>

        <react_native_1.View style={styles.citizenInfoRow}>
          <react_native_1.View style={styles.citizenInfoChip}>
            <vector_icons_1.Feather name="user" size={10} color="#EA580C"/>
            <react_native_1.Text style={styles.citizenInfoText}>{complaint.userName || t("citizen")}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.citizenInfoChip}>
            <vector_icons_1.Feather name="calendar" size={10} color="#64748B"/>
            <react_native_1.Text style={styles.citizenInfoText}>{new Date(complaint.createdAt).toLocaleDateString()}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
      {hasActions && (<react_native_1.TouchableOpacity style={styles.actionBtn} onPress={function (e) { var _a; (_a = e.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(e); onAction(); }} activeOpacity={0.85}>
          <expo_linear_gradient_1.LinearGradient colors={["#166534", "#16A34A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.actionBtnGrad}>
            <vector_icons_1.Feather name="edit-3" size={13} color="white"/>
            <react_native_1.Text style={styles.actionBtnText}>{t("updateStatus")}</react_native_1.Text>
          </expo_linear_gradient_1.LinearGradient>
        </react_native_1.TouchableOpacity>)}
      {complaint.status === "resolved" && (<react_native_1.View style={styles.resolvedBar}>
          <vector_icons_1.Feather name="check-circle" size={12} color="#059669"/>
          <react_native_1.Text style={styles.resolvedBarText}>{complaint.resolvedNote || t("issueResolved")}</react_native_1.Text>
        </react_native_1.View>)}
    </react_native_1.TouchableOpacity>);
}
function AdminScreen() {
    var _this = this;
    var _a, _b, _c, _d;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var _e = (0, AuthContext_1.useAuth)(), user = _e.user, logout = _e.logout, updateUser = _e.updateUser;
    var _f = (0, ComplaintContext_1.useComplaints)(), complaints = _f.complaints, updateStatus = _f.updateStatus;
    var _g = (0, AlertContext_1.useAlerts)(), allAlerts = _g.alerts, removeAlert = _g.removeAlert;
    var alerts = allAlerts.filter(function (a) { return a.postedById && (user === null || user === void 0 ? void 0 : user.id) ? a.postedById === user.id : a.postedBy === (user === null || user === void 0 ? void 0 : user.name); });
    var router = (0, expo_router_1.useRouter)();
    var t = (0, LanguageContext_1.useLanguage)().t;
    var _h = (0, react_1.useState)("all"), filter = _h[0], setFilter = _h[1];
    var _j = (0, react_1.useState)(null), active = _j[0], setActive = _j[1];
    var _k = (0, react_1.useState)(false), showLogoutModal = _k[0], setShowLogoutModal = _k[1];
    var _l = (0, react_1.useState)(false), showProfile = _l[0], setShowProfile = _l[1];
    var _m = (0, react_1.useState)(false), showEditProfile = _m[0], setShowEditProfile = _m[1];
    var _o = (0, react_1.useState)(""), editName = _o[0], setEditName = _o[1];
    var _p = (0, react_1.useState)(""), editWard = _p[0], setEditWard = _p[1];
    var complaintListRef = (0, react_1.useRef)(null);
    if (!user || user.role !== "nagarsevak") {
        return (<react_native_1.View style={{ flex: 1, backgroundColor: "#ebeffc", alignItems: "center", justifyContent: "center", padding: 32 }}>
        <vector_icons_1.Feather name="lock" size={48} color="#CBD5E1"/>
        <react_native_1.Text style={{ fontSize: 18, fontWeight: "700", color: "#475569", marginTop: 16, fontFamily: "Inter_700Bold" }}>{t("nagarsevakOnly")}</react_native_1.Text>
        <react_native_1.Text style={{ fontSize: 13, color: "#94A3B8", marginTop: 8, textAlign: "center", fontFamily: "Inter_400Regular" }}>{t("nagarsevakOnlyDesc")}</react_native_1.Text>
        <react_native_1.TouchableOpacity onPress={function () { return router.push("/login"); }} style={{ backgroundColor: "#C2410C", paddingHorizontal: 32, paddingVertical: 14, borderRadius: 14, marginTop: 24 }} activeOpacity={0.85}>
          <react_native_1.Text style={{ fontSize: 15, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" }}>{t("loginBtn")}</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>);
    }
    var wardComplaints = (user === null || user === void 0 ? void 0 : user.ward) ? complaints.filter(function (c) { return c.ward === user.ward; }) : complaints;
    var filtered = filter === "all"
        ? wardComplaints
        : wardComplaints.filter(function (c) {
            if (filter === "in_progress")
                return c.status === "in_progress" || c.status === "assigned";
            return c.status === filter;
        });
    var pending = wardComplaints.filter(function (c) { return c.status === "submitted"; }).length;
    var activeCount = wardComplaints.filter(function (c) { return c.status === "in_progress" || c.status === "assigned"; }).length;
    var resolvedCount = wardComplaints.filter(function (c) { return c.status === "resolved"; }).length;
    var rejectedCount = wardComplaints.filter(function (c) { return c.status === "rejected"; }).length;
    var dashboardFilters = [
        { filter: "submitted", label: t("complaints"), count: pending, icon: "file-text", color: "#C2410C", bg: "#FFEDD5" },
        { filter: "in_progress", label: t("inProgress"), count: activeCount, icon: "tool", color: "#7C3AED", bg: "#EDE9FE" },
        { filter: "resolved", label: t("resolved"), count: resolvedCount, icon: "check-circle", color: "#059669", bg: "#D1FAE5" },
        { filter: "rejected", label: t("rejected"), count: rejectedCount, icon: "x-circle", color: "#DC2626", bg: "#FEE2E2" },
    ];
    var openComplaintTab = function (nextFilter) {
        if (react_native_1.Platform.OS !== "web")
            Haptics.selectionAsync();
        router.push({ pathname: "/complaint/list", params: { status: nextFilter } });
    };
    var handleLogout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setShowLogoutModal(false);
                    return [4 /*yield*/, logout()];
                case 1:
                    _a.sent();
                    router.replace("/login");
                    return [2 /*return*/];
            }
        });
    }); };
    var openEditProfile = function () {
        setEditName((user === null || user === void 0 ? void 0 : user.name) || "");
        setEditWard((user === null || user === void 0 ? void 0 : user.ward) || "");
        setShowEditProfile(true);
    };
    var saveEditProfile = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editName.trim())
                        return [2 /*return*/];
                    return [4 /*yield*/, updateUser({ name: editName.trim(), ward: editWard || (user === null || user === void 0 ? void 0 : user.ward) })];
                case 1:
                    _a.sent();
                    setShowEditProfile(false);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={{ flex: 1, backgroundColor: "#ebeffc" }}>
      <expo_linear_gradient_1.LinearGradient colors={["#166534", "#16A34A", "#22C55E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.View style={styles.headerTop}>
          <react_native_1.View>
            <react_native_1.View style={styles.adminBadge}>
              <vector_icons_1.Feather name="briefcase" size={10} color="#6EE7B7"/>
              <react_native_1.Text style={[styles.adminBadgeText, { color: "#6EE7B7" }]}>NAGARSEVAK</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.Text style={styles.headerTitle}>{user === null || user === void 0 ? void 0 : user.name}</react_native_1.Text>
            <react_native_1.Text style={styles.headerSub}>{(user === null || user === void 0 ? void 0 : user.ward) || "Ambernath"}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.TouchableOpacity onPress={function () { return setShowProfile(true); }} style={styles.profileAvatarBtn} activeOpacity={0.8}>
            <react_native_1.Text style={styles.profileAvatarText}>{((_b = (_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.charAt(0)) === null || _b === void 0 ? void 0 : _b.toUpperCase()) || "N"}</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>

        <react_native_1.View style={styles.statPills}>
          {[
            { label: t("pending"), count: pending, color: "#FDE68A", icon: "clock" },
            { label: t("active"), count: activeCount, color: "#C4B5FD", icon: "tool" },
            { label: t("resolved"), count: resolvedCount, color: "#6EE7B7", icon: "check-circle" },
            { label: t("total"), count: wardComplaints.length, color: "#93C5FD", icon: "list" },
        ].map(function (s) { return (<react_native_1.View key={s.label} style={styles.statPill}>
              <vector_icons_1.Feather name={s.icon} size={14} color={s.color}/>
              <react_native_1.Text style={[styles.statPillNum, { color: s.color }]}>{s.count}</react_native_1.Text>
              <react_native_1.Text style={styles.statPillLabel}>{s.label}</react_native_1.Text>
            </react_native_1.View>); })}
        </react_native_1.View>

      </expo_linear_gradient_1.LinearGradient>

      {pending > 0 && (<react_native_1.View style={styles.urgentBanner}>
          <vector_icons_1.Feather name="alert-circle" size={14} color="#DC2626"/>
          <react_native_1.Text style={styles.urgentText}>{pending} {t("complaints")} — {t("needsAttention")}</react_native_1.Text>
        </react_native_1.View>)}

      {/* ALERTS PANEL */}
      <react_native_1.TouchableOpacity style={styles.alertPanel} activeOpacity={0.9} onPress={function () { return router.push("/alert/list"); }}>
        <react_native_1.View style={styles.alertPanelHeader}>
          <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
            <vector_icons_1.Feather name="bell" size={14} color="#C2410C"/>
            <react_native_1.Text style={styles.alertPanelTitle}>Alerts & News</react_native_1.Text>
            {alerts.length > 0 && (<react_native_1.View style={styles.alertCountBadge}>
                <react_native_1.Text style={styles.alertCountText}>{alerts.length}</react_native_1.Text>
              </react_native_1.View>)}
          </react_native_1.View>
          <react_native_1.TouchableOpacity style={styles.postAlertBtn} onPress={function (event) {
            var _a;
            (_a = event.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(event);
            router.push("/alert/new");
        }} activeOpacity={0.85}>
            <vector_icons_1.Feather name="plus" size={13} color="white"/>
            <react_native_1.Text style={styles.postAlertBtnText}>Post Alert</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>

        {alerts.length === 0 ? (<react_native_1.View style={styles.alertPanelEmpty}>
            <vector_icons_1.Feather name="bell-off" size={22} color="#CBD5E1"/>
            <react_native_1.Text style={styles.alertPanelEmptyText}>No alerts posted yet</react_native_1.Text>
            <react_native_1.Text style={styles.alertPanelEmptySub}>Tap "Post Alert" to broadcast to all citizens</react_native_1.Text>
          </react_native_1.View>) : (<react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 10, paddingHorizontal: 2, paddingBottom: 4 }}>
            {alerts.map(function (a) {
                var isAlert = a.type === "alert";
                var cardColor = isAlert ? "#DC2626" : "#EA580C";
                var cardBg = isAlert ? "#FEE2E2" : "#FFEDD5";
                return (<react_native_1.View key={a.id} style={[styles.alertChip, { borderColor: cardBg }]}>
                  <react_native_1.View style={[styles.alertChipPill, { backgroundColor: cardBg }]}>
                    <react_native_1.Text style={[styles.alertChipPillText, { color: cardColor }]}>
                      {isAlert ? "⚠ Alert" : "📢 News"}
                    </react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.Text style={styles.alertChipTitle} numberOfLines={1}>{a.title}</react_native_1.Text>
                  <react_native_1.Text style={styles.alertChipBody} numberOfLines={2}>{a.body}</react_native_1.Text>
                  <react_native_1.TouchableOpacity style={styles.alertChipDelete} onPress={function (event) {
                        var _a;
                        (_a = event.stopPropagation) === null || _a === void 0 ? void 0 : _a.call(event);
                        if (react_native_1.Platform.OS !== "web")
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                        removeAlert(a.id);
                    }} activeOpacity={0.8}>
                    <vector_icons_1.Feather name="trash-2" size={12} color="#DC2626"/>
                    <react_native_1.Text style={styles.alertChipDeleteText}>Remove</react_native_1.Text>
                  </react_native_1.TouchableOpacity>
                </react_native_1.View>);
            })}
          </react_native_1.ScrollView>)}
      </react_native_1.TouchableOpacity>

      <react_native_1.View style={styles.dashboardGrid}>
        {dashboardFilters.map(function (item) {
            var isActive = filter === item.filter;
            return (<react_native_1.TouchableOpacity key={item.filter} style={[
                    styles.dashboardCard,
                    {
                        backgroundColor: isActive ? item.bg : "white",
                        borderColor: item.color,
                        shadowColor: item.color,
                    },
                    isActive && styles.dashboardCardActive,
                ]} onPress={function () { return openComplaintTab(item.filter); }} activeOpacity={0.85}>
              <react_native_1.Text style={styles.dashboardLabel}>{item.label}</react_native_1.Text>
              <react_native_1.View style={[styles.dashboardIcon, { backgroundColor: item.color + "15" }]}>
                <vector_icons_1.Feather name={item.icon} size={20} color={item.color}/>
              </react_native_1.View>
              <react_native_1.Text style={[styles.dashboardCount, { color: item.color }]}>{item.count}</react_native_1.Text>
            </react_native_1.TouchableOpacity>);
        })}
      </react_native_1.View>

      <react_native_1.FlatList ref={complaintListRef} data={filtered} extraData={filter} keyExtractor={function (c) { return c.id; }} renderItem={function (_a) {
        var item = _a.item;
        return <DetailedComplaintCard complaint={item} onAction={function () { return setActive(item); }}/>;
    }} contentContainerStyle={[{ padding: 14 }, { paddingBottom: Math.max(insets.bottom, 8) + 20 }]} showsVerticalScrollIndicator={false} ListEmptyComponent={<react_native_1.View style={styles.empty}>
            <vector_icons_1.Feather name="check-circle" size={36} color="#CBD5E1"/>
            <react_native_1.Text style={styles.emptyText}>{t("noComplaintsInCategory")}</react_native_1.Text>
          </react_native_1.View>}/>

      {active && (<react_native_1.Modal transparent animationType="slide" visible onRequestClose={function () { return setActive(null); }}>
          <ActionModal complaint={active} onClose={function () { return setActive(null); }} onUpdate={function (st, note) {
                if (react_native_1.Platform.OS !== "web")
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                updateStatus(active.id, st, note, (user === null || user === void 0 ? void 0 : user.name) || "Nagarsevak");
            }}/>
        </react_native_1.Modal>)}

      <react_native_1.Modal visible={showProfile} transparent animationType="slide" onRequestClose={function () { return setShowProfile(false); }}>
        <react_native_1.View style={pStyles.root}>
          <expo_linear_gradient_1.LinearGradient colors={["#166534", "#16A34A", "#22C55E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[pStyles.header, { paddingTop: topPad + 12 }]}>
            <react_native_1.View style={pStyles.profileHeaderRow}>
              <react_native_1.TouchableOpacity onPress={function () { return setShowProfile(false); }} style={pStyles.profileNavBtn} activeOpacity={0.8}>
                <vector_icons_1.Feather name="chevron-left" size={20} color="white"/>
                <react_native_1.Text style={pStyles.profileNavBtnText}>Back</react_native_1.Text>
              </react_native_1.TouchableOpacity>
              <react_native_1.TouchableOpacity onPress={openEditProfile} style={pStyles.profileEditBtn} activeOpacity={0.8}>
                <vector_icons_1.Feather name="edit-2" size={15} color="white"/>
                <react_native_1.Text style={pStyles.profileNavBtnText}>Edit</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
            <react_native_1.View style={pStyles.headerContent}>
              <react_native_1.View style={pStyles.avatarLarge}>
                <react_native_1.Text style={pStyles.avatarText}>{((_d = (_c = user === null || user === void 0 ? void 0 : user.name) === null || _c === void 0 ? void 0 : _c.charAt(0)) === null || _d === void 0 ? void 0 : _d.toUpperCase()) || "N"}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={pStyles.headerText}>
                <react_native_1.Text style={pStyles.userName}>{user === null || user === void 0 ? void 0 : user.name}</react_native_1.Text>
                <react_native_1.View style={pStyles.rolePillRow}>
                  <react_native_1.View style={pStyles.rolePill}>
                    <vector_icons_1.Feather name="briefcase" size={11} color="rgba(255,255,255,0.9)"/>
                    <react_native_1.Text style={pStyles.rolePillText}>Nagarsevak</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.Text style={pStyles.roleSub}>Ward Officer</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={pStyles.infoRow}>
                  <react_native_1.View style={pStyles.infoChip}>
                    <vector_icons_1.Feather name="map-pin" size={10} color="rgba(255,255,255,0.55)"/>
                    <react_native_1.Text style={pStyles.infoChipText}>{(user === null || user === void 0 ? void 0 : user.ward) || "Ambernath"}</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.View style={pStyles.infoChip}>
                    <vector_icons_1.Feather name="phone" size={10} color="rgba(255,255,255,0.55)"/>
                    <react_native_1.Text style={pStyles.infoChipText}>+91 {user === null || user === void 0 ? void 0 : user.mobile}</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>
              </react_native_1.View>
            </react_native_1.View>

            <react_native_1.View style={pStyles.statsRow}>
              <react_native_1.View style={pStyles.statItem}>
                <react_native_1.Text style={pStyles.statNum}>{wardComplaints.length}</react_native_1.Text>
                <react_native_1.Text style={pStyles.statLabel}>{t("total")}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={pStyles.statDiv}/>
              <react_native_1.View style={pStyles.statItem}>
                <react_native_1.Text style={[pStyles.statNum, { color: "#FDE68A" }]}>{pending}</react_native_1.Text>
                <react_native_1.Text style={pStyles.statLabel}>{t("pending")}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={pStyles.statDiv}/>
              <react_native_1.View style={pStyles.statItem}>
                <react_native_1.Text style={[pStyles.statNum, { color: "#C4B5FD" }]}>{activeCount}</react_native_1.Text>
                <react_native_1.Text style={pStyles.statLabel}>{t("active")}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={pStyles.statDiv}/>
              <react_native_1.View style={pStyles.statItem}>
                <react_native_1.Text style={[pStyles.statNum, { color: "#6EE7B7" }]}>{resolvedCount}</react_native_1.Text>
                <react_native_1.Text style={pStyles.statLabel}>{t("resolved")}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
          </expo_linear_gradient_1.LinearGradient>

          <react_native_1.ScrollView style={pStyles.scroll} contentContainerStyle={{ padding: 16, paddingBottom: Math.max(insets.bottom, 8) + 30 }} showsVerticalScrollIndicator={false}>
            <react_native_1.View style={pStyles.section}>
              <react_native_1.Text style={pStyles.sectionLabel}>PARTY & DESIGNATION</react_native_1.Text>
              <react_native_1.View style={pStyles.card}>
                {[
            { icon: "award", label: "Nagarsevak ID", value: (user === null || user === void 0 ? void 0 : user.nagarsevakId) || "—" },
            { icon: "briefcase", label: "Designation", value: "Ward Officer / Nagarsevak" },
            { icon: "map-pin", label: t("ward"), value: (user === null || user === void 0 ? void 0 : user.ward) || "Ambernath" },
        ].map(function (item, idx, arr) { return (<react_native_1.View key={item.label} style={[pStyles.detailRow, idx < arr.length - 1 && pStyles.rowBorder]}>
                    <react_native_1.View style={[pStyles.detailIcon, { backgroundColor: "#DCFCE7" }]}>
                      <vector_icons_1.Feather name={item.icon} size={14} color="#16A34A"/>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 1 }}>
                      <react_native_1.Text style={pStyles.detailLabel}>{item.label}</react_native_1.Text>
                      <react_native_1.Text style={pStyles.detailValue}>{item.value}</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>); })}
              </react_native_1.View>
            </react_native_1.View>

            <react_native_1.View style={pStyles.section}>
              <react_native_1.Text style={pStyles.sectionLabel}>ACCOUNT DETAILS</react_native_1.Text>
              <react_native_1.View style={pStyles.card}>
                {__spreadArray(__spreadArray(__spreadArray(__spreadArray([
            { icon: "user", label: t("fullName") || "Full Name", value: (user === null || user === void 0 ? void 0 : user.name) || "—" },
            { icon: "phone", label: t("phone"), value: "+91 " + ((user === null || user === void 0 ? void 0 : user.mobile) || "—") }
        ], ((user === null || user === void 0 ? void 0 : user.email) ? [{ icon: "mail", label: t("email"), value: user.email }] : []), true), ((user === null || user === void 0 ? void 0 : user.address) ? [{ icon: "home", label: t("address"), value: user.address }] : []), true), ((user === null || user === void 0 ? void 0 : user.age) ? [{ icon: "calendar", label: t("age"), value: String(user.age) + " years" }] : []), true), [
            { icon: "clock", label: t("memberSince"), value: (user === null || user === void 0 ? void 0 : user.createdAt) ? new Date(user.createdAt).toLocaleDateString() : "—" },
        ], false).map(function (item, idx, arr) { return (<react_native_1.View key={item.label} style={[pStyles.detailRow, idx < arr.length - 1 && pStyles.rowBorder]}>
                    <react_native_1.View style={[pStyles.detailIcon, { backgroundColor: "#DCFCE7" }]}>
                      <vector_icons_1.Feather name={item.icon} size={14} color="#16A34A"/>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 1 }}>
                      <react_native_1.Text style={pStyles.detailLabel}>{item.label}</react_native_1.Text>
                      <react_native_1.Text style={pStyles.detailValue}>{item.value}</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>); })}
              </react_native_1.View>
            </react_native_1.View>

            <react_native_1.View style={pStyles.section}>
              <react_native_1.Text style={pStyles.sectionLabel}>WARD JURISDICTION</react_native_1.Text>
              <react_native_1.View style={pStyles.card}>
                {[
            { icon: "home", label: "Corporation", value: "Ambernath Municipal Council (AMC)" },
            { icon: "map", label: "City", value: "Ambernath, Maharashtra" },
            { icon: "compass", label: "Area", value: (user === null || user === void 0 ? void 0 : user.ward) || "Ambernath" },
        ].map(function (item, idx, arr) { return (<react_native_1.View key={item.label} style={[pStyles.detailRow, idx < arr.length - 1 && pStyles.rowBorder]}>
                    <react_native_1.View style={[pStyles.detailIcon, { backgroundColor: "#FFEDD5" }]}>
                      <vector_icons_1.Feather name={item.icon} size={14} color="#EA580C"/>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 1 }}>
                      <react_native_1.Text style={pStyles.detailLabel}>{item.label}</react_native_1.Text>
                      <react_native_1.Text style={pStyles.detailValue}>{item.value}</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>); })}
              </react_native_1.View>
            </react_native_1.View>

            <react_native_1.View style={pStyles.appInfoCard}>
              <react_native_1.Text style={pStyles.appInfoBrand}>Connect T</react_native_1.Text>
              <react_native_1.Text style={pStyles.appInfoTagline}>BJP Member Services · सबका साथ, सबका विकास</react_native_1.Text>
              <react_native_1.Text style={pStyles.appInfoVersion}>v1.0 · AMC Ambernath</react_native_1.Text>
            </react_native_1.View>

            <react_native_1.TouchableOpacity style={pStyles.logoutBtn} onPress={function () { setShowProfile(false); setShowLogoutModal(true); }} activeOpacity={0.85}>
              <react_native_1.View style={pStyles.logoutInner}>
                <vector_icons_1.Feather name="log-out" size={18} color="#DC2626"/>
                <react_native_1.Text style={pStyles.logoutText}>{t("logout")}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>
          </react_native_1.ScrollView>

          <react_native_1.Modal visible={showEditProfile} transparent animationType="slide" onRequestClose={function () { return setShowEditProfile(false); }}>
            <react_native_1.View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" }}>
              <react_native_1.View style={{ backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 }}>
                <react_native_1.View style={{ width: 36, height: 4, backgroundColor: "#E2E8F0", borderRadius: 2, alignSelf: "center", marginBottom: 16 }}/>
                <react_native_1.Text style={{ fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 20 }}>Edit Profile</react_native_1.Text>
                <react_native_1.Text style={{ fontSize: 10, fontWeight: "700", color: "#94A3B8", letterSpacing: 1.2, fontFamily: "Inter_600SemiBold", marginBottom: 6 }}>FULL NAME</react_native_1.Text>
                <react_native_1.TextInput style={{ backgroundColor: "#F8FAFC", borderRadius: 14, borderWidth: 1.5, borderColor: "#E2E8F0", paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular", marginBottom: 16, outlineWidth: 0 }} value={editName} onChangeText={setEditName} placeholder="Your name" placeholderTextColor="#CBD5E1"/>
                <react_native_1.Text style={{ fontSize: 10, fontWeight: "700", color: "#94A3B8", letterSpacing: 1.2, fontFamily: "Inter_600SemiBold", marginBottom: 6 }}>WARD</react_native_1.Text>
                <react_native_1.TextInput style={{ backgroundColor: "#F8FAFC", borderRadius: 14, borderWidth: 1.5, borderColor: "#E2E8F0", paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular", marginBottom: 24, outlineWidth: 0 }} value={editWard} onChangeText={setEditWard} placeholder="Your ward" placeholderTextColor="#CBD5E1"/>
                <react_native_1.View style={{ flexDirection: "row", gap: 10 }}>
                  <react_native_1.TouchableOpacity style={{ flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: "center", backgroundColor: "#F1F5F9" }} onPress={function () { return setShowEditProfile(false); }} activeOpacity={0.8}>
                    <react_native_1.Text style={{ fontSize: 14, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold" }}>{t("cancel")}</react_native_1.Text>
                  </react_native_1.TouchableOpacity>
                  <react_native_1.TouchableOpacity style={{ flex: 2, borderRadius: 14, overflow: "hidden" }} onPress={saveEditProfile} activeOpacity={0.85} disabled={!editName.trim()}>
                    <expo_linear_gradient_1.LinearGradient colors={["#166534", "#16A34A"]} style={{ paddingVertical: 14, alignItems: "center" }}>
                      <react_native_1.Text style={{ fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" }}>Save Changes</react_native_1.Text>
                    </expo_linear_gradient_1.LinearGradient>
                  </react_native_1.TouchableOpacity>
                </react_native_1.View>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.Modal>
        </react_native_1.View>
      </react_native_1.Modal>

      <react_native_1.Modal visible={showLogoutModal} transparent animationType="fade" onRequestClose={function () { return setShowLogoutModal(false); }}>
        <react_native_1.View style={styles.logoutModalOverlay}>
          <react_native_1.View style={styles.logoutModalSheet}>
            <react_native_1.View style={styles.logoutModalIconWrap}>
              <vector_icons_1.Feather name="log-out" size={28} color="#DC2626"/>
            </react_native_1.View>
            <react_native_1.Text style={styles.logoutModalTitle}>{t("logout")}</react_native_1.Text>
            <react_native_1.Text style={styles.logoutModalBody}>{t("logoutConfirm")}</react_native_1.Text>
            <react_native_1.View style={styles.logoutModalBtnRow}>
              <react_native_1.TouchableOpacity style={styles.logoutModalCancelBtn} onPress={function () { return setShowLogoutModal(false); }} activeOpacity={0.8}>
                <react_native_1.Text style={styles.logoutModalCancelText}>{t("cancel")}</react_native_1.Text>
              </react_native_1.TouchableOpacity>
              <react_native_1.TouchableOpacity style={styles.logoutModalConfirmBtn} onPress={handleLogout} activeOpacity={0.85}>
                <vector_icons_1.Feather name="log-out" size={15} color="white"/>
                <react_native_1.Text style={styles.logoutModalConfirmText}>{t("yesLogout")}</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>
    </react_native_1.View>);
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
    header: { paddingHorizontal: 20, paddingBottom: 14, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
    adminBadge: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(110,231,183,0.15)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, alignSelf: "flex-start", marginBottom: 6 },
    adminBadgeText: { fontSize: 9, fontWeight: "700", letterSpacing: 1, fontFamily: "Inter_600SemiBold" },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular", marginTop: 2 },
    profileAvatarBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" },
    profileAvatarText: { fontSize: 16, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    statPills: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 14, padding: 10, marginBottom: 12, alignItems: "center", gap: 0 },
    statPill: { flex: 1, alignItems: "center", gap: 2 },
    statPillNum: { fontSize: 20, fontWeight: "900", fontFamily: "Inter_700Bold" },
    statPillLabel: { fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "Inter_400Regular" },
    urgentBanner: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FEE2E2", paddingHorizontal: 16, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#FECACA" },
    alertPanel: { backgroundColor: "white", marginHorizontal: 14, marginTop: 12, marginBottom: 4, borderRadius: 18, padding: 14, shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2 },
    alertPanelHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
    alertPanelTitle: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    alertCountBadge: { backgroundColor: "#FEE2E2", borderRadius: 10, paddingHorizontal: 7, paddingVertical: 2 },
    alertCountText: { fontSize: 10, fontWeight: "700", color: "#DC2626", fontFamily: "Inter_700Bold" },
    postAlertBtn: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#C2410C", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
    postAlertBtnText: { fontSize: 12, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    alertPanelEmpty: { height: 80, borderRadius: 12, borderWidth: 1.5, borderColor: "#E2E8F0", borderStyle: "dashed", alignItems: "center", justifyContent: "center", gap: 4 },
    alertPanelEmptyText: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_600SemiBold", fontWeight: "600" },
    alertPanelEmptySub: { fontSize: 10, color: "#CBD5E1", fontFamily: "Inter_400Regular" },
    alertChip: { width: 200, backgroundColor: "#FAFAFA", borderRadius: 14, borderWidth: 1, padding: 12, gap: 4 },
    alertChipPill: { alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
    alertChipPillText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_700Bold" },
    alertChipTitle: { fontSize: 12, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    alertChipBody: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", lineHeight: 15 },
    alertChipDelete: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
    alertChipDeleteText: { fontSize: 10, fontWeight: "600", color: "#DC2626", fontFamily: "Inter_600SemiBold" },
    urgentText: { fontSize: 12, fontWeight: "700", color: "#DC2626", fontFamily: "Inter_600SemiBold" },
    dashboardGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 12,
        paddingHorizontal: 14,
        paddingTop: 10,
    },
    dashboardCard: {
        width: "48%",
        aspectRatio: 1,
        borderRadius: 18,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 12,
        paddingHorizontal: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.14,
        shadowRadius: 10,
        elevation: 4,
    },
    dashboardCardActive: {
        shadowOpacity: 0.22,
        elevation: 6,
    },
    dashboardIcon: {
        width: 42,
        height: 42,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    dashboardCount: { fontSize: 24, fontWeight: "900", fontFamily: "Inter_700Bold" },
    dashboardLabel: { width: "100%", fontSize: 16, fontWeight: "900", color: "#334155", fontFamily: "Inter_700Bold", textAlign: "center", lineHeight: 20 },
    card: { backgroundColor: "white", borderRadius: 16, marginBottom: 10, overflow: "hidden", shadowColor: "#166534", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 8, elevation: 2 },
    cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, padding: 14, paddingBottom: 10 },
    catDot: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    cardHeaderText: { flex: 1 },
    cmpTitle: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    cmpMeta: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 1 },
    statusPill: { flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 20, flexShrink: 0 },
    statusPillText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    cardBody: { paddingHorizontal: 14, paddingBottom: 10, gap: 4 },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 5 },
    metaText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", flex: 1 },
    descText: { fontSize: 12, color: "#475569", fontFamily: "Inter_400Regular", lineHeight: 17, marginTop: 4 },
    citizenInfoRow: { flexDirection: "row", gap: 8, marginTop: 8 },
    citizenInfoChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#FFF7ED", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    citizenInfoText: { fontSize: 10, color: "#475569", fontFamily: "Inter_400Regular" },
    actionBtn: { marginHorizontal: 14, marginBottom: 14, borderRadius: 12, overflow: "hidden" },
    actionBtnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10 },
    actionBtnText: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    resolvedBar: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#D1FAE5", paddingHorizontal: 14, paddingVertical: 8 },
    resolvedBarText: { fontSize: 11, color: "#166534", fontFamily: "Inter_400Regular", flex: 1 },
    empty: { alignItems: "center", paddingTop: 60, gap: 10 },
    emptyText: { fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    logoutModalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "center", padding: 32 },
    logoutModalSheet: { backgroundColor: "white", borderRadius: 24, padding: 28, width: "100%", alignItems: "center", gap: 10 },
    logoutModalIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#FEE2E2", alignItems: "center", justifyContent: "center", marginBottom: 4 },
    logoutModalTitle: { fontSize: 20, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    logoutModalBody: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 20 },
    logoutModalBtnRow: { flexDirection: "row", gap: 10, width: "100%", marginTop: 8 },
    logoutModalCancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: "center", backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0" },
    logoutModalCancelText: { fontSize: 14, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold" },
    logoutModalConfirmBtn: { flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: 14, backgroundColor: "#DC2626" },
    logoutModalConfirmText: { fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
var modalStyles = react_native_1.StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
    sheet: { backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, paddingBottom: 40 },
    handle: { width: 40, height: 4, backgroundColor: "#E2E8F0", borderRadius: 2, alignSelf: "center", marginBottom: 16 },
    title: { fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 4 },
    cmpId: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginBottom: 2 },
    cmpName: { fontSize: 13, color: "#475569", fontFamily: "Inter_400Regular", marginBottom: 4, lineHeight: 18 },
    cmpLocation: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 16 },
    cmpLocationText: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    label: { fontSize: 10, fontWeight: "700", color: "#94A3B8", letterSpacing: 1, fontFamily: "Inter_600SemiBold", marginBottom: 8 },
    optionRow: { flexDirection: "row", gap: 10, marginBottom: 16 },
    optionBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: 12, borderWidth: 1.5, backgroundColor: "white" },
    optionText: { fontSize: 12, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    noteInput: { borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 13, color: "#0F172A", fontFamily: "Inter_400Regular", height: 90, marginBottom: 16, outlineWidth: 0 },
    btnRow: { flexDirection: "row", gap: 10 },
    cancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: "center", backgroundColor: "#F1F5F9" },
    cancelBtnText: { fontSize: 14, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold" },
    confirmBtn: { flex: 2, borderRadius: 14, overflow: "hidden" },
    confirmBtnGrad: { paddingVertical: 14, alignItems: "center" },
    confirmBtnText: { fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
var pStyles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F0FDF4" },
    header: { paddingHorizontal: 20, paddingBottom: 16, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    profileHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
    profileNavBtn: { flexDirection: "row", alignItems: "center", gap: 4, paddingVertical: 6, paddingRight: 10, paddingLeft: 2 },
    profileEditBtn: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.18)", paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20 },
    profileNavBtnText: { fontSize: 14, fontWeight: "600", color: "rgba(255,255,255,0.92)", fontFamily: "Inter_600SemiBold" },
    headerContent: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 16 },
    avatarLarge: { width: 56, height: 56, borderRadius: 28, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" },
    avatarText: { fontSize: 22, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    headerText: { flex: 1 },
    userName: { fontSize: 20, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
    rolePillRow: { flexDirection: "row", alignItems: "center", gap: 8, marginTop: 4 },
    rolePill: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
    rolePillText: { fontSize: 10, fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "Inter_600SemiBold" },
    roleSub: { fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "Inter_400Regular" },
    infoRow: { flexDirection: "row", gap: 10, marginTop: 6 },
    infoChip: { flexDirection: "row", alignItems: "center", gap: 4 },
    infoChipText: { fontSize: 10, color: "rgba(255,255,255,0.55)", fontFamily: "Inter_400Regular" },
    statsRow: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 14, paddingVertical: 12, paddingHorizontal: 6 },
    statItem: { flex: 1, alignItems: "center" },
    statNum: { fontSize: 20, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    statLabel: { fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "Inter_400Regular", marginTop: 2 },
    statDiv: { width: 1, backgroundColor: "rgba(255,255,255,0.15)", marginVertical: 4 },
    scroll: { flex: 1 },
    section: { marginBottom: 16 },
    sectionLabel: { fontSize: 10, fontWeight: "700", color: "#94A3B8", letterSpacing: 1.2, fontFamily: "Inter_600SemiBold", marginBottom: 8, paddingLeft: 2 },
    card: { backgroundColor: "white", borderRadius: 16, overflow: "hidden", shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
    detailRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 14 },
    rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    detailIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    detailLabel: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", marginBottom: 2 },
    detailValue: { fontSize: 14, fontWeight: "600", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    appInfoCard: { alignItems: "center", paddingVertical: 20, marginBottom: 12 },
    appInfoBrand: { fontSize: 18, fontWeight: "900", color: "#C2410C", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
    appInfoTagline: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 4 },
    appInfoVersion: { fontSize: 10, color: "#CBD5E1", fontFamily: "Inter_400Regular", marginTop: 2 },
    logoutBtn: { backgroundColor: "#FEE2E2", borderRadius: 16, borderWidth: 1.5, borderColor: "#FECACA", marginBottom: 8 },
    logoutInner: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 16 },
    logoutText: { fontSize: 15, fontWeight: "700", color: "#DC2626", fontFamily: "Inter_700Bold" },
});
