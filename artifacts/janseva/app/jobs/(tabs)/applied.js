"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AppliedJobsScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
var JobsContext_1 = require("@/context/JobsContext");
function timeAgo(dateStr) {
    var diff = Date.now() - new Date(dateStr).getTime();
    var days = Math.floor(diff / 86400000);
    var hours = Math.floor(diff / 3600000);
    if (days > 0)
        return "".concat(days, "d ago");
    if (hours > 0)
        return "".concat(hours, "h ago");
    return "Just now";
}
function AppliedCard(_a) {
    var job = _a.job;
    var router = (0, expo_router_1.useRouter)();
    var cat = JobsContext_1.categoryConfig[job.category];
    var type = JobsContext_1.typeConfig[job.type];
    return (<react_native_1.TouchableOpacity style={s.card} activeOpacity={0.86} onPress={function () { return router.push("/jobs/detail/".concat(job.id)); }}>
      <react_native_1.View style={s.cardTop}>
        <react_native_1.View style={[s.catIcon, { backgroundColor: cat.bg }]}>
          <vector_icons_1.Feather name={cat.icon} size={18} color={cat.color}/>
        </react_native_1.View>
        <react_native_1.View style={{ flex: 1 }}>
          <react_native_1.Text style={s.jobTitle} numberOfLines={1}>{job.title}</react_native_1.Text>
          <react_native_1.Text style={s.company} numberOfLines={1}>{job.company}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={s.appliedBadge}>
          <vector_icons_1.Feather name="check-circle" size={12} color="#059669"/>
          <react_native_1.Text style={s.appliedBadgeText}>Applied</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>

      <react_native_1.View style={s.metaRow}>
        <react_native_1.View style={s.metaChip}>
          <vector_icons_1.Feather name="map-pin" size={10} color="#64748B"/>
          <react_native_1.Text style={s.metaText}>{job.location}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={[s.metaChip, { backgroundColor: type.bg }]}>
          <react_native_1.Text style={[s.metaText, { color: type.color, fontFamily: "Inter_600SemiBold" }]}>{type.label}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={s.metaChip}>
          <vector_icons_1.Feather name="clock" size={10} color="#64748B"/>
          <react_native_1.Text style={s.metaText}>{timeAgo(job.createdAt)}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>

      <react_native_1.View style={s.salaryRow}>
        <react_native_1.Text style={s.salary}>{job.salary}</react_native_1.Text>
        <react_native_1.Text style={s.openings}>{job.openings} opening{job.openings > 1 ? "s" : ""}</react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={s.statusBar}>
        <react_native_1.View style={s.statusStep}>
          <react_native_1.View style={[s.statusDot, { backgroundColor: "#059669" }]}/>
          <react_native_1.Text style={s.statusStepText}>Applied</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={s.statusLine}/>
        <react_native_1.View style={s.statusStep}>
          <react_native_1.View style={[s.statusDot, { backgroundColor: "#E2E8F0" }]}/>
          <react_native_1.Text style={[s.statusStepText, { color: "#CBD5E1" }]}>Reviewed</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={s.statusLine}/>
        <react_native_1.View style={s.statusStep}>
          <react_native_1.View style={[s.statusDot, { backgroundColor: "#E2E8F0" }]}/>
          <react_native_1.Text style={[s.statusStepText, { color: "#CBD5E1" }]}>Contacted</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
}
function AppliedJobsScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var jobs = (0, JobsContext_1.useJobs)().jobs;
    var appliedJobs = jobs.filter(function (j) { return jobsUser && j.applicants.includes(jobsUser.id); });
    return (<react_native_1.View style={s.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.Text style={s.headerTitle}>Applied Jobs</react_native_1.Text>
        <react_native_1.Text style={s.headerSub}>
          {appliedJobs.length} job{appliedJobs.length !== 1 ? "s" : ""} applied
        </react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>

      {appliedJobs.length === 0 ? (<react_native_1.View style={s.empty}>
          <react_native_1.View style={s.emptyIcon}>
            <vector_icons_1.Feather name="briefcase" size={40} color="#FED7AA"/>
          </react_native_1.View>
          <react_native_1.Text style={s.emptyTitle}>No applications yet</react_native_1.Text>
          <react_native_1.Text style={s.emptySub}>
            Jobs you apply for will appear here so you can track their status.
          </react_native_1.Text>
        </react_native_1.View>) : (<react_native_1.FlatList data={appliedJobs} keyExtractor={function (j) { return j.id; }} contentContainerStyle={[s.list, { paddingBottom: Math.max(insets.bottom, 8) + 90 }]} showsVerticalScrollIndicator={false} renderItem={function (_a) {
            var item = _a.item;
            return <AppliedCard job={item}/>;
        }}/>)}
    </react_native_1.View>);
}
var s = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#FFF7ED" },
    header: {
        paddingHorizontal: 16, paddingBottom: 20,
        borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden",
    },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 13, color: "rgba(255,255,255,0.75)", fontFamily: "Inter_400Regular", marginTop: 4 },
    list: { padding: 14, gap: 10 },
    card: {
        backgroundColor: "white", borderRadius: 18, padding: 14,
        shadowColor: "#EA580C", shadowOpacity: 0.07, shadowRadius: 10,
        shadowOffset: { width: 0, height: 3 }, elevation: 3,
    },
    cardTop: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 10 },
    catIcon: { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    jobTitle: { fontSize: 15, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    company: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
    appliedBadge: {
        flexDirection: "row", alignItems: "center", gap: 4,
        backgroundColor: "#D1FAE5", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8,
    },
    appliedBadgeText: { fontSize: 10, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    metaRow: { flexDirection: "row", gap: 6, flexWrap: "wrap", marginBottom: 10 },
    metaChip: {
        flexDirection: "row", alignItems: "center", gap: 4,
        backgroundColor: "#F1F5F9", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8,
    },
    metaText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular" },
    salaryRow: { flexDirection: "row", alignItems: "center", gap: 4, marginBottom: 14 },
    salary: { flex: 1, fontSize: 14, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    openings: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    statusBar: { flexDirection: "row", alignItems: "center" },
    statusStep: { alignItems: "center", gap: 4 },
    statusDot: { width: 10, height: 10, borderRadius: 5 },
    statusStepText: { fontSize: 9, fontWeight: "600", color: "#059669", fontFamily: "Inter_600SemiBold" },
    statusLine: { flex: 1, height: 1.5, backgroundColor: "#E2E8F0", marginBottom: 12 },
    empty: { flex: 1, alignItems: "center", justifyContent: "center", padding: 40, gap: 16 },
    emptyIcon: {
        width: 88, height: 88, borderRadius: 44,
        backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center",
        borderWidth: 2, borderColor: "#FED7AA",
    },
    emptyTitle: { fontSize: 18, fontWeight: "700", color: "#334155", fontFamily: "Inter_700Bold" },
    emptySub: { fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 20 },
});
