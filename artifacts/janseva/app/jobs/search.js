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
exports.default = SearchScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var JobsContext_1 = require("@/context/JobsContext");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
var SALARY_RANGES = [
    { id: "all", label: "Any Salary", min: 0, max: Infinity },
    { id: "u10", label: "Below ₹10K", min: 0, max: 10000 },
    { id: "10-15", label: "₹10K – ₹15K", min: 10000, max: 15000 },
    { id: "15-25", label: "₹15K – ₹25K", min: 15000, max: 25000 },
    { id: "25-40", label: "₹25K – ₹40K", min: 25000, max: 40000 },
    { id: "a40", label: "Above ₹40K", min: 40000, max: Infinity },
];
var AREAS = [
    "MIDC Ambernath", "Ambernath East", "Ambernath West", "Shivaji Chowk",
    "Station Area East", "Station Area West", "Old Ambernath", "New Ambernath",
    "Vithalwadi", "Shelar Colony", "Badlapur", "Ulhasnagar",
];
var JOB_TYPES = [
    { id: "all", label: "All Types" },
    { id: "full-time", label: "Full Time" },
    { id: "part-time", label: "Part Time" },
    { id: "contract", label: "Contract" },
    { id: "apprentice", label: "Apprentice" },
];
var CATEGORIES = [
    { id: "all", label: "All" },
    { id: "manufacturing", label: "Factory" },
    { id: "it", label: "IT" },
    { id: "retail", label: "Retail" },
    { id: "healthcare", label: "Health" },
    { id: "transport", label: "Transport" },
    { id: "education", label: "Teaching" },
    { id: "security", label: "Security" },
    { id: "construction", label: "Construction" },
];
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
function FilterChip(_a) {
    var label = _a.label, active = _a.active, onPress = _a.onPress;
    return (<react_native_1.TouchableOpacity style={[styles.chip, active && styles.chipActive]} onPress={onPress} activeOpacity={0.75}>
      <react_native_1.Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</react_native_1.Text>
    </react_native_1.TouchableOpacity>);
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
function SearchScreen() {
    var _a;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 44 : insets.top;
    var router = (0, expo_router_1.useRouter)();
    var _b = (0, JobsContext_1.useJobs)(), jobs = _b.jobs, applyJob = _b.applyJob, hasApplied = _b.hasApplied;
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var _c = (0, react_1.useState)(""), query = _c[0], setQuery = _c[1];
    var _d = (0, react_1.useState)(""), salaryMin = _d[0], setSalaryMin = _d[1];
    var _e = (0, react_1.useState)(""), salaryMax = _e[0], setSalaryMax = _e[1];
    var _f = (0, react_1.useState)("all"), jobType = _f[0], setJobType = _f[1];
    var _g = (0, react_1.useState)("all"), category = _g[0], setCategory = _g[1];
    var _h = (0, react_1.useState)(""), customCategory = _h[0], setCustomCategory = _h[1];
    var _j = (0, react_1.useState)(false), categoryDropdownOpen = _j[0], setCategoryDropdownOpen = _j[1];
    var _k = (0, react_1.useState)([]), selectedAreas = _k[0], setSelectedAreas = _k[1];
    var _l = (0, react_1.useState)(false), showMoreFilters = _l[0], setShowMoreFilters = _l[1];
    var _m = (0, react_1.useState)(false), showAllAreas = _m[0], setShowAllAreas = _m[1];
    var toggleArea = function (area) {
        setSelectedAreas(function (prev) {
            return prev.includes(area) ? prev.filter(function (a) { return a !== area; }) : __spreadArray(__spreadArray([], prev, true), [area], false);
        });
    };
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
    var clearAll = function () {
        setSalaryMin("");
        setSalaryMax("");
        setJobType("all");
        setCategory("all");
        setCustomCategory("");
        setSelectedAreas([]);
    };
    var hasFilters = salaryMin !== "" || salaryMax !== "" || jobType !== "all" || category !== "all" || customCategory !== "" || selectedAreas.length > 0;
    var selectedCategoryLabel = customCategory.trim() || ((_a = CATEGORIES.find(function (c) { return c.id === category; })) === null || _a === void 0 ? void 0 : _a.label) || "All";
    var visibleAreas = showAllAreas ? AREAS : AREAS.slice(0, 6);
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 10 }]}>
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={styles.backBtn}>
            <vector_icons_1.Feather name="arrow-left" size={20} color="white"/>
          </react_native_1.TouchableOpacity>
          <react_native_1.Text style={styles.headerTitle}>Search Jobs</react_native_1.Text>
          {hasFilters && (<react_native_1.TouchableOpacity onPress={clearAll} style={styles.clearBtn}>
              <react_native_1.Text style={styles.clearBtnText}>Clear All</react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
        </react_native_1.View>

        <react_native_1.View style={styles.searchBar}>
          <vector_icons_1.Feather name="search" size={16} color="#94A3B8"/>
          <react_native_1.TextInput style={styles.searchInput} value={query} onChangeText={setQuery} placeholder="Job title, company, location…" placeholderTextColor="#94A3B8" returnKeyType="search"/>
          {query.length > 0 && (<react_native_1.TouchableOpacity onPress={function () { return setQuery(""); }}>
              <vector_icons_1.Feather name="x" size={16} color="#94A3B8"/>
            </react_native_1.TouchableOpacity>)}
        </react_native_1.View>

        <react_native_1.View style={styles.resultCount}>
          <react_native_1.Text style={styles.resultCountText}>{results.length} jobs found</react_native_1.Text>
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.cleanFilterCard}>
          {hasFilters && (<react_native_1.View style={styles.resetRow}>
              <react_native_1.TouchableOpacity onPress={clearAll} style={styles.smallClearBtn} activeOpacity={0.8}>
                <react_native_1.Text style={styles.smallClearText}>Reset</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>)}

          <react_native_1.View style={styles.filterBlock}>
            <react_native_1.Text style={styles.filterTitle}>Job Type</react_native_1.Text>
            <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {JOB_TYPES.slice(0, 4).map(function (t) { return (<FilterChip key={t.id} label={t.label} active={jobType === t.id} onPress={function () { return setJobType(t.id); }}/>); })}
            </react_native_1.ScrollView>
          </react_native_1.View>

          <react_native_1.View style={styles.filterBlock}>
            <react_native_1.Text style={styles.filterTitle}>Category</react_native_1.Text>
            <react_native_1.TouchableOpacity style={styles.dropdownBtn} onPress={function () { return setCategoryDropdownOpen(true); }} activeOpacity={0.85}>
              <react_native_1.Text style={[styles.dropdownText, (category === "all" && !customCategory) && { color: "#94A3B8" }]} numberOfLines={1}>
                {selectedCategoryLabel}
              </react_native_1.Text>
              <vector_icons_1.Feather name="chevron-down" size={18} color="#64748B"/>
            </react_native_1.TouchableOpacity>
            <react_native_1.TextInput style={styles.manualInput} placeholder="Or type a custom category…" placeholderTextColor="#94A3B8" value={customCategory} onChangeText={function (v) { setCustomCategory(v); if (v)
        setCategory("all"); }}/>
          </react_native_1.View>

          <react_native_1.View style={styles.filterBlock}>
            <react_native_1.Text style={styles.filterTitle}>Salary</react_native_1.Text>
            <react_native_1.View style={styles.salaryInputRow}>
              <react_native_1.View style={styles.salaryInputBox}>
                <react_native_1.Text style={styles.salaryInputLabel}>Min</react_native_1.Text>
                <react_native_1.TextInput style={styles.salaryInput} placeholder="₹ 0" placeholderTextColor="#94A3B8" keyboardType="numeric" value={salaryMin} onChangeText={setSalaryMin}/>
              </react_native_1.View>
              <react_native_1.View style={styles.salaryInputBox}>
                <react_native_1.Text style={styles.salaryInputLabel}>Max</react_native_1.Text>
                <react_native_1.TextInput style={styles.salaryInput} placeholder="₹ Any" placeholderTextColor="#94A3B8" keyboardType="numeric" value={salaryMax} onChangeText={setSalaryMax}/>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>

          <react_native_1.TouchableOpacity style={styles.moreFilterBtn} onPress={function () { return setShowMoreFilters(function (prev) { return !prev; }); }} activeOpacity={0.85}>
            <react_native_1.View style={styles.moreFilterLeft}>
              <vector_icons_1.Feather name="sliders" size={15} color="#EA580C"/>
              <react_native_1.Text style={styles.moreFilterText}>More filters</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.moreFilterBadge}>
              <react_native_1.Text style={styles.moreFilterBadgeText}>
                {selectedAreas.length > 0 ? selectedAreas.length : "Optional"}
              </react_native_1.Text>
            </react_native_1.View>
            <vector_icons_1.Feather name={showMoreFilters ? "chevron-up" : "chevron-down"} size={17} color="#94A3B8"/>
          </react_native_1.TouchableOpacity>

          {showMoreFilters && (<react_native_1.View style={styles.morePanel}>
              <react_native_1.View style={styles.filterBlock}>
                <react_native_1.Text style={styles.filterTitle}>Area / Location</react_native_1.Text>
                <react_native_1.Text style={styles.filterHint}>Select nearby areas if needed</react_native_1.Text>
                <react_native_1.View style={styles.filterWrap}>
                  {visibleAreas.map(function (a) { return (<FilterChip key={a} label={a} active={selectedAreas.includes(a)} onPress={function () { return toggleArea(a); }}/>); })}
                </react_native_1.View>
                <react_native_1.TouchableOpacity onPress={function () { return setShowAllAreas(function (prev) { return !prev; }); }} style={styles.showAreaBtn} activeOpacity={0.8}>
                  <react_native_1.Text style={styles.showAreaText}>{showAllAreas ? "Show fewer areas" : "Show all areas"}</react_native_1.Text>
                </react_native_1.TouchableOpacity>
              </react_native_1.View>
            </react_native_1.View>)}
        </react_native_1.View>

        <react_native_1.Modal visible={categoryDropdownOpen} transparent animationType="fade" onRequestClose={function () { return setCategoryDropdownOpen(false); }}>
          <react_native_1.TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={function () { return setCategoryDropdownOpen(false); }}>
            <react_native_1.View style={styles.dropdownMenu}>
              <react_native_1.Text style={styles.dropdownMenuTitle}>Select Category</react_native_1.Text>
              <react_native_1.ScrollView style={{ maxHeight: 320 }}>
                {CATEGORIES.map(function (c) { return (<react_native_1.TouchableOpacity key={c.id} style={[styles.dropdownItem, category === c.id && !customCategory && styles.dropdownItemActive]} onPress={function () {
                setCategory(c.id);
                setCustomCategory("");
                setCategoryDropdownOpen(false);
            }}>
                    <react_native_1.Text style={[styles.dropdownItemText, category === c.id && !customCategory && styles.dropdownItemTextActive]}>
                      {c.label}
                    </react_native_1.Text>
                    {category === c.id && !customCategory && (<vector_icons_1.Feather name="check" size={16} color="#EA580C"/>)}
                  </react_native_1.TouchableOpacity>); })}
              </react_native_1.ScrollView>
            </react_native_1.View>
          </react_native_1.TouchableOpacity>
        </react_native_1.Modal>

        <react_native_1.View style={{ height: 100 }}/>
      </react_native_1.ScrollView>

      <react_native_1.View style={[styles.ctaBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <react_native_1.TouchableOpacity activeOpacity={0.9} style={{ borderRadius: 14, overflow: "hidden" }} onPress={function () { return router.push({
            pathname: "/jobs/results",
            params: {
                q: query,
                type: jobType,
                cat: category,
                custom: customCategory,
                min: salaryMin,
                max: salaryMax,
                areas: selectedAreas.join(","),
            },
        }); }}>
          <expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.ctaGrad}>
            <vector_icons_1.Feather name="search" size={18} color="white"/>
            <react_native_1.Text style={styles.ctaText}>Search Jobs · {results.length} match{results.length === 1 ? "" : "es"}</react_native_1.Text>
            <vector_icons_1.Feather name="arrow-right" size={18} color="white"/>
          </expo_linear_gradient_1.LinearGradient>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F8FAFC" },
    header: { paddingHorizontal: 16, paddingBottom: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
    headerTitle: { flex: 1, fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    clearBtn: { backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
    clearBtnText: { fontSize: 12, color: "white", fontFamily: "Inter_600SemiBold" },
    searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 11, gap: 10 },
    searchInput: { flex: 1, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular" },
    resultCount: { marginTop: 8 },
    resultCountText: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular" },
    ctaBar: { position: "absolute", left: 0, right: 0, bottom: 0, paddingHorizontal: 14, paddingTop: 10, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#E2E8F0" },
    ctaGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, paddingVertical: 14, borderRadius: 14 },
    ctaText: { fontSize: 14, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    cleanFilterCard: { backgroundColor: "white", margin: 14, marginBottom: 0, borderRadius: 20, padding: 14, borderWidth: 1, borderColor: "#E2E8F0", shadowColor: "#EA580C", shadowOpacity: 0.06, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
    resetRow: { flexDirection: "row", justifyContent: "flex-end", marginBottom: 6 },
    dropdownBtn: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F8FAFC", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, borderWidth: 1.5, borderColor: "#E2E8F0" },
    dropdownText: { flex: 1, fontSize: 14, color: "#0F172A", fontFamily: "Inter_600SemiBold", fontWeight: "600" },
    manualInput: { marginTop: 8, backgroundColor: "#F8FAFC", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 11, borderWidth: 1.5, borderColor: "#E2E8F0", fontSize: 13, color: "#0F172A", fontFamily: "Inter_400Regular" },
    salaryInputRow: { flexDirection: "row", gap: 10 },
    salaryInputBox: { flex: 1, backgroundColor: "#F8FAFC", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1.5, borderColor: "#E2E8F0" },
    salaryInputLabel: { fontSize: 10, fontWeight: "700", color: "#94A3B8", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 2 },
    salaryInput: { fontSize: 15, color: "#0F172A", fontFamily: "Inter_700Bold", fontWeight: "700", paddingVertical: 2 },
    modalOverlay: { flex: 1, backgroundColor: "rgba(15,23,42,0.45)", justifyContent: "center", padding: 24 },
    dropdownMenu: { backgroundColor: "white", borderRadius: 18, padding: 14, shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 8 },
    dropdownMenuTitle: { fontSize: 14, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 10, paddingHorizontal: 4 },
    dropdownItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 12, paddingVertical: 12, borderRadius: 10 },
    dropdownItemActive: { backgroundColor: "#FFF7ED" },
    dropdownItemText: { fontSize: 14, color: "#334155", fontFamily: "Inter_500Medium" },
    dropdownItemTextActive: { color: "#EA580C", fontFamily: "Inter_700Bold", fontWeight: "700" },
    smallClearBtn: { backgroundColor: "#FFF7ED", borderRadius: 12, paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#FED7AA" },
    smallClearText: { fontSize: 11, fontWeight: "800", color: "#EA580C", fontFamily: "Inter_700Bold" },
    filterBlock: { marginTop: 6, marginBottom: 10 },
    filterSection: { paddingHorizontal: 16, paddingTop: 16, paddingBottom: 4 },
    filterTitle: { fontSize: 13, fontWeight: "700", color: "#334155", fontFamily: "Inter_700Bold", marginBottom: 8 },
    filterHint: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginBottom: 8 },
    filterRow: { gap: 8, paddingBottom: 4 },
    filterWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    chip: { paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: "white", borderWidth: 1.5, borderColor: "#E2E8F0" },
    chipActive: { backgroundColor: "#EA580C", borderColor: "#EA580C" },
    chipText: { fontSize: 12, color: "#64748B", fontFamily: "Inter_500Medium" },
    chipTextActive: { color: "white", fontFamily: "Inter_700Bold" },
    moreFilterBtn: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#F8FAFC", borderRadius: 16, paddingHorizontal: 12, paddingVertical: 12, borderWidth: 1, borderColor: "#E2E8F0", marginTop: 2 },
    moreFilterLeft: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8 },
    moreFilterText: { fontSize: 13, fontWeight: "800", color: "#334155", fontFamily: "Inter_700Bold" },
    moreFilterBadge: { backgroundColor: "#FFF7ED", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 4 },
    moreFilterBadgeText: { fontSize: 10, fontWeight: "800", color: "#EA580C", fontFamily: "Inter_700Bold" },
    morePanel: { marginTop: 10, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
    showAreaBtn: { alignSelf: "flex-start", marginTop: 10, backgroundColor: "#F8FAFC", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 7 },
    showAreaText: { fontSize: 12, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold" },
    shiftChip: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 14, paddingVertical: 7, borderRadius: 20, backgroundColor: "white", borderWidth: 1.5, borderColor: "#E2E8F0" },
    shiftChipActive: { backgroundColor: "#EA580C", borderColor: "#EA580C" },
    shiftChipText: { fontSize: 12, color: "#64748B", fontFamily: "Inter_500Medium" },
    divider: { height: 1, backgroundColor: "#E2E8F0", marginHorizontal: 16, marginTop: 16 },
    resultsList: { padding: 16, gap: 10 },
    resultsHeader: { fontSize: 14, fontWeight: "700", color: "#334155", fontFamily: "Inter_700Bold", marginBottom: 8 },
    empty: { alignItems: "center", paddingVertical: 48, gap: 12 },
    emptyText: { fontSize: 15, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    clearFiltersBtn: { backgroundColor: "#FFF7ED", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 14, borderWidth: 1.5, borderColor: "#FED7AA" },
    clearFiltersBtnText: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    card: { backgroundColor: "white", borderRadius: 16, padding: 14, marginBottom: 2, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 8, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
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
