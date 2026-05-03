"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilityCard = UtilityCard;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var expo_linear_gradient_1 = require("expo-linear-gradient");
function UtilityCard(_a) {
    var title = _a.title, value = _a.value, unit = _a.unit, status = _a.status, statusOk = _a.statusOk, icon = _a.icon, gradColors = _a.gradColors, lastUpdated = _a.lastUpdated, onPress = _a.onPress;
    return (<react_native_1.TouchableOpacity onPress={onPress} activeOpacity={0.88} style={styles.wrapper}>
      <expo_linear_gradient_1.LinearGradient colors={gradColors} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.card}>
        <react_native_1.View style={styles.topRow}>
          <react_native_1.View style={styles.iconWrap}>
            <vector_icons_1.Feather name={icon} size={20} color="white"/>
          </react_native_1.View>
          <react_native_1.View style={[styles.statusPill, { backgroundColor: statusOk ? "rgba(255,255,255,0.25)" : "rgba(254,226,226,0.4)" }]}>
            <react_native_1.View style={[styles.statusDot, { backgroundColor: statusOk ? "#4ADE80" : "#FCA5A5" }]}/>
            <react_native_1.Text style={styles.statusText}>{status}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.Text style={styles.value}>{value}<react_native_1.Text style={styles.unit}> {unit}</react_native_1.Text></react_native_1.Text>
        <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
        <react_native_1.Text style={styles.updated}>Updated {lastUpdated}</react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>
    </react_native_1.TouchableOpacity>);
}
var styles = react_native_1.StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    card: {
        borderRadius: 18,
        padding: 14,
        minHeight: 130,
    },
    topRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
    },
    iconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    statusPill: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 3,
        borderRadius: 20,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 10,
        fontWeight: "700",
        color: "white",
        fontFamily: "Inter_600SemiBold",
    },
    value: {
        fontSize: 26,
        fontWeight: "900",
        color: "white",
        fontFamily: "Inter_700Bold",
        letterSpacing: -0.5,
    },
    unit: {
        fontSize: 13,
        fontWeight: "500",
    },
    title: {
        fontSize: 12,
        color: "rgba(255,255,255,0.75)",
        fontFamily: "Inter_500Medium",
        marginTop: 2,
    },
    updated: {
        fontSize: 9,
        color: "rgba(255,255,255,0.5)",
        fontFamily: "Inter_400Regular",
        marginTop: 6,
    },
});
