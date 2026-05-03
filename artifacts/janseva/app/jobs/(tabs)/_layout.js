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
exports.default = JobsTabLayout;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_router_1 = require("expo-router");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var vector_icons_1 = require("@expo/vector-icons");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
function JobsTabBar() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var router = (0, expo_router_1.useRouter)();
    var pathname = (0, expo_router_1.usePathname)();
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var TAB_H = react_native_1.Platform.OS === "web" ? 64 : 56 + Math.max(insets.bottom, 8);
    var TABS = __spreadArray(__spreadArray([
        { name: "index", label: "Jobs", icon: "home", path: "/jobs/(tabs)" }
    ], ((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.role) === "employer"
        ? [{ name: "post", label: "Post Job", icon: "plus-circle", path: "/jobs/(tabs)/post" }]
        : [{ name: "applied", label: "Applied", icon: "check-circle", path: "/jobs/(tabs)/applied" }]), true), [
        { name: "profile", label: "Profile", icon: "user", path: "/jobs/(tabs)/profile" },
    ], false);
    return (<react_native_1.View style={[styles.tabBar, { height: TAB_H, paddingBottom: Math.max(insets.bottom, 8) }]}>
      {TABS.map(function (tab) {
            var active = pathname === tab.path ||
                pathname.startsWith("".concat(tab.path, "/")) ||
                (tab.name === "index" && (pathname === "/jobs/(tabs)/index" || pathname === "/jobs/(tabs)"));
            return (<react_native_1.TouchableOpacity key={tab.name} style={styles.tabItem} onPress={function () { return router.replace(tab.path); }} activeOpacity={0.7}>
            <react_native_1.View style={[styles.tabIconWrap, active && styles.tabIconWrapActive]}>
              <vector_icons_1.Feather name={tab.icon} size={20} color={active ? "#EA580C" : "#94A3B8"}/>
            </react_native_1.View>
            <react_native_1.Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</react_native_1.Text>
          </react_native_1.TouchableOpacity>);
        })}
    </react_native_1.View>);
}
function JobsTabLayout() {
    return (<expo_router_1.Tabs screenOptions={{ headerShown: false }} tabBar={function () { return <JobsTabBar />; }}>
      <expo_router_1.Tabs.Screen name="index"/>
      <expo_router_1.Tabs.Screen name="post"/>
      <expo_router_1.Tabs.Screen name="applied"/>
      <expo_router_1.Tabs.Screen name="profile"/>
    </expo_router_1.Tabs>);
}
var styles = react_native_1.StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#FED7AA",
        shadowColor: "#EA580C",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: -3 },
        elevation: 10,
    },
    tabItem: { flex: 1, alignItems: "center", justifyContent: "center", gap: 3, paddingTop: 8 },
    tabIconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center" },
    tabIconWrapActive: { backgroundColor: "#FFF7ED" },
    tabLabel: { fontSize: 10, fontWeight: "600", color: "#94A3B8", fontFamily: "Inter_600SemiBold" },
    tabLabelActive: { color: "#EA580C", fontFamily: "Inter_700Bold" },
});
