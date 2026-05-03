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
exports.default = PostJobScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var JobsContext_1 = require("@/context/JobsContext");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
var expo_router_1 = require("expo-router");
var categories = Object.entries(JobsContext_1.categoryConfig).map(function (_a) {
    var id = _a[0], cfg = _a[1];
    return (__assign({ id: id }, cfg));
});
var types = Object.entries(JobsContext_1.typeConfig).map(function (_a) {
    var id = _a[0], cfg = _a[1];
    return (__assign({ id: id }, cfg));
});
// ─── Category Dropdown ────────────────────────────────────────────────────────
function CategoryDropdown(_a) {
    var _b;
    var value = _a.value, customLabel = _a.customLabel, onSelect = _a.onSelect, onCustomChange = _a.onCustomChange;
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    var selected = categories.find(function (c) { return c.id === value; });
    var displayLabel = value === "other" && customLabel.trim() ? customLabel : (_b = selected === null || selected === void 0 ? void 0 : selected.label) !== null && _b !== void 0 ? _b : "Select Category";
    return (<react_native_1.View>
      {/* Trigger button */}
      <react_native_1.TouchableOpacity style={styles.dropdownBtn} activeOpacity={0.85} onPress={function () { return setOpen(true); }}>
        {selected && value !== "other" && (<react_native_1.View style={[styles.dropdownIcon, { backgroundColor: selected.bg }]}>
            <vector_icons_1.Feather name={selected.icon} size={14} color={selected.color}/>
          </react_native_1.View>)}
        {value === "other" && (<react_native_1.View style={[styles.dropdownIcon, { backgroundColor: "#F1F5F9" }]}>
            <vector_icons_1.Feather name="edit-3" size={14} color="#64748B"/>
          </react_native_1.View>)}
        <react_native_1.Text style={styles.dropdownBtnText} numberOfLines={1}>{displayLabel}</react_native_1.Text>
        <vector_icons_1.Feather name="chevron-down" size={16} color="#94A3B8"/>
      </react_native_1.TouchableOpacity>

      {/* Manual input when "Other" is selected */}
      {value === "other" && (<react_native_1.TextInput style={[styles.input, { marginTop: 8 }]} value={customLabel} onChangeText={onCustomChange} placeholder="Type your job category (e.g. Agriculture, Tailoring…)" placeholderTextColor="#CBD5E1"/>)}

      {/* Dropdown modal */}
      <react_native_1.Modal visible={open} transparent animationType="fade" onRequestClose={function () { return setOpen(false); }}>
        <react_native_1.TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={function () { return setOpen(false); }}>
          <react_native_1.View style={styles.dropdownList}>
            <react_native_1.View style={styles.dropdownListHeader}>
              <react_native_1.Text style={styles.dropdownListTitle}>Select Job Category</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={function () { return setOpen(false); }} style={styles.dropdownClose}>
                <vector_icons_1.Feather name="x" size={16} color="#64748B"/>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>

            <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 360 }}>
              {categories.map(function (c) { return (<react_native_1.TouchableOpacity key={c.id} style={[styles.dropdownItem, value === c.id && styles.dropdownItemActive]} activeOpacity={0.75} onPress={function () { onSelect(c.id); setOpen(false); }}>
                  <react_native_1.View style={[styles.dropdownItemIcon, { backgroundColor: c.bg }]}>
                    <vector_icons_1.Feather name={c.icon} size={16} color={c.color}/>
                  </react_native_1.View>
                  <react_native_1.Text style={[styles.dropdownItemText, value === c.id && { color: "#EA580C", fontFamily: "Inter_600SemiBold" }]}>
                    {c.label}
                  </react_native_1.Text>
                  {value === c.id && <vector_icons_1.Feather name="check" size={14} color="#EA580C"/>}
                </react_native_1.TouchableOpacity>); })}

              {/* Manual / Other option */}
              <react_native_1.TouchableOpacity style={[styles.dropdownItem, value === "other" && styles.dropdownItemActive]} activeOpacity={0.75} onPress={function () { onSelect("other"); setOpen(false); }}>
                <react_native_1.View style={[styles.dropdownItemIcon, { backgroundColor: "#F1F5F9" }]}>
                  <vector_icons_1.Feather name="edit-3" size={16} color="#64748B"/>
                </react_native_1.View>
                <react_native_1.Text style={[styles.dropdownItemText, value === "other" && { color: "#EA580C", fontFamily: "Inter_600SemiBold" }]}>
                  Other / Type Manually
                </react_native_1.Text>
                {value === "other" && <vector_icons_1.Feather name="check" size={14} color="#EA580C"/>}
              </react_native_1.TouchableOpacity>
            </react_native_1.ScrollView>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>
      </react_native_1.Modal>
    </react_native_1.View>);
}
function CompanyDropdown(_a) {
    var _b;
    var companies = _a.companies, selectedCompanyId = _a.selectedCompanyId, onSelect = _a.onSelect;
    var _c = (0, react_1.useState)(false), open = _c[0], setOpen = _c[1];
    var selected = (_b = companies.find(function (c) { return c.id === selectedCompanyId; })) !== null && _b !== void 0 ? _b : companies[0];
    return (<react_native_1.View>
      <react_native_1.TouchableOpacity style={styles.dropdownBtn} activeOpacity={0.85} onPress={function () { return setOpen(true); }}>
        <react_native_1.View style={[styles.dropdownIcon, { backgroundColor: "#FFF7ED" }]}>
          <vector_icons_1.Feather name="briefcase" size={14} color="#C2410C"/>
        </react_native_1.View>
        <react_native_1.Text style={styles.dropdownBtnText} numberOfLines={1}>
          {(selected === null || selected === void 0 ? void 0 : selected.name) || "Select Company"}
        </react_native_1.Text>
        <vector_icons_1.Feather name="chevron-down" size={16} color="#94A3B8"/>
      </react_native_1.TouchableOpacity>

      <react_native_1.Modal visible={open} transparent animationType="fade" onRequestClose={function () { return setOpen(false); }}>
        <react_native_1.TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={function () { return setOpen(false); }}>
          <react_native_1.View style={styles.dropdownList}>
            <react_native_1.View style={styles.dropdownListHeader}>
              <react_native_1.Text style={styles.dropdownListTitle}>Choose Company</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={function () { return setOpen(false); }} style={styles.dropdownClose}>
                <vector_icons_1.Feather name="x" size={16} color="#64748B"/>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
            <react_native_1.ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 280 }}>
              {companies.map(function (company) { return (<react_native_1.TouchableOpacity key={company.id} style={[styles.dropdownItem, selectedCompanyId === company.id && styles.dropdownItemActive]} activeOpacity={0.75} onPress={function () {
                onSelect(company.id);
                setOpen(false);
            }}>
                  <vector_icons_1.Feather name="home" size={16} color={selectedCompanyId === company.id ? "#EA580C" : "#94A3B8"}/>
                  <react_native_1.Text style={[styles.dropdownItemText, selectedCompanyId === company.id && { color: "#EA580C", fontFamily: "Inter_600SemiBold" }]}>
                    {company.name}
                  </react_native_1.Text>
                  {selectedCompanyId === company.id && <vector_icons_1.Feather name="check" size={14} color="#EA580C"/>}
                </react_native_1.TouchableOpacity>); })}
            </react_native_1.ScrollView>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>
      </react_native_1.Modal>
    </react_native_1.View>);
}
// ─── Main screen ──────────────────────────────────────────────────────────────
function PostJobScreen() {
    var _this = this;
    var _a, _b;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var addJob = (0, JobsContext_1.useJobs)().addJob;
    var router = (0, expo_router_1.useRouter)();
    var _c = (0, react_1.useState)(""), title = _c[0], setTitle = _c[1];
    var _d = (0, react_1.useState)("manufacturing"), category = _d[0], setCategory = _d[1];
    var _e = (0, react_1.useState)(""), customCategory = _e[0], setCustomCategory = _e[1];
    var _f = (0, react_1.useState)("full-time"), type = _f[0], setType = _f[1];
    var _g = (0, react_1.useState)(""), salary = _g[0], setSalary = _g[1];
    var _h = (0, react_1.useState)("Ambernath"), location = _h[0], setLocation = _h[1];
    var _j = (0, react_1.useState)("1"), openings = _j[0], setOpenings = _j[1];
    var _k = (0, react_1.useState)(""), description = _k[0], setDescription = _k[1];
    var _l = (0, react_1.useState)(""), requirements = _l[0], setRequirements = _l[1];
    var _m = (0, react_1.useState)(jobsUser.whatsapp || jobsUser.phone || ""), contactNo = _m[0], setContactNo = _m[1];
    var _o = (0, react_1.useState)(false), submitting = _o[0], setSubmitting = _o[1];
    var _p = (0, react_1.useState)(false), posted = _p[0], setPosted = _p[1];
    var _q = (0, react_1.useState)(""), postedTitle = _q[0], setPostedTitle = _q[1];
    var _r = (0, react_1.useState)(""), selectedCompanyId = _r[0], setSelectedCompanyId = _r[1];
    var companies = ((_a = jobsUser.companies) === null || _a === void 0 ? void 0 : _a.length)
        ? jobsUser.companies
        : jobsUser.company
            ? [{
                    id: "primary",
                    name: jobsUser.company,
                    type: jobsUser.companyType,
                    size: jobsUser.companySize,
                    industry: jobsUser.industry,
                    website: jobsUser.website,
                    description: jobsUser.companyDescription,
                    address: jobsUser.address,
                    pincode: jobsUser.pincode,
                    whatsapp: jobsUser.whatsapp,
                    yearEstablished: jobsUser.yearEstablished,
                    contactPerson: jobsUser.contactPerson,
                    gstNo: jobsUser.gstNo,
                }]
            : [];
    var showCompanyPicker = companies.length > 1;
    var defaultCompanyId = ((_b = companies[0]) === null || _b === void 0 ? void 0 : _b.id) || "";
    var activeCompanyId = (0, react_1.useMemo)(function () { return selectedCompanyId || defaultCompanyId; }, [selectedCompanyId, defaultCompanyId]);
    if (!jobsUser || jobsUser.role !== "employer") {
        return (<react_native_1.View style={styles.restricted}>
        <vector_icons_1.Feather name="lock" size={44} color="#CBD5E1"/>
        <react_native_1.Text style={styles.restrictedTitle}>Employers Only</react_native_1.Text>
        <react_native_1.Text style={styles.restrictedSub}>Only employer accounts can post jobs.</react_native_1.Text>
      </react_native_1.View>);
    }
    if (posted) {
        return (<react_native_1.View style={styles.successScreen}>
        <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.successIconWrap}>
          <vector_icons_1.Feather name="check" size={48} color="white"/>
        </expo_linear_gradient_1.LinearGradient>
        <react_native_1.Text style={styles.successTitle}>Posted Successfully!</react_native_1.Text>
        <react_native_1.Text style={styles.successSub}>
          <react_native_1.Text style={{ fontFamily: "Inter_600SemiBold", color: "#EA580C" }}>{postedTitle}</react_native_1.Text>
          {"\n"}is now live and visible to job seekers.
        </react_native_1.Text>
        <react_native_1.TouchableOpacity style={styles.successBtn} activeOpacity={0.85} onPress={function () { return router.replace("/jobs/(tabs)"); }}>
          <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.successBtnGrad}>
            <vector_icons_1.Feather name="home" size={16} color="white"/>
            <react_native_1.Text style={styles.successBtnText}>Go to Dashboard</react_native_1.Text>
          </expo_linear_gradient_1.LinearGradient>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity style={styles.successSecondaryBtn} activeOpacity={0.75} onPress={function () {
                setPosted(false);
                setTitle("");
                setSalary("");
                setDescription("");
                setRequirements("");
                setLocation("Ambernath");
                setOpenings("1");
                setCategory("manufacturing");
                setCustomCategory("");
            }}>
          <react_native_1.Text style={styles.successSecondaryText}>Post Another Job</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>);
    }
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        var selectedCompany, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (submitting)
                        return [2 /*return*/];
                    if (!title.trim()) {
                        react_native_1.Alert.alert("Enter job title");
                        return [2 /*return*/];
                    }
                    if (category === "other" && !customCategory.trim()) {
                        react_native_1.Alert.alert("Enter your custom job category");
                        return [2 /*return*/];
                    }
                    if (!salary.trim()) {
                        react_native_1.Alert.alert("Enter salary range");
                        return [2 /*return*/];
                    }
                    if (!description.trim()) {
                        react_native_1.Alert.alert("Enter job description");
                        return [2 /*return*/];
                    }
                    if (!requirements.trim()) {
                        react_native_1.Alert.alert("Enter requirements");
                        return [2 /*return*/];
                    }
                    setSubmitting(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 100); })];
                case 2:
                    _b.sent();
                    selectedCompany = companies.find(function (c) { return c.id === activeCompanyId; }) || companies[0];
                    if (!selectedCompany) {
                        react_native_1.Alert.alert("Add a company first");
                        return [2 /*return*/];
                    }
                    addJob({
                        employerId: jobsUser.id,
                        employerName: jobsUser.name,
                        company: selectedCompany.name,
                        employerPhone: jobsUser.phone,
                        employerWhatsApp: contactNo.trim() || jobsUser.whatsapp || jobsUser.phone,
                        title: title.trim(),
                        category: category,
                        type: type,
                        salary: salary.trim(),
                        location: location.trim(),
                        openings: parseInt(openings) || 1,
                        description: description.trim(),
                        requirements: requirements.trim(),
                    });
                    setPostedTitle(title.trim());
                    setPosted(true);
                    return [3 /*break*/, 5];
                case 3:
                    _a = _b.sent();
                    react_native_1.Alert.alert("Unable to post job. Please try again.");
                    return [3 /*break*/, 5];
                case 4:
                    setSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.Text style={styles.headerTitle}>Post a Job</react_native_1.Text>
        <react_native_1.Text style={styles.headerSub}>Fill in the details to attract candidates</react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>

      {showCompanyPicker && (<react_native_1.View style={styles.field}>
          <react_native_1.Text style={styles.label}>Select Company *</react_native_1.Text>
          <CompanyDropdown companies={companies} selectedCompanyId={activeCompanyId} onSelect={setSelectedCompanyId}/>
        </react_native_1.View>)}

      <react_native_1.ScrollView style={{ flex: 1 }} contentContainerStyle={[styles.form, { paddingTop: showCompanyPicker ? 4 : 12, paddingBottom: Math.max(insets.bottom, 8) + 80 }]} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.field}>
          <react_native_1.Text style={styles.label}>Job Title *</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Factory Operator, Sales Executive" placeholderTextColor="#CBD5E1"/>
        </react_native_1.View>

        <react_native_1.View style={styles.field}>
          <react_native_1.Text style={styles.label}>Job Category *</react_native_1.Text>
          <CategoryDropdown value={category} customLabel={customCategory} onSelect={setCategory} onCustomChange={setCustomCategory}/>
        </react_native_1.View>

        <react_native_1.View style={styles.field}>
          <react_native_1.Text style={styles.label}>Job Type *</react_native_1.Text>
          <react_native_1.View style={styles.typeRow}>
            {types.map(function (t) { return (<react_native_1.TouchableOpacity key={t.id} style={[styles.typeChip, type === t.id && { backgroundColor: "#EA580C", borderColor: "#EA580C" }]} onPress={function () { return setType(t.id); }} activeOpacity={0.8}>
                <react_native_1.Text style={[styles.typeChipText, type === t.id && { color: "white" }]}>{t.label}</react_native_1.Text>
              </react_native_1.TouchableOpacity>); })}
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.View style={styles.row}>
          <react_native_1.View style={[styles.field, { flex: 1 }]}>
            <react_native_1.Text style={styles.label}>Salary *</react_native_1.Text>
            <react_native_1.TextInput style={styles.input} value={salary} onChangeText={setSalary} placeholder="e.g. ₹12,000–₹18,000/mo" placeholderTextColor="#CBD5E1"/>
          </react_native_1.View>
          <react_native_1.View style={[styles.field, { width: 90 }]}>
            <react_native_1.Text style={styles.label}>Openings</react_native_1.Text>
            <react_native_1.TextInput style={styles.input} value={openings} onChangeText={function (v) { return setOpenings(v.replace(/\D/g, "")); }} placeholder="1" placeholderTextColor="#CBD5E1" keyboardType="number-pad" maxLength={2}/>
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.View style={styles.field}>
          <react_native_1.Text style={styles.label}>WhatsApp Contact No *</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={contactNo} onChangeText={setContactNo} placeholder="Enter WhatsApp number" placeholderTextColor="#CBD5E1" keyboardType="phone-pad"/>
        </react_native_1.View>

        <react_native_1.View style={styles.field}>
          <react_native_1.Text style={styles.label}>Location *</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="e.g. MIDC Ambernath" placeholderTextColor="#CBD5E1"/>
        </react_native_1.View>

        <react_native_1.View style={styles.field}>
          <react_native_1.Text style={styles.label}>Job Description *</react_native_1.Text>
          <react_native_1.TextInput style={[styles.input, styles.textarea]} value={description} onChangeText={setDescription} placeholder="Describe the job role and responsibilities…" placeholderTextColor="#CBD5E1" multiline numberOfLines={4} textAlignVertical="top"/>
        </react_native_1.View>

        <react_native_1.View style={styles.field}>
          <react_native_1.Text style={styles.label}>Requirements *</react_native_1.Text>
          <react_native_1.TextInput style={[styles.input, styles.textarea]} value={requirements} onChangeText={setRequirements} placeholder="Qualifications, experience, skills needed…" placeholderTextColor="#CBD5E1" multiline numberOfLines={3} textAlignVertical="top"/>
        </react_native_1.View>

        <react_native_1.TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85} disabled={submitting}>
          <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitGrad}>
            {submitting ? <react_native_1.ActivityIndicator color="white"/> : (<><vector_icons_1.Feather name="upload" size={18} color="white"/><react_native_1.Text style={styles.submitText}>Post Job</react_native_1.Text></>)}
          </expo_linear_gradient_1.LinearGradient>
        </react_native_1.TouchableOpacity>
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#FFF7ED" },
    header: { paddingHorizontal: 16, paddingBottom: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 4 },
    form: { padding: 16, gap: 4 },
    field: { marginBottom: 16 },
    label: { fontSize: 13, fontWeight: "600", color: "#475569", fontFamily: "Inter_600SemiBold", marginBottom: 8 },
    companySelectRow: { gap: 8, paddingRight: 8 },
    companySelectChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 999, borderWidth: 1.5, borderColor: "#FED7AA", backgroundColor: "white" },
    companySelectChipActive: { backgroundColor: "#EA580C", borderColor: "#EA580C" },
    companySelectText: { fontSize: 13, color: "#92400E", fontFamily: "Inter_500Medium" },
    companySelectTextActive: { color: "white" },
    input: { backgroundColor: "white", borderWidth: 1.5, borderColor: "#FED7AA", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular" },
    textarea: { minHeight: 90, paddingTop: 12 },
    row: { flexDirection: "row", gap: 10 },
    typeRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    typeChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, borderWidth: 1.5, borderColor: "#FED7AA", backgroundColor: "white" },
    typeChipText: { fontSize: 13, fontFamily: "Inter_500Medium", color: "#92400E" },
    submitBtn: { borderRadius: 14, overflow: "hidden", marginTop: 8 },
    submitGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 15, gap: 10 },
    submitText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    restricted: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12, backgroundColor: "#FFF7ED" },
    restrictedTitle: { fontSize: 20, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    restrictedSub: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular" },
    successScreen: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#FFF7ED", paddingHorizontal: 32, gap: 16 },
    successIconWrap: { width: 100, height: 100, borderRadius: 50, alignItems: "center", justifyContent: "center", marginBottom: 8 },
    successTitle: { fontSize: 26, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", textAlign: "center" },
    successSub: { fontSize: 15, color: "#64748B", fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 22 },
    successBtn: { borderRadius: 14, overflow: "hidden", width: "100%", marginTop: 8 },
    successBtnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 15, gap: 10 },
    successBtnText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    successSecondaryBtn: { paddingVertical: 12, paddingHorizontal: 24 },
    successSecondaryText: { fontSize: 14, color: "#EA580C", fontFamily: "Inter_600SemiBold", textDecorationLine: "underline" },
    // Dropdown
    dropdownBtn: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "white", borderWidth: 1.5, borderColor: "#FED7AA", borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, minHeight: 48, width: "100%" },
    dropdownIcon: { width: 24, height: 24, borderRadius: 8, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    dropdownBtnText: { flex: 1, fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.35)", justifyContent: "center", paddingHorizontal: 16 },
    dropdownList: { backgroundColor: "white", borderRadius: 20, overflow: "hidden", shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 20, elevation: 10 },
    dropdownListHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    dropdownListTitle: { fontSize: 15, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    dropdownClose: { width: 30, height: 30, borderRadius: 15, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center" },
    dropdownItem: { flexDirection: "row", alignItems: "center", gap: 12, paddingHorizontal: 16, paddingVertical: 13, borderBottomWidth: 1, borderBottomColor: "#F8FAFC" },
    dropdownItemActive: { backgroundColor: "#FFF7ED" },
    dropdownItemIcon: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    dropdownItemText: { flex: 1, fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular" },
});
