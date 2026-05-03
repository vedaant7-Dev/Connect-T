"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ResumeScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
var TEMPLATES = [
    { id: "classic", name: "Classic", desc: "Orange saffron header, clean sections", accent: "#EA580C" },
    { id: "modern", name: "Modern", desc: "Dark header · blue accents · clean sections", accent: "#1D4ED8" },
    { id: "minimal", name: "Minimal", desc: "Clean black & white with subtle accents", accent: "#059669" },
];
function ClassicResume(_a) {
    var user = _a.user;
    return (<react_native_1.View style={r.page}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={r.classicHeader}>
        <react_native_1.View style={r.classicAvatar}>
          {user.profilePhoto
            ? <react_native_1.Image source={{ uri: user.profilePhoto }} style={r.classicAvatarImg}/>
            : <react_native_1.Text style={r.classicAvatarText}>{user.name.split(" ").map(function (n) { return n[0]; }).join("").slice(0, 2).toUpperCase()}</react_native_1.Text>}
        </react_native_1.View>
        <react_native_1.View style={{ flex: 1 }}>
          <react_native_1.Text style={r.classicName}>{user.name}</react_native_1.Text>
          <react_native_1.Text style={r.classicRole}>{user.currentRole || user.qualification || "Job Seeker"}</react_native_1.Text>
          <react_native_1.View style={r.classicContact}>
            <react_native_1.Text style={r.classicContactText}>📞 +91 {user.phone}</react_native_1.Text>
            {user.email && <react_native_1.Text style={r.classicContactText}>✉ {user.email}</react_native_1.Text>}
            {user.location && <react_native_1.Text style={r.classicContactText}>📍 {user.location}</react_native_1.Text>}
          </react_native_1.View>
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.View style={r.classicBody}>
        {user.about && (<ResumeSection title="OBJECTIVE" color="#EA580C">
            <react_native_1.Text style={r.bodyText}>{user.about}</react_native_1.Text>
          </ResumeSection>)}

        <ResumeSection title="EDUCATION" color="#EA580C">
          <react_native_1.Text style={r.bodyText}>{user.qualification || "—"}</react_native_1.Text>
        </ResumeSection>

        {(user.currentCompany || user.previousCompany || user.experience) && (<ResumeSection title="WORK EXPERIENCE" color="#EA580C">
            {user.currentCompany && (<react_native_1.View style={r.expEntry}>
                <react_native_1.Text style={r.expRole}>{user.currentRole || "Employee"}</react_native_1.Text>
                <react_native_1.Text style={r.expCompany}>{user.currentCompany} · Current</react_native_1.Text>
              </react_native_1.View>)}
            {user.previousCompany && (<react_native_1.View style={r.expEntry}>
                <react_native_1.Text style={r.expRole}>{user.previousRole || "Employee"}</react_native_1.Text>
                <react_native_1.Text style={r.expCompany}>{user.previousCompany} · Previous</react_native_1.Text>
              </react_native_1.View>)}
            {user.experience && <react_native_1.Text style={r.bodyText}>Total Experience: {user.experience}</react_native_1.Text>}
          </ResumeSection>)}

        {user.skills && (<ResumeSection title="SKILLS" color="#EA580C">
            <react_native_1.View style={r.skillsWrap}>
              {user.skills.split(",").map(function (s, i) { return (<react_native_1.View key={i} style={[r.skillChip, { backgroundColor: "#FFF7ED", borderColor: "#FED7AA" }]}>
                  <react_native_1.Text style={[r.skillText, { color: "#C2410C" }]}>{s.trim()}</react_native_1.Text>
                </react_native_1.View>); })}
            </react_native_1.View>
          </ResumeSection>)}

        {user.languages && (<ResumeSection title="LANGUAGES" color="#EA580C">
            <react_native_1.Text style={r.bodyText}>{user.languages}</react_native_1.Text>
          </ResumeSection>)}
      </react_native_1.View>
    </react_native_1.View>);
}
function ModernResume(_a) {
    var user = _a.user;
    var initials = user.name.split(" ").map(function (n) { return n[0]; }).join("").slice(0, 2).toUpperCase();
    return (<react_native_1.View style={r.page}>
      {/* Header band */}
      <react_native_1.View style={r.modHeader}>
        <react_native_1.View style={r.modAvatarCircle}>
          {user.profilePhoto
            ? <react_native_1.Image source={{ uri: user.profilePhoto }} style={r.modAvatarImg}/>
            : <react_native_1.Text style={r.modAvatarText}>{initials}</react_native_1.Text>}
        </react_native_1.View>
        <react_native_1.View style={{ flex: 1 }}>
          <react_native_1.Text style={r.modName}>{user.name}</react_native_1.Text>
          <react_native_1.Text style={r.modRole}>{user.currentRole || user.qualification || "Job Seeker"}</react_native_1.Text>
          <react_native_1.View style={r.modContactRow}>
            <react_native_1.Text style={r.modContactItem}>📞 +91 {user.phone}</react_native_1.Text>
            {user.email ? <react_native_1.Text style={r.modContactItem}>✉ {user.email}</react_native_1.Text> : null}
            {user.location ? <react_native_1.Text style={r.modContactItem}>📍 {user.location}</react_native_1.Text> : null}
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>

      {/* Accent bar */}
      <react_native_1.View style={r.modAccentBar}/>

      {/* Body */}
      <react_native_1.View style={r.modBody}>
        {user.about ? (<react_native_1.View style={r.modSection}>
            <react_native_1.View style={r.modSectionLabel}><react_native_1.Text style={r.modSectionText}>ABOUT ME</react_native_1.Text></react_native_1.View>
            <react_native_1.Text style={r.bodyText}>{user.about}</react_native_1.Text>
          </react_native_1.View>) : null}

        <react_native_1.View style={r.modSection}>
          <react_native_1.View style={r.modSectionLabel}><react_native_1.Text style={r.modSectionText}>EDUCATION</react_native_1.Text></react_native_1.View>
          <react_native_1.Text style={r.expRole}>{user.qualification || "—"}</react_native_1.Text>
        </react_native_1.View>

        {(user.experience || user.currentCompany || user.previousCompany) ? (<react_native_1.View style={r.modSection}>
            <react_native_1.View style={r.modSectionLabel}><react_native_1.Text style={r.modSectionText}>EXPERIENCE</react_native_1.Text></react_native_1.View>
            {user.experience ? <react_native_1.Text style={[r.bodyText, { marginBottom: 6 }]}>Total: {user.experience}</react_native_1.Text> : null}
            {user.currentCompany ? (<react_native_1.View style={r.modExpCard}>
                <react_native_1.View style={r.modExpDot}/>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={r.expRole}>{user.currentRole || "Employee"}</react_native_1.Text>
                  <react_native_1.Text style={r.expCompany}>{user.currentCompany}  ·  Current</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>) : null}
            {user.previousCompany ? (<react_native_1.View style={r.modExpCard}>
                <react_native_1.View style={[r.modExpDot, { backgroundColor: "#94A3B8" }]}/>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={r.expRole}>{user.previousRole || "Employee"}</react_native_1.Text>
                  <react_native_1.Text style={r.expCompany}>{user.previousCompany}  ·  Previous</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>) : null}
          </react_native_1.View>) : null}

        {user.skills ? (<react_native_1.View style={r.modSection}>
            <react_native_1.View style={r.modSectionLabel}><react_native_1.Text style={r.modSectionText}>SKILLS</react_native_1.Text></react_native_1.View>
            <react_native_1.View style={r.skillsWrap}>
              {user.skills.split(",").map(function (s, i) { return (<react_native_1.View key={i} style={[r.skillChip, { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" }]}>
                  <react_native_1.Text style={[r.skillText, { color: "#1D4ED8" }]}>{s.trim()}</react_native_1.Text>
                </react_native_1.View>); })}
            </react_native_1.View>
          </react_native_1.View>) : null}

        {user.languages ? (<react_native_1.View style={r.modSection}>
            <react_native_1.View style={r.modSectionLabel}><react_native_1.Text style={r.modSectionText}>LANGUAGES</react_native_1.Text></react_native_1.View>
            <react_native_1.Text style={r.bodyText}>{user.languages}</react_native_1.Text>
          </react_native_1.View>) : null}
      </react_native_1.View>
    </react_native_1.View>);
}
function MinimalResume(_a) {
    var user = _a.user;
    return (<react_native_1.View style={r.page}>
      <react_native_1.View style={r.minimalHeader}>
        <react_native_1.Text style={r.minimalName}>{user.name}</react_native_1.Text>
        <react_native_1.View style={r.minimalAccentLine}/>
        <react_native_1.Text style={r.minimalRole}>{user.currentRole || user.qualification || "Job Seeker"}</react_native_1.Text>
        <react_native_1.View style={r.minimalContactRow}>
          <react_native_1.Text style={r.minimalContact}>+91 {user.phone}</react_native_1.Text>
          {user.email && <react_native_1.Text style={r.minimalContact}>{user.email}</react_native_1.Text>}
          {user.location && <react_native_1.Text style={r.minimalContact}>{user.location}</react_native_1.Text>}
        </react_native_1.View>
      </react_native_1.View>

      <react_native_1.View style={r.minimalBody}>
        {user.about && (<ResumeSection title="Career Objective" color="#059669">
            <react_native_1.Text style={r.bodyText}>{user.about}</react_native_1.Text>
          </ResumeSection>)}

        <ResumeSection title="Education" color="#059669">
          <react_native_1.Text style={r.bodyText}>{user.qualification || "—"}</react_native_1.Text>
        </ResumeSection>

        {(user.currentCompany || user.previousCompany || user.experience) && (<ResumeSection title="Work Experience" color="#059669">
            {user.experience && <react_native_1.Text style={[r.bodyText, { marginBottom: 6 }]}>Total Experience: {user.experience}</react_native_1.Text>}
            {user.currentCompany && (<react_native_1.View style={r.expEntry}>
                <react_native_1.Text style={r.expRole}>{user.currentRole || "Employee"}</react_native_1.Text>
                <react_native_1.Text style={r.expCompany}>{user.currentCompany} (Current)</react_native_1.Text>
              </react_native_1.View>)}
            {user.previousCompany && (<react_native_1.View style={r.expEntry}>
                <react_native_1.Text style={r.expRole}>{user.previousRole || "Employee"}</react_native_1.Text>
                <react_native_1.Text style={r.expCompany}>{user.previousCompany} (Previous)</react_native_1.Text>
              </react_native_1.View>)}
          </ResumeSection>)}

        {user.skills && (<ResumeSection title="Skills" color="#059669">
            <react_native_1.View style={r.skillsWrap}>
              {user.skills.split(",").map(function (s, i) { return (<react_native_1.View key={i} style={[r.skillChip, { backgroundColor: "#D1FAE5", borderColor: "#86EFAC" }]}>
                  <react_native_1.Text style={[r.skillText, { color: "#065F46" }]}>{s.trim()}</react_native_1.Text>
                </react_native_1.View>); })}
            </react_native_1.View>
          </ResumeSection>)}

        {user.languages && (<ResumeSection title="Languages" color="#059669">
            <react_native_1.Text style={r.bodyText}>{user.languages}</react_native_1.Text>
          </ResumeSection>)}
      </react_native_1.View>
    </react_native_1.View>);
}
function ResumeSection(_a) {
    var title = _a.title, color = _a.color, children = _a.children;
    return (<react_native_1.View style={r.section}>
      <react_native_1.View style={[r.sectionTitleRow, { borderBottomColor: color }]}>
        <react_native_1.Text style={[r.sectionTitle, { color: color }]}>{title}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={r.sectionBody}>{children}</react_native_1.View>
    </react_native_1.View>);
}
function ResumeScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 44 : insets.top;
    var router = (0, expo_router_1.useRouter)();
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var _a = (0, react_1.useState)("classic"), selected = _a[0], setSelected = _a[1];
    if (!jobsUser)
        return null;
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 10 }]}>
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={styles.backBtn}>
            <vector_icons_1.Feather name="x" size={20} color="white"/>
          </react_native_1.TouchableOpacity>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={styles.headerTitle}>Your Resume</react_native_1.Text>
            <react_native_1.Text style={styles.headerSub}>Generated from your profile</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.TouchableOpacity onPress={function () { return react_native_1.Alert.alert("Screenshot to Save", "Take a screenshot of the resume below to save or share it."); }} style={styles.shareBtn}>
            <vector_icons_1.Feather name="share-2" size={16} color="white"/>
            <react_native_1.Text style={styles.shareBtnText}>Share</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>

        <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.templateRow}>
          {TEMPLATES.map(function (t) { return (<react_native_1.TouchableOpacity key={t.id} style={[styles.templateChip, selected === t.id && styles.templateChipActive]} onPress={function () { return setSelected(t.id); }} activeOpacity={0.8}>
              <react_native_1.View style={[styles.templateDot, { backgroundColor: t.accent }]}/>
              <react_native_1.View>
                <react_native_1.Text style={[styles.templateName, selected === t.id && { color: "#EA580C" }]}>{t.name}</react_native_1.Text>
                <react_native_1.Text style={styles.templateDesc}>{t.desc}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>); })}
        </react_native_1.ScrollView>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.preview, { paddingBottom: Math.max(insets.bottom, 16) + 20 }]} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.paperShadow}>
          {selected === "classic" && <ClassicResume user={jobsUser}/>}
          {selected === "modern" && <ModernResume user={jobsUser}/>}
          {selected === "minimal" && <MinimalResume user={jobsUser}/>}
        </react_native_1.View>

        <react_native_1.View style={styles.hint}>
          <vector_icons_1.Feather name="info" size={14} color="#94A3B8"/>
          <react_native_1.Text style={styles.hintText}>Take a screenshot to save your resume. Swipe left/right above to switch templates.</react_native_1.Text>
        </react_native_1.View>

        <react_native_1.TouchableOpacity style={styles.updateBtn} onPress={function () { router.back(); }} activeOpacity={0.85}>
          <vector_icons_1.Feather name="edit-2" size={16} color="#EA580C"/>
          <react_native_1.Text style={styles.updateBtnText}>Update Profile to Refresh Resume</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F1F5F9" },
    header: { paddingHorizontal: 16, paddingBottom: 12, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 },
    backBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
    headerTitle: { fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular" },
    shareBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12 },
    shareBtnText: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    templateRow: { gap: 10, paddingBottom: 4 },
    templateChip: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 2, borderColor: "transparent" },
    templateChipActive: { borderColor: "#EA580C", backgroundColor: "white" },
    templateDot: { width: 12, height: 12, borderRadius: 6 },
    templateName: { fontSize: 13, fontWeight: "700", color: "#334155", fontFamily: "Inter_700Bold" },
    templateDesc: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", maxWidth: 130 },
    preview: { padding: 16 },
    paperShadow: { shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 20, shadowOffset: { width: 0, height: 6 }, elevation: 8, borderRadius: 4 },
    hint: { flexDirection: "row", alignItems: "flex-start", gap: 8, marginTop: 16, paddingHorizontal: 4 },
    hintText: { flex: 1, fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular", lineHeight: 17 },
    updateBtn: { flexDirection: "row", alignItems: "center", gap: 8, justifyContent: "center", backgroundColor: "white", borderRadius: 14, padding: 14, marginTop: 12, borderWidth: 1.5, borderColor: "#FED7AA" },
    updateBtnText: { fontSize: 14, fontWeight: "600", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
});
var r = react_native_1.StyleSheet.create({
    page: { backgroundColor: "white", borderRadius: 4, overflow: "hidden" },
    classicHeader: { padding: 20, flexDirection: "row", gap: 16, alignItems: "center" },
    classicAvatar: { width: 72, height: 72, borderRadius: 36, backgroundColor: "rgba(255,255,255,0.3)", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.5)" },
    classicAvatarImg: { width: 72, height: 72, borderRadius: 36 },
    classicAvatarText: { fontSize: 26, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    classicName: { fontSize: 20, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    classicRole: { fontSize: 13, color: "rgba(255,255,255,0.85)", fontFamily: "Inter_400Regular", marginTop: 2 },
    classicContact: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
    classicContactText: { fontSize: 11, color: "rgba(255,255,255,0.8)", fontFamily: "Inter_400Regular" },
    classicBody: { padding: 16 },
    modHeader: { backgroundColor: "#0F172A", padding: 20, flexDirection: "row", alignItems: "center", gap: 16 },
    modAvatarCircle: { width: 68, height: 68, borderRadius: 34, backgroundColor: "#1D4ED8", alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "#3B82F6" },
    modAvatarImg: { width: 68, height: 68, borderRadius: 34 },
    modAvatarText: { fontSize: 24, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
    modName: { fontSize: 19, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
    modRole: { fontSize: 12, color: "#93C5FD", fontFamily: "Inter_400Regular", marginTop: 3 },
    modContactRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 },
    modContactItem: { fontSize: 10, color: "#CBD5E1", fontFamily: "Inter_400Regular" },
    modAccentBar: { height: 4, backgroundColor: "#1D4ED8" },
    modBody: { padding: 16, gap: 2 },
    modSection: { marginBottom: 14, borderLeftWidth: 3, borderLeftColor: "#BFDBFE", paddingLeft: 12 },
    modSectionLabel: { backgroundColor: "#EFF6FF", alignSelf: "flex-start", paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, marginBottom: 8 },
    modSectionText: { fontSize: 10, fontWeight: "700", color: "#1D4ED8", fontFamily: "Inter_700Bold", letterSpacing: 0.8 },
    modExpCard: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 8 },
    modExpDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#1D4ED8", marginTop: 4 },
    minimalHeader: { padding: 24, borderBottomWidth: 2, borderBottomColor: "#E2E8F0" },
    minimalName: { fontSize: 26, fontWeight: "900", color: "#0F172A", fontFamily: "Inter_700Bold" },
    minimalAccentLine: { width: 40, height: 3, backgroundColor: "#059669", borderRadius: 2, marginTop: 6, marginBottom: 8 },
    minimalRole: { fontSize: 14, color: "#475569", fontFamily: "Inter_400Regular" },
    minimalContactRow: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginTop: 8 },
    minimalContact: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular" },
    minimalBody: { padding: 16 },
    section: { marginBottom: 14 },
    sectionTitleRow: { borderBottomWidth: 1.5, paddingBottom: 4, marginBottom: 8 },
    sectionTitle: { fontSize: 11, fontWeight: "700", fontFamily: "Inter_700Bold", letterSpacing: 0.8, textTransform: "uppercase" },
    sectionBody: {},
    bodyText: { fontSize: 12, color: "#475569", fontFamily: "Inter_400Regular", lineHeight: 18 },
    expEntry: { marginBottom: 8 },
    expRole: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    expCompany: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 1 },
    skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 6 },
    skillChip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, borderWidth: 1 },
    skillText: { fontSize: 11, fontFamily: "Inter_500Medium" },
});
