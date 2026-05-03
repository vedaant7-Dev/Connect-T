"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ServiceDetailScreen;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
var vector_icons_1 = require("@expo/vector-icons");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var expo_router_1 = require("expo-router");
var Haptics = require("expo-haptics");
var mumbaiServices_1 = require("@/data/mumbaiServices");
var ServiceMap_1 = require("@/components/ServiceMap");
function StarRating(_a) {
    var rating = _a.rating, _b = _a.size, size = _b === void 0 ? 13 : _b;
    return (<react_native_1.View style={{ flexDirection: "row", gap: 2 }}>
      {[1, 2, 3, 4, 5].map(function (s) { return (<vector_icons_1.Feather key={s} name={s <= Math.round(rating) ? "star" : "star"} size={size} color={s <= Math.round(rating) ? "#F59E0B" : "#E2E8F0"}/>); })}
    </react_native_1.View>);
}
function ServiceDetailScreen() {
    var _a;
    var insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    var topPad = react_native_1.Platform.OS === "web" ? 44 : insets.top;
    var params = (0, expo_router_1.useLocalSearchParams)();
    var category = mumbaiServices_1.serviceCategories.find(function (c) { return c.id === params.category; });
    var place = category === null || category === void 0 ? void 0 : category.data.find(function (p) { return p.id === params.id; });
    var handleCall = function (phone) {
        if (react_native_1.Platform.OS !== "web")
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        react_native_1.Linking.openURL("tel:".concat(phone));
    };
    if (!place || !category) {
        return (<react_native_1.View style={[styles.root, { justifyContent: "center", alignItems: "center" }]}>
        <vector_icons_1.Feather name="alert-circle" size={40} color="#DC2626"/>
        <react_native_1.Text style={{ marginTop: 12, fontSize: 16, color: "#64748B" }}>Place not found</react_native_1.Text>
        
      </react_native_1.View>);
    }
    var bedsAvailable = place.beds && place.bedsOccupied !== undefined
        ? place.beds - place.bedsOccupied
        : null;
    var bedsFillPct = place.beds && place.bedsOccupied !== undefined
        ? (place.bedsOccupied / place.beds) * 100
        : null;
    var govtColors = {
        Government: { bg: "#D1FAE5", text: "#059669" },
        Municipal: { bg: "#FFEDD5", text: "#B45309" },
        Private: { bg: "#F5F3FF", text: "#7C3AED" },
        Trust: { bg: "#FEF3C7", text: "#D97706" },
    };
    var govtStyle = place.govtType ? ((_a = govtColors[place.govtType]) !== null && _a !== void 0 ? _a : { bg: "#F1F5F9", text: "#64748B" }) : { bg: "#F1F5F9", text: "#64748B" };
    return (<react_native_1.View style={styles.root}>
      {/* Header */}
      <expo_linear_gradient_1.LinearGradient colors={[category.color, category.color + "CC"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.header, { paddingTop: topPad + 10 }]}>
        <react_native_1.TouchableOpacity onPress={function () { return expo_router_1.router.back(); }} style={styles.backBtn} activeOpacity={0.8}>
          <vector_icons_1.Feather name="chevron-left" size={20} color="white"/>
          <react_native_1.Text style={styles.backBtnText}>Back</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.View style={styles.headerContent}>
          <react_native_1.View style={[styles.headerIconCircle, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
            <vector_icons_1.Feather name={category.icon} size={28} color="white"/>
          </react_native_1.View>
          <react_native_1.Text style={styles.headerName} numberOfLines={2}>{place.name}</react_native_1.Text>
          <react_native_1.View style={styles.headerMeta}>
            {place.govtType && (<react_native_1.View style={[styles.govtBadge, { backgroundColor: "rgba(255,255,255,0.2)" }]}>
                <react_native_1.Text style={styles.govtBadgeText}>{place.govtType}</react_native_1.Text>
              </react_native_1.View>)}
            {place.speciality && (<react_native_1.View style={[styles.govtBadge, { backgroundColor: "rgba(255,255,255,0.15)" }]}>
                <react_native_1.Text style={styles.govtBadgeText}>{place.speciality}</react_native_1.Text>
              </react_native_1.View>)}
          </react_native_1.View>
          <react_native_1.View style={styles.headerInfoRow}>
            <vector_icons_1.Feather name="navigation" size={12} color="rgba(255,255,255,0.8)"/>
            <react_native_1.Text style={styles.headerInfoText}>{place.distance}</react_native_1.Text>
            {place.timing && (<>
                <react_native_1.View style={styles.headerInfoDot}/>
                <vector_icons_1.Feather name="clock" size={12} color="rgba(255,255,255,0.8)"/>
                <react_native_1.Text style={styles.headerInfoText}>{place.timing}</react_native_1.Text>
              </>)}
          </react_native_1.View>
        </react_native_1.View>
      </expo_linear_gradient_1.LinearGradient>

      <react_native_1.ScrollView style={styles.scroll} contentContainerStyle={[styles.scrollContent, { paddingBottom: Math.max(insets.bottom, 8) + 24 }]} showsVerticalScrollIndicator={false}>

        {/* Address */}
        <react_native_1.View style={styles.section}>
          <react_native_1.View style={styles.addressRow}>
            <react_native_1.View style={[styles.addressIcon, { backgroundColor: category.bgColor }]}>
              <vector_icons_1.Feather name="map-pin" size={16} color={category.color}/>
            </react_native_1.View>
            <react_native_1.Text style={styles.addressText}>{place.address}</react_native_1.Text>
          </react_native_1.View>
          {place.established && (<react_native_1.View style={styles.establishedRow}>
              <vector_icons_1.Feather name="calendar" size={12} color="#94A3B8"/>
              <react_native_1.Text style={styles.establishedText}>Established {place.established}</react_native_1.Text>
            </react_native_1.View>)}
        </react_native_1.View>

        {/* Map */}
        <ServiceMap_1.ServiceMap address={place.address} name={place.name} color={category.color} bgColor={category.bgColor}/>

        {/* Rating */}
        {place.rating !== undefined && (<react_native_1.View style={styles.ratingSection}>
            <react_native_1.View style={styles.ratingLeft}>
              <react_native_1.Text style={[styles.ratingBig, { color: category.color }]}>{place.rating.toFixed(1)}</react_native_1.Text>
              <StarRating rating={place.rating} size={14}/>
              {place.reviewCount !== undefined && (<react_native_1.Text style={styles.reviewCount}>{place.reviewCount} reviews</react_native_1.Text>)}
            </react_native_1.View>
            {place.reviews && place.reviews.length > 0 && (<>
                <react_native_1.View style={styles.ratingDivider}/>
                <react_native_1.View style={styles.ratingRight}>
                  {[5, 4, 3, 2, 1].map(function (star) {
                    var count = place.reviews.filter(function (r) { return Math.round(r.rating) === star; }).length;
                    var pct = place.reviewCount ? (count / place.reviewCount) * 100 : 0;
                    return (<react_native_1.View key={star} style={styles.ratingBar}>
                        <react_native_1.Text style={styles.ratingBarLabel}>{star}</react_native_1.Text>
                        <react_native_1.View style={styles.ratingBarTrack}>
                          <react_native_1.View style={[styles.ratingBarFill, { width: "".concat(pct, "%"), backgroundColor: category.color }]}/>
                        </react_native_1.View>
                      </react_native_1.View>);
                })}
                </react_native_1.View>
              </>)}
          </react_native_1.View>)}

        {/* Bed Availability */}
        {place.beds !== undefined && place.bedsOccupied !== undefined && (<react_native_1.View style={styles.card}>
            <react_native_1.View style={styles.cardHeader}>
              <react_native_1.View style={[styles.cardHeaderIcon, { backgroundColor: category.bgColor }]}>
                <vector_icons_1.Feather name="activity" size={16} color={category.color}/>
              </react_native_1.View>
              <react_native_1.Text style={styles.cardTitle}>Bed Availability</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.bedStats}>
              <react_native_1.View style={styles.bedStat}>
                <react_native_1.Text style={styles.bedNum}>{place.beds}</react_native_1.Text>
                <react_native_1.Text style={styles.bedLabel}>Total Beds</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={styles.bedStat}>
                <react_native_1.Text style={[styles.bedNum, { color: "#DC2626" }]}>{place.bedsOccupied}</react_native_1.Text>
                <react_native_1.Text style={styles.bedLabel}>Occupied</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={styles.bedStat}>
                <react_native_1.Text style={[styles.bedNum, { color: "#059669" }]}>{bedsAvailable}</react_native_1.Text>
                <react_native_1.Text style={styles.bedLabel}>Available</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
            <react_native_1.View style={styles.bedBarTrack}>
              <react_native_1.View style={[
                styles.bedBarFill,
                {
                    width: "".concat(bedsFillPct === null || bedsFillPct === void 0 ? void 0 : bedsFillPct.toFixed(0), "%"),
                    backgroundColor: (bedsFillPct !== null && bedsFillPct !== void 0 ? bedsFillPct : 0) > 85 ? "#DC2626" : (bedsFillPct !== null && bedsFillPct !== void 0 ? bedsFillPct : 0) > 65 ? "#D97706" : "#059669",
                },
            ]}/>
            </react_native_1.View>
            <react_native_1.Text style={styles.bedBarLabel}>
              {bedsFillPct === null || bedsFillPct === void 0 ? void 0 : bedsFillPct.toFixed(0)}% occupancy
              {(bedsFillPct !== null && bedsFillPct !== void 0 ? bedsFillPct : 0) > 85 ? " — Nearly Full" : (bedsFillPct !== null && bedsFillPct !== void 0 ? bedsFillPct : 0) > 65 ? " — Moderately Full" : " — Beds Available"}
            </react_native_1.Text>
          </react_native_1.View>)}

        {/* Services Provided */}
        {place.services && place.services.length > 0 && (<react_native_1.View style={styles.card}>
            <react_native_1.View style={styles.cardHeader}>
              <react_native_1.View style={[styles.cardHeaderIcon, { backgroundColor: category.bgColor }]}>
                <vector_icons_1.Feather name="list" size={16} color={category.color}/>
              </react_native_1.View>
              <react_native_1.Text style={styles.cardTitle}>Services Provided</react_native_1.Text>
            </react_native_1.View>
            {place.services.map(function (svc, i) { return (<react_native_1.View key={i} style={styles.serviceRow}>
                <react_native_1.View style={[styles.serviceDot, { backgroundColor: category.color }]}/>
                <react_native_1.Text style={styles.serviceRowText}>{svc}</react_native_1.Text>
              </react_native_1.View>); })}
          </react_native_1.View>)}

        {/* Contact Numbers */}
        <react_native_1.View style={styles.card}>
          <react_native_1.View style={styles.cardHeader}>
            <react_native_1.View style={[styles.cardHeaderIcon, { backgroundColor: category.bgColor }]}>
              <vector_icons_1.Feather name="phone" size={16} color={category.color}/>
            </react_native_1.View>
            <react_native_1.Text style={styles.cardTitle}>Contact Numbers</react_native_1.Text>
          </react_native_1.View>
          {place.contacts.map(function (contact, i) { return (<react_native_1.TouchableOpacity key={i} style={[styles.contactRow, { borderColor: category.color + "25" }]} onPress={function () { return handleCall(contact.phone); }} activeOpacity={0.75}>
              <react_native_1.View style={[styles.contactIconBox, { backgroundColor: category.bgColor }]}>
                <vector_icons_1.Feather name="phone-call" size={14} color={category.color}/>
              </react_native_1.View>
              <react_native_1.View style={styles.contactInfo}>
                <react_native_1.Text style={styles.contactRole}>{contact.role || contact.name}</react_native_1.Text>
                <react_native_1.Text style={styles.contactPhone}>{contact.phone}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={[styles.callBtn, { backgroundColor: category.color }]}>
                <vector_icons_1.Feather name="phone" size={13} color="white"/>
                <react_native_1.Text style={styles.callBtnText}>Call</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.TouchableOpacity>); })}
        </react_native_1.View>

        {/* Reviews */}
        {place.reviews && place.reviews.length > 0 && (<react_native_1.View style={styles.card}>
            <react_native_1.View style={styles.cardHeader}>
              <react_native_1.View style={[styles.cardHeaderIcon, { backgroundColor: category.bgColor }]}>
                <vector_icons_1.Feather name="message-square" size={16} color={category.color}/>
              </react_native_1.View>
              <react_native_1.Text style={styles.cardTitle}>Recent Reviews</react_native_1.Text>
            </react_native_1.View>
            {place.reviews.map(function (review, i) { return (<react_native_1.View key={i} style={[styles.reviewRow, i < place.reviews.length - 1 && styles.reviewRowBorder]}>
                <react_native_1.View style={styles.reviewTop}>
                  <react_native_1.View style={[styles.reviewAvatar, { backgroundColor: category.bgColor }]}>
                    <react_native_1.Text style={[styles.reviewAvatarText, { color: category.color }]}>
                      {review.reviewer.charAt(0).toUpperCase()}
                    </react_native_1.Text>
                  </react_native_1.View>
                  <react_native_1.View style={styles.reviewMeta}>
                    <react_native_1.Text style={styles.reviewName}>{review.reviewer}</react_native_1.Text>
                    <react_native_1.View style={styles.reviewStarRow}>
                      <StarRating rating={review.rating} size={11}/>
                      <react_native_1.Text style={styles.reviewDate}>{review.date}</react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>
                </react_native_1.View>
                <react_native_1.Text style={styles.reviewComment}>{review.comment}</react_native_1.Text>
              </react_native_1.View>); })}
          </react_native_1.View>)}

        <react_native_1.View style={{ height: 20 }}/>
      </react_native_1.ScrollView>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    root: { flex: 1, backgroundColor: "#ebeffc" },
    header: { paddingHorizontal: 20, paddingBottom: 24 },
    headerBack: {
        width: 38, height: 38, borderRadius: 12,
        backgroundColor: "rgba(255,255,255,0.2)",
        alignItems: "center", justifyContent: "center",
        marginBottom: 16,
    },
    headerContent: { alignItems: "center" },
    headerIconCircle: {
        width: 72, height: 72, borderRadius: 22,
        alignItems: "center", justifyContent: "center",
        marginBottom: 12,
    },
    headerName: {
        fontSize: 20, fontWeight: "900", color: "white",
        fontFamily: "Inter_700Bold", textAlign: "center", marginBottom: 10,
        letterSpacing: -0.3,
    },
    headerMeta: { flexDirection: "row", gap: 6, flexWrap: "wrap", justifyContent: "center", marginBottom: 10 },
    govtBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20 },
    govtBadgeText: { fontSize: 11, fontWeight: "700", color: "white", fontFamily: "Inter_600SemiBold" },
    headerInfoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
    headerInfoText: { fontSize: 12, color: "rgba(255,255,255,0.85)", fontFamily: "Inter_400Regular" },
    headerInfoDot: { width: 3, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.5)" },
    scroll: { flex: 1 },
    scrollContent: { padding: 16, paddingBottom: 40 },
    section: {
        backgroundColor: "white", borderRadius: 16, padding: 14, marginBottom: 12,
        shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
    },
    addressRow: { flexDirection: "row", alignItems: "flex-start", gap: 10 },
    addressIcon: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    addressText: { flex: 1, fontSize: 13, color: "#374151", fontFamily: "Inter_400Regular", lineHeight: 19 },
    establishedRow: { flexDirection: "row", alignItems: "center", gap: 5, marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#F1F5F9" },
    establishedText: { fontSize: 12, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    ratingSection: {
        backgroundColor: "white", borderRadius: 16, padding: 16, marginBottom: 12,
        flexDirection: "row", alignItems: "center", gap: 16,
        shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
    },
    ratingLeft: { alignItems: "center", gap: 4 },
    ratingBig: { fontSize: 36, fontWeight: "900", fontFamily: "Inter_700Bold", letterSpacing: -1 },
    reviewCount: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", marginTop: 2 },
    ratingDivider: { width: 1, height: 80, backgroundColor: "#F1F5F9" },
    ratingRight: { flex: 1, gap: 4 },
    ratingBar: { flexDirection: "row", alignItems: "center", gap: 6 },
    ratingBarLabel: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", width: 10 },
    ratingBarTrack: { flex: 1, height: 6, backgroundColor: "#F1F5F9", borderRadius: 3, overflow: "hidden" },
    ratingBarFill: { height: "100%", borderRadius: 3 },
    card: {
        backgroundColor: "white", borderRadius: 16, padding: 16, marginBottom: 12,
        shadowColor: "#B45309", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
    },
    cardHeader: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 14 },
    cardHeaderIcon: { width: 34, height: 34, borderRadius: 10, alignItems: "center", justifyContent: "center" },
    cardTitle: { fontSize: 15, fontWeight: "800", color: "#0F172A", fontFamily: "Inter_700Bold" },
    bedStats: { flexDirection: "row", justifyContent: "space-around", marginBottom: 14 },
    bedStat: { alignItems: "center", gap: 2 },
    bedNum: { fontSize: 26, fontWeight: "900", color: "#0F172A", fontFamily: "Inter_700Bold" },
    bedLabel: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular", fontWeight: "600" },
    bedBarTrack: { height: 10, backgroundColor: "#F1F5F9", borderRadius: 5, overflow: "hidden", marginBottom: 6 },
    bedBarFill: { height: "100%", borderRadius: 5 },
    bedBarLabel: { fontSize: 11, color: "#64748B", fontFamily: "Inter_400Regular", textAlign: "center" },
    serviceRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 6 },
    serviceDot: { width: 7, height: 7, borderRadius: 4, flexShrink: 0 },
    serviceRowText: { fontSize: 13, color: "#374151", fontFamily: "Inter_400Regular", flex: 1 },
    contactRow: {
        flexDirection: "row", alignItems: "center", gap: 12,
        borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 8,
        backgroundColor: "#F8FAFC",
    },
    contactIconBox: { width: 38, height: 38, borderRadius: 11, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    contactInfo: { flex: 1 },
    contactRole: { fontSize: 11, color: "#0F172A", fontFamily: "Inter_400Regular", marginBottom: 2 },
    contactPhone: { fontSize: 16, fontWeight: "800", fontFamily: "Inter_700Bold", color: "#0F172A" },
    callBtn: { flexDirection: "row", alignItems: "center", gap: 4, paddingHorizontal: 12, paddingVertical: 7, borderRadius: 10 },
    callBtnText: { fontSize: 11, fontWeight: "700", color: "white", fontFamily: "Inter_600SemiBold" },
    reviewRow: { paddingVertical: 12 },
    reviewRowBorder: { borderBottomWidth: 1, borderBottomColor: "#F1F5F9" },
    reviewTop: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
    reviewAvatar: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", flexShrink: 0 },
    reviewAvatarText: { fontSize: 16, fontWeight: "800", fontFamily: "Inter_700Bold" },
    reviewMeta: { flex: 1 },
    reviewName: { fontSize: 13, fontWeight: "700", color: "#0F172A", fontFamily: "Inter_700Bold", marginBottom: 3 },
    reviewStarRow: { flexDirection: "row", alignItems: "center", gap: 8 },
    reviewDate: { fontSize: 10, color: "#94A3B8", fontFamily: "Inter_400Regular" },
    reviewComment: { fontSize: 12, color: "#475569", fontFamily: "Inter_400Regular", lineHeight: 18 },
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
});
