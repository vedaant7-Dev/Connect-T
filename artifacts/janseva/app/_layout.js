"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.default = RootLayout;
require("../global.css");
var inter_1 = require("@expo-google-fonts/inter");
var react_query_1 = require("@tanstack/react-query");
var expo_router_1 = require("expo-router");
var SplashScreen = require("expo-splash-screen");
var expo_status_bar_1 = require("expo-status-bar");
var react_1 = require("react");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var vector_icons_1 = require("@expo/vector-icons");
var ErrorBoundary_1 = require("@/components/ErrorBoundary");
var AppSplash_1 = require("@/components/AppSplash");
var ComplaintContext_1 = require("@/context/ComplaintContext");
var AlertContext_1 = require("@/context/AlertContext");
var AuthContext_1 = require("@/context/AuthContext");
var FeedContext_1 = require("@/context/FeedContext");
var LanguageContext_1 = require("@/context/LanguageContext");
var TabBarVisibilityContext_1 = require("@/context/TabBarVisibilityContext");
SplashScreen.preventAutoHideAsync();
var queryClient = new react_query_1.QueryClient();
function AuthGate(_a) {
    var children = _a.children;
    var _b = (0, AuthContext_1.useAuth)(), user = _b.user, loading = _b.loading;
    var router = (0, expo_router_1.useRouter)();
    var segments = (0, expo_router_1.useSegments)();
    (0, react_1.useEffect)(function () {
        if (loading)
            return;
        var inLogin = segments[0] === "login";
        var inTabs = segments[0] === "(tabs)";
        var inJobs = segments[0] === "jobs";
        var inPortalSelect = segments[0] === "portal-select";
        var currentTab = inTabs ? segments[1] : undefined;
        if (inJobs)
            return;
        if (inPortalSelect)
            return;
        if (!user && !inLogin) {
            router.replace("/login");
        }
        else if (user && inLogin) {
            router.replace(user.role === "nagarsevak" ? "/(tabs)/admin" : "/(tabs)/");
        }
        else if (user && user.role === "nagarsevak" && inTabs && currentTab !== "admin") {
            router.replace("/(tabs)/admin");
        }
    }, [user, loading, segments]);
    return <>{children}</>;
}
function AppShell(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)(false), splashDone = _b[0], setSplashDone = _b[1];
    var _c = (0, AuthContext_1.useAuth)(), user = _c.user, loading = _c.loading;
    (0, react_1.useEffect)(function () {
        if (!loading && user) {
            setSplashDone(true);
            expo_router_1.router.replace(user.role === "nagarsevak" ? "/(tabs)/admin" : "/(tabs)/");
        }
    }, [user, loading]);
    var handleFinish = function (portal) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (portal === "civic") {
                setSplashDone(true);
                expo_router_1.router.replace(user ? (user.role === "nagarsevak" ? "/(tabs)/admin" : "/(tabs)/") : "/login");
            }
            else {
                setSplashDone(true);
                expo_router_1.router.replace("/jobs/login");
            }
            return [2 /*return*/];
        });
    }); };
    return (<>
      {children}
      {!splashDone && <AppSplash_1.AppSplash onFinish={handleFinish}/>}
    </>);
}
function RootLayoutNav() {
    return (<expo_router_1.Stack screenOptions={{ headerShown: false }}>
      <expo_router_1.Stack.Screen name="login" options={{ headerShown: false, animation: "fade" }}/>
      <expo_router_1.Stack.Screen name="portal-select" options={{ headerShown: false, animation: "fade" }}/>
      <expo_router_1.Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <expo_router_1.Stack.Screen name="jobs" options={{ headerShown: false, animation: "fade" }}/>
      <expo_router_1.Stack.Screen name="complaint/new" options={{ headerShown: false, presentation: "modal" }}/>
      <expo_router_1.Stack.Screen name="complaint/[id]" options={{ headerShown: false }}/>
      <expo_router_1.Stack.Screen name="complaint/list" options={{ headerShown: false }}/>
      <expo_router_1.Stack.Screen name="alert/new" options={{ headerShown: false, presentation: "modal" }}/>
      <expo_router_1.Stack.Screen name="alert/list" options={{ headerShown: false }}/>
      <expo_router_1.Stack.Screen name="service/[id]" options={{ headerShown: false }}/>
    </expo_router_1.Stack>);
}
function RootLayout() {
    var _a = (0, inter_1.useFonts)(__assign(__assign({}, vector_icons_1.Feather.font), { Inter_400Regular: inter_1.Inter_400Regular, Inter_500Medium: inter_1.Inter_500Medium, Inter_600SemiBold: inter_1.Inter_600SemiBold, Inter_700Bold: inter_1.Inter_700Bold })), fontsLoaded = _a[0], fontError = _a[1];
    var _b = (0, react_1.useState)(false), assetsReady = _b[0], setAssetsReady = _b[1];
    (0, react_1.useEffect)(function () {
        setAssetsReady(true);
    }, []);
    (0, react_1.useEffect)(function () {
        if ((fontsLoaded || fontError) && assetsReady) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError, assetsReady]);
    if ((!fontsLoaded && !fontError) || !assetsReady)
        return null;
    return (<react_native_safe_area_context_1.SafeAreaProvider>
      <expo_status_bar_1.StatusBar style="light" translucent backgroundColor="transparent"/>
      <ErrorBoundary_1.ErrorBoundary>
        <react_query_1.QueryClientProvider client={queryClient}>
          <LanguageContext_1.LanguageProvider>
            <AuthContext_1.AuthProvider>
              <AlertContext_1.AlertProvider>
              <ComplaintContext_1.ComplaintProvider>
                <FeedContext_1.FeedProvider>
                  <react_native_gesture_handler_1.GestureHandlerRootView style={{ flex: 1 }}>
                    <TabBarVisibilityContext_1.TabBarVisibilityProvider>
                      <AppShell>
                        <AuthGate>
                          <RootLayoutNav />
                        </AuthGate>
                      </AppShell>
                    </TabBarVisibilityContext_1.TabBarVisibilityProvider>
                  </react_native_gesture_handler_1.GestureHandlerRootView>
                </FeedContext_1.FeedProvider>
              </ComplaintContext_1.ComplaintProvider>
              </AlertContext_1.AlertProvider>
            </AuthContext_1.AuthProvider>
          </LanguageContext_1.LanguageProvider>
        </react_query_1.QueryClientProvider>
      </ErrorBoundary_1.ErrorBoundary>
    </react_native_safe_area_context_1.SafeAreaProvider>);
}
