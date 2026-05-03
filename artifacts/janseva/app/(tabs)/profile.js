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
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ProfileScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var ImagePicker = require("expo-image-picker");
var Haptics = require("expo-haptics");
var AuthContext_1 = require("@/context/AuthContext");
var ComplaintContext_1 = require("@/context/ComplaintContext");
var LanguageContext_1 = require("@/context/LanguageContext");
var TabBarVisibilityContext_1 = require("@/context/TabBarVisibilityContext");
var mumbaiServices_1 = require("@/data/mumbaiServices");
var DecorativeCircles_1 = require("@/components/DecorativeCircles");
var TopShade_1 = require("@/components/TopShade");
var roleConfig = {
    citizen: {
        label: "Citizen", subLabel: "नागरिक", icon: "user",
        color: "#EA580C", bg: "#FFF7ED",
        grad: ["#C2410C", "#EA580C", "#FB923C"],
    },
    nagarsevak: {
        label: "Nagarsevak", subLabel: "नगरसेवक", icon: "briefcase",
        color: "#16A34A", bg: "#DCFCE7",
        grad: ["#166534", "#16A34A", "#22C55E"],
    },
};
var usefulLinks = [
    { label: "AMC Official Website", url: "https://ambernathmc.org", icon: "globe" },
    { label: "Maharashtra Govt Portal", url: "https://maharashtra.gov.in", icon: "globe" },
    { label: "RTI Portal", url: "https://rtionline.gov.in", icon: "file-text" },
    { label: "Aadhaar Services", url: "https://uidai.gov.in", icon: "user" },
];
function AvatarWithPhoto(_a) {
    var name = _a.name, color = _a.color, photoUri = _a.photoUri, _b = _a.size, size = _b === void 0 ? 72 : _b, onPress = _a.onPress;
    var initials = name.split(" ").map(function (n) { return n[0]; }).join("").slice(0, 2).toUpperCase();
    return (<react_native_1.TouchableOpacity onPress={onPress} activeOpacity={0.85} style={{ position: "relative" }}>
      {photoUri ? (<react_native_1.Image source={{ uri: photoUri }} style={{
                width: size, height: size, borderRadius: size / 2,
                borderWidth: 3, borderColor: "rgba(255,255,255,0.5)",
            }}/>) : (<react_native_1.View style={{
                width: size, height: size, borderRadius: size / 2, backgroundColor: color,
                alignItems: "center", justifyContent: "center",
                borderWidth: 3, borderColor: "rgba(255,255,255,0.4)",
            }}>
          <react_native_1.Text style={{ fontSize: size * 0.35, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" }}>
            {initials}
          </react_native_1.Text>
        </react_native_1.View>)}
      <react_native_1.View style={styles.cameraOverlay}>
        <vector_icons_1.Feather name="camera" size={11} color="white"/>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
}
function ProfileScreen() {
    var _this = this;
    var _a, _b;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var router = (0, expo_router_1.useRouter)();
    var _c = (0, AuthContext_1.useAuth)(), user = _c.user, logout = _c.logout, updateUser = _c.updateUser;
    var complaints = (0, ComplaintContext_1.useComplaints)().complaints;
    var _d = (0, LanguageContext_1.useLanguage)(), language = _d.language, setLanguage = _d.setLanguage, t = _d.t;
    var handleScroll = (0, TabBarVisibilityContext_1.useTabBarVisibility)().handleScroll;
    var _e = (0, react_1.useState)(false), showLogoutModal = _e[0], setShowLogoutModal = _e[1];
    var _f = (0, react_1.useState)(false), showLangModal = _f[0], setShowLangModal = _f[1];
    var _g = (0, react_1.useState)(false), showEditModal = _g[0], setShowEditModal = _g[1];
    var _h = (0, react_1.useState)(false), showWardPicker = _h[0], setShowWardPicker = _h[1];
    var _j = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.name) || ""), editName = _j[0], setEditName = _j[1];
    var _k = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.ward) || ""), editWard = _k[0], setEditWard = _k[1];
    if (!user) {
        return (<react_native_1.View style={styles.root}>
        <expo_linear_gradient_1.LinearGradient colors={["#7C2D12", "#C2410C", "#EA580C"]} style={[styles.header, { paddingTop: topPad + 12, alignItems: "center", paddingBottom: 48 }]}>
          <react_native_1.View style={styles.guestIcon}>
            <vector_icons_1.Feather name="user" size={36} color="#EA580C"/>
          </react_native_1.View>
          <react_native_1.Text style={[styles.userName, { textAlign: "center", marginTop: 14 }]}>Welcome to Connect T</react_native_1.Text>
          <react_native_1.Text style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontFamily: "Inter_400Regular", marginTop: 4 }}>
            Login to access your profile
          </react_native_1.Text>
        </expo_linear_gradient_1.LinearGradient>
        <react_native_1.View style={{ padding: 20 }}>
          <react_native_1.TouchableOpacity style={styles.loginBtn} onPress={function () { return router.push("/login"); }} activeOpacity={0.85}>
            <expo_linear_gradient_1.LinearGradient colors={["#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.loginBtnGrad}>
              <vector_icons_1.Feather name="log-in" size={18} color="white"/>
              <react_native_1.Text style={styles.loginBtnText}>Login / Sign Up</react_native_1.Text>
            </expo_linear_gradient_1.LinearGradient>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>);
    }
    var rc = roleConfig[user.role] || roleConfig.citizen;
    var totalComplaints = complaints.length;
    var activeCount = complaints.filter(function (c) { return ["submitted", "assigned", "in_progress"].includes(c.status); }).length;
    var resolvedCount = complaints.filter(function (c) { return c.status === "resolved"; }).length;
    var handleLogout = function () { return setShowLogoutModal(true); };
    var confirmLogout = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setShowLogoutModal(false);
                return [4 /*yield*/, logout()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    }); }); };
    var pickPhoto = function () { return __awaiter(_this, void 0, void 0, function () {
        var status_1, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(react_native_1.Platform.OS !== "web")) return [3 /*break*/, 2];
                    return [4 /*yield*/, ImagePicker.requestMediaLibraryPermissionsAsync()];
                case 1:
                    status_1 = (_a.sent()).status;
                    if (status_1 !== "granted") {
                        react_native_1.Alert.alert("Permission needed", "Please allow photo library access to set your profile photo.");
                        return [2 /*return*/];
                    }
                    _a.label = 2;
                case 2: return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ["images"],
                        allowsEditing: true,
                        aspect: [1, 1],
                        quality: 0.8,
                    })];
                case 3:
                    result = _a.sent();
                    if (!(!result.canceled && result.assets[0])) return [3 /*break*/, 5];
                    return [4 /*yield*/, updateUser({ profilePhoto: result.assets[0].uri })];
                case 4:
                    _a.sent();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    _a.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var openEditModal = function () {
        setEditName(user.name);
        setEditWard(user.ward || "");
        setShowEditModal(true);
    };
    var saveProfile = function () { return __awaiter(_this, void 0, void 0, function () {
        var newWard, wardWasChanged;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editName.trim())
                        return [2 /*return*/];
                    newWard = editWard || user.ward;
                    wardWasChanged = !!user.ward && newWard !== user.ward;
                    return [4 /*yield*/, updateUser({
                            name: editName.trim(),
                            ward: newWard,
                            wardChanged: user.wardChanged || wardWasChanged,
                        })];
                case 1:
                    _a.sent();
                    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                    setShowEditModal(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var switchPortal = function () {
        router.replace("/portal-select");
    };
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={rc.grad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12, overflow: "hidden" }]}>
        <TopShade_1.default height={100}/>
        <DecorativeCircles_1.default />
        <react_native_1.View style={styles.headerContent}>
          <AvatarWithPhoto name={user.name} color={rc.color} photoUri={user.profilePhoto} onPress={pickPhoto}/>
          <react_native_1.View style={styles.headerText}>
            <react_native_1.View style={styles.nameEditRow}>
              <react_native_1.Text style={styles.userName} numberOfLines={1}>{user.name}</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={openEditModal} style={styles.editProfileBtn} activeOpacity={0.8}>
                <vector_icons_1.Feather name="edit-2" size={12} color="rgba(255,255,255,0.9)"/>
                <react_native_1.Text style={styles.editProfileBtnText}>Edit</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
            <react_native_1.View style={styles.rolePillRow}>
              <react_native_1.View style={styles.rolePill}>
                <vector_icons_1.Feather name={rc.icon} size={11} color="rgba(255,255,255,0.9)"/>
                <react_native_1.Text style={styles.rolePillText}>{rc.label}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.Text style={styles.roleSub}>{rc.subLabel}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.TouchableOpacity style={styles.switchPortalBtn} onPress={switchPortal} activeOpacity={0.85}>
              <vector_icons_1.Feather name="refresh-cw" size={12} color="#EA580C"/>
              <react_native_1.Text style={styles.switchPortalText}>Switch to portal</react_native_1.Text>
            </react_native_1.TouchableOpacity>
            <react_native_1.View style={styles.infoRow}>
              <react_native_1.View style={styles.infoChipRow}>
                <vector_icons_1.Feather name="map-pin" size={10} color="rgba(255,255,255,0.55)"/>
                <react_native_1.Text style={styles.infoChipText}>{user.ward || "Ward 1 — Shivaji Chowk"}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={styles.infoChipRow}>
                <vector_icons_1.Feather name="phone" size={10} color="rgba(255,255,255,0.55)"/>
                <react_native_1.Text style={styles.infoChipText}>+91 {user.mobile}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.View style={styles.statsRow}>
          <react_native_1.View style={styles.statItem}>
            <react_native_1.Text style={styles.statNum}>{totalComplaints}</react_native_1.Text>
            <react_native_1.Text style={styles.statLabel}>Total</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.statDiv}/>
          <react_native_1.View style={styles.statItem}>
            <react_native_1.Text style={[styles.statNum, { color: "#FDE68A" }]}>{activeCount}</react_native_1.Text>
            <react_native_1.Text style={styles.statLabel}>Active</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={styles.statDiv}/>
          <react_native_1.View style={styles.statItem}>
            <react_native_1.Text style={[styles.statNum, { color: "#6EE7B7" }]}>{resolvedCount}</react_native_1.Text>
            <react_native_1.Text style={styles.statLabel}>Resolved</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 8) + 70 }]} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        {user.role === "nagarsevak" && (<react_native_1.View style={styles.section}>
            <react_native_1.TouchableOpacity onPress={function () { return router.push("/(tabs)/admin"); }} activeOpacity={0.85} style={styles.adminCard}>
              <expo_linear_gradient_1.LinearGradient colors={["#166534", "#16A34A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.adminCardGrad}>
                <react_native_1.View style={styles.adminCardIcon}>
                  <vector_icons_1.Feather name="briefcase" size={22} color="white"/>
                </react_native_1.View>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={styles.adminCardTitle}>{t("nagarsevakPanel")}</react_native_1.Text>
                  <react_native_1.Text style={styles.adminCardSub}>{t("viewResolveWard")}</react_native_1.Text>
                </react_native_1.View>
                <vector_icons_1.Feather name="chevron-right" size={18} color="rgba(255,255,255,0.6)"/>
              </expo_linear_gradient_1.LinearGradient>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>)}

        {/* Quick Actions */}
        <react_native_1.View style={styles.section}>
          <react_native_1.Text style={styles.sectionLabel}>QUICK ACTIONS</react_native_1.Text>
          <react_native_1.View style={styles.card}>
            {[
            { icon: "edit-3", label: "My Complaints", sub: "View and track all complaints", color: "#EA580C", bg: "#FFF7ED", onPress: function () { return router.push("/(tabs)/complaints"); } },
            { icon: "rss", label: "News Feed", sub: "Ward updates & announcements", color: "#7C3AED", bg: "#F5F3FF", onPress: function () { return router.push("/(tabs)/feed"); } },
            { icon: "phone-call", label: "Emergency", sub: "Quick access to help numbers", color: "#DC2626", bg: "#FEE2E2", onPress: function () { return router.push("/(tabs)/emergency"); } },
        ].map(function (item, idx, arr) { return (<react_native_1.TouchableOpacity key={item.label} style={[styles.actionRow, idx < arr.length - 1 && styles.rowBorder]} onPress={item.onPress} activeOpacity={0.8}>
                <react_native_1.View style={[styles.actionIcon, { backgroundColor: item.bg }]}>
                  <vector_icons_1.Feather name={item.icon} size={16} color={item.color}/>
                </react_native_1.View>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={styles.actionLabel}>{item.label}</react_native_1.Text>
                  <react_native_1.Text style={styles.actionSub}>{item.sub}</react_native_1.Text>
                </react_native_1.View>
                <vector_icons_1.Feather name="chevron-right" size={16} color="#CBD5E1"/>
              </react_native_1.TouchableOpacity>); })}
          </react_native_1.View>
        </react_native_1.View>

        {/* Account Details */}
        <react_native_1.View style={styles.section}>
          <react_native_1.View style={styles.sectionLabelRow}>
            <react_native_1.Text style={styles.sectionLabel}>ACCOUNT DETAILS</react_native_1.Text>
            <react_native_1.TouchableOpacity onPress={openEditModal} activeOpacity={0.8} style={styles.editLinkBtn}>
              <vector_icons_1.Feather name="edit-2" size={11} color="#EA580C"/>
              <react_native_1.Text style={styles.editLinkText}>Edit Profile</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
          <react_native_1.View style={styles.card}>
            {[
            { icon: "user", label: "Full Name", value: user.name },
            { icon: "phone", label: "Mobile", value: "+91 " + user.mobile },
            { icon: "map-pin", label: "Ward", value: user.ward || "Ward 1 — Shivaji Chowk" },
            { icon: "shield", label: "Role", value: rc.label + " · " + rc.subLabel },
        ].map(function (item, idx, arr) { return (<react_native_1.View key={item.label} style={[styles.actionRow, idx < arr.length - 1 && styles.rowBorder]}>
                <react_native_1.View style={[styles.actionIcon, { backgroundColor: rc.bg }]}>
                  <vector_icons_1.Feather name={item.icon} size={14} color={rc.color}/>
                </react_native_1.View>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={styles.actionSub}>{item.label}</react_native_1.Text>
                  <react_native_1.Text style={styles.actionLabel}>{item.value}</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>); })}
          </react_native_1.View>
        </react_native_1.View>

        {/* Language */}
        <react_native_1.View style={styles.section}>
          <react_native_1.Text style={styles.sectionLabel}>{t("language").toUpperCase()}</react_native_1.Text>
          <react_native_1.View style={styles.card}>
            <react_native_1.TouchableOpacity style={styles.actionRow} onPress={function () { return setShowLangModal(true); }} activeOpacity={0.8}>
              <react_native_1.View style={[styles.actionIcon, { backgroundColor: "#FFF7ED" }]}>
                <vector_icons_1.Feather name="globe" size={16} color="#EA580C"/>
              </react_native_1.View>
              <react_native_1.View style={{ flex: 1 }}>
                <react_native_1.Text style={styles.actionLabel}>{t("changeLanguage")}</react_native_1.Text>
                <react_native_1.Text style={styles.actionSub}>
                  {(_a = LanguageContext_1.languageOptions.find(function (l) { return l.code === language; })) === null || _a === void 0 ? void 0 : _a.nativeLabel} ({(_b = LanguageContext_1.languageOptions.find(function (l) { return l.code === language; })) === null || _b === void 0 ? void 0 : _b.label})
                </react_native_1.Text>
              </react_native_1.View>
              <vector_icons_1.Feather name="chevron-right" size={16} color="#CBD5E1"/>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>

        {/* Useful Links */}
        <react_native_1.View style={styles.section}>
          <react_native_1.Text style={styles.sectionLabel}>{t("usefulLinks").toUpperCase()}</react_native_1.Text>
          <react_native_1.View style={styles.card}>
            {usefulLinks.map(function (link, idx, arr) { return (<react_native_1.TouchableOpacity key={link.label} style={[styles.actionRow, idx < arr.length - 1 && styles.rowBorder]} onPress={function () { return react_native_1.Linking.openURL(link.url); }} activeOpacity={0.8}>
                <react_native_1.View style={[styles.actionIcon, { backgroundColor: "#FFF7ED" }]}>
                  <vector_icons_1.Feather name={link.icon} size={14} color="#EA580C"/>
                </react_native_1.View>
                <react_native_1.Text style={[styles.actionLabel, { flex: 1 }]}>{link.label}</react_native_1.Text>
                <vector_icons_1.Feather name="external-link" size={14} color="#94A3B8"/>
              </react_native_1.TouchableOpacity>); })}
          </react_native_1.View>
        </react_native_1.View>

        {/* App Info */}
        <react_native_1.View style={styles.appInfoCard}>
          <react_native_1.Text style={styles.appInfoBrand}>Connect T</react_native_1.Text>
          <react_native_1.Text style={styles.appInfoTagline}>Civic Services · सबका साथ, सबका विकास</react_native_1.Text>
          <react_native_1.Text style={styles.appInfoVersion}>v1.0</react_native_1.Text>
        </react_native_1.View>

        {/* Logout */}
        <react_native_1.TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.85}>
          <react_native_1.View style={styles.logoutInner}>
            <vector_icons_1.Feather name="log-out" size={18} color="#DC2626"/>
            <react_native_1.Text style={styles.logoutText}>Logout</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>
      </react_native_1.ScrollView>

      {/* Edit Profile Modal */}
      <react_native_1.Modal visible={showEditModal} transparent animationType="slide" onRequestClose={function () { return setShowEditModal(false); }}>
        <react_native_1.View style={styles.modalOverlay}>
          <react_native_1.View style={[styles.modalSheet, { paddingBottom: 28 }]}>
            <react_native_1.View style={styles.modalHandle}/>
            <react_native_1.View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 20 }}>
              <react_native_1.Text style={styles.modalTitle}>Edit Profile</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={function () { return setShowEditModal(false); }} style={styles.modalCloseBtn}>
                <vector_icons_1.Feather name="x" size={18} color="#64748B"/>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>

            <react_native_1.TouchableOpacity onPress={pickPhoto} activeOpacity={0.85} style={styles.photoEditRow}>
              {user.profilePhoto ? (<react_native_1.Image source={{ uri: user.profilePhoto }} style={styles.photoEditThumb}/>) : (<react_native_1.View style={[styles.photoEditThumb, { backgroundColor: rc.color, alignItems: "center", justifyContent: "center" }]}>
                  <react_native_1.Text style={{ fontSize: 22, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" }}>
                    {user.name.charAt(0).toUpperCase()}
                  </react_native_1.Text>
                </react_native_1.View>)}
              <react_native_1.View style={{ flex: 1 }}>
                <react_native_1.Text style={styles.photoEditLabel}>Profile Photo</react_native_1.Text>
                <react_native_1.Text style={styles.photoEditSub}>Tap to change from gallery</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={styles.photoEditBtn}>
                <vector_icons_1.Feather name="camera" size={16} color="#EA580C"/>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>

            <react_native_1.View style={styles.fieldGroup}>
              <react_native_1.Text style={styles.fieldLabel}>FULL NAME</react_native_1.Text>
              <react_native_1.TextInput style={styles.fieldInput} value={editName} onChangeText={setEditName} placeholder="Enter your name" placeholderTextColor="#94A3B8" autoCapitalize="words"/>
            </react_native_1.View>

            <react_native_1.View style={styles.fieldGroup}>
              <react_native_1.Text style={styles.fieldLabel}>WARD</react_native_1.Text>
              <react_native_1.TouchableOpacity style={[styles.fieldInput, { justifyContent: "center", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }, user.wardChanged && { backgroundColor: "#F1F5F9", borderColor: "#E2E8F0" }]} onPress={function () { if (!user.wardChanged)
        setShowWardPicker(true); }} activeOpacity={user.wardChanged ? 1 : 0.8} disabled={!!user.wardChanged}>
                <react_native_1.Text style={{ color: editWard ? (user.wardChanged ? "#64748B" : "#0F172A") : "#94A3B8", fontSize: 14, fontFamily: "Inter_400Regular" }}>
                  {editWard || "Select your ward"}
                </react_native_1.Text>
                {user.wardChanged && <vector_icons_1.Feather name="lock" size={14} color="#94A3B8"/>}
              </react_native_1.TouchableOpacity>
              <react_native_1.Text style={{ fontSize: 11, color: user.wardChanged ? "#94A3B8" : "#64748B", fontFamily: "Inter_400Regular", marginTop: 6, lineHeight: 15 }}>
                {user.wardChanged
            ? "Ward has already been updated. It can only be changed once."
            : "You can update your ward only once."}
              </react_native_1.Text>
            </react_native_1.View>

            <react_native_1.View style={styles.editBtnRow}>
              <react_native_1.TouchableOpacity onPress={function () { return setShowEditModal(false); }} style={styles.cancelEditBtn} activeOpacity={0.8}>
                <react_native_1.Text style={styles.cancelEditText}>Cancel</react_native_1.Text>
              </react_native_1.TouchableOpacity>
              <react_native_1.TouchableOpacity onPress={saveProfile} activeOpacity={0.85} style={styles.saveEditBtnWrap}>
                <expo_linear_gradient_1.LinearGradient colors={["#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveEditBtn}>
                  <vector_icons_1.Feather name="check" size={16} color="white"/>
                  <react_native_1.Text style={styles.saveEditText}>Save Changes</react_native_1.Text>
                </expo_linear_gradient_1.LinearGradient>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>

      {/* Ward Picker Modal */}
      <react_native_1.Modal visible={showWardPicker} transparent animationType="slide" onRequestClose={function () { return setShowWardPicker(false); }}>
        <react_native_1.View style={styles.modalOverlay}>
          <react_native_1.View style={[styles.modalSheet, { maxHeight: "75%", paddingBottom: 20 }]}>
            <react_native_1.View style={styles.modalHandle}/>
            <react_native_1.View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 16 }}>
              <react_native_1.Text style={styles.modalTitle}>Select Ward</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={function () { return setShowWardPicker(false); }} style={styles.modalCloseBtn}>
                <vector_icons_1.Feather name="x" size={18} color="#64748B"/>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
            <react_native_1.ScrollView style={{ width: "100%" }} showsVerticalScrollIndicator={false}>
              {mumbaiServices_1.ambernathWards.map(function (ward) { return (<react_native_1.TouchableOpacity key={ward} style={[styles.wardOption, editWard === ward && styles.wardOptionActive]} onPress={function () { setEditWard(ward); setShowWardPicker(false); }} activeOpacity={0.8}>
                  <react_native_1.Text style={[styles.wardOptionText, editWard === ward && { color: "#EA580C", fontWeight: "700" }]}>{ward}</react_native_1.Text>
                  {editWard === ward && <vector_icons_1.Feather name="check-circle" size={18} color="#EA580C"/>}
                </react_native_1.TouchableOpacity>); })}
            </react_native_1.ScrollView>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>

      {/* Language Selection Modal */}
      <react_native_1.Modal visible={showLangModal} transparent animationType="fade" onRequestClose={function () { return setShowLangModal(false); }}>
        <react_native_1.View style={styles.modalOverlay}>
          <react_native_1.View style={styles.modalSheet}>
            <react_native_1.View style={styles.modalIconWrap}>
              <vector_icons_1.Feather name="globe" size={28} color="#EA580C"/>
            </react_native_1.View>
            <react_native_1.Text style={styles.modalTitle}>{t("selectLanguage")}</react_native_1.Text>
            <react_native_1.View style={{ width: "100%", gap: 8, marginTop: 8 }}>
              {LanguageContext_1.languageOptions.map(function (opt) { return (<react_native_1.TouchableOpacity key={opt.code} style={[styles.langOption, language === opt.code && styles.langOptionActive]} onPress={function () { setLanguage(opt.code); setShowLangModal(false); }} activeOpacity={0.8}>
                  <react_native_1.View style={{ flex: 1 }}>
                    <react_native_1.Text style={[styles.langOptionLabel, language === opt.code && { color: "#EA580C" }]}>{opt.nativeLabel}</react_native_1.Text>
                    <react_native_1.Text style={styles.langOptionSub}>{opt.label}</react_native_1.Text>
                  </react_native_1.View>
                  {language === opt.code && <vector_icons_1.Feather name="check-circle" size={20} color="#EA580C"/>}
                </react_native_1.TouchableOpacity>); })}
            </react_native_1.View>
            <react_native_1.TouchableOpacity style={styles.modalCancelBtn} onPress={function () { return setShowLangModal(false); }} activeOpacity={0.8}>
              <react_native_1.Text style={styles.modalCancelText}>{t("cancel")}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>

      {/* Logout Confirmation Modal */}
      <react_native_1.Modal visible={showLogoutModal} transparent animationType="fade" onRequestClose={function () { return setShowLogoutModal(false); }}>
        <react_native_1.View style={styles.modalOverlay}>
          <react_native_1.View style={styles.modalSheet}>
            <react_native_1.View style={[styles.modalIconWrap, { backgroundColor: "#FEE2E2" }]}>
              <vector_icons_1.Feather name="log-out" size={28} color="#DC2626"/>
            </react_native_1.View>
            <react_native_1.Text style={styles.modalTitle}>Logout</react_native_1.Text>
            <react_native_1.Text style={styles.modalBody}>Are you sure you want to logout from Connect T?</react_native_1.Text>
            <react_native_1.View style={styles.modalBtnRow}>
              <react_native_1.TouchableOpacity style={styles.modalCancelBtn} onPress={function () { return setShowLogoutModal(false); }} activeOpacity={0.8}>
                <react_native_1.Text style={styles.modalCancelText}>Cancel</react_native_1.Text>
              </react_native_1.TouchableOpacity>
              <react_native_1.TouchableOpacity style={styles.modalLogoutBtn} onPress={confirmLogout} activeOpacity={0.85}>
                <vector_icons_1.Feather name="log-out" size={15} color="white"/>
                <react_native_1.Text style={styles.modalLogoutText}>Yes, Logout</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 14, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    guestIcon: {
        width: 80, height: 80, borderRadius: 40,
        backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center",
        borderWidth: 2, borderColor: "rgba(255,255,255,0.3)",
    },
    cameraOverlay: {
        position: "absolute", bottom: 0, right: 0,
        width: 24, height: 24, borderRadius: 12,
        backgroundColor: "#EA580C", alignItems: "center", justifyContent: "center",
        borderWidth: 2, borderColor: "white",
    },
    headerContent: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12 },
    headerText: { flex: 1, gap: 3 },
    nameEditRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    editProfileBtn: {
        flexDirection: "row", alignItems: "center", gap: 4,
        backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 8, paddingVertical: 3,
        borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.25)",
    },
    editProfileBtnText: { fontSize: 10, fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "Inter_600SemiBold" },
    infoRow: { flexDirection: "row", alignItems: "center", gap: 12, flexWrap: "wrap" },
    userName: { fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3, flex: 1 },
    rolePillRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    rolePill: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.15)", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
    rolePillText: { fontSize: 11, fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "Inter_700Bold" },
    roleSub: { fontSize: 11, color: "rgba(255,255,255,0.5)", fontFamily: "Inter_400Regular" },
    switchPortalBtn: { flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start", backgroundColor: "white", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, marginTop: 10 },
    switchPortalText: { fontSize: 12, color: "#EA580C", fontFamily: "Inter_600SemiBold", fontWeight: "700" },
    infoChipRow: { flexDirection: "row", alignItems: "center", gap: 5 },
    infoChipText: { fontSize: 11, color: "rgba(255,255,255,0.55)", fontFamily: "Inter_400Regular" },
    statsRow: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 14, padding: 10, alignItems: "center" },
    statItem: { flex: 1, alignItems: "center" },
    statNum: { fontSize: 24, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    statLabel: { fontSize: 10, color: "rgba(255,255,255,0.55)", fontFamily: "Inter_400Regular", marginTop: 2 },
    statDiv: { width: 1, height: 32, backgroundColor: "rgba(255,255,255,0.2)" },
    scroll: { flex: 1 },
    content: { padding: 16, gap: 0 },
    section: { marginBottom: 20 },
    sectionLabelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8, paddingLeft: 2 },
    sectionLabel: { fontSize: 10, fontWeight: "700", color: "#94A3B8", letterSpacing: 1.2, fontFamily: "Inter_600SemiBold" },
    editLinkBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
    editLinkText: { fontSize: 11, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    card: { backgroundColor: "white", borderRadius: 18, overflow: "hidden", shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
    actionRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingVertical: 14, gap: 12 },
    rowBorder: { borderBottomWidth: 1, borderBottomColor: "#F8FAFC" },
    actionIcon: { width: 38, height: 38, borderRadius: 11, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    actionLabel: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    actionSub: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 1 },
    adminCard: { borderRadius: 18, overflow: "hidden", shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 5 },
    adminCardGrad: { flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
    adminCardIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    adminCardTitle: { fontSize: 15, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    adminCardSub: { fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular", marginTop: 2 },
    appInfoCard: { backgroundColor: "white", borderRadius: 18, padding: 20, alignItems: "center", marginBottom: 16, shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6, elevation: 1 },
    appInfoBrand: { fontSize: 22, fontWeight: "900", color: "#C2410C", fontFamily: "Inter_700Bold", letterSpacing: -0.5 },
    appInfoTagline: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 4, textAlign: "center" },
    appInfoVersion: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 6 },
    logoutBtn: { backgroundColor: "#FEE2E2", borderRadius: 16, borderWidth: 1.5, borderColor: "#FECACA", marginBottom: 8 },
    logoutInner: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 16 },
    logoutText: { fontSize: 15, fontWeight: "700", color: "#DC2626", fontFamily: "Inter_700Bold" },
    loginBtn: { borderRadius: 16, overflow: "hidden" },
    loginBtnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 16 },
    loginBtnText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", alignItems: "center", justifyContent: "flex-end", padding: 0 },
    modalSheet: {
        backgroundColor: "white", borderTopLeftRadius: 28, borderTopRightRadius: 28,
        width: "100%", padding: 24, alignItems: "center", gap: 12,
        shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.15, shadowRadius: 24, elevation: 12,
    },
    modalHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: "#E2E8F0", marginBottom: 4 },
    modalCloseBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center" },
    modalIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center", marginBottom: 4 },
    modalTitle: { fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    modalBody: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 20 },
    modalBtnRow: { flexDirection: "row", gap: 10, width: "100%", marginTop: 8 },
    modalCancelBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: "center", backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0" },
    modalCancelText: { fontSize: 14, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold" },
    modalLogoutBtn: { flex: 2, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: 14, backgroundColor: "#DC2626" },
    modalLogoutText: { fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    photoEditRow: { flexDirection: "row", alignItems: "center", gap: 14, width: "100%", backgroundColor: "#F8FAFC", padding: 14, borderRadius: 16, marginBottom: 4 },
    photoEditThumb: { width: 56, height: 56, borderRadius: 28, flexShrink: 0 },
    photoEditLabel: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    photoEditSub: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 2 },
    photoEditBtn: { width: 36, height: 36, borderRadius: 12, backgroundColor: "#FFF7ED", borderWidth: 1.5, borderColor: "#FED7AA", alignItems: "center", justifyContent: "center" },
    fieldGroup: { width: "100%", marginBottom: 4 },
    fieldLabel: { fontSize: 9, fontWeight: "700", color: "#94A3B8", letterSpacing: 1.2, fontFamily: "Inter_600SemiBold", marginBottom: 6, paddingLeft: 2 },
    fieldInput: {
        backgroundColor: "#F8FAFC", borderRadius: 14, borderWidth: 1.5, borderColor: "#E2E8F0",
        paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0F172A",
        fontFamily: "Inter_400Regular", outlineWidth: 0,
    },
    editBtnRow: { flexDirection: "row", gap: 10, width: "100%", marginTop: 8 },
    cancelEditBtn: { flex: 1, paddingVertical: 14, borderRadius: 14, alignItems: "center", backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0" },
    cancelEditText: { fontSize: 14, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold" },
    saveEditBtnWrap: { flex: 2, borderRadius: 14, overflow: "hidden" },
    saveEditBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14 },
    saveEditText: { fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    wardOption: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderRadius: 12, marginBottom: 6, backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#F1F5F9" },
    wardOptionActive: { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" },
    wardOptionText: { fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular" },
    langOption: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 14, borderRadius: 14, backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#F1F5F9" },
    langOptionActive: { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" },
    langOptionLabel: { fontSize: 15, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    langOptionSub: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 1 },
});
