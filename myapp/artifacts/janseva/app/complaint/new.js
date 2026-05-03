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
exports.default = NewComplaintScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var ImagePicker = require("expo-image-picker");
var Haptics = require("expo-haptics");
var ComplaintContext_1 = require("@/context/ComplaintContext");
var AuthContext_1 = require("@/context/AuthContext");
var LanguageContext_1 = require("@/context/LanguageContext");
var categoryLabelKeys = {
    roads: "roads", water: "waterSupply", electricity: "electricity", garbage: "garbage",
    drainage: "drainage", streetlight: "streetLight", encroachment: "encroachment", other: "other",
};
var categories = [
    { id: "roads", icon: "truck", color: "#92400E", bg: "#FEF3C7" },
    { id: "water", icon: "droplet", color: "#0369A1", bg: "#BAE6FD" },
    { id: "electricity", icon: "zap", color: "#D97706", bg: "#FEF3C7" },
    { id: "garbage", icon: "trash-2", color: "#059669", bg: "#D1FAE5" },
    { id: "drainage", icon: "git-merge", color: "#0EA5E9", bg: "#FFF7ED" },
    { id: "streetlight", icon: "sun", color: "#7C3AED", bg: "#EDE9FE" },
    { id: "encroachment", icon: "alert-triangle", color: "#DC2626", bg: "#FEE2E2" },
    { id: "other", icon: "more-horizontal", color: "#475569", bg: "#F1F5F9" },
];
function NewComplaintScreen() {
    var _this = this;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var router = (0, expo_router_1.useRouter)();
    var addComplaint = (0, ComplaintContext_1.useComplaints)().addComplaint;
    var user = (0, AuthContext_1.useAuth)().user;
    var t = (0, LanguageContext_1.useLanguage)().t;
    var _a = (0, react_1.useState)(), photoUri = _a[0], setPhotoUri = _a[1];
    var _b = (0, react_1.useState)(null), selectedCategory = _b[0], setSelectedCategory = _b[1];
    var _c = (0, react_1.useState)(""), title = _c[0], setTitle = _c[1];
    var _d = (0, react_1.useState)(""), description = _d[0], setDescription = _d[1];
    var _e = (0, react_1.useState)("Near Old Ambernath, Ambernath"), location = _e[0], setLocation = _e[1];
    var _f = (0, react_1.useState)(false), submitting = _f[0], setSubmitting = _f[1];
    var handleCamera = function () { return __awaiter(_this, void 0, void 0, function () {
        var result_1, status, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (react_native_1.Platform.OS !== "web") {
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    }
                    if (!(react_native_1.Platform.OS === "web")) return [3 /*break*/, 2];
                    return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                            mediaTypes: ["images"],
                            quality: 0.8,
                        })];
                case 1:
                    result_1 = _a.sent();
                    if (!result_1.canceled && result_1.assets[0]) {
                        setPhotoUri(result_1.assets[0].uri);
                    }
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, ImagePicker.requestCameraPermissionsAsync()];
                case 3:
                    status = (_a.sent()).status;
                    if (status !== "granted") {
                        react_native_1.Alert.alert(t("permissionNeeded"), t("cameraPermission"));
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, ImagePicker.launchCameraAsync({
                            mediaTypes: ["images"],
                            quality: 0.8,
                        })];
                case 4:
                    result = _a.sent();
                    if (!result.canceled && result.assets[0]) {
                        setPhotoUri(result.assets[0].uri);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleGallery = function () { return __awaiter(_this, void 0, void 0, function () {
        var result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ["images"],
                        quality: 0.8,
                    })];
                case 1:
                    result = _a.sent();
                    if (!result.canceled && result.assets[0]) {
                        setPhotoUri(result.assets[0].uri);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    var handleSubmit = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            if (!selectedCategory) {
                react_native_1.Alert.alert(t("selectCategoryAlert"), t("selectCategoryMsg"));
                return [2 /*return*/];
            }
            if (!title.trim()) {
                react_native_1.Alert.alert(t("addTitleAlert"), t("addTitleMsg"));
                return [2 /*return*/];
            }
            if (!description.trim()) {
                react_native_1.Alert.alert(t("addDescAlert"), t("addDescMsg"));
                return [2 /*return*/];
            }
            setSubmitting(true);
            if (react_native_1.Platform.OS !== "web") {
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            }
            setTimeout(function () {
                var complaint = addComplaint({
                    title: title.trim(),
                    description: description.trim(),
                    category: selectedCategory,
                    photoUri: photoUri,
                    location: location,
                    ward: (user === null || user === void 0 ? void 0 : user.ward) || "Ward 1 — Shivaji Chowk",
                    userName: user === null || user === void 0 ? void 0 : user.name,
                    userMobile: user === null || user === void 0 ? void 0 : user.mobile,
                    userAddress: user === null || user === void 0 ? void 0 : user.address,
                    userAge: user === null || user === void 0 ? void 0 : user.age,
                    userEmail: user === null || user === void 0 ? void 0 : user.email,
                });
                setSubmitting(false);
                router.replace({ pathname: "/complaint/[id]", params: { id: complaint.id, fresh: "1" } });
            }, 800);
            return [2 /*return*/];
        });
    }); };
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={styles.backBtn} activeOpacity={0.8}>
          <vector_icons_1.Feather name="chevron-left" size={20} color="white"/>
          <react_native_1.Text style={styles.backBtnText}>Back</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.View style={styles.headerCenter}>
            <react_native_1.Text style={styles.headerTitle}>{t("reportProblemTitle")}</react_native_1.Text>
            <react_native_1.Text style={styles.headerSub}>{t("yourComplaintGoes")}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 8) + 100 }]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* PHOTO */}
        <react_native_1.View style={styles.section}>
          <react_native_1.Text style={styles.sectionLabel}>{t("photoOfProblem")}</react_native_1.Text>
          {photoUri ? (<react_native_1.View style={styles.photoContainer}>
              <react_native_1.Image source={{ uri: photoUri }} style={styles.photo}/>
              <react_native_1.TouchableOpacity style={styles.retakeBtn} onPress={handleCamera} activeOpacity={0.8}>
                <vector_icons_1.Feather name="refresh-cw" size={14} color="white"/>
                <react_native_1.Text style={styles.retakeBtnText}>{t("retake")}</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>) : (<react_native_1.View style={styles.photoButtons}>
              <react_native_1.TouchableOpacity style={styles.cameraBtn} onPress={handleCamera} activeOpacity={0.85}>
                <expo_linear_gradient_1.LinearGradient colors={["#EA580C", "#FB923C"]} style={styles.cameraBtnGrad}>
                  <vector_icons_1.Feather name="camera" size={24} color="white"/>
                  <react_native_1.Text style={styles.cameraBtnText}>{t("takePhoto")}</react_native_1.Text>
                  <react_native_1.Text style={styles.cameraBtnSub}>{t("clickPhotoOfProblem")}</react_native_1.Text>
                </expo_linear_gradient_1.LinearGradient>
              </react_native_1.TouchableOpacity>
              <react_native_1.TouchableOpacity style={styles.galleryBtn} onPress={handleGallery} activeOpacity={0.85}>
                <vector_icons_1.Feather name="image" size={18} color="#EA580C"/>
                <react_native_1.Text style={styles.galleryBtnText}>{t("chooseFromGallery")}</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>)}
        </react_native_1.View>

        {/* CATEGORY */}
        <react_native_1.View style={styles.section}>
          <react_native_1.Text style={styles.sectionLabel}>{t("complaintCategory")}</react_native_1.Text>
          <react_native_1.View style={styles.categoryGrid}>
            {categories.map(function (cat) { return (<react_native_1.TouchableOpacity key={cat.id} style={[
                styles.categoryItem,
                selectedCategory === cat.id && styles.categoryItemSelected,
            ]} onPress={function () { return setSelectedCategory(cat.id); }} activeOpacity={0.8}>
                <react_native_1.View style={[
                styles.catIconWrap,
                { backgroundColor: selectedCategory === cat.id ? cat.color : cat.bg },
            ]}>
                  <vector_icons_1.Feather name={cat.icon} size={18} color={selectedCategory === cat.id ? "white" : cat.color}/>
                </react_native_1.View>
                <react_native_1.Text style={[
                styles.catLabel,
                selectedCategory === cat.id && { color: cat.color },
            ]}>
                  {t(categoryLabelKeys[cat.id])}
                </react_native_1.Text>
                {selectedCategory === cat.id && (<react_native_1.View style={[styles.catCheck, { backgroundColor: cat.color }]}>
                    <vector_icons_1.Feather name="check" size={8} color="white"/>
                  </react_native_1.View>)}
              </react_native_1.TouchableOpacity>); })}
          </react_native_1.View>
        </react_native_1.View>

        {/* TITLE */}
        <react_native_1.View style={styles.section}>
          <react_native_1.Text style={styles.sectionLabel}>{t("complaintTitle")}</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder={t("titlePlaceholder")} placeholderTextColor="#CBD5E1" maxLength={80}/>
        </react_native_1.View>

        {/* DESCRIPTION */}
        <react_native_1.View style={styles.section}>
          <react_native_1.Text style={styles.sectionLabel}>{t("description")}</react_native_1.Text>
          <react_native_1.TextInput style={[styles.input, styles.textarea]} value={description} onChangeText={setDescription} placeholder={t("descriptionPlaceholder")} placeholderTextColor="#CBD5E1" multiline numberOfLines={4} textAlignVertical="top" maxLength={500}/>
          <react_native_1.Text style={styles.charCount}>{description.length}/500</react_native_1.Text>
        </react_native_1.View>

        {/* LOCATION */}
        <react_native_1.View style={styles.section}>
          <react_native_1.Text style={styles.sectionLabel}>{t("location")}</react_native_1.Text>
          <react_native_1.View style={styles.locationRow}>
            <react_native_1.View style={styles.locationIcon}>
              <vector_icons_1.Feather name="map-pin" size={16} color="#EA580C"/>
            </react_native_1.View>
            <react_native_1.TextInput style={[styles.input, styles.locationInput]} value={location} onChangeText={setLocation} placeholder={t("enterExactLocation")} placeholderTextColor="#CBD5E1"/>
          </react_native_1.View>
          <react_native_1.View style={styles.wardRow}>
            <vector_icons_1.Feather name="home" size={12} color="#94A3B8"/>
            <react_native_1.Text style={styles.wardText}>Ward 1 — Shivaji Chowk ({t("autoDetected")})</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>

        {/* NOTICE */}
        <react_native_1.View style={styles.noticeCard}>
          <vector_icons_1.Feather name="info" size={14} color="#EA580C"/>
          <react_native_1.Text style={styles.noticeText}>
            {t("complaintNotice")}
          </react_native_1.Text>
        </react_native_1.View>
      </react_native_1.ScrollView>

      {/* SUBMIT */}
      <react_native_1.View style={[styles.submitBar, { paddingBottom: Math.max(insets.bottom, 8) + 16 }]}>
        <react_native_1.TouchableOpacity style={[styles.submitBtn, submitting && { opacity: 0.7 }]} onPress={handleSubmit} disabled={submitting} activeOpacity={0.85}>
          <expo_linear_gradient_1.LinearGradient colors={["#059669", "#10B981"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.submitBtnGrad}>
            {submitting ? (<react_native_1.ActivityIndicator color="white"/>) : (<>
                <vector_icons_1.Feather name="send" size={18} color="white"/>
                <react_native_1.Text style={styles.submitBtnText}>{t("submitComplaint")}</react_native_1.Text>
              </>)}
          </expo_linear_gradient_1.LinearGradient>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 10,
        alignSelf: "flex-start",
        paddingVertical: 4,
        paddingRight: 8,
        paddingLeft: 2,
    },
    backBtnText: {
        color: "rgba(255,255,255,0.92)",
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Inter_600SemiBold",
    },
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 18, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerRow: { flexDirection: "row", alignItems: "center", gap: 12 },
    headerCenter: { flex: 1 },
    headerTitle: { fontSize: 20, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular", marginTop: 2 },
    scroll: { flex: 1 },
    content: { padding: 16 },
    section: { marginBottom: 20 },
    sectionLabel: {
        fontSize: 10,
        fontWeight: "700",
        color: "#94A3B8",
        letterSpacing: 1.2,
        fontFamily: "Inter_600SemiBold",
        marginBottom: 10,
    },
    photoButtons: { gap: 10 },
    cameraBtn: {
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
    },
    cameraBtnGrad: {
        alignItems: "center",
        paddingVertical: 24,
        gap: 8,
    },
    cameraBtnText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    cameraBtnSub: { fontSize: 12, color: "rgba(255,255,255,0.7)", fontFamily: "Inter_400Regular" },
    galleryBtn: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: "#FFF7ED",
        borderWidth: 1,
        borderColor: "#FFEDD5",
    },
    galleryBtnText: { fontSize: 13, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    photoContainer: { borderRadius: 16, overflow: "hidden", position: "relative" },
    photo: { width: "100%", height: 200, borderRadius: 16 },
    retakeBtn: {
        position: "absolute",
        bottom: 10,
        right: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        backgroundColor: "rgba(0,0,0,0.6)",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    retakeBtnText: { fontSize: 12, color: "white", fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    categoryGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
    categoryItem: {
        width: "22%",
        alignItems: "center",
        gap: 6,
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#E2E8F0",
        backgroundColor: "white",
        position: "relative",
    },
    categoryItemSelected: {
        borderColor: "#EA580C",
        backgroundColor: "#FFF7ED",
    },
    catIconWrap: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    catLabel: {
        fontSize: 9,
        fontWeight: "700",
        color: "#64748B",
        textAlign: "center",
        fontFamily: "Inter_600SemiBold",
    },
    catCheck: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        backgroundColor: "white",
        borderRadius: 14,
        borderWidth: 1.5,
        borderColor: "#E2E8F0",
        paddingHorizontal: 14,
        paddingVertical: 13,
        fontSize: 14,
        color: "#0F172A",
        fontFamily: "Inter_400Regular",
        outlineWidth: 0,
    },
    textarea: {
        height: 110,
        paddingTop: 13,
    },
    charCount: { fontSize: 10, color: "#CBD5E1", textAlign: "right", marginTop: 4, fontFamily: "Inter_400Regular" },
    locationRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    locationIcon: {
        width: 44,
        height: 44,
        borderRadius: 12,
        backgroundColor: "#FFF7ED",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    locationInput: { flex: 1 },
    wardRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        marginTop: 8,
        paddingLeft: 52,
    },
    wardText: { fontSize: 11, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    noticeCard: {
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#FFF7ED",
        borderRadius: 14,
        padding: 14,
        borderWidth: 1,
        borderColor: "#FFEDD5",
        alignItems: "flex-start",
    },
    noticeText: { flex: 1, fontSize: 12, color: "#EA580C", fontFamily: "Inter_400Regular", lineHeight: 18 },
    submitBar: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingTop: 12,
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    submitBtn: {
        borderRadius: 16,
        overflow: "hidden",
        shadowColor: "#B45309",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    },
    submitBtnGrad: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        paddingVertical: 16,
    },
    submitBtnText: { fontSize: 16, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
