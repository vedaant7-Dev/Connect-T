"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResultsScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var JobsContext_1 = require("@/context/JobsContext");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
function parseSalaryMin(salaryStr) {
    var m = salaryStr.match(/[\d,]+/g);
    if (!m)
        return 0;
    return parseInt(m[0].replace(/,/g, "")) * (salaryStr.includes("lakh") ? 100000 : 1);
}
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
function ResultCard(_a) {
    var job = _a.job, onApply = _a.onApply, applied = _a.applied;
    var cat = JobsContext_1.categoryConfig[job.category];
    var type = JobsContext_1.typeConfig[job.type];
    var _b = (0, react_1.useState)(false), expanded = _b[0], setExpanded = _b[1];
    return (<react_native_1.TouchableOpacity style={styles.card} onPress={function () { return setExpanded(!expanded); }} activeOpacity={0.9}>
      <react_native_1.View style={styles.cardRow}>
        <react_native_1.View style={[styles.catDot, { backgroundColor: cat.bg }]}>
          <vector_icons_1.Feather name={cat.icon} size={16} color={cat.color}/>
        </react_native_1.View>
        <react_native_1.View style={{ flex: 1 }}>
          <react_native_1.Text style={styles.cardTitle} numberOfLines={1}>{job.title}</react_native_1.Text>
          <react_native_1.Text style={styles.cardSub} numberOfLines={1}>{job.company}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.cardTime}>{timeAgo(job.createdAt)}</react_native_1.Text>
      </react_native_1.View>

      <react_native_1.View style={styles.chipRow}>
        <react_native_1.View style={styles.metaChip}><vector_icons_1.Feather name="map-pin" size={10} color="#64748B"/><react_native_1.Text style={styles.metaText}>{job.location}</react_native_1.Text></react_native_1.View>
        <react_native_1.View style={[styles.metaChip, { backgroundColor: type.bg }]}><react_native_1.Text style={[styles.metaText, { color: type.color }]}>{type.label}</react_native_1.Text></react_native_1.View>
        <react_native_1.View style={styles.metaChip}><vector_icons_1.Feather name="users" size={10} color="#64748B"/><react_native_1.Text style={styles.metaText}>{job.openings} open</react_native_1.Text></react_native_1.View>
      </react_native_1.View>

      <react_native_1.View style={styles.salaryRow}>
        <react_native_1.Text style={styles.salary}>{job.salary}</react_native_1.Text>
      </react_native_1.View>

      {expanded && (<react_native_1.View style={styles.expandBox}>
          <react_native_1.Text style={styles.expandLabel}>Description</react_native_1.Text>
          <react_native_1.Text style={styles.expandText}>{job.description}</react_native_1.Text>
          <react_native_1.Text style={styles.expandLabel}>Requirements</react_native_1.Text>
          <react_native_1.Text style={styles.expandText}>{job.requirements}</react_native_1.Text>
        </react_native_1.View>)}

      <react_native_1.View style={styles.cardFooter}>
        <react_native_1.Text style={styles.appliedCount}>{job.applicants.length} applied</react_native_1.Text>
        <react_native_1.TouchableOpacity style={[styles.applyBtn, applied && styles.applyBtnDone]} onPress={onApply} disabled={applied} activeOpacity={0.85}>
          {applied ? (<><vector_icons_1.Feather name="check" size={13} color="#059669"/><react_native_1.Text style={[styles.applyText, { color: "#059669" }]}>Applied</react_native_1.Text></>) : (<expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.applyGrad}>
              <react_native_1.Text style={styles.applyTextWhite}>Apply Now</react_native_1.Text>
            </expo_linear_gradient_1.LinearGradient>)}
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.TouchableOpacity>);
}
function ResultsScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 44 : insets.top;
    var router = (0, expo_router_1.useRouter)();
    var _a = (0, JobsContext_1.useJobs)(), jobs = _a.jobs, applyJob = _a.applyJob, hasApplied = _a.hasApplied;
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var params = (0, expo_router_1.useLocalSearchParams)();
    var query = (params.q || "").toString();
    var jobType = (params.type || "all");
    var category = (params.cat || "all");
    var customCategory = (params.custom || "").toString();
    var salaryMin = (params.min || "").toString();
    var salaryMax = (params.max || "").toString();
    var selectedAreas = (params.areas || "").toString().split(",").filter(Boolean);
    var minSalNum = parseInt(salaryMin.replace(/[^\d]/g, "")) || 0;
    var maxSalNum = parseInt(salaryMax.replace(/[^\d]/g, "")) || Infinity;
    var customCatLower = customCategory.trim().toLowerCase();
    var results = (0, react_1.useMemo)(function () {
        return jobs.filter(function (j) {
            if (!j.active)
                return false;
            if (query) {
                var q = query.toLowerCase();
                if (!j.title.toLowerCase().includes(q) && !j.company.toLowerCase().includes(q) && !j.location.toLowerCase().includes(q))
                    return false;
            }
            if (customCatLower) {
                if (!j.title.toLowerCase().includes(customCatLower) && !j.category.toLowerCase().includes(customCatLower))
                    return false;
            }
            else if (category !== "all" && j.category !== category)
                return false;
            if (jobType !== "all" && j.type !== jobType)
                return false;
            if (selectedAreas.length > 0 && !selectedAreas.some(function (a) { return j.location.toLowerCase().includes(a.toLowerCase()); }))
                return false;
            var salMin = parseSalaryMin(j.salary);
            if (salMin < minSalNum || salMin > maxSalNum)
                return false;
            return true;
        });
    }, [jobs, query, minSalNum, maxSalNum, jobType, category, customCatLower, selectedAreas]);
    var handleApply = function (job) {
        if (!jobsUser || jobsUser.role !== "seeker")
            return;
        if (hasApplied(job.id, jobsUser.id))
            return;
        react_native_1.Alert.alert("Apply for this job?", "".concat(job.title, " at ").concat(job.company), [
            { text: "Cancel", style: "cancel" },
            { text: "Apply", onPress: function () { applyJob(job.id, jobsUser.id); react_native_1.Alert.alert("Applied!", "Your interest has been registered."); } },
        ]);
    };
    var summaryChips = [];
    if (query)
        summaryChips.push("\"".concat(query, "\""));
    if (customCategory)
        summaryChips.push(customCategory);
    else if (category !== "all")
        summaryChips.push(category);
    if (jobType !== "all")
        summaryChips.push(jobType);
    if (salaryMin || salaryMax)
        summaryChips.push("\u20B9".concat(salaryMin || "0", "\u2013").concat(salaryMax || "Any"));
    selectedAreas.forEach(function (a) { return summaryChips.push(a); });
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 10 }]}>
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={styles.backBtn}>
            <vector_icons_1.Feather name="arrow-left" size={20} color="white"/>
          </react_native_1.TouchableOpacity>
          <react_native_1.Text style={styles.headerTitle}>Job Results</react_native_1.Text>
          <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={styles.editBtn}>
            <vector_icons_1.Feather name="sliders" size={14} color="white"/>
            <react_native_1.Text style={styles.editBtnText}>Edit</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <react_native_1.Text style={styles.resultCountText}>{results.length} jobs match your filters</react_native_1.Text>
        {summaryChips.length > 0 && (<react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6, paddingTop: 10 }}>
            {summaryChips.map(function (c, i) { return (<react_native_1.View key={i} style={styles.summaryChip}>
                <react_native_1.Text style={styles.summaryChipText}>{c}</react_native_1.Text>
              </react_native_1.View>); })}
          </react_native_1.ScrollView>)}
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={{ flex: 1 }} contentContainerStyle={styles.resultsList} showsVerticalScrollIndicator={false}>
        {results.length === 0 ? (<react_native_1.View style={styles.empty}>
            <vector_icons_1.Feather name="search" size={44} color="#CBD5E1"/>
            <react_native_1.Text style={styles.emptyText}>No jobs match your filters</react_native_1.Text>
            <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={styles.clearFiltersBtn}>
              <react_native_1.Text style={styles.clearFiltersBtnText}>Adjust Filters</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>) : (results.map(function (job) { return (<ResultCard key={job.id} job={job} applied={jobsUser ? hasApplied(job.id, jobsUser.id) : false} onApply={function () { return handleApply(job); }}/>); }))}
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F8FAFC" },
    header: { paddingHorizontal: 16, paddingBottom: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 8 },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
    headerTitle: { flex: 1, fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    editBtn: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 12 },
    editBtnText: { fontSize: 12, color: "white", fontFamily: "Inter_700Bold", fontWeight: "700" },
    resultCountText: { fontSize: 13, color: "rgba(255,255,255,0.9)", fontFamily: "Inter_600SemiBold", fontWeight: "600" },
    summaryChip: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5 },
    summaryChipText: { fontSize: 11, color: "white", fontFamily: "Inter_600SemiBold", fontWeight: "600" },
    resultsList: { padding: 16, gap: 10 },
    empty: { alignItems: "center", paddingVertical: 64, gap: 12 },
    emptyText: { fontSize: 15, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    clearFiltersBtn: { backgroundColor: "#FFF7ED", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14, borderWidth: 1.5, borderColor: "#FED7AA" },
    clearFiltersBtnText: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    card: { backgroundColor: "white", borderRadius: 16, padding: 14, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
    cardRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
    catDot: { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    cardTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    cardSub: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 1 },
    cardTime: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    chipRow: { flexDirection: "row", gap: 6, flexWrap: "wrap", marginBottom: 8 },
    metaChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#F1F5F9", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 },
    metaText: { fontSize: 10, color: "#64748B", fontFamily: "Inter_400Regular" },
    salaryRow: { flexDirection: "row", alignItems: "center", gap: 3, marginBottom: 10 },
    salary: { fontSize: 14, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    expandBox: { backgroundColor: "#F8FAFC", borderRadius: 10, padding: 10, marginBottom: 10, gap: 4 },
    expandLabel: { fontSize: 10, fontWeight: "700", color: "#475569", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5 },
    expandText: { fontSize: 12, color: "#334155", fontFamily: "Inter_400Regular", lineHeight: 17 },
    cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    appliedCount: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    applyBtn: { borderRadius: 9, overflow: "hidden" },
    applyBtnDone: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#D1FAE5", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 9 },
    applyGrad: { paddingHorizontal: 16, paddingVertical: 8 },
    applyText: { fontSize: 12, fontWeight: "700", fontFamily: "Inter_700Bold" },
    applyTextWhite: { fontSize: 12, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
