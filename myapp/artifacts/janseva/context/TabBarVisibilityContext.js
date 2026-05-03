"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TabBarVisibilityProvider = TabBarVisibilityProvider;
exports.useTabBarVisibility = useTabBarVisibility;
var react_1 = require("react");
var react_native_reanimated_1 = require("react-native-reanimated");
var TabBarVisibilityContext = (0, react_1.createContext)(null);
var TAB_BAR_HEIGHT = 90;
var SCROLL_THRESHOLD = 10;
function TabBarVisibilityProvider(_a) {
    var children = _a.children;
    var tabBarTranslateY = (0, react_native_reanimated_1.useSharedValue)(0);
    var lastOffsetRef = (0, react_1.useRef)(0);
    var isHiddenRef = (0, react_1.useRef)(false);
    var scrollTimerRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        return function () {
            if (scrollTimerRef.current) {
                clearTimeout(scrollTimerRef.current);
            }
        };
    }, []);
    var handleScroll = (0, react_1.useCallback)(function (event) {
        var currentOffset = event.nativeEvent.contentOffset.y;
        var diff = currentOffset - lastOffsetRef.current;
        if (scrollTimerRef.current) {
            clearTimeout(scrollTimerRef.current);
        }
        scrollTimerRef.current = setTimeout(function () {
            if (isHiddenRef.current) {
                tabBarTranslateY.value = (0, react_native_reanimated_1.withTiming)(0, {
                    duration: 250,
                    easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.cubic),
                });
                isHiddenRef.current = false;
            }
        }, 800);
        if (currentOffset <= 0) {
            if (isHiddenRef.current) {
                tabBarTranslateY.value = (0, react_native_reanimated_1.withTiming)(0, {
                    duration: 250,
                    easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.cubic),
                });
                isHiddenRef.current = false;
            }
            lastOffsetRef.current = currentOffset;
            return;
        }
        if (diff > SCROLL_THRESHOLD && !isHiddenRef.current) {
            tabBarTranslateY.value = (0, react_native_reanimated_1.withTiming)(TAB_BAR_HEIGHT + 40, {
                duration: 300,
                easing: react_native_reanimated_1.Easing.in(react_native_reanimated_1.Easing.cubic),
            });
            isHiddenRef.current = true;
        }
        else if (diff < -SCROLL_THRESHOLD && isHiddenRef.current) {
            tabBarTranslateY.value = (0, react_native_reanimated_1.withTiming)(0, {
                duration: 250,
                easing: react_native_reanimated_1.Easing.out(react_native_reanimated_1.Easing.cubic),
            });
            isHiddenRef.current = false;
        }
        lastOffsetRef.current = currentOffset;
    }, [tabBarTranslateY]);
    var tabBarAnimatedStyle = (0, react_native_reanimated_1.useAnimatedStyle)(function () { return ({
        transform: [{ translateY: tabBarTranslateY.value }],
    }); });
    return (<TabBarVisibilityContext.Provider value={{ tabBarTranslateY: tabBarTranslateY, handleScroll: handleScroll, tabBarAnimatedStyle: tabBarAnimatedStyle, TAB_BAR_HEIGHT: TAB_BAR_HEIGHT }}>
      {children}
    </TabBarVisibilityContext.Provider>);
}
function useTabBarVisibility() {
    var ctx = (0, react_1.useContext)(TabBarVisibilityContext);
    if (!ctx) {
        return {
            tabBarTranslateY: { value: 0 },
            handleScroll: function (_e) { },
            tabBarAnimatedStyle: {},
            TAB_BAR_HEIGHT: TAB_BAR_HEIGHT,
        };
    }
    return ctx;
}
