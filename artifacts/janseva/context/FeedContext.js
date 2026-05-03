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
exports.hasBadContent = hasBadContent;
exports.FeedProvider = FeedProvider;
exports.useFeed = useFeed;
var react_1 = require("react");
var async_storage_1 = require("@react-native-async-storage/async-storage");
var FeedContext = (0, react_1.createContext)(null);
var STORAGE_KEY = "janseva_feed_v3";
var CHAT_KEY = "janseva_chat_v3";
var SUBSCRIPTIONS_KEY = "janseva_subscriptions";
var BLOCKED_KEY = "janseva_blocked";
var BAD_WORDS = [
    "fuck", "f*ck", "fuk", "fucker", "fucking", "fucks",
    "shit", "sh*t", "bullshit",
    "ass", "asshole", "arse",
    "bitch", "b*tch", "bitches",
    "bastard", "cunt", "c*nt",
    "cock", "c*ck", "dick", "d*ck",
    "pussy", "p*ssy",
    "whore", "slut",
    "sex", "sexy", "sexual", "sexting", "s3x",
    "porn", "porno", "p0rn", "pornography",
    "nude", "nudes", "naked",
    "boob", "boobs", "breast", "nipple",
    "rape", "raping", "raped",
    "masturbate", "masturbation",
    "penis", "vagina", "condom",
    "chutiya", "ch*tiya", "chutiye",
    "madarchod", "madarc**d", "mc",
    "bhenchod", "bhenc**d", "bc",
    "gaandu", "gaand", "g**nd",
    "randi", "r**di",
    "harami", "haramzada",
    "bhosdike", "bhosdi",
    "lavda", "l**da", "lund", "l**d",
    "chut", "ch*t",
    "madarjat", "gandu", "kutiya", "randwa",
    "kamina", "saala", "sala", "sali",
];
function hasBadContent(text) {
    var lower = text.toLowerCase().replace(/\s+/g, " ");
    return BAD_WORDS.some(function (word) { return lower.includes(word); });
}
function generateId() {
    return "P" + Date.now().toString().slice(-8) + Math.random().toString(36).substr(2, 3).toUpperCase();
}
function FeedProvider(_a) {
    var _this = this;
    var children = _a.children;
    var _b = (0, react_1.useState)([]), posts = _b[0], setPosts = _b[1];
    var _c = (0, react_1.useState)([]), chatMessages = _c[0], setChatMessages = _c[1];
    var _d = (0, react_1.useState)({}), subscriptions = _d[0], setSubscriptions = _d[1];
    var _e = (0, react_1.useState)({}), blocked = _e[0], setBlocked = _e[1];
    var _f = (0, react_1.useState)(true), loading = _f[0], setLoading = _f[1];
    (0, react_1.useEffect)(function () {
        Promise.all([
            async_storage_1.default.getItem(STORAGE_KEY),
            async_storage_1.default.getItem(CHAT_KEY),
            async_storage_1.default.getItem(SUBSCRIPTIONS_KEY),
            async_storage_1.default.getItem(BLOCKED_KEY),
        ]).then(function (_a) {
            var storedPosts = _a[0], storedChat = _a[1], storedSubs = _a[2], storedBlocked = _a[3];
            setPosts(storedPosts ? JSON.parse(storedPosts) : []);
            setChatMessages(storedChat ? JSON.parse(storedChat) : []);
            setSubscriptions(storedSubs ? JSON.parse(storedSubs) : {});
            setBlocked(storedBlocked ? JSON.parse(storedBlocked) : {});
            if (!storedPosts)
                async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify([]));
            if (!storedChat)
                async_storage_1.default.setItem(CHAT_KEY, JSON.stringify([]));
            setLoading(false);
        });
    }, []);
    var savePosts = function (updated) {
        setPosts(updated);
        async_storage_1.default.setItem(STORAGE_KEY, JSON.stringify(updated));
    };
    var saveChat = function (updated) {
        setChatMessages(updated);
        async_storage_1.default.setItem(CHAT_KEY, JSON.stringify(updated));
    };
    var isSubscribed = function (userId) { return !!subscriptions[userId]; };
    var isBlocked = function (userId) {
        var until = blocked[userId];
        if (!until)
            return false;
        if (Date.now() > until) {
            var next = __assign({}, blocked);
            delete next[userId];
            setBlocked(next);
            async_storage_1.default.setItem(BLOCKED_KEY, JSON.stringify(next));
            return false;
        }
        return true;
    };
    var subscribe = function (userId) { return __awaiter(_this, void 0, void 0, function () {
        var next;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    next = __assign(__assign({}, subscriptions), (_a = {}, _a[userId] = true, _a));
                    setSubscriptions(next);
                    return [4 /*yield*/, async_storage_1.default.setItem(SUBSCRIPTIONS_KEY, JSON.stringify(next))];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var blockUser = function (userId) { return __awaiter(_this, void 0, void 0, function () {
        var until, next;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    until = Date.now() + 24 * 60 * 60 * 1000;
                    next = __assign(__assign({}, blocked), (_a = {}, _a[userId] = until, _a));
                    setBlocked(next);
                    return [4 /*yield*/, async_storage_1.default.setItem(BLOCKED_KEY, JSON.stringify(next))];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
            }
        });
    }); };
    var addPost = function (content, type, authorName, authorRole, avatarColor, authorId, imageUri) {
        if (hasBadContent(content)) {
            blockUser(authorId);
            return { success: false, reason: "blocked" };
        }
        var post = {
            id: generateId(),
            authorId: authorId,
            authorName: authorName,
            authorRole: authorRole,
            avatarColor: avatarColor,
            type: type,
            content: content,
            imageUri: imageUri,
            likes: [],
            commentsCount: 0,
            createdAt: new Date().toISOString(),
        };
        savePosts(__spreadArray([post], posts, true));
        return { success: true };
    };
    var addChatMessage = function (text, authorId, authorName, authorRole, avatarColor) {
        if (hasBadContent(text)) {
            blockUser(authorId);
            return { success: false, reason: "blocked" };
        }
        var msg = {
            id: generateId(),
            authorId: authorId,
            authorName: authorName,
            authorRole: authorRole,
            avatarColor: avatarColor,
            text: text,
            createdAt: new Date().toISOString(),
        };
        saveChat(__spreadArray(__spreadArray([], chatMessages, true), [msg], false));
        return { success: true };
    };
    var deleteChatMessage = function (msgId) {
        saveChat(chatMessages.filter(function (m) { return m.id !== msgId; }));
    };
    var editChatMessage = function (msgId, newText) {
        if (!newText.trim() || hasBadContent(newText))
            return;
        saveChat(chatMessages.map(function (m) { return m.id === msgId ? __assign(__assign({}, m), { text: newText.trim() + " (edited)" }) : m; }));
    };
    var toggleLike = function (postId, userId) {
        var updated = posts.map(function (p) {
            if (p.id !== postId)
                return p;
            var liked = p.likes.includes(userId);
            return __assign(__assign({}, p), { likes: liked ? p.likes.filter(function (id) { return id !== userId; }) : __spreadArray(__spreadArray([], p.likes, true), [userId], false) });
        });
        savePosts(updated);
    };
    return (<FeedContext.Provider value={{
            posts: posts,
            chatMessages: chatMessages,
            loading: loading,
            subscriptions: subscriptions,
            blocked: blocked,
            subscribe: subscribe,
            isSubscribed: isSubscribed,
            isBlocked: isBlocked,
            blockUser: blockUser,
            addPost: addPost,
            addChatMessage: addChatMessage,
            deleteChatMessage: deleteChatMessage,
            editChatMessage: editChatMessage,
            toggleLike: toggleLike,
        }}>
      {children}
    </FeedContext.Provider>);
}
function useFeed() {
    var ctx = (0, react_1.useContext)(FeedContext);
    if (!ctx)
        throw new Error("useFeed must be inside FeedProvider");
    return ctx;
}
