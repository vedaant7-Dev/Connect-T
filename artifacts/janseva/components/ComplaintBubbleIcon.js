"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ComplaintBubbleIcon;
var react_1 = require("react");
var react_native_svg_1 = require("react-native-svg");
function ComplaintBubbleIcon(_a) {
    var _b = _a.color, color = _b === void 0 ? "#94A3B8" : _b, _c = _a.size, size = _c === void 0 ? 22 : _c;
    return (<react_native_svg_1.default width={size} height={size} viewBox="0 0 24 24" fill="none">
      {/* Speech bubble body */}
      <react_native_svg_1.Path d="M12 2C6.477 2 2 6.254 2 11.5c0 2.7 1.17 5.132 3.05 6.857L4 22l4.43-1.71C9.5 20.74 10.72 21 12 21c5.523 0 10-4.254 10-9.5S17.523 2 12 2z" fill={color}/>
      {/* Exclamation mark shaft */}
      <react_native_svg_1.Rect x="11" y="7" width="2" height="6" rx="1" fill="white"/>
      {/* Exclamation mark dot */}
      <react_native_svg_1.Circle cx="12" cy="16" r="1.1" fill="white"/>
    </react_native_svg_1.default>);
}
