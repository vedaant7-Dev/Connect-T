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
exports.default = NewAlertScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var expo_router_1 = require("expo-router");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Haptics = require("expo-haptics");
var ImagePicker = require("expo-image-picker");
var AlertContext_1 = require("@/context/AlertContext");
var AuthContext_1 = require("@/context/AuthContext");
var MAX_VIDEO_MS = 120000;
var ALERT_ACTIVE_MS = 12 * 60 * 60 * 1000;
var categories = ["Civic", "Water", "Electricity", "Road", "Health", "Event"];
var audiences = ["Ward residents", "All citizens"];
function DropdownSelect(_a) {
    var label = _a.label, value = _a.value, options = _a.options, open = _a.open, onToggle = _a.onToggle, onSelect = _a.onSelect;
    return (<react_native_1.View style={styles.dropdownBlock}>
      <react_native_1.Text style={styles.label}>{label}</react_native_1.Text>
      <react_native_1.TouchableOpacity style={[styles.dropdownBtn, open && styles.dropdownBtnOpen]} onPress={onToggle} activeOpacity={0.85}>
        <react_native_1.Text style={styles.dropdownValue}>{value}</react_native_1.Text>
        <vector_icons_1.Feather name={open ? "chevron-up" : "chevron-down"} size={18} color="#64748B"/>
      </react_native_1.TouchableOpacity>
      {open && (<react_native_1.View style={styles.dropdownMenu}>
          {options.map(function (item) {
                var active = value === item;
                return (<react_native_1.TouchableOpacity key={item} style={[styles.dropdownOption, active && styles.dropdownOptionActive]} onPress={function () { return onSelect(item); }} activeOpacity={0.85}>
                <react_native_1.Text style={[styles.dropdownOptionText, active && styles.dropdownOptionTextActive]}>{item}</react_native_1.Text>
                {active && <vector_icons_1.Feather name="check" size={15} color="#EA580C"/>}
              </react_native_1.TouchableOpacity>);
            })}
        </react_native_1.View>)}
    </react_native_1.View>);
}
function showMessage(title, message) {
    if (react_native_1.Platform.OS === "web") {
        window.alert("".concat(title, "\n").concat(message));
    }
    else {
        react_native_1.Alert.alert(title, message);
    }
}
function formatValidUntil(value) {
    var date = new Date(value);
    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
    });
}
function NewAlertScreen() {
    var _this = this;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 54 : insets.top;
    var addAlert = (0, AlertContext_1.useAlerts)().addAlert;
    var user = (0, AuthContext_1.useAuth)().user;
    var _a = (0, react_1.useState)("alert"), type = _a[0], setType = _a[1];
    var _b = (0, react_1.useState)("important"), priority = _b[0], setPriority = _b[1];
    var _c = (0, react_1.useState)("Civic"), category = _c[0], setCategory = _c[1];
    var _d = (0, react_1.useState)("Ward residents"), targetAudience = _d[0], setTargetAudience = _d[1];
    var _e = (0, react_1.useState)(""), title = _e[0], setTitle = _e[1];
    var _f = (0, react_1.useState)(""), body = _f[0], setBody = _f[1];
    var _g = (0, react_1.useState)((user === null || user === void 0 ? void 0 : user.ward) || ""), location = _g[0], setLocation = _g[1];
    var _h = (0, react_1.useState)(""), contact = _h[0], setContact = _h[1];
    var _j = (0, react_1.useState)(null), media = _j[0], setMedia = _j[1];
    var _k = (0, react_1.useState)(false), categoryOpen = _k[0], setCategoryOpen = _k[1];
    var _l = (0, react_1.useState)(false), audienceOpen = _l[0], setAudienceOpen = _l[1];
    var expiresAt = (0, react_1.useState)(function () { return new Date(Date.now() + ALERT_ACTIVE_MS).toISOString(); })[0];
    var validUntilLabel = formatValidUntil(expiresAt);
    var canSubmit = title.trim().length > 0 && body.trim().length > 0;
    var pickMedia = function () { return __awaiter(_this, void 0, void 0, function () {
        var permission, result, asset, selectedType;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(react_native_1.Platform.OS !== "web")) return [3 /*break*/, 2];
                    return [4 /*yield*/, ImagePicker.requestMediaLibraryPermissionsAsync()];
                case 1:
                    permission = _b.sent();
                    if (!permission.granted) {
                        showMessage("Permission required", "Allow photo library access to attach a photo or video.");
                        return [2 /*return*/];
                    }
                    _b.label = 2;
                case 2: return [4 /*yield*/, ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ImagePicker.MediaTypeOptions.All,
                        allowsEditing: false,
                        quality: 0.85,
                        videoMaxDuration: 120,
                    })];
                case 3:
                    result = _b.sent();
                    if (result.canceled || !((_a = result.assets) === null || _a === void 0 ? void 0 : _a[0]))
                        return [2 /*return*/];
                    asset = result.assets[0];
                    selectedType = asset.type === "video" ? "video" : "image";
                    if (selectedType === "video" && typeof asset.duration === "number" && asset.duration > MAX_VIDEO_MS) {
                        showMessage("Video too long", "Please select a video of 2 minutes or less.");
                        return [2 /*return*/];
                    }
                    setMedia({
                        uri: asset.uri,
                        type: selectedType,
                        fileName: asset.fileName || undefined,
                        mimeType: asset.mimeType || undefined,
                        duration: asset.duration || undefined,
                    });
                    return [2 /*return*/];
            }
        });
    }); };
    var submit = function () {
        if (!canSubmit)
            return;
        if (react_native_1.Platform.OS !== "web")
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        addAlert({
            title: title.trim(),
            body: contact.trim() ? "".concat(body.trim(), "\n\nContact: ").concat(contact.trim()) : body.trim(),
            type: type,
            priority: priority,
            category: category,
            targetAudience: targetAudience,
            location: location.trim(),
            validUntil: validUntilLabel,
            expiresAt: expiresAt,
            media: media,
        }, (user === null || user === void 0 ? void 0 : user.name) || "Nagarsevak", user === null || user === void 0 ? void 0 : user.id, targetAudience === "Ward residents" ? user === null || user === void 0 ? void 0 : user.ward : undefined);
        expo_router_1.router.back();
    };
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#166534", "#16A34A", "#22C55E"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 10 }]}>
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.TouchableOpacity onPress={function () { return expo_router_1.router.back(); }} style={styles.backBtn} activeOpacity={0.85}>
            <vector_icons_1.Feather name="chevron-left" size={20} color="white"/>
            <react_native_1.Text style={styles.backText}>Back</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.View style={styles.headerPill}>
            <vector_icons_1.Feather name="radio" size={12} color="#DCFCE7"/>
            <react_native_1.Text style={styles.headerPillText}>Broadcast</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.Text style={styles.headerTitle}>Post Alert / News</react_native_1.Text>
        <react_native_1.Text style={styles.headerSub}>Create a detailed public update with photo or video attachment.</react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={styles.scroll} contentContainerStyle={[styles.content, { paddingBottom: Math.max(insets.bottom, 12) + 24 }]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        <react_native_1.View style={styles.card}>
          <react_native_1.Text style={styles.sectionTitle}>Type</react_native_1.Text>
          <react_native_1.View style={styles.segmentRow}>
            {["alert", "news"].map(function (item) {
            var active = type === item;
            var color = item === "alert" ? "#DC2626" : "#EA580C";
            return (<react_native_1.TouchableOpacity key={item} onPress={function () { return setType(item); }} style={[styles.segmentBtn, active && { borderColor: color, backgroundColor: color + "12" }]} activeOpacity={0.85}>
                  <vector_icons_1.Feather name={item === "alert" ? "alert-triangle" : "radio"} size={16} color={active ? color : "#94A3B8"}/>
                  <react_native_1.Text style={[styles.segmentText, active && { color: color }]}>{item === "alert" ? "Alert" : "News"}</react_native_1.Text>
                </react_native_1.TouchableOpacity>);
        })}
          </react_native_1.View>

          <react_native_1.Text style={styles.label}>Priority</react_native_1.Text>
          <react_native_1.View style={styles.chipRow}>
            {["normal", "important", "urgent"].map(function (item) { return (<react_native_1.TouchableOpacity key={item} onPress={function () { return setPriority(item); }} style={[styles.chip, priority === item && styles.chipActive]} activeOpacity={0.85}>
                <react_native_1.Text style={[styles.chipText, priority === item && styles.chipTextActive]}>{item}</react_native_1.Text>
              </react_native_1.TouchableOpacity>); })}
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.View style={styles.card}>
          <react_native_1.Text style={styles.sectionTitle}>Details</react_native_1.Text>
          <react_native_1.Text style={styles.label}>Title</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="e.g. Water supply cut tomorrow" placeholderTextColor="#CBD5E1" maxLength={100}/>
          <react_native_1.Text style={styles.label}>Detailed message</react_native_1.Text>
          <react_native_1.TextInput style={[styles.input, styles.textArea]} value={body} onChangeText={setBody} placeholder="Explain what happened, affected area, timing, and citizen instructions..." placeholderTextColor="#CBD5E1" multiline textAlignVertical="top" maxLength={900}/>
          <react_native_1.View style={styles.twoCol}>
            <react_native_1.View style={styles.half}>
              <react_native_1.Text style={styles.label}>Area / Ward</react_native_1.Text>
              <react_native_1.TextInput style={styles.input} value={location} onChangeText={setLocation} placeholder="Ward or area" placeholderTextColor="#CBD5E1" maxLength={80}/>
            </react_native_1.View>
            <react_native_1.View style={styles.half}>
              <react_native_1.Text style={styles.label}>Valid until</react_native_1.Text>
              <react_native_1.View style={styles.readOnlyBox}>
                <vector_icons_1.Feather name="clock" size={14} color="#EA580C"/>
                <react_native_1.View style={{ flex: 1 }}>
                  <react_native_1.Text style={styles.readOnlyValue}>{validUntilLabel}</react_native_1.Text>
                  <react_native_1.Text style={styles.readOnlyHint}>Post valid for 12 hours</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.Text style={styles.label}>Helpline / contact optional</react_native_1.Text>
          <react_native_1.TextInput style={styles.input} value={contact} onChangeText={setContact} placeholder="Phone number or office contact" placeholderTextColor="#CBD5E1" keyboardType="phone-pad" maxLength={60}/>
        </react_native_1.View>

        <react_native_1.View style={styles.card}>
          <react_native_1.Text style={styles.sectionTitle}>Category & audience</react_native_1.Text>
          <DropdownSelect label="Category" value={category} options={categories} open={categoryOpen} onToggle={function () {
            setCategoryOpen(function (prev) { return !prev; });
            setAudienceOpen(false);
        }} onSelect={function (item) {
            setCategory(item);
            setCategoryOpen(false);
        }}/>
          <DropdownSelect label="Audience" value={targetAudience} options={audiences} open={audienceOpen} onToggle={function () {
            setAudienceOpen(function (prev) { return !prev; });
            setCategoryOpen(false);
        }} onSelect={function (item) {
            setTargetAudience(item);
            setAudienceOpen(false);
        }}/>
        </react_native_1.View>

        <react_native_1.View style={styles.card}>
          <react_native_1.Text style={styles.sectionTitle}>Photo / Video</react_native_1.Text>
          <react_native_1.Text style={styles.helperText}>Attach one photo or one video. Videos must be 2 minutes or less.</react_native_1.Text>
          {media ? (<react_native_1.View style={styles.mediaPreview}>
              {media.type === "image" ? (<react_native_1.Image source={{ uri: media.uri }} style={styles.mediaImage}/>) : (<react_native_1.View style={styles.videoPreview}>
                  <vector_icons_1.Feather name="play-circle" size={42} color="#EA580C"/>
                  <react_native_1.Text style={styles.videoPreviewText}>Video selected · max 2 minutes</react_native_1.Text>
                </react_native_1.View>)}
              <react_native_1.TouchableOpacity style={styles.removeMediaBtn} onPress={function () { return setMedia(null); }} activeOpacity={0.85}>
                <vector_icons_1.Feather name="x" size={14} color="#DC2626"/>
                <react_native_1.Text style={styles.removeMediaText}>Remove</react_native_1.Text>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>) : (<react_native_1.TouchableOpacity style={styles.uploadBox} onPress={pickMedia} activeOpacity={0.85}>
              <react_native_1.View style={styles.uploadIcon}>
                <vector_icons_1.Feather name="upload-cloud" size={24} color="#EA580C"/>
              </react_native_1.View>
              <react_native_1.Text style={styles.uploadTitle}>Add photo or video</react_native_1.Text>
              <react_native_1.Text style={styles.uploadSub}>Photo JPG/PNG or video up to 2 minutes</react_native_1.Text>
            </react_native_1.TouchableOpacity>)}
        </react_native_1.View>

        <react_native_1.View style={styles.actionRow}>
          <react_native_1.TouchableOpacity style={styles.cancelBtn} onPress={function () { return expo_router_1.router.back(); }} activeOpacity={0.85}>
            <react_native_1.Text style={styles.cancelText}>Cancel</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={[styles.submitBtn, !canSubmit && { opacity: 0.45 }]} onPress={submit} disabled={!canSubmit} activeOpacity={0.9}>
            <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C"]} style={styles.submitGrad}>
              <vector_icons_1.Feather name="send" size={16} color="white"/>
              <react_native_1.Text style={styles.submitText}>Broadcast</react_native_1.Text>
            </expo_linear_gradient_1.LinearGradient>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 22, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    headerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 18 },
    backBtn: { flexDirection: "row", alignItems: "center", gap: 4, paddingVertical: 8, paddingRight: 10 },
    backText: { fontSize: 14, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerPill: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.16)", borderWidth: 1, borderColor: "rgba(255,255,255,0.22)" },
    headerPillText: { fontSize: 11, fontWeight: "800", color: "#DCFCE7", fontFamily: "Inter_700Bold", textTransform: "uppercase", letterSpacing: 0.8 },
    headerTitle: { fontSize: 24, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.4 },
    headerSub: { fontSize: 13, color: "rgba(255,255,255,0.76)", fontFamily: "Inter_400Regular", marginTop: 5, lineHeight: 18 },
    scroll: { flex: 1 },
    content: { padding: 14, gap: 12 },
    card: { backgroundColor: "white", borderRadius: 20, padding: 14, borderWidth: 1, borderColor: "#E2E8F0", shadowColor: "#166534", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 2 },
    sectionTitle: { fontSize: 16, fontWeight: "900", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 12 },
    segmentRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
    segmentBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, paddingVertical: 12, borderRadius: 14, borderWidth: 1.5, borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" },
    segmentText: { fontSize: 14, fontWeight: "900", color: "#94A3B8", fontFamily: "Inter_700Bold" },
    label: { fontSize: 11, fontWeight: "900", color: "#475569", fontFamily: "Inter_700Bold", marginBottom: 7, marginTop: 4, textTransform: "uppercase", letterSpacing: 0.6 },
    chipRow: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 10 },
    chip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 14, backgroundColor: "#F8FAFC", borderWidth: 1, borderColor: "#E2E8F0" },
    chipActive: { backgroundColor: "#FFF7ED", borderColor: "#EA580C" },
    chipText: { fontSize: 12, color: "#64748B", fontWeight: "800", fontFamily: "Inter_700Bold", textTransform: "capitalize" },
    chipTextActive: { color: "#C2410C" },
    dropdownBlock: { marginBottom: 12 },
    dropdownBtn: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 14, paddingHorizontal: 13, paddingVertical: 13, backgroundColor: "#FFFFFF" },
    dropdownBtnOpen: { borderColor: "#EA580C", backgroundColor: "#FFF7ED" },
    dropdownValue: { fontSize: 14, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    dropdownMenu: { marginTop: 7, borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 14, backgroundColor: "white", overflow: "hidden" },
    dropdownOption: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 13, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    dropdownOptionActive: { backgroundColor: "#FFF7ED" },
    dropdownOptionText: { fontSize: 13, fontWeight: "700", color: "#475569", fontFamily: "Inter_700Bold" },
    dropdownOptionTextActive: { color: "#C2410C" },
    input: { borderWidth: 1.5, borderColor: "#E2E8F0", borderRadius: 14, paddingHorizontal: 13, paddingVertical: 11, fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular", backgroundColor: "#FFFFFF", marginBottom: 10, outlineWidth: 0 },
    readOnlyBox: { minHeight: 46, flexDirection: "row", alignItems: "center", gap: 8, borderWidth: 1.5, borderColor: "#FED7AA", borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: "#FFF7ED", marginBottom: 10 },
    readOnlyValue: { fontSize: 13, fontWeight: "900", color: "#C2410C", fontFamily: "Inter_700Bold" },
    readOnlyHint: { fontSize: 10, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_700Bold", marginTop: 1 },
    textArea: { minHeight: 128, lineHeight: 20 },
    twoCol: { flexDirection: "row", gap: 10 },
    half: { flex: 1 },
    helperText: { fontSize: 12, color: "#64748B", fontFamily: "Inter_400Regular", lineHeight: 17, marginBottom: 12 },
    uploadBox: { borderWidth: 1.5, borderStyle: "dashed", borderColor: "#FDBA74", backgroundColor: "#FFF7ED", borderRadius: 18, minHeight: 138, alignItems: "center", justifyContent: "center", padding: 16 },
    uploadIcon: { width: 48, height: 48, borderRadius: 16, alignItems: "center", justifyContent: "center", backgroundColor: "white", marginBottom: 10 },
    uploadTitle: { fontSize: 15, fontWeight: "900", color: "#C2410C", fontFamily: "Inter_700Bold" },
    uploadSub: { fontSize: 11, color: "#EA580C", fontFamily: "Inter_400Regular", marginTop: 3, textAlign: "center" },
    mediaPreview: { borderRadius: 18, overflow: "hidden", borderWidth: 1, borderColor: "#E2E8F0", backgroundColor: "#F8FAFC" },
    mediaImage: { width: "100%", height: 180 },
    videoPreview: { height: 150, alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#FFF7ED" },
    videoPreviewText: { fontSize: 12, fontWeight: "800", color: "#EA580C", fontFamily: "Inter_700Bold" },
    removeMediaBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 11, backgroundColor: "white" },
    removeMediaText: { fontSize: 13, fontWeight: "900", color: "#DC2626", fontFamily: "Inter_700Bold" },
    actionRow: { flexDirection: "row", gap: 10, marginTop: 2 },
    cancelBtn: { flex: 1, paddingVertical: 15, borderRadius: 16, alignItems: "center", backgroundColor: "white", borderWidth: 1.5, borderColor: "#E2E8F0" },
    cancelText: { fontSize: 14, fontWeight: "900", color: "#64748B", fontFamily: "Inter_700Bold" },
    submitBtn: { flex: 2, borderRadius: 16, overflow: "hidden" },
    submitGrad: { paddingVertical: 16, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: 8 },
    submitText: { fontSize: 14, fontWeight: "900", color: "white", fontFamily: "Inter_700Bold" },
});
