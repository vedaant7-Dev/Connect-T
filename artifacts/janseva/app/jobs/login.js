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
exports.default = JobsLoginScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
var DecorativeCircles_1 = require("@/components/DecorativeCircles");
var TopShade_1 = require("@/components/TopShade");
var ROLES = [
    { id: "seeker", icon: "user", label: "Job Seeker", sub: "Find jobs in Ambernath" },
    { id: "employer", icon: "briefcase", label: "Employer", sub: "Post jobs & hire talent" },
];
var AGE_OPTIONS = Array.from({ length: 43 }, function (_, i) { return String(i + 18); });
var QUALIFICATION_OPTIONS = [
    "Below 10th",
    "10th Pass (SSC)",
    "12th Pass (HSC)",
    "ITI Certificate",
    "Diploma",
    "B.A (Arts)",
    "B.Com (Commerce)",
    "B.Sc (Science)",
    "B.E / B.Tech (Engineering)",
    "BBA",
    "BCA",
    "M.A / M.Com / M.Sc",
    "M.E / M.Tech",
    "MBA",
    "MCA",
    "PhD",
    "Other",
];
var LOCATION_OPTIONS = [
    "Ambernath East",
    "Ambernath West",
    "MIDC Ambernath",
    "Shivaji Chowk",
    "Station Area East",
    "Station Area West",
    "Old Ambernath",
    "New Ambernath",
    "Vithalwadi",
    "Shelar Colony",
    "Gupte Colony",
    "Udayanagar",
    "Vallabhwadi",
    "Sahakar Nagar",
    "Gopini",
    "Chikhloli",
    "Badlapur",
    "Ulhasnagar",
    "Other",
];
function DropdownPicker(_a) {
    var label = _a.label, value = _a.value, options = _a.options, placeholder = _a.placeholder, onSelect = _a.onSelect, required = _a.required;
    var _b = (0, react_1.useState)(false), open = _b[0], setOpen = _b[1];
    var _c = (0, react_1.useState)(false), manualMode = _c[0], setManualMode = _c[1];
    var _d = (0, react_1.useState)(""), manualText = _d[0], setManualText = _d[1];
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var handleSelect = function (opt) {
        if (opt === "Other") {
            setManualMode(true);
            setOpen(false);
        }
        else {
            onSelect(opt);
            setOpen(false);
            setManualMode(false);
        }
    };
    var handleManualDone = function () {
        if (manualText.trim()) {
            onSelect(manualText.trim());
            setManualMode(false);
        }
    };
    return (<react_native_1.View style={dd.wrap}>
      <react_native_1.Text style={dd.label}>{label}{required && <react_native_1.Text style={{ color: "#DC2626" }}> *</react_native_1.Text>}</react_native_1.Text>

      {!manualMode ? (<react_native_1.TouchableOpacity style={dd.trigger} onPress={function () { return setOpen(true); }} activeOpacity={0.8}>
          <react_native_1.Text style={[dd.triggerText, !value && dd.placeholder]}>
            {value || placeholder || "Select ".concat(label)}
          </react_native_1.Text>
          <vector_icons_1.Feather name="chevron-down" size={16} color="#94A3B8"/>
        </react_native_1.TouchableOpacity>) : (<react_native_1.View style={dd.manualRow}>
          <react_native_1.TextInput style={[dd.trigger, { flex: 1 }]} value={manualText} onChangeText={setManualText} placeholder={"Type ".concat(label.toLowerCase(), "\u2026")} placeholderTextColor="#CBD5E1"/>
          <react_native_1.TouchableOpacity style={dd.doneBtn} onPress={handleManualDone}>
            <vector_icons_1.Feather name="check" size={16} color="white"/>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={dd.cancelBtn} onPress={function () { return setManualMode(false); }}>
            <vector_icons_1.Feather name="x" size={16} color="#64748B"/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>)}

      {value && !manualMode && (<react_native_1.TouchableOpacity onPress={function () { setManualMode(true); setManualText(value); }} style={dd.editLink}>
          <vector_icons_1.Feather name="edit-2" size={10} color="#EA580C"/>
          <react_native_1.Text style={dd.editLinkText}>Type manually instead</react_native_1.Text>
        </react_native_1.TouchableOpacity>)}

      <react_native_1.Modal visible={open} transparent animationType="fade" onRequestClose={function () { return setOpen(false); }}>
        <react_native_1.TouchableOpacity style={dd.overlay} activeOpacity={1} onPress={function () { return setOpen(false); }}>
          <react_native_1.View style={[dd.sheet, { paddingBottom: Math.max(insets.bottom, 16) }]}>
            <react_native_1.View style={dd.sheetHeader}>
              <react_native_1.Text style={dd.sheetTitle}>Select {label}</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={function () { return setOpen(false); }}><vector_icons_1.Feather name="x" size={20} color="#64748B"/></react_native_1.TouchableOpacity>
            </react_native_1.View>
            <react_native_1.FlatList data={options} keyExtractor={function (o) { return o; }} showsVerticalScrollIndicator={false} renderItem={function (_a) {
            var item = _a.item;
            return (<react_native_1.TouchableOpacity style={[dd.option, item === value && dd.optionActive, item === "Other" && dd.optionOther]} onPress={function () { return handleSelect(item); }} activeOpacity={0.7}>
                  {item === "Other" ? (<react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
                      <vector_icons_1.Feather name="edit-3" size={14} color="#EA580C"/>
                      <react_native_1.Text style={[dd.optionText, { color: "#EA580C" }]}>Other (type manually)</react_native_1.Text>
                    </react_native_1.View>) : (<react_native_1.View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                      <react_native_1.Text style={[dd.optionText, item === value && dd.optionTextActive]}>{item}</react_native_1.Text>
                      {item === value && <vector_icons_1.Feather name="check" size={14} color="#EA580C"/>}
                    </react_native_1.View>)}
                </react_native_1.TouchableOpacity>);
        }}/>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>
      </react_native_1.Modal>
    </react_native_1.View>);
}
function JobsLoginScreen() {
    var _this = this;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var router = (0, expo_router_1.useRouter)();
    var _a = (0, JobsAuthContext_1.useJobsAuth)(), registerJobs = _a.registerJobs, loginJobs = _a.loginJobs;
    var _b = (0, react_1.useState)("login"), tab = _b[0], setTab = _b[1];
    var _c = (0, react_1.useState)("seeker"), role = _c[0], setRole = _c[1];
    var _d = (0, react_1.useState)("form"), step = _d[0], setStep = _d[1];
    var _e = (0, react_1.useState)(false), loading = _e[0], setLoading = _e[1];
    var _f = (0, react_1.useState)(""), error = _f[0], setError = _f[1];
    var _g = (0, react_1.useState)(""), phone = _g[0], setPhone = _g[1];
    var _h = (0, react_1.useState)(""), name = _h[0], setName = _h[1];
    // Seeker-specific
    var _j = (0, react_1.useState)(""), age = _j[0], setAge = _j[1];
    var _k = (0, react_1.useState)(""), qualification = _k[0], setQualification = _k[1];
    var _l = (0, react_1.useState)(""), skills = _l[0], setSkills = _l[1];
    // Employer-specific
    var _m = (0, react_1.useState)(""), company = _m[0], setCompany = _m[1];
    var _o = (0, react_1.useState)(""), gstNo = _o[0], setGstNo = _o[1];
    var _p = (0, react_1.useState)(""), email = _p[0], setEmail = _p[1];
    var _q = (0, react_1.useState)(""), location = _q[0], setLocation = _q[1];
    var _r = (0, react_1.useState)(["", "", "", ""]), otp = _r[0], setOtp = _r[1];
    var otpRefs = [
        (0, react_1.useRef)(null),
        (0, react_1.useRef)(null),
        (0, react_1.useRef)(null),
        (0, react_1.useRef)(null),
    ];
    var setOtpDigit = function (i, val) {
        var _a, _b;
        var next = __spreadArray([], otp, true);
        next[i] = val;
        setOtp(next);
        if (val && i < 3)
            (_b = (_a = otpRefs[i + 1]) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.focus();
    };
    var validateSeeker = function () {
        if (!name.trim())
            return "Full name is required.";
        if (!age)
            return "Please select your age.";
        if (phone.length !== 10)
            return "Enter a valid 10-digit mobile number.";
        if (!qualification)
            return "Please select your qualification.";
        return null;
    };
    var validateEmployer = function () {
        if (!name.trim())
            return "Full name is required.";
        if (!company.trim())
            return "Company name is required.";
        if (!location)
            return "Please select your location.";
        if (!email.trim() || !email.includes("@"))
            return "Enter a valid email address.";
        if (phone.length !== 10)
            return "Enter a valid 10-digit mobile number.";
        return null;
    };
    var handleSendOtp = function () {
        setError("");
        if (tab === "register") {
            var err = role === "seeker" ? validateSeeker() : validateEmployer();
            if (err) {
                setError(err);
                return;
            }
        }
        else {
            if (phone.length !== 10) {
                setError("Enter a valid 10-digit mobile number.");
                return;
            }
        }
        setStep("otp");
    };
    var handleVerifyOtp = function () { return __awaiter(_this, void 0, void 0, function () {
        var code, ok, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    code = otp.join("");
                    if (code.length < 4) {
                        setError("Enter the 4-digit OTP.");
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError("");
                    return [4 /*yield*/, new Promise(function (r) { return setTimeout(r, 800); })];
                case 1:
                    _b.sent();
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 7, , 8]);
                    if (!(tab === "register")) return [3 /*break*/, 4];
                    return [4 /*yield*/, registerJobs({
                            name: name.trim(),
                            phone: phone,
                            role: role,
                            age: age || undefined,
                            qualification: qualification || undefined,
                            skills: skills.trim() || undefined,
                            company: company.trim() || undefined,
                            gstNo: gstNo.trim() || undefined,
                            email: email.trim() || undefined,
                            location: location || undefined,
                            avatarColor: (0, JobsAuthContext_1.randomColor)(),
                        })];
                case 3:
                    _b.sent();
                    return [3 /*break*/, 6];
                case 4: return [4 /*yield*/, loginJobs(phone, role)];
                case 5:
                    ok = _b.sent();
                    if (!ok) {
                        setError("No account found. Please register first.");
                        setStep("form");
                        setTab("register");
                        setLoading(false);
                        return [2 /*return*/];
                    }
                    _b.label = 6;
                case 6:
                    setStep("success");
                    setTimeout(function () { return router.replace("/jobs/(tabs)"); }, 1200);
                    return [3 /*break*/, 8];
                case 7:
                    _a = _b.sent();
                    setError("Something went wrong. Try again.");
                    return [3 /*break*/, 8];
                case 8:
                    setLoading(false);
                    return [2 /*return*/];
            }
        });
    }); };
    var switchTab = function (t) {
        setTab(t);
        setStep("form");
        setError("");
        setOtp(["", "", "", ""]);
    };
    return (<react_native_1.KeyboardAvoidingView style={{ flex: 1 }} behavior={react_native_1.Platform.OS === "ios" ? "padding" : undefined}>
      <react_native_1.ScrollView style={{ flex: 1, backgroundColor: "#FFF7ED" }} contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
        <expo_linear_gradient_1.LinearGradient colors={["#9A3412", "#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: (react_native_1.Platform.OS === "web" ? 44 : insets.top) + 20, overflow: "hidden" }]}>
          <TopShade_1.default height={120}/>
          <DecorativeCircles_1.default />
          <react_native_1.Text style={styles.headerTitle}>Connect T Jobs</react_native_1.Text>
          <react_native_1.Text style={styles.headerSub}>Ambernath's #1 Local Job Portal</react_native_1.Text>
        </expo_linear_gradient_1.LinearGradient>

        <react_native_1.View style={styles.card}>
          {step === "success" ? (<react_native_1.View style={styles.successWrap}>
              <react_native_1.View style={styles.successCircle}>
                <vector_icons_1.Feather name="check" size={36} color="white"/>
              </react_native_1.View>
              <react_native_1.Text style={styles.successTitle}>Welcome!</react_native_1.Text>
              <react_native_1.Text style={styles.successSub}>Taking you to the job portal…</react_native_1.Text>
            </react_native_1.View>) : (<>
              <react_native_1.Text style={styles.cardTitle}>{tab === "login" ? "Welcome Back" : "Create Account"}</react_native_1.Text>

              <react_native_1.View style={styles.roleRow}>
                {ROLES.map(function (r) { return (<react_native_1.TouchableOpacity key={r.id} style={[styles.roleCard, role === r.id && styles.roleCardActive]} onPress={function () { return setRole(r.id); }} activeOpacity={0.8}>
                    <react_native_1.View style={[styles.roleIcon, role === r.id && styles.roleIconActive]}>
                      <vector_icons_1.Feather name={r.icon} size={20} color={role === r.id ? "white" : "#EA580C"}/>
                    </react_native_1.View>
                    <react_native_1.Text style={[styles.roleLabel, role === r.id && styles.roleLabelActive]}>{r.label}</react_native_1.Text>
                    <react_native_1.Text style={[styles.roleSub, role === r.id && { color: "rgba(255,255,255,0.75)" }]}>{r.sub}</react_native_1.Text>
                  </react_native_1.TouchableOpacity>); })}
              </react_native_1.View>

              <react_native_1.View style={styles.tabRow}>
                {["login", "register"].map(function (t) { return (<react_native_1.TouchableOpacity key={t} style={[styles.tabItem, tab === t && styles.tabActive]} onPress={function () { return switchTab(t); }}>
                    <react_native_1.Text style={[styles.tabText, tab === t && styles.tabTextActive]}>
                      {t === "login" ? "Login" : "Register"}
                    </react_native_1.Text>
                  </react_native_1.TouchableOpacity>); })}
              </react_native_1.View>

              {step === "form" && (<>
                  {tab === "register" && role === "seeker" && (<>
                      <react_native_1.View style={styles.sectionBanner}>
                        <vector_icons_1.Feather name="user" size={13} color="#EA580C"/>
                        <react_native_1.Text style={styles.sectionBannerText}>Job Seeker Details</react_native_1.Text>
                      </react_native_1.View>

                      <react_native_1.View style={styles.inputWrap}>
                        <react_native_1.Text style={styles.inputLabel}>Full Name <react_native_1.Text style={{ color: "#DC2626" }}>*</react_native_1.Text></react_native_1.Text>
                        <react_native_1.TextInput style={styles.input} value={name} onChangeText={setName} placeholder="e.g. Ramesh Patil" placeholderTextColor="#CBD5E1" autoCapitalize="words"/>
                      </react_native_1.View>

                      <DropdownPicker label="Age" value={age} options={AGE_OPTIONS} placeholder="Select your age" onSelect={setAge} required/>

                      <react_native_1.View style={styles.inputWrap}>
                        <react_native_1.Text style={styles.inputLabel}>Mobile Number <react_native_1.Text style={{ color: "#DC2626" }}>*</react_native_1.Text></react_native_1.Text>
                        <react_native_1.View style={styles.phoneRow}>
                          <react_native_1.View style={styles.phoneCode}><react_native_1.Text style={styles.phoneCodeText}>+91</react_native_1.Text></react_native_1.View>
                          <react_native_1.TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={phone} onChangeText={function (t) { return setPhone(t.replace(/\D/g, "").slice(0, 10)); }} placeholder="XXXXX XXXXX" placeholderTextColor="#CBD5E1" keyboardType="phone-pad" maxLength={10}/>
                        </react_native_1.View>
                      </react_native_1.View>

                      <DropdownPicker label="Qualification" value={qualification} options={QUALIFICATION_OPTIONS} placeholder="Select highest qualification" onSelect={setQualification} required/>

                      <react_native_1.View style={styles.inputWrap}>
                        <react_native_1.Text style={styles.inputLabel}>Skills <react_native_1.Text style={styles.optional}>(optional)</react_native_1.Text></react_native_1.Text>
                        <react_native_1.TextInput style={styles.input} value={skills} onChangeText={setSkills} placeholder="e.g. Welding, MS Office, Driving" placeholderTextColor="#CBD5E1"/>
                        <react_native_1.Text style={styles.hint}>Separate multiple skills with commas</react_native_1.Text>
                      </react_native_1.View>
                    </>)}

                  {tab === "register" && role === "employer" && (<>
                      <react_native_1.View style={styles.sectionBanner}>
                        <vector_icons_1.Feather name="briefcase" size={13} color="#EA580C"/>
                        <react_native_1.Text style={styles.sectionBannerText}>Employer Registration</react_native_1.Text>
                      </react_native_1.View>

                      <react_native_1.View style={styles.inputWrap}>
                        <react_native_1.Text style={styles.inputLabel}>Full Name <react_native_1.Text style={{ color: "#DC2626" }}>*</react_native_1.Text></react_native_1.Text>
                        <react_native_1.TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Contact person full name" placeholderTextColor="#CBD5E1" autoCapitalize="words"/>
                      </react_native_1.View>

                      <react_native_1.View style={styles.inputWrap}>
                        <react_native_1.Text style={styles.inputLabel}>Company Name <react_native_1.Text style={{ color: "#DC2626" }}>*</react_native_1.Text></react_native_1.Text>
                        <react_native_1.TextInput style={styles.input} value={company} onChangeText={setCompany} placeholder="e.g. XYZ Manufacturing Pvt Ltd" placeholderTextColor="#CBD5E1" autoCapitalize="words"/>
                      </react_native_1.View>

                      <react_native_1.View style={styles.inputWrap}>
                        <react_native_1.Text style={styles.inputLabel}>GST Number <react_native_1.Text style={styles.optional}>(optional)</react_native_1.Text></react_native_1.Text>
                        <react_native_1.TextInput style={styles.input} value={gstNo} onChangeText={function (t) { return setGstNo(t.toUpperCase()); }} placeholder="e.g. 27AABCU9603R1ZN" placeholderTextColor="#CBD5E1" autoCapitalize="characters" maxLength={15}/>
                        <react_native_1.Text style={styles.hint}>15-digit GST Identification Number</react_native_1.Text>
                      </react_native_1.View>

                      <DropdownPicker label="Business Location" value={location} options={LOCATION_OPTIONS} placeholder="Select your area" onSelect={setLocation} required/>

                      <react_native_1.View style={styles.inputWrap}>
                        <react_native_1.Text style={styles.inputLabel}>Email Address <react_native_1.Text style={{ color: "#DC2626" }}>*</react_native_1.Text></react_native_1.Text>
                        <react_native_1.TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="company@email.com" placeholderTextColor="#CBD5E1" keyboardType="email-address" autoCapitalize="none"/>
                      </react_native_1.View>

                      <react_native_1.View style={styles.inputWrap}>
                        <react_native_1.Text style={styles.inputLabel}>Mobile Number <react_native_1.Text style={{ color: "#DC2626" }}>*</react_native_1.Text></react_native_1.Text>
                        <react_native_1.View style={styles.phoneRow}>
                          <react_native_1.View style={styles.phoneCode}><react_native_1.Text style={styles.phoneCodeText}>+91</react_native_1.Text></react_native_1.View>
                          <react_native_1.TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={phone} onChangeText={function (t) { return setPhone(t.replace(/\D/g, "").slice(0, 10)); }} placeholder="XXXXX XXXXX" placeholderTextColor="#CBD5E1" keyboardType="phone-pad" maxLength={10}/>
                        </react_native_1.View>
                      </react_native_1.View>
                    </>)}

                  {tab === "login" && (<react_native_1.View style={styles.inputWrap}>
                      <react_native_1.Text style={styles.inputLabel}>Mobile Number <react_native_1.Text style={{ color: "#DC2626" }}>*</react_native_1.Text></react_native_1.Text>
                      <react_native_1.View style={styles.phoneRow}>
                        <react_native_1.View style={styles.phoneCode}><react_native_1.Text style={styles.phoneCodeText}>+91</react_native_1.Text></react_native_1.View>
                        <react_native_1.TextInput style={[styles.input, { flex: 1, marginBottom: 0 }]} value={phone} onChangeText={function (t) { return setPhone(t.replace(/\D/g, "").slice(0, 10)); }} placeholder="XXXXX XXXXX" placeholderTextColor="#CBD5E1" keyboardType="phone-pad" maxLength={10}/>
                      </react_native_1.View>
                    </react_native_1.View>)}

                  {!!error && <react_native_1.Text style={styles.error}>{error}</react_native_1.Text>}

                  <react_native_1.TouchableOpacity style={styles.btn} onPress={handleSendOtp} activeOpacity={0.85}>
                    <expo_linear_gradient_1.LinearGradient colors={["#047857", "#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btnGrad}>
                      <react_native_1.Text style={styles.btnText}>Send OTP</react_native_1.Text>
                      <vector_icons_1.Feather name="arrow-right" size={18} color="white"/>
                    </expo_linear_gradient_1.LinearGradient>
                  </react_native_1.TouchableOpacity>
                </>)}

              {step === "otp" && (<>
                  <react_native_1.Text style={styles.otpHint}>Enter the 4-digit OTP sent to +91 {phone}</react_native_1.Text>
                  <react_native_1.View style={styles.otpRow}>
                    {otp.map(function (d, i) { return (<react_native_1.TextInput key={i} ref={otpRefs[i]} style={[styles.otpBox, d && styles.otpBoxFilled]} value={d} onChangeText={function (v) { return setOtpDigit(i, v.replace(/\D/g, "").slice(-1)); }} keyboardType="number-pad" maxLength={1}/>); })}
                  </react_native_1.View>
                  <react_native_1.Text style={styles.otpDemoNote}>Demo: any 4 digits work</react_native_1.Text>

                  {!!error && <react_native_1.Text style={styles.error}>{error}</react_native_1.Text>}

                  <react_native_1.TouchableOpacity style={styles.btn} onPress={handleVerifyOtp} activeOpacity={0.85} disabled={loading}>
                    <expo_linear_gradient_1.LinearGradient colors={["#047857", "#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.btnGrad}>
                      {loading ? <react_native_1.ActivityIndicator color="white"/> : (<>
                          <react_native_1.Text style={styles.btnText}>Verify & Continue</react_native_1.Text>
                          <vector_icons_1.Feather name="check" size={18} color="white"/>
                        </>)}
                    </expo_linear_gradient_1.LinearGradient>
                  </react_native_1.TouchableOpacity>

                  <react_native_1.TouchableOpacity onPress={function () { setStep("form"); setOtp(["", "", "", ""]); setError(""); }} style={{ alignSelf: "center", marginTop: 10 }}>
                    <react_native_1.Text style={styles.backLink}>← Change number</react_native_1.Text>
                  </react_native_1.TouchableOpacity>
                </>)}
            </>)}
        </react_native_1.View>

        <react_native_1.View style={styles.backBtn}>
          <react_native_1.TouchableOpacity onPress={function () { return router.replace("/portal-select"); }} style={styles.backPill}>
            <vector_icons_1.Feather name="arrow-left" size={14} color="#EA580C"/>
            <react_native_1.Text style={styles.backPillText}>Back</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_1.KeyboardAvoidingView>);
}
var styles = react_native_1.StyleSheet.create({
    header: { alignItems: "center", paddingHorizontal: 24, paddingBottom: 32 },
    headerTitle: { fontSize: 24, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular", marginTop: 4 },
    card: { backgroundColor: "white", borderRadius: 28, margin: 16, marginTop: -20, padding: 24, shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 20, shadowOffset: { width: 0, height: 4 }, elevation: 6 },
    cardTitle: { fontSize: 20, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 18, textAlign: "center" },
    roleRow: { flexDirection: "row", gap: 10, marginBottom: 20 },
    roleCard: { flex: 1, borderRadius: 14, borderWidth: 2, borderColor: "#FED7AA", backgroundColor: "#FFF7ED", padding: 12, alignItems: "center", gap: 6 },
    roleCardActive: { borderColor: "#EA580C", backgroundColor: "#EA580C" },
    roleIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#FFEDD5", alignItems: "center", justifyContent: "center" },
    roleIconActive: { backgroundColor: "rgba(255,255,255,0.25)" },
    roleLabel: { fontSize: 13, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold" },
    roleLabelActive: { color: "white" },
    roleSub: { fontSize: 10, color: "#92400E", fontFamily: "Inter_400Regular", textAlign: "center" },
    tabRow: { flexDirection: "row", backgroundColor: "#F1F5F9", borderRadius: 12, padding: 3, marginBottom: 20 },
    tabItem: { flex: 1, paddingVertical: 8, alignItems: "center", borderRadius: 10 },
    tabActive: { backgroundColor: "white", shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 4, shadowOffset: { width: 0, height: 1 }, elevation: 2 },
    tabText: { fontSize: 14, color: "#64748B", fontFamily: "Inter_500Medium" },
    tabTextActive: { color: "#EA580C", fontFamily: "Inter_700Bold" },
    sectionBanner: { flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: "#FFF7ED", borderRadius: 10, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 16, borderLeftWidth: 3, borderLeftColor: "#EA580C" },
    sectionBannerText: { fontSize: 13, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold" },
    inputWrap: { marginBottom: 14 },
    inputLabel: { fontSize: 12, fontWeight: "600", color: "#475569", fontFamily: "Inter_600SemiBold", marginBottom: 6 },
    optional: { fontSize: 11, color: "#94A3B8", fontWeight: "400", fontFamily: "Inter_400Regular" },
    input: { backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular" },
    hint: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 4 },
    phoneRow: { flexDirection: "row", gap: 8, alignItems: "center" },
    phoneCode: { backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12, paddingHorizontal: 12, paddingVertical: 12 },
    phoneCodeText: { fontSize: 15, color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    btn: { borderRadius: 14, overflow: "hidden", marginTop: 6 },
    btnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 15, gap: 8 },
    btnText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    otpHint: { fontSize: 13, color: "#64748B", fontFamily: "Inter_400Regular", textAlign: "center", marginBottom: 16 },
    otpRow: { flexDirection: "row", gap: 10, justifyContent: "center", marginBottom: 8 },
    otpBox: { width: 56, height: 60, borderRadius: 14, borderWidth: 2, borderColor: "#E2E8F0", fontSize: 24, fontWeight: "700", color: "#0F172A", backgroundColor: "#F8FAFC", fontFamily: "Inter_700Bold", textAlign: "center", textAlignVertical: "center", paddingVertical: 0, includeFontPadding: false, lineHeight: 60 },
    otpBoxFilled: { borderColor: "#EA580C", backgroundColor: "#FFF7ED" },
    otpDemoNote: { fontSize: 11, color: "#94A3B8", textAlign: "center", marginBottom: 14, fontFamily: "Inter_400Regular" },
    error: { fontSize: 13, color: "#DC2626", fontFamily: "Inter_400Regular", textAlign: "center", marginBottom: 10, backgroundColor: "#FEE2E2", padding: 10, borderRadius: 8 },
    backLink: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_400Regular" },
    successWrap: { alignItems: "center", paddingVertical: 32, gap: 12 },
    successCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#EA580C", alignItems: "center", justifyContent: "center" },
    successTitle: { fontSize: 24, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    successSub: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular" },
    backBtn: { alignItems: "center", paddingBottom: 32 },
    backPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "white", paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1.5, borderColor: "#FED7AA" },
    backPillText: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_600SemiBold" },
});
var dd = react_native_1.StyleSheet.create({
    wrap: { marginBottom: 14 },
    label: { fontSize: 12, fontWeight: "600", color: "#475569", fontFamily: "Inter_600SemiBold", marginBottom: 6 },
    trigger: {
        backgroundColor: "#F8FAFC", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 12,
        paddingHorizontal: 14, paddingVertical: 12,
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
    },
    triggerText: { fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular", flex: 1 },
    placeholder: { color: "#CBD5E1" },
    manualRow: { flexDirection: "row", gap: 8, alignItems: "center" },
    doneBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#EA580C", alignItems: "center", justifyContent: "center" },
    cancelBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center" },
    editLink: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
    editLinkText: { fontSize: 10, color: "#EA580C", fontFamily: "Inter_400Regular" },
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
    sheet: { backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: 480 },
    sheetHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    sheetTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    option: { paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: "#F8FAFC" },
    optionActive: { backgroundColor: "#FFF7ED" },
    optionOther: { borderTopWidth: 1, borderTopColor: "#FED7AA", marginTop: 4 },
    optionText: { fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular" },
    optionTextActive: { color: "#EA580C", fontFamily: "Inter_700Bold" },
});
