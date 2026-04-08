import { Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Platform, StyleSheet, View, Text, useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#2563EB",
        tabBarInactiveTintColor: "#94A3B8",
        headerShown: false,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E2E8F0",
          elevation: 0,
          height: isWeb ? 80 : Platform.OS === "android" ? 64 : 80,
          paddingTop: 8,
          paddingBottom: isWeb ? 18 : Platform.OS === "android" ? 10 : 24,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          fontFamily: "Inter_600SemiBold",
          marginTop: 2,
        },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
          ) : (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: "#FFFFFF" }]} />
          ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} />,
        }}
      />

      {/* Complaints — simple, no circle */}
      <Tabs.Screen
        name="complaints"
        options={{
          title: "Complaints",
          tabBarIcon: ({ color }) => <Feather name="edit-3" size={22} color={color} />,
          tabBarActiveTintColor: "#2563EB",
        }}
      />

      {/* SOS — floating red circle with "SOS" text inside, no external label */}
      <Tabs.Screen
        name="emergency"
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ focused }) => (
            <View style={{
              width: 54,
              height: 54,
              borderRadius: 27,
              backgroundColor: focused ? "#B91C1C" : "#DC2626",
              alignItems: "center",
              justifyContent: "center",
              marginTop: -20,
              borderWidth: 3,
              borderColor: "white",
              shadowColor: "#DC2626",
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.5,
              shadowRadius: 8,
              elevation: 8,
              gap: 1,
            }}>
              <Feather name="phone-call" size={16} color="white" />
              <Text style={{
                fontSize: 8,
                fontWeight: "900",
                color: "white",
                letterSpacing: 1,
                fontFamily: "Inter_700Bold",
              }}>SOS</Text>
            </View>
          ),
          tabBarActiveTintColor: "#DC2626",
        }}
      />

      <Tabs.Screen
        name="feed"
        options={{
          title: "Feed",
          tabBarIcon: ({ color }) => <Feather name="rss" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <Feather name="user" size={22} color={color} />,
        }}
      />
      <Tabs.Screen name="services" options={{ href: null }} />
      <Tabs.Screen name="admin" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({});
