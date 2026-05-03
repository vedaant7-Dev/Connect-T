"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceMap = ServiceMap;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
function ServiceMap(_a) {
    var address = _a.address, name = _a.name, color = _a.color, bgColor = _a.bgColor;
    var query = encodeURIComponent(address + ", Ambernath, Maharashtra");
    var embedUrl = "https://maps.google.com/maps?q=".concat(query, "&output=embed");
    var mapsUrl = "https://www.google.com/maps/search/?api=1&query=".concat(query);
    var handleOpenMaps = function () { return react_native_1.Linking.openURL(mapsUrl); };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.headerRow}>
        <react_native_1.View style={[styles.mapIcon, { backgroundColor: bgColor }]}>
          <vector_icons_1.Feather name="map" size={15} color={color}/>
        </react_native_1.View>
        <react_native_1.Text style={styles.title}>Location</react_native_1.Text>
        <react_native_1.TouchableOpacity style={[styles.openBtn, { backgroundColor: bgColor }]} onPress={handleOpenMaps} activeOpacity={0.8}>
          <vector_icons_1.Feather name="external-link" size={12} color={color}/>
          <react_native_1.Text style={[styles.openBtnText, { color: color }]}>Open in Maps</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      {react_native_1.Platform.OS === "web" ? (<react_native_1.View style={styles.mapFrame}>
          {react_1.default.createElement("iframe", {
                src: embedUrl,
                width: "100%",
                height: "220",
                style: { border: "none", borderRadius: 12, display: "block" },
                loading: "lazy",
                referrerpolicy: "no-referrer-when-downgrade",
                title: name,
            })}
        </react_native_1.View>) : (<react_native_1.TouchableOpacity style={[styles.nativeCard, { borderColor: bgColor }]} onPress={handleOpenMaps} activeOpacity={0.85}>
          <react_native_1.View style={[styles.nativeIconWrap, { backgroundColor: bgColor }]}>
            <vector_icons_1.Feather name="map-pin" size={28} color={color}/>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={styles.nativeName} numberOfLines={1}>{name}</react_native_1.Text>
            <react_native_1.Text style={styles.nativeAddress} numberOfLines={2}>{address}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.View style={[styles.nativeArrow, { backgroundColor: bgColor }]}>
            <vector_icons_1.Feather name="chevron-right" size={18} color={color}/>
          </react_native_1.View>
        </react_native_1.TouchableOpacity>)}

      <react_native_1.View style={styles.addressFooter}>
        <vector_icons_1.Feather name="map-pin" size={11} color="#94A3B8"/>
        <react_native_1.Text style={styles.addressFooterText} numberOfLines={2}>{address}</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.06,
        shadowRadius: 8,
        elevation: 2,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 12,
    },
    mapIcon: {
        width: 32,
        height: 32,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        flex: 1,
        fontSize: 14,
        fontWeight: "700",
        color: "#0F172A",
        fontFamily: "Inter_700Bold",
    },
    openBtn: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
    },
    openBtnText: {
        fontSize: 11,
        fontWeight: "700",
        fontFamily: "Inter_600SemiBold",
    },
    mapFrame: {
        borderRadius: 12,
        overflow: "hidden",
        height: 220,
        backgroundColor: "#F1F5F9",
    },
    nativeCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        padding: 14,
        borderRadius: 12,
        borderWidth: 1.5,
        marginBottom: 4,
    },
    nativeIconWrap: {
        width: 56,
        height: 56,
        borderRadius: 14,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    nativeName: {
        fontSize: 14,
        fontWeight: "700",
        color: "#0F172A",
        fontFamily: "Inter_700Bold",
        marginBottom: 3,
    },
    nativeAddress: {
        fontSize: 12,
        color: "#64748B",
        fontFamily: "Inter_400Regular",
        lineHeight: 17,
    },
    nativeArrow: {
        width: 34,
        height: 34,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
    addressFooter: {
        flexDirection: "row",
        alignItems: "flex-start",
        gap: 5,
        marginTop: 10,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: "#F1F5F9",
    },
    addressFooterText: {
        flex: 1,
        fontSize: 11,
        color: "#94A3B8",
        fontFamily: "Inter_400Regular",
        lineHeight: 16,
    },
});
