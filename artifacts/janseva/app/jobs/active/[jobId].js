"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ActiveJobDetailsScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var expo_router_1 = require("expo-router");
var JobsContext_1 = require("@/context/JobsContext");
function ActiveJobDetailsScreen() {
    var router = (0, expo_router_1.useRouter)();
    var params = (0, expo_router_1.useLocalSearchParams)();
    var jobs = (0, JobsContext_1.useJobs)().jobs;
    var job = (0, react_1.useMemo)(function () { var _a; return (_a = jobs.find(function (j) { return j.id === params.jobId; })) !== null && _a !== void 0 ? _a : null; }, [jobs, params.jobId]);
    var hired = (job === null || job === void 0 ? void 0 : job.hired) || [];
    var shortlisted = (job === null || job === void 0 ? void 0 : job.shortlisted) || [];
    if (!job) {
        return (<react_native_1.View style={s.root}>
        <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} style={s.header}>
          <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={s.backBtn} activeOpacity={0.8}>
            <vector_icons_1.Feather name="arrow-left" size={18} color="white"/>
          </react_native_1.TouchableOpacity>
          <react_native_1.Text style={s.headerTitle}>Active Job</react_native_1.Text>
          <react_native_1.Text style={s.headerSub}>Job not found</react_native_1.Text>
        </expo_linear_gradient_1.LinearGradient>
      </react_native_1.View>);
    }
    return (<react_native_1.View style={s.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} style={s.header}>
        <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={s.backBtn} activeOpacity={0.8}>
          <vector_icons_1.Feather name="arrow-left" size={18} color="white"/>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={s.headerTitle}>{job.title}</react_native_1.Text>
        <react_native_1.Text style={s.headerSub}>{job.company} · {job.location}</react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={s.summaryCard}>
          <react_native_1.View style={s.summaryRow}>
            <react_native_1.View style={[s.summaryChip, { backgroundColor: "#FFF7ED" }]}>
              <react_native_1.Text style={[s.summaryNum, { color: "#C2410C" }]}>{job.openings}</react_native_1.Text>
              <react_native_1.Text style={s.summaryLabel}>Openings</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={[s.summaryChip, { backgroundColor: "#D1FAE5" }]}>
              <react_native_1.Text style={[s.summaryNum, { color: "#059669" }]}>{hired.length}</react_native_1.Text>
              <react_native_1.Text style={s.summaryLabel}>Hired</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={[s.summaryChip, { backgroundColor: "#EFF6FF" }]}>
              <react_native_1.Text style={[s.summaryNum, { color: "#1D4ED8" }]}>{shortlisted.length}</react_native_1.Text>
              <react_native_1.Text style={s.summaryLabel}>Shortlisted</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.Text style={s.sectionTitle}>Hired Users</react_native_1.Text>
          {hired.length === 0 ? (<react_native_1.View style={s.empty}>
              <vector_icons_1.Feather name="users" size={34} color="#CBD5E1"/>
              <react_native_1.Text style={s.emptyText}>No hired users yet</react_native_1.Text>
            </react_native_1.View>) : (hired.map(function (id) { return (<react_native_1.View key={id} style={s.userRow}>
                <react_native_1.View style={s.avatar}>
                  <vector_icons_1.Feather name="user-check" size={16} color="#059669"/>
                </react_native_1.View>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={s.userName}>Applicant {id.replace(/[^0-9]/g, "") || id.slice(-4)}</react_native_1.Text>
                  <react_native_1.Text style={s.userSub}>ID: {id}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={s.hiredPill}>
                  <react_native_1.Text style={s.hiredPillText}>Hired</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>); }))}
        </react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var s = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F8FAFC" },
    header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.18)", marginBottom: 12 },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4, fontFamily: "Inter_400Regular" },
    content: { padding: 16 },
    summaryCard: { backgroundColor: "white", borderRadius: 18, padding: 16, gap: 14, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    summaryRow: { flexDirection: "row", gap: 10 },
    summaryChip: { flex: 1, borderRadius: 14, paddingVertical: 12, alignItems: "center" },
    summaryNum: { fontSize: 18, fontWeight: "800", fontFamily: "Inter_700Bold" },
    summaryLabel: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
    sectionTitle: { fontSize: 16, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    userRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 12, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
    avatar: { width: 38, height: 38, borderRadius: 19, alignItems: "center", justifyContent: "center", backgroundColor: "#D1FAE5" },
    userName: { fontSize: 14, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    userSub: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
    hiredPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, backgroundColor: "#D1FAE5" },
    hiredPillText: { fontSize: 11, color: "#059669", fontFamily: "Inter_600SemiBold" },
    empty: { alignItems: "center", justifyContent: "center", paddingVertical: 24, gap: 8 },
    emptyText: { fontSize: 13, color: "#94A3B8", fontFamily: "Inter_400Regular" },
});
