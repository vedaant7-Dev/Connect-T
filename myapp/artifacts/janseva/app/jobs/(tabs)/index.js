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
exports.default = JobsHomeScreen;
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
function isNearby(jobLocation, userLocation) {
    if (!userLocation)
        return false;
    var jl = jobLocation.toLowerCase();
    var parts = userLocation.toLowerCase().split(/[\s,]+/);
    return parts.some(function (p) { return p.length > 3 && jl.includes(p); });
}
// ─── Seeker job card ─────────────────────────────────────────────────────────
function JobCard(_a) {
    var job = _a.job, onApply = _a.onApply, applied = _a.applied, near = _a.near;
    var cat = JobsContext_1.categoryConfig[job.category];
    var type = JobsContext_1.typeConfig[job.type];
    var _b = (0, react_1.useState)(false), expanded = _b[0], setExpanded = _b[1];
    return (<react_native_1.View style={s.card}>
      {near && (<react_native_1.View style={s.nearBadge}>
          <vector_icons_1.Feather name="map-pin" size={10} color="#059669"/>
          <react_native_1.Text style={s.nearBadgeText}>Near You</react_native_1.Text>
        </react_native_1.View>)}
      <react_native_1.TouchableOpacity activeOpacity={0.75} onPress={function () { return setExpanded(!expanded); }} style={s.cardTappable}>
        <react_native_1.View style={s.cardHeader}>
          <react_native_1.View style={[s.catIcon, { backgroundColor: cat.bg }]}>
            <vector_icons_1.Feather name={cat.icon} size={18} color={cat.color}/>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={s.cardTitle} numberOfLines={1}>{job.title}</react_native_1.Text>
            <react_native_1.Text style={s.cardCompany} numberOfLines={1}>{job.company}</react_native_1.Text>
          </react_native_1.View>
          <vector_icons_1.Feather name={expanded ? "chevron-up" : "chevron-down"} size={16} color="#94A3B8"/>
        </react_native_1.View>
        <react_native_1.View style={s.cardMeta}>
          <react_native_1.View style={s.metaChip}>
            <vector_icons_1.Feather name="map-pin" size={11} color="#64748B"/>
            <react_native_1.Text style={s.metaText}>{job.location}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={[s.metaChip, { backgroundColor: type.bg }]}>
            <react_native_1.Text style={[s.metaText, { color: type.color, fontFamily: "Inter_600SemiBold" }]}>{type.label}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={s.metaChip}>
            <vector_icons_1.Feather name="users" size={11} color="#64748B"/>
            <react_native_1.Text style={s.metaText}>{job.openings} opening{job.openings > 1 ? "s" : ""}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={s.salaryRow}>
          <react_native_1.Text style={s.salary}>{job.salary}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>
      {expanded && (<react_native_1.View style={s.expandedSection}>
          <react_native_1.Text style={s.expandLabel}>About the Job</react_native_1.Text>
          <react_native_1.Text style={s.expandText}>{job.description}</react_native_1.Text>
          <react_native_1.Text style={s.expandLabel}>Requirements</react_native_1.Text>
          <react_native_1.Text style={s.expandText}>{job.requirements}</react_native_1.Text>
        </react_native_1.View>)}
      <react_native_1.View style={s.cardFooter}>
        <react_native_1.Text style={s.applicantsText}>{job.applicants.length} applied</react_native_1.Text>
        {applied ? (<react_native_1.View style={s.applyBtnDone}>
            <vector_icons_1.Feather name="check" size={14} color="#059669"/>
            <react_native_1.Text style={[s.applyBtnText, { color: "#059669" }]}>Applied</react_native_1.Text>
          </react_native_1.View>) : (<react_native_1.TouchableOpacity onPress={onApply} activeOpacity={0.85} style={s.applyBtn}>
            <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.applyGrad}>
              <react_native_1.Text style={s.applyBtnTextWhite}>Apply Now</react_native_1.Text>
            </expo_linear_gradient_1.LinearGradient>
          </react_native_1.TouchableOpacity>)}
      </react_native_1.View>
    </react_native_1.View>);
}
// ─── Notifications modal ──────────────────────────────────────────────────────
function NotificationsModal(_a) {
    var visible = _a.visible, onClose = _a.onClose, jobs = _a.jobs;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var recentJobs = __spreadArray([], jobs, true).sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); }).slice(0, 8);
    return (<react_native_1.Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <react_native_1.View style={s.notifOverlay}>
        <react_native_1.View style={[s.notifPanel, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <react_native_1.View style={s.notifHandle}/>
          <react_native_1.View style={s.notifHeader}>
            <react_native_1.Text style={s.notifTitle}>Notifications</react_native_1.Text>
            <react_native_1.TouchableOpacity onPress={onClose} style={s.notifClose}>
              <vector_icons_1.Feather name="x" size={18} color="#64748B"/>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>
          {recentJobs.length === 0 ? (<react_native_1.View style={s.notifEmpty}>
              <vector_icons_1.Feather name="bell-off" size={36} color="#CBD5E1"/>
              <react_native_1.Text style={s.notifEmptyText}>No notifications yet</react_native_1.Text>
            </react_native_1.View>) : (<react_native_1.ScrollView showsVerticalScrollIndicator={false}>
              {recentJobs.map(function (job) {
                var cat = JobsContext_1.categoryConfig[job.category];
                return (<react_native_1.View key={job.id} style={s.notifItem}>
                    <react_native_1.View style={[s.notifDot, { backgroundColor: cat.bg }]}>
                      <vector_icons_1.Feather name={cat.icon} size={14} color={cat.color}/>
                    </react_native_1.View>
                    <react_native_1.View style={{ flex: 1 }}>
                      <react_native_1.Text style={s.notifItemTitle}>New job: {job.title}</react_native_1.Text>
                      <react_native_1.Text style={s.notifItemSub}>{job.company} · {job.location}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.Text style={s.notifTime}>{timeAgo(job.createdAt)}</react_native_1.Text>
                  </react_native_1.View>);
            })}
            </react_native_1.ScrollView>)}
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
}
// ─── Applicants modal (employer) ──────────────────────────────────────────────
function ApplicantsModal(_a) {
    var visible = _a.visible, job = _a.job, onClose = _a.onClose, onShortlist = _a.onShortlist, onReject = _a.onReject;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    if (!job)
        return null;
    var pending = job.applicants.filter(function (id) { return !job.shortlisted.includes(id) && !job.rejected.includes(id); });
    var shortlisted = job.shortlisted;
    var rejected = job.rejected;
    var ApplicantRow = function (_a) {
        var id = _a.id, status = _a.status;
        return (<react_native_1.View style={s.appRow}>
      <react_native_1.View style={[s.appAvatar, {
                    backgroundColor: status === "shortlisted" ? "#D1FAE5" : status === "rejected" ? "#FEE2E2" : "#FFF7ED",
                }]}>
        <vector_icons_1.Feather name={status === "shortlisted" ? "user-check" : status === "rejected" ? "user-x" : "user"} size={16} color={status === "shortlisted" ? "#059669" : status === "rejected" ? "#DC2626" : "#EA580C"}/>
      </react_native_1.View>
      <react_native_1.View style={{ flex: 1 }}>
        <react_native_1.Text style={s.appName}>Applicant {id.replace(/[^0-9]/g, "") || id.slice(-4)}</react_native_1.Text>
        <react_native_1.Text style={s.appId}>ID: {id}</react_native_1.Text>
      </react_native_1.View>
      {status === "pending" && (<react_native_1.View style={{ flexDirection: "row", gap: 8 }}>
          <react_native_1.TouchableOpacity onPress={function () { return onShortlist(job.id, id); }} style={s.appActionBtn}>
            <expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.appActionGrad}>
              <vector_icons_1.Feather name="check" size={12} color="white"/>
              <react_native_1.Text style={s.appActionText}>Shortlist</react_native_1.Text>
            </expo_linear_gradient_1.LinearGradient>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity onPress={function () { return onReject(job.id, id); }} style={[s.appActionBtn, { borderWidth: 1, borderColor: "#FECACA", borderRadius: 8 }]}>
            <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 7 }}>
              <vector_icons_1.Feather name="x" size={12} color="#DC2626"/>
              <react_native_1.Text style={[s.appActionText, { color: "#DC2626" }]}>Reject</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>)}
      {status === "shortlisted" && (<react_native_1.View style={[s.statusPill, { backgroundColor: "#D1FAE5" }]}>
          <react_native_1.Text style={[s.statusPillText, { color: "#059669" }]}>Shortlisted</react_native_1.Text>
        </react_native_1.View>)}
      {status === "rejected" && (<react_native_1.View style={[s.statusPill, { backgroundColor: "#FEE2E2" }]}>
          <react_native_1.Text style={[s.statusPillText, { color: "#DC2626" }]}>Rejected</react_native_1.Text>
        </react_native_1.View>)}
    </react_native_1.View>);
    };
    return (<react_native_1.Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <react_native_1.View style={s.notifOverlay}>
        <react_native_1.View style={[s.appPanel, { paddingBottom: Math.max(insets.bottom, 16) }]}>
          <react_native_1.View style={s.notifHandle}/>
          <react_native_1.View style={s.notifHeader}>
            <react_native_1.View style={{ flex: 1 }}>
              <react_native_1.Text style={s.notifTitle}>{job.title}</react_native_1.Text>
              <react_native_1.Text style={[s.notifItemSub, { marginTop: 2 }]}>{job.applicants.length} total applicants</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.TouchableOpacity onPress={onClose} style={s.notifClose}>
              <vector_icons_1.Feather name="x" size={18} color="#64748B"/>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>

          {/* Pipeline summary pills */}
          <react_native_1.View style={s.pipelineRow}>
            <react_native_1.View style={[s.pipePill, { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }]}>
              <react_native_1.Text style={[s.pipeNum, { color: "#C2410C" }]}>{job.applicants.length}</react_native_1.Text>
              <react_native_1.Text style={s.pipeLabel}>Applied</react_native_1.Text>
            </react_native_1.View>
            <vector_icons_1.Feather name="arrow-right" size={14} color="#CBD5E1"/>
            <react_native_1.View style={[s.pipePill, { backgroundColor: "#D1FAE5", borderColor: "#A7F3D0" }]}>
              <react_native_1.Text style={[s.pipeNum, { color: "#059669" }]}>{shortlisted.length}</react_native_1.Text>
              <react_native_1.Text style={s.pipeLabel}>Shortlisted</react_native_1.Text>
            </react_native_1.View>
            <vector_icons_1.Feather name="arrow-right" size={14} color="#CBD5E1"/>
            <react_native_1.View style={[s.pipePill, { backgroundColor: "#FEE2E2", borderColor: "#FECACA" }]}>
              <react_native_1.Text style={[s.pipeNum, { color: "#DC2626" }]}>{rejected.length}</react_native_1.Text>
              <react_native_1.Text style={s.pipeLabel}>Rejected</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>

          <react_native_1.ScrollView showsVerticalScrollIndicator={false}>
            {pending.length > 0 && (<>
                <react_native_1.Text style={s.appSectionLabel}>Pending Review ({pending.length})</react_native_1.Text>
                {pending.map(function (id) { return <ApplicantRow key={id} id={id} status="pending"/>; })}
              </>)}
            {shortlisted.length > 0 && (<>
                <react_native_1.Text style={[s.appSectionLabel, { color: "#059669" }]}>Shortlisted ({shortlisted.length})</react_native_1.Text>
                {shortlisted.map(function (id) { return <ApplicantRow key={id} id={id} status="shortlisted"/>; })}
              </>)}
            {rejected.length > 0 && (<>
                <react_native_1.Text style={[s.appSectionLabel, { color: "#DC2626" }]}>Rejected ({rejected.length})</react_native_1.Text>
                {rejected.map(function (id) { return <ApplicantRow key={id} id={id} status="rejected"/>; })}
              </>)}
            {job.applicants.length === 0 && (<react_native_1.View style={s.notifEmpty}>
                <vector_icons_1.Feather name="users" size={36} color="#CBD5E1"/>
                <react_native_1.Text style={s.notifEmptyText}>No applicants yet</react_native_1.Text>
              </react_native_1.View>)}
          </react_native_1.ScrollView>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
}
// ─── Employer Dashboard ───────────────────────────────────────────────────────
function EmployerDashboard(_a) {
    var _b;
    var jobs = _a.jobs, employerId = _a.employerId, onPostJob = _a.onPostJob, onToggle = _a.onToggle, onShortlist = _a.onShortlist, onReject = _a.onReject, onDelete = _a.onDelete;
    var myJobs = jobs.filter(function (j) { return j.employerId === employerId; });
    var _c = (0, react_1.useState)(null), selectedJob = _c[0], setSelectedJob = _c[1];
    var _d = (0, react_1.useState)(null), deleteTarget = _d[0], setDeleteTarget = _d[1];
    var totalApplicants = myJobs.reduce(function (n, j) { return n + j.applicants.length; }, 0);
    var totalShortlisted = myJobs.reduce(function (n, j) { return n + j.shortlisted.length; }, 0);
    var totalRejected = myJobs.reduce(function (n, j) { return n + j.rejected.length; }, 0);
    var activeCount = myJobs.filter(function (j) { return j.active; }).length;
    var totalOpenings = myJobs.reduce(function (n, j) { return n + j.openings; }, 0);
    var conversionRate = totalApplicants > 0
        ? Math.round((totalShortlisted / totalApplicants) * 100) : 0;
    // Recent applications across all jobs (last 5)
    var recentActivity = myJobs
        .flatMap(function (j) { return j.applicants.map(function (id) { return ({ jobId: j.id, jobTitle: j.title, applicantId: id, createdAt: j.createdAt }); }); })
        .slice(-5).reverse();
    var liveJob = (_b = myJobs.find(function (j) { return j.id === (selectedJob === null || selectedJob === void 0 ? void 0 : selectedJob.id); })) !== null && _b !== void 0 ? _b : selectedJob;
    return (<react_native_1.View>
      {/* KPI grid */}
      <react_native_1.View style={s.kpiGrid}>
        <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s.kpiCard, s.kpiBig]}>
          <vector_icons_1.Feather name="briefcase" size={20} color="rgba(255,255,255,0.7)"/>
          <react_native_1.Text style={s.kpiBigNum}>{myJobs.length}</react_native_1.Text>
          <react_native_1.Text style={s.kpiBigLabel}>Jobs Posted</react_native_1.Text>
          <react_native_1.Text style={s.kpiBigSub}>{activeCount} active · {totalOpenings} openings</react_native_1.Text>
        </expo_linear_gradient_1.LinearGradient>

        <expo_linear_gradient_1.LinearGradient colors={["#1D4ED8", "#2563EB"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s.kpiCard, s.kpiBig]}>
          <vector_icons_1.Feather name="users" size={20} color="rgba(255,255,255,0.7)"/>
          <react_native_1.Text style={s.kpiBigNum}>{totalApplicants}</react_native_1.Text>
          <react_native_1.Text style={s.kpiBigLabel}>Total Applicants</react_native_1.Text>
          <react_native_1.Text style={s.kpiBigSub}>{conversionRate}% shortlist rate</react_native_1.Text>
        </expo_linear_gradient_1.LinearGradient>
      </react_native_1.View>

      <react_native_1.View style={s.kpiRow}>
        <react_native_1.View style={[s.kpiSmall, { backgroundColor: "#D1FAE5", borderColor: "#A7F3D0" }]}>
          <vector_icons_1.Feather name="user-check" size={16} color="#059669"/>
          <react_native_1.Text style={[s.kpiSmallNum, { color: "#059669" }]}>{totalShortlisted}</react_native_1.Text>
          <react_native_1.Text style={s.kpiSmallLabel}>Shortlisted</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={[s.kpiSmall, { backgroundColor: "#FEE2E2", borderColor: "#FECACA" }]}>
          <vector_icons_1.Feather name="user-x" size={16} color="#DC2626"/>
          <react_native_1.Text style={[s.kpiSmallNum, { color: "#DC2626" }]}>{totalRejected}</react_native_1.Text>
          <react_native_1.Text style={s.kpiSmallLabel}>Rejected</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={[s.kpiSmall, { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }]}>
          <vector_icons_1.Feather name="clock" size={16} color="#1D4ED8"/>
          <react_native_1.Text style={[s.kpiSmallNum, { color: "#1D4ED8" }]}>{totalApplicants - totalShortlisted - totalRejected}</react_native_1.Text>
          <react_native_1.Text style={s.kpiSmallLabel}>Pending</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={[s.kpiSmall, { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }]}>
          <vector_icons_1.Feather name="zap" size={16} color="#C2410C"/>
          <react_native_1.Text style={[s.kpiSmallNum, { color: "#C2410C" }]}>{activeCount}</react_native_1.Text>
          <react_native_1.Text style={s.kpiSmallLabel}>Active Jobs</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>

      {/* Pipeline bar */}
      {totalApplicants > 0 && (<react_native_1.View style={s.funnelCard}>
          <react_native_1.Text style={s.funnelTitle}>Application Pipeline</react_native_1.Text>
          <react_native_1.View style={s.funnelBar}>
            <react_native_1.View style={[s.funnelSeg, { flex: totalApplicants, backgroundColor: "#FFEDD5" }]}/>
          </react_native_1.View>
          <react_native_1.View style={s.funnelBar}>
            <react_native_1.View style={[s.funnelSeg, { flex: totalShortlisted || 0.01, backgroundColor: "#D1FAE5", borderRadius: 6 }]}/>
            <react_native_1.View style={{ flex: Math.max(totalApplicants - totalShortlisted, 0) }}/>
          </react_native_1.View>
          <react_native_1.View style={s.funnelLegend}>
            <react_native_1.View style={s.funnelLegRow}><react_native_1.View style={[s.dot, { backgroundColor: "#FFEDD5", borderWidth: 1, borderColor: "#FED7AA" }]}/><react_native_1.Text style={s.funnelLegText}>Applied: {totalApplicants}</react_native_1.Text></react_native_1.View>
            <react_native_1.View style={s.funnelLegRow}><react_native_1.View style={[s.dot, { backgroundColor: "#D1FAE5", borderWidth: 1, borderColor: "#A7F3D0" }]}/><react_native_1.Text style={s.funnelLegText}>Shortlisted: {totalShortlisted}</react_native_1.Text></react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>)}

      {/* Post job CTA */}
      <react_native_1.TouchableOpacity onPress={onPostJob} activeOpacity={0.85} style={s.postCtaWrap}>
        <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.postCta}>
          <vector_icons_1.Feather name="plus-circle" size={20} color="white"/>
          <react_native_1.Text style={s.postCtaText}>Post a New Job</react_native_1.Text>
          <vector_icons_1.Feather name="arrow-right" size={16} color="rgba(255,255,255,0.7)"/>
        </expo_linear_gradient_1.LinearGradient>
      </react_native_1.TouchableOpacity>

      {/* Job performance list */}
      <react_native_1.View style={s.sectionHeader}>
        <vector_icons_1.Feather name="list" size={15} color="#EA580C"/>
        <react_native_1.Text style={s.sectionTitle}>Job Performance</react_native_1.Text>
        <react_native_1.View style={[s.sectionBadge, { backgroundColor: "#FFEDD5" }]}>
          <react_native_1.Text style={[s.sectionBadgeText, { color: "#EA580C" }]}>{myJobs.length}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>

      {myJobs.length === 0 ? (<react_native_1.View style={s.empty}>
          <vector_icons_1.Feather name="inbox" size={44} color="#CBD5E1"/>
          <react_native_1.Text style={s.emptyText}>No jobs posted yet</react_native_1.Text>
          <react_native_1.Text style={s.emptySubText}>Tap "Post a New Job" above to get started</react_native_1.Text>
        </react_native_1.View>) : (myJobs.map(function (job) {
            var cat = JobsContext_1.categoryConfig[job.category];
            var pending = job.applicants.filter(function (id) { return !job.shortlisted.includes(id) && !job.rejected.includes(id); }).length;
            return (<react_native_1.View key={job.id} style={s.jobPerfCard}>
              <react_native_1.View style={s.jobPerfTop}>
                <react_native_1.View style={[s.catIcon, { backgroundColor: cat.bg }]}>
                  <vector_icons_1.Feather name={cat.icon} size={16} color={cat.color}/>
                </react_native_1.View>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={s.cardTitle} numberOfLines={1}>{job.title}</react_native_1.Text>
                  <react_native_1.Text style={s.cardCompany}>{job.location} · {job.salary}</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.Switch value={job.active} onValueChange={function () { return onToggle(job.id); }} trackColor={{ false: "#E2E8F0", true: "#BFDBFE" }} thumbColor={job.active ? "#2563EB" : "#94A3B8"} style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}/>
              </react_native_1.View>

              {/* Mini stats */}
              <react_native_1.View style={s.jobPerfStats}>
                <react_native_1.View style={s.perfStat}>
                  <react_native_1.Text style={s.perfStatNum}>{job.applicants.length}</react_native_1.Text>
                  <react_native_1.Text style={s.perfStatLabel}>Applied</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={s.perfDivider}/>
                <react_native_1.View style={s.perfStat}>
                  <react_native_1.Text style={[s.perfStatNum, { color: "#059669" }]}>{job.shortlisted.length}</react_native_1.Text>
                  <react_native_1.Text style={s.perfStatLabel}>Shortlisted</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={s.perfDivider}/>
                <react_native_1.View style={s.perfStat}>
                  <react_native_1.Text style={[s.perfStatNum, { color: "#DC2626" }]}>{job.rejected.length}</react_native_1.Text>
                  <react_native_1.Text style={s.perfStatLabel}>Rejected</react_native_1.Text>
                </react_native_1.View>
                <react_native_1.View style={s.perfDivider}/>
                <react_native_1.View style={s.perfStat}>
                  <react_native_1.Text style={[s.perfStatNum, { color: "#D97706" }]}>{pending}</react_native_1.Text>
                  <react_native_1.Text style={s.perfStatLabel}>Pending</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>

              {/* View applicants + delete row */}
              <react_native_1.View style={{ flexDirection: "row", alignItems: "stretch" }}>
                <react_native_1.TouchableOpacity onPress={function () { return setSelectedJob(job); }} activeOpacity={0.85} style={[s.viewAppsBtn, { flex: 1, opacity: job.applicants.length === 0 ? 0.5 : 1 }]}>
                  <vector_icons_1.Feather name="users" size={14} color="#EA580C"/>
                  <react_native_1.Text style={s.viewAppsBtnText}>
                    {job.applicants.length === 0 ? "No applicants yet" : "View ".concat(job.applicants.length, " applicant").concat(job.applicants.length !== 1 ? "s" : "")}
                  </react_native_1.Text>
                  {job.applicants.length > 0 && <vector_icons_1.Feather name="chevron-right" size={14} color="#EA580C"/>}
                </react_native_1.TouchableOpacity>
                <react_native_1.TouchableOpacity onPress={function () { return setDeleteTarget(job); }} activeOpacity={0.8} style={s.deleteJobBtn}>
                  <vector_icons_1.Feather name="trash-2" size={15} color="#DC2626"/>
                </react_native_1.TouchableOpacity>
              </react_native_1.View>
            </react_native_1.View>);
        }))}

      {/* Recent activity */}
      {recentActivity.length > 0 && (<>
          <react_native_1.View style={[s.sectionHeader, { marginTop: 8 }]}>
            <vector_icons_1.Feather name="activity" size={15} color="#1D4ED8"/>
            <react_native_1.Text style={s.sectionTitle}>Recent Activity</react_native_1.Text>
          </react_native_1.View>
          {recentActivity.map(function (act, idx) { return (<react_native_1.View key={idx} style={s.activityRow}>
              <react_native_1.View style={s.activityDot}/>
              <react_native_1.View style={{ flex: 1 }}>
                <react_native_1.Text style={s.activityText}>
                  <react_native_1.Text style={{ fontFamily: "Inter_600SemiBold" }}>Applicant {act.applicantId.replace(/[^0-9]/g, "") || act.applicantId.slice(-4)}</react_native_1.Text>
                  {" "}applied for <react_native_1.Text style={{ fontFamily: "Inter_600SemiBold" }}>{act.jobTitle}</react_native_1.Text>
                </react_native_1.Text>
              </react_native_1.View>
              <react_native_1.Text style={s.notifTime}>{timeAgo(act.createdAt)}</react_native_1.Text>
            </react_native_1.View>); })}
        </>)}

      <ApplicantsModal visible={!!selectedJob} job={liveJob} onClose={function () { return setSelectedJob(null); }} onShortlist={function (jobId, id) { onShortlist(jobId, id); }} onReject={function (jobId, id) { onReject(jobId, id); }}/>

      {/* Delete confirm modal */}
      <react_native_1.Modal visible={!!deleteTarget} transparent animationType="fade" onRequestClose={function () { return setDeleteTarget(null); }}>
        <react_native_1.View style={s.deleteOverlay}>
          <react_native_1.View style={s.deleteCard}>
            <react_native_1.View style={s.deleteIconWrap}>
              <vector_icons_1.Feather name="trash-2" size={28} color="#DC2626"/>
            </react_native_1.View>
            <react_native_1.Text style={s.deleteTitle}>Delete Job Posting?</react_native_1.Text>
            <react_native_1.Text style={s.deleteSub}>
              "{deleteTarget === null || deleteTarget === void 0 ? void 0 : deleteTarget.title}" will be permanently removed. All applicant records for this job will also be deleted.
            </react_native_1.Text>
            <react_native_1.View style={s.deleteBtns}>
              <react_native_1.TouchableOpacity style={s.deleteCancelBtn} onPress={function () { return setDeleteTarget(null); }} activeOpacity={0.8}>
                <react_native_1.Text style={s.deleteCancelText}>Cancel</react_native_1.Text>
              </react_native_1.TouchableOpacity>
              <react_native_1.TouchableOpacity style={s.deleteConfirmBtn} activeOpacity={0.8} onPress={function () {
            if (deleteTarget) {
                onDelete(deleteTarget.id);
                setDeleteTarget(null);
            }
        }}>
                <vector_icons_1.Feather name="trash-2" size={14} color="white"/>
                <react_native_1.Text style={s.deleteConfirmText}>Delete</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>
    </react_native_1.View>);
}
// ─── Main screen ──────────────────────────────────────────────────────────────
function JobsHomeScreen() {
    var _a;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var _b = (0, JobsContext_1.useJobs)(), jobs = _b.jobs, applyJob = _b.applyJob, hasApplied = _b.hasApplied, toggleJobActive = _b.toggleJobActive, shortlistApplicant = _b.shortlistApplicant, rejectApplicant = _b.rejectApplicant, deleteJob = _b.deleteJob;
    var router = (0, expo_router_1.useRouter)();
    var _c = (0, react_1.useState)(false), showNotifs = _c[0], setShowNotifs = _c[1];
    var isEmployer = (jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.role) === "employer";
    var activeJobs = jobs.filter(function (j) { return j.active; });
    var nearbyJobs = activeJobs.filter(function (j) { return isNearby(j.location, jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.location); });
    var handleApply = function (job) {
        if (!jobsUser)
            return;
        if (isEmployer) {
            react_native_1.Alert.alert("Not allowed", "Employers cannot apply for jobs.");
            return;
        }
        if (hasApplied(job.id, jobsUser.id))
            return;
        applyJob(job.id, jobsUser.id);
        react_native_1.Alert.alert("Applied! ✅", "You have applied for ".concat(job.title, " at ").concat(job.company, ". The employer will contact you."));
    };
    return (<react_native_1.View style={s.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[s.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.View style={[s.headerRow, isEmployer && { marginBottom: 0 }]}>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={s.headerTitle}>{isEmployer ? "Employer Dashboard" : "Connect T Jobs"}</react_native_1.Text>
            <react_native_1.Text style={s.headerSub}>
              {isEmployer
            ? ((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.company) || (jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.name))
            : "Hello, ".concat(((_a = jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.name) === null || _a === void 0 ? void 0 : _a.split(" ")[0]) || "there", " \uD83D\uDC4B")}
            </react_native_1.Text>
          </react_native_1.View>
          {!isEmployer && (<react_native_1.TouchableOpacity style={s.headerBadge} onPress={function () { return setShowNotifs(true); }} activeOpacity={0.8}>
              <vector_icons_1.Feather name="bell" size={18} color="white"/>
              {activeJobs.length > 0 && (<react_native_1.View style={s.notifBubble}>
                  <react_native_1.Text style={s.notifBubbleText}>{activeJobs.length}</react_native_1.Text>
                </react_native_1.View>)}
            </react_native_1.TouchableOpacity>)}
        </react_native_1.View>

        {!isEmployer && (<react_native_1.TouchableOpacity style={s.searchBar} onPress={function () { return router.push("/jobs/search"); }} activeOpacity={0.8}>
            <vector_icons_1.Feather name="search" size={16} color="#94A3B8"/>
            <react_native_1.Text style={s.searchPlaceholder}>Search by job, company, location…</react_native_1.Text>
            <react_native_1.View style={s.filterIconBtn}>
              <vector_icons_1.Feather name="sliders" size={14} color="#EA580C"/>
            </react_native_1.View>
          </react_native_1.TouchableOpacity>)}
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.FlatList data={[]} keyExtractor={function () { return ""; }} renderItem={null} contentContainerStyle={[s.list, { paddingBottom: Math.max(insets.bottom, 8) + 80 }]} showsVerticalScrollIndicator={false} ListHeaderComponent={isEmployer ? (<EmployerDashboard jobs={jobs} employerId={jobsUser.id} onPostJob={function () { return router.push("/jobs/(tabs)/post"); }} onToggle={toggleJobActive} onShortlist={shortlistApplicant} onReject={rejectApplicant} onDelete={deleteJob}/>) : (<>
              {nearbyJobs.length > 0 && (<react_native_1.View style={s.section}>
                  <react_native_1.View style={s.sectionHeader}>
                    <vector_icons_1.Feather name="map-pin" size={15} color="#059669"/>
                    <react_native_1.Text style={s.sectionTitle}>Jobs Near You</react_native_1.Text>
                    <react_native_1.View style={s.sectionBadge}>
                      <react_native_1.Text style={s.sectionBadgeText}>{nearbyJobs.length}</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>
                  {nearbyJobs.map(function (job) { return (<JobCard key={job.id} job={job} near applied={jobsUser ? hasApplied(job.id, jobsUser.id) : false} onApply={function () { return handleApply(job); }}/>); })}
                </react_native_1.View>)}
              <react_native_1.View style={s.section}>
                <react_native_1.View style={s.sectionHeader}>
                  <vector_icons_1.Feather name="briefcase" size={15} color="#EA580C"/>
                  <react_native_1.Text style={s.sectionTitle}>All Available Jobs</react_native_1.Text>
                  <react_native_1.View style={[s.sectionBadge, { backgroundColor: "#FFEDD5" }]}>
                    <react_native_1.Text style={[s.sectionBadgeText, { color: "#EA580C" }]}>{activeJobs.length}</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>
                {activeJobs.length === 0 ? (<react_native_1.View style={s.empty}>
                    <vector_icons_1.Feather name="briefcase" size={44} color="#CBD5E1"/>
                    <react_native_1.Text style={s.emptyText}>No jobs available yet</react_native_1.Text>
                  </react_native_1.View>) : (activeJobs.map(function (job) { return (<JobCard key={job.id} job={job} applied={jobsUser ? hasApplied(job.id, jobsUser.id) : false} onApply={function () { return handleApply(job); }}/>); }))}
              </react_native_1.View>
            </>)}/>

      <NotificationsModal visible={showNotifs} onClose={function () { return setShowNotifs(false); }} jobs={activeJobs}/>
    </react_native_1.View>);
}
var s = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F8FAFC" },
    header: { paddingHorizontal: 16, paddingBottom: 14, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
    headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 },
    headerTitle: { fontSize: 20, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.75)", fontFamily: "Inter_400Regular", marginTop: 2 },
    headerBadge: { position: "relative", width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
    notifBubble: { position: "absolute", top: 5, right: 5, width: 16, height: 16, borderRadius: 8, backgroundColor: "#FCD34D", alignItems: "center", justifyContent: "center" },
    notifBubbleText: { fontSize: 8, fontWeight: "800", color: "#92400E", fontFamily: "Inter_700Bold" },
    searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, gap: 10 },
    searchPlaceholder: { flex: 1, fontSize: 13, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    filterIconBtn: { width: 30, height: 30, borderRadius: 8, backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center" },
    list: { padding: 14 },
    section: { marginBottom: 8 },
    sectionHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
    sectionTitle: { flex: 1, fontSize: 15, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    sectionBadge: { backgroundColor: "#D1FAE5", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 10 },
    sectionBadgeText: { fontSize: 12, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    empty: { alignItems: "center", justifyContent: "center", paddingTop: 48, gap: 12 },
    emptyText: { fontSize: 15, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    emptySubText: { fontSize: 12, color: "#CBD5E1", fontFamily: "Inter_400Regular", textAlign: "center" },
    // KPI
    kpiGrid: { flexDirection: "row", gap: 10, marginBottom: 10 },
    kpiCard: { borderRadius: 18, padding: 16, gap: 4, flex: 1 },
    kpiBig: {},
    kpiBigNum: { fontSize: 32, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    kpiBigLabel: { fontSize: 13, fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "Inter_700Bold" },
    kpiBigSub: { fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular" },
    kpiRow: { flexDirection: "row", gap: 8, marginBottom: 14 },
    kpiSmall: { flex: 1, borderRadius: 14, borderWidth: 1, padding: 12, alignItems: "center", gap: 4 },
    kpiSmallNum: { fontSize: 20, fontWeight: "800", fontFamily: "Inter_700Bold" },
    kpiSmallLabel: { fontSize: 10, color: "#64748B", fontFamily: "Inter_400Regular" },
    // Funnel
    funnelCard: { backgroundColor: "white", borderRadius: 16, padding: 14, marginBottom: 14, gap: 8, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
    funnelTitle: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    funnelBar: { flexDirection: "row", height: 10, borderRadius: 5, overflow: "hidden", backgroundColor: "#F1F5F9" },
    funnelSeg: { borderRadius: 5 },
    funnelLegend: { flexDirection: "row", gap: 16 },
    funnelLegRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    funnelLegText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular" },
    dot: { width: 12, height: 12, borderRadius: 6 },
    // Post CTA
    postCtaWrap: { borderRadius: 16, overflow: "hidden", marginBottom: 16 },
    postCta: { flexDirection: "row", alignItems: "center", gap: 12, padding: 16 },
    postCtaText: { flex: 1, fontSize: 15, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    // Job performance card
    jobPerfCard: { backgroundColor: "white", borderRadius: 18, marginBottom: 10, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
    jobPerfTop: { flexDirection: "row", alignItems: "center", gap: 12, padding: 14, paddingBottom: 10 },
    jobPerfStats: { flexDirection: "row", borderTopWidth: 1, borderTopColor: "#F1F5F9", paddingHorizontal: 14, paddingVertical: 10 },
    perfStat: { flex: 1, alignItems: "center", gap: 2 },
    perfStatNum: { fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    perfStatLabel: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    perfDivider: { width: 1, backgroundColor: "#F1F5F9" },
    fillRow: { paddingHorizontal: 14, paddingBottom: 10, gap: 5 },
    fillLabel: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular" },
    fillBar: { flexDirection: "row", height: 6, borderRadius: 3, overflow: "hidden", backgroundColor: "#F1F5F9" },
    fillFill: { backgroundColor: "#EA580C", borderRadius: 3 },
    viewAppsBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 14, paddingVertical: 11, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
    viewAppsBtnText: { flex: 1, fontSize: 13, fontWeight: "600", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    deleteJobBtn: { width: 44, alignItems: "center", justifyContent: "center", borderTopWidth: 1, borderTopColor: "#F1F5F9", borderLeftWidth: 1, borderLeftColor: "#F1F5F9", backgroundColor: "#FEF2F2" },
    deleteOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", paddingHorizontal: 28 },
    deleteCard: { backgroundColor: "white", borderRadius: 24, padding: 24, alignItems: "center", gap: 10 },
    deleteIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#FEE2E2", alignItems: "center", justifyContent: "center", marginBottom: 4 },
    deleteTitle: { fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", textAlign: "center" },
    deleteSub: { fontSize: 13, color: "#64748B", fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 19 },
    deleteBtns: { flexDirection: "row", gap: 10, marginTop: 8, width: "100%" },
    deleteCancelBtn: { flex: 1, backgroundColor: "#F1F5F9", padding: 13, borderRadius: 14, alignItems: "center" },
    deleteCancelText: { fontSize: 14, fontWeight: "600", color: "#64748B", fontFamily: "Inter_600SemiBold" },
    deleteConfirmBtn: { flex: 1, backgroundColor: "#DC2626", padding: 13, borderRadius: 14, alignItems: "center", flexDirection: "row", justifyContent: "center", gap: 8 },
    deleteConfirmText: { fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    statusPill: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    statusPillText: { fontSize: 11, fontWeight: "700", fontFamily: "Inter_700Bold" },
    // Recent activity
    activityRow: { flexDirection: "row", alignItems: "flex-start", gap: 10, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    activityDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: "#EA580C", marginTop: 5 },
    activityText: { fontSize: 12, color: "#334155", fontFamily: "Inter_400Regular", lineHeight: 17 },
    // Seeker card
    card: { backgroundColor: "white", borderRadius: 18, shadowColor: "#EA580C", shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 3, marginBottom: 10, overflow: "hidden" },
    cardTappable: { padding: 14 },
    nearBadge: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#D1FAE5", paddingHorizontal: 10, paddingVertical: 4, alignSelf: "flex-start", margin: 10, marginBottom: 0, borderRadius: 8 },
    nearBadgeText: { fontSize: 10, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    cardHeader: { flexDirection: "row", alignItems: "flex-start", gap: 12, marginBottom: 10 },
    catIcon: { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center" },
    cardTitle: { fontSize: 15, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    cardCompany: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
    cardMeta: { flexDirection: "row", gap: 6, flexWrap: "wrap", marginBottom: 10 },
    metaChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#F1F5F9", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    metaText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular" },
    salaryRow: { flexDirection: "row", alignItems: "center", gap: 4 },
    salary: { fontSize: 15, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    expandedSection: { backgroundColor: "#F8FAFC", padding: 14, gap: 6 },
    expandLabel: { fontSize: 11, fontWeight: "700", color: "#475569", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5 },
    expandText: { fontSize: 13, color: "#334155", fontFamily: "Inter_400Regular", lineHeight: 18 },
    cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 14, paddingVertical: 12, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
    applicantsText: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    applyBtn: { borderRadius: 10, overflow: "hidden" },
    applyBtnDone: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D1FAE5", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
    applyGrad: { paddingHorizontal: 18, paddingVertical: 9 },
    applyBtnText: { fontSize: 13, fontWeight: "700", fontFamily: "Inter_700Bold" },
    applyBtnTextWhite: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    // Notifications modal
    notifOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
    notifPanel: { backgroundColor: "white", borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 16, paddingTop: 12, maxHeight: "80%" },
    appPanel: { backgroundColor: "white", borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 16, paddingTop: 12, maxHeight: "90%" },
    notifHandle: { width: 40, height: 4, backgroundColor: "#E2E8F0", borderRadius: 2, alignSelf: "center", marginBottom: 12 },
    notifHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 12 },
    notifTitle: { fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    notifClose: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center" },
    notifEmpty: { alignItems: "center", paddingVertical: 40, gap: 10 },
    notifEmptyText: { fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    notifItem: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    notifDot: { width: 36, height: 36, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    notifItemTitle: { fontSize: 13, fontWeight: "600", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    notifItemSub: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
    notifTime: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    // Applicants modal
    pipelineRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
    pipePill: { flex: 1, borderRadius: 12, borderWidth: 1, padding: 10, alignItems: "center", gap: 2 },
    pipeNum: { fontSize: 22, fontWeight: "800", fontFamily: "Inter_700Bold" },
    pipeLabel: { fontSize: 10, color: "#64748B", fontFamily: "Inter_400Regular" },
    appSectionLabel: { fontSize: 12, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.5, marginTop: 12, marginBottom: 6 },
    appRow: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#F8FAFC" },
    appAvatar: { width: 38, height: 38, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    appName: { fontSize: 13, fontWeight: "600", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    appId: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    appActionBtn: { borderRadius: 8, overflow: "hidden" },
    appActionGrad: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 10, paddingVertical: 7 },
    appActionText: { fontSize: 11, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
