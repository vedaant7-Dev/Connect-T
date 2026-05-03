"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradientHeader = GradientHeader;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var DecorativeCircles_1 = require("./DecorativeCircles");
var TopShade_1 = require("./TopShade");
function GradientHeader(_a) {
    var title = _a.title, subtitle = _a.subtitle, rightComponent = _a.rightComponent;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPadding = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    return (<expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPadding + 12, overflow: "hidden" }]}>
      <TopShade_1.default height={100}/>
      <DecorativeCircles_1.default />
      <react_native_1.View style={styles.row}>
        <react_native_1.View style={styles.textBlock}>
          <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
          {subtitle ? <react_native_1.Text style={styles.subtitle}>{subtitle}</react_native_1.Text> : null}
        </react_native_1.View>
        {rightComponent ? <react_native_1.View>{rightComponent}</react_native_1.View> : null}
      </react_native_1.View>
    </expo_linear_gradient_1.LinearGradient>);
}
var styles = react_native_1.StyleSheet.create({
    header: {
        paddingHorizontal: 20,
        paddingBottom: 18,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
    },
    textBlock: {
        flex: 1,
    },
    title: {
        fontSize: 22,
        fontWeight: "800",
        color: "#FFFFFF",
        letterSpacing: -0.3,
        fontFamily: "Inter_700Bold",
    },
    subtitle: {
        fontSize: 13,
        color: "rgba(255,255,255,0.65)",
        marginTop: 2,
        fontFamily: "Inter_400Regular",
    },
});
