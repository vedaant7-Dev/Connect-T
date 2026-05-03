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
exports.typeConfig = exports.categoryConfig = void 0;
exports.JobsProvider = JobsProvider;
exports.useJobs = useJobs;
var react_1 = require("react");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var JobsContext = (0, react_1.createContext)(null);
var STORAGE_KEY = "connectt_jobs_listings_v3";
function generateId() {
    return "JOB" + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}
function JobsProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)([]), jobs = _b[0], setJobs = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        async_storage_1.default.getItem(STORAGE_KEY).then(function (raw) {
            if (raw) {
                try {
                    var parsed = JSON.parse(raw);
                    // migrate old jobs that lack shortlisted/rejected
                    var migrated = parsed.map(function (j) { return (__assign({ shortlisted: [], rejected: [] }, j)); });
                    setJobs(migrated);
                    return;
                }
                catch (_a) { }
            }
            setJobs([]);
            async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify([]));
        }).finally(function () { return setLoading(false); });
    }, []);
    var save = function (updated) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setJobs(updated);
                    return [4 /*yield*/, async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(updated))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var addJob = function (data) {
        var job = __assign(__assign({}, data), { id: generateId(), applicants: [], shortlisted: [], rejected: [], active: true, createdAt: new Date().toISOString() });
        save(__spreadArray([job], jobs, true));
    };
    var applyJob = function (jobId, seekerId) {
        save(jobs.map(function (j) { return j.id === jobId && !j.applicants.includes(seekerId)
            ? __assign(__assign({}, j), { applicants: __spreadArray(__spreadArray([], j.applicants, true), [seekerId], false) }) : j; }));
    };
    var hasApplied = function (jobId, seekerId) {
        var job = jobs.find(function (j) { return j.id === jobId; });
        return !!job && job.applicants.includes(seekerId);
    };
    var getJobsByEmployer = function (employerId) { return jobs.filter(function (j) { return j.employerId === employerId; }); };
    var toggleJobActive = function (jobId) {
        save(jobs.map(function (j) { return j.id === jobId ? __assign(__assign({}, j), { active: !j.active }) : j; }));
    };
    var shortlistApplicant = function (jobId, seekerId) {
        save(jobs.map(function (j) { return j.id === jobId
            ? __assign(__assign({}, j), { shortlisted: j.shortlisted.includes(seekerId) ? j.shortlisted : __spreadArray(__spreadArray([], j.shortlisted, true), [seekerId], false), rejected: j.rejected.filter(function (id) { return id !== seekerId; }) }) : j; }));
    };
    var rejectApplicant = function (jobId, seekerId) {
        save(jobs.map(function (j) { return j.id === jobId
            ? __assign(__assign({}, j), { rejected: j.rejected.includes(seekerId) ? j.rejected : __spreadArray(__spreadArray([], j.rejected, true), [seekerId], false), shortlisted: j.shortlisted.filter(function (id) { return id !== seekerId; }) }) : j; }));
    };
    var deleteJob = function (jobId) {
        save(jobs.filter(function (j) { return j.id !== jobId; }));
    };
    return (<JobsContext.Provider value={{ jobs: jobs, loading: loading, addJob: addJob, applyJob: applyJob, hasApplied: hasApplied, getJobsByEmployer: getJobsByEmployer, toggleJobActive: toggleJobActive, shortlistApplicant: shortlistApplicant, rejectApplicant: rejectApplicant, deleteJob: deleteJob }}>
      {children}
    </JobsContext.Provider>);
}
function useJobs() {
    var ctx = (0, react_1.useContext)(JobsContext);
    if (!ctx)
        throw new Error("useJobs must be inside JobsProvider");
    return ctx;
}
exports.categoryConfig = {
    manufacturing: { label: "Manufacturing", icon: "settings", color: "#92400E", bg: "#FEF3C7" },
    it: { label: "IT / Computer", icon: "monitor", color: "#1D4ED8", bg: "#DBEAFE" },
    retail: { label: "Retail / Sales", icon: "shopping-bag", color: "#7C3AED", bg: "#EDE9FE" },
    healthcare: { label: "Healthcare", icon: "activity", color: "#DC2626", bg: "#FEE2E2" },
    construction: { label: "Construction", icon: "tool", color: "#B45309", bg: "#FFEDD5" },
    transport: { label: "Transport", icon: "truck", color: "#0369A1", bg: "#BAE6FD" },
    education: { label: "Education", icon: "book-open", color: "#059669", bg: "#D1FAE5" },
    security: { label: "Security", icon: "shield", color: "#475569", bg: "#F1F5F9" },
    other: { label: "Other", icon: "more-horizontal", color: "#64748B", bg: "#F1F5F9" },
};
exports.typeConfig = {
    "full-time": { label: "Full Time", color: "#059669", bg: "#D1FAE5" },
    "part-time": { label: "Part Time", color: "#D97706", bg: "#FEF3C7" },
    "contract": { label: "Contract", color: "#7C3AED", bg: "#EDE9FE" },
    "apprentice": { label: "Apprentice", color: "#EA580C", bg: "#FFEDD5" },
};
