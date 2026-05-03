"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobsLayout;
var react_1 = require("react");
var expo_router_1 = require("expo-router");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
var JobsContext_1 = require("@/context/JobsContext");
function JobsAuthGate(_a) {
    var children = _a.children;
    var _b = (0, JobsAuthContext_1.useJobsAuth)(), jobsUser = _b.jobsUser, loading = _b.loading;
    var router = (0, expo_router_1.useRouter)();
    var segments = (0, expo_router_1.useSegments)();
    (0, react_1.useEffect)(function () {
        if (loading)
            return;
        var inLogin = segments[1] === "login";
        if (!jobsUser && !inLogin) {
            router.replace("/jobs/login");
        }
        else if (jobsUser && inLogin) {
            router.replace("/jobs/(tabs)");
        }
    }, [jobsUser, loading, segments]);
    return <>{children}</>;
}
function JobsLayout() {
    return (<JobsAuthContext_1.JobsAuthProvider>
      <JobsContext_1.JobsProvider>
        <JobsAuthGate>
          <expo_router_1.Stack screenOptions={{ headerShown: false }}>
            <expo_router_1.Stack.Screen name="login" options={{ animation: "fade" }}/>
            <expo_router_1.Stack.Screen name="(tabs)" options={{ animation: "fade" }}/>
            <expo_router_1.Stack.Screen name="search" options={{ animation: "slide_from_right" }}/>
            <expo_router_1.Stack.Screen name="results" options={{ animation: "slide_from_right" }}/>
            <expo_router_1.Stack.Screen name="resume" options={{ animation: "slide_from_bottom", presentation: "modal" }}/>
          </expo_router_1.Stack>
        </JobsAuthGate>
      </JobsContext_1.JobsProvider>
    </JobsAuthContext_1.JobsAuthProvider>);
}
