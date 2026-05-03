"use strict";
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
exports.default = JobsProfileScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var ImagePicker = require("expo-image-picker");
var expo_router_1 = require("expo-router");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
var JobsContext_1 = require("@/context/JobsContext");
var STATUS_OPTIONS = [
    { id: "employed", label: "Currently Employed", icon: "briefcase", color: "#059669" },
    { id: "unemployed", label: "Looking for Work", icon: "search", color: "#EA580C" },
    { id: "student", label: "Student", icon: "book-open", color: "#7C3AED" },
    { id: "fresher", label: "Fresher (No Exp)", icon: "star", color: "#0369A1" },
];
var COMPANY_TYPES = ["Private Ltd", "Public Ltd", "Partnership", "Proprietorship", "Government", "NGO / Trust", "Other"];
var COMPANY_SIZES = ["1–10 employees", "11–50 employees", "51–200 employees", "201–500 employees", "500+ employees"];
var INDUSTRIES = ["Manufacturing", "IT / Software", "Retail / FMCG", "Healthcare", "Construction", "Transport / Logistics", "Education", "Security", "Finance / Banking", "Hospitality", "Agriculture", "Other"];
function Avatar(_a) {
    var user = _a.user, _b = _a.size, size = _b === void 0 ? 72 : _b;
    var initials = (user.name || "U").split(" ").map(function (n) { return n[0]; }).join("").slice(0, 2).toUpperCase();
    if (user.profilePhoto) {
        return <react_native_1.Image source={{ uri: user.profilePhoto }} style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 3, borderColor: "rgba(255,255,255,0.5)" }}/>;
    }
    return (<react_native_1.View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: user.avatarColor, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "rgba(255,255,255,0.4)" }}>
      <react_native_1.Text style={{ fontSize: size * 0.32, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" }}>{initials}</react_native_1.Text>
    </react_native_1.View>);
}
function CompletionBar(_a) {
    var pct = _a.pct;
    return (<react_native_1.View style={cs.barWrap}>
      <react_native_1.View style={cs.barTrack}>
        <react_native_1.View style={[cs.barFill, { width: "".concat(pct, "%"), backgroundColor: "#FFFFFF" }]}/>
      </react_native_1.View>
      <react_native_1.Text style={cs.barLabel}>{pct}%</react_native_1.Text>
    </react_native_1.View>);
}
function InfoRow(_a) {
    var icon = _a.icon, label = _a.label, value = _a.value, accent = _a.accent;
    if (!value)
        return null;
    return (<react_native_1.View style={cs.infoRow}>
      <react_native_1.View style={[cs.infoIconWrap, accent && { backgroundColor: "#FFEDD5" }]}>
        <vector_icons_1.Feather name={icon} size={14} color={accent ? "#EA580C" : "#64748B"}/>
      </react_native_1.View>
      <react_native_1.View style={{ flex: 1 }}>
        <react_native_1.Text style={cs.infoLabel}>{label}</react_native_1.Text>
        <react_native_1.Text style={cs.infoValue}>{value}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
}
function SectionCard(_a) {
    var title = _a.title, icon = _a.icon, children = _a.children;
    return (<react_native_1.View style={cs.sectionCard}>
      <react_native_1.View style={cs.sectionCardHeader}>
        <react_native_1.View style={cs.sectionIconWrap}>
          <vector_icons_1.Feather name={icon} size={14} color="#EA580C"/>
        </react_native_1.View>
        <react_native_1.Text style={cs.sectionCardTitle}>{title}</react_native_1.Text>
      </react_native_1.View>
      {children}
    </react_native_1.View>);
}
function EditField(_a) {
    var label = _a.label, value = _a.value, onChange = _a.onChange, placeholder = _a.placeholder, keyboardType = _a.keyboardType, multiline = _a.multiline;
    return (<react_native_1.View style={cs.fieldWrap}>
      <react_native_1.Text style={cs.fieldLabel}>{label}</react_native_1.Text>
      <react_native_1.TextInput style={[cs.fieldInput, multiline && { minHeight: 80, textAlignVertical: "top", paddingTop: 12 }]} value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor="#CBD5E1" keyboardType={keyboardType} multiline={multiline} numberOfLines={multiline ? 4 : 1} autoCapitalize={keyboardType === "email-address" || keyboardType === "url" ? "none" : "sentences"}/>
    </react_native_1.View>);
}
function SelectField(_a) {
    var label = _a.label, value = _a.value, options = _a.options, onChange = _a.onChange;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    return (<react_native_1.View style={cs.fieldWrap}>
      <react_native_1.Text style={cs.fieldLabel}>{label}</react_native_1.Text>
      <react_native_1.TouchableOpacity style={cs.selectBtn} onPress={function () { return setOpen(true); }} activeOpacity={0.8}>
        <react_native_1.Text style={[cs.selectBtnText, !value && { color: "#CBD5E1" }]}>{value || "Select ".concat(label)}</react_native_1.Text>
        <vector_icons_1.Feather name="chevron-down" size={14} color="#94A3B8"/>
      </react_native_1.TouchableOpacity>
      <react_native_1.Modal visible={open} transparent animationType="fade" onRequestClose={function () { return setOpen(false); }}>
        <react_native_1.TouchableOpacity style={cs.selectOverlay} activeOpacity={1} onPress={function () { return setOpen(false); }}>
          <react_native_1.View style={cs.selectList}>
            <react_native_1.Text style={cs.selectListTitle}>{label}</react_native_1.Text>
            <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 280 }}>
              {options.map(function (opt) { return (<react_native_1.TouchableOpacity key={opt} style={[cs.selectItem, value === opt && cs.selectItemActive]} onPress={function () { onChange(opt); setOpen(false); }}>
                  <react_native_1.Text style={[cs.selectItemText, value === opt && { color: "#EA580C", fontFamily: "Inter_600SemiBold" }]}>{opt}</react_native_1.Text>
                  {value === opt && <vector_icons_1.Feather name="check" size={14} color="#EA580C"/>}
                </react_native_1.TouchableOpacity>); })}
            </react_native_1.ScrollView>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>
      </react_native_1.Modal>
    </react_native_1.View>);
}
function JobsProfileScreen() {
    var _this = this;
    var _a, _b, _c, _d, _e;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var _f = (0, JobsAuthContext_1.useJobsAuth)(), jobsUser = _f.jobsUser, logoutJobs = _f.logoutJobs, updateJobsUser = _f.updateJobsUser, addCompany = _f.addCompany, updateCompany = _f.updateCompany;
    var _g = (0, JobsContext_1.useJobs)(), getJobsByEmployer = _g.getJobsByEmployer, jobs = _g.jobs;
    var router = (0, expo_router_1.useRouter)();
    var _h = (0, react_1.useState)(false), showLogout = _h[0], setShowLogout = _h[1];
    var _j = (0, react_1.useState)(false), editing = _j[0], setEditing = _j[1];
    // Seeker fields
    var _k = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.name) || ""), eName = _k[0], setEName = _k[1];
    var _l = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.email) || ""), eEmail = _l[0], setEEmail = _l[1];
    var _m = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.age) || ""), eAge = _m[0], setEAge = _m[1];
    var _o = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.qualification) || ""), eQual = _o[0], setEQual = _o[1];
    var _p = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.skills) || ""), eSkills = _p[0], setESkills = _p[1];
    var _q = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.about) || ""), eAbout = _q[0], setEAbout = _q[1];
    var _r = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.currentStatus) || ""), eStatus = _r[0], setEStatus = _r[1];
    var _s = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.currentCompany) || ""), eCurrentCompany = _s[0], setECurrentCompany = _s[1];
    var _t = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.currentRole) || ""), eCurrentRole = _t[0], setECurrentRole = _t[1];
    var _u = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.experience) || ""), eExperience = _u[0], setEExperience = _u[1];
    var _v = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.previousCompany) || ""), ePrevCompany = _v[0], setEPrevCompany = _v[1];
    var _w = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.previousRole) || ""), ePrevRole = _w[0], setEPrevRole = _w[1];
    var _x = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.collegeName) || ""), eCollegeName = _x[0], setECollegeName = _x[1];
    var _y = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.fieldOfStudy) || ""), eFieldOfStudy = _y[0], setEFieldOfStudy = _y[1];
    var _z = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.location) || ""), eLocation = _z[0], setELocation = _z[1];
    var _0 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.languages) || ""), eLanguages = _0[0], setELanguages = _0[1];
    // Employer fields
    var _1 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.company) || ""), eCompany = _1[0], setECompany = _1[1];
    var _2 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.gstNo) || ""), eGst = _2[0], setEGst = _2[1];
    var _3 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.companyType) || ""), eCompanyType = _3[0], setECompanyType = _3[1];
    var _4 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.companySize) || ""), eCompanySize = _4[0], setECompanySize = _4[1];
    var _5 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.industry) || ""), eIndustry = _5[0], setEIndustry = _5[1];
    var _6 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.website) || ""), eWebsite = _6[0], setEWebsite = _6[1];
    var _7 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.companyDescription) || ""), eCompanyDesc = _7[0], setECompanyDesc = _7[1];
    var _8 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.address) || ""), eAddress = _8[0], setEAddress = _8[1];
    var _9 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.pincode) || ""), ePincode = _9[0], setEPincode = _9[1];
    var _10 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.whatsapp) || ""), eWhatsapp = _10[0], setEWhatsapp = _10[1];
    var _11 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.yearEstablished) || ""), eYearEst = _11[0], setEYearEst = _11[1];
    var _12 = (0, react_1.useState)((jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.contactPerson) || ""), eContactPerson = _12[0], setEContactPerson = _12[1];
    var _13 = (0, react_1.useState)(false), descriptionOnlyEdit = _13[0], setDescriptionOnlyEdit = _13[1];
    var _14 = (0, react_1.useState)(null), companyEditId = _14[0], setCompanyEditId = _14[1];
    var _15 = (0, react_1.useState)(false), showCompanyEdit = _15[0], setShowCompanyEdit = _15[1];
    if (!jobsUser)
        return null;
    var isEmployer = jobsUser.role === "employer";
    var completion = (0, JobsAuthContext_1.calcProfileCompletion)(jobsUser);
    var myJobs = isEmployer ? getJobsByEmployer(jobsUser.id) : [];
    var totalApplicants = myJobs.reduce(function (a, j) { return a + j.applicants.length; }, 0);
    var totalShortlisted = myJobs.reduce(function (a, j) { return a + j.shortlisted.length; }, 0);
    var activeJobs = myJobs.filter(function (j) { return j.active; }).length;
    var appliedCount = isEmployer ? 0 : jobs.filter(function (j) { return j.applicants.includes(jobsUser.id); }).length;
    var isVerified = !!((_a = jobsUser.gstNo) === null || _a === void 0 ? void 0 : _a.trim());
    var pickPhoto = function () { return __awaiter(_this, void 0, void 0, function () {
        var perm, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ImagePicker.requestMediaLibraryPermissionsAsync()];
                case 1:
                    perm = _a.sent();
                    if (!perm.granted) {
                        react_native_1.Alert.alert("Permission needed", "Allow photo library access.");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({ mediaTypes: ["images"], allowsEditing: true, aspect: [1, 1], quality: 0.7 })];
                case 2:
                    result = _a.sent();
                    if (!(!result.canceled && result.assets[0])) return [3 /*break*/, 4];
                    return [4 /*yield*/, updateJobsUser({ profilePhoto: result.assets[0].uri })];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var handleSave = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!eName.trim()) {
                        react_native_1.Alert.alert("Name is required");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, updateJobsUser({
                            name: eName.trim(), email: eEmail.trim(), age: eAge.trim(),
                            qualification: eQual.trim(), skills: eSkills.trim(), about: eAbout.trim(),
                            currentStatus: eStatus || undefined,
                            currentCompany: eStatus === "employed" ? eCurrentCompany.trim() : "",
                            currentRole: eStatus === "employed" ? eCurrentRole.trim() : "",
                            experience: eStatus === "fresher" ? "Fresher" : eExperience.trim(),
                            previousCompany: ePrevCompany.trim(),
                            previousRole: ePrevRole.trim(),
                            collegeName: eStatus === "student" ? eCollegeName.trim() : "",
                            fieldOfStudy: eStatus === "student" ? eFieldOfStudy.trim() : "",
                            location: eLocation.trim(), languages: eLanguages.trim(),
                            company: eCompany.trim(), gstNo: eGst.trim(),
                            companyType: eCompanyType, companySize: eCompanySize, industry: eIndustry,
                            website: eWebsite.trim(), companyDescription: eCompanyDesc.trim(),
                            address: eAddress.trim(), pincode: ePincode.trim(),
                            whatsapp: eWhatsapp.trim(), yearEstablished: eYearEst.trim(),
                            contactPerson: eContactPerson.trim(),
                        })];
                case 1:
                    _a.sent();
                    setEditing(false);
                    react_native_1.Alert.alert("Saved", "Profile updated successfully.");
                    return [2 /*return*/];
            }
        });
    }); };
    var openEdit = function () {
        setEName(jobsUser.name || "");
        setEEmail(jobsUser.email || "");
        setEAge(jobsUser.age || "");
        setEQual(jobsUser.qualification || "");
        setESkills(jobsUser.skills || "");
        setEAbout(jobsUser.about || "");
        setEStatus(jobsUser.currentStatus || "");
        setECurrentCompany(jobsUser.currentCompany || "");
        setECurrentRole(jobsUser.currentRole || "");
        setEExperience(jobsUser.experience || "");
        setEPrevCompany(jobsUser.previousCompany || "");
        setEPrevRole(jobsUser.previousRole || "");
        setECollegeName(jobsUser.collegeName || "");
        setEFieldOfStudy(jobsUser.fieldOfStudy || "");
        setELocation(jobsUser.location || "");
        setELanguages(jobsUser.languages || "");
        setECompany(jobsUser.company || "");
        setEGst(jobsUser.gstNo || "");
        setECompanyType(jobsUser.companyType || "");
        setECompanySize(jobsUser.companySize || "");
        setEIndustry(jobsUser.industry || "");
        setEWebsite(jobsUser.website || "");
        setECompanyDesc(jobsUser.companyDescription || "");
        setEAddress(jobsUser.address || "");
        setEPincode(jobsUser.pincode || "");
        setEWhatsapp(jobsUser.whatsapp || "");
        setEYearEst(jobsUser.yearEstablished || "");
        setEContactPerson(jobsUser.contactPerson || "");
        setDescriptionOnlyEdit(false);
        setEditing(true);
    };
    var openFullSeekerEdit = function () {
        setShowCompanyEdit(false);
        setDescriptionOnlyEdit(false);
        openEdit();
    };
    var openDescriptionEdit = function () {
        setECompanyDesc(jobsUser.companyDescription || "");
        setDescriptionOnlyEdit(true);
        setEditing(true);
    };
    var openCompanyEditor = function (companyId) {
        var _a;
        if (companyId) {
            var company = (_a = jobsUser.companies) === null || _a === void 0 ? void 0 : _a.find(function (c) { return c.id === companyId; });
            if (!company)
                return;
            setCompanyEditId(companyId);
            setECompany(company.name || "");
            setECompanyType(company.type || "");
            setECompanySize(company.size || "");
            setEIndustry(company.industry || "");
            setEWebsite(company.website || "");
            setECompanyDesc(company.description || "");
            setEAddress(company.address || "");
            setEPincode(company.pincode || "");
            setEWhatsapp(company.whatsapp || "");
            setEYearEst(company.yearEstablished || "");
            setEContactPerson(company.contactPerson || "");
            setEGst(company.gstNo || "");
        }
        else {
            setCompanyEditId(null);
            setECompany("");
            setECompanyType("");
            setECompanySize("");
            setEIndustry("");
            setEWebsite("");
            setECompanyDesc("");
            setEAddress("");
            setEPincode("");
            setEWhatsapp("");
            setEYearEst("");
            setEContactPerson("");
            setEGst("");
        }
        setDescriptionOnlyEdit(false);
        setShowCompanyEdit(true);
        setEditing(true);
    };
    var saveCompany = function () { return __awaiter(_this, void 0, void 0, function () {
        var payload;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!eCompany.trim()) {
                        react_native_1.Alert.alert("Company name is required");
                        return [2 /*return*/];
                    }
                    payload = {
                        name: eCompany.trim(),
                        type: eCompanyType,
                        size: eCompanySize,
                        industry: eIndustry,
                        website: eWebsite.trim(),
                        description: eCompanyDesc.trim(),
                        address: eAddress.trim(),
                        pincode: ePincode.trim(),
                        whatsapp: eWhatsapp.trim(),
                        yearEstablished: eYearEst.trim(),
                        contactPerson: eContactPerson.trim(),
                        gstNo: eGst.trim(),
                    };
                    if (!companyEditId) return [3 /*break*/, 2];
                    return [4 /*yield*/, updateCompany(companyEditId, payload)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, addCompany(payload)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4:
                    setEditing(false);
                    setShowCompanyEdit(false);
                    react_native_1.Alert.alert("Saved", companyEditId ? "Company updated." : "Company added.");
                    return [2 /*return*/];
            }
        });
    }); };
    var missingFields = (0, JobsAuthContext_1.getSeekerFields)(jobsUser).filter(function (f) { var val = jobsUser[f.key]; return !val || String(val).trim() === ""; });
    var switchPortal = function () { return router.replace("/portal-select"); };
    return (<react_native_1.View style={cs.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[cs.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.View style={cs.headerRow}>
          <react_native_1.TouchableOpacity onPress={pickPhoto} activeOpacity={0.85} style={cs.avatarWrap}>
            <Avatar user={jobsUser} size={70}/>
            <react_native_1.View style={cs.cameraBtn}><vector_icons_1.Feather name="camera" size={12} color="white"/></react_native_1.View>
          </react_native_1.TouchableOpacity>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <react_native_1.Text style={cs.headerName} numberOfLines={1}>{isEmployer ? (jobsUser.company || jobsUser.name) : jobsUser.name}</react_native_1.Text>
              {isEmployer && isVerified && (<react_native_1.View style={cs.verifiedBadge}>
                  <vector_icons_1.Feather name="shield" size={10} color="#059669"/>
                  <react_native_1.Text style={cs.verifiedText}>GST</react_native_1.Text>
                </react_native_1.View>)}
            </react_native_1.View>
            {isEmployer && jobsUser.company && (<react_native_1.Text style={cs.headerSubName}>{jobsUser.name}</react_native_1.Text>)}
            <react_native_1.View style={cs.rolePill}>
              <vector_icons_1.Feather name={isEmployer ? "briefcase" : "user"} size={10} color="#EA580C"/>
              <react_native_1.Text style={cs.rolePillText}>{isEmployer ? "Employer Account" : "Job Seeker"}</react_native_1.Text>
            </react_native_1.View>
            {isEmployer && jobsUser.industry && (<react_native_1.Text style={cs.headerIndustry}>{jobsUser.industry} · {jobsUser.location || "Ambernath"}</react_native_1.Text>)}
            {!isEmployer && <react_native_1.Text style={cs.headerSub}>+91 {jobsUser.phone}</react_native_1.Text>}
          </react_native_1.View>
          <react_native_1.TouchableOpacity onPress={openFullSeekerEdit} style={cs.editBtn}>
            <vector_icons_1.Feather name="edit-2" size={16} color="white"/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <react_native_1.TouchableOpacity style={cs.switchBtn} onPress={switchPortal} activeOpacity={0.85}>
          <vector_icons_1.Feather name="refresh-cw" size={13} color="#EA580C"/>
          <react_native_1.Text style={cs.switchBtnText}>Switch to civic service</react_native_1.Text>
        </react_native_1.TouchableOpacity>

        {!isEmployer && (<react_native_1.View style={cs.completionCard}>
            <react_native_1.View style={cs.completionTop}>
              <react_native_1.Text style={cs.completionLabel}>Profile Completion</react_native_1.Text>
              {completion === 100 && (<react_native_1.TouchableOpacity onPress={function () { return router.push("/jobs/resume"); }} style={cs.resumeBtn}>
                  <vector_icons_1.Feather name="file-text" size={12} color="white"/>
                  <react_native_1.Text style={cs.resumeBtnText}>View Resume</react_native_1.Text>
                </react_native_1.TouchableOpacity>)}
            </react_native_1.View>
            <CompletionBar pct={completion}/>
            {completion < 100 && <react_native_1.Text style={cs.completionHint}>Complete your profile to unlock resume generation →</react_native_1.Text>}
            {completion === 100 && <react_native_1.Text style={[cs.completionHint, { color: "white", fontFamily: "Inter_600SemiBold" }]}>✅ Profile complete! Your resume is ready.</react_native_1.Text>}
          </react_native_1.View>)}

        <react_native_1.View style={[cs.statsRow, { marginTop: 12 }]}>
          {isEmployer ? (<>
              <react_native_1.View style={cs.statBox}><react_native_1.Text style={cs.statNum}>{myJobs.length}</react_native_1.Text><react_native_1.Text style={cs.statLabel}>Posted</react_native_1.Text></react_native_1.View>
              <react_native_1.View style={cs.statDivider}/>
              <react_native_1.View style={cs.statBox}><react_native_1.Text style={cs.statNum}>{activeJobs}</react_native_1.Text><react_native_1.Text style={cs.statLabel}>Active</react_native_1.Text></react_native_1.View>
              <react_native_1.View style={cs.statDivider}/>
              <react_native_1.View style={cs.statBox}><react_native_1.Text style={cs.statNum}>{totalApplicants}</react_native_1.Text><react_native_1.Text style={cs.statLabel}>Applicants</react_native_1.Text></react_native_1.View>
              <react_native_1.View style={cs.statDivider}/>
              <react_native_1.View style={cs.statBox}><react_native_1.Text style={cs.statNum}>{totalShortlisted}</react_native_1.Text><react_native_1.Text style={cs.statLabel}>Shortlisted</react_native_1.Text></react_native_1.View>
            </>) : (<>
              <react_native_1.View style={cs.statBox}><react_native_1.Text style={cs.statNum}>{appliedCount}</react_native_1.Text><react_native_1.Text style={cs.statLabel}>Applied</react_native_1.Text></react_native_1.View>
              <react_native_1.View style={cs.statDivider}/>
              <react_native_1.View style={cs.statBox}><react_native_1.Text style={cs.statNum}>{jobsUser.experience || "—"}</react_native_1.Text><react_native_1.Text style={cs.statLabel}>Experience</react_native_1.Text></react_native_1.View>
              <react_native_1.View style={cs.statDivider}/>
              <react_native_1.View style={cs.statBox}><react_native_1.Text style={cs.statNum}>{completion}%</react_native_1.Text><react_native_1.Text style={cs.statLabel}>Profile</react_native_1.Text></react_native_1.View>
            </>)}
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={{ flex: 1 }} contentContainerStyle={[cs.content, { paddingBottom: Math.max(insets.bottom, 8) + 90 }]} showsVerticalScrollIndicator={false}>

        {/* ─── EMPLOYER PROFILE ─── */}
        {isEmployer && (<>
            {/* About company */}
            {(jobsUser.companyDescription || (jobsUser.companies && jobsUser.companies.length > 0)) ? (<SectionCard title="About Company" icon="info">
                <react_native_1.Text style={cs.aboutText}>{jobsUser.companyDescription}</react_native_1.Text>
              </SectionCard>) : (<react_native_1.TouchableOpacity onPress={openDescriptionEdit} activeOpacity={0.8}>
                <react_native_1.View style={[cs.sectionCard, cs.emptyCard]}>
                  <vector_icons_1.Feather name="plus-circle" size={18} color="#EA580C"/>
                  <react_native_1.Text style={cs.emptyCardText}>Add company description</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.TouchableOpacity>)}

            {/* Company overview */}
            <SectionCard title="Company Overview" icon="briefcase">
              <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={cs.companyRow}>
                {(jobsUser.companies || []).map(function (company) { return (<react_native_1.View key={company.id} style={cs.companyCard}>
                    <react_native_1.View style={cs.companyTop}>
                      <react_native_1.View style={{ flex: 1 }}>
                        <react_native_1.Text style={cs.companyName}>{company.name}</react_native_1.Text>
                        {!!company.industry && <react_native_1.Text style={cs.companyMeta}>{company.industry}</react_native_1.Text>}
                      </react_native_1.View>
                      <react_native_1.TouchableOpacity onPress={function () { return openCompanyEditor(company.id); }} style={cs.companyEditBtn}>
                        <vector_icons_1.Feather name="edit-2" size={14} color="#EA580C"/>
                      </react_native_1.TouchableOpacity>
                    </react_native_1.View>
                    <react_native_1.View style={cs.overviewGrid}>
                      {company.type && <react_native_1.View style={cs.overviewChip}><react_native_1.Text style={cs.overviewChipText}>{company.type}</react_native_1.Text></react_native_1.View>}
                      {company.size && <react_native_1.View style={cs.overviewChip}><react_native_1.Text style={cs.overviewChipText}>{company.size}</react_native_1.Text></react_native_1.View>}
                      {company.yearEstablished && <react_native_1.View style={cs.overviewChip}><react_native_1.Text style={cs.overviewChipText}>Est. {company.yearEstablished}</react_native_1.Text></react_native_1.View>}
                    </react_native_1.View>
                  </react_native_1.View>); })}
                <react_native_1.TouchableOpacity onPress={function () { return openCompanyEditor(); }} style={cs.addCompanyCard} activeOpacity={0.85}>
                  <vector_icons_1.Feather name="plus" size={18} color="#EA580C"/>
                  <react_native_1.Text style={cs.addInfoText}>Add company</react_native_1.Text>
                </react_native_1.TouchableOpacity>
              </react_native_1.ScrollView>
              <InfoRow icon="globe" label="Website" value={jobsUser.website} accent/>
            </SectionCard>

            {/* Contact & Address */}
            <SectionCard title="Contact Information" icon="phone">
              <InfoRow icon="user" label="Contact Person" value={jobsUser.contactPerson}/>
              <InfoRow icon="phone" label="Mobile" value={"+91 ".concat(jobsUser.phone)}/>
              {jobsUser.whatsapp && <InfoRow icon="message-circle" label="WhatsApp" value={"+91 ".concat(jobsUser.whatsapp)} accent/>}
              <InfoRow icon="mail" label="Email" value={jobsUser.email}/>
            </SectionCard>

            <SectionCard title="Address" icon="map-pin">
              <InfoRow icon="map-pin" label="Area / Location" value={jobsUser.location}/>
              <InfoRow icon="home" label="Full Address" value={jobsUser.address}/>
              <InfoRow icon="hash" label="PIN Code" value={jobsUser.pincode}/>
            </SectionCard>

            {/* Verification */}
            <SectionCard title="Business Verification" icon="shield">
              {jobsUser.gstNo ? (<react_native_1.View style={cs.verifiedRow}>
                  <react_native_1.View style={cs.verifiedIcon}>
                    <vector_icons_1.Feather name="check-circle" size={18} color="#059669"/>
                  </react_native_1.View>
                  <react_native_1.View style={{ flex: 1 }}>
                    <react_native_1.Text style={cs.verifiedLabel}>GST Registered</react_native_1.Text>
                    <react_native_1.Text style={cs.verifiedGst}>{jobsUser.gstNo}</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.View style={cs.verifiedPill}>
                    <react_native_1.Text style={cs.verifiedPillText}>Verified</react_native_1.Text>
                  </react_native_1.View>
                </react_native_1.View>) : (<react_native_1.TouchableOpacity onPress={openEdit} style={cs.unverifiedRow}>
                  <vector_icons_1.Feather name="alert-circle" size={16} color="#D97706"/>
                  <react_native_1.View style={{ flex: 1 }}>
                    <react_native_1.Text style={cs.unverifiedTitle}>Not Verified</react_native_1.Text>
                    <react_native_1.Text style={cs.unverifiedSub}>Add your GST number to get a verified badge</react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.Text style={cs.addInfoText}>Add →</react_native_1.Text>
                </react_native_1.TouchableOpacity>)}
            </SectionCard>

            {/* Job stats mini */}
            {myJobs.length > 0 && (<SectionCard title="Hiring Performance" icon="bar-chart-2">
                {myJobs.slice(0, 3).map(function (job) { return (<react_native_1.View key={job.id} style={cs.miniJobRow}>
                    <react_native_1.View style={{ flex: 1 }}>
                      <react_native_1.Text style={cs.miniJobTitle} numberOfLines={1}>{job.title}</react_native_1.Text>
                      <react_native_1.Text style={cs.miniJobSub}>{job.location}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={{ alignItems: "flex-end", gap: 2 }}>
                      <react_native_1.Text style={cs.miniJobStat}>{job.applicants.length} applied</react_native_1.Text>
                      <react_native_1.Text style={[cs.miniJobStat, { color: "#059669" }]}>{job.shortlisted.length} shortlisted</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={[cs.miniJobStatus, { backgroundColor: job.active ? "#D1FAE5" : "#F1F5F9" }]}>
                      <react_native_1.Text style={[cs.miniJobStatusText, { color: job.active ? "#059669" : "#94A3B8" }]}>
                        {job.active ? "Active" : "Paused"}
                      </react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>); })}
                {myJobs.length > 3 && (<react_native_1.Text style={cs.addInfoText}>+{myJobs.length - 3} more jobs posted</react_native_1.Text>)}
              </SectionCard>)}
          </>)}

        {/* ─── SEEKER PROFILE ─── */}
        {!isEmployer && completion < 100 && missingFields.length > 0 && (<react_native_1.View style={cs.missingCard}>
            <vector_icons_1.Feather name="alert-circle" size={15} color="#EA580C"/>
            <react_native_1.View style={{ flex: 1 }}>
              <react_native_1.Text style={cs.missingTitle}>Complete your profile</react_native_1.Text>
              <react_native_1.Text style={cs.missingText}>Missing: {missingFields.map(function (f) { return f.label; }).join(", ")}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.TouchableOpacity onPress={openEdit} style={cs.missingBtn}>
              <react_native_1.Text style={cs.missingBtnText}>Fill Now</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>)}

        {!isEmployer && (<>
            <SectionCard title="Personal Information" icon="user">
              <InfoRow icon="user" label="Full Name" value={jobsUser.name}/>
              <InfoRow icon="calendar" label="Age" value={jobsUser.age ? "".concat(jobsUser.age, " years") : undefined}/>
              <InfoRow icon="phone" label="Mobile" value={"+91 ".concat(jobsUser.phone)}/>
              <InfoRow icon="mail" label="Email" value={jobsUser.email}/>
              <InfoRow icon="map-pin" label="Location" value={jobsUser.location}/>
              <InfoRow icon="globe" label="Languages" value={jobsUser.languages}/>
            </SectionCard>
            <SectionCard title="Education" icon="book-open">
              <InfoRow icon="award" label="Qualification" value={jobsUser.qualification}/>
            </SectionCard>
            <SectionCard title="Current Status" icon="activity">
              {jobsUser.currentStatus ? (<react_native_1.View style={cs.statusPill}>
                  <vector_icons_1.Feather name={((_b = STATUS_OPTIONS.find(function (s) { return s.id === jobsUser.currentStatus; })) === null || _b === void 0 ? void 0 : _b.icon) || "briefcase"} size={14} color={((_c = STATUS_OPTIONS.find(function (s) { return s.id === jobsUser.currentStatus; })) === null || _c === void 0 ? void 0 : _c.color) || "#EA580C"}/>
                  <react_native_1.Text style={[cs.statusPillText, { color: ((_d = STATUS_OPTIONS.find(function (s) { return s.id === jobsUser.currentStatus; })) === null || _d === void 0 ? void 0 : _d.color) || "#EA580C" }]}>
                    {(_e = STATUS_OPTIONS.find(function (s) { return s.id === jobsUser.currentStatus; })) === null || _e === void 0 ? void 0 : _e.label}
                  </react_native_1.Text>
                </react_native_1.View>) : (<react_native_1.TouchableOpacity onPress={openEdit} style={cs.emptyField}><react_native_1.Text style={cs.emptyFieldText}>Tap to add status</react_native_1.Text></react_native_1.TouchableOpacity>)}
              {jobsUser.currentStatus === "employed" && (<>
                  <InfoRow icon="briefcase" label="Company" value={jobsUser.currentCompany}/>
                  <InfoRow icon="tag" label="Role" value={jobsUser.currentRole}/>
                  <InfoRow icon="clock" label="Experience" value={jobsUser.experience}/>
                </>)}
              {jobsUser.currentStatus === "student" && (<>
                  <InfoRow icon="book" label="College" value={jobsUser.collegeName}/>
                  <InfoRow icon="bookmark" label="Field of Study" value={jobsUser.fieldOfStudy}/>
                </>)}
            </SectionCard>
            {jobsUser.currentStatus === "unemployed" && (jobsUser.experience || jobsUser.previousCompany || jobsUser.previousRole) ? (<SectionCard title="Work Experience" icon="clock">
                <InfoRow icon="clock" label="Total Exp." value={jobsUser.experience}/>
                <InfoRow icon="briefcase" label="Prev. Company" value={jobsUser.previousCompany}/>
                <InfoRow icon="tag" label="Prev. Role" value={jobsUser.previousRole}/>
              </SectionCard>) : null}
            {jobsUser.skills && (<SectionCard title="Skills" icon="zap">
                <react_native_1.View style={cs.skillsWrap}>
                  {jobsUser.skills.split(",").map(function (s, i) { return (<react_native_1.View key={i} style={cs.skillChip}><react_native_1.Text style={cs.skillText}>{s.trim()}</react_native_1.Text></react_native_1.View>); })}
                </react_native_1.View>
              </SectionCard>)}
            {jobsUser.about && (<SectionCard title="About / Objective" icon="file-text">
                <react_native_1.Text style={cs.aboutText}>{jobsUser.about}</react_native_1.Text>
              </SectionCard>)}
            {completion === 100 && (<react_native_1.TouchableOpacity onPress={function () { return router.push("/jobs/resume"); }} style={cs.resumeCardBtn} activeOpacity={0.88}>
                <expo_linear_gradient_1.LinearGradient colors={["#059669", "#16A34A"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={cs.resumeCardGrad}>
                  <vector_icons_1.Feather name="file-text" size={20} color="white"/>
                  <react_native_1.View>
                    <react_native_1.Text style={cs.resumeCardTitle}>Generate Resume</react_native_1.Text>
                    <react_native_1.Text style={cs.resumeCardSub}>Choose from 3 professional templates</react_native_1.Text>
                  </react_native_1.View>
                  <vector_icons_1.Feather name="arrow-right" size={18} color="white"/>
                </expo_linear_gradient_1.LinearGradient>
              </react_native_1.TouchableOpacity>)}
          </>)}

        <react_native_1.TouchableOpacity style={cs.switchBtn} onPress={function () { return router.replace("/portal-select"); }} activeOpacity={0.85}>
          <vector_icons_1.Feather name="home" size={18} color="#EA580C"/>
          <react_native_1.Text style={cs.switchBtnText}>Back</react_native_1.Text>
        </react_native_1.TouchableOpacity>

        <react_native_1.TouchableOpacity style={cs.logoutBtn} onPress={function () { return setShowLogout(true); }} activeOpacity={0.85}>
          <vector_icons_1.Feather name="log-out" size={18} color="#DC2626"/>
          <react_native_1.Text style={cs.logoutBtnText}>Logout</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.ScrollView>

      {/* Edit Modal */}
      <react_native_1.Modal visible={editing} animationType="slide" onRequestClose={function () { return setEditing(false); }}>
        <react_native_1.View style={{ flex: 1, backgroundColor: "#F8FAFC" }}>
          <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C"]} style={[cs.editHeader, { paddingTop: (react_native_1.Platform.OS === "web" ? 44 : insets.top) + 12 }]}>
            <react_native_1.TouchableOpacity onPress={function () { return setEditing(false); }} style={cs.editClose}>
              <vector_icons_1.Feather name="x" size={20} color="white"/>
            </react_native_1.TouchableOpacity>
            <react_native_1.Text style={cs.editHeaderTitle}>{showCompanyEdit ? (companyEditId ? "Edit Company" : "Add Company") : "Edit Profile"}</react_native_1.Text>
            <react_native_1.TouchableOpacity onPress={handleSave} style={cs.editSaveBtn}>
              <react_native_1.Text style={cs.editSaveBtnText}>Save</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </expo_linear_gradient_1.LinearGradient>

          <react_native_1.ScrollView contentContainerStyle={cs.editScroll} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
            {showCompanyEdit ? (<>
                <react_native_1.Text style={cs.editSection}>Company Details</react_native_1.Text>
                <EditField label="Company Name *" value={eCompany} onChange={setECompany} placeholder="e.g. XYZ Pvt Ltd"/>
                <EditField label="Contact Person Name" value={eContactPerson} onChange={setEContactPerson} placeholder="e.g. Ramesh Sharma (HR Manager)"/>
                <SelectField label="Company Type" value={eCompanyType} options={COMPANY_TYPES} onChange={setECompanyType}/>
                <SelectField label="Company Size" value={eCompanySize} options={COMPANY_SIZES} onChange={setECompanySize}/>
                <SelectField label="Industry" value={eIndustry} options={INDUSTRIES} onChange={setEIndustry}/>
                <EditField label="Year Established" value={eYearEst} onChange={setEYearEst} placeholder="e.g. 2010" keyboardType="number-pad"/>
                <EditField label="Website" value={eWebsite} onChange={setEWebsite} placeholder="e.g. www.yourcompany.com" keyboardType="url"/>
                <EditField label="Company Description" value={eCompanyDesc} onChange={setECompanyDesc} placeholder="Describe your company, culture, products/services…" multiline/>
                <EditField label="WhatsApp Number" value={eWhatsapp} onChange={setEWhatsapp} placeholder="10-digit WhatsApp number" keyboardType="phone-pad"/>
                <EditField label="Area / Location" value={eLocation} onChange={setELocation} placeholder="e.g. MIDC Ambernath"/>
                <EditField label="Full Address" value={eAddress} onChange={setEAddress} placeholder="Plot no, street, area…" multiline/>
                <EditField label="PIN Code" value={ePincode} onChange={setEPincode} placeholder="e.g. 421501" keyboardType="number-pad"/>
                <EditField label="GST Number" value={eGst} onChange={setEGst} placeholder="e.g. 27AABCU9603R1ZX"/>
                <react_native_1.TouchableOpacity onPress={saveCompany} style={cs.saveBtnFull} activeOpacity={0.85}>
                  <expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={cs.saveBtnGrad}>
                    <vector_icons_1.Feather name="check" size={18} color="white"/>
                    <react_native_1.Text style={cs.saveBtnText}>{companyEditId ? "Save Company" : "Add Company"}</react_native_1.Text>
                  </expo_linear_gradient_1.LinearGradient>
                </react_native_1.TouchableOpacity>
              </>) : descriptionOnlyEdit ? (<>
                <react_native_1.Text style={cs.editSection}>Company Description</react_native_1.Text>
                <EditField label="Company Description" value={eCompanyDesc} onChange={setECompanyDesc} placeholder="Describe your company, culture, products/services…" multiline/>
                <react_native_1.TouchableOpacity onPress={handleSave} style={cs.saveBtnFull} activeOpacity={0.85}>
                  <expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={cs.saveBtnGrad}>
                    <vector_icons_1.Feather name="check" size={18} color="white"/>
                    <react_native_1.Text style={cs.saveBtnText}>Save Profile</react_native_1.Text>
                  </expo_linear_gradient_1.LinearGradient>
                </react_native_1.TouchableOpacity>
              </>) : (<>
                <react_native_1.Text style={cs.editSection}>Basic Information</react_native_1.Text>
                <EditField label="Full Name *" value={eName} onChange={setEName} placeholder="Your full name"/>
                <EditField label="Email Address" value={eEmail} onChange={setEEmail} placeholder="you@email.com" keyboardType="email-address"/>
                <react_native_1.Text style={cs.editSection}>Profile Details</react_native_1.Text>
                <EditField label="Age" value={eAge} onChange={setEAge} placeholder="Age" keyboardType="number-pad"/>
                <EditField label="Qualification" value={eQual} onChange={setEQual} placeholder="Highest qualification"/>
                <EditField label="Skills" value={eSkills} onChange={setESkills} placeholder="Comma separated skills"/>
                <EditField label="About / Objective" value={eAbout} onChange={setEAbout} placeholder="Write a short intro" multiline/>
                <SelectField label="Current Status" value={eStatus} options={STATUS_OPTIONS.map(function (s) { return s.id; })} onChange={function (v) { return setEStatus(v); }}/>
                {eStatus === "employed" && (<>
                    <EditField label="Current Company" value={eCurrentCompany} onChange={setECurrentCompany} placeholder="Current company"/>
                    <EditField label="Current Role" value={eCurrentRole} onChange={setECurrentRole} placeholder="Current role"/>
                  </>)}
                {eStatus === "unemployed" && (<>
                    <EditField label="Previous Company" value={ePrevCompany} onChange={setEPrevCompany} placeholder="Previous company"/>
                    <EditField label="Previous Role" value={ePrevRole} onChange={setEPrevRole} placeholder="Previous role"/>
                    <EditField label="Experience" value={eExperience} onChange={setEExperience} placeholder="Total experience"/>
                  </>)}
                {eStatus === "student" && (<>
                    <EditField label="College Name" value={eCollegeName} onChange={setECollegeName} placeholder="College name"/>
                    <EditField label="Field of Study" value={eFieldOfStudy} onChange={setEFieldOfStudy} placeholder="Field of study"/>
                  </>)}
                <EditField label="Location" value={eLocation} onChange={setELocation} placeholder="Current location"/>
                <EditField label="Languages" value={eLanguages} onChange={setELanguages} placeholder="Languages known"/>
                <react_native_1.TouchableOpacity onPress={handleSave} style={cs.saveBtnFull} activeOpacity={0.85}>
                  <expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={cs.saveBtnGrad}>
                    <vector_icons_1.Feather name="check" size={18} color="white"/>
                    <react_native_1.Text style={cs.saveBtnText}>Save Profile</react_native_1.Text>
                  </expo_linear_gradient_1.LinearGradient>
                </react_native_1.TouchableOpacity>
              </>)}
          </react_native_1.ScrollView>
        </react_native_1.View>
      </react_native_1.Modal>

      {/* Logout Modal */}
      <react_native_1.Modal visible={showLogout} transparent animationType="fade" onRequestClose={function () { return setShowLogout(false); }}>
        <react_native_1.View style={cs.modalOverlay}>
          <react_native_1.View style={cs.modalCard}>
            <react_native_1.Text style={cs.modalTitle}>Logout?</react_native_1.Text>
            <react_native_1.Text style={cs.modalSub}>You will be returned to the job portal login screen.</react_native_1.Text>
            <react_native_1.View style={cs.modalBtns}>
              <react_native_1.TouchableOpacity style={cs.modalCancel} onPress={function () { return setShowLogout(false); }}><react_native_1.Text style={cs.modalCancelText}>Cancel</react_native_1.Text></react_native_1.TouchableOpacity>
              <react_native_1.TouchableOpacity style={cs.modalConfirm} onPress={function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                setShowLogout(false);
                return [4 /*yield*/, logoutJobs()];
            case 1:
                _a.sent();
                router.replace("/jobs/login");
                return [2 /*return*/];
        }
    }); }); }}><react_native_1.Text style={cs.modalConfirmText}>Logout</react_native_1.Text></react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>
    </react_native_1.View>);
}
var cs = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F8FAFC" },
    header: { paddingHorizontal: 16, paddingBottom: 16, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 14 },
    avatarWrap: { position: "relative" },
    cameraBtn: { position: "absolute", bottom: 0, right: 0, width: 24, height: 24, borderRadius: 12, backgroundColor: "#EA580C", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "white" },
    headerName: { fontSize: 17, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSubName: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 1 },
    headerIndustry: { fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular", marginTop: 2 },
    verifiedBadge: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "#D1FAE5", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6 },
    verifiedText: { fontSize: 9, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    rolePill: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 3, borderRadius: 12, alignSelf: "flex-start", marginTop: 4 },
    rolePillText: { fontSize: 11, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular", marginTop: 3 },
    editBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
    switchBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "white", padding: 12, borderRadius: 14, marginTop: 8 },
    switchBtnText: { fontSize: 13, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    completionCard: { backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 12, marginBottom: 12 },
    completionTop: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
    completionLabel: { fontSize: 13, fontWeight: "600", color: "white", fontFamily: "Inter_600SemiBold" },
    resumeBtn: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#059669", paddingHorizontal: 12, paddingVertical: 5, borderRadius: 10 },
    resumeBtnText: { fontSize: 11, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    barWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
    barTrack: { flex: 1, height: 8, backgroundColor: "rgba(255,255,255,0.3)", borderRadius: 4, overflow: "hidden" },
    barFill: { height: "100%", borderRadius: 4 },
    barLabel: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold", width: 36, textAlign: "right" },
    completionHint: { fontSize: 11, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 6 },
    statsRow: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 14, padding: 12 },
    statBox: { flex: 1, alignItems: "center" },
    statDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.25)" },
    statNum: { fontSize: 18, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    statLabel: { fontSize: 10, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 2 },
    content: { padding: 14, gap: 10 },
    // Section card
    sectionCard: { backgroundColor: "white", borderRadius: 18, padding: 16, shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 8, elevation: 2 },
    sectionCardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
    sectionIconWrap: { width: 30, height: 30, borderRadius: 8, backgroundColor: "#FFEDD5", alignItems: "center", justifyContent: "center" },
    sectionCardTitle: { fontSize: 14, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    // Info row
    infoRow: { flexDirection: "row", alignItems: "flex-start", gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#F8FAFC" },
    infoIconWrap: { width: 30, height: 30, borderRadius: 8, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center", marginTop: 2 },
    infoLabel: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    infoValue: { fontSize: 13, color: "#0F172A", fontFamily: "Inter_500Medium", marginTop: 1 },
    // Employer sections
    overviewGrid: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
    overviewChip: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#FFEDD5", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 10 },
    overviewChipText: { fontSize: 12, fontWeight: "600", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    companyRow: { gap: 10, paddingRight: 8 },
    companyCard: { width: 210, backgroundColor: "#FFF7ED", borderRadius: 16, padding: 12, borderWidth: 1, borderColor: "#FED7AA" },
    companyTop: { flexDirection: "row", alignItems: "flex-start", gap: 10, marginBottom: 10 },
    companyName: { fontSize: 14, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    companyMeta: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
    companyEditBtn: { width: 30, height: 30, borderRadius: 15, backgroundColor: "white", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#FED7AA" },
    addCompanyCard: { width: 140, minHeight: 92, backgroundColor: "white", borderRadius: 16, padding: 12, borderWidth: 1.5, borderColor: "#FED7AA", borderStyle: "dashed", alignItems: "center", justifyContent: "center", gap: 6 },
    emptyCard: { flexDirection: "row", alignItems: "center", gap: 10, justifyContent: "center", paddingVertical: 20, borderWidth: 1.5, borderColor: "#FED7AA", borderStyle: "dashed" },
    emptyCardText: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_500Medium" },
    addInfoBtn: { paddingVertical: 8 },
    addInfoText: { fontSize: 12, color: "#EA580C", fontFamily: "Inter_500Medium" },
    verifiedRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    verifiedIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "#D1FAE5", alignItems: "center", justifyContent: "center" },
    verifiedLabel: { fontSize: 13, fontWeight: "600", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    verifiedGst: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", marginTop: 2 },
    verifiedPill: { backgroundColor: "#D1FAE5", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
    verifiedPillText: { fontSize: 11, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    unverifiedRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    unverifiedTitle: { fontSize: 13, fontWeight: "600", color: "#92400E", fontFamily: "Inter_600SemiBold" },
    unverifiedSub: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 2 },
    miniJobRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: "#F8FAFC" },
    miniJobTitle: { fontSize: 13, fontWeight: "600", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    miniJobSub: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    miniJobStat: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular" },
    miniJobStatus: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
    miniJobStatusText: { fontSize: 10, fontWeight: "700", fontFamily: "Inter_700Bold" },
    // Seeker sections
    aboutText: { fontSize: 13, color: "#475569", fontFamily: "Inter_400Regular", lineHeight: 20 },
    missingCard: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#FFF7ED", borderRadius: 14, padding: 14, borderWidth: 1, borderColor: "#FED7AA" },
    missingTitle: { fontSize: 13, fontWeight: "700", color: "#92400E", fontFamily: "Inter_700Bold" },
    missingText: { fontSize: 11, color: "#B45309", fontFamily: "Inter_400Regular", marginTop: 2 },
    missingBtn: { backgroundColor: "#EA580C", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
    missingBtnText: { fontSize: 12, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    statusPill: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#FFF7ED", padding: 12, borderRadius: 12, alignSelf: "flex-start" },
    statusPillText: { fontSize: 13, fontWeight: "700", fontFamily: "Inter_700Bold" },
    emptyField: { backgroundColor: "#F1F5F9", padding: 12, borderRadius: 10, alignItems: "center" },
    emptyFieldText: { fontSize: 13, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    skillsWrap: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    skillChip: { backgroundColor: "#FFEDD5", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20 },
    skillText: { fontSize: 12, fontWeight: "600", color: "#92400E", fontFamily: "Inter_600SemiBold" },
    resumeCardBtn: { borderRadius: 16, overflow: "hidden" },
    resumeCardGrad: { flexDirection: "row", alignItems: "center", gap: 14, padding: 16 },
    resumeCardTitle: { fontSize: 15, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    resumeCardSub: { fontSize: 11, color: "rgba(255,255,255,0.75)", fontFamily: "Inter_400Regular", marginTop: 2 },
    switchBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: "white", padding: 14, borderRadius: 14, borderWidth: 1.5, borderColor: "#FED7AA" },
    switchBtnText: { fontSize: 14, fontWeight: "600", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: "#FEF2F2", padding: 14, borderRadius: 14 },
    logoutBtnText: { fontSize: 14, fontWeight: "600", color: "#DC2626", fontFamily: "Inter_600SemiBold" },
    // Edit modal
    editHeader: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, paddingBottom: 16 },
    editClose: { width: 36, height: 36, borderRadius: 18, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
    editHeaderTitle: { flex: 1, fontSize: 17, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold", textAlign: "center" },
    editSaveBtn: { backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10 },
    editSaveBtnText: { fontSize: 14, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    editScroll: { padding: 16, gap: 4, paddingBottom: 40 },
    editSection: { fontSize: 12, fontWeight: "700", color: "#94A3B8", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.8, marginTop: 16, marginBottom: 8 },
    fieldWrap: { marginBottom: 14 },
    fieldLabel: { fontSize: 13, fontWeight: "600", color: "#475569", fontFamily: "Inter_600SemiBold", marginBottom: 6 },
    fieldInput: { backgroundColor: "white", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular" },
    selectBtn: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "white", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12 },
    selectBtnText: { fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular" },
    selectOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", paddingHorizontal: 24 },
    selectList: { backgroundColor: "white", borderRadius: 20, overflow: "hidden", paddingBottom: 8 },
    selectListTitle: { fontSize: 15, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold", padding: 16, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    selectItem: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: "#F8FAFC" },
    selectItemActive: { backgroundColor: "#FFF7ED" },
    selectItemText: { fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular" },
    statusOptions: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
    statusOption: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: "#E2E8F0", backgroundColor: "white" },
    statusOptionText: { fontSize: 12, fontFamily: "Inter_500Medium", color: "#64748B" },
    statusBanner: { borderRadius: 14, overflow: "hidden", marginTop: 6, marginBottom: 12 },
    statusBannerGrad: { flexDirection: "row", alignItems: "center", gap: 12, padding: 12 },
    statusBannerIcon: { width: 36, height: 36, borderRadius: 10, backgroundColor: "white", alignItems: "center", justifyContent: "center" },
    statusBannerTitle: { fontSize: 13, fontWeight: "700", color: "#9A3412", fontFamily: "Inter_700Bold" },
    statusBannerSub: { fontSize: 11, color: "#9A3412", opacity: 0.8, fontFamily: "Inter_400Regular", marginTop: 2 },
    condBlock: { backgroundColor: "white", borderRadius: 14, padding: 12, marginTop: 4, marginBottom: 8, borderWidth: 1, borderColor: "#F1F5F9" },
    condHeader: { flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 10, paddingVertical: 7, borderRadius: 10, alignSelf: "flex-start", marginBottom: 10 },
    condHeaderText: { fontSize: 12, fontWeight: "700", fontFamily: "Inter_700Bold" },
    saveBtnFull: { borderRadius: 14, overflow: "hidden", marginTop: 16 },
    saveBtnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 15, gap: 10 },
    saveBtnText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    // Logout modal
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "center", paddingHorizontal: 32 },
    modalCard: { backgroundColor: "white", borderRadius: 20, padding: 24, gap: 10 },
    modalTitle: { fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    modalSub: { fontSize: 13, color: "#64748B", fontFamily: "Inter_400Regular" },
    modalBtns: { flexDirection: "row", gap: 10, marginTop: 8 },
    modalCancel: { flex: 1, backgroundColor: "#F1F5F9", padding: 13, borderRadius: 12, alignItems: "center" },
    modalCancelText: { fontSize: 14, fontWeight: "600", color: "#64748B", fontFamily: "Inter_600SemiBold" },
    modalConfirm: { flex: 1, backgroundColor: "#FEE2E2", padding: 13, borderRadius: 12, alignItems: "center" },
    modalConfirmText: { fontSize: 14, fontWeight: "700", color: "#DC2626", fontFamily: "Inter_700Bold" },
});
