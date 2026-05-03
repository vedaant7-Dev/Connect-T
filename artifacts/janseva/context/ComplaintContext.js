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
exports.ComplaintProvider = ComplaintProvider;
exports.useComplaints = useComplaints;
var react_1 = require("react");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var ComplaintContext = (0, react_1.createContext)(null);
var STORAGE_KEY = "janseva_complaints_v3";
function generateId() {
    return "CMP" + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 4).toUpperCase();
}
function ComplaintProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)([]), complaints = _b[0], setComplaints = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        loadComplaints();
    }, []);
    var loadComplaints = function () { return __awaiter(_this, void 0, void 0, function () {
        var stored, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, 6, 7]);
                    return [4 /*yield*/, async_storage_1.default.getItem(STORAGE_KEY)];
                case 1:
                    stored = _a.sent();
                    if (!stored) return [3 /*break*/, 2];
                    setComplaints(JSON.parse(stored));
                    return [3 /*break*/, 4];
                case 2:
                    setComplaints([]);
                    return [4 /*yield*/, async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify([]))];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [3 /*break*/, 7];
                case 5:
                    e_1 = _a.sent();
                    console.error("Failed to load complaints", e_1);
                    return [3 /*break*/, 7];
                case 6:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var saveComplaints = function (updated) { return __awaiter(_this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(updated))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    e_2 = _a.sent();
                    console.error("Failed to save complaints", e_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var addComplaint = function (data) {
        var now = new Date().toISOString();
        var newComplaint = __assign(__assign({}, data), { id: generateId(), status: "submitted", createdAt: now, updatedAt: now, timeline: [
                {
                    status: "submitted",
                    timestamp: now,
                    note: "Complaint registered successfully",
                    updatedBy: "System",
                },
            ] });
        var updated = __spreadArray([newComplaint], complaints, true);
        setComplaints(updated);
        saveComplaints(updated);
        return newComplaint;
    };
    var updateStatus = function (id, status, note, updatedBy) {
        var now = new Date().toISOString();
        var updated = complaints.map(function (c) {
            if (c.id !== id)
                return c;
            var newEntry = {
                status: status,
                timestamp: now,
                note: note || getDefaultNote(status),
                updatedBy: updatedBy || "Ward Officer",
            };
            return __assign(__assign({}, c), { status: status, updatedAt: now, timeline: __spreadArray(__spreadArray([], c.timeline, true), [newEntry], false), resolvedNote: status === "resolved" ? note : c.resolvedNote });
        });
        setComplaints(updated);
        saveComplaints(updated);
    };
    var getComplaintById = function (id) { return complaints.find(function (c) { return c.id === id; }); };
    return (<ComplaintContext.Provider value={{ complaints: complaints, addComplaint: addComplaint, updateStatus: updateStatus, getComplaintById: getComplaintById, loading: loading }}>
      {children}
    </ComplaintContext.Provider>);
}
function useComplaints() {
    var ctx = (0, react_1.useContext)(ComplaintContext);
    if (!ctx)
        throw new Error("useComplaints must be used inside ComplaintProvider");
    return ctx;
}
function getDefaultNote(status) {
    switch (status) {
        case "assigned": return "Complaint assigned to ward team";
        case "in_progress": return "Work has begun on this complaint";
        case "resolved": return "Issue has been resolved";
        case "rejected": return "Complaint could not be processed";
        default: return "";
    }
}
