"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TabLayout;
var expo_router_1 = require("expo-router");
var vector_icons_1 = require("@expo/vector-icons");
var expo_blur_1 = require("expo-blur");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_reanimated_1 = require("react-native-reanimated");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var LanguageContext_1 = require("@/context/LanguageContext");
var TabBarVisibilityContext_1 = require("@/context/TabBarVisibilityContext");
var AuthContext_1 = require("@/context/AuthContext");
var ComplaintBubbleIcon_1 = require("@/components/ComplaintBubbleIcon");
function AnimatedTabBar(props) {
    var state = props.state, descriptors = props.descriptors, navigation = props.navigation;
    var tabBarAnimatedStyle = (0, TabBarVisibilityContext_1.useTabBarVisibility)().tabBarAnimatedStyle;
    var colorScheme = (0, react_native_1.useColorScheme)();
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var isDark = colorScheme === "dark";
    var isIOS = react_native_1.Platform.OS === "ios";
    var isWeb = react_native_1.Platform.OS === "web";
    var BOTTOM_INSET = isWeb ? 14 : Math.max(insets.bottom, 8);
    var TAB_HEIGHT = (isWeb ? 58 : 56) + BOTTOM_INSET;
    return (<react_native_reanimated_1.default.View style={[
            {
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: TAB_HEIGHT,
            },
            tabBarAnimatedStyle,
        ]}>
      <react_native_1.View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, overflow: "hidden", borderTopWidth: 1, borderTopColor: "#E2E8F0" }}>
        {isIOS ? (<expo_blur_1.BlurView intensity={100} tint={isDark ? "dark" : "light"} style={react_native_1.StyleSheet.absoluteFill}/>) : (<react_native_1.View style={[react_native_1.StyleSheet.absoluteFill, { backgroundColor: "#FFFFFF" }]}/>)}
      </react_native_1.View>
      <react_native_1.View style={{ flex: 1, flexDirection: "row", alignItems: "center", paddingBottom: BOTTOM_INSET }}>
        {state.routes.map(function (route, index) {
            var options = descriptors[route.key].options;
            if (options.href === null || route.name === "services" || route.name === "admin" || route.name === "emergency")
                return null;
            var isFocused = state.index === index;
            var tintColor = isFocused ? "#EA580C" : "#94A3B8";
            var onPress = function () {
                var event = navigation.emit({
                    type: "tabPress",
                    target: route.key,
                    canPreventDefault: true,
                });
                if (!isFocused && !event.defaultPrevented) {
                    navigation.navigate(route.name, route.params);
                }
            };
            var onLongPress = function () {
                navigation.emit({
                    type: "tabLongPress",
                    target: route.key,
                });
            };
            var iconMap = {
                index: "home",
                feed: "rss",
                profile: "user",
            };
            var label = typeof options.title === "string" ? options.title : route.name;
            return (<react_native_1.TouchableOpacity key={route.key} onPress={onPress} onLongPress={onLongPress} activeOpacity={0.8} style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingTop: 6 }} accessibilityRole="button" accessibilityState={isFocused ? { selected: true } : {}} accessibilityLabel={label}>
              {route.name === "complaints" ? (<ComplaintBubbleIcon_1.default color={tintColor} size={22}/>) : (<vector_icons_1.Feather name={(iconMap[route.name] || "circle")} size={22} color={tintColor}/>)}
              <react_native_1.Text style={{
                    fontSize: 12,
                    fontWeight: "700",
                    fontFamily: "Inter_700Bold",
                    marginTop: 3,
                    color: tintColor,
                }}>
                {label}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>);
        })}
      </react_native_1.View>
    </react_native_reanimated_1.default.View>);
}
function TabLayout() {
    var t = (0, LanguageContext_1.useLanguage)().t;
    var user = (0, AuthContext_1.useAuth)().user;
    var isNagarsevak = (user === null || user === void 0 ? void 0 : user.role) === "nagarsevak";
    return (<expo_router_1.Tabs tabBar={function (props) { return isNagarsevak ? null : <AnimatedTabBar {...props}/>; }} screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#EA580C",
            tabBarInactiveTintColor: "#94A3B8",
        }}>
      <expo_router_1.Tabs.Screen name="index" options={{
            title: t("home"),
            href: isNagarsevak ? null : undefined,
        }}/>

      <expo_router_1.Tabs.Screen name="emergency" options={{ href: null }}/>
      <expo_router_1.Tabs.Screen name="complaints" options={{
            title: t("complaints"),
            href: isNagarsevak ? null : undefined,
        }}/>

      <expo_router_1.Tabs.Screen name="feed" options={{
            title: t("feed"),
            href: isNagarsevak ? null : undefined,
        }}/>

      <expo_router_1.Tabs.Screen name="profile" options={{
            title: t("profile"),
            href: isNagarsevak ? null : undefined,
        }}/>

      <expo_router_1.Tabs.Screen name="services" options={{ href: null }}/>
      <expo_router_1.Tabs.Screen name="admin" options={{ href: null }}/>
    </expo_router_1.Tabs>);
}
