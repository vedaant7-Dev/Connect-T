"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickServiceGrid = QuickServiceGrid;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var Haptics = require("expo-haptics");
var react_native_2 = require("react-native");
function QuickServiceGrid(_a) {
    var services = _a.services, onPress = _a.onPress;
    var handlePress = function (id) {
        if (react_native_2.Platform.OS !== "web") {
            Haptics.selectionAsync();
        }
        onPress(id);
    };
    return (<react_native_1.View style={styles.grid}>
      {services.map(function (svc) { return (<react_native_1.TouchableOpacity key={svc.id} style={styles.item} onPress={function () { return handlePress(svc.id); }} activeOpacity={0.8}>
          <react_native_1.View style={[styles.iconBox, { backgroundColor: svc.bg }]}>
            <vector_icons_1.Feather name={svc.icon} size={22} color={svc.color}/>
          </react_native_1.View>
          <react_native_1.Text style={styles.label}>{svc.label}</react_native_1.Text>
        </react_native_1.TouchableOpacity>); })}
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    grid: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        rowGap: 16,
    },
    item: {
        width: "48%",
        alignItems: "center",
        gap: 6,
    },
    iconBox: {
        width: 54,
        height: 54,
        borderRadius: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 10,
        fontWeight: "700",
        color: "#475569",
        textAlign: "center",
        fontFamily: "Inter_600SemiBold",
    },
});
