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
exports.SEEKER_PROFILE_FIELDS = void 0;
exports.getSeekerFields = getSeekerFields;
exports.calcProfileCompletion = calcProfileCompletion;
exports.randomColor = randomColor;
exports.JobsAuthProvider = JobsAuthProvider;
exports.useJobsAuth = useJobsAuth;
var react_1 = require("react");
var async_storage_1 = require("@react-native-async-storage/async-storage");
exports.SEEKER_PROFILE_FIELDS = [
    { key: "name", label: "Full Name", weight: 1 },
    { key: "age", label: "Age", weight: 1 },
    { key: "phone", label: "Mobile Number", weight: 1 },
    { key: "qualification", label: "Qualification", weight: 1 },
    { key: "email", label: "Email Address", weight: 1 },
    { key: "skills", label: "Skills", weight: 1 },
    { key: "profilePhoto", label: "Profile Photo", weight: 1 },
    { key: "about", label: "About / Objective", weight: 1 },
    { key: "currentStatus", label: "Current Status", weight: 1 },
    { key: "experience", label: "Work Experience", weight: 1 },
    { key: "location", label: "Location", weight: 1 },
    { key: "languages", label: "Languages Known", weight: 1 },
];
function getSeekerFields(user) {
    var base = exports.SEEKER_PROFILE_FIELDS.slice();
    if (user.currentStatus === "employed") {
        base.push({ key: "currentCompany", label: "Current Company", weight: 1 }, { key: "currentRole", label: "Current Role", weight: 1 });
    }
    else if (user.currentStatus === "student") {
        base.push({ key: "collegeName", label: "College Name", weight: 1 }, { key: "fieldOfStudy", label: "Field of Study", weight: 1 });
    }
    if (user.currentStatus === "fresher") {
        return base.filter(function (f) { return f.key !== "experience"; });
    }
    return base;
}
function calcProfileCompletion(user) {
    if (user.role !== "seeker")
        return 100;
    var fields = getSeekerFields(user);
    var filled = fields.filter(function (f) {
        var val = user[f.key];
        return val !== undefined && val !== null && String(val).trim() !== "";
    });
    return Math.round((filled.length / fields.length) * 100);
}
var JobsAuthContext = (0, react_1.createContext)(null);
var STORAGE_KEY = "janseva_jobs_users_v1";
var SESSION_KEY = "janseva_jobs_current_v1";
var COLORS = ["#C2410C", "#EA580C", "#D97706", "#92400E", "#7C3AED", "#059669", "#0369A1"];
function randomColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
}
function generateId() {
    return "JU" + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
}
function generateCompanyId() {
    return "CO" + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 4).toUpperCase();
}
function JobsAuthProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)(null), jobsUser = _b[0], setJobsUser = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        Promise.all([async_storage_1.default.getItem(STORAGE_KEY), async_storage_1.default.getItem(SESSION_KEY)]).then(function (_a) {
            var usersRaw = _a[0], sessionRaw = _a[1];
            try {
                var users = usersRaw ? JSON.parse(usersRaw) : {};
                var session = sessionRaw ? JSON.parse(sessionRaw) : {};
                var current = session.currentKey ? users[session.currentKey] : null;
                if (current)
                    setJobsUser(current);
            }
            catch (_b) { }
        }).finally(function () { return setLoading(false); });
    }, []);
    var save = function (user) { return __awaiter(_this, void 0, void 0, function () {
        var raw, existing, key;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setJobsUser(user);
                    if (!!user) return [3 /*break*/, 2];
                    return [4 /*yield*/, async_storage_1.default.removeItem(SESSION_KEY)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2: return [4 /*yield*/, async_storage_1.default.getItem(STORAGE_KEY)];
                case 3:
                    raw = _a.sent();
                    existing = raw ? JSON.parse(raw) : {};
                    key = "".concat(user.phone, ":").concat(user.role);
                    existing[key] = user;
                    return [4 /*yield*/, async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(existing))];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, async_storage_1.default.setItem(SESSION_KEY, JSON.stringify({ currentKey: key }))];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var registerJobs = function (data) { return __awaiter(_this, void 0, void 0, function () {
        var user, raw, existing, key;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    user = __assign(__assign({}, data), { id: generateId(), createdAt: new Date().toISOString(), companies: (_a = data.companies) === null || _a === void 0 ? void 0 : _a.map(function (c) { return (__assign(__assign({}, c), { id: c.id || generateCompanyId() })); }) });
                    return [4 /*yield*/, async_storage_1.default.getItem(STORAGE_KEY)];
                case 1:
                    raw = _b.sent();
                    existing = raw ? JSON.parse(raw) : {};
                    key = "".concat(user.phone, ":").concat(user.role);
                    existing[key] = user;
                    return [4 /*yield*/, async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(existing))];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, async_storage_1.default.setItem(SESSION_KEY, JSON.stringify({ currentKey: key }))];
                case 3:
                    _b.sent();
                    setJobsUser(user);
                    return [2 /*return*/];
            }
        });
    }); };
    var loginJobs = function (phone, role) { return __awaiter(_this, void 0, void 0, function () {
        var raw, existing, user, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, async_storage_1.default.getItem(STORAGE_KEY)];
                case 1:
                    raw = _b.sent();
                    if (!raw) return [3 /*break*/, 6];
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 5, , 6]);
                    existing = JSON.parse(raw);
                    user = existing["".concat(phone, ":").concat(role)];
                    if (!user) return [3 /*break*/, 4];
                    setJobsUser(user);
                    return [4 /*yield*/, async_storage_1.default.setItem(SESSION_KEY, JSON.stringify({ currentKey: "".concat(phone, ":").concat(role) }))];
                case 3:
                    _b.sent();
                    return [2 /*return*/, true];
                case 4: return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/, false];
            }
        });
    }); };
    var logoutJobs = function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, save(null)];
    }); }); };
    var updateJobsUser = function (data) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!jobsUser)
                        return [2 /*return*/];
                    return [4 /*yield*/, save(__assign(__assign({}, jobsUser), data))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var addCompany = function (company) { return __awaiter(_this, void 0, void 0, function () {
        var next;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!jobsUser)
                        return [2 /*return*/];
                    next = __assign(__assign({}, company), { id: generateCompanyId() });
                    return [4 /*yield*/, save(__assign(__assign({}, jobsUser), { companies: __spreadArray(__spreadArray([], (jobsUser.companies || []), true), [next], false) }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/, next.id];
            }
        });
    }); };
    var updateCompany = function (companyId, company) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!jobsUser)
                        return [2 /*return*/];
                    return [4 /*yield*/, save(__assign(__assign({}, jobsUser), { companies: (jobsUser.companies || []).map(function (c) { return (c.id === companyId ? __assign(__assign({}, c), company) : c); }) }))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<JobsAuthContext.Provider value={{ jobsUser: jobsUser, loading: loading, registerJobs: registerJobs, loginJobs: loginJobs, logoutJobs: logoutJobs, updateJobsUser: updateJobsUser, addCompany: addCompany, updateCompany: updateCompany }}>
      {children}
    </JobsAuthContext.Provider>);
}
function useJobsAuth() {
    var ctx = (0, react_1.useContext)(JobsAuthContext);
    if (!ctx)
        throw new Error("useJobsAuth must be inside JobsAuthProvider");
    return ctx;
}
