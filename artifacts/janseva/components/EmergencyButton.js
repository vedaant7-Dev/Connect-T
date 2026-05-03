"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmergencyButton = EmergencyButton;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var Haptics = require("expo-haptics");
function EmergencyButton() {
    var scaleAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(1)).current;
    var handleSOS = function () {
        if (react_native_1.Platform.OS !== "web") {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
        }
        react_native_1.Animated.sequence([
            react_native_1.Animated.timing(scaleAnim, { toValue: 0.92, duration: 80, useNativeDriver: true }),
            react_native_1.Animated.timing(scaleAnim, { toValue: 1.05, duration: 100, useNativeDriver: true }),
            react_native_1.Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start();
        react_native_1.Linking.openURL("tel:112");
    };
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={styles.pulseOuter}>
        <react_native_1.View style={styles.pulseInner}>
          <react_native_1.Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <react_native_1.TouchableOpacity onPress={handleSOS} style={styles.sosBtn} activeOpacity={0.9}>
              <vector_icons_1.Feather name="phone-call" size={32} color="white"/>
              <react_native_1.Text style={styles.sosText}>SOS</react_native_1.Text>
            </react_native_1.TouchableOpacity>
          </react_native_1.Animated.View>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.Text style={styles.hint}>Hold to call emergency services (112)</react_native_1.Text>
    </react_native_1.View>);
}
var styles = react_native_1.StyleSheet.create({
    container: {
        alignItems: "center",
        marginVertical: 8,
    },
    pulseOuter: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: "rgba(220, 38, 38, 0.12)",
        alignItems: "center",
        justifyContent: "center",
    },
    pulseInner: {
        width: 112,
        height: 112,
        borderRadius: 56,
        backgroundColor: "rgba(220, 38, 38, 0.2)",
        alignItems: "center",
        justifyContent: "center",
    },
    sosBtn: {
        width: 88,
        height: 88,
        borderRadius: 44,
        backgroundColor: "#DC2626",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#DC2626",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.5,
        shadowRadius: 16,
        elevation: 8,
    },
    sosText: {
        fontSize: 14,
        fontWeight: "900",
        color: "#FFFFFF",
        fontFamily: "Inter_700Bold",
        letterSpacing: 2,
        marginTop: 2,
    },
    hint: {
        fontSize: 11,
        color: "#94A3B8",
        marginTop: 10,
        fontFamily: "Inter_400Regular",
    },
});
