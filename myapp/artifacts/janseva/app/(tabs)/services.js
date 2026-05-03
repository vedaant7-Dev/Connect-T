"use strict";
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
exports.default = ServicesScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var Haptics = require("expo-haptics");
var mumbaiServices_1 = require("@/data/mumbaiServices");
var TabBarVisibilityContext_1 = require("@/context/TabBarVisibilityContext");
function StarRow(_a) {
    var rating = _a.rating;
    if (!rating)
        return null;
    return (<react_native_1.View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map(function (s) { return (<vector_icons_1.Feather key={s} name="star" size={10} color={s <= Math.round(rating) ? "#F59E0B" : "#E2E8F0"}/>); })}
      <react_native_1.Text style={{ fontSize: 10, color: "#94A3B8", marginLeft: 2 }}>{rating.toFixed(1)}</react_native_1.Text>
    </react_native_1.View>);
}
function PlaceCard(_a) {
    var place = _a.place, categoryColor = _a.categoryColor, categoryBg = _a.categoryBg, categoryId = _a.categoryId;
    var handleTap = function () {
        if (react_native_1.Platform.OS !== "web")
            Haptics.selectionAsync();
        expo_router_1.router.push({
            pathname: "/service/[id]",
            params: { id: place.id, category: categoryId },
        });
    };
    var bedsAvailable = place.beds !== undefined && place.bedsOccupied !== undefined
        ? place.beds - place.bedsOccupied
        : null;
    var bedsFillPct = place.beds && place.bedsOccupied !== undefined
        ? (place.bedsOccupied / place.beds) * 100
        : null;
    return (<react_native_1.TouchableOpacity style={styles.placeCard} onPress={handleTap} activeOpacity={0.88}>
      <react_native_1.View style={styles.placeCardTop}>
        <react_native_1.View style={[styles.placeIconBadge, { backgroundColor: categoryBg }]}>
          <vector_icons_1.Feather name="map-pin" size={15} color={categoryColor}/>
        </react_native_1.View>
        <react_native_1.View style={styles.placeInfo}>
          <react_native_1.Text style={styles.placeName} numberOfLines={2}>{place.name}</react_native_1.Text>
          <react_native_1.Text style={styles.placeAddress} numberOfLines={1}>{place.address}</react_native_1.Text>
          <react_native_1.View style={styles.placeTagRow}>
            {place.speciality && (<react_native_1.View style={[styles.placeTag, { backgroundColor: categoryBg }]}>
                <react_native_1.Text style={[styles.placeTagText, { color: categoryColor }]}>{place.speciality}</react_native_1.Text>
              </react_native_1.View>)}
            {place.govtType && (<react_native_1.View style={[styles.placeTag, { backgroundColor: "#F1F5F9" }]}>
                <react_native_1.Text style={[styles.placeTagText, { color: "#64748B" }]}>{place.govtType}</react_native_1.Text>
              </react_native_1.View>)}
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={styles.placeRight}>
          <react_native_1.View style={[styles.distanceBadge, { backgroundColor: categoryBg }]}>
            <vector_icons_1.Feather name="navigation" size={10} color={categoryColor}/>
            <react_native_1.Text style={styles.distanceText}>{place.distance}</react_native_1.Text>
          </react_native_1.View>
          {place.timing && (<react_native_1.Text style={styles.timingText} numberOfLines={1}>{place.timing}</react_native_1.Text>)}
        </react_native_1.View>
      </react_native_1.View>

      {/* Rating + Beds mini strip */}
      <react_native_1.View style={styles.placeBottomRow}>
        {place.rating !== undefined && (<StarRow rating={place.rating}/>)}
        {place.reviewCount !== undefined && (<react_native_1.Text style={styles.reviewCountText}>{place.reviewCount} reviews</react_native_1.Text>)}
        <react_native_1.View style={{ flex: 1 }}/>
        {place.beds !== undefined && bedsAvailable !== null && (<react_native_1.View style={styles.bedsMini}>
            <react_native_1.View style={[styles.bedsDot, { backgroundColor: (bedsFillPct !== null && bedsFillPct !== void 0 ? bedsFillPct : 0) > 85 ? "#DC2626" : (bedsFillPct !== null && bedsFillPct !== void 0 ? bedsFillPct : 0) > 65 ? "#D97706" : "#059669" }]}/>
            <react_native_1.Text style={styles.bedsText}>{bedsAvailable} beds free</react_native_1.Text>
          </react_native_1.View>)}
        <vector_icons_1.Feather name="chevron-right" size={14} color="#CBD5E1"/>
      </react_native_1.View>

      {/* Quick contacts */}
      {place.contacts.slice(0, 2).map(function (c, i) { return (<react_native_1.View key={i} style={[styles.quickContact, { borderTopColor: categoryColor + "18" }]}>
          <react_native_1.View style={[styles.quickContactIcon, { backgroundColor: "#E2E8F0" }]}>
            <vector_icons_1.Feather name="phone" size={11} color="#0F172A"/>
          </react_native_1.View>
          <react_native_1.Text style={styles.quickContactRole}>{c.role || c.name}</react_native_1.Text>
          <react_native_1.Text style={styles.quickContactPhone}>{c.phone}</react_native_1.Text>
        </react_native_1.View>); })}
      {place.contacts.length > 2 && (<react_native_1.TouchableOpacity style={styles.moreContacts} onPress={handleTap} activeOpacity={0.8}>
          <react_native_1.Text style={styles.moreContactsText}>
            +{place.contacts.length - 2} more contacts — Tap to view all details
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>)}
    </react_native_1.TouchableOpacity>);
}
function ServicesScreen() {
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 67 : insets.top;
    var params = (0, expo_router_1.useLocalSearchParams)();
    var handleScroll = (0, TabBarVisibilityContext_1.useTabBarVisibility)().handleScroll;
    var _a = (0, react_1.useState)(mumbaiServices_1.serviceCategories[0]), selectedCat = _a[0], setSelectedCat = _a[1];
    (0, react_1.useEffect)(function () {
        if (params.category) {
            var cat = mumbaiServices_1.serviceCategories.find(function (c) { return c.id === params.category; });
            if (cat)
                setSelectedCat(cat);
        }
    }, [params.category]);
    var sortedData = __spreadArray([], selectedCat.data, true).sort(function (a, b) { return a.distanceKm - b.distanceKm; });
    return (<react_native_1.View style={styles.root}>
      <expo_linear_gradient_1.LinearGradient colors={["#C2410C", "#EA580C", "#F97316", "#FB923C"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 12 }]}>
        <react_native_1.TouchableOpacity onPress={function () { return expo_router_1.router.back(); }} style={styles.backBtn} activeOpacity={0.8}>
          <vector_icons_1.Feather name="chevron-left" size={20} color="white"/>
          <react_native_1.Text style={styles.backBtnText}>Back</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={styles.headerTitle}>Nearby Services</react_native_1.Text>
        <react_native_1.Text style={styles.headerSub}>Ambernath — Sorted by distance</react_native_1.Text>

        <react_native_1.ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
          {mumbaiServices_1.serviceCategories.map(function (cat) { return (<react_native_1.TouchableOpacity key={cat.id} style={[
                styles.chip,
                selectedCat.id === cat.id ? styles.chipActive : styles.chipInactive,
            ]} onPress={function () { return setSelectedCat(cat); }} activeOpacity={0.8}>
              <vector_icons_1.Feather name={cat.icon} size={12} color={selectedCat.id === cat.id ? "white" : "rgba(255,255,255,0.7)"}/>
              <react_native_1.Text style={[
                styles.chipText,
                { color: selectedCat.id === cat.id ? "white" : "rgba(255,255,255,0.7)" },
            ]}>
                {cat.label}
              </react_native_1.Text>
            </react_native_1.TouchableOpacity>); })}
        </react_native_1.ScrollView>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.View style={styles.resultsBar}>
        <react_native_1.View style={[styles.catDot, { backgroundColor: selectedCat.color }]}/>
        <react_native_1.Text style={styles.resultsText}>
          {sortedData.length} {selectedCat.label.toLowerCase()} near you
        </react_native_1.Text>
      </react_native_1.View>

      <react_native_1.FlatList data={sortedData} keyExtractor={function (item) { return item.id; }} renderItem={function (_a) {
            var item = _a.item;
            return (<PlaceCard place={item} categoryColor={selectedCat.color} categoryBg={selectedCat.bgColor} categoryId={selectedCat.id}/>);
        }} contentContainerStyle={[styles.listContent, { paddingBottom: Math.max(insets.bottom, 8) + 80 }]} showsVerticalScrollIndicator={false} onScroll={handleScroll} scrollEventThrottle={16}/>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 14, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
    backBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        marginBottom: 10,
        alignSelf: "flex-start",
        paddingVertical: 4,
        paddingRight: 8,
        paddingLeft: 2,
    },
    backBtnText: {
        color: "rgba(255,255,255,0.92)",
        fontSize: 14,
        fontWeight: "600",
        fontFamily: "Inter_600SemiBold",
    },
    headerTitle: {
        fontSize: 22, fontWeight: "800", color: "#FFFFFF",
        fontFamily: "Inter_700Bold", letterSpacing: -0.3, marginBottom: 2,
    },
    headerSub: {
        fontSize: 12, color: "rgba(255,255,255,0.65)",
        fontFamily: "Inter_400Regular", marginBottom: 14,
    },
    chipRow: { gap: 8, paddingRight: 8 },
    chip: {
        flexDirection: "row", alignItems: "center",
        gap: 5, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 20,
    },
    chipActive: { backgroundColor: "rgba(255,255,255,0.25)" },
    chipInactive: { backgroundColor: "rgba(255,255,255,0.1)" },
    chipText: { fontSize: 11, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    resultsBar: {
        flexDirection: "row", alignItems: "center", gap: 8,
        paddingHorizontal: 16, paddingVertical: 10,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1, borderBottomColor: "#F1F5F9",
    },
    catDot: { width: 8, height: 8, borderRadius: 4 },
    resultsText: {
        fontSize: 12, color: "#64748B",
        fontFamily: "Inter_500Medium", fontWeight: "600",
    },
    listContent: { padding: 14 },
    placeCard: {
        backgroundColor: "#FFFFFF", borderRadius: 16, marginBottom: 12,
        overflow: "hidden",
        shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08, shadowRadius: 8, elevation: 2,
    },
    placeCardTop: {
        flexDirection: "row", padding: 14, alignItems: "flex-start", gap: 10,
    },
    placeIconBadge: {
        width: 38, height: 38, borderRadius: 11,
        alignItems: "center", justifyContent: "center", flexShrink: 0,
    },
    placeInfo: { flex: 1 },
    placeName: {
        fontSize: 14, fontWeight: "700", color: "#0F172A",
        fontFamily: "Inter_700Bold", marginBottom: 2,
    },
    placeAddress: {
        fontSize: 11, color: "#64748B",
        fontFamily: "Inter_400Regular", marginBottom: 6,
    },
    placeTagRow: { flexDirection: "row", gap: 5, flexWrap: "wrap" },
    placeTag: { paddingHorizontal: 7, paddingVertical: 2, borderRadius: 20 },
    placeTagText: { fontSize: 9, fontWeight: "700", fontFamily: "Inter_600SemiBold" },
    placeRight: { alignItems: "flex-end", flexShrink: 0 },
    distanceBadge: {
        flexDirection: "row", alignItems: "center", gap: 3,
        paddingHorizontal: 8, paddingVertical: 4, borderRadius: 20,
    },
    distanceText: { fontSize: 11, fontWeight: "700", fontFamily: "Inter_600SemiBold", color: "#374151" },
    timingText: {
        fontSize: 9, color: "#94A3B8", marginTop: 4,
        fontFamily: "Inter_400Regular", maxWidth: 80, textAlign: "right",
    },
    placeBottomRow: {
        flexDirection: "row", alignItems: "center", gap: 8,
        paddingHorizontal: 14, paddingBottom: 10, flexWrap: "wrap",
    },
    reviewCountText: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    bedsMini: { flexDirection: "row", alignItems: "center", gap: 4 },
    bedsDot: { width: 7, height: 7, borderRadius: 4 },
    bedsText: { fontSize: 10, color: "#64748B", fontFamily: "Inter_400Regular" },
    quickContact: {
        flexDirection: "row", alignItems: "center", gap: 8,
        paddingHorizontal: 14, paddingVertical: 8,
        borderTopWidth: 1,
    },
    quickContactIcon: {
        width: 24, height: 24, borderRadius: 7,
        alignItems: "center", justifyContent: "center",
    },
    quickContactRole: {
        fontSize: 11, color: "#374151",
        fontFamily: "Inter_400Regular", flex: 1,
    },
    quickContactPhone: {
        fontSize: 12, fontWeight: "700", fontFamily: "Inter_700Bold", color: "#0F172A",
    },
    moreContacts: {
        paddingHorizontal: 14, paddingVertical: 8,
        borderTopWidth: 1, borderTopColor: "#F1F5F9",
    },
    moreContactsText: {
        fontSize: 11, fontFamily: "Inter_500Medium", fontWeight: "600", color: "#374151",
    },
});
