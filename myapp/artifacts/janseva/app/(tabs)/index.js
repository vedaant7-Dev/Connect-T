"use strict";
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
exports.default = HomeScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var expo_video_1 = require("expo-video");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Haptics = require("expo-haptics");
var expo_router_1 = require("expo-router");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var UtilityCard_1 = require("@/components/UtilityCard");
var DecorativeCircles_1 = require("@/components/DecorativeCircles");
var TopShade_1 = require("@/components/TopShade");
var SectionHeader_1 = require("@/components/SectionHeader");
var mumbaiServices_1 = require("@/data/mumbaiServices");
var AuthContext_1 = require("@/context/AuthContext");
var TabBarVisibilityContext_1 = require("@/context/TabBarVisibilityContext");
var LanguageContext_1 = require("@/context/LanguageContext");
var AlertContext_1 = require("@/context/AlertContext");
var ComplaintContext_1 = require("@/context/ComplaintContext");
var quickServices = [
    { id: "hospital", label: "Hospitals", icon: "activity", color: "#DC2626", bg: "#FEE2E2" },
    { id: "childHospital", label: "Child Care", icon: "heart", color: "#7C3AED", bg: "#EDE9FE" },
    { id: "clinic", label: "Clinics", icon: "plus-circle", color: "#059669", bg: "#D1FAE5" },
    { id: "police", label: "Police", icon: "shield", color: "#B45309", bg: "#FFEDD5" },
    { id: "bank", label: "Banks", icon: "credit-card", color: "#D97706", bg: "#FEF3C7" },
    { id: "postOffice", label: "Post Office", icon: "mail", color: "#0EA5E9", bg: "#BAE6FD" },
    { id: "school", label: "Schools", icon: "book-open", color: "#7C3AED", bg: "#EDE9FE" },
    { id: "shamshanbhumi", label: "Crematorium", icon: "wind", color: "#475569", bg: "#F1F5F9" },
];
function getGreetingKey() {
    var hour = new Date().getHours();
    if (hour < 12)
        return "goodMorning";
    if (hour < 17)
        return "goodAfternoon";
    return "goodEvening";
}
function getRoleColor(role) {
    if (role === "nagarsevak")
        return { bg: "#ECFDF5", text: "#059669", border: "#A7F3D0" };
    return { bg: "#FFF7ED", text: "#EA580C", border: "#FED7AA" };
}
function getRoleLabelKey(role) {
    if (role === "nagarsevak")
        return "nagarsevak";
    return "citizen";
}
function InlineVideo(_a) {
    var uri = _a.uri, style = _a.style;
    var player = (0, expo_video_1.useVideoPlayer)(uri, function (videoPlayer) {
        videoPlayer.loop = false;
    });
    return (<expo_video_1.VideoView style={style} player={player} allowsFullscreen allowsPictureInPicture nativeControls contentFit="cover"/>);
}
function HomeScreen() {
    var _a;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var router = (0, expo_router_1.useRouter)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var user = (0, AuthContext_1.useAuth)().user;
    var t = (0, LanguageContext_1.useLanguage)().t;
    var handleScroll = (0, TabBarVisibilityContext_1.useTabBarVisibility)().handleScroll;
    var allAlerts = (0, AlertContext_1.useAlerts)().alerts;
    var complaints = (0, ComplaintContext_1.useComplaints)().complaints;
    var _b = (0, react_1.useState)(null), selectedAlert = _b[0], setSelectedAlert = _b[1];
    var _c = (0, react_1.useState)(false), showNotifPanel = _c[0], setShowNotifPanel = _c[1];
    var _d = (0, react_1.useState)(null), selectedUtility = _d[0], setSelectedUtility = _d[1];
    var _e = (0, react_1.useState)([]), readAlertIds = _e[0], setReadAlertIds = _e[1];
    var roleColor = getRoleColor(user === null || user === void 0 ? void 0 : user.role);
    var readAlertsKey = "connectt_read_alerts_".concat((user === null || user === void 0 ? void 0 : user.id) || "guest");
    var alerts = allAlerts.filter(function (a) { return !a.ward || (!!(user === null || user === void 0 ? void 0 : user.ward) && (0, AlertContext_1.wardKey)(a.ward) === (0, AlertContext_1.wardKey)(user.ward)); });
    var alertItems = alerts.filter(function (item) { return item.type === "alert"; });
    var newsItems = alerts.filter(function (item) { return item.type === "news"; });
    var myComplaints = complaints.filter(function (c) {
        return ((user === null || user === void 0 ? void 0 : user.mobile) && c.userMobile === user.mobile) ||
            ((user === null || user === void 0 ? void 0 : user.name) && c.userName === user.name);
    });
    var complaintNotifs = myComplaints.filter(function (c) { return c.status === "assigned" || c.status === "in_progress" || c.status === "resolved"; });
    var notifItems = __spreadArray(__spreadArray([], complaintNotifs.map(function (c) { return ({ kind: "complaint", id: "c-".concat(c.id), createdAt: c.updatedAt || c.createdAt, complaint: c }); }), true), newsItems.map(function (a) { return ({ kind: "news", id: "n-".concat(a.id), createdAt: a.createdAt, alert: a }); }), true).sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
    (0, react_1.useEffect)(function () {
        async_storage_1.default.getItem(readAlertsKey)
            .then(function (stored) {
            if (stored)
                setReadAlertIds(JSON.parse(stored));
        })
            .catch(function () { });
    }, [readAlertsKey]);
    var markAlertsRead = function (ids) {
        if (ids.length === 0)
            return;
        var merged = Array.from(new Set(__spreadArray(__spreadArray([], readAlertIds, true), ids, true)));
        setReadAlertIds(merged);
        async_storage_1.default.setItem(readAlertsKey, JSON.stringify(merged)).catch(function () { });
    };
    var openNotifications = function () {
        setShowNotifPanel(true);
        var ids = notifItems.map(function (i) { return (i.kind === "news" ? i.alert.id : i.complaint.id); });
        markAlertsRead(ids);
    };
    var openAlertDetail = function (item) {
        markAlertsRead([item.id]);
        setSelectedAlert(item);
    };
    var notifCount = notifItems.filter(function (i) {
        var aid = i.kind === "news" ? i.alert.id : i.complaint.id;
        return !readAlertIds.includes(aid);
    }).length;
    var handleCall = function (number) {
        if (react_native_1.Platform.OS !== "web")
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        react_native_1.Linking.openURL("tel:".concat(number));
    };
    var handleServiceTap = function (categoryId) {
        if (react_native_1.Platform.OS !== "web")
            Haptics.selectionAsync();
        router.push({ pathname: "/(tabs)/services", params: { category: categoryId } });
    };
    var greeting = "".concat(t(getGreetingKey()), ", ").concat(((_a = user === null || user === void 0 ? void 0 : user.name) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) || t("citizen"), " \uD83D\uDC4B");
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12, overflow: "hidden" }]}>
        <TopShade_1.default height={100}/>
        <DecorativeCircles_1.default />
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={styles.greeting}>{greeting}</react_native_1.Text>
            <react_native_1.View style={styles.metaRow}>
              <react_native_1.View style={[styles.rolePill, { backgroundColor: roleColor.bg + "33", borderColor: "rgba(255,255,255,0.3)" }]}>
                <vector_icons_1.Feather name={(user === null || user === void 0 ? void 0 : user.role) === "nagarsevak" ? "briefcase" : "user"} size={9} color="rgba(255,255,255,0.8)"/>
                <react_native_1.Text style={styles.rolePillText}>{t(getRoleLabelKey(user === null || user === void 0 ? void 0 : user.role))}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.Text style={styles.wardText}>{(user === null || user === void 0 ? void 0 : user.ward) || "Ambernath"}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={styles.headerRight}>
            <react_native_1.TouchableOpacity style={styles.notifBtn} activeOpacity={0.82} onPress={openNotifications}>
              <vector_icons_1.Feather name="bell" size={18} color="white"/>
              {notifCount > 0 && (<react_native_1.View style={styles.notifBadge}>
                  <react_native_1.Text style={styles.notifBadgeText}>{notifCount}</react_native_1.Text>
                </react_native_1.View>)}
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>

      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 8) + 60 }]} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>

        {/* ALERTS & NEWS */}
        <react_native_1.View style={styles.alertsSection}>
          <react_native_1.View style={styles.alertsSectionHeader}>
            <react_native_1.View style={styles.alertsSectionTitleRow}>
              <react_native_1.View style={styles.alertsDot}/>
              <react_native_1.Text style={styles.alertsSectionTitle}>{t("alerts")}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.alertsLivePill}>
              <react_native_1.View style={styles.alertsLiveDot}/>
              <react_native_1.Text style={styles.alertsLiveText}>{t("live")}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          {alertItems.length === 0 ? (<react_native_1.View style={styles.alertsEmpty}>
              <vector_icons_1.Feather name="bell-off" size={20} color="#CBD5E1"/>
              <react_native_1.Text style={styles.alertsEmptyText}>No alerts right now</react_native_1.Text>
            </react_native_1.View>) : (<react_native_1.View style={styles.alertCardList}>
              {alertItems.map(function (item) {
                var _a, _b;
                var cardColor = "#DC2626";
                var cardBg = "#FEE2E2";
                var timeStr = (function () {
                    var diff = Date.now() - new Date(item.createdAt).getTime();
                    var mins = Math.floor(diff / 60000);
                    var hours = Math.floor(mins / 60);
                    var days = Math.floor(hours / 24);
                    if (days > 0)
                        return "".concat(days, "d ago");
                    if (hours > 0)
                        return "".concat(hours, "h ago");
                    if (mins > 0)
                        return "".concat(mins, "m ago");
                    return "just now";
                })();
                return (<react_native_1.TouchableOpacity key={item.id} style={styles.alertCard} activeOpacity={0.88} onPress={function () { return openAlertDetail(item); }}>
                    {((_a = item.media) === null || _a === void 0 ? void 0 : _a.type) === "image" ? (<react_native_1.Image source={{ uri: item.media.uri }} style={styles.alertCardMedia}/>) : ((_b = item.media) === null || _b === void 0 ? void 0 : _b.type) === "video" ? (<InlineVideo uri={item.media.uri} style={styles.alertCardVideo}/>) : (<react_native_1.View style={[styles.alertCardIcon, { backgroundColor: cardBg }]}>
                        <vector_icons_1.Feather name="alert-triangle" size={16} color={cardColor}/>
                      </react_native_1.View>)}
                    <react_native_1.View style={styles.alertCardBody}>
                      <react_native_1.View style={styles.alertCardRow}>
                        <react_native_1.View style={[styles.alertTypePill, { backgroundColor: cardBg }]}>
                          <react_native_1.Text style={[styles.alertTypeText, { color: cardColor }]}>
                            ⚠ {t("alert")}
                          </react_native_1.Text>
                        </react_native_1.View>
                        <react_native_1.Text style={styles.alertCardTime}>{timeStr}</react_native_1.Text>
                      </react_native_1.View>
                      <react_native_1.Text style={styles.alertCardTitle}>{item.title}</react_native_1.Text>
                      {!!item.location && (<react_native_1.View style={styles.alertLocationRow}>
                          <vector_icons_1.Feather name="map-pin" size={10} color="#94A3B8"/>
                          <react_native_1.Text style={styles.alertLocationText} numberOfLines={1}>{item.location}</react_native_1.Text>
                        </react_native_1.View>)}
                      <react_native_1.Text style={styles.alertCardDesc} numberOfLines={2}>{item.body}</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.TouchableOpacity>);
            })}
            </react_native_1.View>)}
        </react_native_1.View>

        {/* REPORT A PROBLEM CTA */}
        <react_native_1.TouchableOpacity style={styles.complaintCTA} onPress={function () { return router.push("/complaint/new"); }} activeOpacity={0.88}>
          <expo_linear_gradient_1.LinearGradient colors={["#15803D", "#16A34A", "#22C55E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.complaintCTAGrad}>
            <react_native_1.View style={styles.complaintCTAIcon}>
              <vector_icons_1.Feather name="camera" size={24} color="white"/>
            </react_native_1.View>
            <react_native_1.View style={{ flex: 1 }}>
              <react_native_1.Text style={styles.complaintCTATitle}>{t("reportProblem")}</react_native_1.Text>
              <react_native_1.Text style={styles.complaintCTASub}>{t("reportProblemSub")}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.complaintCTAArrow}>
              <vector_icons_1.Feather name="arrow-right" size={18} color="white"/>
            </react_native_1.View>
          </expo_linear_gradient_1.LinearGradient>
        </react_native_1.TouchableOpacity>

        {/* UTILITY STATUS */}
        <SectionHeader_1.SectionHeader title={t("utilityStatus")}/>
        <react_native_1.View style={styles.utilityRow}>
          <UtilityCard_1.UtilityCard title={t("waterSupply")} value="14" unit={t("hoursDay")} status={t("reduced")} statusOk={false} icon="droplet" gradColors={["#0EA5E9", "#0EA5E9"]} lastUpdated="2 hrs ago" onPress={function () { return setSelectedUtility("water"); }}/>
          <UtilityCard_1.UtilityCard title={t("electricity")} value="24" unit={t("hoursDay")} status={t("normal")} statusOk={true} icon="zap" gradColors={["#F59E0B", "#F59E0B"]} lastUpdated="30 min ago" onPress={function () { return setSelectedUtility("electricity"); }}/>
        </react_native_1.View>

        {/* QUICK SERVICES */}
        <SectionHeader_1.SectionHeader title={t("quickServices")} actionLabel={t("allServices")} onAction={function () { return router.push("/(tabs)/services"); }}/>
        <react_native_1.View style={styles.servicesCard}>
          <react_native_1.View style={styles.servicesGrid}>
            {Array.from({ length: Math.ceil(quickServices.length / 4) }, function (_, rowIndex) { return quickServices.slice(rowIndex * 4, rowIndex * 4 + 4); }).map(function (row, rowIndex) { return (<react_native_1.View key={"service-row-".concat(rowIndex)} style={styles.serviceRow}>
                {row.map(function (svc) { return (<react_native_1.TouchableOpacity key={svc.id} style={styles.serviceItem} activeOpacity={0.8} onPress={function () { return handleServiceTap(svc.id); }}>
                    <react_native_1.View style={[styles.serviceIcon, { backgroundColor: svc.bg }]}>
                      <vector_icons_1.Feather name={svc.icon} size={24} color={svc.color}/>
                    </react_native_1.View>
                    <react_native_1.Text style={styles.serviceLabel}>{svc.label}</react_native_1.Text>
                  </react_native_1.TouchableOpacity>); })}
              </react_native_1.View>); })}
          </react_native_1.View>
        </react_native_1.View>

        {/* EMERGENCY */}
        <SectionHeader_1.SectionHeader title={t("emergencyContacts")} actionLabel={t("viewAll")} onAction={function () { return router.push("/(tabs)/emergency"); }}/>
        <react_native_1.View style={styles.emergencyGrid}>
          {mumbaiServices_1.emergencyContacts.slice(0, 4).map(function (ec, idx) { return (<react_native_1.TouchableOpacity key={idx} style={styles.emergencyItem} onPress={function () { return handleCall(ec.number); }} activeOpacity={0.8}>
              <react_native_1.View style={[styles.emergencyIconBox, { backgroundColor: ec.bg }]}>
                <vector_icons_1.Feather name={ec.icon} size={20} color={ec.color}/>
              </react_native_1.View>
              <react_native_1.Text style={styles.emergencyName}>{ec.name}</react_native_1.Text>
              <react_native_1.Text style={[styles.emergencyNumber, { color: ec.color }]}>{ec.number}</react_native_1.Text>
            </react_native_1.TouchableOpacity>); })}
        </react_native_1.View>

        {/* PAGE FOOTER */}
        <react_native_1.View style={styles.pageFooter}>
          <react_native_1.Text style={styles.pageFooterBrand}>Connect T</react_native_1.Text>
          <react_native_1.Text style={styles.pageFooterSub}>BJP Member Services · सबका साथ, सबका विकास</react_native_1.Text>
          <react_native_1.Text style={styles.pageFooterVersion}>v1.0</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.ScrollView>

      {/* Notification Panel Modal */}
      <react_native_1.Modal visible={showNotifPanel} transparent animationType="fade" onRequestClose={function () { return setShowNotifPanel(false); }}>
        <react_native_1.View style={styles.modalOverlay}>
          <react_native_1.View style={styles.modalSheet}>
            <react_native_1.View style={styles.notifHeader}>
              <vector_icons_1.Feather name="bell" size={20} color="#EA580C"/>
              <react_native_1.Text style={styles.modalTitle}>Notifications</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 420, width: "100%" }}>
              {notifItems.length === 0 ? (<react_native_1.View style={{ padding: 24, alignItems: "center", gap: 8 }}>
                  <vector_icons_1.Feather name="bell-off" size={32} color="#CBD5E1"/>
                  <react_native_1.Text style={{ fontSize: 13, color: "#94A3B8", fontFamily: "Inter_400Regular" }}>No notifications right now</react_native_1.Text>
                </react_native_1.View>) : notifItems.map(function (item) {
            var timeStr = (function () {
                var diff = Date.now() - new Date(item.createdAt).getTime();
                var mins = Math.floor(diff / 60000);
                var hours = Math.floor(mins / 60);
                var days = Math.floor(hours / 24);
                if (days > 0)
                    return "".concat(days, "d ago");
                if (hours > 0)
                    return "".concat(hours, "h ago");
                if (mins > 0)
                    return "".concat(mins, "m ago");
                return "just now";
            })();
            if (item.kind === "complaint") {
                var c_1 = item.complaint;
                var statusMap = {
                    assigned: { label: "Assigned", color: "#7C3AED", bg: "#EDE9FE", icon: "user-check" },
                    in_progress: { label: "In Progress", color: "#2563EB", bg: "#DBEAFE", icon: "loader" },
                    resolved: { label: "Resolved", color: "#059669", bg: "#D1FAE5", icon: "check-circle" },
                };
                var s = statusMap[c_1.status] || statusMap.assigned;
                return (<react_native_1.TouchableOpacity key={item.id} style={styles.notifItem} activeOpacity={0.8} onPress={function () {
                        markAlertsRead([c_1.id]);
                        setShowNotifPanel(false);
                        setTimeout(function () { return router.push("/complaint/".concat(c_1.id)); }, 200);
                    }}>
                      <react_native_1.View style={[styles.notifItemIcon, { backgroundColor: s.bg }]}>
                        <vector_icons_1.Feather name={s.icon} size={16} color={s.color}/>
                      </react_native_1.View>
                      <react_native_1.View style={{ flex: 1 }}>
                        <react_native_1.View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                          <react_native_1.Text style={styles.notifItemTitle} numberOfLines={1}>{c_1.title}</react_native_1.Text>
                          <react_native_1.Text style={styles.notifItemTime}>{timeStr}</react_native_1.Text>
                        </react_native_1.View>
                        <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                          <react_native_1.View style={{ paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, backgroundColor: s.bg }}>
                            <react_native_1.Text style={{ fontSize: 9, fontWeight: "800", color: s.color, fontFamily: "Inter_700Bold" }}>{s.label.toUpperCase()}</react_native_1.Text>
                          </react_native_1.View>
                          <react_native_1.Text style={styles.notifItemBody} numberOfLines={1}>{c_1.id}</react_native_1.Text>
                        </react_native_1.View>
                      </react_native_1.View>
                    </react_native_1.TouchableOpacity>);
            }
            var a = item.alert;
            return (<react_native_1.TouchableOpacity key={item.id} style={styles.notifItem} activeOpacity={0.8} onPress={function () {
                    markAlertsRead([a.id]);
                    setShowNotifPanel(false);
                    setTimeout(function () { return setSelectedAlert(a); }, 200);
                }}>
                    <react_native_1.View style={[styles.notifItemIcon, { backgroundColor: "#DBEAFE" }]}>
                      <vector_icons_1.Feather name="file-text" size={16} color="#2563EB"/>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 1 }}>
                      <react_native_1.View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 2 }}>
                        <react_native_1.Text style={styles.notifItemTitle} numberOfLines={1}>{a.title}</react_native_1.Text>
                        <react_native_1.Text style={styles.notifItemTime}>{timeStr}</react_native_1.Text>
                      </react_native_1.View>
                      <react_native_1.Text style={styles.notifItemBody} numberOfLines={2}>{a.body}</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.TouchableOpacity>);
        })}
            </react_native_1.ScrollView>
            <react_native_1.TouchableOpacity style={styles.modalCloseBtn} onPress={function () { return setShowNotifPanel(false); }} activeOpacity={0.85}>
              <react_native_1.Text style={styles.modalCloseBtnText}>{t("cancel")}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>

      {/* Utility Detail Modal */}
      <react_native_1.Modal visible={!!selectedUtility} transparent animationType="fade" onRequestClose={function () { return setSelectedUtility(null); }}>
        <react_native_1.View style={styles.modalOverlay}>
          <react_native_1.View style={styles.modalSheet}>
            <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
              {selectedUtility === "water" && (<>
                  <react_native_1.View style={[styles.modalIconWrap, { backgroundColor: "#BAE6FD" }]}>
                    <vector_icons_1.Feather name="droplet" size={28} color="#0EA5E9"/>
                  </react_native_1.View>
                  <react_native_1.Text style={styles.modalTitle}>{t("waterSupply")}</react_native_1.Text>
                  <react_native_1.View style={styles.utilityStatRow}>
                    <react_native_1.View style={styles.utilityStat}>
                      <react_native_1.Text style={[styles.utilityStatNum, { color: "#DC2626" }]}>14</react_native_1.Text>
                      <react_native_1.Text style={styles.utilityStatLabel}>{t("hoursDay")}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={styles.utilityStatDivider}/>
                    <react_native_1.View style={styles.utilityStat}>
                      <react_native_1.Text style={[styles.utilityStatNum, { color: "#D97706" }]}>{t("reduced")}</react_native_1.Text>
                      <react_native_1.Text style={styles.utilityStatLabel}>Status</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>
                  <react_native_1.View style={styles.modalDivider}/>
                  <react_native_1.Text style={styles.modalBody}>
                    Water supply in Ambernath is currently restricted to 14 hours per day due to maintenance work on the main distribution pipeline from Barvi Dam. Station Area East and Vithalwadi areas are most affected with supply available from 6AM–8PM only.{"\n\n"}
                    The AMC Water Department is conducting repairs on the 900mm main pipeline from Barvi Dam. Normal 24-hour supply is expected to resume by 1st May 2025.{"\n\n"}
                    For water tanker requests, contact AMC Water Helpline: 0251-2604100{"\n"}
                    Tanker booking: 0251-2604155
                  </react_native_1.Text>
                  <react_native_1.View style={styles.modalSourceRow}>
                    <vector_icons_1.Feather name="info" size={12} color="#64748B"/>
                    <react_native_1.Text style={styles.modalSourceText}>Source: AMC Water Department · Updated 2 hrs ago</react_native_1.Text>
                  </react_native_1.View>
                </>)}
              {selectedUtility === "electricity" && (<>
                  <react_native_1.View style={[styles.modalIconWrap, { backgroundColor: "#FEF3C7" }]}>
                    <vector_icons_1.Feather name="zap" size={28} color="#D97706"/>
                  </react_native_1.View>
                  <react_native_1.Text style={styles.modalTitle}>{t("electricity")}</react_native_1.Text>
                  <react_native_1.View style={styles.utilityStatRow}>
                    <react_native_1.View style={styles.utilityStat}>
                      <react_native_1.Text style={[styles.utilityStatNum, { color: "#059669" }]}>24</react_native_1.Text>
                      <react_native_1.Text style={styles.utilityStatLabel}>{t("hoursDay")}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={styles.utilityStatDivider}/>
                    <react_native_1.View style={styles.utilityStat}>
                      <react_native_1.Text style={[styles.utilityStatNum, { color: "#059669" }]}>{t("normal")}</react_native_1.Text>
                      <react_native_1.Text style={styles.utilityStatLabel}>Status</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>
                  <react_native_1.View style={styles.modalDivider}/>
                  <react_native_1.Text style={styles.modalBody}>
                    Power supply across Ambernath is currently normal with 24-hour availability. MSEDCL has completed the transformer upgrade at MIDC Area substation.{"\n\n"}
                    Planned maintenance schedule:{"\n"}
                    • MIDC Area substation — Completed{"\n"}
                    • Vithalwadi feeder line — 28 Apr, 10AM-2PM{"\n"}
                    • Old Ambernath substation — No planned outage{"\n\n"}
                    For power complaints, call MSEDCL Helpline: 1912{"\n"}
                    SMS ULHAS to 1912 for outage updates
                  </react_native_1.Text>
                  <react_native_1.View style={styles.modalSourceRow}>
                    <vector_icons_1.Feather name="info" size={12} color="#64748B"/>
                    <react_native_1.Text style={styles.modalSourceText}>Source: MSEDCL Ambernath Division · Updated 30 min ago</react_native_1.Text>
                  </react_native_1.View>
                </>)}
            </react_native_1.ScrollView>
            <react_native_1.TouchableOpacity style={styles.modalCloseBtn} onPress={function () { return setSelectedUtility(null); }} activeOpacity={0.85}>
              <react_native_1.Text style={styles.modalCloseBtnText}>{t("cancel")}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>

      {/* Alert Detail Modal */}
      <react_native_1.Modal visible={!!selectedAlert} transparent animationType="fade" onRequestClose={function () { return setSelectedAlert(null); }}>
        <react_native_1.View style={styles.modalOverlay}>
          <react_native_1.View style={styles.modalSheet}>
            <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 500 }}>
              {selectedAlert && (function () {
            var _a, _b;
            var isAlert = selectedAlert.type === "alert";
            var cardColor = isAlert ? "#DC2626" : "#EA580C";
            var cardBg = isAlert ? "#FEE2E2" : "#FFEDD5";
            var dateStr = new Date(selectedAlert.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
            var timeStr = new Date(selectedAlert.createdAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });
            return (<>
                    <react_native_1.View style={[styles.modalIconWrap, { backgroundColor: cardBg }]}>
                      <vector_icons_1.Feather name={isAlert ? "alert-triangle" : "radio"} size={28} color={cardColor}/>
                    </react_native_1.View>
                    <react_native_1.View style={[styles.modalTypePill, { backgroundColor: cardBg }]}>
                      <react_native_1.Text style={[styles.modalTypeText, { color: cardColor }]}>
                        {isAlert ? "\u26A0 ".concat(t("alert")) : "\uD83D\uDCE2 ".concat(t("news"))}
                      </react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.Text style={styles.modalTitle}>{selectedAlert.title}</react_native_1.Text>
                    <react_native_1.View style={styles.modalMetaRow}>
                      <vector_icons_1.Feather name="calendar" size={12} color="#94A3B8"/>
                      <react_native_1.Text style={styles.modalMetaText}>{dateStr}</react_native_1.Text>
                      <react_native_1.View style={styles.modalMetaDot}/>
                      <vector_icons_1.Feather name="clock" size={12} color="#94A3B8"/>
                      <react_native_1.Text style={styles.modalMetaText}>{timeStr}</react_native_1.Text>
                    </react_native_1.View>
                    {((_a = selectedAlert.media) === null || _a === void 0 ? void 0 : _a.type) === "image" ? (<react_native_1.Image source={{ uri: selectedAlert.media.uri }} style={styles.modalMediaImage}/>) : ((_b = selectedAlert.media) === null || _b === void 0 ? void 0 : _b.type) === "video" ? (<InlineVideo uri={selectedAlert.media.uri} style={styles.modalVideoPlayer}/>) : null}
                    <react_native_1.View style={styles.alertDetailGrid}>
                      {!!selectedAlert.priority && (<react_native_1.View style={styles.alertDetailChip}>
                          <vector_icons_1.Feather name="flag" size={12} color={cardColor}/>
                          <react_native_1.Text style={styles.alertDetailText}>{selectedAlert.priority}</react_native_1.Text>
                        </react_native_1.View>)}
                      {!!selectedAlert.category && (<react_native_1.View style={styles.alertDetailChip}>
                          <vector_icons_1.Feather name="tag" size={12} color={cardColor}/>
                          <react_native_1.Text style={styles.alertDetailText}>{selectedAlert.category}</react_native_1.Text>
                        </react_native_1.View>)}
                      {!!selectedAlert.location && (<react_native_1.View style={styles.alertDetailChip}>
                          <vector_icons_1.Feather name="map-pin" size={12} color={cardColor}/>
                          <react_native_1.Text style={styles.alertDetailText}>{selectedAlert.location}</react_native_1.Text>
                        </react_native_1.View>)}
                      {!!selectedAlert.validUntil && (<react_native_1.View style={styles.alertDetailChip}>
                          <vector_icons_1.Feather name="calendar" size={12} color={cardColor}/>
                          <react_native_1.Text style={styles.alertDetailText}>Valid until {selectedAlert.validUntil}</react_native_1.Text>
                        </react_native_1.View>)}
                      {!!selectedAlert.targetAudience && (<react_native_1.View style={styles.alertDetailChip}>
                          <vector_icons_1.Feather name="users" size={12} color={cardColor}/>
                          <react_native_1.Text style={styles.alertDetailText}>{selectedAlert.targetAudience}</react_native_1.Text>
                        </react_native_1.View>)}
                    </react_native_1.View>
                    <react_native_1.View style={styles.modalDivider}/>
                    <react_native_1.Text style={styles.modalBody}>{selectedAlert.body}</react_native_1.Text>
                    <react_native_1.View style={styles.modalSourceRow}>
                      <vector_icons_1.Feather name="user" size={12} color="#64748B"/>
                      <react_native_1.Text style={styles.modalSourceText}>Posted by: {selectedAlert.postedBy}</react_native_1.Text>
                    </react_native_1.View>
                  </>);
        })()}
            </react_native_1.ScrollView>
            <react_native_1.TouchableOpacity style={styles.modalCloseBtn} onPress={function () { return setSelectedAlert(null); }} activeOpacity={0.85}>
              <react_native_1.Text style={styles.modalCloseBtnText}>{t("cancel")}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 },
    greeting: { fontSize: 18, fontWeight: "800", color: "#FFFFFF", fontFamily: "Inter_700Bold", letterSpacing: -0.3, marginBottom: 6 },
    metaRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    rolePill: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20, borderWidth: 1 },
    rolePillText: { fontSize: 9, fontWeight: "700", color: "rgba(255,255,255,0.85)", fontFamily: "Inter_600SemiBold" },
    wardText: { fontSize: 10, color: "rgba(255,255,255,0.55)", fontFamily: "Inter_400Regular" },
    headerRight: { gap: 6, alignItems: "flex-end" },
    notifBtn: { width: 42, height: 42, borderRadius: 13, backgroundColor: "rgba(255,255,255,0.18)", borderWidth: 1, borderColor: "rgba(255,255,255,0.25)", alignItems: "center", justifyContent: "center" },
    notifBadge: { position: "absolute", top: -4, right: -4, width: 17, height: 17, borderRadius: 9, backgroundColor: "#DC2626", alignItems: "center", justifyContent: "center", borderWidth: 1.5, borderColor: "white" },
    notifBadgeText: { fontSize: 8, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    alertBanner: { flexDirection: "row", gap: 10, backgroundColor: "rgba(255,255,255,0.12)", borderRadius: 14, padding: 12, alignItems: "center" },
    alertIconBox: { width: 28, height: 28, borderRadius: 8, backgroundColor: "rgba(245,158,11,0.2)", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    alertText: { flex: 1 },
    alertTitle: { fontSize: 12, fontWeight: "700", color: "#FDE68A", fontFamily: "Inter_700Bold", marginBottom: 1 },
    alertBody: { fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", lineHeight: 15 },
    scroll: { flex: 1 },
    content: { padding: 16 },
    complaintCTA: { borderRadius: 20, overflow: "hidden", marginBottom: 12, shadowColor: "#B45309", shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 14, elevation: 6 },
    complaintCTAGrad: { flexDirection: "row", alignItems: "center", padding: 18, gap: 14 },
    complaintCTAIcon: { width: 52, height: 52, borderRadius: 16, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    complaintCTAImage: { width: 52, height: 52, flexShrink: 0 },
    complaintCTATitle: { fontSize: 16, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    complaintCTASub: { fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 2 },
    complaintCTAArrow: { width: 34, height: 34, borderRadius: 10, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center" },
    statsRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
    statCard: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 12, alignItems: "center", gap: 4, shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
    statIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", marginBottom: 2 },
    statNum: { fontSize: 16, fontWeight: "900", fontFamily: "Inter_700Bold" },
    statLabel: { fontSize: 8, color: "#94A3B8", fontFamily: "Inter_500Medium", fontWeight: "600", textAlign: "center" },
    complaintsCard: { backgroundColor: "#FFFFFF", borderRadius: 18, overflow: "hidden", marginBottom: 18, shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
    complaintRow: { flexDirection: "row", alignItems: "center", paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
    complaintRowBorder: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    complaintRowIcon: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    complaintRowText: { flex: 1 },
    complaintRowTitle: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    complaintRowLocation: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 1 },
    complaintRowStatus: { flexDirection: "row", alignItems: "center", gap: 3, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 20, flexShrink: 0 },
    complaintRowStatusText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    noComplaintsCard: { backgroundColor: "#FFF7ED", borderRadius: 16, padding: 20, alignItems: "center", gap: 8, marginBottom: 18, borderWidth: 1, borderColor: "#FFEDD5", borderStyle: "dashed" },
    noComplaintsText: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_500Medium", fontWeight: "600" },
    utilityRow: { flexDirection: "row", gap: 10, marginBottom: 18 },
    servicesCard: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 14, marginBottom: 18, shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 },
    servicesGrid: {
        gap: 14,
    },
    serviceRow: {
        flexDirection: "row",
        gap: 8,
    },
    serviceItem: {
        flex: 1,
        alignItems: "center",
        gap: 6,
    },
    serviceIcon: {
        width: 58,
        height: 58,
        borderRadius: 18,
        alignItems: "center",
        justifyContent: "center",
    },
    serviceLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#475569",
        textAlign: "center",
        fontFamily: "Inter_600SemiBold",
        lineHeight: 13,
    },
    emergencyGrid: { flexDirection: "row", gap: 10, marginBottom: 10 },
    emergencyItem: { flex: 1, backgroundColor: "#FFFFFF", borderRadius: 16, padding: 12, alignItems: "center", gap: 4, shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 2 },
    emergencyIconBox: { width: 44, height: 44, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 2 },
    emergencyName: { fontSize: 9, fontWeight: "700", color: "#475569", textAlign: "center", fontFamily: "Inter_600SemiBold" },
    emergencyNumber: { fontSize: 14, fontWeight: "900", fontFamily: "Inter_700Bold" },
    alertsEmpty: { height: 88, borderRadius: 14, borderWidth: 1.5, borderColor: "#E2E8F0", borderStyle: "dashed", backgroundColor: "#F8FAFC", alignItems: "center", justifyContent: "center", gap: 6 },
    alertsEmptyText: { fontSize: 12, color: "#CBD5E1", fontFamily: "Inter_500Medium", fontWeight: "500" },
    alertsSection: { marginBottom: 18 },
    alertsSectionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
    alertsSectionTitleRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    alertsDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#DC2626" },
    alertsSectionTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    alertsLivePill: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#FEE2E2", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 20 },
    alertsLiveDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: "#DC2626" },
    alertsLiveText: { fontSize: 9, fontWeight: "900", color: "#DC2626", fontFamily: "Inter_700Bold", letterSpacing: 1 },
    alertCardList: { gap: 10 },
    alertCard: { width: "100%", minHeight: 108, flexDirection: "row", alignItems: "stretch", gap: 12, backgroundColor: "white", borderRadius: 16, padding: 12, overflow: "hidden", shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: "#F1F5F9" },
    alertCardMedia: { width: 86, minHeight: 84, borderRadius: 14, backgroundColor: "#F8FAFC" },
    alertCardVideo: { width: 86, minHeight: 84, borderRadius: 14, backgroundColor: "#0F172A" },
    alertCardVideoText: { fontSize: 9, fontWeight: "800", fontFamily: "Inter_700Bold", textAlign: "center" },
    alertCardIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", alignSelf: "center" },
    alertCardBody: { flex: 1, paddingVertical: 2 },
    alertCardRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 6 },
    alertTypePill: { paddingHorizontal: 6, paddingVertical: 2, borderRadius: 10 },
    alertTypeText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    alertCardTime: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    alertCardTitle: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 4 },
    alertLocationRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 4 },
    alertLocationText: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", flex: 1 },
    alertCardDesc: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", lineHeight: 16 },
    modalOverlay: {
        flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center", justifyContent: "center", padding: 24,
    },
    modalSheet: {
        backgroundColor: "white", borderRadius: 24, padding: 24, width: "100%",
        maxWidth: 420, alignItems: "center",
        shadowColor: "#000", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.2, shadowRadius: 24, elevation: 12,
    },
    modalIconWrap: {
        width: 64, height: 64, borderRadius: 32,
        alignItems: "center", justifyContent: "center", marginBottom: 12, alignSelf: "center",
    },
    modalTypePill: {
        paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20,
        alignSelf: "center", marginBottom: 10,
    },
    modalTypeText: { fontSize: 11, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    modalTitle: {
        fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold",
        textAlign: "center", marginBottom: 8,
    },
    modalMetaRow: {
        flexDirection: "row", alignItems: "center", gap: 5,
        justifyContent: "center", marginBottom: 12,
    },
    modalMetaText: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    modalMetaDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: "#CBD5E1" },
    modalDivider: { height: 1, backgroundColor: "#F1F5F9", width: "100%", marginBottom: 14 },
    modalMediaImage: { width: "100%", height: 180, borderRadius: 16, marginBottom: 14, backgroundColor: "#F8FAFC" },
    modalVideoBox: { width: "100%", height: 140, borderRadius: 16, alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 14 },
    modalVideoPlayer: { width: "100%", height: 220, borderRadius: 16, marginBottom: 14, backgroundColor: "#0F172A" },
    modalVideoText: { fontSize: 12, fontWeight: "800", fontFamily: "Inter_700Bold" },
    alertDetailGrid: { width: "100%", flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 14 },
    alertDetailChip: { flexDirection: "row", alignItems: "center", gap: 5, paddingHorizontal: 9, paddingVertical: 6, borderRadius: 12, backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0" },
    alertDetailText: { fontSize: 11, color: "#475569", fontFamily: "Inter_600SemiBold", fontWeight: "600", textTransform: "capitalize" },
    modalBody: {
        fontSize: 13, color: "#374151", fontFamily: "Inter_400Regular",
        lineHeight: 20, textAlign: "left", width: "100%",
    },
    modalSourceRow: {
        flexDirection: "row", alignItems: "center", gap: 6,
        marginTop: 14, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#F1F5F9", width: "100%",
    },
    modalSourceText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", flex: 1 },
    modalCloseBtn: {
        width: "100%", paddingVertical: 14, borderRadius: 14, marginTop: 16,
        alignItems: "center", backgroundColor: "#F1F5F9", borderWidth: 1, borderColor: "#E2E8F0",
    },
    modalCloseBtnText: { fontSize: 14, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold" },
    notifHeader: {
        flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14, width: "100%",
    },
    notifItem: {
        flexDirection: "row", alignItems: "flex-start", gap: 10,
        paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F1F5F9",
    },
    notifItemIcon: {
        width: 36, height: 36, borderRadius: 10,
        alignItems: "center", justifyContent: "center", flexShrink: 0,
    },
    notifItemTitle: {
        fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold", flex: 1,
    },
    notifItemTime: {
        fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", flexShrink: 0,
    },
    notifItemBody: {
        fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", lineHeight: 16,
    },
    utilityStatRow: {
        flexDirection: "row", alignItems: "center", justifyContent: "center",
        gap: 20, marginTop: 12, marginBottom: 14,
    },
    utilityStat: { alignItems: "center", gap: 2 },
    utilityStatNum: {
        fontSize: 28, fontWeight: "900", fontFamily: "Inter_700Bold",
    },
    utilityStatLabel: {
        fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular",
    },
    utilityStatDivider: {
        width: 1, height: 40, backgroundColor: "#F1F5F9",
    },
    pageFooter: {
        alignItems: "center",
        paddingVertical: 28,
        paddingHorizontal: 20,
        marginTop: 8,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        gap: 4,
    },
    pageFooterBrand: {
        fontSize: 18,
        fontWeight: "900",
        fontFamily: "Inter_700Bold",
        color: "#EA580C",
        letterSpacing: -0.3,
    },
    pageFooterSub: {
        fontSize: 12,
        color: "#64748B",
        fontFamily: "Inter_400Regular",
        textAlign: "center",
        marginTop: 2,
    },
    pageFooterVersion: {
        fontSize: 11,
        color: "#94A3B8",
        fontFamily: "Inter_400Regular",
        marginTop: 2,
    },
});
