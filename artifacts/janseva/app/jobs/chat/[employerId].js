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
exports.default = JobChatScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var expo_router_1 = require("expo-router");
var JobsContext_1 = require("@/context/JobsContext");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
function JobChatScreen() {
    var _this = this;
    var _a;
    var router = (0, expo_router_1.useRouter)();
    var params = (0, expo_router_1.useLocalSearchParams)();
    var _b = (0, JobsContext_1.useJobs)(), jobs = _b.jobs, addJobMessage = _b.addJobMessage;
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var _c = (0, react_1.useState)(""), text = _c[0], setText = _c[1];
    var employerJobs = (0, react_1.useMemo)(function () { return jobs.filter(function (job) { return job.employerId === params.employerId; }); }, [jobs, params.employerId]);
    var job = employerJobs[0];
    var messages = (_a = job === null || job === void 0 ? void 0 : job.messages) !== null && _a !== void 0 ? _a : [];
    var employerContact = (job === null || job === void 0 ? void 0 : job.employerWhatsApp) || (job === null || job === void 0 ? void 0 : job.employerPhone) || "";
    var sendMessage = function () { return __awaiter(_this, void 0, void 0, function () {
        var message;
        return __generator(this, function (_a) {
            message = text.trim();
            if (!message)
                return [2 /*return*/];
            if (!job) {
                react_native_1.Alert.alert("No chat found");
                return [2 /*return*/];
            }
            addJobMessage(job.id, { from: (jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.id) || "visitor", text: message, createdAt: new Date().toISOString() });
            setText("");
            react_native_1.Alert.alert("Sent", "Message sent to employer.");
            return [2 /*return*/];
        });
    }); };
    var openWhatsApp = function () { return __awaiter(_this, void 0, void 0, function () {
        var phone, url, can;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    phone = String(employerContact).replace(/[^\d+]/g, "");
                    if (!phone)
                        return [2 /*return*/];
                    url = "https://wa.me/".concat(phone.replace("+", ""), "?text=").concat(encodeURIComponent("Hi, I\u2019m interested in ".concat((_a = job === null || job === void 0 ? void 0 : job.title) !== null && _a !== void 0 ? _a : "your job post", ".")));
                    return [4 /*yield*/, react_native_1.Linking.canOpenURL(url)];
                case 1:
                    can = _b.sent();
                    if (!can)
                        return [2 /*return*/, react_native_1.Alert.alert("WhatsApp not available")];
                    return [4 /*yield*/, react_native_1.Linking.openURL(url)];
                case 2:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={s.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} style={s.header}>
        <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={s.backBtn} activeOpacity={0.8}>
          <vector_icons_1.Feather name="arrow-left" size={18} color="white"/>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={s.headerTitle}>Chat Employer</react_native_1.Text>
        <react_native_1.Text style={s.headerSub}>Employer ID: {params.employerId}</react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView contentContainerStyle={s.content}>
        {messages.length === 0 ? <react_native_1.View style={s.empty}><vector_icons_1.Feather name="message-circle" size={42} color="#CBD5E1"/><react_native_1.Text style={s.emptyText}>Chat will open here.</react_native_1.Text></react_native_1.View> : messages.map(function (m, idx) { return <react_native_1.View key={idx} style={[s.message, m.from === (jobsUser === null || jobsUser === void 0 ? void 0 : jobsUser.id) ? s.myMessage : s.otherMessage]}><react_native_1.Text style={s.messageText}>{m.text}</react_native_1.Text></react_native_1.View>; })}
      </react_native_1.ScrollView>

      <react_native_1.View style={s.inputBar}>
        <react_native_1.TextInput style={s.input} placeholder="Type message..." placeholderTextColor="#94A3B8" value={text} onChangeText={setText}/>
        <react_native_1.TouchableOpacity style={s.sendBtn} activeOpacity={0.85} onPress={sendMessage}>
          <vector_icons_1.Feather name="send" size={16} color="white"/>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
      <react_native_1.TouchableOpacity style={s.whatsappBtn} activeOpacity={0.85} onPress={openWhatsApp}>
        <vector_icons_1.Feather name="message-circle" size={16} color="white"/>
        <react_native_1.Text style={s.whatsappText}>Open WhatsApp</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
}
var s = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F8FAFC" },
    header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.18)", marginBottom: 12 },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4, fontFamily: "Inter_400Regular" },
    content: { flexGrow: 1, justifyContent: "center", padding: 16 },
    empty: { alignItems: "center", gap: 10 },
    emptyText: { fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    inputBar: { flexDirection: "row", gap: 10, padding: 16, borderTopWidth: 1, borderTopColor: "#E2E8F0", backgroundColor: "white" },
    input: { flex: 1, borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 14, paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0F172A" },
    sendBtn: { width: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: "#EA580C" },
    message: { maxWidth: "80%", marginBottom: 10, padding: 12, borderRadius: 16 },
    myMessage: { alignSelf: "flex-end", backgroundColor: "#FED7AA" },
    otherMessage: { alignSelf: "flex-start", backgroundColor: "white", borderWidth: 1, borderColor: "#E2E8F0" },
    messageText: { fontSize: 13, color: "#0F172A", fontFamily: "Inter_400Regular" },
    whatsappBtn: { margin: 16, marginTop: 0, borderRadius: 14, paddingVertical: 12, alignItems: "center", justifyContent: "center", backgroundColor: "#16A34A", flexDirection: "row", gap: 8 },
    whatsappText: { color: "white", fontSize: 13, fontWeight: "700", fontFamily: "Inter_700Bold" },
});
