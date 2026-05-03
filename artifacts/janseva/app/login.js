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
exports.default = LoginScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var AuthContext_1 = require("@/context/AuthContext");
var TopShade_1 = require("@/components/TopShade");
var mumbaiServices_1 = require("@/data/mumbaiServices");
var LanguageContext_1 = require("@/context/LanguageContext");
function LoginScreen() {
    var _this = this;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 44 : insets.top;
    var _a = (0, AuthContext_1.useAuth)(), register = _a.register, loginWithPhone = _a.loginWithPhone;
    var _b = (0, LanguageContext_1.useLanguage)(), language = _b.language, setLanguage = _b.setLanguage, t = _b.t;
    var _c = (0, react_1.useState)("register"), activeTab = _c[0], setActiveTab = _c[1];
    var _d = (0, react_1.useState)(false), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(""), error = _e[0], setError = _e[1];
    var _f = (0, react_1.useState)(false), wardModal = _f[0], setWardModal = _f[1];
    var _g = (0, react_1.useState)("form"), regStep = _g[0], setRegStep = _g[1];
    var _h = (0, react_1.useState)("form"), loginStep = _h[0], setLoginStep = _h[1];
    var _j = (0, react_1.useState)(""), regName = _j[0], setRegName = _j[1];
    var _k = (0, react_1.useState)(""), regAge = _k[0], setRegAge = _k[1];
    var _l = (0, react_1.useState)(""), regEmail = _l[0], setRegEmail = _l[1];
    var _m = (0, react_1.useState)(""), regAddress = _m[0], setRegAddress = _m[1];
    var _o = (0, react_1.useState)(""), regPhone = _o[0], setRegPhone = _o[1];
    var _p = (0, react_1.useState)(""), regWard = _p[0], setRegWard = _p[1];
    var _q = (0, react_1.useState)(false), notifyEmail = _q[0], setNotifyEmail = _q[1];
    var _r = (0, react_1.useState)(false), notifyWhatsapp = _r[0], setNotifyWhatsapp = _r[1];
    var _s = (0, react_1.useState)(""), loginPhone = _s[0], setLoginPhone = _s[1];
    var otpRef1 = (0, react_1.useRef)(null);
    var otpRef2 = (0, react_1.useRef)(null);
    var otpRef3 = (0, react_1.useRef)(null);
    var otpRef4 = (0, react_1.useRef)(null);
    var _t = (0, react_1.useState)(["", "", "", ""]), otpDigits = _t[0], setOtpDigits = _t[1];
    var successAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    var windowHeight = (0, react_native_1.useWindowDimensions)().height;
    var switchTab = function (tab) {
        setActiveTab(tab);
        setError("");
        setRegStep("form");
        setLoginStep("form");
        setOtpDigits(["", "", "", ""]);
    };
    var setOtpDigit = function (index, value, refs) {
        var _a, _b;
        var newDigits = __spreadArray([], otpDigits, true);
        newDigits[index] = value;
        setOtpDigits(newDigits);
        if (value && index < 3) {
            (_b = (_a = refs[index + 1]) === null || _a === void 0 ? void 0 : _a.current) === null || _b === void 0 ? void 0 : _b.focus();
        }
    };
    var handleRegisterSubmit = function () {
        setError("");
        if (!regName.trim() || regName.trim().length < 2) {
            setError(t("enterFullName"));
            return;
        }
        var ageNum = parseInt(regAge, 10);
        if (!regAge || isNaN(ageNum) || ageNum < 1 || ageNum > 120) {
            setError(t("enterValidAge"));
            return;
        }
        if (regEmail.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(regEmail.trim())) {
            setError(t("enterValidEmail"));
            return;
        }
        if (!regAddress.trim()) {
            setError(t("enterAddress"));
            return;
        }
        var phone = regPhone.trim().replace(/\D/g, "");
        if (phone.length !== 10) {
            setError(t("enterValidPhone"));
            return;
        }
        if (!regWard) {
            setError(t("selectWardError"));
            return;
        }
        setRegStep("otp");
    };
    var handleRegisterOtp = function () { return __awaiter(_this, void 0, void 0, function () {
        var otp;
        return __generator(this, function (_a) {
            otp = otpDigits.join("");
            if (otp.length !== 4) {
                setError(t("enterOtp"));
                return [2 /*return*/];
            }
            setError("");
            setRegStep("notifications");
            setOtpDigits(["", "", "", ""]);
            return [2 /*return*/];
        });
    }); };
    var handleRegisterFinish = function () { return __awaiter(_this, void 0, void 0, function () {
        var e_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    setLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, 4, 5]);
                    return [4 /*yield*/, register({
                            name: regName.trim(),
                            mobile: regPhone.trim().replace(/\D/g, ""),
                            role: "citizen",
                            ward: regWard,
                            age: parseInt(regAge, 10),
                            email: regEmail.trim() || undefined,
                            address: regAddress.trim(),
                            notifyEmail: notifyEmail,
                            notifyWhatsapp: notifyWhatsapp,
                        })];
                case 2:
                    _b.sent();
                    setRegStep("success");
                    react_native_1.Animated.spring(successAnim, {
                        toValue: 1,
                        tension: 60,
                        friction: 7,
                        useNativeDriver: true,
                    }).start();
                    setTimeout(function () {
                        expo_router_1.router.replace("/portal-select");
                    }, 1200);
                    return [3 /*break*/, 5];
                case 3:
                    e_1 = _b.sent();
                    setError((_a = e_1.message) !== null && _a !== void 0 ? _a : t("registrationFailed"));
                    return [3 /*break*/, 5];
                case 4:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var handleLoginSubmit = function () {
        setError("");
        var phone = loginPhone.trim().replace(/\D/g, "");
        if (phone.length !== 10) {
            setError(t("enterValidPhone"));
            return;
        }
        setLoginStep("otp");
    };
    var handleLoginOtp = function () { return __awaiter(_this, void 0, void 0, function () {
        var otp, phone, user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    otp = otpDigits.join("");
                    if (otp.length !== 4) {
                        setError(t("enterOtp"));
                        return [2 /*return*/];
                    }
                    setLoading(true);
                    setError("");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    phone = loginPhone.trim().replace(/\D/g, "");
                    return [4 /*yield*/, loginWithPhone(phone)];
                case 2:
                    user = _a.sent();
                    if (user) {
                        expo_router_1.router.replace(user.role === "nagarsevak" ? "/(tabs)/admin" : "/portal-select");
                    }
                    else {
                        setError(t("accountNotFound"));
                        setLoginStep("form");
                        setOtpDigits(["", "", "", ""]);
                    }
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var otpRefs = [otpRef1, otpRef2, otpRef3, otpRef4];
    var renderOtpInput = function () { return (<react_native_1.View style={s.otpSection}>
      <react_native_1.View style={s.otpIconWrap}>
        <vector_icons_1.Feather name="smartphone" size={28} color="#EA580C"/>
      </react_native_1.View>
      <react_native_1.Text style={s.otpTitle}>{t("otpVerification")}</react_native_1.Text>
      <react_native_1.Text style={s.otpSub}>{t("otpSent")} +91 {activeTab === "register" ? regPhone : loginPhone}</react_native_1.Text>
      <react_native_1.View style={s.otpRow}>
        {otpDigits.map(function (digit, i) { return (<react_native_1.TextInput key={i} ref={otpRefs[i]} style={[s.otpBox, digit ? s.otpBoxFilled : null]} value={digit} onChangeText={function (v) {
                var next = v.slice(-1);
                setOtpDigit(i, next, otpRefs);
            }} keyboardType="number-pad" maxLength={1} textAlign="center" onKeyPress={function (_a) {
                var _b, _c;
                var nativeEvent = _a.nativeEvent;
                if (nativeEvent.key === "Backspace" && !digit && i > 0) {
                    (_c = (_b = otpRefs[i - 1]) === null || _b === void 0 ? void 0 : _b.current) === null || _c === void 0 ? void 0 : _c.focus();
                }
            }}/>); })}
      </react_native_1.View>
      <react_native_1.Text style={s.otpHint}>{t("otpHint")}</react_native_1.Text>
      {error ? <react_native_1.Text style={s.errorText}>{error}</react_native_1.Text> : null}
      <react_native_1.TouchableOpacity style={s.primaryBtn} onPress={activeTab === "register" ? handleRegisterOtp : handleLoginOtp} activeOpacity={0.85} disabled={loading}>
        {loading ? (<react_native_1.ActivityIndicator color="white"/>) : (<expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.primaryBtnGrad}>
            <react_native_1.Text style={s.primaryBtnText}>{t("verifyOtp")}</react_native_1.Text>
            <vector_icons_1.Feather name="check" size={18} color="white"/>
          </expo_linear_gradient_1.LinearGradient>)}
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    var renderRegisterForm = function () { return (<react_native_1.View style={s.formCard}>
      <react_native_1.Text style={s.fieldLabel}>
        {t("fullName")} <react_native_1.Text style={s.required}>*</react_native_1.Text>
      </react_native_1.Text>
      <react_native_1.TextInput style={s.input} placeholder={t("enterFullName")} placeholderTextColor="#94A3B8" value={regName} onChangeText={function (v) {
            setRegName(v);
        }} autoCapitalize="words"/>

      <react_native_1.Text style={s.fieldLabel}>{t("age")}</react_native_1.Text>
      <react_native_1.TextInput style={s.input} placeholder={t("enterAge")} placeholderTextColor="#94A3B8" keyboardType="number-pad" maxLength={3} value={regAge} onChangeText={function (v) {
            setRegAge(v);
        }}/>

      <react_native_1.Text style={s.fieldLabel}>
        {t("email")} <react_native_1.Text style={s.optional}>({t("optional")})</react_native_1.Text>
      </react_native_1.Text>
      <react_native_1.TextInput style={s.input} placeholder="yourname@email.com" placeholderTextColor="#94A3B8" keyboardType="email-address" autoCapitalize="none" value={regEmail} onChangeText={function (v) {
            setRegEmail(v);
        }}/>

      <react_native_1.Text style={s.fieldLabel}>
        {t("currentAddress")} <react_native_1.Text style={s.required}>*</react_native_1.Text>
      </react_native_1.Text>
      <react_native_1.TextInput style={[s.input, { minHeight: 60, textAlignVertical: "top" }]} placeholder={t("enterAddress")} placeholderTextColor="#94A3B8" multiline numberOfLines={2} value={regAddress} onChangeText={function (v) {
            setRegAddress(v);
        }}/>

      <react_native_1.Text style={s.fieldLabel}>
        {t("phoneNumber")} <react_native_1.Text style={s.required}>*</react_native_1.Text>
      </react_native_1.Text>
      <react_native_1.View style={s.phoneRow}>
        <react_native_1.View style={s.countryCode}>
          <react_native_1.Text style={s.countryCodeText}>IN +91</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TextInput style={[s.input, s.phoneInput]} placeholder="10-digit mobile number" placeholderTextColor="#94A3B8" keyboardType="phone-pad" maxLength={10} value={regPhone} onChangeText={function (v) {
            setRegPhone(v);
        }}/>
      </react_native_1.View>

      <react_native_1.Text style={s.fieldLabel}>
        {t("wardLocation")} <react_native_1.Text style={s.required}>*</react_native_1.Text>
      </react_native_1.Text>
      <react_native_1.TouchableOpacity style={[s.input, s.pickerInput]} onPress={function () { return setWardModal(true); }} activeOpacity={0.8}>
        <vector_icons_1.Feather name="map-pin" size={14} color={regWard ? "#EA580C" : "#94A3B8"}/>
        <react_native_1.Text style={[s.pickerText, !regWard && { color: "#94A3B8" }]}>
          {regWard || t("selectWard")}
        </react_native_1.Text>
        <vector_icons_1.Feather name="chevron-down" size={14} color="#94A3B8"/>
      </react_native_1.TouchableOpacity>

      {error ? <react_native_1.Text style={s.errorText}>{error}</react_native_1.Text> : null}

      <react_native_1.TouchableOpacity style={s.primaryBtn} onPress={handleRegisterSubmit} activeOpacity={0.85}>
        <expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.primaryBtnGrad}>
          <react_native_1.Text style={s.primaryBtnText}>{t("continue")}</react_native_1.Text>
          <vector_icons_1.Feather name="arrow-right" size={18} color="white"/>
        </expo_linear_gradient_1.LinearGradient>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    var renderNotifications = function () { return (<react_native_1.View style={s.formCard}>
      <react_native_1.View style={s.otpIconWrap}>
        <vector_icons_1.Feather name="check-circle" size={28} color="#059669"/>
      </react_native_1.View>
      <react_native_1.Text style={s.otpTitle}>{t("phoneVerified")}</react_native_1.Text>
      <react_native_1.Text style={s.otpSub}>{t("allowNotifications")}</react_native_1.Text>

      <react_native_1.View style={s.notifSection}>
        <react_native_1.TouchableOpacity style={s.checkRow} onPress={function () { return setNotifyEmail(!notifyEmail); }} activeOpacity={0.8}>
          <react_native_1.View style={[s.checkbox, notifyEmail && s.checkboxActive]}>
            {notifyEmail && <vector_icons_1.Feather name="check" size={14} color="white"/>}
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={s.checkLabel}>{t("emailNotifications")}</react_native_1.Text>
            <react_native_1.Text style={s.checkSub}>{t("emailNotifDesc")}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity style={s.checkRow} onPress={function () { return setNotifyWhatsapp(!notifyWhatsapp); }} activeOpacity={0.8}>
          <react_native_1.View style={[s.checkbox, notifyWhatsapp && s.checkboxActive]}>
            {notifyWhatsapp && <vector_icons_1.Feather name="check" size={14} color="white"/>}
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={s.checkLabel}>{t("whatsappNotifications")}</react_native_1.Text>
            <react_native_1.Text style={s.checkSub}>{t("whatsappNotifDesc")}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {error ? <react_native_1.Text style={s.errorText}>{error}</react_native_1.Text> : null}

      <react_native_1.TouchableOpacity style={s.primaryBtn} onPress={handleRegisterFinish} activeOpacity={0.85} disabled={loading}>
        {loading ? (<react_native_1.ActivityIndicator color="white"/>) : (<expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.primaryBtnGrad}>
            <react_native_1.Text style={s.primaryBtnText}>{t("registerBtn")}</react_native_1.Text>
            <vector_icons_1.Feather name="user-plus" size={18} color="white"/>
          </expo_linear_gradient_1.LinearGradient>)}
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    var renderSuccess = function () { return (<react_native_1.Animated.View style={[s.successCard, { opacity: successAnim, transform: [{ scale: successAnim }] }]}>
      <react_native_1.View style={s.successIconWrap}>
        <vector_icons_1.Feather name="check-circle" size={48} color="#059669"/>
      </react_native_1.View>
      <react_native_1.Text style={s.successTitle}>{t("registrationSuccess")}</react_native_1.Text>
      <react_native_1.Text style={s.successSub}>{t("redirectingHome")}</react_native_1.Text>
      <react_native_1.ActivityIndicator color="#EA580C" style={{ marginTop: 16 }}/>
    </react_native_1.Animated.View>); };
    var renderLoginForm = function () { return (<react_native_1.View style={s.formCard}>
      <react_native_1.Text style={s.fieldLabel}>{t("phoneNumber")}</react_native_1.Text>
      <react_native_1.View style={s.phoneRow}>
        <react_native_1.View style={s.countryCode}>
          <react_native_1.Text style={s.countryCodeText}>IN +91</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TextInput style={[s.input, s.phoneInput]} placeholder={t("enterPhoneNumber")} placeholderTextColor="#94A3B8" keyboardType="phone-pad" maxLength={10} value={loginPhone} onChangeText={function (v) {
            setLoginPhone(v);
        }}/>
      </react_native_1.View>

      {error ? <react_native_1.Text style={s.errorText}>{error}</react_native_1.Text> : null}

      <react_native_1.TouchableOpacity style={s.primaryBtn} onPress={handleLoginSubmit} activeOpacity={0.85}>
        <expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={s.primaryBtnGrad}>
          <react_native_1.Text style={s.primaryBtnText}>{t("continue")}</react_native_1.Text>
          <vector_icons_1.Feather name="arrow-right" size={18} color="white"/>
        </expo_linear_gradient_1.LinearGradient>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>); };
    return (<expo_linear_gradient_1.LinearGradient colors={["#9A3412", "#C2410C", "#EA580C", "#F97316", "#FB923C"]} locations={[0, 0.2, 0.45, 0.75, 1]} style={[s.root, { paddingTop: topPad, overflow: "hidden" }]}>
      <TopShade_1.default height={220}/>
      <react_native_1.View style={[ld.blob, ld.b1]}/>
      <react_native_1.View style={[ld.blob, ld.b2]}/>
      <react_native_1.View style={[ld.ring, ld.r1]}/>
      <react_native_1.View style={[ld.ring, ld.r2]}/>
      <react_native_1.View style={[ld.ring, ld.r3]}/>
      <react_native_1.KeyboardAvoidingView behavior={react_native_1.Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }} keyboardVerticalOffset={topPad + 20}>
        <react_native_1.ScrollView contentContainerStyle={[s.scroll, { minHeight: windowHeight, paddingBottom: Math.max(insets.bottom, 24) + 40 }]} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag" automaticallyAdjustKeyboardInsets showsVerticalScrollIndicator={false}>
          <react_native_1.Text style={s.connectTitle}>Connect T</react_native_1.Text>
          <react_native_1.View style={s.langRow}>
            {LanguageContext_1.languageOptions.map(function (opt) { return (<react_native_1.TouchableOpacity key={opt.code} style={[s.langPill, language === opt.code && s.langPillActive]} onPress={function () { return setLanguage(opt.code); }} activeOpacity={0.8}>
                <react_native_1.Text style={[s.langPillText, language === opt.code && s.langPillTextActive]}>
                  {opt.nativeLabel}
                </react_native_1.Text>
              </react_native_1.TouchableOpacity>); })}
          </react_native_1.View>


          <react_native_1.View style={s.tabBar}>
            <react_native_1.TouchableOpacity style={[s.tab, activeTab === "register" && s.tabActive]} onPress={function () { return switchTab("register"); }} activeOpacity={0.8}>
              <vector_icons_1.Feather name="user-plus" size={14} color={activeTab === "register" ? "#EA580C" : "#94A3B8"}/>
              <react_native_1.Text style={[s.tabText, activeTab === "register" && s.tabTextActive]}>{t("registerBtn")}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
            <react_native_1.TouchableOpacity style={[s.tab, activeTab === "login" && s.tabActive]} onPress={function () { return switchTab("login"); }} activeOpacity={0.8}>
              <vector_icons_1.Feather name="log-in" size={14} color={activeTab === "login" ? "#EA580C" : "#94A3B8"}/>
              <react_native_1.Text style={[s.tabText, activeTab === "login" && s.tabTextActive]}>{t("loginBtn")}</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>

          {activeTab === "register" && regStep === "form" && renderRegisterForm()}
          {activeTab === "register" && regStep === "otp" && renderOtpInput()}
          {activeTab === "register" && regStep === "notifications" && renderNotifications()}
          {activeTab === "register" && regStep === "success" && renderSuccess()}

          {activeTab === "login" && loginStep === "form" && renderLoginForm()}
          {activeTab === "login" && loginStep === "otp" && renderOtpInput()}

          <react_native_1.TouchableOpacity style={s.backPill} onPress={function () { return expo_router_1.router.replace("/portal-select"); }} activeOpacity={0.8}>
            <vector_icons_1.Feather name="arrow-left" size={14} color="#EA580C"/>
            <react_native_1.Text style={s.backPillText}>Back</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.ScrollView>
      </react_native_1.KeyboardAvoidingView>

      <react_native_1.Modal visible={wardModal} transparent animationType="slide" onRequestClose={function () { return setWardModal(false); }}>
        <react_native_1.View style={s.modalOverlay}>
          <react_native_1.View style={s.modalSheet}>
            <react_native_1.View style={s.modalHeader}>
              <react_native_1.Text style={s.modalTitle}>{t("selectWard")}</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={function () { return setWardModal(false); }}>
                <vector_icons_1.Feather name="x" size={20} color="#64748B"/>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
            <react_native_1.ScrollView showsVerticalScrollIndicator={false}>
              {mumbaiServices_1.ambernathWards.map(function (ward) { return (<react_native_1.TouchableOpacity key={ward} style={[s.wardRow, regWard === ward && s.wardRowActive]} onPress={function () {
                setRegWard(ward);
                setWardModal(false);
            }} activeOpacity={0.8}>
                  <vector_icons_1.Feather name="map-pin" size={14} color={regWard === ward ? "#EA580C" : "#94A3B8"}/>
                  <react_native_1.Text style={[s.wardRowText, regWard === ward && { color: "#EA580C", fontWeight: "700" }]}>
                    {ward}
                  </react_native_1.Text>
                  {regWard === ward && <vector_icons_1.Feather name="check" size={14} color="#EA580C"/>}
                </react_native_1.TouchableOpacity>); })}
            </react_native_1.ScrollView>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.Modal>
    </expo_linear_gradient_1.LinearGradient>);
}
var s = react_native_1.StyleSheet.create({
    root: { flex: 1 },
    scroll: { padding: 20, alignItems: "center", flexGrow: 1 },
    langRow: { flexDirection: "row", gap: 8, marginBottom: 20, alignSelf: "center" },
    langPill: {
        paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
        backgroundColor: "rgba(255,255,255,0.12)", borderWidth: 1,
        borderColor: "rgba(255,255,255,0.2)",
    },
    langPillActive: { backgroundColor: "rgba(255,255,255,0.25)", borderColor: "rgba(255,255,255,0.5)" },
    langPillText: { fontSize: 12, color: "rgba(255,255,255,0.55)", fontFamily: "Inter_600SemiBold", fontWeight: "700" },
    langPillTextActive: { color: "white" },
    connectTitle: { fontSize: 28, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.5, textAlign: "center", marginBottom: 16 },
    backPill: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "white", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, borderWidth: 1.5, borderColor: "#FED7AA", alignSelf: "center", marginTop: 20, marginBottom: 8 },
    backPillText: { fontSize: 13, color: "#EA580C", fontFamily: "Inter_600SemiBold", fontWeight: "600" },
    tabBar: {
        flexDirection: "row", backgroundColor: "rgba(255,255,255,0.12)",
        borderRadius: 16, padding: 4, marginBottom: 16, width: "100%",
        borderWidth: 1, borderColor: "rgba(255,255,255,0.15)",
    },
    tab: {
        flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center",
        paddingVertical: 12, borderRadius: 12, gap: 6,
    },
    tabActive: { backgroundColor: "white" },
    tabText: { fontSize: 14, fontWeight: "700", color: "rgba(255,255,255,0.6)", fontFamily: "Inter_700Bold" },
    tabTextActive: { color: "#EA580C" },
    formCard: {
        width: "100%", backgroundColor: "white", borderRadius: 20,
        padding: 20, gap: 4,
        shadowColor: "#000", shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15, shadowRadius: 24, elevation: 8,
    },
    fieldLabel: {
        fontSize: 12, fontWeight: "700", color: "#475569",
        fontFamily: "Inter_600SemiBold", marginTop: 10, marginBottom: 4, paddingLeft: 2,
    },
    required: { color: "#DC2626" },
    optional: { color: "#94A3B8", fontWeight: "400" },
    input: {
        backgroundColor: "#F8FAFC", borderRadius: 12, paddingHorizontal: 14,
        paddingVertical: 12, fontSize: 14, color: "#0F172A",
        fontFamily: "Inter_400Regular", borderWidth: 1.5, borderColor: "#E2E8F0",
        outlineWidth: 0,
    },
    phoneRow: { flexDirection: "row", gap: 8 },
    countryCode: {
        backgroundColor: "#F1F5F9", borderRadius: 12, paddingHorizontal: 12,
        justifyContent: "center", borderWidth: 1.5, borderColor: "#E2E8F0",
    },
    countryCodeText: { fontSize: 13, fontWeight: "600", color: "#475569", fontFamily: "Inter_600SemiBold" },
    phoneInput: { flex: 1 },
    pickerInput: {
        flexDirection: "row", alignItems: "center", gap: 8,
    },
    pickerText: { flex: 1, fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular" },
    helperText: {
        fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular",
        paddingLeft: 2, marginTop: 2,
    },
    errorText: {
        fontSize: 12, color: "#DC2626", fontFamily: "Inter_400Regular",
        textAlign: "center", marginTop: 8,
    },
    primaryBtn: { marginTop: 16, borderRadius: 14, overflow: "hidden", width: "100%" },
    primaryBtnGrad: {
        flexDirection: "row", alignItems: "center", justifyContent: "center",
        paddingVertical: 14, gap: 8,
    },
    primaryBtnText: { fontSize: 15, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    otpSection: {
        width: "100%", backgroundColor: "white", borderRadius: 20,
        padding: 24, alignItems: "center",
        shadowColor: "#000", shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15, shadowRadius: 24, elevation: 8,
    },
    otpIconWrap: {
        width: 64, height: 64, borderRadius: 32, backgroundColor: "#FFF7ED",
        alignItems: "center", justifyContent: "center", marginBottom: 12,
    },
    otpTitle: {
        fontSize: 18, fontWeight: "800", color: "#0F172A",
        fontFamily: "Inter_700Bold", marginBottom: 6,
    },
    otpSub: {
        fontSize: 13, color: "#64748B", fontFamily: "Inter_400Regular",
        textAlign: "center", marginBottom: 20,
    },
    otpRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
    otpBox: {
        width: 52, height: 56, borderRadius: 14, borderWidth: 2,
        borderColor: "#E2E8F0", backgroundColor: "#F8FAFC",
        fontSize: 22, fontWeight: "800", color: "#0F172A",
        fontFamily: "Inter_700Bold",
        textAlign: "center",
        textAlignVertical: "center",
        outlineWidth: 0,
    },
    otpBoxFilled: { borderColor: "#EA580C", backgroundColor: "#FFF7ED" },
    otpHint: {
        fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular",
        marginBottom: 4,
    },
    notifSection: { width: "100%", gap: 12, marginTop: 16, marginBottom: 8 },
    checkRow: {
        flexDirection: "row", alignItems: "center", gap: 12,
        paddingVertical: 14, paddingHorizontal: 16,
        backgroundColor: "#F8FAFC", borderRadius: 14,
        borderWidth: 1.5, borderColor: "#E2E8F0",
    },
    checkbox: {
        width: 24, height: 24, borderRadius: 6, borderWidth: 2,
        borderColor: "#CBD5E1", alignItems: "center", justifyContent: "center",
    },
    checkboxActive: { backgroundColor: "#EA580C", borderColor: "#EA580C" },
    checkLabel: { fontSize: 14, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_600SemiBold" },
    checkSub: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 1 },
    successCard: {
        width: "100%", backgroundColor: "white", borderRadius: 20,
        padding: 32, alignItems: "center",
        shadowColor: "#000", shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15, shadowRadius: 24, elevation: 8,
    },
    successIconWrap: {
        width: 80, height: 80, borderRadius: 40, backgroundColor: "#D1FAE5",
        alignItems: "center", justifyContent: "center", marginBottom: 16,
    },
    successTitle: {
        fontSize: 20, fontWeight: "800", color: "#059669",
        fontFamily: "Inter_700Bold", marginBottom: 8,
    },
    successSub: {
        fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular",
        textAlign: "center",
    },
    modalOverlay: {
        flex: 1, backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "flex-end",
    },
    modalSheet: {
        backgroundColor: "white", borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: 24, maxHeight: "70%",
    },
    modalHeader: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        marginBottom: 16,
    },
    modalTitle: {
        fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold",
    },
    wardRow: {
        flexDirection: "row", alignItems: "center", gap: 10,
        paddingVertical: 14, paddingHorizontal: 12, borderRadius: 12,
        marginBottom: 4,
    },
    wardRowActive: { backgroundColor: "#FFF7ED" },
    wardRowText: {
        flex: 1, fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular",
    },
});
var SW = react_native_1.Dimensions.get("window").width;
var ld = react_native_1.StyleSheet.create({
    blob: { position: "absolute", borderRadius: 9999, backgroundColor: "rgba(255,255,255,0.20)" },
    ring: { position: "absolute", borderRadius: 9999, borderColor: "rgba(255,255,255,0.20)", borderWidth: 1.5 },
    b1: { width: SW * 0.50, height: SW * 0.50, top: -SW * 0.16, right: -SW * 0.14 },
    b2: { width: SW * 0.28, height: SW * 0.28, bottom: SW * 0.12, left: -SW * 0.08 },
    r1: { width: SW * 0.88, height: SW * 0.88, top: -SW * 0.32, right: -SW * 0.32 },
    r2: { width: SW * 0.62, height: SW * 0.62, top: -SW * 0.10, right: -SW * 0.10 },
    r3: { width: SW * 0.72, height: SW * 0.72, bottom: SW * 0.05, left: -SW * 0.26 },
});
