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
exports.AlertProvider = AlertProvider;
exports.wardKey = wardKey;
exports.useAlerts = useAlerts;
var react_1 = require("react");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var AlertContext = (0, react_1.createContext)(null);
var STORAGE_KEY = "connectt_alerts_v1";
var ALERT_ACTIVE_MS = 12 * 60 * 60 * 1000;
function getExpiryTime(alert) {
    var explicitExpiry = alert.expiresAt ? new Date(alert.expiresAt).getTime() : NaN;
    if (!Number.isNaN(explicitExpiry))
        return explicitExpiry;
    return new Date(alert.createdAt).getTime() + ALERT_ACTIVE_MS;
}
function getActiveAlerts(items) {
    var now = Date.now();
    return items.filter(function (item) { return getExpiryTime(item) > now; });
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
function AlertProvider(_a) {
    var children = _a.children;
    var _b = (0, react_1.useState)([]), alerts = _b[0], setAlerts = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    (0, react_1.useEffect)(function () {
        async_storage_1.default.getItem(STORAGE_KEY)
            .then(function (stored) {
            if (!stored)
                return;
            var parsed = JSON.parse(stored);
            var active = getActiveAlerts(parsed);
            setAlerts(active);
            if (active.length !== parsed.length) {
                async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(active)).catch(function () { });
            }
        })
            .catch(function () { })
            .finally(function () { return setLoading(false); });
    }, []);
    (0, react_1.useEffect)(function () {
        var timer = setInterval(function () {
            setAlerts(function (current) {
                var active = getActiveAlerts(current);
                if (active.length !== current.length) {
                    async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(active)).catch(function () { });
                }
                return active;
            });
        }, 60000);
        return function () { return clearInterval(timer); };
    }, []);
    var save = function (updated) {
        setAlerts(updated);
        async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(function () { });
    };
    var addAlert = function (data, postedBy, postedById, ward) {
        var createdAt = new Date();
        var expiresAt = new Date(createdAt.getTime() + ALERT_ACTIVE_MS).toISOString();
        var newAlert = __assign(__assign({}, data), { priority: data.priority || "normal", media: data.media || null, id: "ALT" + Date.now().toString().slice(-6), createdAt: createdAt.toISOString(), expiresAt: expiresAt, validUntil: formatValidUntil(expiresAt), postedBy: postedBy, postedById: postedById, ward: ward });
        save(__spreadArray([newAlert], getActiveAlerts(alerts), true));
    };
    var removeAlert = function (id) {
        save(alerts.filter(function (a) { return a.id !== id; }));
    };
    return (<AlertContext.Provider value={{ alerts: alerts, addAlert: addAlert, removeAlert: removeAlert, loading: loading }}>
      {children}
    </AlertContext.Provider>);
}
function wardKey(ward) {
    if (!ward)
        return "";
    var m = ward.match(/\d+/);
    return m ? m[0] : ward.trim().toLowerCase();
}
function useAlerts() {
    var ctx = (0, react_1.useContext)(AlertContext);
    if (!ctx)
        throw new Error("useAlerts must be used inside AlertProvider");
    return ctx;
}
