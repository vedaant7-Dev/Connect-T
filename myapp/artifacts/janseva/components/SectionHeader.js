"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionHeader = SectionHeader;
var react_1 = require("react");
var react_native_1 = require("react-native");
function SectionHeader(_a) {
    var title = _a.title, actionLabel = _a.actionLabel, onAction = _a.onAction;
    return (<react_native_1.View style={styles.row}>
      <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
      {actionLabel && onAction ? (<react_native_1.TouchableOpacity onPress={onAction}>
          <react_native_1.Text style={styles.action}>{actionLabel}</react_native_1.Text>
        </react_native_1.TouchableOpacity>) : null}
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 4,
    },
    title: {
        fontSize: 16,
        fontWeight: "800",
        color: "#0F172A",
        fontFamily: "Inter_700Bold",
    },
    action: {
        fontSize: 13,
        fontWeight: "700",
        color: "#2563EB",
        fontFamily: "Inter_700Bold",
    },
});
