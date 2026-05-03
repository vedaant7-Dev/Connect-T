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
exports.default = FeedScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var expo_video_1 = require("expo-video");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var Haptics = require("expo-haptics");
var FeedContext_1 = require("@/context/FeedContext");
var AlertContext_1 = require("@/context/AlertContext");
var mumbaiServices_1 = require("@/data/mumbaiServices");
var AuthContext_1 = require("@/context/AuthContext");
var TabBarVisibilityContext_1 = require("@/context/TabBarVisibilityContext");
var DecorativeCircles_1 = require("@/components/DecorativeCircles");
var TopShade_1 = require("@/components/TopShade");
var postTypeConfig = {
    announcement: { color: "#DC2626", bg: "#FEE2E2", icon: "alert-circle" },
    update: { color: "#059669", bg: "#D1FAE5", icon: "check-circle" },
    complaint: { color: "#D97706", bg: "#FEF3C7", icon: "alert-triangle" },
    general: { color: "#EA580C", bg: "#FFEDD5", icon: "message-circle" },
};
var roleBadgeColor = {
    citizen: { bg: "#FFF7ED", text: "#EA580C" },
    nagarsevak: { bg: "#ECFDF5", text: "#059669" },
    Nagarsevak: { bg: "#ECFDF5", text: "#059669" },
    Citizen: { bg: "#FFF7ED", text: "#EA580C" },
};
function timeAgo(dateStr) {
    var diff = Date.now() - new Date(dateStr).getTime();
    var mins = Math.floor(diff / 60000);
    var hours = Math.floor(mins / 60);
    var days = Math.floor(hours / 24);
    if (days > 0)
        return "".concat(days, "d");
    if (hours > 0)
        return "".concat(hours, "h");
    if (mins > 0)
        return "".concat(mins, "m");
    return "now";
}
function Avatar(_a) {
    var name = _a.name, color = _a.color, _b = _a.size, size = _b === void 0 ? 40 : _b, photoUri = _a.photoUri;
    var initials = name.split(" ").map(function (n) { return n[0]; }).join("").slice(0, 2).toUpperCase();
    if (photoUri) {
        return <react_native_1.Image source={{ uri: photoUri }} style={{ width: size, height: size, borderRadius: size / 2 }}/>;
    }
    return (<react_native_1.View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: color, alignItems: "center", justifyContent: "center" }}>
      <react_native_1.Text style={{ fontSize: size * 0.35, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold" }}>{initials}</react_native_1.Text>
    </react_native_1.View>);
}
function InlineVideo(_a) {
    var uri = _a.uri;
    var player = (0, expo_video_1.useVideoPlayer)(uri, function (videoPlayer) {
        videoPlayer.loop = false;
    });
    return (<expo_video_1.VideoView style={styles.postVideo} player={player} allowsFullscreen allowsPictureInPicture nativeControls contentFit="cover"/>);
}
function PostCard(_a) {
    var post = _a.post, userId = _a.userId;
    var toggleLike = (0, FeedContext_1.useFeed)().toggleLike;
    var liked = post.likes.includes(userId);
    var tc = postTypeConfig[post.type];
    var roleInfo = roleBadgeColor[post.authorRole] || roleBadgeColor.citizen;
    return (<react_native_1.View style={[styles.card, post.pinned && styles.cardPinned]}>
      {post.pinned && (<react_native_1.View style={styles.pinnedBar}>
          <vector_icons_1.Feather name="bookmark" size={10} color="#7C3AED"/>
          <react_native_1.Text style={styles.pinnedText}>Pinned</react_native_1.Text>
        </react_native_1.View>)}
      <react_native_1.View style={styles.cardMeta}>
        <Avatar name={post.authorName} color={post.avatarColor} size={30}/>
        <react_native_1.Text style={styles.cardAuthor} numberOfLines={1}>{post.authorName}</react_native_1.Text>
        <react_native_1.View style={[styles.roleBadge, { backgroundColor: roleInfo.bg }]}>
          <react_native_1.Text style={[styles.roleBadgeText, { color: roleInfo.text }]}>{post.authorRole}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.cardTime}>· {timeAgo(post.createdAt)}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={[styles.typePill, { backgroundColor: tc.bg, marginBottom: 8 }]}>
        <vector_icons_1.Feather name={tc.icon} size={9} color={tc.color}/>
        <react_native_1.Text style={[styles.typePillText, { color: tc.color }]}>{post.type}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.Text style={styles.cardContent}>{post.content}</react_native_1.Text>
      {post.imageUri ? (<react_native_1.Image source={{ uri: post.imageUri }} style={styles.postImage} resizeMode="cover"/>) : null}
      <react_native_1.View style={styles.cardActions}>
        <react_native_1.TouchableOpacity style={styles.action} onPress={function () {
            if (react_native_1.Platform.OS !== "web")
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            toggleLike(post.id, userId);
        }} activeOpacity={0.8}>
          <vector_icons_1.Feather name="heart" size={15} color={liked ? "#DC2626" : "#94A3B8"}/>
          <react_native_1.Text style={[styles.actionText, liked && { color: "#DC2626" }]}>{post.likes.length > 0 ? post.likes.length : ""}</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity style={styles.action} activeOpacity={0.8}>
          <vector_icons_1.Feather name="message-circle" size={15} color="#94A3B8"/>
          <react_native_1.Text style={styles.actionText}>{post.commentsCount > 0 ? post.commentsCount : ""}</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity style={styles.action} activeOpacity={0.8}>
          <vector_icons_1.Feather name="share" size={15} color="#94A3B8"/>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
}
function shareNews(item) {
    return __awaiter(this, void 0, void 0, function () {
        var lines, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    if (react_native_1.Platform.OS !== "web")
                        Haptics.selectionAsync();
                    lines = [
                        "\uD83D\uDCF0 ".concat(item.title),
                        "",
                        item.body,
                        item.location ? "\n\uD83D\uDCCD ".concat(item.location) : "",
                        item.validUntil ? "\uD83D\uDD52 Valid until ".concat(item.validUntil) : "",
                        "\n\u2014 Posted by ".concat(item.postedBy || "Nagarsevak", " on JanSeva Ambernath"),
                    ].filter(Boolean).join("\n");
                    if (!(react_native_1.Platform.OS === "web" && (navigator === null || navigator === void 0 ? void 0 : navigator.share))) return [3 /*break*/, 2];
                    return [4 /*yield*/, navigator.share({ title: item.title, text: lines })];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, react_native_1.Share.share({ title: item.title, message: lines })];
                case 3:
                    _b.sent();
                    _b.label = 4;
                case 4: return [3 /*break*/, 6];
                case 5:
                    _a = _b.sent();
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
function NewsAlertCard(_a) {
    var _b, _c;
    var item = _a.item;
    return (<react_native_1.View style={styles.card}>
      <react_native_1.View style={styles.cardMeta}>
        <Avatar name={item.postedBy || "Nagarsevak"} color="#16A34A" size={30}/>
        <react_native_1.Text style={styles.cardAuthor} numberOfLines={1}>{item.postedBy || "Nagarsevak"}</react_native_1.Text>
        <react_native_1.View style={[styles.roleBadge, { backgroundColor: "#ECFDF5" }]}>
          <react_native_1.Text style={[styles.roleBadgeText, { color: "#059669" }]}>Nagarsevak</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.Text style={styles.cardTime}>· {timeAgo(item.createdAt)}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={[styles.typePill, { backgroundColor: "#FFEDD5", marginBottom: 8 }]}>
        <vector_icons_1.Feather name="radio" size={9} color="#EA580C"/>
        <react_native_1.Text style={[styles.typePillText, { color: "#EA580C" }]}>news</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.Text style={styles.newsTitle}>{item.title}</react_native_1.Text>
      <react_native_1.Text style={styles.cardContent}>{item.body}</react_native_1.Text>
      {((_b = item.media) === null || _b === void 0 ? void 0 : _b.type) === "image" ? (<react_native_1.Image source={{ uri: item.media.uri }} style={styles.postImage} resizeMode="cover"/>) : ((_c = item.media) === null || _c === void 0 ? void 0 : _c.type) === "video" ? (<InlineVideo uri={item.media.uri}/>) : null}
      <react_native_1.View style={styles.newsInfoRow}>
        {!!item.location && (<react_native_1.View style={styles.newsInfoChip}>
            <vector_icons_1.Feather name="map-pin" size={11} color="#64748B"/>
            <react_native_1.Text style={styles.newsInfoText}>{item.location}</react_native_1.Text>
          </react_native_1.View>)}
        {!!item.validUntil && (<react_native_1.View style={styles.newsInfoChip}>
            <vector_icons_1.Feather name="clock" size={11} color="#64748B"/>
            <react_native_1.Text style={styles.newsInfoText}>Valid until {item.validUntil}</react_native_1.Text>
          </react_native_1.View>)}
      </react_native_1.View>
      <react_native_1.View style={styles.newsActions}>
        <react_native_1.TouchableOpacity style={styles.newsShareBtn} onPress={function () { return shareNews(item); }} activeOpacity={0.85}>
          <vector_icons_1.Feather name="share-2" size={13} color="#059669"/>
          <react_native_1.Text style={styles.newsShareText}>Share</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>
    </react_native_1.View>);
}
function FeedScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var TAB_H = react_native_1.Platform.OS === "web" ? 72 : 56 + Math.max(insets.bottom, 8);
    var _a = (0, FeedContext_1.useFeed)(), posts = _a.posts, toggleLike = _a.toggleLike;
    var allAlerts = (0, AlertContext_1.useAlerts)().alerts;
    var user = (0, AuthContext_1.useAuth)().user;
    var handleScroll = (0, TabBarVisibilityContext_1.useTabBarVisibility)().handleScroll;
    var userId = (user === null || user === void 0 ? void 0 : user.id) || "guest";
    var _b = (0, react_1.useState)(""), searchQuery = _b[0], setSearchQuery = _b[1];
    var _c = (0, react_1.useState)(null), selectedWard = _c[0], setSelectedWard = _c[1];
    var rawQuery = searchQuery.trim();
    var query = rawQuery.toLowerCase();
    var wardMatch = rawQuery.match(/^(?:ward\s*|w\.?\s*)?(\d{1,3})$/i);
    var isNumericQuery = !!wardMatch;
    var wardDigits = wardMatch ? wardMatch[1] : "";
    var isTitleSearch = rawQuery.length > 0 && !isNumericQuery;
    var isSearching = rawQuery.length > 0 || !!selectedWard;
    var wardScopedAlerts = allAlerts.filter(function (a) { return !a.ward || (!!(user === null || user === void 0 ? void 0 : user.ward) && (0, AlertContext_1.wardKey)(a.ward) === (0, AlertContext_1.wardKey)(user.ward)); });
    var allNews = allAlerts.filter(function (item) { return item.type === "news"; });
    var wardNews = wardScopedAlerts.filter(function (item) { return item.type === "news"; });
    var wardSuggestions = isNumericQuery
        ? mumbaiServices_1.ambernathWards.filter(function (w) { return (0, AlertContext_1.wardKey)(w).startsWith(wardDigits); })
        : [];
    var activeTab = (0, react_1.useState)("community")[0];
    var newsItems = [];
    if (selectedWard) {
        var wKey_1 = (0, AlertContext_1.wardKey)(selectedWard);
        newsItems = allNews
            .filter(function (n) {
            if (n.ward && (0, AlertContext_1.wardKey)(n.ward) === wKey_1)
                return true;
            if (n.location) {
                var locDigits = n.location.match(/\d+/);
                if (locDigits && locDigits[0] === wKey_1)
                    return true;
            }
            return false;
        })
            .map(function (item) { return ({ kind: "news", createdAt: item.createdAt, item: item }); })
            .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
    }
    else if (isTitleSearch) {
        newsItems = allNews
            .filter(function (n) { return n.title.toLowerCase().includes(query); })
            .map(function (item) { return ({ kind: "news", createdAt: item.createdAt, item: item }); })
            .sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
    }
    else if (!isNumericQuery) {
        newsItems = __spreadArray(__spreadArray([], wardNews.map(function (item) { return ({ kind: "news", createdAt: item.createdAt, item: item }); }), true), posts.map(function (item) { return ({ kind: "post", createdAt: item.createdAt, item: item }); }), true).sort(function (a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
    }
    var clearSearch = function () {
        setSearchQuery("");
        setSelectedWard(null);
    };
    var pickWard = function (w) {
        setSelectedWard(w);
        setSearchQuery("");
    };
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12, overflow: "hidden" }]}>
        <TopShade_1.default height={100}/>
        <DecorativeCircles_1.default />
        <react_native_1.View style={styles.headerRow}>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={styles.headerTitle}>News Feed</react_native_1.Text>
            <react_native_1.Text style={styles.headerSub}>Ambernath · Community Ward Network</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={styles.searchBar}>
          <vector_icons_1.Feather name="search" size={16} color="#94A3B8"/>
          {selectedWard ? (<react_native_1.View style={styles.activeWardChip}>
              <vector_icons_1.Feather name="map-pin" size={12} color="#EA580C"/>
              <react_native_1.Text style={styles.activeWardChipText}>{selectedWard}</react_native_1.Text>
              <react_native_1.TouchableOpacity onPress={clearSearch} hitSlop={10}>
                <vector_icons_1.Feather name="x" size={13} color="#EA580C"/>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>) : (<react_native_1.TextInput value={searchQuery} onChangeText={setSearchQuery} placeholder="Search title or type ward number..." placeholderTextColor="#94A3B8" style={styles.searchInput} returnKeyType="search"/>)}
          {!selectedWard && rawQuery.length > 0 && (<react_native_1.TouchableOpacity onPress={clearSearch} hitSlop={10}>
              <vector_icons_1.Feather name="x-circle" size={16} color="#94A3B8"/>
            </react_native_1.TouchableOpacity>)}
        </react_native_1.View>
        {isNumericQuery && (<react_native_1.View style={styles.wardSuggestRow}>
            {wardSuggestions.length === 0 ? (<react_native_1.Text style={styles.searchHint}>No matching ward</react_native_1.Text>) : (wardSuggestions.slice(0, 8).map(function (w) { return (<react_native_1.TouchableOpacity key={w} style={styles.wardSuggestChip} onPress={function () { return pickWard(w); }} activeOpacity={0.85}>
                  <vector_icons_1.Feather name="map-pin" size={11} color="#C2410C"/>
                  <react_native_1.Text style={styles.wardSuggestText}>{w}</react_native_1.Text>
                </react_native_1.TouchableOpacity>); }))}
          </react_native_1.View>)}
        {(isTitleSearch || selectedWard) && (<react_native_1.Text style={styles.searchHint}>
            {selectedWard
                ? "News from ".concat(selectedWard, " \u00B7 ").concat(newsItems.length, " ").concat(newsItems.length === 1 ? "post" : "posts")
                : "".concat(newsItems.length, " ").concat(newsItems.length === 1 ? "match" : "matches", " for \"").concat(rawQuery, "\"")}
          </react_native_1.Text>)}
      </expo_linear_gradient_1.LinearGradient>

      {activeTab === "community" && (<react_native_1.FlatList data={newsItems} keyExtractor={function (p) { return p.item.id; }} renderItem={function (_a) {
            var item = _a.item;
            return item.kind === "news" ? <NewsAlertCard item={item.item}/> : <PostCard post={item.item} userId={userId}/>;
        }} contentContainerStyle={[styles.list, { paddingBottom: Math.max(insets.bottom, 8) + 20 + TAB_H }]} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16} ItemSeparatorComponent={function () { return <react_native_1.View style={styles.separator}/>; }} ListEmptyComponent={<react_native_1.View style={styles.emptyState}>
              <vector_icons_1.Feather name="inbox" size={40} color="#CBD5E1"/>
              <react_native_1.Text style={styles.emptyTitle}>No news yet</react_native_1.Text>
            </react_native_1.View>}/>)}


    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#F1F5F9" },
    header: { paddingHorizontal: 16, paddingBottom: 6, borderBottomLeftRadius: 24, borderBottomRightRadius: 24, overflow: "hidden" },
    headerRow: { flexDirection: "row", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 },
    headerTitle: { fontSize: 22, fontWeight: "800", color: "white", fontFamily: "Inter_700Bold", letterSpacing: -0.3 },
    headerSub: { fontSize: 12, color: "rgba(255,255,255,0.65)", fontFamily: "Inter_400Regular", marginTop: 2 },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        backgroundColor: "rgba(255,255,255,0.98)",
        borderRadius: 14,
        paddingHorizontal: 14,
        paddingVertical: react_native_1.Platform.OS === "ios" ? 14 : 10,
        minHeight: 48,
        marginTop: 4,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
        elevation: 2,
    },
    searchInput: { flex: 1, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular", padding: 0, outlineWidth: 0 },
    searchHint: { fontSize: 11, color: "rgba(255,255,255,0.9)", fontFamily: "Inter_600SemiBold", marginBottom: 8, marginLeft: 2 },
    wardSuggestRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 10 },
    wardSuggestChip: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 20 },
    wardSuggestText: { fontSize: 12, fontWeight: "700", color: "#C2410C", fontFamily: "Inter_700Bold" },
    activeWardChip: { flex: 1, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#FFEDD5", paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8 },
    activeWardChipText: { flex: 1, fontSize: 13, fontWeight: "700", color: "#C2410C", fontFamily: "Inter_700Bold" },
    newPostBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 14, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.25)" },
    newPostBtnText: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    backBtn: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "rgba(255,255,255,0.2)", paddingHorizontal: 12, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.3)" },
    backBtnText: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    blockedBanner: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "rgba(220,38,38,0.3)", borderRadius: 10, paddingHorizontal: 10, paddingVertical: 6, marginBottom: 10 },
    blockedBannerText: { fontSize: 11, color: "#FDE68A", fontFamily: "Inter_400Regular", flex: 1 },
    tabScroll: { flexGrow: 0 },
    tabRow: {
        flexDirection: "row",
        borderTopWidth: 1,
        borderTopColor: "rgba(255,255,255,0.15)",
        paddingTop: 10,
        paddingBottom: 6,
        paddingHorizontal: 0,
        gap: 4,
    },
    tab: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 4,
        paddingHorizontal: 4,
        paddingVertical: 7,
        borderRadius: 10,
        backgroundColor: "rgba(255,255,255,0.12)",
        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.15)",
    },
    tabActive: {
        backgroundColor: "white",
        borderColor: "white",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 4,
        elevation: 3,
    },
    tabText: { fontSize: 11, fontWeight: "600", color: "rgba(255,255,255,0.65)", fontFamily: "Inter_600SemiBold" },
    tabTextActive: { color: "#C2410C", fontFamily: "Inter_700Bold" },
    tabBadge: {
        backgroundColor: "rgba(255,255,255,0.25)",
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 3,
    },
    tabBadgeActive: { backgroundColor: "#EA580C" },
    tabBadgeText: { fontSize: 9, fontWeight: "700", color: "rgba(255,255,255,0.9)", fontFamily: "Inter_700Bold" },
    tabBadgeTextActive: { color: "white" },
    list: { paddingTop: 8 },
    separator: { height: 1, backgroundColor: "#E2E8F0" },
    card: { backgroundColor: "white", paddingHorizontal: 14, paddingTop: 12, paddingBottom: 4, width: "100%" },
    cardPinned: { borderLeftWidth: 3, borderLeftColor: "#7C3AED" },
    pinnedBar: { flexDirection: "row", alignItems: "center", gap: 5, marginBottom: 6 },
    pinnedText: { fontSize: 10, fontWeight: "700", color: "#7C3AED", fontFamily: "Inter_600SemiBold" },
    cardBody: { flexDirection: "row", gap: 12 },
    cardMeta: { flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 8 },
    cardAuthor: { fontSize: 14, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold", flex: 1 },
    cardTime: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular", flexShrink: 0 },
    roleBadge: { paddingHorizontal: 5, paddingVertical: 2, borderRadius: 10 },
    roleBadgeText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    typePill: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 7, paddingVertical: 3, borderRadius: 20, alignSelf: "flex-start", marginBottom: 6 },
    typePillText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    cardContent: { fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular", lineHeight: 21, marginBottom: 8 },
    newsTitle: { fontSize: 16, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 6 },
    postImage: { width: "100%", height: 180, borderRadius: 12, marginBottom: 10, resizeMode: "cover" },
    postVideo: { width: "100%", height: 190, borderRadius: 12, marginBottom: 10, backgroundColor: "#0F172A" },
    newsVideoBox: { height: 150, borderRadius: 12, backgroundColor: "#FFF7ED", alignItems: "center", justifyContent: "center", gap: 6, marginBottom: 10 },
    newsVideoText: { fontSize: 12, fontWeight: "800", color: "#EA580C", fontFamily: "Inter_700Bold" },
    newsInfoRow: { flexDirection: "row", flexWrap: "wrap", gap: 6, marginBottom: 8 },
    newsInfoChip: { flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: "#F8FAFC", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 5 },
    newsInfoText: { fontSize: 11, color: "#64748B", fontFamily: "Inter_600SemiBold", fontWeight: "600" },
    newsActions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 8, paddingTop: 10, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
    newsShareBtn: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#ECFDF5", paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
    newsShareText: { fontSize: 12, fontWeight: "700", color: "#059669", fontFamily: "Inter_700Bold" },
    cardActions: { flexDirection: "row", marginTop: 4, marginBottom: 10, justifyContent: "space-between" },
    action: { flexDirection: "row", alignItems: "center", gap: 4, paddingVertical: 4, paddingHorizontal: 4 },
    actionText: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    cmpAvatar: { width: 42, height: 42, borderRadius: 12, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    cmpPhotoPlaceholder: { width: "100%", height: 100, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 8 },
    resolvedNote: { flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: "#D1FAE5", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5, marginBottom: 8 },
    resolvedNoteText: { fontSize: 11, color: "#059669", fontFamily: "Inter_400Regular", flex: 1 },
    chatList: { paddingTop: 16, paddingHorizontal: 12 },
    bubble: { flexDirection: "row", gap: 8, marginBottom: 12, alignItems: "flex-end" },
    bubbleMe: { flexDirection: "row-reverse" },
    bubbleContent: { maxWidth: "78%", backgroundColor: "white", borderRadius: 18, borderBottomLeftRadius: 4, padding: 12, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.06, shadowRadius: 4, elevation: 1 },
    bubbleContentMe: { backgroundColor: "#EA580C", borderBottomLeftRadius: 18, borderBottomRightRadius: 4 },
    bubbleName: { fontSize: 12, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold" },
    bubbleText: { fontSize: 14, color: "#334155", fontFamily: "Inter_400Regular", lineHeight: 20 },
    bubbleTextMe: { color: "white" },
    bubbleTime: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 4 },
    chatWarningBanner: { backgroundColor: "#FEF2F2", borderTopWidth: 1, borderTopColor: "#FECACA", paddingHorizontal: 14, paddingVertical: 8 },
    chatWarningText: { fontSize: 12, color: "#DC2626", fontFamily: "Inter_400Regular", lineHeight: 18 },
    chatInputBar: {
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
        paddingHorizontal: 12,
        paddingTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
    },
    chatInputRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    chatCameraWrap: { borderRadius: 22, overflow: "hidden", flexShrink: 0 },
    chatCameraGrad: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
    chatCameraBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#FFEDD5", alignItems: "center", justifyContent: "center" },
    chatInputPill: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F1F5F9",
        borderRadius: 24,
        paddingHorizontal: 14,
        paddingVertical: 6,
        minHeight: 44,
        maxHeight: 110,
        borderWidth: 1,
        borderColor: "#E2E8F0",
    },
    chatInputCard: { flex: 1, flexDirection: "row", alignItems: "center", paddingLeft: 4, paddingRight: 6, paddingVertical: 6, minHeight: 42, maxHeight: 110 },
    chatInput: { flex: 1, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular", lineHeight: 20, padding: 0, margin: 0, outlineWidth: 0, caretColor: "#EA580C" },
    chatEmojiBtn: { width: 32, height: 32, alignItems: "center", justifyContent: "center" },
    chatSendBtn: { borderRadius: 22, overflow: "hidden", flexShrink: 0 },
    chatSendGrad: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
    chatMicBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center" },
    chatIdleIcons: { flexDirection: "row", alignItems: "center", gap: 2, flexShrink: 0 },
    chatIconBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
    chatIdleActions: { flexDirection: "row", alignItems: "center" },
    chatIdleBtn: { width: 38, height: 38, alignItems: "center", justifyContent: "center" },
    blockedScreen: { flex: 1, alignItems: "center", justifyContent: "center", padding: 32, gap: 12 },
    blockedScreenTitle: { fontSize: 20, fontWeight: "700", color: "#DC2626", fontFamily: "Inter_700Bold", textAlign: "center" },
    blockedScreenSub: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular", textAlign: "center", lineHeight: 22 },
    actionOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "flex-end" },
    actionSheet: { backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingHorizontal: 8, paddingTop: 12, paddingBottom: 32 },
    actionHandle: { width: 36, height: 4, borderRadius: 2, backgroundColor: "#E2E8F0", alignSelf: "center", marginBottom: 10 },
    actionPreview: { marginHorizontal: 8, marginBottom: 6, padding: 12, backgroundColor: "#F8FAFC", borderRadius: 14 },
    actionPreviewText: { fontSize: 14, color: "#64748B", fontFamily: "Inter_400Regular", lineHeight: 20 },
    actionItem: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: 20, paddingVertical: 16 },
    actionItemText: { fontSize: 16, color: "#0F172A", fontFamily: "Inter_400Regular" },
    actionDivider: { height: 1, backgroundColor: "#F1F5F9", marginHorizontal: 8 },
    editModalTitle: { fontSize: 16, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold", paddingHorizontal: 20, marginBottom: 12 },
    editModalInput: { marginHorizontal: 12, backgroundColor: "#F8FAFC", borderRadius: 14, borderWidth: 1.5, borderColor: "#E2E8F0", paddingHorizontal: 14, paddingVertical: 12, fontSize: 15, color: "#0F172A", fontFamily: "Inter_400Regular", minHeight: 80, marginBottom: 14, outlineWidth: 0 },
    editModalSave: { marginHorizontal: 12, borderRadius: 14, overflow: "hidden" },
    editModalSaveGrad: { paddingVertical: 14, alignItems: "center", justifyContent: "center" },
    editModalSaveText: { fontSize: 15, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
    emptyState: { alignItems: "center", paddingTop: 60, gap: 8 },
    emptyTitle: { fontSize: 15, fontWeight: "700", color: "#94A3B8", fontFamily: "Inter_700Bold" },
    composeBar: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "white", borderTopWidth: 1, borderTopColor: "#E2E8F0", paddingHorizontal: 12, paddingTop: 10, shadowColor: "#000", shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 8 },
    composeInner: { flexDirection: "row", alignItems: "center", gap: 10, backgroundColor: "#F8FAFC", borderRadius: 24, paddingHorizontal: 12, paddingVertical: 8, borderWidth: 1, borderColor: "#E2E8F0" },
    composePlaceholder: { flex: 1, fontSize: 14, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    composeImgBtn: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
    composeSendWrap: { borderRadius: 16, overflow: "hidden" },
    composeSendGrad: { width: 34, height: 34, borderRadius: 17, alignItems: "center", justifyContent: "center" },
});
var modalStyles = react_native_1.StyleSheet.create({
    overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "flex-end" },
    sheet: { backgroundColor: "white", borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 32, gap: 10 },
    handle: { width: 36, height: 4, borderRadius: 2, backgroundColor: "#E2E8F0", alignSelf: "center", marginBottom: 4 },
    title: { fontSize: 18, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    label: { fontSize: 10, fontWeight: "700", color: "#94A3B8", letterSpacing: 1.2, fontFamily: "Inter_600SemiBold" },
    closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#F1F5F9", alignItems: "center", justifyContent: "center" },
    typeBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
    typeBtnText: { fontSize: 12, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    textInput: { backgroundColor: "#F8FAFC", borderRadius: 14, borderWidth: 1.5, borderColor: "#E2E8F0", paddingHorizontal: 14, paddingVertical: 12, fontSize: 14, color: "#0F172A", fontFamily: "Inter_400Regular", minHeight: 100, outlineWidth: 0 },
    charCount: { fontSize: 10, color: "#CBD5E1", alignSelf: "flex-end", fontFamily: "Inter_400Regular" },
    removeImg: { position: "absolute", top: 8, right: 8, width: 26, height: 26, borderRadius: 13, backgroundColor: "rgba(0,0,0,0.6)", alignItems: "center", justifyContent: "center" },
    btnRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
    imgBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 10, paddingHorizontal: 12, borderRadius: 12, backgroundColor: "#FFF7ED", borderWidth: 1, borderColor: "#FED7AA" },
    imgBtnText: { fontSize: 13, fontWeight: "700", color: "#EA580C", fontFamily: "Inter_600SemiBold" },
    cancelBtn: { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "#F1F5F9" },
    cancelBtnText: { fontSize: 13, fontWeight: "700", color: "#64748B", fontFamily: "Inter_700Bold" },
    postBtnWrap: { borderRadius: 12, overflow: "hidden" },
    postBtn: { flexDirection: "row", alignItems: "center", gap: 6, paddingVertical: 12, paddingHorizontal: 18 },
    postBtnText: { fontSize: 13, fontWeight: "700", color: "white", fontFamily: "Inter_700Bold" },
});
