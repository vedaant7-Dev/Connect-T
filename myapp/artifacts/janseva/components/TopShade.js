"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TopShade;
var react_1 = require("react");
var react_native_1 = require("react-native");
var expo_linear_gradient_1 = require("expo-linear-gradient");
function TopShade(_a) {
    var _b = _a.height, height = _b === void 0 ? 180 : _b;
    return (<expo_linear_gradient_1.LinearGradient colors={["rgba(253,186,116,0.45)", "rgba(253,186,116,0.00)"]} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={[styles.shade, { height: height, pointerEvents: "none" }]}/>);
}
var styles = react_native_1.StyleSheet.create({
    shade: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
});
