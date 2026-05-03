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
exports.default = JobDetailScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var expo_router_1 = require("expo-router");
var JobsContext_1 = require("@/context/JobsContext");
var JobsAuthContext_1 = require("@/context/JobsAuthContext");
function JobDetailScreen() {
    var _this = this;
    var router = (0, expo_router_1.useRouter)();
    var params = (0, expo_router_1.useLocalSearchParams)();
    var jobs = (0, JobsContext_1.useJobs)().jobs;
    var jobsUser = (0, JobsAuthContext_1.useJobsAuth)().jobsUser;
    var job = (0, react_1.useMemo)(function () { var _a; return (_a = jobs.find(function (j) { return j.id === params.jobId; })) !== null && _a !== void 0 ? _a : null; }, [jobs, params.jobId]);
    if (!job) {
        return (<react_native_1.View style={s.root}>
        <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316"]} style={s.header}>
          <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={s.backBtn} activeOpacity={0.8}>
            <vector_icons_1.Feather name="arrow-left" size={18} color="white"/>
          </react_native_1.TouchableOpacity>
          <react_native_1.Text style={s.headerTitle}>Job Details</react_native_1.Text>
          <react_native_1.Text style={s.headerSub}>Job not found</react_native_1.Text>
        </expo_linear_gradient_1.LinearGradient>
      </react_native_1.View>);
    }
    var contactPhone = job.employerWhatsApp || job.employerPhone;
    var canChat = !!jobsUser && jobsUser.id !== job.employerId;
    var openWhatsApp = function () { return __awaiter(_this, void 0, void 0, function () {
        var url;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!contactPhone)
                        return [2 /*return*/];
                    url = "https://wa.me/".concat(contactPhone.replace(/\D/g, ""), "?text=").concat(encodeURIComponent("Hi, I\u2019m interested in ".concat(job.title, ".")));
                    return [4 /*yield*/, react_native_1.Linking.openURL(url)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var openChat = function () {
        if (!canChat)
            return;
        router.push("/jobs/chat/".concat(job.employerId));
    };
    return (<react_native_1.View style={s.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} style={s.header}>
        <react_native_1.TouchableOpacity onPress={function () { return router.back(); }} style={s.backBtn} activeOpacity={0.8}>
          <vector_icons_1.Feather name="arrow-left" size={18} color="white"/>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={s.headerTitle}>{job.title}</react_native_1.Text>
        <react_native_1.Text style={s.headerSub}>{job.company} · {job.location}</react_native_1.Text>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView contentContainerStyle={s.content} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={s.card}>
          <react_native_1.View style={s.metaRow}>
            <react_native_1.View style={s.metaPill}><react_native_1.Text style={s.metaPillText}>{job.type}</react_native_1.Text></react_native_1.View>
            <react_native_1.View style={s.metaPill}><react_native_1.Text style={s.metaPillText}>{job.openings} openings</react_native_1.Text></react_native_1.View>
            <react_native_1.View style={s.metaPill}><react_native_1.Text style={s.metaPillText}>{job.salary}</react_native_1.Text></react_native_1.View>
          </react_native_1.View>
          <react_native_1.Text style={s.sectionTitle}>Company Details</react_native_1.Text>
          <react_native_1.Text style={s.body}>{job.employerName}</react_native_1.Text>
          <react_native_1.Text style={s.body}>{job.company}</react_native_1.Text>
          <react_native_1.Text style={s.body}>{job.location}</react_native_1.Text>
          <react_native_1.Text style={s.sectionTitle}>About the Job</react_native_1.Text>
          <react_native_1.Text style={s.body}>{job.description}</react_native_1.Text>
          <react_native_1.Text style={s.sectionTitle}>Requirements</react_native_1.Text>
          <react_native_1.Text style={s.body}>{job.requirements}</react_native_1.Text>
        </react_native_1.View>

        <react_native_1.View style={s.card}>
          <react_native_1.View style={s.actionRow}>
            <react_native_1.TouchableOpacity style={[s.actionBtn, !canChat && s.disabledBtn]} onPress={openChat} activeOpacity={0.85} disabled={!canChat}>
              <vector_icons_1.Feather name="message-circle" size={16} color="white"/>
              <react_native_1.Text style={s.actionText}>Chat</react_native_1.Text>
            </react_native_1.TouchableOpacity>
            {contactPhone ? (<react_native_1.TouchableOpacity style={s.whatsappBtn} onPress={openWhatsApp} activeOpacity={0.85}>
                <vector_icons_1.Feather name="phone" size={16} color="white"/>
                <react_native_1.Text style={s.actionText}>WhatsApp</react_native_1.Text>
              </react_native_1.TouchableOpacity>) : null}
          </react_native_1.View>
        </react_native_1.View>

        <react_native_1.View style={s.card}>
          <react_native_1.Text style={s.sectionTitle}>Job Contact</react_native_1.Text>
          <react_native_1.Text style={s.body}>Tap chat to open a detailed chat screen or WhatsApp to contact the employer directly.</react_native_1.Text>
          <react_native_1.View style={s.actionRow}>
            <react_native_1.TouchableOpacity style={s.actionBtn} onPress={openChat} activeOpacity={0.85}>
              <vector_icons_1.Feather name="send" size={16} color="white"/>
              <react_native_1.Text style={s.actionText}>Open Chat</react_native_1.Text>
            </react_native_1.TouchableOpacity>
            {contactPhone ? (<react_native_1.TouchableOpacity style={s.whatsappBtn} onPress={openWhatsApp} activeOpacity={0.85}>
                <vector_icons_1.Feather name="message-circle" size={16} color="white"/>
                <react_native_1.Text style={s.actionText}>WhatsApp</react_native_1.Text>
              </react_native_1.TouchableOpacity>) : null}
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var s = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F8FAFC" },
    header: { paddingTop: 60, paddingHorizontal: 16, paddingBottom: 18, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 },
    backBtn: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.18)", marginBottom: 12 },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 4, fontFamily: "Inter_400Regular" },
    content: { padding: 16, gap: 12 },
    card: { backgroundColor: "white", borderRadius: 18, padding: 16, gap: 10, shadowColor: "#000", shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
    metaRow: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
    metaPill: { backgroundColor: "#FFF7ED", borderRadius: 999, paddingHorizontal: 10, paddingVertical: 6 },
    metaPillText: { fontSize: 11, color: "#C2410C", fontFamily: "Inter_600SemiBold" },
    sectionTitle: { fontSize: 15, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginTop: 4 },
    body: { fontSize: 13, color: "#334155", fontFamily: "Inter_400Regular", lineHeight: 19 },
    actionRow: { flexDirection: "row", gap: 10, marginTop: 8 },
    actionBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#1D4ED8", borderRadius: 14, paddingVertical: 12 },
    whatsappBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: "#059669", borderRadius: 14, paddingVertical: 12 },
    actionText: { color: "white", fontSize: 13, fontWeight: "700", fontFamily: "Inter_700Bold" },
    disabledBtn: { opacity: 0.45 },
});
