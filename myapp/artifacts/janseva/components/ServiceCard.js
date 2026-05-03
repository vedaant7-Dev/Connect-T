"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceCard = ServiceCard;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var Haptics = require("expo-haptics");
function ServiceCard(_a) {
    var place = _a.place, categoryColor = _a.categoryColor, categoryBg = _a.categoryBg;
    var _b = (0, react_1.useState)(false), expanded = _b[0], setExpanded = _b[1];
    var handleCall = function (phone) {
        if (react_native_1.Platform.OS !== "web") {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        react_native_1.Linking.openURL("tel:".concat(phone));
    };
    var handleToggle = function () {
        if (react_native_1.Platform.OS !== "web") {
            Haptics.selectionAsync();
        }
        setExpanded(!expanded);
    };
    return (<react_native_1.View style={styles.card}>
      <react_native_1.TouchableOpacity onPress={handleToggle} activeOpacity={0.85}>
        <react_native_1.View style={styles.cardTop}>
          <react_native_1.View style={styles.cardLeft}>
            <react_native_1.View style={[styles.iconBadge, { backgroundColor: categoryBg }]}>
              <vector_icons_1.Feather name="map-pin" size={14} color={categoryColor}/>
            </react_native_1.View>
            <react_native_1.View style={styles.cardInfo}>
              <react_native_1.Text style={styles.cardName} numberOfLines={2}>{place.name}</react_native_1.Text>
              <react_native_1.Text style={styles.cardAddress} numberOfLines={1}>{place.address}</react_native_1.Text>
              {place.speciality ? (<react_native_1.View style={[styles.specialityBadge, { backgroundColor: categoryBg }]}>
                  <react_native_1.Text style={[styles.specialityText, { color: categoryColor }]}>{place.speciality}</react_native_1.Text>
                </react_native_1.View>) : null}
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={styles.cardRight}>
            <react_native_1.View style={[styles.distanceBadge, { backgroundColor: categoryBg }]}>
              <vector_icons_1.Feather name="navigation" size={10} color={categoryColor}/>
              <react_native_1.Text style={[styles.distanceText, { color: categoryColor }]}>{place.distance}</react_native_1.Text>
            </react_native_1.View>
            {place.timing ? (<react_native_1.Text style={styles.timingText} numberOfLines={1}>{place.timing}</react_native_1.Text>) : null}
            <vector_icons_1.Feather name={expanded ? "chevron-up" : "chevron-down"} size={16} color="#94A3B8" style={{ marginTop: 8 }}/>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>

      {expanded && (<react_native_1.View style={styles.contactsContainer}>
          <react_native_1.View style={styles.divider}/>
          <react_native_1.Text style={styles.contactsLabel}>Contact Numbers</react_native_1.Text>
          <react_native_1.View style={styles.contactGrid}>
            {place.contacts.map(function (contact, idx) { return (<react_native_1.TouchableOpacity key={idx} style={[styles.contactBtn, { borderColor: categoryColor + "40" }]} onPress={function () { return handleCall(contact.phone); }} activeOpacity={0.75}>
                <react_native_1.View style={[styles.contactIconWrap, { backgroundColor: categoryBg }]}>
                  <vector_icons_1.Feather name="phone" size={12} color={categoryColor}/>
                </react_native_1.View>
                <react_native_1.View style={styles.contactBtnText}>
                  <react_native_1.Text style={styles.contactRole}>{contact.role || contact.name}</react_native_1.Text>
                  <react_native_1.Text style={[styles.contactPhone, { color: categoryColor }]}>{contact.phone}</react_native_1.Text>
                </react_native_1.View>
              </react_native_1.TouchableOpacity>); })}
          </react_native_1.View>
        </react_native_1.View>)}
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        marginBottom: 10,
        overflow: "hidden",
        shadowColor: "#1E40AF",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    cardTop: {
        flexDirection: "row",
        padding: 14,
        alignItems: "flex-start",
        gap: 10,
    },
    cardLeft: {
        flex: 1,
        flexDirection: "row",
        gap: 10,
        alignItems: "flex-start",
    },
    iconBadge: {
        width: 36,
        height: 36,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    cardInfo: {
        flex: 1,
    },
    cardName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0F172A",
        fontFamily: "Inter_700Bold",
        marginBottom: 2,
    },
    cardAddress: {
        fontSize: 11,
        color: "#64748B",
        fontFamily: "Inter_400Regular",
        marginBottom: 6,
    },
    specialityBadge: {
        alignSelf: "flex-start",
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 20,
    },
    specialityText: {
        fontSize: 10,
        fontWeight: "700",
        fontFamily: "Inter_600SemiBold",
    },
    cardRight: {
        alignItems: "flex-end",
        flexShrink: 0,
    },
    distanceBadge: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 20,
    },
    distanceText: {
        fontSize: 11,
        fontWeight: "700",
        fontFamily: "Inter_600SemiBold",
    },
    timingText: {
        fontSize: 9,
        color: "#94A3B8",
        marginTop: 4,
        fontFamily: "Inter_400Regular",
        maxWidth: 80,
        textAlign: "right",
    },
    divider: {
        height: 1,
        backgroundColor: "#F1F5F9",
        marginHorizontal: 14,
    },
    contactsContainer: {
        paddingBottom: 12,
    },
    contactsLabel: {
        fontSize: 11,
        fontWeight: "700",
        color: "#64748B",
        fontFamily: "Inter_600SemiBold",
        paddingHorizontal: 14,
        paddingTop: 10,
        paddingBottom: 8,
        textTransform: "uppercase",
        letterSpacing: 0.5,
    },
    contactGrid: {
        paddingHorizontal: 12,
        gap: 6,
    },
    contactBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 10,
        borderWidth: 1,
        backgroundColor: "#F8FAFC",
    },
    contactIconWrap: {
        width: 28,
        height: 28,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    contactBtnText: {
        flex: 1,
    },
    contactRole: {
        fontSize: 10,
        color: "#64748B",
        fontFamily: "Inter_400Regular",
    },
    contactPhone: {
        fontSize: 13,
        fontWeight: "700",
        fontFamily: "Inter_700Bold",
    },
});
