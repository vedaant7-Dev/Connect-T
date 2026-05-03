"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmergencyScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Haptics = require("expo-haptics");
var EmergencyButton_1 = require("@/components/EmergencyButton");
var mumbaiServices_1 = require("@/data/mumbaiServices");
var LanguageContext_1 = require("@/context/LanguageContext");
var TabBarVisibilityContext_1 = require("@/context/TabBarVisibilityContext");
function EmergencyScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var t = (0, LanguageContext_1.useLanguage)().t;
    var handleScroll = (0, TabBarVisibilityContext_1.useTabBarVisibility)().handleScroll;
    var tips = [t("tip1"), t("tip2"), t("tip3"), t("tip4")];
    var handleCall = function (number) {
        if (react_native_1.Platform.OS !== "web") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        react_native_1.Linking.openURL("tel:".concat(number));
    };
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#7F1D1D", "#991B1B", "#DC2626", "#EF4444"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.Text style={styles.headerTitle}>{t("emergency")}</react_native_1.Text>
        <react_native_1.Text style={styles.headerSub}>{t("oneTopAccess")}</react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 8) + 80 }]} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}>
        <react_native_1.View style={styles.sosSection}>
          <react_native_1.Text style={styles.sosSectionTitle}>{t("emergencySOS")}</react_native_1.Text>
          <react_native_1.Text style={styles.sosSectionSub}>{t("tapToCallSOS")}</react_native_1.Text>
          <EmergencyButton_1.EmergencyButton />
        </react_native_1.View>

        <react_native_1.View style={styles.dividerRow}>
          <react_native_1.View style={styles.divider}/>
          <react_native_1.Text style={styles.dividerText}>{t("allEmergencyNumbers")}</react_native_1.Text>
          <react_native_1.View style={styles.divider}/>
        </react_native_1.View>

        <react_native_1.View style={styles.contactGrid}>
          {mumbaiServices_1.emergencyContacts.map(function (ec, idx) { return (<react_native_1.TouchableOpacity key={idx} style={styles.contactCard} onPress={function () { return handleCall(ec.number); }} activeOpacity={0.8}>
              <react_native_1.View style={[styles.iconWrap, { backgroundColor: ec.bg }]}>
                <vector_icons_1.Feather name={ec.icon} size={22} color={ec.color}/>
              </react_native_1.View>
              <react_native_1.Text style={styles.contactName}>{ec.name}</react_native_1.Text>
              <react_native_1.View style={[styles.callBadge, { backgroundColor: ec.bg }]}>
                <vector_icons_1.Feather name="phone" size={10} color={ec.color}/>
                <react_native_1.Text style={[styles.callNumber, { color: ec.color }]}>{ec.number}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>); })}
        </react_native_1.View>

        <react_native_1.View style={styles.tipsCard}>
          <react_native_1.View style={styles.tipsHeader}>
            <vector_icons_1.Feather name="info" size={16} color="#EA580C"/>
            <react_native_1.Text style={styles.tipsTitle}>{t("emergencyTips")}</react_native_1.Text>
          </react_native_1.View>
          {tips.map(function (tip, i) { return (<react_native_1.View key={i} style={styles.tipRow}>
              <react_native_1.View style={styles.tipNum}>
                <react_native_1.Text style={styles.tipNumText}>{i + 1}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.Text style={styles.tipText}>{tip}</react_native_1.Text>
            </react_native_1.View>); })}
        </react_native_1.View>

        <react_native_1.View style={styles.nearestCard}>
          <expo_linear_gradient_1.LinearGradient colors={["#7C2D12", "#EA580C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.nearestGrad}>
            <react_native_1.View style={styles.nearestLeft}>
              <vector_icons_1.Feather name="map-pin" size={18} color="white"/>
              <react_native_1.View>
                <react_native_1.Text style={styles.nearestTitle}>{t("nearestHospital")}</react_native_1.Text>
                <react_native_1.Text style={styles.nearestName}>Central Hospital — 2.1 km</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
            <react_native_1.TouchableOpacity style={styles.callBtn} onPress={function () { return handleCall("022-22067676"); }} activeOpacity={0.85}>
              <vector_icons_1.Feather name="phone" size={14} color="#EA580C"/>
              <react_native_1.Text style={styles.callBtnText}>{t("callNow")}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </expo_linear_gradient_1.LinearGradient>
        </react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 18,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28,
    },
    backBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.18)", alignItems: "center", justifyContent: "center", marginBottom: 8 },
    headerTitle: {
        fontSize: 22,
        fontWeight: "800",
        color: "#FFFFFF",
        fontFamily: "Inter_700Bold",
        letterSpacing: -0.3,
        marginBottom: 2,
    },
    headerSub: {
        fontSize: 12,
        color: "rgba(255,255,255,0.7)",
        fontFamily: "Inter_400Regular",
    },
    scroll: { flex: 1 },
    content: { padding: 16 },
    sosSection: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#DC2626",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 16,
        elevation: 4,
    },
    sosSectionTitle: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0F172A",
        fontFamily: "Inter_700Bold",
        marginBottom: 4,
    },
    sosSectionSub: {
        fontSize: 12,
        color: "#64748B",
        fontFamily: "Inter_400Regular",
        marginBottom: 8,
        textAlign: "center",
    },
    dividerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginBottom: 14,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: "#E2E8F0",
    },
    dividerText: {
        fontSize: 10,
        fontWeight: "700",
        color: "#94A3B8",
        fontFamily: "Inter_600SemiBold",
        letterSpacing: 1,
    },
    contactGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,
        marginBottom: 16,
    },
    contactCard: {
        width: "22%",
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 10,
        alignItems: "center",
        gap: 6,
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    iconWrap: {
        width: 48,
        height: 48,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    contactName: {
        fontSize: 9,
        fontWeight: "700",
        color: "#334155",
        textAlign: "center",
        fontFamily: "Inter_600SemiBold",
    },
    callBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 20,
    },
    callNumber: {
        fontSize: 11,
        fontWeight: "900",
        fontFamily: "Inter_700Bold",
    },
    tipsCard: {
        backgroundColor: "#FFF7ED",
        borderRadius: 18,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#FFEDD5",
    },
    tipsHeader: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    tipsTitle: {
        fontSize: 14,
        fontWeight: "800",
        color: "#EA580C",
        fontFamily: "Inter_700Bold",
    },
    tipRow: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 10,
        marginBottom: 8,
    },
    tipNum: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: "#EA580C",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        marginTop: 1,
    },
    tipNumText: {
        fontSize: 10,
        fontWeight: "700",
        color: "white",
        fontFamily: "Inter_700Bold",
    },
    tipText: {
        fontSize: 12,
        color: "#EA580C",
        fontFamily: "Inter_400Regular",
        flex: 1,
        lineHeight: 18,
    },
    nearestCard: {
        borderRadius: 18,
        overflow: "hidden",
        marginBottom: 16,
    },
    nearestGrad: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 16,
    },
    nearestLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flex: 1,
    },
    nearestTitle: {
        fontSize: 10,
        color: "rgba(255,255,255,0.7)",
        fontFamily: "Inter_400Regular",
    },
    nearestName: {
        fontSize: 13,
        fontWeight: "700",
        color: "white",
        fontFamily: "Inter_700Bold",
    },
    callBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "white",
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 10,
    },
    callBtnText: {
        fontSize: 12,
        fontWeight: "700",
        color: "#EA580C",
        fontFamily: "Inter_700Bold",
    },
});
