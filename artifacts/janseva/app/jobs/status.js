"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = JobStatusScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var expo_router_1 = require("expo-router");
var JobsContext_1 = require("@/context/JobsContext");
function JobStatusScreen() {
    var _a;
    var router = (0, expo_router_1.useRouter)();
    var params = (0, expo_router_1.useLocalSearchParams)();
    var jobs = (0, JobsContext_1.useJobs)().jobs;
    var status = ((_a = params.status) !== null && _a !== void 0 ? _a : "active");
    var items = (0, react_1.useMemo)(function () {
        if (status === "shortlisted")
            return jobs.filter(function (j) { return j.shortlisted.length > 0; });
        if (status === "rejected")
            return jobs.filter(function (j) { return j.rejected.length > 0; });
        if (status === "pending")
            return jobs.filter(function (j) { return j.applicants.some(function (id) { return !j.shortlisted.includes(id) && !j.rejected.includes(id); }); });
        return jobs.filter(function (j) { return j.active; });
    }, [jobs, status]);
    var title = status === "shortlisted" ? "Shortlisted Jobs" : status === "rejected" ? "Rejected Jobs" : status === "pending" ? "Pending Jobs" : "Active Jobs";
    var theme = status === "shortlisted"
        ? { colors: ["#16A34A", "#22C55E", "#34D399"], accent: "#059669", soft: "#D1FAE5", border: "#A7F3D0", icon: "user-check" }
        : status === "rejected"
            ? { colors: ["#DC2626", "#EF4444", "#F87171"], accent: "#DC2626", soft: "#FEE2E2", border: "#FECACA", icon: "user-x" }
            : status === "pending"
                ? { colors: ["#2563EB", "#3B82F6", "#60A5FA"], accent: "#1D4ED8", soft: "#EFF6FF", border: "#BFDBFE", icon: "clock" }
                : { colors: ["#C2410C", "#EA580C", "#FB923C"], accent: "#C2410C", soft: "#FFF7ED", border: "#FED7AA", icon: "zap" };
    return (<react_native_1.View style={s.root}>
      <expo_linear_gradient_1.LinearGradient colors={theme.colors} style={s.header}>
        <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={s.backBtn} activeOpacity={0.8}>
          <vector_icons_1.Feather name="arrow-left" size={18} color="white"/>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={s.headerTitle}>{title}</react_native_1.Text>
        <react_native_1.Text style={s.headerSub}>{items.length} jobs</react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        {items.length === 0 ? (<react_native_1.View style={s.empty}>
          <vector_icons_1.Feather name={theme.icon} size={42} color={theme.accent}/>
            <react_native_1.Text style={s.emptyText}>No {title.toLowerCase()} found</react_native_1.Text>
          </react_native_1.View>) : (items.map(function (job) {
            var pending = job.applicants.filter(function (id) { return !job.shortlisted.includes(id) && !job.rejected.includes(id); });
            var displayUsers = status === "shortlisted"
                ? job.shortlisted
                : status === "rejected"
                    ? job.rejected
                    : status === "pending"
                        ? pending
                        : [];
            return (<react_native_1.View key={job.id} style={s.card}>
                <react_native_1.View style={s.cardTop}>
                  <react_native_1.Text style={s.jobTitle}>{job.title}</react_native_1.Text>
                  <react_native_1.Text style={s.jobMeta}>{job.company} · {job.location}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={s.chipGrid}>
                  <react_native_1.View style={[s.chip, { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }]}>
                    <react_native_1.Text style={[s.chipNum, { color: "#C2410C" }]}>{job.openings}</react_native_1.Text>
                    <react_native_1.Text style={s.chipLabel}>Openings</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.View style={[s.chip, { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }]}>
                    <react_native_1.Text style={[s.chipNum, { color: "#1D4ED8" }]}>{job.applicants.length}</react_native_1.Text>
                    <react_native_1.Text style={s.chipLabel}>Applied</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.View style={[s.chip, { backgroundColor: "#D1FAE5", borderColor: "#A7F3D0" }]}>
                    <react_native_1.Text style={[s.chipNum, { color: "#059669" }]}>{job.shortlisted.length}</react_native_1.Text>
                    <react_native_1.Text style={s.chipLabel}>Shortlisted</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.View style={[s.chip, { backgroundColor: "#FEE2E2", borderColor: "#FECACA" }]}>
                    <react_native_1.Text style={[s.chipNum, { color: "#DC2626" }]}>{job.rejected.length}</react_native_1.Text>
                    <react_native_1.Text style={s.chipLabel}>Rejected</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.View style={[s.chip, { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }]}>
                    <react_native_1.Text style={[s.chipNum, { color: "#C2410C" }]}>{pending.length}</react_native_1.Text>
                    <react_native_1.Text style={s.chipLabel}>Pending</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>
                <react_native_1.Text style={s.description}>{job.description}</react_native_1.Text>
                <react_native_1.Text style={s.requirements}>{job.requirements}</react_native_1.Text>
                {status !== "active" && (<react_native_1.View style={s.usersWrap}>
                    <react_native_1.Text style={s.usersTitle}>
                      {status === "shortlisted" ? "Shortlisted Users" : status === "rejected" ? "Rejected Users" : "Pending Users"}
                    </react_native_1.Text>
                    {displayUsers.length === 0 ? (<react_native_1.Text style={s.usersEmpty}>No users found</react_native_1.Text>) : (displayUsers.map(function (id) { return (<react_native_1.View key={id} style={s.userRow}>
                          <react_native_1.View style={[s.userAvatar, { backgroundColor: status === "shortlisted" ? "#D1FAE5" : status === "rejected" ? "#FEE2E2" : "#EFF6FF" }]}>
                            <vector_icons_1.Feather name={status === "shortlisted" ? "user-check" : status === "rejected" ? "user-x" : "user"} size={15} color={status === "shortlisted" ? "#059669" : status === "rejected" ? "#DC2626" : "#1D4ED8"}/>
                          </react_native_1.View>
                          <react_native_1.View style={{ flex: 1 }}>
                            <react_native_1.Text style={s.userName}>Applicant {id.replace(/[^0-9]/g, "") || id.slice(-4)}</react_native_1.Text>
                            <react_native_1.Text style={s.userId}>ID: {id}</react_native_1.Text>
                          </react_native_1.View>
                        </react_native_1.View>); }))}
                  </react_native_1.View>)}
              </react_native_1.View>);
        }))}
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var s = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F8FAFC" },
    header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.18)", marginBottom: 12 },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4, fontFamily: "Inter_400Regular" },
    content: { padding: 16, gap: 12 },
    card: { backgroundColor: "white", borderRadius: 18, padding: 16, gap: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    cardTop: { gap: 4 },
    jobTitle: { fontSize: 16, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    jobMeta: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular" },
    chipGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 2 },
    chip: { minWidth: 84, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 14, borderWidth: 1, alignItems: "center" },
    chipNum: { fontSize: 16, fontWeight: "800", fontFamily: "Inter_700Bold" },
    chipLabel: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
    description: { fontSize: 13, color: "#334155", lineHeight: 19, fontFamily: "Inter_400Regular", marginTop: 4 },
    requirements: { fontSize: 12, color: "#64748B", lineHeight: 18, fontFamily: "Inter_400Regular" },
    usersWrap: { marginTop: 10, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#F1F5F9", gap: 10 },
    usersTitle: { fontSize: 14, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    usersEmpty: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    userRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 8 },
    userAvatar: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
    userName: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    userId: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 1 },
    empty: { alignItems: "center", justifyContent: "center", paddingTop: 80, gap: 10 },
    emptyText: { fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular" },
});
