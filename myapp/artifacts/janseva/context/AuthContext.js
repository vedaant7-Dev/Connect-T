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
exports.AuthProvider = AuthProvider;
exports.useAuth = useAuth;
var react_1 = require("react");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var nagarsevaks_1 = require("@/data/nagarsevaks");
var AuthContext = (0, react_1.createContext)(null);
var SESSION_KEY = "janseva_user";
var USERS_KEY = "janseva_users";
var AVATAR_COLORS = ["#1E40AF", "#059669", "#7C3AED", "#D97706", "#DC2626", "#0EA5E9"];
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var raw, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, async_storage_1.default.getItem(USERS_KEY)];
                case 1:
                    raw = _b.sent();
                    return [2 /*return*/, raw ? JSON.parse(raw) : []];
                case 2:
                    _a = _b.sent();
                    return [2 /*return*/, []];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function saveAllUsers(users) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, async_storage_1.default.setItem(USERS_KEY, JSON.stringify(users))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function AuthProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)(null), user = _b[0], setUser = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        async_storage_1.default.getItem(SESSION_KEY)
            .then(function (stored) {
            if (stored)
                setUser(JSON.parse(stored));
        })
            .finally(function () { return setLoading(false); });
    }, []);
    var login = function (userData) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setUser(userData);
                    return [4 /*yield*/, async_storage_1.default.setItem(SESSION_KEY, JSON.stringify(userData))];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var logout = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setUser(null);
                    return [4 /*yield*/, async_storage_1.default.removeItem(SESSION_KEY)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var checkPhone = function (mobile) { return __awaiter(_this, void 0, void 0, function () {
        var users;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getAllUsers()];
                case 1:
                    users = _b.sent();
                    return [2 /*return*/, (_a = users.find(function (u) { return u.mobile === mobile.trim(); })) !== null && _a !== void 0 ? _a : null];
            }
        });
    }); };
    var register = function (userData) { return __awaiter(_this, void 0, void 0, function () {
        var users, colorIndex, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getAllUsers()];
                case 1:
                    users = _a.sent();
                    colorIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
                    newUser = __assign(__assign({}, userData), { id: "U" + Date.now(), avatarColor: AVATAR_COLORS[colorIndex], createdAt: new Date().toISOString() });
                    users.push(newUser);
                    return [4 /*yield*/, saveAllUsers(users)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, login(newUser)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, newUser];
            }
        });
    }); };
    var loginWithPhone = function (mobile) { return __awaiter(_this, void 0, void 0, function () {
        var found;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, checkPhone(mobile)];
                case 1:
                    found = _a.sent();
                    if (!found) return [3 /*break*/, 3];
                    return [4 /*yield*/, login(found)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, found];
                case 3: return [2 /*return*/, null];
            }
        });
    }); };
    var loginWithNagarsevakId = function (mobile, nagarsevakId) { return __awaiter(_this, void 0, void 0, function () {
        var normalizedId, directoryEntry, enteredMobile, users, found, refreshed, idx, colorIndex, newUser;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    normalizedId = nagarsevakId.toUpperCase().trim();
                    directoryEntry = (0, nagarsevaks_1.findNagarsevakById)(normalizedId);
                    if (!directoryEntry)
                        return [2 /*return*/, null];
                    enteredMobile = mobile.trim().replace(/\D/g, "");
                    if (enteredMobile && enteredMobile !== directoryEntry.mobile)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, getAllUsers()];
                case 1:
                    users = _a.sent();
                    found = users.find(function (u) { return u.role === "nagarsevak" && u.nagarsevakId === normalizedId; });
                    if (!found) return [3 /*break*/, 5];
                    refreshed = __assign(__assign({}, found), { name: directoryEntry.name, mobile: directoryEntry.mobile, ward: directoryEntry.ward });
                    idx = users.findIndex(function (u) { return u.id === found.id; });
                    if (!(idx >= 0)) return [3 /*break*/, 3];
                    users[idx] = refreshed;
                    return [4 /*yield*/, saveAllUsers(users)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3: return [4 /*yield*/, login(refreshed)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, refreshed];
                case 5:
                    colorIndex = Math.floor(Math.random() * AVATAR_COLORS.length);
                    newUser = {
                        id: "U" + Date.now(),
                        name: directoryEntry.name,
                        mobile: directoryEntry.mobile,
                        role: "nagarsevak",
                        ward: directoryEntry.ward,
                        nagarsevakId: normalizedId,
                        avatarColor: AVATAR_COLORS[colorIndex],
                        createdAt: new Date().toISOString(),
                    };
                    users.push(newUser);
                    return [4 /*yield*/, saveAllUsers(users)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, login(newUser)];
                case 7:
                    _a.sent();
                    return [2 /*return*/, newUser];
            }
        });
    }); };
    var updateUser = function (updates) { return __awaiter(_this, void 0, void 0, function () {
        var updated, users, idx;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!user)
                        return [2 /*return*/];
                    updated = __assign(__assign(__assign({}, user), updates), { id: user.id, role: user.role, nagarsevakId: user.nagarsevakId, createdAt: user.createdAt });
                    setUser(updated);
                    return [4 /*yield*/, async_storage_1.default.setItem(SESSION_KEY, JSON.stringify(updated))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, getAllUsers()];
                case 2:
                    users = _a.sent();
                    idx = users.findIndex(function (u) { return u.id === user.id; });
                    if (!(idx >= 0)) return [3 /*break*/, 4];
                    users[idx] = updated;
                    return [4 /*yield*/, saveAllUsers(users)];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); };
    return (<AuthContext.Provider value={{ user: user, isLoggedIn: !!user, loading: loading, login: login, logout: logout, checkPhone: checkPhone, register: register, loginWithPhone: loginWithPhone, loginWithNagarsevakId: loginWithNagarsevakId, updateUser: updateUser }}>
      {children}
    </AuthContext.Provider>);
}
function useAuth() {
    var ctx = (0, react_1.useContext)(AuthContext);
    if (!ctx)
        throw new Error("useAuth must be inside AuthProvider");
    return ctx;
}
